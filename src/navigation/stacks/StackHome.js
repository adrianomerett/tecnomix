import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ScreenHome from "../../screens/home/ScreenHome";
import DefaultHeader from "../../components/DeaultHeader";


const Stack = createStackNavigator();

export default function StackHome() {
    return (
        <Stack.Navigator screenOptions={{ header: () => <DefaultHeader /> }}>
            <Stack.Screen
                name="home"
                component={ScreenHome}
                options={{ 
                    title: "Início", 
                    headerShown: true, 
                }}
            />
        </Stack.Navigator>
    );
}