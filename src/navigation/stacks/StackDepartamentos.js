import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import colors from "../../theme/colors";

import ScreenDepartamentos from "../../screens/departamentos/ScreenDepartamentos";
import DefaultHeader from "../../components/DeaultHeader";

const Stack = createStackNavigator();

export default function StackDepartamentos() {
    return (
        <Stack.Navigator screenOptions={{ header: () => <DefaultHeader /> }}>
            <Stack.Screen
                name="departamentos"
                component={ScreenDepartamentos}
                options={{ title: "Departamentos de produtos" }}
            />
        </Stack.Navigator>
    );
}