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
import db from '../firebase/config';

import CameraIcon from '../assets/images/icons/camera_alt-black-24dp 1.svg';


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
      <Camera style={styles.camera} ref={setCamera}>
        {photo && (
          <View style={styles.takePhotoContainer}>
            <Image
              source={{ uri: photo }}
              style={{ height: 200, width: 200, borderRadius: 10  }}
            />
          </View>
        )}
        <TouchableOpacity onPress={takePhoto} style={styles.snapContainer}>
          <Text style={styles.snap}>SNAP</Text>
        </TouchableOpacity>
      </Camera>
        <View>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} onChangeText={setComment} />
        </View>
        <View style={styles.containerImage}>
          <View style={styles.wrapImage}>
            <View style={styles.addImage}>
              <CameraIcon
                style={styles.cameraIcon}
                width={24}
                height={24}
                fill='#BDBDBD'
              />
            </View>
          </View>
          <Text style={styles.textImage}>Загрузите фото</Text>
        </View>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            selectionColor={'#212121'}
            value={state.title}
            placeholder={'Title...'}
            placeholderTextColor={'#BDBDBD'}
            onChangeText={(value) =>
              setState((prevState) => ({ ...prevState, title: value }))
            }
          />
          <TextInput
            style={styles.input}
            selectionColor={'#212121'}
            value={state.location}
            placeholder={'Location...'}
            placeholderTextColor={'#BDBDBD'}
            onChangeText={(value) =>
              setState((prevState) => ({ ...prevState, location: value }))
            }
          />
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
      {/* </KeyboardAvoidingView> */}
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: '#fff',
          paddingVertical: 32,
          paddingHorizontal: 16,
        },
        camera: {
          height: '70%',
          marginHorizontal: 2,
          marginTop: 40,
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'flex-end',
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
        takePhotoContainer: {
          position: 'absolute',
          top: 50,
          left: 10,
          borderColor: '#fff',
          borderWidth: 1,
          borderRadius: 10,
        },
        containerImage: {},
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
          marginTop: 32,
          backgroundColor: '#fff',
        },
        input: {
          fontFamily: 'Roboto-Regular',
          fontSize: 16,
          lineHeight: 19,
          height: 50,
          marginBottom: 16,
          borderBottomWidth: 1,
          borderBottomColor: '#E8E8E8',
          color: '#212121',
        },
        button: {
          marginTop: 16,
          height: 51,
          backgroundColor: '#F6F6F6',
          borderRadius: 100,
          justifyContent: 'center',
          alignItems: 'center',
        },
        buttonTitle: {
          fontFamily: 'Roboto-Regular',
          fontSize: 16,
          lineHeight: 19,
          color: '#BDBDBD',
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
          height: 50,
          borderWidth: 1,
          borderColor: '#fff',
          borderBottomColor: '#20b2aa',
        },
      });
