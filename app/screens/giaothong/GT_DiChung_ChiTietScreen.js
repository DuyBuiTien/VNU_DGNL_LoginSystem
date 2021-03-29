/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState, useEffect} from 'react';
import {StyleSheet, Text, View, ScrollView, Linking, TouchableOpacity, Platform, Image} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import {Header, Icon} from 'react-native-elements';
import {Divider} from 'react-native-elements';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import moment from 'moment';

import * as actions from '../../redux/global/Actions';

const MainScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const route = useRoute();
  const user = useSelector((state) => state.global.user);
  const dataService = useSelector((state) => state.global.dataService);

  const [data, setData] = useState(route.params?.data ?? {});

  let UsernameData = data.User.Username;

  const [checkDelete, setcheckDelete] = useState(user.username === UsernameData);

  const handlePhoneCall = (number) => {
    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${number}`;
    } else {
      phoneNumber = `telprompt:${number}`;
    }
    Linking.openURL(phoneNumber);
  };

  const handlePhoneSMS = (number) => {
    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = `sms:${number}`;
    } else {
      phoneNumber = `sms:${number}`;
    }
    Linking.openURL(phoneNumber);
  };

  const deleteItem = async () => {
    const res = await axios({
      method: 'delete',
      url: `${dataService.BOOKMARK_URL}/v1/dichungxe/${data.Id}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    dispatch(actions.setRandom());
    navigation.goBack();
  };

  const hoanThanh = async () => {
    const res = await axios({
      method: 'patch',
      url: `${dataService.BOOKMARK_URL}/v1/dichungxe/${data.Id}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
      data: {TrangThai: 1},
    });

    if (res && res.data && res.data.status === true && res.data.data) {
      dispatch(actions.setRandom());
      setData(res.data.data);
    }
  };

  const handleEdit = () => {
    navigation.navigate('GT_DiChung_SuaTin_Screen', {data: data});
  };

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
          text: `${data.VaiTro} - ${data.Ten}`,
          style: {color: '#2E2E2E', fontSize: 16, fontWeight: 'bold'},
        }}
        containerStyle={{backgroundColor: 'transparent', justifyContent: 'space-around'}}
        centerContainerStyle={{justifyContent: 'center'}}
      />
      <View style={{flex: 1}}>
        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
          <View style={{flex: 1, padding: 15}}>
            <Text style={{color: '#F23A27'}}>{data.VaiTro}</Text>
            <Text style={{marginTop: 10, fontWeight: 'bold', color: '#424242', fontSize: 16}}>{data.Ten}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 15}}>
              <FontAwesome name={'clock'} color="#F23A27" containerStyle={{paddingStart: 0}} onPress={() => {}} size={15} />
              <Text style={{marginStart: 10, flex: 1, color: '#424242', fontWeight: 'bold'}}>Ngày đăng</Text>
              <Text style={{marginHorizontal: 10, color: '#ff6e40'}}>
                {`${moment(new Date(data.createdAt)).format('DD/MM/YYYY')}`}
              </Text>
            </View>

            <Divider style={{backgroundColor: '#ff6e40', marginTop: 15}} />

            <View style={{marginTop: 15}}>
              <View style={{marginTop: 15}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <FontAwesome
                    name={'plane-departure'}
                    color="#F23A27"
                    containerStyle={{paddingStart: 0}}
                    onPress={() => {}}
                    size={15}
                  />
                  <Text style={{marginStart: 10, flex: 1, color: '#424242', fontWeight: 'bold'}}>Điểm đi</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                  <Text style={{marginStart: 20, flex: 1, color: '#424242'}}>{data.DiemDi}</Text>
                </View>
              </View>

              <View style={{marginTop: 15}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <FontAwesome
                    name={'plane-arrival'}
                    color="#F23A27"
                    containerStyle={{paddingStart: 0}}
                    onPress={() => {}}
                    size={15}
                  />
                  <Text style={{marginStart: 10, flex: 1, color: '#424242', fontWeight: 'bold'}}>Điểm đến</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                  <Text style={{marginStart: 20, flex: 1, color: '#424242'}}>{data.DiemDen}</Text>
                </View>
              </View>

              <View style={{marginTop: 15}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <FontAwesome
                    name={'calendar-alt'}
                    color="#F23A27"
                    containerStyle={{paddingStart: 0}}
                    onPress={() => {}}
                    size={15}
                  />
                  <Text style={{marginStart: 10, flex: 1, color: '#424242', fontWeight: 'bold'}}>Ngày khởi hành</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                  <Text style={{marginStart: 20, flex: 1, color: '#424242'}}>{`${moment(new Date(data.NgayDi)).format(
                    'DD/MM/YYYY',
                  )}`}</Text>
                </View>
              </View>

              <View style={{marginTop: 15}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <FontAwesome name={'phone'} color="#F23A27" containerStyle={{paddingStart: 0}} onPress={() => {}} size={15} />
                  <Text style={{marginStart: 10, flex: 1, color: '#424242', fontWeight: 'bold'}}>Điện thoại</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                  <Text style={{marginStart: 20, flex: 1, color: '#424242'}}>{data.SoDienThoai}</Text>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: '#eeeeee',
                      padding: 10,
                      borderRadius: 100,
                    }}
                    onPress={() => {
                      handlePhoneCall(data.SoDienThoai);
                    }}>
                    <FontAwesome name={'phone'} color="#F23A27" containerStyle={{paddingStart: 0}} />
                    <Text style={{marginStart: 20, color: '#424242'}}>{'Gọi ngay'}</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <Divider style={{backgroundColor: '#ff6e40', marginTop: 15}} />

              <View style={{marginTop: 15}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <FontAwesome name={'car'} color="#F23A27" containerStyle={{paddingStart: 0}} onPress={() => {}} size={15} />
                  <Text style={{marginStart: 10, flex: 1, color: '#424242', fontWeight: 'bold'}}>Phương tiện</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                  <Text style={{marginStart: 20, flex: 1, color: '#424242'}}>{data.LoaiPhuongTien}</Text>
                </View>
              </View>

              <View style={{marginTop: 15}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <FontAwesome
                    name={'bookmark'}
                    color="#F23A27"
                    containerStyle={{paddingStart: 0}}
                    onPress={() => {}}
                    size={15}
                  />
                  <Text style={{marginStart: 10, flex: 1, color: '#424242', fontWeight: 'bold'}}>Mục đích</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                  <Text style={{marginStart: 20, flex: 1, color: '#424242'}}>{data.MucDich}</Text>
                </View>
              </View>

              <View style={{marginTop: 15}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <FontAwesome name={'chair'} color="#F23A27" containerStyle={{paddingStart: 0}} onPress={() => {}} size={15} />
                  <Text style={{marginStart: 10, flex: 1, color: '#424242', fontWeight: 'bold'}}>Số ghế</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                  <Text style={{marginStart: 20, flex: 1, color: '#424242'}}>{data.TongSoGhe}</Text>
                </View>
              </View>

              <View style={{marginTop: 15}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <FontAwesome
                    name={'money-bill'}
                    color="#F23A27"
                    containerStyle={{paddingStart: 0}}
                    onPress={() => {}}
                    size={15}
                  />
                  <Text style={{marginStart: 10, flex: 1, color: '#424242', fontWeight: 'bold'}}>Giá</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                  <Text style={{marginStart: 20, flex: 1, color: '#424242'}}>
                    {data.GiaDuKien.toLocaleString('it-IT', {style: 'currency', currency: 'VND'})}
                  </Text>
                </View>
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
                  <Text style={{marginStart: 10, flex: 1, color: '#424242', fontWeight: 'bold'}}>Ghi chú</Text>
                </View>
                <Text style={{marginStart: 20, marginTop: 10, flex: 1, color: '#424242'}}>{data.GhiChu}</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      {checkDelete ? (
        <View style={{flexDirection: 'row'}}>
          {data.TrangThai == 0 && (
            <TouchableOpacity
              onPress={() => {
                handleEdit();
              }}
              style={{flex: 1, justifyContent: 'center', alignItems: 'center', padding: 5, backgroundColor: '#1976d2'}}>
              <FontAwesome name="edit" size={20} color="#FFF" />
              <Text style={{fontWeight: '600', color: '#FFF', margin: 5}}>Sửa tin</Text>
            </TouchableOpacity>
          )}
          {data.TrangThai == 0 && (
            <TouchableOpacity
              onPress={() => {
                hoanThanh();
              }}
              style={{flex: 1, justifyContent: 'center', alignItems: 'center', padding: 5, backgroundColor: '#00796b'}}>
              <FontAwesome name="calendar-check" size={20} color="#FFF" />
              <Text style={{fontWeight: '600', color: '#FFF', margin: 5}}>Hoàn thành</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => {
              deleteItem();
            }}
            style={{flex: 1, justifyContent: 'center', alignItems: 'center', padding: 5, backgroundColor: '#e65100'}}>
            <FontAwesome name="trash-alt" size={20} color="#FFF" />
            <Text style={{fontWeight: '600', color: '#FFF', margin: 5}}>Xoá tin</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => {
              handlePhoneCall(data.SoDienThoai);
            }}
            style={{flex: 1, justifyContent: 'center', alignItems: 'center', padding: 5, backgroundColor: '#e65100'}}>
            <FontAwesome name="phone-volume" size={20} color="#FFF" />
            <Text style={{fontWeight: '600', color: '#FFF', margin: 5}}>Gọi điện</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              handlePhoneSMS(data.SoDienThoai);
            }}
            style={{flex: 1, justifyContent: 'center', alignItems: 'center', padding: 5, backgroundColor: '#26a69a'}}>
            <FontAwesome name="sms" size={20} color="#FFF" />
            <Text style={{fontWeight: '600', color: '#FFF', margin: 5}}>Gửi SMS</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{flex: 1, justifyContent: 'center', alignItems: 'center', padding: 5, backgroundColor: '#1976d2'}}>
            <FontAwesome name="comments" size={20} color="#FFF" />
            <Text style={{fontWeight: '600', color: '#FFF', margin: 5}}>Chat</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({});
