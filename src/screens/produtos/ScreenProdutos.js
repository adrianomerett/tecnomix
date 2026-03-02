import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ScreenProdutos = () => {
    return (
        <View style={styles.container}>
            <Text>Produtos</Text>
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

export default ScreenProdutos;