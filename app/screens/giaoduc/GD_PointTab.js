import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ActivityIndicator, FlatList, } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable';
import { List } from 'react-native-paper';

import { GD_INFO } from '../../data/GD_Data'

import { requestGET, requestPOST } from '../../services/Api';

import moment from 'moment';
moment.locale('vi');

const RenderItem = (props) => {
    const { item, expanded, setExpanded } = props;
    return(
      <List.Accordion
        title={item.TenMon}
        expanded={expanded}
        onPress={() => setExpanded(!expanded)}>
        <FlatList 
          data={item.Diems}
          renderItem={({ item, index }) => <RenderItem1 item={item} index={index} />}
          keyExtractor={(item, index) => index.toString()}
          extraData={item.Diems}
        />
      </List.Accordion>
    )
  }

  const RenderItem1 = (props) => {
    const { item } = props;
    return(
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{padding: 10, width: 150, color: '#616161'}}>{item.LoaiDiem}</Text>
        <Text style={{paddingStart: 20, color: '#616161'}}>{item.DSDiem}</Text>
      </View>
    )
  }

const GD_PointTab = () => {
    const navigation = useNavigation();
    const user = useSelector((state) => state.global.user);
    const [isLoading, setIsLoading] = useState(false);
    const dataService = useSelector((state) => state.global.dataService);
    const [dataPoint, setDataPoint] = useState([]);
    const [expanded, setExpanded] = useState(false);


    const fetchData = async () => {
        setIsLoading(true);
        var NamHocID = await AsyncStorage.getItem('NamHocID')
        var HocKyID = await AsyncStorage.getItem('HocKyID')
        var studentID = await AsyncStorage.getItem('studentID')
        var body = { 'token': GD_INFO.token, 'HocSinhID': studentID, 'NamHocID': NamHocID, 'HocKyID': HocKyID }
        var data1 = await requestPOST(`${dataService.GD_URL}/PhieuDiem`, body)
        var data2 = data1.data ? data1.data : []
        setDataPoint(data2)
        setIsLoading(false);
    };

    useEffect(() => {
        fetchData();
        return () => { };
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            {isLoading ? (
                <ActivityIndicator size="large" color="#fb8c00" style={{ flex: 1, justifyContent: 'center' }} />
            ) : (
                    <View style={{flex: 1 }}>
                        <Text style={{ fontSize: 20, color: 'black', paddingStart: 20, paddingTop: 20 }}>Phiếu điểm</Text>
                        <Animatable.View style={{ padding: 5 }} animation='fadeIn'>
                            <View style={{ alignSelf: 'stretch', flexDirection: 'row', backgroundColor: '#F5F5F5' }}>
                                <View style={{ flex: 1 / 4, paddingTop: 30, paddingBottom: 30, alignItems: 'center', justifyContent: 'center', backgroundColor: '#EEEEEE', borderRadius: 5 }}>
                                    <Text style={{ color: '#616161' }}>Trung bình</Text>
                                    <Text style={{ color: '#2AA5FF', fontSize: 20, padding: 5, fontWeight: 'bold' }}>{dataPoint.TB}</Text>
                                </View>
                                <View style={{ flex: 3 / 4, padding: 10, flexDirection: 'row', paddingTop: 30, }}>
                                    <View style={{ flex: 1 / 2 }}>
                                        <View style={{ flexDirection: 'row' }}><Text style={{ color: '#616161' }}>Học lực  </Text><Text>{dataPoint.HocLuc}</Text></View>
                                        <View style={{ flexDirection: 'row', paddingTop: 10 }}><Text style={{ color: '#616161' }}>Hạnh kiểm  </Text><Text>{dataPoint.HanhKiem}</Text></View>
                                        <View style={{ flexDirection: 'row', paddingTop: 10 }}><Text style={{ color: '#616161' }}>Danh hiệu  </Text><Text>{dataPoint.DanhHieu}</Text></View>
                                    </View>
                                    <View style={{ flex: 1 / 2 }}>
                                        <View style={{ flexDirection: 'row' }}><Text style={{ color: '#616161' }}>Vắng có phép  </Text><Text>0</Text></View>
                                        <View style={{ flexDirection: 'row', paddingTop: 10 }}><Text style={{ color: '#616161' }}>Vắng không phép  </Text><Text>0</Text></View>
                                    </View>
                                </View>
                            </View>
                            <FlatList
                                data={dataPoint}
                                renderItem={({ item, index }) => <RenderItem item={item} index={index} expanded={expanded} setExpanded={setExpanded} />}
                                keyExtractor={(item, index) => index.toString()}
                                extraData={dataPoint}
                            />
                        </Animatable.View>
                    </View>
                )}
        </View>
    );
};

export default GD_PointTab;

const styles = StyleSheet.create({
    text: {
        fontSize: 20, 
        color: 'black'
      },
      container:{
        backgroundColor: "#fff",
        flex: 1
      },
      tabView: {
        flex: 1
      },
      view1: {
        flexDirection: 'row', padding: 5, backgroundColor: '#2AA5FF', borderRadius: 20, paddingStart: 10, paddingEnd: 10,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        width: 180
      }
});
