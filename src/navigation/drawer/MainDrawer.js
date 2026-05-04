import { createDrawerNavigator } from "@react-navigation/drawer";

import MenuDrawer from "./MenuDrawer";
import MainTabs from "../tabs/TabsNavigation";

const Drawer = createDrawerNavigator();

export default function MainDrawer() {

    return (
        <Drawer.Navigator drawerContent={(props) => <MenuDrawer {...props} />}>
            <Drawer.Screen name="maindrawer" component={MainTabs} options={{ headerShown: false }} />
        </Drawer.Navigator>
    );
}