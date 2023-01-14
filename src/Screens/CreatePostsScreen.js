import React, { useState } from 'react';
import {
  StyleSheet,
  Keyboard,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  Image,
} from 'react-native';
import { Camera } from 'expo-camera';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Location from 'expo-location';

import { COLORS, IMGS } from '../assets/constants';
import db from '../firebase/config';

const initialState = {
  photo: '',
  title: '',
  location: '',
};

export default function CreatePostsScreen({ navigation }) {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [comment, setComment] = useState('');
  const [location, setLocation] = useState(null);

  const { userId, nickName } = useSelector((state) => state.auth);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
      }

      let locationRes = await Location.getCurrentPositionAsync({});
      setLocation(locationRes);
    })();
  }, []);

  const takePhoto = async () => {
    const { uri } = await camera.takePictureAsync();
    setPhoto(uri);
  };

  const sendPhoto = () => {
    uploadPhotoToServer();
    navigation.navigate('DefaultScreen');
  };

  const uploadPostToServer = async () => {
    const photo = await uploadPhotoToServer();
    const createPost = await db
      .firestore()
      .collection('posts')
      .add({ photo, comment, location: location.coords, userId, nickName });
  };

  const uploadPhotoToServer = async () => {
    const response = await fetch(photo);
    const file = await response.blob();

    const uniquePostId = Date.now().toString();

    await db.storage().ref(`postImage/${uniquePostId}`).put(file);

    const processedPhoto = await db
    .storage()
    .ref('postImage')
    .child(uniquePostId)
    .getDownloadURL();

    return processedPhoto;
  };

  const [state, setState] = useState(initialState);
  const handleSubmit = () => {
    console.log(state);
    setState(initialState);
  };

