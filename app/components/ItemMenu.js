/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

const ItemMenu = ({title, titleRight, onPress, iconLeft, iconRight, colorIconLeft, ContentRight, titleBottom}) => {
  return (
    <TouchableOpacity style={styles.content} activeOpacity={0.6} onPress={onPress}>
      <View style={styles.view}>
        <View style={styles.view}>
          <FontAwesome
            name={iconLeft ? iconLeft : 'question'}
            size={24}
            color={colorIconLeft ? colorIconLeft : '#5C7F63'}
            style={styles.iconLeft}
          />
          <View style={styles.view}>
            <Text style={[titleBottom ? {} : styles.text_title, {flex: 1}]}>{title}</Text>
            {titleRight && (
              <Text style={[styles.text_title, {color: '#818181', marginHorizontal: 5, fontSize: 13}]}>{titleRight}</Text>
            )}
          </View>
        </View>
      </View>
      <FontAwesome name={iconRight ? iconRight : 'chevron-right'} size={16} style={styles.iconRight} />
    </TouchableOpacity>
  );
};

export default ItemMenu;

const styles = StyleSheet.create({
  content: {
    paddingVertical: 15,
    marginVertical: 2,
    backgroundColor: 'white',
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
  },
  view: {flex: 1, flexDirection: 'row', alignItems: 'center'},
  iconLeft: {marginHorizontal: 15},
  iconRight: {marginEnd: 10, color: '#818181'},

  text_title: {
    fontWeight: '600',
    fontSize: 15,
    color: '#353535',
  },
});
