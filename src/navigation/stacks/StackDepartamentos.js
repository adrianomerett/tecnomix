import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ScreenDepartamentos from "../../screens/departamentos/ScreenDepartamentos";
import ScreenCategorias from "../../screens/categorias/ScreenCategorias";
import ScreenSubCategorias from "../../screens/subcategorias/ScreenSubCategorias";
import ScreenDetalhes from "../../screens/detalhes/ScreenDetalhes";
import DefaultHeader from "../../components/DeaultHeader";

const Stack = createStackNavigator();

export default function StackDepartamentos() {
    return (
        <Stack.Navigator screenOptions={{ header: () => <DefaultHeader /> }} name="produtos">
            <Stack.Screen
                name="departamentos"
                component={ScreenDepartamentos}
                options={{ title: "Departamentos de produtos" }}
            />
            <Stack.Screen
                name="categorias"
                component={ScreenCategorias}
                options={{ title: "Categorias" }}
            />
            <Stack.Screen
                name="subcategorias"
                component={ScreenSubCategorias}
                options={{ title: "Sub Categorias" }}
            />
            <Stack.Screen
                name="detalhesprodutos"
                component={ScreenDetalhes}
                options={{ title: "Produto Detalhes" }}
            />

        </Stack.Navigator>
    );
}