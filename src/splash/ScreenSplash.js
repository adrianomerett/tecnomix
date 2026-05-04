import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { Snackbar, Text } from "react-native-paper";

import colors from "../theme/colors";

export default function ScreenSplash({ snackbarVisible, snackbarMessage, changeSnackbar }) {
    return (
        <View style={styles.container}>
            <View style={styles.containerlogo}>
                <Image
                    source={require('../img/logo.png')}
                    style={styles.imglogo}
                />
            </View>
            <Snackbar
                visible={snackbarVisible}
                onDismiss={changeSnackbar}
                action={{
                    label: 'Fechar',
                    onPress: () => {
                        // Faça algo quando o botão for clicado
                    },
                }}
            >
                {snackbarMessage}
            </Snackbar>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerlogo: {
        width: 300,
        height: 300,
        backgroundColor: colors.grayfundo,
        borderRadius: 150,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imglogo: {
        width: 296,
        height: 296,
        resizeMode: 'contain',
        borderRadius: 150,
    },
});
