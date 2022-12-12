export const useConfirmationDialog = () => {
  const route = useRoute()
  const router = useRouter()
  const show = computed(
    () => !!route.query?.confirmation && !!route.query?.message
  )
  const title = ref('')
  const message = ref('')
  function close() {
    router.replace({
      query: {},
    })
  }


  onMounted(()=>{
    title.value = decodeURIComponent(route.query?.title as string)
    message.value = decodeURIComponent(route.query?.message as string)
  })
  watch([() => route.query?.title, () => route.query?.message], (next, old) => {
    if (!next[0] && !next[1]) {
      title.value = decodeURIComponent(old[0] as string)
      message.value = decodeURIComponent(old[1] as string)
    }
    // only change if the next states are not empty
    else {
      title.value = decodeURIComponent(next[0] as string)
      message.value = decodeURIComponent(next[1] as string)
    }
  })
  return {
    title,
    message,
    close,
    show,
  }
}

export function showConfirmationDialog(params: {
  title: string
  message: string,
}) {
  navigateTo({
    query: { ...params, confirmation: 'true' },
  })
}
