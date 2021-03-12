/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity, ImageBackground, Image} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {Icon, Divider} from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import {Header} from '../../components';
import {ItemMenuImage, BlockLogin} from '../../components/common';
import HTMLView from 'react-native-htmlview';

import {requestGET} from '../../services/Api';

import moment from 'moment';
moment.locale('vi');

const TTCQ_DetailVBScreen = (props) => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.global.user);
  const dataService = useSelector((state) => state.global.dataService);
  const [isLoading, setIsLoading] = useState(false);
  const route = useRoute();
  const {data} = route.params;

  useEffect(() => {
    
    return () => {};
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header title="Văn bản" isStack={true} />
        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
            <View style={{padding: 10, paddingHorizontal: 20}}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>{data.subject}</Text>
                <View style={{flexDirection: 'row', paddingTop: 10}}>
                    <FontAwesome name='clock' size={16} color='#9E9E9E' />
                    <Text style={{color: '#9E9E9E', fontSize: 12, paddingLeft: 10}}>{moment(data.created_at).format('L')}</Text>
                </View>
            </View>
              <Divider style={{height: 8, backgroundColor: '#F5F5F5'}} />
            <View style={{padding: 10, paddingHorizontal: 20}}>
                <View style={{flexDirection: 'row', paddingVertical: 10}}>
                    <FontAwesome name='briefcase' size={16} color='#f44336' />
                    <Text style={{color: '#9E9E9E', paddingLeft: 10, fontWeight: '600'}}>CỔNG THÔNG TIN</Text>
                </View>
                <Text style={{paddingLeft: 26, paddingVertical: 10}}>Cổng thông tin điện tử Nam Định</Text>
                <View style={{flexDirection: 'row', paddingVertical: 10}}>
                    <FontAwesome name='file' size={16} color='#f44336' />
                    <Text style={{color: '#9E9E9E', paddingLeft: 10, fontWeight: '600'}}>LOẠI VĂN BẢN</Text>
                </View>
                <Text style={{paddingLeft: 26, paddingVertical: 10}}>Kế hoạch</Text>
                <View style={{flexDirection: 'row', paddingVertical: 10}}>
                    <FontAwesome name='tag' size={16} color='#f44336' />
                    <Text style={{color: '#9E9E9E', paddingLeft: 10, fontWeight: '600'}}>SỐ HIỆU VĂN BẢN</Text>
                </View>
                <Text style={{paddingLeft: 26, paddingVertical: 10}}>{data.code_notation}</Text>
                <View style={{flexDirection: 'row', paddingVertical: 10}}>
                    <FontAwesome name='building' size={16} color='#f44336' />
                    <Text style={{color: '#9E9E9E', paddingLeft: 10, fontWeight: '600'}}>CƠ QUAN BAN HÀNH</Text>
                </View>
                <Text style={{paddingLeft: 26, paddingVertical: 10}}>UBND tỉnh Nam Định</Text>
                <View style={{flexDirection: 'row', paddingVertical: 10}}>
                    <FontAwesome name='calendar' size={16} color='#f44336' />
                    <Text style={{color: '#9E9E9E', paddingLeft: 10, fontWeight: '600'}}>NGÀY BAN HÀNH</Text>
                </View>
                <Text style={{paddingLeft: 26, paddingVertical: 10}}>{moment(data.created_at).format('L')}</Text>
                <View style={{flexDirection: 'row', paddingVertical: 10}}>
                    <FontAwesome name='calendar' size={16} color='#f44336' />
                    <Text style={{color: '#9E9E9E', paddingLeft: 10, fontWeight: '600'}}>NGÀY HIỆU LỰC</Text>
                </View>
                <Text style={{paddingLeft: 26, paddingVertical: 10}}>{moment(data.active_at).format('L')}</Text>
                <View style={{flexDirection: 'row', paddingVertical: 10}}>
                    <FontAwesome name='user' size={16} color='#f44336' />
                    <Text style={{color: '#9E9E9E', paddingLeft: 10, fontWeight: '600'}}>NGƯỜI KÝ DUYỆT</Text>
                </View>
                <Text style={{paddingLeft: 26, paddingVertical: 10}}>{data.signer_in}</Text>
                <View style={{flexDirection: 'row', paddingVertical: 10}}>
                    <FontAwesome name='paperclip' size={16} color='#f44336' />
                    <Text style={{color: '#9E9E9E', paddingLeft: 10, fontWeight: '600'}}>TÀI LIỆU ĐÍNH KÈM</Text>
                </View>
                <View style={{paddingLeft: 26}}>
                  {data.list_files.map((i) => (
                    <TouchableOpacity style={{flexDirection: 'row', alignSelf: 'stretch', padding: 15, paddingHorizontal: 20, borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 10, alignItems: 'center', marginVertical: 5}}>
                      <FontAwesome name='file-alt' size={16} color='#f44336' />
                      <Text style={{ paddingLeft: 10, fontWeight: '600'}}>{i.name}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

            </View>
        </ScrollView>
    </View>
  );
};

export default TTCQ_DetailVBScreen;

const styles = StyleSheet.create({});
