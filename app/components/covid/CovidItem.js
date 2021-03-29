/* eslint-disable react-native/no-inline-styles */
import React, {Component, useState, useEffect} from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {requestGET, requestPOST} from '../../services/Api';
import {useNavigation} from '@react-navigation/native';

const SCREEN_WIDTH = Dimensions.get('screen').width;

const ItemCovid = (props) => {
  const navigation = useNavigation();

  const {name, data} = props;
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate('WebViewScreen', {
          data: {
            title: 'Tình hình dịch Covid',
            url: 'https://ncov.moh.gov.vn',
            colorHeader: '#252C68',
            hideBackForward: false,
            textColor: 'white',
          },
        })
      }>
      <View style={styles.name}>
        <Text style={styles.name_text}>{name}</Text>
      </View>
      <View>
        <View style={{flexDirection: 'row', marginTop: 5}}>
          <Text style={[styles.text, {color: '#c9302c'}]}>Ca nhiễm</Text>
          <Text style={[styles.text, {color: '#ff9c00'}]}>Đang điều trị</Text>
          <Text style={[styles.text, {color: '#34bfa3'}]}>Khỏi</Text>
          <Text style={[styles.text, {color: '#666666'}]}>Tử vong</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.text2, {color: '#c9302c'}]}>{data.scn.toLocaleString()}</Text>
          <Text style={[styles.text2, {color: '#ff9c00'}]}>{data.ddt.toLocaleString()}</Text>
          <Text style={[styles.text2, {color: '#34bfa3'}]}>{data.khoi.toLocaleString()}</Text>
          <Text style={[styles.text2, {color: '#666666'}]}>{data.tvong.toLocaleString()}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const ThongKeCovid = () => {
  const url = 'https://smartcity-v2.hanoi.gov.vn/Home';
  const [dataND, setDataND] = useState({
    scn: 0,
    ddt: 0,
    khoi: 0,
    tvong: 0,
  });
  const [dataVN, setDataVN] = useState({
    scn: 0,
    ddt: 0,
    khoi: 0,
    tvong: 0,
  });
  const [dataTG, setDataTG] = useState({
    scn: 0,
    ddt: 0,
    khoi: 0,
    tvong: 0,
  });
  useEffect(() => {
    const fetchData = async () => {
      var data2 = await requestGET(`${url}/CovidVietNam`);
      var dataVN_ = data2.Data ? data2.Data : [];
      var data3 = await requestGET(`${url}/CovidWorld`);
      var dataTG = data3.Data ? data3.Data : [];

      let dataND_ = dataVN_.find((i) => i.City === 'Nam Định');
      let CasesNd = parseInt(dataND_.Cases, 10);
      let RecoveredNd = parseInt(dataND_.Cured, 10);
      let DeadNd = parseInt(dataND_.Deaths, 10);
      let Ndddt = CasesNd - RecoveredNd - DeadNd;

      setDataND({
        scn: CasesNd,
        ddt: Ndddt,
        khoi: RecoveredNd,
        tvong: DeadNd,
      });

      if (dataTG.length > 2) {
        let dataAll = dataTG[1];
        let CasesVn = parseInt(dataAll.CasesVn, 10);
        let CasesWorld = parseInt(dataAll.CasesWorld, 10);
        let RecoveredVn = parseInt(dataAll.RecoveredVn, 10);
        let RecoveredWorld = parseInt(dataAll.RecoveredWorld, 10);
        let DeadVn = parseInt(dataAll.DeadVn, 10);
        let DeadWorld = parseInt(dataAll.DeadWorld, 10);

        let tgddt = CasesWorld - RecoveredWorld - DeadWorld;
        let vnddt = CasesVn - RecoveredVn - DeadVn;

        setDataVN({
          scn: CasesVn,
          ddt: vnddt,
          khoi: RecoveredVn,
          tvong: DeadVn,
        });
        setDataTG({
          scn: CasesWorld,
          ddt: tgddt,
          khoi: RecoveredWorld,
          tvong: DeadWorld,
        });
      }
    };
    fetchData();
    return () => {};
  }, []);

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <ItemCovid name="Nam Định" data={dataND} />
      <ItemCovid name="Việt Nam" data={dataVN} />
      <ItemCovid name="Thế Giới" data={dataTG} />
    </ScrollView>
  );
};

export default ThongKeCovid;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: 'gray',
    padding: 10,
    margin: 10,
    width: SCREEN_WIDTH - 20,
  },
  name: {
    backgroundColor: '#c9302c',
    padding: 5,
    alignItems: 'center',
    width: 120,
    borderRadius: 10,
  },
  name_text: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  text: {
    flex: 1,
    alignItems: 'center',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: 13,
  },
  text2: {
    flex: 1,
    alignItems: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
