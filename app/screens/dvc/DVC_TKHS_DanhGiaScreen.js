/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, Text, View, ScrollView, ImageBackground, FlatList} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Divider, Button} from 'react-native-elements';
import {showMessage} from 'react-native-flash-message';

import {Header} from '../../components';
import {requestPOST} from '../../services/Api';

const RenderItemQuestion = (props) => {
  const {data, index, getQuestion} = props;

  const [listChoice, setListChoice] = useState(JSON.parse(JSON.stringify(data.Answer)));

  const handleCheckChieldElement = (itemChoice) => {
    let filteredDataSource = listChoice.filter((item) => {
      if (item.Value === itemChoice.Value) {
        item.checked = !item.checked;
      } else {
        item.checked = false;
      }

      return item;
    });

    setListChoice(filteredDataSource);

    let value = '';
    listChoice.map((i) => {
      if (i.checked) {
        value = i.Value;
      }
    });

    getQuestion(data.Code, value);
  };

  return (
    <View style={{marginVertical: 10}}>
      <Text style={{color: '#424242', fontWeight: '600'}}>{`Câu ${index + 1}: ${data.Question}`}: </Text>
      <View style={{padding: 1, backgroundColor: '#f5f5f5', marginVertical: 10, borderRadius: 8}}>
        <FlatList
          data={listChoice}
          renderItem={({item}) => (
            <TouchableOpacity
              style={{
                padding: 5,
                margin: 5,
                marginHorizontal: 10,
                flexDirection: 'row',
                alignItems: 'center',
                borderRadius: 5,
              }}
              onPress={() => {
                handleCheckChieldElement(item);
              }}>
              <Icon name={item.checked ? 'dot-circle' : 'circle'} color={'gray'} size={20} />
              <Text
                style={{
                  color: '#1e1e1e',
                  marginStart: 10,
                }}>
                {item.Text}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index_) => index_.toString()}
        />
      </View>
    </View>
  );
};

const DVC_MainScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const user = useSelector((state) => state.dvc.user);
  const dataService = useSelector((state) => state.global.dataService);
  const [isLoading, setIsLoading] = useState(false);

  const {data} = route.params;

  const [dataQuestion, setDataQuestion] = useState([]);

  const dataPost = useRef({token: user.token, id: data.Id});

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      var res = await requestPOST(`${dataService.DVC_URL}/GetRatingDocQuestion`, {
        token: user.token,
      });

      if (res && res.data) {
        setDataQuestion(res.data);
      }
      setIsLoading(false);
    };
    fetchData();
    return () => {};
  }, [dataService.DVC_URL, user.token]);

  const getQuestion = (code, value) => {
    dataPost.current[code] = value;
  };

  const GuiDanhGia = async () => {
    try {
      var res = await requestPOST(`${dataService.DVC_URL}/RatingDoc`, dataPost.current);
      showMessage({
        message: 'Thành công',
        description: 'Gửi đánh giá thành công!',
        type: 'success',
      });
      navigation.goBack();
    } catch (error) {
      showMessage({
        message: 'Thất bại',
        description: 'Gửi đánh giá thất bại!',
        type: 'success',
      });
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header title="Đánh giá dịch vụ công" isStack={true} />
      <ScrollView style={{padding: 15, paddingBottom: 15}}>
        <Text style={{color: '#757575', fontWeight: 'bold', marginVertical: 10, fontSize: 16}} numberOfLines={4}>
          {data.TenHoSo ? data.TenHoSo : data.ThuTuc ? data.ThuTuc : ''}
        </Text>
        <Text style={{color: '#424242'}}>Mã hồ sơ: {data.MaHoSo ? data.MaHoSo : ''}</Text>
        {dataQuestion.map((item, index) => (
          <RenderItemQuestion data={item} index={index} getQuestion={getQuestion} />
        ))}
      </ScrollView>
      <View
        style={{
          borderTopWidth: 0.5,
          borderTopColor: '#BDBDBD',
          backgroundColor: '#fff',
        }}>
        <Button
          title="Gửi đánh giá"
          titleStyle={{fontSize: 14, color: '#fff', fontWeight: '600'}}
          containerStyle={{marginVertical: 10, marginHorizontal: 50}}
          buttonStyle={{borderRadius: 10, backgroundColor: '#EF6C00', paddingVertical: 10}}
          onPress={() => {
            GuiDanhGia();
          }}
        />
      </View>
    </View>
  );
};

export default DVC_MainScreen;

const styles = StyleSheet.create({});
