/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';

import DatePicker from '../../modules/react-native-datepicker';

const TexInputDate = (props) => {
  const {value, setValue, title, isImportant, mode, format} = props;
  return (
    <View style={styles.content1}>
      <Text style={styles.title}>
        {title}: <Text style={{color: 'red', fontWeight: 'bold'}}>{isImportant ? ' *' : ''}</Text>
      </Text>
      <View style={styles.content2}>
        <DatePicker
          is24Hour={true}
          style={{flex: 1}}
          date={value}
          mode={mode ? mode : 'date'}
          placeholder={title}
          format={format ? format : 'DD/MM/YYYY'}
          confirmBtnText="Chọn"
          cancelBtnText="Huỷ"
          customStyles={{
            dateInput: {
              color: value !== '' ? '#3B3B3B' : 'gray',
              marginEnd: 5,
              borderWidth: 0,
              margin: 0,
              padding: 0,
              fontWeight: value !== '' ? 'bold' : 'normal',
            },
          }}
          onDateChange={(i) => {
            setValue(i);
          }}
          iconComponent={<FontAwesome name={'chevron-down'} color={'gray'} style={{marginHorizontal: 5}} />}
        />
      </View>
    </View>
  );
};

export default TexInputDate;

const styles = StyleSheet.create({
  content2: {
    marginTop: 10,
    paddingHorizontal: 10,
    borderColor: '#D1D1D1',
    borderWidth: 0.5,
    borderRadius: 8,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  content1: {paddingHorizontal: 15, paddingTop: 20},
  title: {color: '#5B6062', fontWeight: 'bold'},
});
