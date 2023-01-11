import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Header = () => {
  return (
    <View style={styles.viewStyle}>
      <TouchableOpacity onPress={() => alert('Menu')}>
        <Ionicons name='exit-outline' size={20} />
      </TouchableOpacity>
      <Text style={styles.textStyle}>ALL PRODUCTS</Text>
      <TouchableOpacity onPress={() => alert('Shopping Cart')}>
        <Text>C</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    flexDirection: 'row',
    backgroundColor: '#f8f8f8',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
  },
  textStyle: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  cartStyle: {
    marginHorizontal: 15,
  },
});

export default Header;