import {
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {StackNavigationProp} from '@react-navigation/stack';
import AppContext from '../../context/context';
import {ErrorToast, SuccessToast} from '../../common/CustomToast';
import Screen from '../BasicComponents/Screen';
import AppText from '../BasicComponents/AppText';
import AppTextInput from '../BasicFormComponents/TextInput';
import CommonButton from '../BasicComponents/CommonButton';
import {SendOTP} from '../../ApiCalls/Authentication';

type Props = {
  navigation: StackNavigationProp<any, any>;
  setMobileNo: React.Dispatch<React.SetStateAction<string>>;
  Set_Send_OTP: React.Dispatch<React.SetStateAction<boolean>>;
  type?: string;
};

export default function GetMobileNo({
  navigation,
  setMobileNo,
  Set_Send_OTP,
  type,
}: Props) {
  const [phone_no, setPhoneNo] = useState('');
  const [loading, setLoading] = useState(false);

  const handleOTP = async () => {
    if (phone_no.length != 10) {
      ErrorToast('Invalid Phone No');
      return;
    }
    setLoading(true);
    const check = await SendOTP({
      mobile_no: phone_no,
      type: type ? type : null,
    });
    setLoading(false);
    if (check) {
      setMobileNo(phone_no);
      Set_Send_OTP(true);
      SuccessToast('OTP Send Successfully');
    }
  };

  return (
    <Screen style={styles.container}>
      <AppText style={styles.enter_mobile_no_text}>
        Enter Your Mobile Number
      </AppText>
      <AppText style={styles.welcome_text}>Welcome</AppText>
      <AppText style={styles.associated_acc_text}>
        Enter Mobile Number Which Associates Your Account
      </AppText>
      <AppTextInput
        placeholder={'Phone No'}
        setInputField={setPhoneNo}
        value={phone_no}
        keyboardType="number-pad"
      />
      <CommonButton
        title={'Send OTP'}
        OnClick={() => handleOTP()}
        style={{marginVertical: 24}}
        disabled={loading}
      />
      <View style={styles.TextSection}>
        <AppText>Already Have an Account?</AppText>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <AppText style={styles.SignUp}>Login</AppText>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  enter_mobile_no_text: {
    fontSize: 24,
    marginBottom: 24,
  },
  welcome_text: {
    fontSize: 22,
    marginBottom: 24,
  },
  associated_acc_text: {
    width: '80%',
    fontSize: 20,
    marginBottom: 34,
    color: 'gray',
    textAlign: 'center',
  },
  TextSection: {flexDirection: 'row', alignItems: 'center'},
  SignUp: {
    color: '#000',
    textDecorationLine: 'underline',
    marginLeft: 2,
  },
});
