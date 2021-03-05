/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5Pro';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Component = (props) => {
  let {listdata, handleModal, isMultiChoice, handleDongY, title, height} = props;

  const [listChoice, setListChoice] = useState(JSON.parse(JSON.stringify(listdata)));

  const handleCheckChieldElement = (itemChoice) => {
    let filteredDataSource = listChoice.filter((item) => {
      if (item.id === itemChoice.id) {
        item.checked = !item.checked;
      } else {
        if (!isMultiChoice) {
          item.checked = false;
        }
      }
      return item;
    });

    if (!isMultiChoice) {
      handleDongY(filteredDataSource);
    }
    setListChoice(filteredDataSource);
  };

  return (
    <View
      style={{
        backgroundColor: 'white',
        flex: 1,
        height: height ? height : 300,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            handleModal();
          }}>
          <Icon name={'times'} size={20} color={'#161616'} />
        </TouchableOpacity>
        <Text style={{flex: 1, textAlign: 'center', fontWeight: '600', fontSize: 16, color: '#161616'}}>{title}</Text>
        {isMultiChoice && (
          <TouchableOpacity
            onPress={() => {
              handleDongY(listChoice);
              handleModal();
            }}>
            <Text style={{textAlign: 'center', fontSize: 14, color: '#161616'}}>Đồng ý</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={{marginVertical: 10, flex: 1}}>
        <FlatList
          data={listChoice}
          renderItem={({item, index}) => (
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
              {isMultiChoice ? (
                <Icon name={item.checked ? 'check-square' : 'square'} color={'gray'} size={20} />
              ) : (
                <Icon name={item.checked ? 'dot-circle' : 'circle'} color={'gray'} size={20} />
              )}
              <Text
                style={{
                  color: '#1e1e1e',
                  fontWeight: '500',
                  fontSize: 15,
                  marginStart: 10,
                }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};

export default Component;

const styles = StyleSheet.create({});
