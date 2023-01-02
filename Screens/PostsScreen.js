import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native';
const PostsScreen = () => {
  return (
    <View style={styles.container}>
                <Pressable
            style={styles.inputIcon}
            onPress={handlePasswordVisibility}
          >
            <MaterialCommunityIcons
              name={logOut}
              size={22}
              color='#232323'
            />
          </Pressable>
      <View style={styles.wrapInfo}>
        <Image
          style={styles.imageAvatar}
          source={require('../assets/images/Liubov Karman.jpg')}
        />
        <View style={styles.wrapUserInfo}>
          <Text style={styles.userName}>Liubov Karman</Text>
          <Text style={styles.userMail}>inkkli24@gmail.com</Text>
        </View>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingVertical: 32,
        paddingHorizontal: 16,
      },
      wrapInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 60,
      },
      imageAvatar: {
        width: 60,
        height: 60,
        borderRadius: 16,
        marginRight: 8,
      },
      wrapUserInfo: {
        flex: 1,
      },
      userName: {
        fontFamily: 'Roboto-Bold',
        fontSize: 13,
        lineHeight: 15,
        color: '#212121',
      },
      userMail: {
        fontFamily: 'Roboto-Regular',
        fontSize: 11,
        lineHeight: 13,
      },
  },
);

export default PostsScreen;