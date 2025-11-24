export default defineNuxtRouteMiddleware((to, from) => {
  // isAuthenticated() is an example method verifying if a user is authenticated
  const jwtToken = useCookie('a');
  if (jwtToken.value) {
    return navigateTo('/');
  }
});
