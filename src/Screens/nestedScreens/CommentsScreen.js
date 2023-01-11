import React, { useState, useEffect } from 'react';
import {
   View,
   Text,
    StyleSheet, 
    Image, 
    TextInput, 
    TouchableOpacity,
    ScrollView,
    Keyboard,
    Pressable,
    SafeAreaView, 
    FlatList, 
  } from 'react-native';
import { useSelector } from 'react-redux';

import { COLORS, IMGS } from '../../assets/constants';
import db from '../../firebase/config';

const CommentsScreen = ({ route }) => {
  const { postId } = route.params;
  const [comment, setComment] = useState('');
  const [allComments, setAllComments] = useState([]);
  const { nickName } = useSelector((state) => state.auth);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  useEffect(() => {
    getAllPosts();
  }, []);
  const createPost = async () => {
    db.firestore()
      .collection('posts')
      .doc(postId)
      .collection('comments')
      .add({ comment, nickName });
  };

  const getAllPosts = async () => {
    db.firestore()
      .collection('posts')
      .doc(postId)
      .collection('comments')
      .onSnapshot((data) =>
        setAllComments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
  };

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(state);
  };

  return (
    <ScrollView>
    <View style={styles.container}>
            <SafeAreaView style={styles.container}>
        <FlatList
          data={allComments}
          renderItem={({ item }) => (
            <View style={styles.commentContainer}>
              <Text>{item.nickName}</Text>
              <Text>{item.comment}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
      <View style={styles.imageContainer}>
          <Image
            style={{ width: '100%', borderRadius: 8 }}
            source={IMGS.sunsetPostImg}
          />
        </View>
        <View style={styles.formContainer}>
          <View
            style={{
              ...styles.form,
              marginBottom: isShowKeyboard ? -30 : 140,
            }}
          >
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} onChangeText={setComment} />
      </View>
      <TouchableOpacity onPress={createPost} style={styles.sendBtn}>
        <Text style={styles.sendLabel}>add post</Text>
      </TouchableOpacity>
      <View style={styles.commentWrapper}>
              <Image source={IMGS.commentAvatar} size={28} />
              <View style={styles.textWrapper}>
                <Text style={styles.text}>
                  Really love your most recent photo. I’ve been trying to
                  capture the same thing for a few months and would love some
                  tips!
                </Text>
                <Text style={styles.commentDate}>09 июня, 2020 | 08:40</Text>
              </View>
            </View>
            <View style={styles.commentWrapper}>
              <View style={styles.userTextWrapper}>
                <Text style={styles.userComment}>
                  A fast 50mm like f1.8 would help with the bokeh. I’ve been
                  using primes as they tend to get a bit sharper images.
                </Text>
                <Text style={styles.userCommentDate}>
                  09 июня, 2020 | 09:14
                </Text>
              </View>
              <Image source={IMGS.commentUserAvatar} />
            </View>
            <View style={styles.commentWrapper}>
              <Image source={IMGS.commentAvatar} size={28} />
              <View style={styles.textAnswerWrapper}>
                <Text style={styles.text}>
                  Thank you! That was very helpful!
                </Text>
                <Text style={styles.commentDate}>09 июня, 2020 | 0920</Text>
              </View>
              <View>
              <TextInput
                style={styles.input}
                keyboardType='comment'
                textAlign={'start'}
                mode='outlined'
                outlineColor='#E8E8E8'
                activeOutlineColor={'#FF6C00'}
                onFocus={() => setIsShowKeyboard(true)}
                value={state.comment}
                placeholder='Комментировать...'
                placeholderTextColor='#BDBDBD'
                onChangeText={(value) =>
                  setState((prevState) => ({
                    ...prevState,
                    comment: value,
                  }))
                }
              />
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('PostsScreen')}
              >
                <Image
                  style={{ top: -60, left: 314 }}
                  source={IMGS.sendCommentIcon}
                  size={22}
                  color='#232323'
                />
              </TouchableOpacity>
            </View>
            </View>
            </View>
    </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  commentContainer: {
    borderWidth: 1,
    borderColor: '#20b2aa',
    marginHorizontal: 10,
    padding: 10,
    marginBottom: 10,
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
    marginBottom: 30,
  },
  sendLabel: {
    color: '#20b2aa',
    fontSize: 20,
  },
  inputContainer: {
    marginHorizontal: 10,
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: 'transparent',
    borderBottomColor: '#20b2aa',
  },
  imageContainer: {
    flex: 1,
    marginBottom: 32,
    width: '100%',
    marginTop: 32,
    borderRadius: 8,
  },
  formContainer: {
    width: '100%',
    backgroundColor: '#fff',
  },
  commentWrapper: {
    width: 330,
    flexDirection: 'row',
    marginBottom: 24,
  },
  textWrapper: {
    marginLeft: 16,
    padding: 16,
    flexDirection: 'column',
    padding: 8,
    backgroundColor: '#E8E8E8',
  },
  text: {
    marginBottom: 8,
    fontFamily: 'Roboto-Regular',
    fontWeight: 400,
    fontSize: 13,
    color: '#212121',
    letterSpacing: 0.8,
  },
  commentDate: {
    textAlign: 'right',
    fontFamily: 'Roboto-Regular',
    fontWeight: 400,
    fontSize: 10,
    color: '#212121',
    letterSpacing: 0.1,
  },
  userTextWrapper: {
    marginRight: 16,
    padding: 16,
    flexDirection: 'column',
    padding: 8,
    backgroundColor: '#E8E8E8',
  },
  userComment: {
    marginBottom: 8,
    fontFamily: 'Roboto-Regular',
    fontWeight: 400,
    fontSize: 13,
    color: '#212121',
    letterSpacing: 0.8,
  },
  userCommentDate: {
    textAlign: 'left',
    fontFamily: 'Roboto-Regular',
    fontWeight: 400,
    fontSize: 10,
    color: '#212121',
    letterSpacing: 0.1,
  },
  textAnswerWrapper: {
    marginLeft: 16,
    padding: 16,
    width: 312,
    flexDirection: 'column',
    padding: 8,
    backgroundColor: '#E8E8E8',
  },
  form: {
    // marginHorizontal: 16,
  },
  input: {
    marginBottom: 16,
    paddingHorizontal: 16,
    height: 50,
    backgroundColor: '#F6F6F6',
    borderColor: '#E8E8E8',
    borderRadius: 100,
    fontSize: 16,
    color: '#212121',
  },
});

export default CommentsScreen;