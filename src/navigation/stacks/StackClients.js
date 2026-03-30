import React, { useState, useCallback } from "react";
import { createStackNavigator, } from "@react-navigation/stack";
import {useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import ScreenClientesPerfil from "../../screens/clientes/ScreenClintesPerfil"
import ScreenClientesLogin from "../../screens/clientes/ScreenClientesLogin";
import ScreenClientesCadastrar from "../../screens/clientes/ScreenClientesCadastrar";

import DefaultHeader from "../../components/DeaultHeader";

const Stack = createStackNavigator();

export default function StackClients() {
    const [logged, setLogged] = useState(false);
    useFocusEffect(
        useCallback(() => {
            const checkLogin = async () => {
                try {
                    const isLogged = await AsyncStorage.getItem("statuslogin");
                    if (isLogged === "false" || isLogged === null) {
                        setLogged(false);
                    } else {
                        setLogged(true);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
            checkLogin();
        }, [])
    );

    return (
        <Stack.Navigator screenOptions={{ header: () => <DefaultHeader /> }}>
            {logged ? (
                <Stack.Screen
                    name="clientesperfil"
                    component={ScreenClientesPerfil}
                    options={{ title: "Perfil" }}
                />
            ) : (
                <>
                    <Stack.Screen
                        name="clienteslogin"
                        component={ScreenClientesLogin}
                        options={{ title: "Login" }}
                    />
                    <Stack.Screen
                        name="clientescadastrar"
                        component={ScreenClientesCadastrar}
                        options={{ title: "Cadastrar" }}
                    />
                </>
            )}

        </Stack.Navigator>
    );
}