import {useContext} from 'react';
import AppContext from './context';
import appStorage from './storage';

const useData = () => {
  const {userData, setUserData, cartData, setCartData, language, setLanguage} =
    useContext(AppContext);

  const logOut = () => {
    setUserData(null);
    appStorage.removeData();
  };

  const logIn = async user => {
    setUserData(user);
    appStorage.storeData({user, cartData, language});
  };

  const EditProduct = async products => {
    setCartData(products);
    appStorage.storeData({user: userData, cartData: products, language});
  };

  const ChangeLanguage = async language => {
    setLanguage(language);
    appStorage.storeData({user: userData, cartData, language});
  };

  return {
    userData,
    setUserData,
    cartData,
    setCartData,
    logOut,
    logIn,
    EditProduct,
    ChangeLanguage,
    language,
  };
};

export default useData;
