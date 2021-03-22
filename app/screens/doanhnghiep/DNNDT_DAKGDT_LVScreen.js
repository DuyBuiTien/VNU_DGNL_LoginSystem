/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    Linking,
    TextInput,
    FlatList,
    Platform,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';

import { Header } from '../../components';

import { requestGET_AIC } from '../../services/Api';
import { SearchComponent } from '../../components/common';

const RenderItem = (props) => {
    const { item, navigation } = props;

    return (
        <TouchableOpacity
            onPress={() => {navigation.navigate('DNNDT_DAKGDT_ListScreen', { id: item.id, title: item.name })}}
            style={{
                paddingVertical: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottomColor: '#616161',
                borderBottomWidth: 0.3,
            }}>
            <Text style={{ fontWeight: '600' }}>{item.name}</Text>
            <FontAwesome name='chevron-right' color='#757575' size={20} style={{}} />
        </TouchableOpacity>
    );
};

const DNNDT_DAKGDT_LVScreen = () => {
    const navigation = useNavigation();
    const dataService = useSelector((state) => state.global.dataService);
    const user = useSelector((state) => state.global.user);
    const [inputValue, setInputValue] = useState('');
    const [data, setData] = useState([]);
    const route = useRoute();
    const { isLV } = route.params.data

    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async () => {
        setIsLoading(true);
        var data1 = isLV?await requestGET_AIC(`${dataService.AIC_URL}/agencies/categories`):await requestGET_AIC(`${dataService.AIC_URL}/agencies/invest_form`)
        var data2 = data1.data ? data1.data : []
        data2.unshift({
            "id": "",
            "name": "Tất cả"
        })
        setData(data2)
        setIsLoading(false);
    };

    useEffect(() => {
        fetchData();
        return () => { };
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Header title={isLV?"Chọn lĩnh vực đầu tư":"Chọn hình thức đầu tư"} isStack={true} />
            <SearchComponent value={inputValue} onChangeText={setInputValue} />
            {isLoading ? (
                <ActivityIndicator size="large" color="#fb8c00" style={{ flex: 1, justifyContent: 'center' }} />
            ) : (
                    <View style={{paddingHorizontal: 20, flex: 1}}>
                        <FlatList
                            contentContainerStyle={{ flexGrow: 1 }}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            data={data.filter((item) => {
                                const name = item.name.toUpperCase();
                                return name.indexOf(inputValue.toUpperCase()) > -1;
                            })}
                            renderItem={({ item, index }) => <RenderItem item={item} navigation={navigation} />}
                            keyExtractor={(item, index) => index.toString()}
                            ListEmptyComponent={() => <Text style={{ textAlign: 'center', color: '#50565B', marginTop: 10 }}>Không có kết quả</Text>}
                        />
                    </View>
                )}
        </View>
    );
};

export default DNNDT_DAKGDT_LVScreen;

const styles = StyleSheet.create({});
