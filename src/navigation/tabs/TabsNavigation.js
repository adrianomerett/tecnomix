import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import StackHome from "../stacks/StackHome";
import StackDepartamentos from "../stacks/StackDepartamentos";
import StackProdutos from "../stacks/StackProdutos";
import StackClientes from "../stacks/StackClients";

const Tab = createBottomTabNavigator();

export default function MainTabs() {
    return (
        <Tab.Navigator initialRouteName="home">
            <Tab.Screen
                name="home"
                component={StackHome}
                options={{
                    title: "Início",
                    headerShown: false,
                    tabBarIcon: ({ color }) => <Icon name="home" color={color} size={28} />
                }}
            />
            <Tab.Screen
                name="departamentos"
                component={StackDepartamentos}
                options={{
                    title: "Departamentos",
                    headerShown: false,
                    tabBarIcon: ({ color }) => <Icon name="layers" color={color} size={28} />
                }}
            />
            <Tab.Screen
                name="produtos"
                component={StackProdutos}
                options={{
                    title: "Produtos",
                    headerShown: false,
                    tabBarIcon: ({ color }) => <Icon name="store" color={color} size={28} />
                }}
            />
            <Tab.Screen
                name="clientes"
                component={StackClientes}
                options={{
                    title: "Perfil",
                    headerShown: false,
                    tabBarIcon: ({ color }) => <Icon name="account-circle-outline" color={color} size={28} />
                }}
            />
        </Tab.Navigator>
    );
}