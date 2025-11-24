interface IToast {
  title?: string;
  description?: string;
  duration?: number;
}

interface IToastItem {
  id: number;
  type: 'default' | 'success' | 'info' | 'warning' | 'error';
  title: string;
  description: string;
}

export default function useNotification() {
  const notificationList = useState<IToastItem[]>('notificationList', () => []);

  function success({ title = '', description = '', duration = 3000 }: IToast) {
    let notificationInfo: IToastItem = {
      id: new Date().getTime() + Math.random(),
      type: 'success',
      title: title,
      description: description
    };

    notificationList.value.push(notificationInfo);
    if (duration) {
      setTimeout(function () {
        notificationList.value = notificationList.value.filter(
          (item) => item.id != notificationInfo.id
        );
      }, duration);
    }
  }

  function info({ title = '', description = '', duration = 3000 }: IToast) {
    let notificationInfo: IToastItem = {
      id: new Date().getTime() + Math.random(),
      type: 'info',
      title: title,
      description: description
    };

    notificationList.value.push(notificationInfo);
    if (duration) {
      setTimeout(function () {
        notificationList.value = notificationList.value.filter(
          (item) => item.id != notificationInfo.id
        );
      }, duration);
    }
  }

  function warning({ title = '', description = '', duration = 3000 }: IToast) {
    let notificationInfo: IToastItem = {
      id: new Date().getTime() + Math.random(),
      type: 'warning',
      title: title,
      description: description
    };

    notificationList.value.push(notificationInfo);
    if (duration) {
      setTimeout(function () {
        notificationList.value = notificationList.value.filter(
          (item) => item.id != notificationInfo.id
        );
      }, duration);
    }
  }

  function error({ title = '', description = '', duration = 3000 }: IToast) {
    let notificationInfo: IToastItem = {
      id: new Date().getTime() + Math.random(),
      type: 'error',
      title: title,
      description: description
    };

    notificationList.value.push(notificationInfo);
    if (duration) {
      setTimeout(function () {
        notificationList.value = notificationList.value.filter(
          (item) => item.id != notificationInfo.id
        );
      }, duration);
    }
  }

  function close(id: number) {
    notificationList.value = notificationList.value.filter((item) => item.id != id);
  }

  return {
    notificationList,
    successToast: success,
    infoToast: info,
    warningToast: warning,
    errorToast: error,
    closeToast: close
  };
}
