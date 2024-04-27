import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {NavigationProps} from '../../common/types';
import GetMobileNo from '../../Components/RegisterPageComponents/GetMobileNo';
import VerifyOTP from '../../Components/RegisterPageComponents/VerifyOTP';
import FillDetailsPage from '../../Components/RegisterPageComponents/FillDetailsPage';

export default function Register({navigation}: NavigationProps) {
  const [Send_OTP, Set_Send_OTP] = useState(false);
  const [verifyOTP, setVerifyOTP] = useState(false);
  const [mobile_no, setMobileNo] = useState('');

  return (
    <View style={styles.container}>
      {!Send_OTP && !verifyOTP && (
        <GetMobileNo
          navigation={navigation}
          Set_Send_OTP={Set_Send_OTP}
          setMobileNo={setMobileNo}
        />
      )}
      {Send_OTP && !verifyOTP && (
        <VerifyOTP Mobile_No={mobile_no} setVerifyOTP={setVerifyOTP} />
      )}
      {Send_OTP && verifyOTP && (
        <FillDetailsPage navigation={navigation} mobile_no={mobile_no} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
