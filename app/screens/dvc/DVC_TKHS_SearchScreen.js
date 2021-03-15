/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {StyleSheet, Text, View, ActivityIndicator, TextInput, Keyboard, FlatList} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import {showMessage} from 'react-native-flash-message';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {requestGET} from '../../services/Api';

import {Header} from '../../components';

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

  const [listHS, setListHS] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const TimKiemHoSo = async () => {
    Keyboard.dismiss();
    setListHS([]);

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
        setListHS(res.data.DSHoSo);
      } else {
      }
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#FFF'}}>
      <Header title="Tra cứu hồ sơ" isStack={true} />
      <View style={{padding: 10, flex: 1}}>
        <Text style={{color: '#343F46', marginBottom: 15}}>
          Nhập mã hồ sơ hoặc số chứng minh thư vào ô bên dưới để bắt đầu tra cứu
        </Text>

        <Text style={{color: '#343F46', marginBottom: 15}}>Mã hồ sơ, chứng minh thư</Text>

        <TextInput
          placeholder={'Nhập mã hồ sơ/số chứng minh thư'}
          onChangeText={(text) => setInputValue(text)}
          value={inputValue}
          selectionColor={'gray'}
          clearButtonMode="always"
          style={{padding: 10, marginBottom: 15, borderColor: '#D1D1D1', borderWidth: 0.5, borderRadius: 8}}
        />

        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center', alignContent: 'center'}}
          onPress={() => {
            navigation.navigate('DVC_TKHS_ScanCameraScreen');
          }}>
          <Text
            style={{
              color: '#343F46',
              marginBottom: 15,
              marginEnd: 10,
              marginTop: 5,
              alignContent: 'center',
            }}>
            Hoặc quét mã hồ sơ
          </Text>
          <FontAwesome name={'barcode-read'} size={20} />
        </TouchableOpacity>

        <TouchableOpacity
          style={{width: '100%', backgroundColor: '#F23A27', padding: 10, marginTop: 10, borderRadius: 10}}
          onPress={() => TimKiemHoSo()}>
          <Text style={{textAlign: 'center', fontWeight: 'bold', color: '#FFF'}}>Tìm kiếm hồ sơ</Text>
        </TouchableOpacity>
        <View style={{flex: 1, marginTop: 10}}>
          {isLoading ? (
            <ActivityIndicator size="large" color="#fb8c00" style={{flex: 1, justifyContent: 'center'}} />
          ) : (
            <FlatList
              contentContainerStyle={{flexGrow: 1}}
              data={listHS}
              renderItem={({item, index}) => <RenderItem item={item} index={index} navigation={navigation} histories={[]} />}
              keyExtractor={(item, index) => index.toString()}
              ListEmptyComponent={() => (
                <Text style={{textAlign: 'center', color: '#50565B', marginTop: 10}}>Không có kết quả</Text>
              )}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default DVC_TKHS_SearchScreen;

const styles = StyleSheet.create({});
