import { authApi } from '@/api';
import { AxiosResponse } from 'axios';
import { useUserStore } from '@/store/user';

interface IResponseData {
  Error: boolean;
  Errors: any;
  MesageStatus: string;
  Message: string;
  ResultData: any;
  Status: number;
}

export default function useLogoutUser() {
  const i18n = useI18n();
  const config = useRuntimeConfig();

  const loading = ref<boolean>(false);
  const error = ref<Error | null>(null);
  const response = ref<any>(null);
  const userStore = useUserStore();

  const jwtToken = useCookie<string>('Authorization');
  const headers = {
    Authorization: jwtToken.value
  };

  async function logoutUser() {
    error.value = null;

    try {
      loading.value = true;
      const data: AxiosResponse<IResponseData> = await authApi.logoutUser(
        {
          userId: userStore.user.userId,
          userName: userStore.user.userName,
          clientId: config.public.clientId,
          realms: config.public.reamls
        },
        headers
      );
      loading.value = false;
      if (!data) {
        throw new Error(i18n.t('error.notNetwork'));
      }
      if (data.status !== 200) {
        if (data.status === 401) {
          throw new Error(i18n.t('error.notLogin'));
        }
        throw new Error(i18n.t('error.tryAgain'));
      }
      response.value = data.data;
    } catch (err) {
      error.value = err as Error;
    } finally {
      jwtToken.value = '';
      userStore.user = {};
    }
  }
  return {
    logoutUser,
    response,
    loading,
    error
  };
}
