/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import HighchartsReactNative from '@highcharts/highcharts-react-native';
import {Header} from '../../components';
import {ScrollView} from 'react-native';

const RenderItemChart = (props) => {
  const {data} = props;
  const chartOptions = {
    chart: {
      type: 'pie',
      renderTo: 'container',
    },
    title: {
      verticalAlign: 'middle',
      floating: true,
      text: `${data.dangxl + data.daxl}`,
    },
    plotOptions: {
      pie: {
        innerSize: '80%',
        dataLabels: {
          enabled: false,
        },
      },
    },

    series: [
      {
        data: [
          {
            name: 'Đang xử lý',
            y: data.dangxl,
            color: '#1976d2',
          },
          {
            name: 'Đã xử lý',
            y: data.daxl,
            color: '#7cb342',
          },
        ],
      },
    ],
    credits: {
      enabled: false,
    },
  };
  return (
    <View style={{flex: 1, backgroundColor: '#FFF', height: 150, margin: 10, width: 100, borderRadius: 4}}>
      <HighchartsReactNative styles={{height: 100, width: 100, borderRadius: 4}} options={chartOptions} />
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{color: '#bdbdbd', fontSize: 12, marginBottom: 5}}>{`${data.type}`}</Text>
        <Text style={{color: '#424242', fontWeight: '600'}}>{`${data.name}`}</Text>
      </View>
    </View>
  );
};

const DVC_ThongKe_MainScreen = () => {
  const [chartOption, setChartOption] = useState([]);
  const [barchartOption, setBarChartOption] = useState([]);

  const data = [
    {id: 0, name: 'Nam Định', type: 'Thành phố', dangxl: 8, daxl: 12},
    {id: 0, name: 'Vụ Bản', type: 'Huyện', dangxl: 2, daxl: 0},
    {id: 0, name: 'Nam Trực', type: 'Huyện', dangxl: 1, daxl: 0},
    {id: 0, name: 'Trực Ninh', type: 'Huyện', dangxl: 1, daxl: 0},
    {id: 0, name: 'Ý Yên', type: 'Huyện', dangxl: 1, daxl: 0},
    {id: 0, name: 'Khác', type: '', dangxl: 10, daxl: 3},
  ];

  useEffect(() => {
    setChartOption({
      chart: {
        type: 'pie',
        renderTo: 'container',
      },
      title: {
        verticalAlign: 'middle',
        floating: true,
        text: '38 <br>Ý kiến',
      },
      plotOptions: {
        pie: {
          innerSize: '80%',
        },
      },

      series: [
        {
          states: {
            inactive: {
              opacity: 1,
            },
            select: {
              opacity: 0.5,
            },
          },

          data: [
            {
              name: 'Đang xử lý',
              y: 14,
              color: '#1976d2',
            },
            {
              name: 'Đã xử lý',
              y: 42,
              color: '#7cb342',
            },
          ],
        },
      ],
      credits: {
        enabled: false,
      },
    });
    return () => {};
  }, []);

  useEffect(() => {
    setBarChartOption({
      chart: {
        type: 'bar',
      },
      title: {
        text: '',
      },
      xAxis: {
        type: 'category',
        title: {
          text: null,
        },
        min: 0,
        max: 4,
        scrollbar: {
          enabled: true,
        },
        tickLength: 0,
      },
      yAxis: {
        min: 0,
        max: 20,
        title: {
          text: 'Ý kiến',
          align: 'high',
        },
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true,
          },
        },
      },
      legend: {
        enabled: false,
      },

      series: [
        {
          name: 'Ý kiến',
          data: [
            ['Xây dựng', 11],
            ['Môi trường', 8],
            ['Giao thông', 10],
            ['An ninh trật tự', 6],
            ['Khác', 3],
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
      <Header title="Thống kê phản ánh kiến nghị" isStack={true} />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={{backgroundColor: '#F5f5f5'}}>
        <HighchartsReactNative styles={{height: 300, marginTop: 10}} options={chartOption} />
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          contentContainerStyle={{flexGrow: 1}}
          data={data}
          renderItem={({item, index}) => <RenderItemChart data={item} index={index} />}
          keyExtractor={(i, index) => index.toString()}
        />
        <View style={{flex: 1, backgroundColor: '#FFF', padding: 10}}>
          <Text style={{color: '#424242', marginStart: 10, fontWeight: '600'}}>Số lượng ý kiến theo lĩnh vực:</Text>
          <HighchartsReactNative styles={{height: 300, marginTop: 10}} options={barchartOption} />
        </View>
      </ScrollView>
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
