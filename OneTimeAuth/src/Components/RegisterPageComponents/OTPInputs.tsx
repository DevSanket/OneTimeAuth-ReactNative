import React, {useState, useRef} from 'react';
import {View, TextInput, StyleSheet, Button} from 'react-native';

interface IProps {
  otp: string[];
  setOTP: React.Dispatch<React.SetStateAction<string[]>>;
}

const OTPLength = 6;

const OTPInputs = ({otp, setOTP}: IProps) => {
  const inputRefs = useRef<any>([]); // Using refs to access the OTP input fields
  // 759 624
  const handleOTPChange = (index: any, value: any) => {
    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);
    inputRefs.current[index].setNativeProps({text: value}); // Update the current input value
  };

  const handleKeyPress = (index: any, key: any) => {
    if (key === 'Backspace') {
      if (!otp[index] && index !== 0) {
        inputRefs.current[index - 1].focus();
        return;
      }
      if (otp[index]) {
        handleOTPChange(index, '');
        return;
      }
    } else {
      if (otp[index]) {
        inputRefs.current[index + 1].focus();
        handleOTPChange(index + 1, key);
        return;
      }
      handleOTPChange(index, key);
      if (index < OTPLength - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.otpContainer}>
        {[...Array(OTPLength)].map((_, index) => (
          <TextInput
            key={index}
            ref={ref => (inputRefs.current[index] = ref)}
            style={styles.otpInput}
            keyboardType="numeric"
            autoComplete="off" // android
            maxLength={1}
            onKeyPress={({nativeEvent}) => {
              handleKeyPress(index, nativeEvent.key);
            }}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpInput: {
    height: 40,
    width: 40,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#CECECE',
    color: '#000',
    backgroundColor: '#fff',
    borderRadius: 5,
    textAlign: 'center',
  },
});

export default OTPInputs;
