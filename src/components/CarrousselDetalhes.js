import React, { useState } from "react";
import { View, Text, Image, StyleSheet, useWindowDimensions, ActivityIndicator } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle } from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import PagerView from "react-native-pager-view";

import cst from "../../constants";
import colors from "../theme/colors";

import StyleFlat from '../styles/StyleFlat';

export default function GaleriaZoom({ images, percent }) {
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
        </View>

    );
}


const styles = StyleSheet.create({
    container: {
        alignItems: "center"
    },
    pager: {
        height: 320
    },
    slide: {
        height: 320,
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        height: 320
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