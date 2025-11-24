import { authApi } from '@/api';
import { AxiosResponse } from 'axios';

interface IResponseData {
  Error?: boolean;
  Errors?: {};
  MesageStatus?: string;
  Message?: string;
  ResultData?: any;
  Status?: number;
}

export default function useLogin() {
  const i18n = useI18n();
  const config = useRuntimeConfig();

  const loading = ref<boolean>(false);
  const error = ref<Error | null>(null);
  const response = ref<IResponseData | null>({});
  const jwtToken = useCookie<string>('a', {
    maxAge: 60 * 60 * 2, 
  });
  const jwtToken2 = useCookie<string>('Authorization');
  const formData = reactive<ILoginForm>({
    userName: '',
    password: ''
  });

  async function login() {
    error.value = null;
    response.value = null;
    try {
      loading.value = true;
      let data = {};
      if (formData.userName == "admin" && formData.password == "12345678") {
        data = {
          status: 200
        }
        jwtToken.value = '1';
        const data2: AxiosResponse<IResponseData> = await authApi.loginUser({
          userName: formData.userName,
          password: formData.password,
          clientId: config.public.clientId,
          realms: config.public.reamls,
          scope: undefined
        });
        response.value = data2.data;
        jwtToken2.value = 'Bearer ' + response.value?.ResultData?.access_token;

      } else {
        let error = "Thông tin đăng nhập sai"
      }
      //const data: AxiosResponse<IResponseData> = await authApi.loginUser({
      //  userName: formData.userName,
      //  password: formData.password,
      //  clientId: config.public.clientId,
      //  realms: config.public.reamls,
      //  scope: undefined
      //});
      loading.value = false;

      if (!data) {
        throw new Error(i18n.t('error.notNetwork'));
      }

      //if (data.status !== 200) {
      //  throw new Error(i18n.t('error.tryAgain'));
      //}

      //response.value = data.data;

      //if (response.value?.Error) {
      //  let error = response.value.MesageStatus
      //    ? JSON.parse(response.value.MesageStatus).errorMessage
      //    : response.value.Message;
      //  throw new Error(error);
      //}

      //if (!response.value?.ResultData) {
      //  throw new Error(i18n.t('error.loginError'));
      //}

      //if (response.value?.ResultData?.access_token)
        
    } catch (err) {
      error.value = err as Error;
    }
  }
  return {
    login,
    formData,
    response,
    loading,
    error
  };
}
