import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import StackHome from "../stacks/StackHome";
import StackDepartamentos from "../stacks/StackDepartamentos";
import StackProdutos from "../stacks/StackProdutos";

const Tab = createBottomTabNavigator();

export default function MainTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="home"
                component={StackHome}
                options={{
                    title: "Home",
                    headerShown: false,
                    tabBarIcon: ({ color }) => <FontAwesome name="home" color={color} size={22} />
                }}
            />
            <Tab.Screen
                name="departamentos"
                component={StackDepartamentos}
                options={{
                    title: "Departamentos",
                    headerShown: false,
                    tabBarIcon: ({ color }) => <FontAwesome name="bars" color={color} size={22} />
                }}
            />
            <Tab.Screen
                name="produtos"
                component={StackProdutos}
                options={{
                    title: "Produtos",
                    headerShown: false,
                    tabBarIcon: ({ color }) => <FontAwesome name="shopping-basket" color={color} size={22} />
                }}
            />
        </Tab.Navigator>
    );
}