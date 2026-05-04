import React, { useState, useCallback } from "react";
import { createStackNavigator, } from "@react-navigation/stack";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import ScreenFavoritos from "../../screens/favoritos/ScreenFavoritos";
import ScreenClientesLogin from "../../screens/clientes/ScreenClientesLogin";
import DefaultHeader from "../../components/DeaultHeader";
import LoadingScreen from "../../components/LoadingScreen";

const Stack = createStackNavigator();

export default function StackFavoritos() {
    const [logged, setLogged] = useState(null);
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
    if (logged === null) {
        return <LoadingScreen />;
    }
    return (
        <Stack.Navigator screenOptions={{ header: () => <DefaultHeader /> }}>
            {logged ? (
                <Stack.Screen
                    name="favoritos"
                    component={ScreenFavoritos}
                    options={{ title: "Favoritos" }}
                />
            ) : (
                <>
                    <Stack.Screen
                        name="clienteslogin"
                        options={{ title: "Login" }}>
                        {(props) => (
                            <ScreenClientesLogin {...props} setLogged={setLogged} />
                        )}
                    </Stack.Screen>
                </>
            )}

        </Stack.Navigator>
    );
}