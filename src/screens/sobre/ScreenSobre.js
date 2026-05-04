import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ScreenSobre = () => {
    return (
        <View style={styles.container}>
            <Text>Sobre a empresa</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});

export default ScreenSobre;