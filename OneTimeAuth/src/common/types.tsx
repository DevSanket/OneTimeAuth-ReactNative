import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export type User = {
  name: string;
  mobile_no: string;
  email_id: string;
  accessToken: string;
};

export type NavigationProps = {
  navigation: StackNavigationProp<any, any>;
  route?: RouteProp<any, any>;
};
