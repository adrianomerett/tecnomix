import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";

import MenuDrawer from "./MenuDrawer";
import RootStack from "../RootStack";

const Drawer = createDrawerNavigator();

export default function MainDrawer() {
    return (
        <Drawer.Navigator drawerContent={MenuDrawer}>
            <Drawer.Screen name="maindrawer" component={RootStack} options={{ headerShown: false }} />
        </Drawer.Navigator>
    );
}