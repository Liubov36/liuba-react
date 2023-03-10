import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Image, Button } from 'react-native';
import db from '../../firebase/config';

const DefaultScreenPosts = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);

  const getAllPost = async () => {
    await db
      .firestore()
      .collection('posts')
      .onSnapshot((data) =>
        setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
  };
 
  useEffect(() => {
    console.log('d');
    getAllPost();
  }, []);
 
  return (
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
        <View>
         <Text>{item.comment}</Text>
         </View>
         <View>
           <Button
             title='go to map'
             onPress={() =>
               navigation.navigate('MapScreen', { location: item.location })
             }
           />
           <Button
             title='add comments'
             onPress={() =>
               navigation.navigate('CommentsScreen', { postId: item.id })
             }
           />
         </View>
       </View>
       )}
       />
     </View>
   );
 };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default DefaultScreenPosts;