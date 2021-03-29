/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState, useEffect} from 'react';
import {StyleSheet, Text, View, ScrollView, Dimensions, TouchableOpacity, TextInput} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';

import ActionSheet from '../../modules/react-native-actions-sheet';
import RenderLuaChon from './RenderLuaChon';

const TextInputLuaChon = (props) => {
  const refRBSheet = useRef();

  const {value, setValue, title, data, isImportant} = props;

  const ModalHide = () => {
    refRBSheet.current.setModalVisible(false);
  };

  const handleLuaChon = (val) => {
    refRBSheet.current.setModalVisible(false);
    setValue(val.Name);
  };

  return (
    <View style={styles.content1}>
      <Text style={styles.title}>
        {title}:<Text style={{color: 'red', fontWeight: 'bold'}}>{isImportant ? ' *' : ''}</Text>
      </Text>
      <TouchableOpacity
        onPress={() => {
          refRBSheet.current.setModalVisible(true);
        }}
        style={styles.contenttext}>
        <Text style={{color: value !== '' ? '#3B3B3B' : 'gray', fontWeight: value !== '' ? 'bold' : 'normal'}} numberOfLines={1}>
          {value !== '' ? value : title}
        </Text>
        <FontAwesome name={'chevron-down'} color={'gray'} />
      </TouchableOpacity>
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
        <RenderLuaChon handleDongY={handleLuaChon} actionSheetRef={refRBSheet} title={title} ModalHide={ModalHide} data={data} />
      </ActionSheet>
    </View>
  );
};

export default TextInputLuaChon;

const styles = StyleSheet.create({
  content1: {paddingHorizontal: 15, paddingTop: 20},
  title: {color: '#5B6062', fontWeight: 'bold'},
  textinputContainer: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    borderRadius: 4,
    padding: 0,
    marginVertical: 10,
    alignItems: 'center',
    borderColor: '#abb4bd65',
    borderWidth: 0.4,
  },
  contenttext: {
    marginTop: 10,
    padding: 10,
    borderColor: '#D1D1D1',
    borderWidth: 0.5,
    borderRadius: 8,
    justifyContent: 'space-between',
    flexDirection: 'row',
    minHeight: 40,
    alignItems: 'center',
  },
});
