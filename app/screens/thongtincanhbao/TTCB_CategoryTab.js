/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity, ImageBackground, ActivityIndicator, FlatList} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';

import {requestGET} from '../../services/Api';

const RenderItem = (props) => {
  const {item, navigation} = props;
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('TTCB_DetailScreen', {title: item.Title, id: item.Id});
      }}
      style={{padding: 10, flex: 1, paddingBottom: 0}}>
      <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
        <View style={{alignItems: 'center', width: 40}}>
          <FontAwesome color="#f44336" name={item.Icon} size={28} />
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 15,
              backgroundColor: '#FFEB3B',
              alignItems: 'center',
              marginTop: 10,
              justifyContent: 'center',
            }}>
            <Text style={{textAlign: 'center', color: '#fff', fontWeight: 'bold'}}>{item.Count}</Text>
          </View>
        </View>
        <View style={{padding: 10, flex: 1}}>
          <Text style={styles.title}>{item.Title}</Text>
          <Text style={styles.description}>{item.Description}</Text>
        </View>
      </View>
      <View style={{borderBottomColor: '#e8e8e8', borderBottomWidth: 0.5, marginTop: 20}} />
    </TouchableOpacity>
  );
};

const TTCB_CategoryTab = () => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.global.user);
  const [isLoading, setIsLoading] = useState(false);
  const dataService = useSelector((state) => state.global.dataService);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    setIsLoading(true);
    var data3 = await requestGET(`${dataService.CB_URL}/categories`);

    var data4 = data3.data ? data3.data : [];

    setData(data4);

    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
    return () => {};
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#fb8c00" style={{flex: 1, justifyContent: 'center'}} />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={({item, index}) => <RenderItem item={item} index={index} navigation={navigation} />}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
};

export default TTCB_CategoryTab;

const styles = StyleSheet.create({});
