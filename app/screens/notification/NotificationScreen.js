import React from 'react';
import {StyleSheet, View} from 'react-native';
import HighchartsReactNative from '@highcharts/highcharts-react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chartOptions: {
        chart: {
          type: 'bar',
        },
        title: {
          text: 'Fruit Consumption',
        },
        xAxis: {
          categories: ['Apples', 'Bananas', 'Oranges'],
        },
        yAxis: {
          title: {
            text: 'Fruit eaten',
          },
        },
        series: [
          {
            name: 'Jane',
            data: [1, 0, 4],
          },
          {
            name: 'John',
            data: [5, 7, 3],
          },
        ],
        credits: {
          enabled: false,
        },
      },
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <HighchartsReactNative styles={styles.container} options={this.state.chartOptions} />
        <HighchartsReactNative styles={styles.container} options={this.state.chartOptions} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    flex: 1,
  },
});
