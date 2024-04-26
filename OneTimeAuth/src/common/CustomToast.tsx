import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from 'react-native-alert-notification';

export const SuccessToast = (msg: string) => {
  Toast.show({
    type: ALERT_TYPE.SUCCESS,
    title: 'Success',
    textBody: msg,
  });
};

export const ErrorToast = (msg: string) => {
  Toast.show({
    type: ALERT_TYPE.DANGER,
    title: 'Error',
    textBody: msg,
  });
};
