import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import colors from "../theme/colors";

export default function DefaultHeader() {
    const navigation = useNavigation();
    return (
        <View style={styles.header}>
            <View>
                <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                    <Text style={styles.bars}><FontAwesome5 name="bars"  size={24} /></Text>
                </TouchableOpacity>
            </View>
            <View><Text>Search</Text></View>
            <View><Text>Profle</Text></View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: colors.primary,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 16,
        paddingRight: 16,
        color: colors.colorfont,
    },
    bars: {
        color: colors.colorfont,
    }
});