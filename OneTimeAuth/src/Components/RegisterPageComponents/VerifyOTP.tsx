import {StyleSheet} from 'react-native';
import React, {useContext, useState} from 'react';
import Screen from '../BasicComponents/Screen';
import AppText from '../BasicComponents/AppText';
import CommonButton from '../BasicComponents/CommonButton';
import OTPInputs from './OTPInputs';
import {VerifyTheOTP} from '../../ApiCalls/Authentication';
import {SuccessToast} from '../../common/CustomToast';

interface IProps {
  Mobile_No: string;
  setVerifyOTP: React.Dispatch<React.SetStateAction<boolean>>;
  setAccessToken?: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function VerifyOTP({
  Mobile_No,
  setVerifyOTP,
  setAccessToken,
}: IProps) {
  const [otp, setOTP] = useState(['', '', '', '', '', '']);

  const handleVerifyOTP = async () => {
    let OTP = otp.join('');

    const check = await VerifyTheOTP({
      mobile_no: Mobile_No,
      otp: OTP,
      setAccessToken,
    });
    if (check) {
      setVerifyOTP(true);
      SuccessToast('OTP Verified Successfully');
      return;
    }
  };

  return (
    <Screen style={styles.container}>
      <AppText style={styles.enter_verification_code_text}>
        Enter Verification Code
      </AppText>
      <AppText style={styles.enter_6digit_text}>
        Enter the 6-digit verification code that was send to your mobile number
        XXXXXXXX{Mobile_No[Mobile_No.length - 2]}
        {Mobile_No[Mobile_No.length - 1]}
      </AppText>
      <OTPInputs otp={otp} setOTP={setOTP} />
      <CommonButton
        OnClick={() => handleVerifyOTP()}
        title={'Verify'}
        style={{
          width: '80%',
        }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  enter_verification_code_text: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 28,
  },
  enter_6digit_text: {
    fontSize: 18,
    marginBottom: 28,
    textAlign: 'center',
    width: '80%',
  },
});
