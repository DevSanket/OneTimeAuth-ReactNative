import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import Screen from '../BasicComponents/Screen';
import AppText from '../BasicComponents/AppText';
import AppTextInput from '../BasicFormComponents/TextInput';
import CommonButton from '../BasicComponents/CommonButton';
import {ErrorToast, SuccessToast} from '../../common/CustomToast';
import {RegisterTheUser} from '../../ApiCalls/Authentication';

type Props = {
  navigation: StackNavigationProp<any, any>;
  mobile_no: string;
};

export default function FillDetailsPage({navigation, mobile_no}: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const HandleSubmitDetails = async () => {
    if (name.length < 4) {
      return ErrorToast('Invalid Name!');
    }

    if (email.length < 10) {
      return ErrorToast('Invalid Email!');
    }

    if (password.length < 5) {
      return ErrorToast('Invalid Password!');
    }

    if (password !== confirmPassword) {
      return ErrorToast('Password Not Matching!');
    }

    const User = await RegisterTheUser({
      user_data: {
        email_id: email,
        mobile_no: mobile_no,
        name: name,
        password: password,
      },
    });

    if (User) {
      SuccessToast('Register Successfully');
      navigation.push('Login');
    } else {
      ErrorToast('Server Issue');
    }
  };

  return (
    <Screen style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <AppText style={styles.signupText}>SignUp</AppText>
      <AppText style={styles.registerText}>Register Your Account</AppText>
      <View style={[styles.InputFields, styles.item]}>
        <AppTextInput
          setInputField={setName}
          value={name}
          placeholder={'Enter Your Name'}
        />

        <AppTextInput
          setInputField={setEmail}
          value={email}
          placeholder={'Enter Your Email'}
        />

        <AppTextInput
          placeholder={'Enter Password'}
          setInputField={setPassword}
          value={password}
          secureTextEntry={true}
          Password={true}
        />
        <AppTextInput
          placeholder={'Enter Confirm Password'}
          setInputField={setConfirmPassword}
          value={confirmPassword}
          secureTextEntry={true}
          Password={true}
        />
      </View>
      <CommonButton
        OnClick={() => HandleSubmitDetails()}
        title={'Register'}
        type="submit"
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
  signupText: {
    fontSize: 25,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  registerText: {
    fontSize: 22,
    marginBottom: 22,
    textAlign: 'center',
  },
  InputFields: {
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    marginBottom: 24,
  },
});
