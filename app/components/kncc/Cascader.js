import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Platform } from 'react-native';
import {
    Text, TextInput, TouchableOpacity, View, ScrollView,
    StyleSheet, FlatList, TouchableWithoutFeedback, Dimensions
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import Modal from 'react-native-modal';
import ActionSheet from '../../modules/react-native-actions-sheet';

const SCREEN_HEIGHT = Dimensions.get('screen').height;

export default class Cascader extends Component {
    constructor(props) {
        super(props);
        let transformData = [];

        this.createSearchData(transformData, this.props.data, '', '');

        this.state = {
            visible: false,
            selecteditems: [],
            originalData: this.props.data,
            data: this.props.data,
            history: [],
            selecteditem: { name: '' },
            searchString: '',
            searchData: transformData,
            filterData: []
        };

    }

    createSearchData(searchData, data, id, name) {
        let index = 0;
        for (index = 0; index < data.length; index++) {
            let d = data[index];
            if (d.children)
                this.createSearchData(searchData, d.children, id + d.id + '~', name + d.name + ' | ');
            else {
                let k = id + d.id;
                let t = name + d.name;
                searchData.push({ id: k, name: t })
            }
        }
    }


    pressParentItem(item) {
        let lastHistory = this.state.history;

        let pIndex = this.findIndexByKey(lastHistory, item.id);

        let pItem = lastHistory[pIndex];

        lastHistory.length = pIndex;

        this.setState({
            selecteditems: pItem.selecteditems,
            data: pItem.data,
            history: lastHistory
        });


    }

    findIndexByKey(data, id) {
        let index = 0;
        for (index = 0; index < data.length; index++) {
            if (data[index].id == id) {
                return index;
            }
        }

    }



    pressSearchItem(item) {
        let si = { name: '', id: '' };
        si.name = item.name;
        si.id = item.id;
        this.refRBSheet.setModalVisible(false);
        this.setState({
            visible: false,
            selecteditem: si
        });
        if (this.props.onValueChange != null) {
            this.props.onValueChange(si);
        }
    }

    pressItem(item) {
        if (item.children) {
            let index = 0;
            let t = '', k = '';

            for (index = 0; index < this.state.selecteditems.length; index++) {
                t = t + this.state.selecteditems[index].name + ' | ';
                k = k + this.state.selecteditems[index].id + '~';
            }
            let si = { name: '', id: '' };
            si.name = t + item.name;
            si.id = k + item.id;
            this.refRBSheet.setModalVisible(false);
            this.setState({
                visible: false,
                selecteditem: si
            });
            if (this.props.onValueChange != null) {
                this.props.onValueChange(si);
            }
            return;
        }

        var lastselectedItems = this.state.selecteditems;
        var childData = [];
        var lastHistory = this.state.history;
        var h = { selecteditems: this.state.selecteditems.slice(), id: item.id, data: this.state.data };

        childData = item.children;
        lastselectedItems.push(item);
        lastHistory.push(h);

        this.setState({
            selecteditems: lastselectedItems,
            data: childData,
            history: lastHistory
        });

    }

    showPicker() {
        this.refRBSheet.setModalVisible(true);
        this.setState({
            visible: true,
            selecteditems: [],
            originalData: this.props.data,
            data: this.props.data,
            history: [],
            searchString: '',
            filterData: []


        });
    }

    onSearch(searchString) {
        let sd = this.state.searchData;
        sd = sd.filter((arr) => { return arr.name.toLowerCase().includes(searchString.toLowerCase()); });

        this.setState({
            searchString: searchString,
            filterData: sd
        })

    }

    renderMore = () => {
        return (
            <FontAwesome name="chevron-right" size={20} />
        )
    }
    renderSeparator = () => {
        return (
            <View
                style={{
                    paddingLeft: 3,
                    paddingRight: 3
                }}
            >
                <View>
                    <FontAwesome name="chevron-right" size={20} />
                </View>
            </View>
        )
    }

    renderItem = ({ item, index }) => (
        <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => this.pressParentItem(item)}>
                <View>
                    <Text>
                        {item.name}
                    </Text>
                </View>
            </TouchableOpacity>
            {(index !== this.state.selecteditems.length - 1) && this.renderSeparator()}

        </View>
    )



    render() {
        return (
            <View style={{ paddingVertical: 10, width: '100%' }}>
                <TouchableOpacity onPress={() => this.showPicker()}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between',paddingVertical: 10, alignItems: 'center' }}>
                        <FontAwesome name={this.props.icon ? this.props.icon : 'home'} color="#787C7E" size={20} style={{marginHorizontal: 10}} />
                        <Text style={{color: this.state.selecteditem.name?'black':'#c9c9c9'}}>
                            {this.state.selecteditem.name?this.state.selecteditem.name:this.props.placeholder}
                        </Text>
                        <FontAwesome name={'chevron-down'} color={'gray'} style={{marginHorizontal: 5}} />
                    </View>
                </TouchableOpacity>
                <ActionSheet
                    ref={c => this.refRBSheet = c}
                    bounceOnOpen={true}
                    bounciness={8}
                    gestureEnabled={true}
                    containerStyle={{ margin: 20 }}
                    defaultOverlayOpacity={0.3}>
                    <ScrollView style={{ padding: 15, marginBottom: 20, maxHeight: SCREEN_HEIGHT / 2 }}>
                            <View>
                                <View style={{ height: Platform.OS === 'android' ? '87%' : '92%' }}>
                                    <FlatList
                                        data={this.state.data}
                                        renderItem={({ item }) => (
                                            <View>
                                                <TouchableOpacity onPress={() => this.pressItem(item)}>
                                                    <ScrollView horizontal={true}>
                                                        <Text style={styles.item}>{item.name}  {(item.children) && this.renderMore()} </Text>
                                                    </ScrollView>
                                                </TouchableOpacity>
                                            </View>
                                        )
                                        }
                                    />
                                </View>

                            </View>
                    </ScrollView>
                </ActionSheet>
            </View>
        );
    }
}


Cascader.propTypes = {
    data: PropTypes.array,
    onValueChange: PropTypes.func
}

Cascader.defaultProps = {
    data: [],
    onValueChange: () => { }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    searchSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    searchIcon: {
        padding: 10,
    },
    input: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        backgroundColor: '#fff',
        color: '#424242',
    },
})