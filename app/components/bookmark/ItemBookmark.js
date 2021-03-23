/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Divider} from 'react-native-elements';

const ItemBanDo = (props) => {
  const {item, onPress, isList, navigation} = props;
  const {ContentType} = item;

  if (ContentType === 'bookmark_bando') {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          backgroundColor: '#FFF',
          margin: 5,
          borderColor: '#abb4bd65',
          borderWidth: 0.4,
          padding: 5,
          borderRadius: 4,
        }}
        onPress={() =>
          navigation.navigate('ChiTietDiaDiemScreen', {
            data: {id: item.TopicId},
          })
        }>
        <ImageBackground
          resizeMethod="resize"
          imageStyle={{borderBottomLeftRadius: isList ? 0 : 8, borderTopLeftRadius: isList ? 0 : 8}}
          style={{height: 120, width: 120, resizeMode: 'cover', aspectRatio: 1}}
          source={{uri: item.CoverUrl}}
        />
        <View style={{flex: 1, padding: 10}}>
          <Text style={{fontSize: 12, color: '#bdbdbd'}}>{item.CategoryName}</Text>
          <Text style={{fontWeight: 'bold', marginTop: 5, color: '#455a64'}} numberOfLines={2}>
            {item.TopicTitle}
          </Text>
          <View style={{flexDirection: 'row', marginTop: 5, alignItems: 'center'}}>
            <FontAwesome name={'clock'} size={12} color={'#F26946'} />
            <Text style={{marginStart: 5, fontSize: 12, color: '#F26946'}}>
              {item.TimeStart ? item.TimeStart : 'Đang cập nhật'}
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: 5, alignItems: 'center'}}>
            <FontAwesome name={'map-marker-alt'} size={12} color={'#F26946'} />
            <Text style={{marginStart: 5, fontSize: 12, color: '#455a64'}} numberOfLines={2}>
              {item.AddressDetail}
            </Text>
          </View>
        </View>
        <Divider style={{backgroundColor: 'blue', margin: 20}} />
      </TouchableOpacity>
    );
  } else {
    return <></>;
  }
};

export default ItemBanDo;

const styles = StyleSheet.create({});
