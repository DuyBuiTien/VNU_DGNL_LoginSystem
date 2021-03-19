import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, Platform, ImageBackground } from 'react-native';
import PropTypes from 'prop-types';
import { ParallaxImage } from 'react-native-snap-carousel';

import moment from 'moment';
import 'moment/locale/vi';
moment.locale('vi')

const IS_IOS = Platform.OS === 'ios';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const slideHeight = viewportHeight * 0.25;
const slideWidth = wp(90);
const itemHorizontalMargin = wp(2);

const sliderWidth = viewportWidth;
const itemWidth = slideWidth + itemHorizontalMargin * 2;

const entryBorderRadius = 8;

export default class SliderEntry extends Component {

    static propTypes = {
        data: PropTypes.object.isRequired,
        parallax: PropTypes.bool,
        parallaxProps: PropTypes.object
    };

    get image () {
        const { data: { image_sources, title, published_timestamp }, parallax, parallaxProps } = this.props;

        return (
            <ImageBackground
              source={{ uri: image_sources[0] }}
              style={styles.image}
              imageStyle={{borderRadius: 10}}
              resizeMode='cover'
            >
            <View style={{alignSelf: 'stretch', padding: 10, backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 10}}>
                <Text
                style={[styles.title]}
                numberOfLines={2}
                >
                    {title}
                </Text>
                <Text
                style={[styles.subtitle]}
                >
                    {moment(published_timestamp).fromNow()}
                </Text>
            </View>
            </ImageBackground>
        );
    }

    render () {
        const { data, navigation } = this.props;

        return (
            <TouchableOpacity
            activeOpacity={1}
              style={styles.slideInnerContainer}
              onPress={() => { navigation.navigate('DT_DetailScreen', { item: this.props.data }) }}
              >
                <View style={styles.shadow} />
                <View style={[styles.imageContainer]}>
                    { this.image }
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    slideInnerContainer: {
        width: itemWidth,
        height: slideHeight,
        paddingHorizontal: itemHorizontalMargin,
        paddingBottom: 18 // needed for shadow
    },
    shadow: {
        position: 'absolute',
        top: 0,
        left: itemHorizontalMargin,
        right: itemHorizontalMargin,
        bottom: 18,
        shadowColor: '#1a1917',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 10,
        borderRadius: entryBorderRadius
    },
    imageContainer: {
        flex: 1,
        marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
        backgroundColor: 'white',
        borderTopLeftRadius: entryBorderRadius,
        borderTopRightRadius: entryBorderRadius
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
        borderRadius: IS_IOS ? entryBorderRadius : 0,
        borderTopLeftRadius: entryBorderRadius,
        borderTopRightRadius: entryBorderRadius,
        justifyContent: 'flex-end'
    },
    // image's border radius is buggy on iOS; let's hack it!
    radiusMask: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: entryBorderRadius,
        backgroundColor: 'white'
    },
    radiusMaskEven: {
        backgroundColor: '#1a1917'
    },
    textContainer: {
        justifyContent: 'center',
        paddingTop: 20 - entryBorderRadius,
        paddingBottom: 20,
        paddingHorizontal: 16,
        backgroundColor: 'white',
        borderBottomLeftRadius: entryBorderRadius,
        borderBottomRightRadius: entryBorderRadius
    },
    textContainerEven: {
        backgroundColor: '#1a1917'
    },
    title: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    titleEven: {
        color: 'white'
    },
    subtitle: {
        marginTop: 6,
        color: '#EEEEEE',
        fontSize: 12,
        fontStyle: 'italic',
        textAlign: 'right'
    },
    subtitleEven: {
        color: 'rgba(255, 255, 255, 0.7)'
    }
});