import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import MainTabs from "./tabs/TabsNavigation";


const Stack = createStackNavigator();

export default function RootStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="main"
                component={MainTabs}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}