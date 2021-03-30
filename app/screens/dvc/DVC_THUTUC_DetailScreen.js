/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Image,
  TextInput,
  Keyboard,
  FlatList,
  Dimensions,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import {Divider} from 'react-native-elements';

import HTMLView from 'react-native-htmlview';
const {htmlToText} = require('html-to-text');

import {requestGET, requestPOST} from '../../services/Api';

import {Header} from '../../components';

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
  const dataService = useSelector((state) => state.global.dataService);

  const {data} = route.params;

  const [dataThuTuc, setDataThuTuc] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [timeline, setTimeline] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      var res = await requestPOST(`${dataService.DVC_URL}/GetProcedureDetailByCode`, {
        procedureCode: data.code,
      });

      if (res && res.data) {
        setDataThuTuc(res.data);
      }
      setIsLoading(false);
    };
    fetchData();
    return () => {};
  }, [data.code, dataService.DVC_URL]);

  if (isLoading || !dataThuTuc) {
    return (
      <View style={{flex: 1, backgroundColor: '#FFF'}}>
        <Header title="" isStack={true} />
      </View>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: '#FFF'}}>
      <Header title="" isStack={true} />
      <View style={{margin: 10}}>
        <Text
          style={{
            fontWeight: 'bold',
            paddingRight: 10,
            color: '#A6A8A7',
            textTransform: 'uppercase',
            fontSize: 15,
          }}>
          {dataThuTuc.linhvuc}
        </Text>
        <Text style={{color: '#343F46', fontWeight: 'bold', marginVertical: 10, fontSize: 16, marginTop: 15}} numberOfLines={4}>
          {data.name}
        </Text>
        <ImageBackground resizeMode="cover" style={{height: 110, margin: 10}} source={require('../../Images/ic_hcs.png')} />
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
            tabLabel="THÔNG TIN CHUNG"
            style={{backgroundColor: 'transparent', flex: 1}}>
            <View style={{marginStart: 10, flex: 1}}>
              <Text style={styles.text1}>Lĩnh vực</Text>
              <Text style={{color: '#343F46', marginTop: 5}}>{dataThuTuc.linhvuc}</Text>
              <Divider style={{backgroundColor: '#e8e8e8', marginTop: 10}} />

              <Text style={styles.text1}>Cơ quan thực hiện</Text>
              <Text style={{color: '#343F46', marginTop: 5}}>{htmlToText(dataThuTuc.coquanthuchien)}</Text>

              <Divider style={{backgroundColor: '#e8e8e8', marginTop: 10}} />

              <Text style={styles.text1}>Đơn vị thực hiện</Text>
              <Text style={{color: '#343F46', marginTop: 5}}>- Đơn vị: {dataThuTuc.donvithuchien}</Text>
              <Text style={{color: '#343F46', marginTop: 5}}>- Địa chỉ: {dataThuTuc.donvithuchien_diachi}</Text>
              <Text style={{color: '#343F46', marginTop: 5}}>- Điện thoại: {dataThuTuc.donvithuchien_dienthoai}</Text>
              <Text style={{color: '#343F46', marginTop: 5}}>- Email: {dataThuTuc.donvithuchien_email}</Text>
              <Divider style={{backgroundColor: '#e8e8e8', marginVertical: 10}} />

              <Text style={styles.text1}>Cách thực hiện</Text>
              <Text style={{color: '#343F46', marginTop: 5}}>{htmlToText(dataThuTuc.cachthucthuchien)}</Text>
              <Divider style={{backgroundColor: '#e8e8e8', marginVertical: 10}} />

              <Text style={styles.text1}>Đối tượng thực hiện</Text>
              <Text style={{color: '#343F46', marginTop: 5}}>{htmlToText(dataThuTuc.doituongthuchien)}</Text>
              <Divider style={{backgroundColor: '#e8e8e8', marginVertical: 10}} />

              <Text style={styles.text1}>Thời hạn giải quyết</Text>
              <Text style={{color: '#343F46', marginTop: 5}}>{htmlToText(dataThuTuc.thoihangiaiquyet)}</Text>
              <Divider style={{backgroundColor: '#e8e8e8', marginVertical: 10}} />

              <Text style={styles.text1}>Phí, lệ phí</Text>
              <Text style={{color: '#343F46', marginTop: 5}}>{htmlToText(dataThuTuc.lephithuchien)}</Text>
              <Divider style={{backgroundColor: '#e8e8e8', marginVertical: 10}} />

              <Text style={styles.text1}>Kết quả thực hiện</Text>
              <Text style={{color: '#343F46', marginTop: 5}}>{htmlToText(dataThuTuc.ketquathuchien)}</Text>
              <Divider style={{backgroundColor: '#e8e8e8', marginVertical: 10}} />
            </View>
          </ScrollView>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            tabLabel="TRÌNH TỰ THỰC HIỆN"
            style={{backgroundColor: 'transparent', flex: 1}}>
            <View style={{marginStart: 10, flex: 1}}>
              <Text style={{color: '#343F46', marginTop: 5}}>{htmlToText(dataThuTuc.trinhtuthuchien)}</Text>
            </View>
          </ScrollView>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            tabLabel="THÀNH PHẦN HỒ SƠ"
            style={{backgroundColor: 'transparent', flex: 1}}>
            <View style={{marginStart: 10, flex: 1}}>
              {dataThuTuc.thanhphan &&
                dataThuTuc.thanhphan.map((item) => <Text style={{color: '#343F46', margin: 5}}>{item.name}}</Text>)}
            </View>
          </ScrollView>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            tabLabel="BIỂU MẪU HỒ SƠ"
            style={{backgroundColor: 'transparent', flex: 1}}>
            <View style={{marginStart: 10, flex: 1}}>
              <Text style={{color: '#343F46', margin: 15, textAlign: 'center'}}>Không có nội dung tương ứng</Text>
            </View>
          </ScrollView>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            tabLabel="YÊN CẦU ĐIỀU KIỆN"
            style={{backgroundColor: 'transparent', flex: 1}}>
            <View style={{marginStart: 10, flex: 1}}>
              <HTMLView
                value={dataThuTuc.yeucaudieukien}
                style={{
                  margin: 10,
                  p: {
                    textAlign: 'justify',
                    margin: 0,
                  },
                }}
              />
            </View>
          </ScrollView>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            tabLabel="CĂN CỨ PHÁP LÝ"
            style={{backgroundColor: 'transparent', flex: 1}}>
            <View style={{marginStart: 10, flex: 1}}>
              <HTMLView
                value={dataThuTuc.cancuphaply}
                style={{
                  margin: 10,
                  p: {
                    textAlign: 'justify',
                    margin: 0,
                  },
                }}
              />
            </View>
          </ScrollView>
          {/* <View
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
              data={data?.ThanhPhanHoSo ?? []}
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
              {data.KetQuaXuLy && data.KetQuaXuLy.Ten ? (
                <RenderItem item={data.KetQuaXuLy} />
              ) : (
                <Text style={{textAlign: 'center', color: '#50565B', marginTop: 10}}>Không có nội dung tương ứng</Text>
              )}
            </>
          </View> */}
        </ScrollableTabView>
      </View>
    </View>
  );
};

export default DVC_TKHS_Detail;

const styles = StyleSheet.create({
  text1: {color: '#757575', fontSize: 15, marginTop: 10, fontWeight: 'bold'},
  p: {textAlign: 'justify'},
});
