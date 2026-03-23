import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import  AsyncStorage  from "@react-native-async-storage/async-storage";
import { DrawerActions, useNavigation, useRoute } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import colors from "../theme/colors";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

import styles from "../styles/StyleDefaltHeader";


import api from "../api/api";

export default function DefaultHeader() {
    const navigation = useNavigation();
    const route = useRoute();
    const [nameloja, setNameloja] = useState("");
    const [slogan, setslogan] = useState("");

    
    async function getConfig() {
        try {
            if (route.name === "home") {
                const req = await api.get("/config/getconfig/");
                const { status, dados } = req.data;
                await AsyncStorage.setItem("nameloja", dados.nameloja);
                await AsyncStorage.setItem("slogan", dados.slogan);
                setNameloja(dados.nameloja);
                setslogan(dados.slogan);
            }else{
                const nameloja = await AsyncStorage.getItem("nameloja");
                const slogan = await AsyncStorage.getItem("slogan");
                setNameloja(nameloja);                
                setslogan(slogan);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getConfig();
    }, []);

    return (
        <View style={styles.header}>
            <View>
                {/* <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                    <Text style={styles.bars}><FontAwesome5 name="bars"  size={24} /></Text>
                </TouchableOpacity> */}
            </View>
            <View style={styles.centerheaders}>
                <View style={styles.ctnameloja}>
                    <Text style={styles.txtnameloja}>{nameloja}</Text>
                    <Text style={styles.txtslogan}>{slogan}</Text>
                </View>
                <View style={styles.ctsearch}>
                    <View style={styles.search}>
                        <TextInput placeholder="Pesquisar produtos..." style={styles.searchInput} placeholderTextColor={colors.graynavigation} />
                    </View>
                    <View style={styles.ctbutton}>
                        <TouchableOpacity style={styles.tchablebutton}>
                            <FontAwesome name="search" size={20} color={colors.colorfont} />
                            <Text style={styles.txtbtn}> Buscar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {/* <View><Text>Profle</Text></View> */}
        </View>
    );
}
