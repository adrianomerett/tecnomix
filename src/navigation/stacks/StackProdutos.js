import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ScreenProdutos from "../../screens/produtos/ScreenProdutos";
import DefaultHeader from "../../components/DeaultHeader";

const Stack = createStackNavigator();

export default function StackProdutos() {
    return (
        <Stack.Navigator screenOptions={{ header: () => <DefaultHeader /> }}>
            <Stack.Screen
                name="produtos"
                component={ScreenProdutos}
                options={{ title: "Produtos" }}
            />
        </Stack.Navigator>
    );
}