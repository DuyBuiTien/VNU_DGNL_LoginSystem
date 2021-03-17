/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity, ImageBackground, Image, TextInput, FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import {useNavigation, useRoute} from '@react-navigation/native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {Header, Icon} from 'react-native-elements';
import {RectButton} from 'react-native-gesture-handler';

import ActionSheet from '../../modules/react-native-actions-sheet';

//import {Header} from '../../components';
import {requestGET} from '../../services/Api';

const RenderBinhLuan = (props) => {
  const {item, renderReply} = props;

  if (!item.item.parentid) {
    return (
      <View style={{padding: 5}}>
        <View style={{backgroundColor: '#F5F5F5', borderRadius: 10, padding: 5}}>
          <Text style={{fontSize: 14, color: 'black', fontWeight: '600'}}> {item.item.name}</Text>
          <Text style={{color: '#212121', padding: 5}}>{item.item.content}</Text>
        </View>
        <View style={{flexDirection: 'row', padding: 5, alignItems: 'center'}}>
          <Text style={{}}>{item.item.time}</Text>
          <TouchableOpacity onPress={() => renderReply(item.item)}>
            <Text style={{color: '#9E9E9E', paddingStart: 10, fontWeight: 'bold'}}>Phản hồi</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else {
    return (
      <View style={{padding: 5, paddingStart: 30}}>
        <View style={{backgroundColor: '#F5F5F5', borderRadius: 10, padding: 5}}>
          <Text style={{fontSize: 14, color: 'black', fontWeight: '600'}}> {item.item.name}</Text>
          <Text style={{color: '#212121', padding: 5}}>{item.item.content}</Text>
        </View>
        <Text style={{padding: 5}}>{item.item.time}</Text>
      </View>
    );
  }
};

const RenderKetQuaXuLy = (props) => {
  const {data, videoskq, imageskq, urlImagesKQ, navigation, dataService} = props;
  return (
    <View style={{paddingTop: 10, paddingBottom: 20}}>
      <Text style={{textAlign: 'center', fontSize: 16, color: 'black'}}>{data.coquanxuly}</Text>
      <View style={{flexDirection: 'row', alignItems: 'center', paddingTop: 10, paddingStart: 5, justifyContent: 'center'}}>
        <Text>{data.ngayxuly}</Text>
      </View>
      <View
        style={{
          borderBottomColor: '#e8e8e8',
          marginStart: 100,
          marginEnd: 100,
          borderBottomWidth: 0.5,
          height: 10,
          marginTop: 20,
          marginBottom: 20,
        }}
      />
      <Text style={styles.text1}>{data.noidungxuly}</Text>
      <TouchableOpacity
        style={{flex: 1}}
        onPress={() => navigation.navigate('GalleryScreen', {images: urlImagesKQ, title: data.coquanxuly})}>
        <FlatList
          //numColumns={width/100}
          contentContainerStyle={{}}
          data={imageskq}
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
      <FlatList
        data={videoskq}
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
  );
};

const PAHT_DetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const refRBSheet = useRef();

  const {data} = route.params;

  const dataService = useSelector((state) => state.global.dataService);
  const [dataPA, setDataPA] = useState(null);
  const [images, setImages] = useState([]);
  const [imageskq, setImageskq] = useState([]);
  const [videos, setVideos] = useState([]);
  const [videoskq, setVideoskq] = useState([]);
  const [urlImages, setUrlImages] = useState([]);
  const [urlImagesKQ, setUrlImagesKQ] = useState([]);
  const [comments, setComments] = useState([]);
  const [commentinput, setCommentinput] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const res = await requestGET(`${dataService.PAHT_URL}/ViewByID?id=${data.id}`);
      var data2 = await JSON.parse(res);

      const mediaguiarr = JSON.parse(data2.mediagui);
      const kqdgarr = JSON.parse(data2.ketquadanhgia);
      const mediakq = JSON.parse(data2.mediaketqua);
      const commentarr = JSON.parse(data2.comment);

      setComments(commentarr);

      let images_ = [];
      let imagesurl_ = [];
      let videos_ = [];

      mediaguiarr.map((item) => {
        if (item.type === 'Image') {
          images_.push(item);
          imagesurl_.push({url: item.url});
        } else if (item.type === 'Image') {
          videos_.push(item);
        }
      });

      let imageskq_ = [];
      let imagesurlKQ_ = [];
      let videoskq_ = [];

      mediakq.map((item) => {
        if (item.type === 'Image') {
          imageskq_.push(item);
          imagesurlKQ_.push({url: item.url});
        } else if (item.type === 'Image') {
          videoskq_.push(item);
        }
      });

      setUrlImages(imagesurl_);
      setUrlImagesKQ(imagesurlKQ_);
      setImages(images_);
      setImageskq(imageskq_);
      setVideos(videos_);
      setVideoskq(videoskq_);
      setDataPA(data2);
    };
    fetchData();
    return () => {};
  }, []);

  const sendComment = (input, id, parentId) => {
    refRBSheet.current.setModalVisible(false);
  };

  if (!dataPA) {
    return <></>;
  }

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {/* <Header title="Chi tiết phản ánh" isStack={true} /> */}
      <Header
        statusBarProps={{barStyle: 'dark-content', backgroundColor: 'transparent', translucent: true}}
        barStyle="dark-content"
        placement="left"
        leftComponent={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon
              name={'arrow-back'}
              color="#2E2E2E"
              underlayColor="#00000000"
              containerStyle={{paddingStart: 0, marginHorizontal: 10}}
            />
          </TouchableOpacity>
        }
        centerComponent={{
          text: 'Chi tiết phản ánh',
          style: {color: '#2E2E2E', fontSize: 18, fontWeight: 'bold'},
        }}
        rightComponent={
          {
            /* <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon
              name={'note-add'}
              color="#2E2E2E"
              underlayColor="#00000000"
              containerStyle={{paddingStart: 0, marginHorizontal: 10}}
            />
          </TouchableOpacity> */
          }
        }
        containerStyle={{backgroundColor: '#FFF', justifyContent: 'space-around'}}
        centerContainerStyle={{}}
      />
      <View style={{flex: 1, padding: 10}}>
        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{color: '#78909c', textTransform: 'uppercase', fontWeight: '600', marginHorizontal: 10, flex: 1}}>
              {data.linhvuc}
            </Text>

            <Text style={{color: '#bf360c', textTransform: 'uppercase', fontWeight: '600', marginHorizontal: 10}}>
              {data.tinhtrang}
            </Text>
          </View>
          <Text style={{color: '#37474f', fontWeight: 'bold', margin: 10, fontSize: 18}}>{data.tieude}</Text>
          <View style={{flexDirection: 'row', alignItems: 'center', padding: 5, flex: 1}}>
            <FontAwesome name="map-marker-alt" color="#757575" size={16} />
            <Text style={{color: '#757575', fontSize: 12, paddingStart: 10, flex: 1}} numberOfLines={2}>
              {data.diachi}
            </Text>

            <Text style={{color: '#757575', fontSize: 12, paddingStart: 10}}>{data.thoigiangui}</Text>
          </View>

          <View style={{height: 0.5, backgroundColor: 'gray', margin: 10}} />

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <FontAwesome name="user" size={16} />
            <Text style={{fontSize: 16, fontWeight: '600', color: '#37474f', marginStart: 10}}> {dataPA.hovaten}</Text>
          </View>

          <View style={{paddingTop: 20, borderBottomColor: '#e8e8e8', borderBottomWidth: 0.8}}>
            <Text style={{fontSize: 18, color: '#212121', fontWeight: 'bold'}}>Nội dung</Text>
            <Text style={{fontSize: 16, color: '#424242', paddingTop: 10, paddingBottom: 20}}>{dataPA.noidung}</Text>
          </View>

          {images && images.length > 0 && (
            <View style={{paddingTop: 20, borderBottomColor: '#e8e8e8', borderBottomWidth: 0.8}}>
              <Text style={{fontSize: 18, color: '#212121', fontWeight: 'bold'}}>Hình ảnh</Text>
              <TouchableOpacity
                style={{flex: 1}}
                onPress={() => navigation.navigate('GalleryScreen', {images: urlImages, title: dataPA.tieude})}>
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
          {dataPA.latitude ? (
            <View style={{paddingTop: 20, borderBottomColor: '#e8e8e8', borderBottomWidth: 0.8, minHeight: 60}}>
              <Text style={{fontSize: 18, color: '#212121', fontWeight: 'bold'}}>Vị trí</Text>
              <MapView
                provider={PROVIDER_GOOGLE}
                style={{height: 200, marginVertical: 10}}
                region={{
                  latitude: parseFloat(dataPA.latitude),
                  longitude: parseFloat(dataPA.longitude),
                  latitudeDelta: 0.001,
                  longitudeDelta: 0.001,
                }}
                showsUserLocation={true}>
                <MapView.Marker
                  coordinate={{latitude: parseFloat(dataPA.latitude), longitude: parseFloat(dataPA.longitude)}}
                  draggable
                />
              </MapView>
            </View>
          ) : (
            <></>
          )}

          <View style={{paddingTop: 20, borderBottomColor: '#e8e8e8', borderBottomWidth: 0.8}}>
            <Text style={{fontSize: 18, color: '#212121', fontWeight: 'bold'}}>Kết quả xử lý</Text>
            <RenderKetQuaXuLy
              data={dataPA}
              videoskq={videoskq}
              imageskq={imageskq}
              urlImagesKQ={urlImagesKQ}
              navigation={navigation}
              dataService={dataService}
            />
          </View>

          {comments.length > 0 && (
            <View style={{paddingTop: 20}}>
              <Text style={{fontSize: 18, color: '#212121', fontWeight: 'bold'}}>Bình luận ({comments.length})</Text>
              <FlatList
                data={comments}
                renderItem={(item, index) => <RenderBinhLuan item={item} />}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          )}
          <RectButton
            style={{flexDirection: 'row', alignItems: 'center'}}
            onPress={() => {
              refRBSheet.current.setModalVisible(true);
            }}>
            <Text
              style={{
                borderRadius: 5,
                borderWidth: 1,
                borderColor: '#eaeaea',
                backgroundColor: '#FAFAFA',
                margin: 10,
                padding: 10,
                color: 'gray',
                flex: 1,
              }}>
              Nhập bình luận...
            </Text>
          </RectButton>
        </ScrollView>
      </View>
      <ActionSheet
        // initialOffsetFromBottom={0.5}
        initialOffsetFromBottom={1}
        ref={refRBSheet}
        bounceOnOpen={true}
        bounciness={8}
        gestureEnabled={true}
        onClose={() => {
          //setTypeBottomSheet(0);
        }}
        containerStyle={{margin: 20}}
        defaultOverlayOpacity={0.3}>
        <View style={{flexDirection: 'row', alignItems: 'center', padding: 10}}>
          <TextInput
            autoCapitalize="none"
            style={{
              borderRadius: 5,
              borderWidth: 1,
              borderColor: '#eaeaea',
              backgroundColor: '#FAFAFA',
              margin: 10,
              padding: 10,
              height: 80,
              flex: 1,
            }}
            multiline={true}
            placeholder=" Nhập bình luận..."
            onChangeText={(text) => setCommentinput(text)}
            value={commentinput}
            underlineColorAndroid={'transparent'}
          />
          <RectButton onPress={() => sendComment(commentinput, data.id, null)}>
            <FontAwesome name="paper-plane" color="#fb8c00" size={25} />
          </RectButton>
        </View>
      </ActionSheet>
    </View>
  );
};

export default PAHT_DetailScreen;

const styles = StyleSheet.create({});
