import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';

import { COLORS, IMGS } from '../assets/constants';
import { useTogglePasswordVisibility } from '../hooks/useTogglePasswordVisibility';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  Image,
  Pressable,
} from 'react-native';
import { authSignUpUser } from '../../redux/auth/authOperations';

const initialState = {
  login: '',
  email: '',
  password: '',
};

const avatar = require('../assets/images/avatar.png');

export default function RegistrationScreen({navigation}) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);

  const dispatch = useDispatch();

  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();

    dispatch(authSignUpUser(state));
    setstate(initialState);
  };

  return (
    <TouchableWithoutFeedback onPress={handleSubmit}>
      <ImageBackground style={styles.image} source={IMGS.bgImg}>
    <View style={styles.formContainer}>
      <View
        style={{
          ...styles.form,
          marginBottom: isShowKeyboard ? -50 : 78,
        }}
      >
        <View style={styles.imageContainer}>
          <Image source={avatar} />
        </View>
        <View>
          <Text style={styles.formTitle}>Регистрация</Text>
        </View>
        <View>
          <TextInput
            style={styles.input}
            textAlign={'start'}
            mode='outlined'
            outlineColor='#E8E8E8'
            activeOutlineColor={'#FF6C00'}
            onFocus={() => setIsShowKeyboard(true)}
            value={state.login}
            placeholder='Логин'
            placeholderTextColor='#BDBDBD'
            onChangeText={(value) =>
              setState((prevState) => ({ ...prevState, login: value }))
            }
          />
        </View>
        <View style={{ marginTop: 16 }}>
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
        <TouchableOpacity style={styles.btn} activeOpacity={0.8}>
          <Text style={styles.btnTitle} onPress={handleSubmit}>
            Зарегистрироваться
          </Text>
        </TouchableOpacity>
        <View style={styles.boxQuestion}>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.paragraph}>
            Уже есть аккаунт?{' '}
            <Text style={styles.paragraphBtn}>
             Войти
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
    position: 'relative',
    width: '100%',
    backgroundColor: COLORS.bgColor,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  imageContainer: {
    position: 'absolute',
    backgroundColor: COLORS.bgColor,
    width: 120,
    height: 120,
    borderRadius: 16,
    top: -60,
    left: 120,
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
        backgroundColor: COLORS.borderColorActive,
        borderColor: COLORS.borderColorActive,
      },
      android: {
        backgroundColor: COLORS.borderColorActive,
        borderColor: COLORS.borderColorActive,
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
    textAlign: 'center',
    color: '#1B4371',
    fontFamily: 'Roboto-Regular',
  },
});
