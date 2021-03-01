/* eslint-disable react-native/no-inline-styles */
import React, {Component, useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {requestGET, requestPOST} from '../../services/Api';

const ItemCovid = (props) => {
  const {name, data} = props;
  return (
    <View style={styles.container}>
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
    </View>
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
      var dataVN = data2.Data ? data2.Data : [];
      var data3 = await requestGET(`${url}/CovidWorld`);
      var dataTG = data3.Data ? data3.Data : [];

      console.log('aaa');

      let dataND = dataVN.find((i) => i.City == 'Nam Định');
      CasesNd = parseInt(dataND.Cases);
      RecoveredNd = parseInt(dataND.Cured);
      DeadNd = parseInt(dataND.Deaths);
      let Ndddt = CasesNd - RecoveredNd - DeadNd;

      setDataND({
        scn: CasesNd,
        ddt: Ndddt,
        khoi: RecoveredNd,
        tvong: DeadNd,
      });

      if (dataTG.length > 2) {
        let dataAll = dataTG[1];
        CasesVn = parseInt(dataAll.CasesVn);
        CasesWorld = parseInt(dataAll.CasesWorld);
        RecoveredVn = parseInt(dataAll.RecoveredVn);
        RecoveredWorld = parseInt(dataAll.RecoveredWorld);
        DeadVn = parseInt(dataAll.DeadVn);
        DeadWorld = parseInt(dataAll.DeadWorld);

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
    <>
      <ItemCovid name="Nam Định" data={dataND} />
      <ItemCovid name="Việt Nam" data={dataVN} />
      <ItemCovid name="Thế Giới" data={dataTG} />
    </>
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
