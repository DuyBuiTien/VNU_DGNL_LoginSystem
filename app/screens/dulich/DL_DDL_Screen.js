/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity, ImageBackground, Image} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

import {Header} from '../../components';
import {ItemMenuImage, BlockLogin} from '../../components/common';
import {DANHMUC} from '../../data/DL_Data';
import {requestPOST} from '../../services/Api';
import images from '../../themes/Images';

var imgs = [
  images.background.destination,
  images.background.placeholder,
  images.background.intro_DuLich,
  images.background.product,
  images.background.stage,
  images.background.destination,
  images.background.placeholder,
  images.background.intro_DuLich,
  images.background.product,
  images.background.stage,
];

const MainScreen = () => {
  const navigation = useNavigation();
  const dataService = useSelector((state) => state.global.dataService);

  const [data, setData] = useState([]);
  const fetchData = async () => {
    let datatmp = [];
    const res = await requestPOST(`${dataService.DL_URL}/GetLoaiHinhDuLichs`, {
      maxa: '',
    });

    res.data &&
      res.data.map((item, index) => {
        datatmp.push({
          id: 1,
          name: item.Name,
          navigate: 'DL_DSD_ListScreen',
          data: {name: item.Name, id: item.ID},
          icon: imgs[index],
          background: images.background.DL_bg,
        });
      });

    setData(datatmp);
    // setDatafinal(res.data ? res.data : []);
  };

  useEffect(() => {
    fetchData();
    return () => {};
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header title="Du lịch" isStack={true} />
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
          }}>
          {data.map((item) => (
            <ItemMenuImage item={item} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({});
