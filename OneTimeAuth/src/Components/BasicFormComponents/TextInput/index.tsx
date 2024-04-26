import React, {useState} from 'react';
import {
  DimensionValue,
  KeyboardTypeOptions,
  StyleSheet,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type InputSectionProps = {
  value: string | undefined;
  setInputField: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
  secureTextEntry?: boolean;
  Password?: boolean;
  style?: Object;
  keyboardType?: KeyboardTypeOptions | undefined;
  width?: DimensionValue;
  editable?: boolean;
  maxLength?: number;
};

export default function AppTextInput({
  value,
  setInputField,
  placeholder,
  secureTextEntry = false,
  Password = false,
  style,
  keyboardType = 'default',
  width = '95%',
  editable = true,
  maxLength = 300,
}: InputSectionProps) {
  const [showPassword, setShowPassword] = useState<boolean>(secureTextEntry);
  return (
    <View style={{width: width ? width : '95%', position: 'relative'}}>
      <TextInput
        value={value}
        onChangeText={e => setInputField(e)}
        placeholder={placeholder}
        style={[styles.textInputStyle, style]}
        secureTextEntry={showPassword}
        placeholderTextColor="gray"
        keyboardType={keyboardType}
        editable={editable}
        maxLength={maxLength}
      />
      {Password && (
        <TouchableOpacity
          style={styles.iconStyle}
          onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? 'eye-off-sharp' : 'eye-sharp'}
            size={25}
            color={'gray'}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  textInputStyle: {
    width: '100%',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    // shadowColor: '#000',
    // shadowOffset: {width: 1, height: 1.5},
    // shadowOpacity: 2,
    // shadowRadius: 5,
    elevation: 3,
    marginBottom: 15,
    fontFamily: 'Urbanist-Regular',
    color: '#000',
  },
  iconStyle: {
    position: 'absolute',
    top: 15,
    right: 30,
  },
});
