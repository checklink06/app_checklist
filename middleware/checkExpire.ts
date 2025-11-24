import userApi from '@/api/user';

export default defineNuxtRouteMiddleware(async (to, from) => {
  // isAuthenticated() is an example method verifying if a user is authenticated
  const jwtToken = useCookie('a');

  if (jwtToken.value != 1) {
    jwtToken.value = '';
  }
});
