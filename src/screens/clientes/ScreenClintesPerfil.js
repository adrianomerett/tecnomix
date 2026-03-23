import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const ScreenClintesPerfil = () => {

    const navigation = useNavigation();

    useFocusEffect(
        useCallback(() => {
            const checkLogin = async () => {
                try {
                    const isLogged = await AsyncStorage.getItem("statuslogin");
                    if (isLogged === "false" || isLogged === null) {
                        navigation.replace("clientescadastrar");
                    }
                } catch (error) {
                    console.log(error);
                }
            };
            checkLogin();
        }, [navigation])
    );

    return (
        <View>
            <Text>Perfil</Text>
        </View>
    )
}

export default ScreenClintesPerfil;