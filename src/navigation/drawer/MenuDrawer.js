import React from "react";
import { View, Text } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";

export default function MenuDrawer() {
    return (
        <DrawerContentScrollView>
            <View>
                <Text>MenuDrawer</Text>
            </View>
        </DrawerContentScrollView>
    );
}