import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ScreenClientesPerfil from "../../screens/clientes/ScreenClintesPerfil"
import ScreenClientesLogin from "../../screens/clientes/ScreenClientesLogin";
import ScreenClientesCadastrar from "../../screens/clientes/ScreenClientesCadastrar";

import DefaultHeader from "../../components/DeaultHeader";

const Stack = createStackNavigator();

export default function StackClients() {
    return (
        <Stack.Navigator initialRouteName="clientesperfil" screenOptions={{ header: () => <DefaultHeader /> }}>
            <Stack.Screen
                name="clientesperfil"
                component={ScreenClientesPerfil}
                options={{ title: "Perfil" }}
            />
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
        </Stack.Navigator>
    );
}