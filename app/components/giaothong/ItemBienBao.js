/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, ImageBackground} from 'react-native';

const ItemDanhBa = (props) => {
  const {data} = props;

  return (
    <TouchableOpacity style={styles.container}>
      <ImageBackground resizeMethod="resize" imageStyle={{borderRadius: 8}} style={styles.img} source={{uri: data.Icon}} />
      <View style={{flex: 1, marginStart: 15}}>
        <Text style={{fontWeight: 'bold', color: '#455a64'}} numberOfLines={2}>
          {data.Name}
        </Text>
        <View style={{flexDirection: 'row', marginTop: 5, alignItems: 'center'}}>
          <Text style={{fontSize: 13, color: '#455a64'}}>{data.Detail}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default ItemDanhBa;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    margin: 8,
    borderBottomColor: '#e8e8e8',
    borderBottomWidth: 1,
    paddingBottom: 10,
    alignItems: 'center',
  },
  img: {height: 80, width: 80, resizeMode: 'cover', aspectRatio: 1},
});
