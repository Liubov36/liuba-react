import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTogglePasswordVisibility } from '../hooks/useTogglePasswordVisibility';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Keyboard,
  Pressable,
} from 'react-native';

const initialState = {
  email: '',
  password: '',
};

export default function LoginScreen( {navigation}) {
  console.log("navigation", navigation);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();
  const [password, setPassword] = useState('');

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(state);
    setState(initialState);
  };

  return (
    <View style={styles.formContainer}>
      <View
        style={{
          ...styles.form,
          marginBottom: isShowKeyboard ? -50 : 78,
        }}
      >
        <View>
          <Text style={styles.formTitle}>Войти</Text>
        </View>

        <View>
          <TextInput
            style={styles.input}
            textAlign={'start'}
            mode='outlined'
            outlineColor='#E8E8E8'
            activeOutlineColor={'#FF6C00'}
            onFocus={() => setIsShowKeyboard(true)}
            value={state.email}
            placeholder='Адрес электронной почты'
            placeholderTextColor='#BDBDBD'
            onChangeText={(value) =>
              setState((prevState) => ({ ...prevState, email: value }))
            }
          />
        </View>
        <View style={{ marginTop: 16 }}>
          <TextInput
            style={styles.input}
            keyboardType='password'
            textAlign={'start'}
            mode='outlined'
            outlineColor='#E8E8E8'
            activeOutlineColor={'#FF6C00'}
            secureTextEntry={passwordVisibility}
            onFocus={() => setIsShowKeyboard(true)}
            value={state.password}
            placeholder='Пароль'
            placeholderTextColor='#BDBDBD'
            onChangeText={(value) =>
              setState((prevState) => ({
                ...prevState,
                password: value,
              }))
            }
          />
          <Pressable
            style={styles.inputIcon}
            onPress={handlePasswordVisibility}
          >
            <MaterialCommunityIcons
              name={rightIcon}
              size={22}
              color='#232323'
            />
          </Pressable>
        </View>
        <TouchableOpacity style={styles.btn} activeOpacity={0.8}>
          <Text style={styles.btnTitle} onPress={keyboardHide}>
            Войти
          </Text>
        </TouchableOpacity>
        <View style={styles.boxQuestion}>
        <TouchableOpacity onPress={() => navigation.navigate('RegistrationScreen')}>
          <Text style={styles.paragraph}>
            Нет аккаунта?{' '}
            <Text style={styles.paragraphBtn}>
              Зарегистрироваться
              </Text>
              </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  formTitle: {
    marginTop: 92,
    marginBottom: 33,
    fontFamily: 'Roboto-Regular',
    fontWeight: 500,
    fontSize: 30,
    letterSpacing: 0.01,
    textAlign: 'center',
  },
  form: {
    marginHorizontal: 16,
  },
  inputTitle: {
    color: 'blue',
    marginBottom: 10,
  },
  input: {
    paddingHorizontal: 16,
    height: 50,
    backgroundColor: '#F6F6F6',
    borderColor: '#E8E8E8',
    borderRadius: 8,
    fontSize: 18,
    color: '#212121',
  },
  inputIcon: {
    top: -38,
    left: 300,
  },
  btn: {
    marginTop: 43,
    marginBottom: 16,
    width: '100%',
    height: 48,
    borderRadius: 100,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        backgroundColor: '#FF6C00',
        borderColor: '#FF6C00',
      },
      android: {
        backgroundColor: '#FF6C00',
        borderColor: '#FF6C00',
      },
    }),
  },
  btnTitle: {
    textAlign: 'center',
    paddingVertical: 16,

    fontSize: 16,
    color: '#fff',
    fontFamily: 'Roboto-Regular',
  },
  boxQuestion: {
    // marginBottom: 78,
  },
  paragraph: {
    fontSize: 16,
    textAlign: 'center',
    color: '#1B4371',
    fontFamily: 'Roboto-Regular',
  },
  paragraphBtn: {
    fontSize: 16,
    textAlign: 'center',
    color: '#1B4371',
    fontFamily: 'Roboto-Regular',
  },
});