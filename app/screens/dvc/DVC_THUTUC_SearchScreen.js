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
import {RenderChonDonVi, RenderChonMucDo, RenderChonLinhVuc} from '../../components/dvc';

const RenderItem = (props) => {
  const {data, navigation, histories} = props;
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('DVC_THUTUC_DetailScreen', {
          data: data,
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
            textTransform: 'uppercase',
          }}>
          {data.procedurefield}
        </Text>

        <Text style={{color: '#757575', fontWeight: 'bold', flex: 1, marginVertical: 10}} numberOfLines={2}>
          {data.name ? data.name : ''}
        </Text>
        <View
          style={{
            marginTop: 10,
            padding: 5,
            backgroundColor: data.level === '4' ? '#d84315' : data.level === '3' ? '#fb8c00' : '#59A266',
            borderRadius: 10,
            width: 100,
            justifyContent: 'center',
          }}>
          <Text style={{color: '#FFF', fontWeight: 'bold', textAlign: 'center'}}>{`Mức độ ${data.level}`}</Text>
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
  const [DSMucDo, setDSMucDo] = useState([
    {
      name: 'Tất cả',
      code: '',
    },
    {
      name: 'Mức dộ 2',
      code: 2,
    },
    {
      name: 'Mức dộ 3',
      code: 3,
    },
    {
      name: 'Mức dộ 4',
      code: 4,
    },
  ]);

  const [DSDonViSo, setDSDonViSo] = useState([]);
  const [DSDonViQuanHuyen, setDSDonViQuanHuyen] = useState([]);
  const [DSDonViPhuongXa, setDSDonViPhuongXa] = useState([]);

  const [linhvuc, setLinhvuc] = useState({code: '', name: ''});
  const [donvi, setDonvi] = useState({code: '', name: ''});
  const [mucdo, setMucdo] = useState({code: '', name: ''});

  const [page, setPage] = useState(1);

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
  };

  const fetchThuTuc = async () => {
    setIsLoading(true);

    var res = await requestPOST(`${dataService.DVC_URL}/GetProcedureByUnit`, {
      unitCode: donvi.code,
      procedureFieldCode: linhvuc.code,
      level: mucdo.code,
      page: page,
      perpage: 50,
      //sort: 'desc',
      keysearch: inputValue.length > 4 ? inputValue : '',
    });

    setDataThuTuc(res.data);

    setIsLoading(false);
  };

  useEffect(() => {
    fetchThuTuc();
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [donvi, linhvuc, mucdo, page, inputValue]);

  useEffect(() => {
    const fetchLinhVuc = async () => {
      var res = await requestPOST(`${dataService.DVC_URL}/GetProcedureFieldByUnit`, {
        unitCode: donvi.code,
      });

      res.data && setDSLinhVuc(res.data);
    };
    if (donvi.code !== '') {
      fetchLinhVuc();
    } else {
      setDSLinhVuc([]);
    }
    return () => {};
  }, [dataService.DVC_URL, donvi]);

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

  const handleMucDo = (item) => {
    ModalHide();
    setMucdo(item);
  };

  const handleLinhVuc = (item) => {
    ModalHide();
    setLinhvuc(item);
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
            }}
            value={inputValue}
            selectionColor={'gray'}
            onSubmitEditing={TimKiem}
            clearButtonMode="always"
            style={{flex: 1, margin: 10, fontSize: 15}}
            keyboardType={'web-search'}
          />
        </View>
      </View>
      <View>
        <ScrollView horizontal style={{marginBottom: 10, flexDirection: 'row'}} showsHorizontalScrollIndicator>
          <RectButton onPress={ChonDonVi} style={[styles.contentChon, {backgroundColor: '#F7F7F7'}]}>
            <Text style={{color: 'gray', marginEnd: 10, fontWeight: donvi.name !== '' ? 'bold' : 'normal'}} numberOfLines={1}>
              {donvi.name !== '' ? donvi.name : 'Đơn vị'}
            </Text>
            <FontAwesome
              name={donvi.name === '' ? 'chevron-down' : 'times-circle'}
              color={donvi.name === '' ? 'gray' : '#F26946'}
            />
          </RectButton>
          <RectButton
            onPress={() => {
              if (donvi.name !== '') {
                ChonLinhVuc();
              }
            }}
            style={[styles.contentChon, {backgroundColor: donvi.name !== '' ? '#F7F7F7' : '#FCFBFC'}]}>
            <Text
              style={{
                color: linhvuc.name !== '' ? '#596267' : '#596267',
                marginEnd: 10,
                fontWeight: linhvuc.name !== '' ? 'bold' : 'normal',
              }}
              numberOfLines={1}>
              {linhvuc.name !== '' ? linhvuc.name : 'Lĩnh vực'}
            </Text>
            <FontAwesome
              name={linhvuc.name === '' ? 'chevron-down' : 'times-circle'}
              color={linhvuc.name === '' ? 'gray' : '#F26946'}
            />
          </RectButton>
          <RectButton onPress={ChonMucDo} style={[styles.contentChon, {backgroundColor: '#F7F7F7'}]}>
            <Text style={{color: 'gray', marginEnd: 10, fontWeight: mucdo.name !== '' ? 'bold' : 'normal'}} numberOfLines={1}>
              {mucdo.name !== '' ? mucdo.name : 'Tất cả'}
            </Text>
            <FontAwesome
              name={mucdo.name === '' ? 'chevron-down' : 'times-circle'}
              color={mucdo.name === '' ? 'gray' : '#F26946'}
            />
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
        {typeDialog === 'DonVi' ? (
          <RenderChonDonVi
            dataSo={DSDonViSo}
            dataQuanHuyen={DSDonViQuanHuyen}
            dataPhuongXa={DSDonViPhuongXa}
            handleDongY={handleDonVi}
            actionSheetRef={refRBSheet}
            ModalHide={ModalHide}
          />
        ) : typeDialog === 'LinhVuc' ? (
          <RenderChonMucDo
            data={DSLinhVuc}
            handleDongY={handleLinhVuc}
            actionSheetRef={refRBSheet}
            ModalHide={ModalHide}
            title="Chọn lĩnh vực"
          />
        ) : typeDialog === 'MucDo' ? (
          <RenderChonMucDo
            data={DSMucDo}
            handleDongY={handleMucDo}
            actionSheetRef={refRBSheet}
            ModalHide={ModalHide}
            title="Chọn mức độ"
          />
        ) : (
          <></>
        )}
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
