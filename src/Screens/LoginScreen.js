import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';

import { COLORS } from '../assets/constants';
import { useTogglePasswordVisibility } from '../hooks/useTogglePasswordVisibility';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Platform,
  Keyboard,
  Pressable,
} from 'react-native';
import { authSignInUser } from '../../redux/auth/authOperations';

const initialState = {
  email: '',
  password: '',
};

const image = require('../assets/images/PhotoBG.jpg');

export default function LoginScreen({navigation}) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = () => {
    console.log('click')
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    dispatch(authSignInUser(state));
    setState(initialState);
  };

  const keyboardHide = () => {
    Keyboard.dismiss();
    setIsShowKeyboard(false);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
       <ImageBackground style={styles.image} source={image}>
    <View style={styles.formContainer}>
      <View
        style={{
          ...styles.form,
          marginBottom: isShowKeyboard ? -30 : 140,
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
              color='#BDBDBD'
            />
          </Pressable>
        </View>
        <TouchableOpacity 
        style={styles.btn} 
        activeOpacity={0.8} 
        onPress={() => navigation.navigate('Home')}>
          <Text style={styles.btnTitle} onPress={handleSubmit}>
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
    </ImageBackground>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },
  formContainer: {
    width: '100%',
    backgroundColor:  COLORS.bgColor,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  formTitle: {
    marginTop: 32,
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
    backgroundColor: COLORS.bgColorInput,
    borderColor: COLORS.borderColor,
    borderRadius: 8,
    fontSize: 18,
    color: COLORS.colorFontPrimary,
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
        backgroundColor: COLORS.buttonBgColorActive,
        borderColor: COLORS.buttonBgColorActive,
      },
      android: {
        backgroundColor: COLORS.buttonBgColorActive,
        borderColor: COLORS.buttonBgColorActive,
      },
    }),
  },
  btnTitle: {
    textAlign: 'center',
    paddingVertical: 16,

    fontSize: 16,
    color: COLORS.bgColor,
    fontFamily: 'Roboto-Regular',
  },
  boxQuestion: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  paragraph: {
    fontSize: 16,
    textAlign: 'center',
    color: '#1B4371',
    fontFamily: 'Roboto-Regular',
  },
  paragraphBtn: {
    fontSize: 16,
    marginLeft: 5,
    textAlign: 'center',
    color: '#1B4371',
    fontFamily: 'Roboto-Regular',
  },
});