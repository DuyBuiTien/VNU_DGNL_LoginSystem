/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, View, ScrollView, Image} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Header, Icon} from 'react-native-elements';
import {Divider} from 'react-native-elements';

const MainScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const data = route.params?.data ?? {};

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header
        statusBarProps={{barStyle: 'dark-content', backgroundColor: 'transparent', translucent: true}}
        barStyle="dark-content"
        placement="left"
        leftComponent={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon
              name={'arrow-back'}
              color="#2E2E2E"
              underlayColor="#00000000"
              containerStyle={{paddingStart: 0, marginHorizontal: 10}}
            />
          </TouchableOpacity>
        }
        centerComponent={{
          text: `${data.Ten}`,
          style: {color: '#2E2E2E', fontSize: 16, fontWeight: 'bold'},
        }}
        rightComponent={
          <View style={{flexDirection: 'row'}}>
            <FontAwesome name={'bookmark'} color="#2E2E2E" containerStyle={{paddingStart: 0}} onPress={() => {}} size={20} />
          </View>
        }
        containerStyle={{backgroundColor: 'transparent', justifyContent: 'space-around'}}
        centerContainerStyle={{justifyContent: 'center'}}
      />
      <View style={{flex: 1}}>
        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
          <Image
            style={{height: 240, width: '100%', resizeMode: 'stretch'}}
            source={{
              uri:
                data.AnhDaiDien && data.AnhDaiDien.length > 5
                  ? data.AnhDaiDien
                  : 'https://vnn-imgs-f.vgcloud.vn/2020/01/10/14/ninh-thuan-thi-truong-day-hua-hen-cua-gioi-dau-tu-bds.jpg',
            }}
          />
          <View style={{flex: 1, padding: 15}}>
            <Text style={{color: '#F23A27'}}>{data.type}</Text>
            <Text style={{marginTop: 15, fontWeight: 'bold', color: '#424242', fontSize: 16}}>{data.Ten}</Text>

            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 15}}>
              <FontAwesome name={'archive'} color="#F23A27" containerStyle={{paddingStart: 0}} onPress={() => {}} size={15} />
              <Text style={{marginStart: 10, flex: 1, color: '#424242', fontWeight: '600'}}>Loại</Text>
              <Text style={{marginHorizontal: 10, color: '#ff6e40'}}>
                {data.DMLoaiCoSo && data?.DMLoaiCoSo.length > 2 ? data.DMLoaiCoSo : 'Đang cập nhật'}
              </Text>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 15}}>
              <FontAwesome name={'star'} color="#F23A27" containerStyle={{paddingStart: 0}} onPress={() => {}} size={15} />
              <Text style={{marginStart: 10, flex: 1, color: '#424242', fontWeight: '600'}}>Xếp hạng</Text>
              <Text style={{marginHorizontal: 10, color: '#ff6e40'}}>
                {data.DMXepHang && data?.DMXepHang.length > 2 ? data.DMXepHang : 'Đang cập nhật'}
              </Text>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 15}}>
              <FontAwesome name={'clock'} color="#F23A27" containerStyle={{paddingStart: 0}} onPress={() => {}} size={15} />
              <Text style={{marginStart: 10, flex: 1, color: '#424242', fontWeight: '600'}}>Giờ nhận phòng</Text>
              <Text style={{marginHorizontal: 10, color: '#ff6e40'}}>
                {data.GioNhanPhong && data?.GioNhanPhong.length > 2 ? data.GioNhanPhong : 'Đang cập nhật'}
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 15}}>
              <FontAwesome name={'clock'} color="#F23A27" containerStyle={{paddingStart: 0}} onPress={() => {}} size={15} />
              <Text style={{marginStart: 10, flex: 1, color: '#424242', fontWeight: '600'}}>Giờ trả phòng</Text>
              <Text style={{marginHorizontal: 10, color: '#ff6e40'}}>
                {data.GioTraPhong && data?.GioTraPhong.length > 2 ? data.GioTraPhong : 'Đang cập nhật'}
              </Text>
            </View>
            <Divider style={{backgroundColor: '#ff6e40', marginTop: 15}} />

            <View style={{marginTop: 15}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <FontAwesome
                  name={'map-marker-alt'}
                  color="#F23A27"
                  containerStyle={{paddingStart: 0}}
                  onPress={() => {}}
                  size={15}
                />
                <Text style={{marginStart: 10, flex: 1, color: '#424242', fontWeight: '600'}}>Địa chỉ</Text>
              </View>
              <Text style={{marginStart: 20, marginTop: 10, flex: 1, color: '#424242'}}>{data.DiaChi}</Text>
            </View>
            <View style={{marginTop: 15}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <FontAwesome name={'phone'} color="#F23A27" containerStyle={{paddingStart: 0}} onPress={() => {}} size={15} />
                <Text style={{marginStart: 10, flex: 1, color: '#424242', fontWeight: '600'}}>Điện thoại</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                <Text style={{marginStart: 20, flex: 1, color: '#424242'}}>{data.DienThoai}</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#eeeeee',
                    padding: 10,
                    borderRadius: 100,
                  }}>
                  <FontAwesome name={'phone'} color="#F23A27" containerStyle={{paddingStart: 0}} onPress={() => {}} size={15} />
                  <Text style={{marginStart: 20, color: '#424242'}}>{'Gọi ngay'}</Text>
                </View>
              </View>
            </View>
            <View style={{marginTop: 15}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <FontAwesome name={'globe'} color="#F23A27" containerStyle={{paddingStart: 0}} onPress={() => {}} size={15} />
                <Text style={{marginStart: 10, flex: 1, color: '#424242', fontWeight: '600'}}>Website</Text>
              </View>
              <Text style={{marginStart: 20, marginTop: 10, flex: 1, color: '#424242'}}>{data.Website}</Text>
            </View>
            <Divider style={{backgroundColor: '#ff6e40', marginTop: 15}} />

            <View style={{marginTop: 15}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <FontAwesome
                  name={'info-circle'}
                  color="#F23A27"
                  containerStyle={{paddingStart: 0}}
                  onPress={() => {}}
                  size={15}
                />
                <Text style={{marginStart: 10, flex: 1, color: '#424242', fontWeight: '600'}}>Mô tả</Text>
              </View>
              <Text style={{marginStart: 20, marginTop: 10, flex: 1, color: '#424242'}}>{data.mota}</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({});