const isFormCompleted = state.photo && state.title && state.location;

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
      <View
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: COLORS.bgColor,
        }}
      >
      <Camera style={styles.camera} ref={setCamera}>
        {photo && (
          <View style={styles.takePhotoContainer}>
            <Image
              source={{ uri: photo }}
              style={{ height: 240, width: 200, borderRadius: 10  }}
            />
          </View>
        )}
        <TouchableOpacity onPress={takePhoto} style={styles.snapContainer}>
          <Text style={styles.snap}>SNAP</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={takePhoto}>
            <Image source={IMGS.addPhotoIcon} />
          </TouchableOpacity>
      </Camera>
        <View>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} onChangeText={setComment} />
        </View>
        <View style={styles.containerImage}>
          <View style={styles.wrapImage}>
            <View style={styles.addImage}>
            <View style={{ alignItems: 'center' }}>
            <Image source={IMGS.addPhotoIcon} />
          </View>
            </View>
          </View>
          <Text style={styles.textImage}>Загрузите фото</Text>
        </View>
        <View style={styles.form}>
          <TextInput
              style={styles.input}
              textAlign={'start'}
              mode='flat'
              underlineColor='#E8E8E8'
              backgroundColor='#fff'
              activeUnderlineColor={'#E8E8E8'}
              onFocus={() => setIsShowKeyboard(true)}
            value={state.title}
            placeholder={'Название...'}
            placeholderTextColor={'#BDBDBD'}
            onChangeText={(value) =>
              setState((prevState) => ({ ...prevState, title: value }))
            }
          />
          <TextInput
                  style={styles.inputMap}
                  textAlign={'start'}
                  mode='flat'
                  underlineColor='#E8E8E8'
                  backgroundColor='#fff'
                  activeUnderlineColor={'#E8E8E8'}
                  onFocus={() => setIsShowKeyboard(true)}
            value={state.location}
            placeholder={'Местность...'}
            placeholderTextColor={'#BDBDBD'}
            onChangeText={(value) =>
              setState((prevState) => ({ ...prevState, location: value }))
            }
          />
          <Image style={{ top: -38, left: 30 }} source={IMGS.mapPinIcon} />
          <TouchableOpacity
            activeOpacity={0.7}
            style={
              isFormCompleted
                ? [styles.button, { color: '#fff', backgroundColor: '#FF6C00' }]
                : styles.button
            }
            onPress={handleSubmit}
          >
            <Text style={styles.buttonTitle}>Опубликовать</Text>
          </TouchableOpacity>
          <View>
        <TouchableOpacity onPress={sendPhoto} style={styles.sendBtn}>
          <Text style={styles.sendLabel}>SEND</Text>
        </TouchableOpacity>
      </View>
        </View>
        </View>
      </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: COLORS.bgColor,
        },
        camera: {
          height: 240,
          marginHorizontal: 16,
          marginTop: 32,
          backgroundColor: COLORS.bgColorInput,
          borderBottomWidth: 1,
          borderBottomColor: COLORS.borderColor,
          borderBottomStyle: 'solid',
          borderRadius: 8,
          alignItems: 'center',
          justifyContent: 'center',
        },
        takePhotoContainer: {
          position: 'absolute',
          borderColor: '#fff',
          backgroundColor: 'tomato',
          top: 0,
          left: 0,
        },
        snap: {
          color: '#fff',
        },
        snapContainer: {
          borderWidth: 1,
          borderColor: '#ff0000',
          width: 70,
          height: 70,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 20,
        },
        containerImage: {    
          marginTop: 32,
          marginHorizontal: 16,
          height: 240,
          backgroundColor: COLORS.bgColorInput,
          borderBottomWidth: 1,
          borderBottomColor: COLORS.borderColor,
          borderBottomStyle: 'solid',
          borderRadius: 8,
          justifyContent: 'center',
        },
        wrapImage: {
          position: 'relative',
          height: 240,
          backgroundColor: '#F6F6F6',
          borderRadius: 8,
          borderWidth: 1,
          borderColor: '#E8E8E8',
          marginBottom: 8,
        },
        addImage: {
          position: 'absolute',
          top: 90,
          left: 141,
          width: 60,
          height: 60,
          backgroundColor: '#fff',
          borderRadius: '50%',
          justifyContent: 'center',
          alignItems: 'center',
        },
        cameraIcon: {},
        textImage: {
          fontFamily: 'Roboto-Regular',
          fontSize: 16,
          lineHeight: 19,
          color: '#BDBDBD',
        },
        form: {
          width: '100%',
          marginTop: 40,
          backgroundColor: '#fff',
        },
        button: {
          marginHorizontal: 16,
          marginTop: 23,
          marginBottom: 16,
          height: 48,
          backgroundColor: '#F6F6F6',
          borderRadius: 100,
          borderWidth: 1,
          justifyContent: 'center',
          alignItems: 'center',
          ...Platform.select({
            ios: {
              backgroundColor: COLORS.buttonBgColorPrimary,
              borderColor: COLORS.buttonBgColorPrimary,
            },
            android: {
              backgroundColor: COLORS.buttonBgColorPrimary,
              borderColor: COLORS.buttonBgColorPrimary,
            },
          }),
        },
        buttonTitle: {
          fontFamily: 'Roboto-Regular',
          paddingVertical: 16,
          textAlign: 'center',
          fontSize: 16,
          lineHeight: 19,
          color: COLORS.colorFontSecondary,
        },
        sendBtn: {
          marginHorizontal: 30,
          height: 40,
          borderWidth: 2,
          borderColor: '#20b2aa',
          borderRadius: 10,
          marginTop: 20,
          justifyContent: 'center',
          alignItems: 'center',
        },
        sendLabel: {
          color: '#20b2aa',
          fontSize: 20,
        },
        inputContainer: {
          marginHorizontal: 10,
        },
        input: {
          marginHorizontal: 16,
          paddingHorizontal: 16,
          fontFamily: 'Roboto-Regular',
          height: 50,
          borderRadius: 8,
          fontSize: 16,
          color: COLORS.colorFontSecondary,
        },
        inputMap: {
          marginHorizontal: 16,
          paddingHorizontal: 45,
          fontFamily: 'Roboto-Regular',
          height: 50,
          borderRadius: 8,
          fontSize: 16,
          color: COLORS.colorFontSecondary,
        },
      });
