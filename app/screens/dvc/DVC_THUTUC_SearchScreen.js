/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Keyboard,
  FlatList,
  ScrollView,
  Dimensions,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import {showMessage} from 'react-native-flash-message';
import {RectButton} from 'react-native-gesture-handler';

import {Button} from 'react-native-elements';
import ActionSheet from '../../modules/react-native-actions-sheet';
const SCREEN_HEIGHT = Dimensions.get('screen').height;

import {requestGET, requestPOST} from '../../services/Api';

import {Header} from '../../components';
import {RenderChonDonVi} from '../../components/dvc';

const RenderItem = (props) => {
  const {item, navigation, histories} = props;
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('DVC_TKHS_DetailScreen', {
          data: item,
        });
      }}
      style={{
        padding: 10,
        flexDirection: 'row',
        borderRadius: 5,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
      }}>
      <FontAwesome name="file-alt" color="#f44336" size={30} />
      <View
        style={{
          flex: 1,
          marginLeft: 10,
          borderBottomColor: '#e8e8e8',
          borderBottomWidth: 1,
          paddingBottom: 10,
        }}>
        <Text
          style={{
            fontWeight: '400',
            flex: 1,
            paddingRight: 10,
            color: '#A6A8A7',
          }}>
          {item.LinhVuc}
        </Text>

        <Text style={{color: '#757575', fontWeight: 'bold', flex: 1, marginVertical: 10}} numberOfLines={2}>
          {item.TenHoSo ? item.TenHoSo : item.ThuTuc ? item.ThuTuc : ''}
        </Text>
        <View
          style={{
            marginTop: 10,
            padding: 5,
            backgroundColor: '#59A266',
            borderRadius: 10,
            width: 100,
            justifyContent: 'center',
          }}>
          <Text style={{color: '#FFF', fontWeight: 'bold', textAlign: 'center'}}>{item.TrangThaiMobile}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const DVC_TKHS_SearchScreen = () => {
  const navigation = useNavigation();
  const dataService = useSelector((state) => state.global.dataService);
  const refRBSheet = useRef();

  const [dataThuTuc, setDataThuTuc] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [typeDialog, setTypeDialog] = useState('');

  const [DSLinhVuc, setDSLinhVuc] = useState([]);
  const [DSDonVi, setDSDonVi] = useState([]);
  const [DSMucDo, setDSMucDo] = useState([]);

  const [DSDonViSo, setDSDonViSo] = useState([]);
  const [DSDonViQuanHuyen, setDSDonViQuanHuyen] = useState([]);
  const [DSDonViPhuongXa, setDSDonViPhuongXa] = useState([]);

  const [linhvuc, setLinhvuc] = useState('');
  const [donvi, setDonvi] = useState({code: '', name: ''});
  const [mucdo, setMucdo] = useState('');

  const ChonLinhVuc = () => {
    refRBSheet.current.setModalVisible(true);
    setTypeDialog('LinhVuc');
  };
  const ChonDonVi = () => {
    refRBSheet.current.setModalVisible(true);
    setTypeDialog('DonVi');
  };
  const ChonMucDo = () => {
    refRBSheet.current.setModalVisible(true);
    setTypeDialog('MucDo');
  };

  const TimKiem = async () => {
    Keyboard.dismiss();
    setDataThuTuc([]);

    if (inputValue.length < 5) {
      showMessage({
        message: 'Lỗi! Từ khoá quá ngắn',
        description: 'Vui lòng nhập mã hồ sơ/số chứng minh thư trên 5 ký tự',
        type: 'danger',
        duration: 3000,
      });
    } else {
      setIsLoading(true);

      var res = await requestGET(`${dataService.DVC_URL}/SearchDocByKey/${inputValue}`);
      setIsLoading(false);

      if (res.data) {
        setDataThuTuc(res.data.DSHoSo);
      } else {
      }
    }
  };

  const fetchDonVi = async (func, type) => {
    var res = await requestPOST(`${dataService.DVC_URL}/GetUnitByGroup`, {
      group: type,
      parentcode: '',
    });

    res.data && func(res.data);
  };

  const ModalHide = () => {
    refRBSheet.current.setModalVisible(false);
    setTypeDialog('');
  };

  useEffect(() => {
    fetchDonVi(setDSDonViSo, 'Sở Ban Ngành');
    fetchDonVi(setDSDonViQuanHuyen, 'Quận Huyện');
    fetchDonVi(setDSDonViPhuongXa, 'Xã Phường');
    return () => {};
  }, []);

  const handleDonVi = (item) => {
    ModalHide();
    setDonvi(item);
  };

  return (
    <View style={{flex: 1, backgroundColor: '#FFF'}}>
      <Header title="Tra cứu thủ tục" isStack={true} />
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View
          style={{
            backgroundColor: '#EAEAEA',
            flexDirection: 'row',
            borderRadius: 4,
            padding: 4,
            margin: 10,
            alignItems: 'center',
            flex: 1,
          }}>
          <FontAwesome name="search" color="#787C7E" size={20} style={{marginHorizontal: 5}} />
          <TextInput
            placeholder={'Tìm kiếm'}
            multiline={false}
            onChangeText={(text) => {
              setInputValue(text);
              TimKiem(text);
            }}
            value={inputValue}
            selectionColor={'gray'}
            clearButtonMode="always"
            style={{flex: 1, margin: 10, fontSize: 15}}
          />
        </View>
      </View>
      <View>
        <ScrollView horizontal style={{marginBottom: 10, flexDirection: 'row'}} showsHorizontalScrollIndicator>
          <RectButton onPress={ChonDonVi} style={[styles.contentChon, {backgroundColor: '#F7F7F7'}]}>
            <Text style={{color: 'gray', marginEnd: 10}} numberOfLines={1}>
              {donvi.name !== '' ? donvi.name : 'Đơn vị'}
            </Text>
            <FontAwesome
              name={donvi.name === '' ? 'chevron-down' : 'times-circle'}
              color={donvi.name === '' ? 'gray' : '#F26946'}
            />
          </RectButton>
          <RectButton
            onPress={ChonLinhVuc}
            style={[styles.contentChon, {backgroundColor: donvi.name !== '' ? '#F7F7F7' : '#FCFBFC'}]}>
            <Text
              style={{
                color: linhvuc !== '' ? '#596267' : '#596267',
                marginEnd: 10,
                fontWeight: linhvuc !== '' ? 'bold' : 'normal',
              }}
              numberOfLines={1}>
              {linhvuc !== '' ? linhvuc : 'Lĩnh vực'}
            </Text>
            <FontAwesome name={linhvuc === '' ? 'chevron-down' : 'times-circle'} color={linhvuc === '' ? 'gray' : '#F26946'} />
          </RectButton>
          <RectButton onPress={ChonMucDo} style={[styles.contentChon, {backgroundColor: '#F7F7F7'}]}>
            <Text style={{color: 'gray', marginEnd: 10, fontWeight: mucdo !== '' ? 'bold' : 'normal'}} numberOfLines={1}>
              {mucdo !== '' ? mucdo : 'Tất cả'}
            </Text>
            <FontAwesome name={mucdo === '' ? 'chevron-down' : 'times-circle'} color={mucdo === '' ? 'gray' : '#F26946'} />
          </RectButton>
        </ScrollView>
      </View>
      <View style={{flex: 1}}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#fb8c00" style={{flex: 1, justifyContent: 'center'}} />
        ) : (
          <FlatList
            contentContainerStyle={{flexGrow: 1, padding: 10}}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={dataThuTuc}
            renderItem={({item, index}) => (
              <RenderItem data={item} navigation={navigation} showPhone={true} showAddress={true} showTime={false} />
            )}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={() => (
              <Text style={{textAlign: 'center', color: '#50565B', marginTop: 10}}>Không có kết quả</Text>
            )}
          />
        )}
      </View>
      <ActionSheet
        // initialOffsetFromBottom={0.5}
        initialOffsetFromBottom={1}
        ref={refRBSheet}
        bounceOnOpen={true}
        bounciness={8}
        gestureEnabled={true}
        onClose={() => {
          //setTypeBottomSheet(0);
        }}
        containerStyle={{margin: 20}}
        defaultOverlayOpacity={0.3}>
        <RenderChonDonVi
          dataSo={DSDonViSo}
          dataQuanHuyen={DSDonViQuanHuyen}
          dataPhuongXa={DSDonViPhuongXa}
          handleDongY={handleDonVi}
          actionSheetRef={refRBSheet}
          ModalHide={ModalHide}
        />
      </ActionSheet>
    </View>
  );
};

export default DVC_TKHS_SearchScreen;

const styles = StyleSheet.create({
  contentChon: {
    padding: 10,
    margin: 5,
    borderRadius: 4,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
