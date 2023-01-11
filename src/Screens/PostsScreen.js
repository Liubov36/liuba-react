import React from 'react';
import { View, FlatList, Image, Pressable, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { COLORS } from '../assets/constants';
import DefaultScreenPosts from '../Screens/nestedScreens/DefaultScreenPosts';
import CommentsScreen from '../Screens/nestedScreens/CommentsScreen';
import MapScreen from '../Screens/nestedScreens/MapScreen';

const NestedScreen = createStackNavigator();

const PostsScreen = () => {
  return (
    <NestedScreen.Navigator>
    <NestedScreen.Screen
      name='DefaultScreenPosts'
      component={DefaultScreenPosts}
    />
    <View style={styles.container}>
        <FlatList
        data={posts}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              marginBottom: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image
              source={{ uri: item.photo }}
              style={{ width: 350, height: 200 }}
            />
          </View>
        )}
      />
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
    <NestedScreen.Screen name='CommentsScreen' component={CommentsScreen} />
      <NestedScreen.Screen name='MapScreen' component={MapScreen} />
    </NestedScreen.Navigator>
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
        fontWeight: 700,
        fontSize: 13,
        lineHeight: 15,
        paddingLeft: 8,
        color: COLORS.colorFontPrimary,
        letterSpacing: 0.01,
      },
      userMail: {
        fontFamily: 'Roboto-Regular',
        fontWeight: 400,
        fontSize: 11,
        lineHeight: 13,
        paddingLeft: 8,
        letterSpacing: 0.01,
        color: COLORS.colorFontPostUserEmail,
      },
  },
);

export default PostsScreen;