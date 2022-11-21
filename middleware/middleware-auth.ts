export default defineNuxtRouteMiddleware((to)=>{
    const user = useSupabaseUser();
    if(to.path==="/auth" && user.value){
        navigateTo("/")
    }
})