/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import {TouchableOpacity} from 'react-native-gesture-handler';

const ItemBanDo = (props) => {
  const {item, onPress} = props;

  return (
    <TouchableOpacity style={{flexDirection: 'row', backgroundColor: '#FFF', borderRadius: 8}} onPress={() => onPress(item)}>
      <ImageBackground
        resizeMethod="resize"
        imageStyle={{borderBottomLeftRadius: 8, borderTopLeftRadius: 8}}
        style={{height: 120, width: 120, resizeMode: 'cover', aspectRatio: 1}}
        source={{uri: item.cover_url}}
      />
      <View style={{flex: 1, padding: 10}}>
        <Text style={{fontSize: 12, color: '#bdbdbd'}}>{item.category}</Text>
        <Text style={{fontWeight: 'bold', marginTop: 5, color: '#455a64'}} numberOfLines={2}>
          {item.title}
        </Text>
        <View style={{flexDirection: 'row', marginTop: 5, alignItems: 'center'}}>
          <FontAwesome name={'clock'} size={12} color={'#F26946'} />
          <Text style={{marginStart: 5, fontSize: 12, color: '#F26946'}}>
            {item.time_start ? item.time_start : 'Đang cập nhật'}
          </Text>
        </View>
        <View style={{flexDirection: 'row', marginTop: 5, alignItems: 'center'}}>
          <FontAwesome name={'map-marker-alt'} size={12} color={'#F26946'} />
          <Text style={{marginStart: 5, fontSize: 12, color: '#455a64'}} numberOfLines={1}>
            {item.address_detail}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ItemBanDo;

const styles = StyleSheet.create({});
