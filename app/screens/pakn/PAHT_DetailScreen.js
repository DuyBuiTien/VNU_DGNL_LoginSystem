/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity, ImageBackground, Image, TextInput, FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import {useNavigation, useRoute} from '@react-navigation/native';

import {Header} from '../../components';
import {requestGET} from '../../services/Api';

const PAHT_DetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const {data} = route.params;

  const dataService = useSelector((state) => state.global.dataService);
  const [dataPA, setDataPA] = useState(null);
  const [images, setImages] = useState([]);
  const [imageskq, setImageskq] = useState([]);
  const [videos, setVideos] = useState([]);
  const [videoskq, setVideoskq] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await requestGET(`${dataService.PAHT_URL}/ViewByID?id=${data.id}`);
      var data2 = await JSON.parse(res);

      const mediaguiarr = JSON.parse(data2.mediagui);
      const kqdgarr = JSON.parse(data2.ketquadanhgia);
      const mediakq = JSON.parse(data2.mediaketqua);
      var images_ = mediaguiarr.filter(function (item) {
        return item.type === 'Image';
      });
      var videos_ = mediaguiarr.filter(function (item) {
        return item.type === 'Video';
      });
      var imageskq_ = mediakq.filter(function (item) {
        return item.type === 'Image';
      });
      var videoskq_ = mediakq.filter(function (item) {
        return item.type === 'Video';
      });
      setImages(images_);
      setImageskq(imageskq_);
      setVideos(videos_);
      setVideoskq(videoskq_);
      setDataPA(data2);
    };
    fetchData();
    return () => {};
  }, []);

  if (!dataPA) {
    return <></>;
  }

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header title="Tổng hợp ý kiến" isStack={true} />
      <View style={{flex: 1, padding: 10}}>
        <ScrollView>
          <View style={{flexDirection: 'row'}}>
            <Text style={{color: '#78909c', textTransform: 'uppercase', fontWeight: '600', marginHorizontal: 10, flex: 1}}>
              {data.linhvuc}
            </Text>

            <Text style={{color: '#ffca28', textTransform: 'uppercase', fontWeight: '600', marginHorizontal: 10}}>
              {data.tinhtrang}
            </Text>
          </View>
          <Text style={{color: '#37474f', fontWeight: '600', margin: 10, fontSize: 16}}>{data.tieude}</Text>
          <View style={{flexDirection: 'row', alignItems: 'center', padding: 5, flex: 1}}>
            <FontAwesome name="map-marker-alt" color="#757575" size={16} />
            <Text style={{color: '#757575', fontSize: 12, paddingStart: 10, flex: 1}} numberOfLines={2}>
              {data.diachi}
            </Text>

            <Text style={{color: '#757575', fontSize: 12, paddingStart: 10}}>{data.thoigiangui}</Text>
          </View>

          <View style={{height: 0.5, backgroundColor: 'gray', margin: 10}}></View>

          <View style={{flexDirection: 'row', alignItems: 'center', paddingBottom: 10}}>
            <FontAwesome name="user" size={18} />
            <Text style={{fontSize: 16, fontWeight: '600', color: '#37474f'}}> {dataPA.hovaten}</Text>
          </View>

          <View style={{paddingTop: 20, borderBottomColor: '#e8e8e8', borderBottomWidth: 0.8, minHeight: 60}}>
            <Text style={{fontSize: 18, color: '#212121', fontWeight: 'bold'}}>Nội dung</Text>
            <Text style={{fontSize: 16, color: '#424242', paddingTop: 10, paddingBottom: 20}}>{dataPA.noidung}</Text>
          </View>

          {images && images.length > 0 && (
            <View style={{paddingTop: 20, borderBottomColor: '#e8e8e8', borderBottomWidth: 0.8, minHeight: 60}}>
              <Text style={{fontSize: 18, color: '#212121', fontWeight: 'bold'}}>Hình ảnh</Text>
              <TouchableOpacity
                style={{flex: 1}}
                onPress={() => navigation.navigate('GalleryScreen', {images: images, title: dataPA.tieude})}>
                <FlatList
                  //numColumns={width/100}
                  contentContainerStyle={{}}
                  data={images}
                  renderItem={(item, index) => (
                    <Image
                      resizeMethod="resize"
                      style={{height: 100, width: 100, resizeMode: 'cover', aspectRatio: 1, margin: 10}}
                      source={{uri: `${item.item.url}`}}
                    />
                  )}
                  keyExtractor={(item, index) => index.toString()}
                  //ListEmptyComponent={this.showEmptyListView()}
                />
              </TouchableOpacity>
            </View>
          )}
          {videos && videos.length > 0 && (
            <View style={{paddingTop: 20, borderBottomColor: '#e8e8e8', borderBottomWidth: 0.8, minHeight: 60}}>
              <Text style={{fontSize: 18, color: '#212121', fontWeight: 'bold'}}>Video</Text>
              <FlatList
                data={videos}
                renderItem={(item, index) => (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('VideoScreen', {url: `${dataService.HOST_PAHT}${item.item.url}`});
                    }}
                    style={{
                      height: 150,
                      alignSelf: 'stretch',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'black',
                      margin: 20,
                    }}>
                    <FontAwesome name="film" size={34} color="white" />
                  </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
                //ListEmptyComponent={this.showEmptyListView()}
              />
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default PAHT_DetailScreen;

const styles = StyleSheet.create({});
