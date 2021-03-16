/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import {showMessage} from 'react-native-flash-message';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import {Divider, Button} from 'react-native-elements';
import Timeline from 'react-native-timeline-flatlist';

import {Header} from '../../components';
import {requestPOST} from '../../services/Api';

const RenderItem = (props) => {
  const {item} = props;
  return (
    <View style={{padding: 10, backgroundColor: '#E1E1E1', borderRadius: 8, margin: 10}}>
      <Text style={{color: '#808080'}}>{item.Ten}</Text>
      {item.DinhKem && item.DinhKem.length > 0 && (
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            backgroundColor: '#F8F0E6',
            padding: 8,
            marginTop: 10,
            width: 130,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
          }}>
          <FontAwesome name="paperclip" color="#CE465B" size={18} />
          <Text style={{color: '#50565B', fontWeight: 'bold', marginStart: 10}}>File đính kèm</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const DVC_TKHS_Detail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {data} = route.params;
  const user = useSelector((state) => state.dvc.user);
  const [isLoading, setIsLoading] = useState(false);

  const dataService = useSelector((state) => state.global.dataService);

  const [dataHoSo, setDataHoSo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      var res = await requestPOST(`${dataService.DVC_URL}/GetPersonalDocDetail`, {
        token: user.token,
        id: data.Id,
      });

      if (res && res.data) {
        setDataHoSo(res.data);
      }
      setIsLoading(false);
    };
    fetchData();
    return () => {};
  }, [data.Id, dataService.DVC_URL, user.token]);

  const [timeline, setTimeline] = useState([]);

  useEffect(() => {
    let tmp = [];
    if (dataHoSo && dataHoSo.QuaTrinhXuLy) {
      dataHoSo.QuaTrinhXuLy.map((i) => {
        tmp.push({
          time: i.NgayThucHien,
          title: i.NoiDung,
          description: 'Người gửi : ' + i.NguoiGui + '\nNgười nhận : ' + i.NguoiNhan,
        });
      });
    }
    setTimeline(tmp);
    return () => {};
  }, [dataHoSo]);

  if (!dataHoSo) {
    return (
      <View style={{flex: 1, backgroundColor: '#FFF'}}>
        <Header title="Chi tiết hồ sơ" isStack={true} />
      </View>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: '#FFF'}}>
      <Header title="Chi tiết hồ sơ" isStack={true} />
      <View style={{margin: 10}}>
        <Text
          style={{
            fontWeight: '400',
            paddingRight: 10,
            color: '#A6A8A7',
            textTransform: 'uppercase',
            fontSize: 16,
          }}>
          {dataHoSo.LinhVuc}
        </Text>
        <Text style={{color: '#757575', fontWeight: 'bold', marginVertical: 10, fontSize: 16}} numberOfLines={4}>
          {dataHoSo.TenHoSo ? dataHoSo.TenHoSo : dataHoSo.ThuTuc ? dataHoSo.ThuTuc : ''}
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 5, justifyContent: 'space-between'}}>
          <View
            style={{
              padding: 8,
              backgroundColor: '#59A266',
              borderRadius: 4,
              justifyContent: 'center',
            }}>
            <Text style={{color: '#FFF', fontWeight: 'bold', textAlign: 'center'}}>{`${data.TrangThai}`}</Text>
          </View>
          <Text style={{color: '#bdbdbd', textAlign: 'center'}}>{`${data.NgayTao}`}</Text>
        </View>
      </View>
      <View style={{flex: 1}}>
        <ScrollableTabView
          style={{}}
          renderTabBar={() => <ScrollableTabBar />}
          initialPage={0}
          tabBarPosition="top"
          tabBarActiveTextColor="#757575"
          tabBarInactiveTextColor={'#BDBDBD'}
          tabBarUnderlineStyle={{backgroundColor: '#f44336', height: 2}}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            tabLabel="THÔNG TIN CHI TIẾT"
            style={{backgroundColor: 'transparent', flex: 1}}>
            <View style={{margin: 15, flexDirection: 'row'}}>
              <FontAwesome name="code-branch" type="font-awesome" color="#f44336" size={18} />
              <View style={{marginStart: 10, flex: 1}}>
                <Text style={{color: '#343F46', fontSize: 16, textTransform: 'uppercase'}}>Đơn vị cung cấp</Text>
                <Text style={{color: '#343F46', marginVertical: 10}}>{dataHoSo.DonVi}</Text>
              </View>
            </View>

            <View style={{margin: 15, flexDirection: 'row'}}>
              <FontAwesome name="code-branch" type="font-awesome" color="#f44336" size={18} />
              <View style={{marginStart: 10, flex: 1}}>
                <Text style={{color: '#343F46', fontSize: 16, textTransform: 'uppercase'}}>Thông tin hồ sơ</Text>

                <Text style={{color: '#343F46', fontSize: 16, marginTop: 10}}>Mã hồ sơ</Text>
                <Text style={{color: '#343F46', marginTop: 5}}>{dataHoSo.MaHoSo}</Text>
                <Divider style={{backgroundColor: '#e8e8e8', marginTop: 10}} />

                <Text style={{color: '#343F46', fontSize: 16, marginTop: 10}}>Chủ hồ sơ</Text>
                <Text style={{color: '#343F46', marginTop: 5}}>{dataHoSo.ChuHoSo}</Text>
                <Divider style={{backgroundColor: '#e8e8e8', marginTop: 10}} />

                <Text style={{color: '#343F46', fontSize: 16, marginTop: 10}}>CMND/CCCD</Text>
                <Text style={{color: '#343F46', marginTop: 5}}>{dataHoSo.CMNDChuHoSo}</Text>
                <Divider style={{backgroundColor: '#e8e8e8', marginVertical: 10}} />

                <Text style={{color: '#343F46', fontSize: 16, marginTop: 10}}>Email</Text>
                <Text style={{color: '#343F46', marginTop: 5}}>{dataHoSo.EmailChuHoSo}</Text>
                <Divider style={{backgroundColor: '#e8e8e8', marginVertical: 10}} />

                <Text style={{color: '#343F46', fontSize: 16, marginTop: 10}}>Địa chỉ</Text>
                <Text style={{color: '#343F46', marginTop: 5}}>{dataHoSo.DiaChiChuHoSo}</Text>
                <Divider style={{backgroundColor: '#e8e8e8', marginVertical: 10}} />

                <Text style={{color: '#343F46', fontSize: 16, marginTop: 10}}>Số điện thoại</Text>
                <Text style={{color: '#343F46', marginTop: 5}}>{dataHoSo.SoDienThoaiChuHoSo}</Text>
                <Divider style={{backgroundColor: '#e8e8e8', marginVertical: 10}} />

                <Text style={{color: '#343F46', fontSize: 16, marginTop: 10}}>Ngày nhận</Text>
                <Text style={{color: '#343F46', marginTop: 5}}>{dataHoSo.NgayTiepNhan}</Text>
                <Divider style={{backgroundColor: '#e8e8e8', marginVertical: 10}} />

                <Text style={{color: '#343F46', fontSize: 16, marginTop: 10}}>Ngày hoàn thành</Text>
                <Text style={{color: '#343F46', marginTop: 5}}>{dataHoSo.NgayTraKetQua}</Text>
                <Divider style={{backgroundColor: '#e8e8e8', marginVertical: 10}} />

                <Text style={{color: '#343F46', fontSize: 16, marginTop: 10}}>Ngày hẹn trả</Text>
                <Text style={{color: '#343F46', marginTop: 5}}>{dataHoSo.NgayHenTra}</Text>
                <Divider style={{backgroundColor: '#e8e8e8', marginVertical: 10}} />
              </View>
            </View>

            <View style={{margin: 15, flexDirection: 'row'}}>
              <FontAwesome name="code-branch" type="font-awesome" color="#f44336" size={18} />
              <View style={{marginStart: 10, flex: 1}}>
                <Text style={{color: '#343F46', fontSize: 16, textTransform: 'uppercase'}}>Thông tin người nộp hồ sơ</Text>

                <Text style={{color: '#343F46', fontSize: 16, marginTop: 10}}>Người nộp</Text>
                <Text style={{color: '#343F46', marginTop: 5}}>{dataHoSo.NguoiNop}</Text>
                <Divider style={{backgroundColor: '#e8e8e8', marginTop: 10}} />

                <Text style={{color: '#343F46', fontSize: 16, marginTop: 10}}>CMND/CCCD</Text>
                <Text style={{color: '#343F46', marginTop: 5}}>{dataHoSo.CMNDNguoiNop}</Text>
                <Divider style={{backgroundColor: '#e8e8e8', marginVertical: 10}} />

                <Text style={{color: '#343F46', fontSize: 16, marginTop: 10}}>Email</Text>
                <Text style={{color: '#343F46', marginTop: 5}}>{dataHoSo.EmailNguoiNop}</Text>
                <Divider style={{backgroundColor: '#e8e8e8', marginVertical: 10}} />

                <Text style={{color: '#343F46', fontSize: 16, marginTop: 10}}>Địa chỉ</Text>
                <Text style={{color: '#343F46', marginTop: 5}}>{dataHoSo.DiaChiNguoiNop}</Text>
                <Divider style={{backgroundColor: '#e8e8e8', marginVertical: 10}} />

                <Text style={{color: '#343F46', fontSize: 16, marginTop: 10}}>Số điện thoại</Text>
                <Text style={{color: '#343F46', marginTop: 5}}>{dataHoSo.SoDienThoaiNguoiNop}</Text>
                <Divider style={{backgroundColor: '#e8e8e8', marginVertical: 10}} />
              </View>
            </View>
          </ScrollView>
          <View
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            tabLabel="TIẾN ĐỘ THỰC HIỆN"
            style={{backgroundColor: 'transparent', flex: 1, padding: 10}}>
            <Timeline
              circleSize={20}
              circleColor="rgb(45,156,219)"
              lineColor="rgb(45,156,219)"
              timeContainerStyle={{minWidth: 50}}
              timeStyle={{textAlign: 'center', backgroundColor: 'rgb(45,156,219)', color: 'white', borderRadius: 5, padding: 5}}
              descriptionStyle={{color: 'gray'}}
              titleStyle={{color: 'black'}}
              data={timeline}
              innerCircle={'dot'}
            />
          </View>
          <View
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            tabLabel="THÀNH PHẦN HỒ SƠ"
            style={{backgroundColor: 'transparent', flex: 1, padding: 10}}>
            <FlatList
              contentContainerStyle={{flexGrow: 1}}
              data={dataHoSo?.ThanhPhanHoSo ?? []}
              renderItem={({item, index}) => <RenderItem item={item} index={index} />}
              keyExtractor={(i, index) => index.toString()}
              ListEmptyComponent={() => (
                <Text style={{textAlign: 'center', color: '#50565B', marginTop: 10}}>Không có kết quả</Text>
              )}
            />
          </View>
          <View
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            tabLabel="KẾT QUẢ GIẢI QUYẾT"
            style={{backgroundColor: 'transparent', flex: 1, padding: 10}}>
            <>
              {dataHoSo.KetQuaXuLy && dataHoSo.KetQuaXuLy.Ten ? (
                <RenderItem item={dataHoSo.KetQuaXuLy} />
              ) : (
                <Text style={{textAlign: 'center', color: '#50565B', marginTop: 10}}>Không có nội dung tương ứng</Text>
              )}
            </>
          </View>
        </ScrollableTabView>
      </View>

      {dataHoSo && dataHoSo.TrangThai === 'Trả kết quả' && dataHoSo.DanhGiaHaiLong === 'False' && (
        <View
          style={{
            borderTopWidth: 0.5,
            borderTopColor: '#BDBDBD',
            backgroundColor: '#fff',
          }}>
          <Button
            title="Đánh giá dịch vụ công"
            titleStyle={{fontSize: 14, color: '#fff', fontWeight: '600'}}
            containerStyle={{marginVertical: 10, marginHorizontal: 50}}
            buttonStyle={{borderRadius: 10, backgroundColor: '#EF6C00', paddingVertical: 10}}
            onPress={() => {
              navigation.navigate('DVC_TKHS_DanhGiaScreen', {data: dataHoSo});
            }}
          />
        </View>
      )}
    </View>
  );
};

export default DVC_TKHS_Detail;

const styles = StyleSheet.create({});
