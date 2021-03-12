/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity, ImageBackground, Image} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {Icon} from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import {Header} from '../../components';
import {ItemMenuImage, BlockLogin} from '../../components/common';
import HTMLView from 'react-native-htmlview';

import {requestGET} from '../../services/Api';

import moment from 'moment';
moment.locale('vi');

const TTCQ_DetailScreen = (props) => {
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
      <Header title="Tin tức" isStack={true} />
        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
            <View style={{flex: 1, padding: 10, paddingHorizontal: 20}}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>{data.title}</Text>
                <View style={{flexDirection: 'row', paddingVertical: 10}}>
                    <FontAwesome name='clock' size={16} color='#9E9E9E' />
                    <Text style={{color: '#9E9E9E', fontSize: 12, paddingLeft: 10}}>{moment(data.created_at).format('L')}</Text>
                </View>
                <HTMLView value={`<div>${data.content_html}</div>`} />
            </View>
        </ScrollView>
    </View>
  );
};

export default TTCQ_DetailScreen;

const styles = StyleSheet.create({});
