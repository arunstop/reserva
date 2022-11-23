export default defineNuxtRouteMiddleware((to)=>{
    const user = useUser()
    if(to.path==="/auth" && user.value){
        navigateTo("/")
    }
})