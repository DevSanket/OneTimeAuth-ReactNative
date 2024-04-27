import {StyleSheet, Text, View} from 'react-native';
import React, {useContext, useState} from 'react';
import Screen from '../../components/BasicComponents/Screen';
import AppText from '../../components/BasicComponents/AppText';
import Colors from '../../common/DefaultColors';

import AppContext from '../../context/context';
import {NavigationProps} from '../../common/types';
import {ErrorToast, SuccessToast} from '../../common/CustomToast';
import {ForgotPasswordAPI} from '../../ApiCalls/Authentication';
import GetMobileNo from '../../Components/RegisterPageComponents/GetMobileNo';
import VerifyOTP from '../../Components/RegisterPageComponents/VerifyOTP';
import AppTextInput from '../../Components/BasicFormComponents/TextInput';
import CommonButton from '../../Components/BasicComponents/CommonButton';

export default function ForgotPassword({navigation}: NavigationProps) {
  const [create_password, setCreatePassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [Send_OTP, Set_Send_OTP] = useState(false);
  const [verifyOTP, setVerifyOTP] = useState(false);
  const [mobile_no, setMobileNo] = useState('');
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const {language} = useContext(AppContext);

  const HandlePasswordChange = async () => {
    if (create_password !== verifyPassword) {
      ErrorToast('Password Not Matching');
      return;
    }

    const Success = await ForgotPasswordAPI({
      accessToken,
      password: create_password,
      mobile_no,
    });

    if (Success) {
      SuccessToast('Password Changed Successfully');
    } else {
      ErrorToast('Password Not Changed');
    }
    navigation.navigate('Login');
  };

  return (
    <>
      {!Send_OTP && !verifyOTP && (
        <GetMobileNo
          navigation={navigation}
          Set_Send_OTP={Set_Send_OTP}
          setMobileNo={setMobileNo}
          type="ForgotPassword"
        />
      )}
      {Send_OTP && !verifyOTP && (
        <VerifyOTP
          Mobile_No={mobile_no}
          setVerifyOTP={setVerifyOTP}
          setAccessToken={setAccessToken}
        />
      )}
      {Send_OTP && verifyOTP && (
        <Screen style={styles.container}>
          <AppText style={styles.enter_new_password}>
            Enter New Password
          </AppText>
          <AppText style={styles.reset_your_text}>
            Reset Your Password Here
          </AppText>
          <View style={styles.InputContainer}>
            <AppTextInput
              placeholder={'Create Password'}
              setInputField={setCreatePassword}
              value={create_password}
              Password={true}
              secureTextEntry={true}
            />
            <AppTextInput
              placeholder={'Verify Password'}
              setInputField={setVerifyPassword}
              value={verifyPassword}
              Password={true}
              secureTextEntry={true}
            />
          </View>
          <CommonButton
            title={'Reset Password'}
            OnClick={() => HandlePasswordChange()}
          />
        </Screen>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  enter_new_password: {
    fontSize: 20,
    marginBottom: 18,
  },
  reset_your_text: {
    fontSize: 18,
    color: Colors.Light_Blue_Gray,
    marginBottom: 18,
  },
  InputContainer: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
  },
});
