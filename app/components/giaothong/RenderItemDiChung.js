/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import moment from 'moment';

const RenderItemDiChung = (props) => {
  const {data, navigation} = props;

  console.log(data);
  return (
    <TouchableOpacity
      key={data.appid}
      onPress={() => navigation.navigate('GT_DiChung_ChiTietScreen', {data: data})}
      style={styles.content}>
      <View style={{flexDirection: 'row'}}>
        <Text style={{flex: 1}}>
          {data.VaiTro}
          <Text style={{fontWeight: 'bold'}}> {data.Ten}</Text>
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
          <FontAwesome name="suitcase-rolling" size={13} color="#dd2c00" />
          <Text style={{marginStart: 5, fontSize: 12, color: '#263238'}} numberOfLines={1}>
            {data.HanhLy}
          </Text>
        </View>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center', margin: 10}}>
        <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
          <FontAwesome name="car" size={13} color="#1a237e" />
          <Text style={{marginStart: 5, fontSize: 12, color: '#263238'}} numberOfLines={1}>
            {data.LoaiPhuongTien}
          </Text>
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
          <FontAwesome name="money-bill" size={13} color="#1a237e" />
          <Text style={{marginStart: 5, fontSize: 12, color: '#263238'}} numberOfLines={1}>
            {data.GiaDuKien}
          </Text>
        </View>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center', margin: 10}}>
        <View style={{flexDirection: 'row', alignItems: 'center', flex: 2}}>
          <FontAwesome name="calendar-alt" size={13} color="#004d40" />
          <Text style={{marginStart: 5, fontSize: 12, color: '#263238'}} numberOfLines={1}>
            {`${moment(new Date(data.NgayDi)).format('DD/MM/YYYY')}`}
          </Text>
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center', flex: 2}}>
          <FontAwesome name="clock" size={13} color="#004d40" />
          <Text style={{marginStart: 5, fontSize: 12, color: '#263238'}} numberOfLines={1}>
            {`${data.GioDi}`}
          </Text>
        </View>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center', margin: 10}}>
        <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
          <FontAwesome name="plane-departure" size={13} color="#004d40" />
          <Text style={{marginStart: 5, fontSize: 12, color: '#263238', flex: 1}} numberOfLines={1}>
            {data.DiemDi}
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
          <FontAwesome name="plane-arrival" size={13} color="#004d40" />
          <Text style={{marginStart: 5, fontSize: 12, color: '#263238', flex: 1}} numberOfLines={1}>
            {data.DiemDen}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RenderItemDiChung;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    borderWidth: 0.5,
    margin: 5,
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    borderColor: '#abb4bd65',
    shadowRadius: 2,
    elevation: 2,
  },
});
