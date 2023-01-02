import React, { useState } from 'react';
import {
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import CameraIcon from '../assets/images/icons/camera_alt-black-24dp 1.svg';


const initialState = {
  photo: '',
  title: '',
  location: '',
};

export default function CreatePostsScreen() {
  // state
  const [state, setState] = useState(initialState);
  const handleSubmit = () => {
    console.log(state);
    setState(initialState);
  };

  const isFormCompleted = state.photo && state.title && state.location;

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
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
      });
