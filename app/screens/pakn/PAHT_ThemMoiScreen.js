/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity, ImageBackground, Image, TextInput} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import {useNavigation, useRoute} from '@react-navigation/native';

import {Button, Avatar} from 'react-native-elements';

import {Header} from '../../components';

const MainScreen = () => {
  const navigation = useNavigation();

  const [inputValue, setInputValue] = useState('');
  const [linhVuc, setLinhVuc] = useState('');
  const [tieuDe, setTieuDe] = useState('');
  const [moTa, setMoTa] = useState('');
  const [soDT, setSoDT] = useState('');
  const [viTri, setViTri] = useState('');

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header title="Gửi phản ánh" isStack={true} />
      <View style={{flex: 1}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          tabLabel="Đang xử lý"
          style={{backgroundColor: 'transparent', flex: 1}}>
          <View style={styles.content1}>
            <Text style={styles.title}>Hình ảnh</Text>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: 100,
                height: 100,
                borderRadius: 6,
                borderWidth: 0.5,
                borderColor: 'gray',
                marginTop: 10,
              }}>
              <FontAwesome name="plus" size={35} color="#F1462E" />
              <Text style={{color: '#B0B0B0', fontSize: 12}}>Thêm ảnh</Text>
            </View>
          </View>

          <View
            style={{
              marginHorizontal: 15,
              marginTop: 15,
              backgroundColor: '#F4E7D5',
              borderRadius: 10,
              padding: 10,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Avatar
              size="medium"
              rounded
              source={{
                uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
              }}
            />
            <View style={{marginHorizontal: 10}}>
              <Text style={{color: '#5B6062'}}>Tên người đăng tin</Text>
              <Text style={styles.title}>Nguyễn Tùng Lâm</Text>
            </View>
          </View>

          <View style={styles.content1}>
            <Text style={styles.title}>Lĩnh vực:</Text>
            <TouchableOpacity
              onPress={() => {}}
              style={{
                marginTop: 10,
                padding: 10,
                borderColor: '#D1D1D1',
                borderWidth: 0.5,
                borderRadius: 8,
                justifyContent: 'space-between',
                flexDirection: 'row',
                minHeight: 40,
                alignItems: 'center',
              }}>
              <Text style={{color: 'gray'}} numberOfLines={2}>
                {linhVuc !== '' ? linhVuc : 'Chọn lĩnh vực'}
              </Text>
              <FontAwesome name={'chevron-down'} color={'gray'} />
            </TouchableOpacity>
          </View>

          <View style={styles.content1}>
            <Text style={styles.title}>Tiêu đề:</Text>
            <View
              onPress={() => {}}
              style={{
                marginTop: 10,
                padding: 10,
                borderColor: '#D1D1D1',
                borderWidth: 0.5,
                borderRadius: 8,
                justifyContent: 'space-between',
                flexDirection: 'row',
                minHeight: 40,
                alignItems: 'center',
              }}>
              <TextInput
                placeholder={'Nhập tiêu đề'}
                onChangeText={(text) => setTieuDe(text)}
                value={tieuDe}
                multiline={true}
                selectionColor={'gray'}
                style={{flex: 1}}
                clearButtonMode="always"
              />
            </View>
          </View>

          <View style={styles.content1}>
            <Text style={styles.title}>Mô tả:</Text>
            <View
              style={{
                marginTop: 10,
                padding: 10,
                borderColor: '#D1D1D1',
                borderWidth: 0.5,
                borderRadius: 8,
                justifyContent: 'space-between',
                flexDirection: 'row',
                minHeight: 40,
                alignItems: 'center',
              }}>
              <TextInput
                placeholder={'Nhập mô tả'}
                onChangeText={(text) => setMoTa(text)}
                value={moTa}
                multiline={true}
                selectionColor={'gray'}
                style={{flex: 1, height: 100}}
                clearButtonMode="always"
              />
            </View>
          </View>

          <View style={styles.content1}>
            <Text style={styles.title}>Số điện thoại:</Text>
            <View
              style={{
                marginTop: 10,
                padding: 10,
                borderColor: '#D1D1D1',
                borderWidth: 0.5,
                borderRadius: 8,
                justifyContent: 'space-between',
                flexDirection: 'row',
                minHeight: 40,
                alignItems: 'center',
              }}>
              <TextInput
                placeholder={'Nhập số điện thoại'}
                onChangeText={(text) => setSoDT(text)}
                value={soDT}
                multiline={false}
                selectionColor={'gray'}
                style={{flex: 1}}
                clearButtonMode="always"
              />
            </View>
          </View>
          <View style={{marginHorizontal: 15, marginTop: 5}}>
            <Text style={{color: '#5B6062', fontSize: 12, fontWeight: '200', flex: 1}}>
              {'Bạn cần cung cấp đúng số điện thoại để đơn vị xử lý xác thực nội dung phản ánh'}
            </Text>
          </View>

          <View style={styles.content1}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <Text style={styles.title}>Vị trí phản ánh:</Text>
              <Text style={{color: 'blue', fontWeight: '600'}}>Vị trí của tôi</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
              <View
                style={{
                  padding: 10,
                  borderColor: '#D1D1D1',
                  borderWidth: 0.5,
                  borderRadius: 8,
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  minHeight: 40,
                  alignItems: 'center',
                  flex: 1,
                }}>
                <TextInput
                  placeholder={'Nhập vị trí'}
                  onChangeText={(text) => setViTri(text)}
                  value={viTri}
                  multiline={true}
                  selectionColor={'gray'}
                  style={{flex: 1}}
                  clearButtonMode="always"
                />
              </View>
              <Button
                title="Vị trí khác"
                titleStyle={{fontSize: 14, color: '#fff', fontWeight: '600'}}
                containerStyle={{marginStart: 10}}
                buttonStyle={{borderRadius: 4, backgroundColor: '#EF6C00', paddingVertical: 10}}
                onPress={() => {
                  navigation.navigate('PAHT_ThemMoiScreen');
                }}
              />
            </View>
          </View>
        </ScrollView>
      </View>

      <View
        style={{
          borderTopWidth: 0.5,
          borderTopColor: '#BDBDBD',
          backgroundColor: '#fff',
        }}>
        <Button
          title="Đăng tin phản ánh"
          titleStyle={{fontSize: 15, color: '#fff', fontWeight: '600'}}
          containerStyle={{margin: 10, marginHorizontal: 50, marginBottom: 30}}
          buttonStyle={{borderRadius: 10, backgroundColor: '#EF6C00', paddingVertical: 10}}
          onPress={() => {
            navigation.navigate('PAHT_ThemMoiScreen');
          }}
        />
      </View>
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  content1: {marginHorizontal: 15, marginTop: 15},
  title: {color: '#5B6062', fontWeight: '600'},
});
