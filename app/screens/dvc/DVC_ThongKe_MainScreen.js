import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import HighchartsReactNative from '@highcharts/highcharts-react-native';
import {Header} from '../../components';

const DVC_ThongKe_MainScreen = () => {
  const [chartOption, setChartOption] = useState([]);

  useEffect(() => {
    setChartOption({
      chart: {
        type: 'pie',
        renderTo: 'container',
      },
      title: {
        verticalAlign: 'middle',
        floating: true,
        text: 'Tiếp nhận <br>26333 hồ sơ',
      },
      plotOptions: {
        pie: {
          innerSize: '80%',
        },
      },

      series: [
        {
          data: [
            ['Đã xử lý', 26153],
            ['Chưa xử lý', 180],
          ],
        },
      ],
      credits: {
        enabled: false,
      },
    });
    return () => {};
  }, []);
  return (
    <View style={styles.container}>
      <Header title="Thống kê dịch vụ công" isStack={true} />
      <HighchartsReactNative styles={styles.container} options={chartOption} />
      <View style={styles.container} />
    </View>
  );
};

export default DVC_ThongKe_MainScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    flex: 1,
  },
});
