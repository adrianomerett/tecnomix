import React, { useState } from "react";
import { View, Text, Image, StyleSheet, useWindowDimensions, ActivityIndicator, TouchableOpacity } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle } from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PagerView from "react-native-pager-view";

import cst from "../../constants";
import colors from "../theme/colors";

import StyleFlat from '../styles/StyleFlat';
import StyleDetalhesProdutos from '../styles/StyleDetalhesProdutos';

export default function GaleriaZoom({ images, percent, isFavorite, changeFavoriteDetails }) {
    const [index, setIndex] = useState(0);
    const scale = useSharedValue(1);
    const [loading, setLoading] = useState(true);

    const { width } = useWindowDimensions();
    const slideWidth = width - 40;

    const pinchGesture = Gesture.Pinch()
        .onUpdate((event) => {
            scale.value = event.scale;
        })
        .onEnd(() => {
            scale.value = 1;
        });

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }]
        };

    });

    return (

        <View style={styles.container}>
            <PagerView
                style={[styles.pager, { width: slideWidth }]}
                initialPage={0}
                onPageSelected={(e) => {
                    setIndex(e.nativeEvent.position);
                }}
            >
                {images.map((item, i) => (
                    <View key={i} style={[styles.slide, { width: slideWidth }]}>
                        <GestureDetector gesture={pinchGesture}>
                            <Animated.View style={animatedStyle}>
                                <Image
                                    source={{ uri: `${cst.BASE_URL}/loja/painel/public/upload/produtos/extra/${item.img}` }}
                                    style={[styles.image, { width: slideWidth }]}
                                    resizeMode="contain"
                                    onLoadStart={() => setLoading(true)}
                                    onLoadEnd={() => setLoading(false)}
                                />
                            </Animated.View>
                        </GestureDetector>
                        {loading && (
                            <View style={{
                                flex: 1,
                                justifyContent: 'center',
                                backgroundColor: 'transparent',
                                alignItems: 'center',
                                position: 'absolute',
                                width: '100%', height: '100%',
                                zIndex: 100
                            }}>
                                <ActivityIndicator size="large" color={colors.primary} />
                            </View>
                        )}
                    </View>
                ))}
            </PagerView>
            <View style={styles.counter}>
                <Text style={styles.counterText}>
                    {index + 1} / {images.length}
                </Text>
            </View>
            <View style={StyleFlat.ctpercent}>
                <Text style={StyleFlat.txtpercent}>-{percent}%</Text>
            </View>
            {isFavorite ? (
                <TouchableOpacity style={StyleDetalhesProdutos.ctfavorito} onPress={() => changeFavoriteDetails()}>
                    <Icon name="cards-heart" size={36} color={colors.primary} />
                </TouchableOpacity>
            ) : (
                <TouchableOpacity style={StyleDetalhesProdutos.ctfavorito} onPress={() => changeFavoriteDetails()}>
                    <Icon name="heart-outline" size={36} color={colors.tertiary} />
                </TouchableOpacity>
            )}
        </View>

    );
}


const styles = StyleSheet.create({
    container: {
        alignItems: "center"
    },
    pager: {
        height: 360
    },
    slide: {
        height: 360,
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        height: 360
    },
    counter: {
        position: "absolute",
        bottom: 20,
        right: 0,
        backgroundColor: "rgba(0,0,0,0.6)",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4
    },
    counterText: {
        color: "#fff",
        fontWeight: "bold"
    }
});