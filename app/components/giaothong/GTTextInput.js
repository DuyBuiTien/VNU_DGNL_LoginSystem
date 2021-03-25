/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';

const GTTextInput = (props) => {
  const {title, value, setValue, multiline, isImportant} = props;
  return (
    <View style={styles.content1}>
      <Text style={styles.title}>
        {title}: <Text style={{color: 'red', fontWeight: 'bold'}}>{isImportant ? ' *' : ''}</Text>
      </Text>
      <View style={styles.input}>
        <TextInput
          placeholder={title}
          onChangeText={(text) => setValue(text)}
          value={value}
          multiline={multiline}
          selectionColor={'gray'}
          style={{flex: 1}}
          clearButtonMode="always"
        />
      </View>
    </View>
  );
};

export default GTTextInput;

const styles = StyleSheet.create({
  content1: {paddingHorizontal: 15, paddingTop: 20},
  title: {color: '#5B6062', fontWeight: 'bold'},
  input: {
    marginTop: 10,
    padding: 5,
    borderColor: '#D1D1D1',
    borderWidth: 0.5,
    borderRadius: 8,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
