/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, ImageBackground} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';

const ItemDanhBa = (props) => {
  const {item, onPress} = props;

  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(item.phone ? item.phone : item.emergency_phone)}>
      <ImageBackground
        resizeMethod="resize"
        imageStyle={{borderRadius: 8}}
        style={styles.img}
        source={{uri: item.cover_url ? item.cover_url : item.avatar}}
      />
      <View style={{flex: 1, margin: 10}}>
        <Text style={{fontWeight: 'bold', color: '#455a64'}} numberOfLines={2}>
          {item.name}
        </Text>
        <View style={{flexDirection: 'row', marginTop: 5, alignItems: 'center'}}>
          <FontAwesome name={'phone'} size={12} color={'#F26946'} />
          <Text style={{marginStart: 5, fontSize: 12, color: '#F26946'}}>
            {item.phone ? item.phone : item.emergency_phone ? item.emergency_phone : 'Đang cập nhật'}
          </Text>
        </View>
        <View style={{flexDirection: 'row', marginTop: 5, alignItems: 'center'}}>
          <FontAwesome name={'map-marker-alt'} size={12} color={'#F26946'} />
          <Text style={{marginStart: 5, fontSize: 12, color: '#455a64'}} numberOfLines={2}>
            {item.address}
          </Text>
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
