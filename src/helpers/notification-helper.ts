import { notification } from 'antd';

export const showNotification = (
  notificationType: 'success' | 'info' | 'warning' | 'error',
  message: any
) => {
  const notificationArgs = {
    message: notificationType,
    description: message,
    duration: 5,
    placement: 'top'
  };
  notification[notificationType](notificationArgs);
};

export const getErrorMessage = (error) => {
  let errorMessage = 'An Error Occurred';

  if (
    error.response &&
    error.response.data &&
    error.response.data.result &&
    error.response.data.result.resultDescription
  ) {
    errorMessage = error.response.data.result.resultDescription;
  } else if (error.response && error.response.status) {
    errorMessage = error.response.statusText;
  } else if (error.response === undefined) {
    if (error.message === 'Network Error') {
      errorMessage = 'Please Check Your Internet Connection';
    } else {
      errorMessage = error.message;
    }
  }

  return errorMessage;
};
