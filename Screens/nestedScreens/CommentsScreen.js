import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
const CommentsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>CommentsScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
});

export default CommentsScreen;