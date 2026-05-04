import React, { useState, useCallback } from "react";
import { createStackNavigator, } from "@react-navigation/stack";

const Stack = createStackNavigator();

import ScreenSobre from "../../screens/sobre/ScreenSobre";
import ScreenContato from "../../screens/contato/ScreenContato";

import DefaultHeader from "../../components/DeaultHeader";

export default function StackEmpresa() {

    return (
        <Stack.Navigator screenOptions={{ header: () => <DefaultHeader /> }}>
            <Stack.Screen name="sobre" component={ScreenSobre} />
            <Stack.Screen name="contato" component={ScreenContato} />
        </Stack.Navigator>
        
    );
}