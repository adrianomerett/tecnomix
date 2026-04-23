import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import StackHome from "../stacks/StackHome";
import StackDepartamentos from "../stacks/StackDepartamentos";
import StackFavoritos from "../stacks/StackFavoritos";
import StackClientes from "../stacks/StackClients";
import { useNavigation } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

export default function MainTabs() {
    const navigation = useNavigation();
    return (
        <Tab.Navigator initialRouteName="home"
        screenOptions={{
            tabBarStyle: {
                height: 70,
                paddingTop: 5
            },
            tabBarActiveTintColor: colors.primary
        }}
        >
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
                name="produtos"
                component={StackDepartamentos}
                options={{
                    title: "Departamentos",
                    headerShown: false,
                    tabBarIcon: ({ color }) => <Icon name="layers" color={color} size={28} />
                }}
                listeners={({ navigation }) => ({
                    tabPress: (e) => {
                        e.preventDefault();
                        navigation.navigate("produtos", {
                            screen: "departamentos"
                        });
                    }
                })}
            />
            <Tab.Screen
                name="favoritos"
                component={StackFavoritos}
                options={{
                    title: "Favoritos",
                    headerShown: false,
                    tabBarIcon: ({ color }) => <Icon name="cards-heart" color={color} size={28} />
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