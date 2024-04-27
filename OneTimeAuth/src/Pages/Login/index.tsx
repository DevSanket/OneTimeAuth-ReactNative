import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext, useState} from 'react';
import AppContext from '../../context/context';
import useData from '../../context/useData';
import {ErrorToast} from '../../common/CustomToast';
import {StackNavigationProp} from '@react-navigation/stack';
import Screen from '../../Components/BasicComponents/Screen';
import AppText from '../../Components/BasicComponents/AppText';
import AppTextInput from '../../Components/BasicFormComponents/TextInput';
import CommonButton from '../../Components/BasicComponents/CommonButton';
import Colors from '../../common/DefaultColors';
import {LoginUserAPI} from '../../ApiCalls/Authentication';

type Props = {
  navigation: StackNavigationProp<any, any>;
};

export default function Login({navigation}: Props) {
  const [mobile_no, setMobileNo] = useState('');
  const [password, setPassword] = useState('');
  const {setCartData, setUserData, language} = useContext(AppContext);
  const {logIn} = useData();
  const [loading, setLoading] = useState(false);

  const LoginUser = async () => {
    if (mobile_no.length != 10) {
      ErrorToast('Invalid Phone No.');
      return;
    }
    if (password == '') {
      ErrorToast('Please Fill the Password');
      return;
    }
    setLoading(true);

    const data = await LoginUserAPI({mobile_no, password});
    setLoading(false);

    if (data?.error) {
      ErrorToast(data.error);
    }

    if (data) {
      //@ts-ignore
      logIn(data.data);
      //@ts-ignore
      setUserData(data.data);
    }
  };

  return (
    <Screen style={styles.container}>
      <AppText style={[styles.loginText, styles.item]}>Login</AppText>
      <AppText style={[styles.welcomeText, styles.item]}>Welcome</AppText>
      <AppText style={[styles.logintoContinue, styles.item]}>
        Login To Continue
      </AppText>

      <View style={[styles.InputFields, styles.item]}>
        <AppTextInput
          setInputField={setMobileNo}
          value={mobile_no}
          placeholder={'Phone No'}
          maxLength={10}
          keyboardType="numeric"
        />
        <AppTextInput
          setInputField={setPassword}
          value={password}
          placeholder={'Enter Password'}
          secureTextEntry={true}
          Password={true}
          maxLength={15}
        />
        <TouchableOpacity
          style={styles.forgotPasswordText}
          onPress={() => navigation.navigate('ForgotPassword')}>
          <AppText style={styles.forgotPassword}>Forgot Password?</AppText>
        </TouchableOpacity>
      </View>
      <CommonButton
        type="submit"
        OnClick={() => LoginUser()}
        title={'Login'}
        style={styles.item}
        disabled={loading}
      />

      <View style={styles.TextSection}>
        <AppText>Have An Account?</AppText>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <AppText style={styles.SignUp}>Sign Up</AppText>
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
  loginText: {
    fontSize: 32,
    fontWeight: '500',
  },
  welcomeText: {
    fontSize: 20,
  },
  logintoContinue: {
    color: Colors.Light_Blue_Gray,

    fontSize: 20,
    fontWeight: '300',
  },
  forgotPasswordText: {
    width: '100%',

    justifyContent: 'flex-end',
    alignContent: 'flex-end',
    paddingRight: 10,
  },
  forgotPassword: {textAlign: 'right', color: Colors.Light_Blue_Gray},
  InputFields: {
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    marginBottom: 24,
  },
  TextSection: {flexDirection: 'row', alignItems: 'center'},
  SignUp: {
    color: Colors.Dark_Green_Blue,
    textDecorationLine: 'underline',
    marginLeft: 2,
  },
});
