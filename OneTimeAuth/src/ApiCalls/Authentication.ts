import axios from 'axios';
import Config from 'react-native-config';
import {ErrorToast} from '../common/CustomToast';
import {User} from '../common/types';

type SendOTPProps = {
  mobile_no: string;
  type?: string | null;
};

//Send OTP
export const SendOTP = async ({mobile_no, type}: SendOTPProps) => {
  let validate = false;
  await axios
    .post(`${Config.BACKEND_URL}/auth/sendOTP`, {
      mobile_no,
      type: type ? type : null,
    })
    .then(res => {
      validate = true;
    })
    .catch(err => {
      ErrorToast(err.response.data.error);

      validate = false;
    });

  return validate;
};

type VerifyOTP_Props = {
  mobile_no: string;
  otp: string;
  setAccessToken?: React.Dispatch<React.SetStateAction<string | null>>;
};

//Verify OTP
export const VerifyTheOTP = async ({
  mobile_no,
  otp,
  setAccessToken,
}: VerifyOTP_Props) => {
  let validate = false;

  await axios
    .post(`${Config.BACKEND_URL}/auth/verifyOTP`, {
      mobile_no,
      otpCode: otp,
    })
    .then(res => {
      if (res.data.accessToken) {
        if (setAccessToken) {
          setAccessToken(res.data.accessToken);
        }
      }
      validate = true;
    })
    .catch(error => {
      ErrorToast(error.response.data.error);
      validate = false;
    });

  return validate;
};

type RegisterFarmerProps = {
  user_data: {
    name: string;
    email_id: string;
    password: string;
    mobile_no: string;
  };
};

//Registration API
export const RegisterTheFarmer = async ({user_data}: RegisterFarmerProps) => {
  let validate = false;
  await axios
    .post(`${Config.BACKEND_URL}/auth/register`, {
      ...user_data,
    })
    .then(res => {
      validate = true;
    })
    .catch(error => {
      ErrorToast(error.response.data.error);
      validate = false;
    });

  return validate;
};

type LoginProps = {
  mobile_no: string;
  password: string;
};

//Login Api
export const LoginUserAPI = async ({mobile_no, password}: LoginProps) => {
  let data: User | null | {error: string} = null;
  try {
    await axios
      .post(`${Config.BACKEND_URL}/auth/login`, {
        mobile_no,
        password,
      })
      .then(res => {
        data = res.data;
      });
  } catch (error) {
    // @ts-ignore
    data = {error: error.response.data.error};
  }
  return data;
};

//get user profile
export const getUserProfile = async (token: string) => {
  let data: User | null = null;
  try {
    await axios
      .get(`${Config.BACKEND_URL}/auth/get_profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        data = res.data.data;
      });
  } catch (error) {}

  return data;
};

type ForgotPasswordProps = {
  accessToken: string | null;
  password: string;
  mobile_no: string;
};

//forgot Password API
export const ForgotPasswordAPI = async ({
  accessToken,
  password,
  mobile_no,
}: ForgotPasswordProps) => {
  let success = false;
  try {
    await axios
      .post(
        `${Config.BACKEND_URL}/auth/forgot-password`,
        {
          mobile_no,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      .then(res => {
        success = true;
      });
  } catch (error) {
    success = false;
  }
  return success;
};
