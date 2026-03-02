import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import MainDrawer from "./drawer/MainDrawer";

export default function IndexNavigation() {
    return (
        <NavigationContainer>
            <MainDrawer />
        </NavigationContainer>
    );
}