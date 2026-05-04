import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import StyleDrawer from "../../styles/StyleDrawer";


const SIZE_ICON_MENU = 20;

export default function MenuDrawer() {
    const [nameloja, setNameloja] = useState("");
    const [categorias, setCategorias] = useState({});
    const navigation = useNavigation();
    useEffect(() => {
        const getConfig = async () => {
            try {
                const getconfig = await AsyncStorage.getItem("config");
                const getcate = await AsyncStorage.getItem("categorias");
                let config = JSON.parse(getconfig);
                let categorias = JSON.parse(getcate);
                setNameloja(config ? config.nameloja : "");
                setCategorias(categorias || {});
            } catch (error) {
                console.error("Error fetching categorias:", error);
            }
        };
        getConfig();
    }, []);

    return (
        <DrawerContentScrollView
            style={StyleDrawer.container}
            contentContainerStyle={{
                paddingTop: 8, paddingVertical: 0, paddingHorizontal: 0
            }}>
            <View style={StyleDrawer.containermenu}>
                <View style={StyleDrawer.cttitle}>
                    <Icon name="menu" size={24} color={colors.prymary} />
                    <Text style={StyleDrawer.txttitle}>{nameloja}</Text>
                </View>
                <View style={StyleDrawer.separatormenu} />
                <View style={StyleDrawer.menu}>
                    <View style={StyleDrawer.titlerows}>
                        <Text style={StyleDrawer.txttitlerows}>Categorias</Text>
                    </View>
                    <View style={StyleDrawer.ctrowsmenu}>
                        {Object.values(categorias).map((iten, index) => (

                            <TouchableOpacity key={`keydrawer-${iten.id.categoriaid}`}
                                style={StyleDrawer.rowsmenu} onPress={() => navigation.navigate("produtos",
                                    {
                                        screen: "categorias",
                                        params: {
                                            idcate: iten.id.categoriaid,
                                            namecate: iten.id.namecategoria
                                        }
                                    })}>
                                <Icon name={iten.id.iconcategoria} size={SIZE_ICON_MENU} color={colors.tertiary} />
                                <Text style={StyleDrawer.txtrowsmenu}>{iten.id.namecategoria}</Text>
                            </TouchableOpacity>

                        ))}

                    </View>
                    <View style={StyleDrawer.separatormenu} />
                    <View style={StyleDrawer.titlerows}>
                        <Text style={StyleDrawer.txttitlerows}>Minha conta</Text>
                    </View>
                    <View style={StyleDrawer.ctrowsmenu}>
                        <TouchableOpacity style={StyleDrawer.rowsmenu} onPress={() => navigation.navigate("clientes", {
                            screen: 'clienteslogin'
                        })}>
                            <Icon name="account-arrow-right" size={SIZE_ICON_MENU} color={colors.tertiary} />
                            <Text style={StyleDrawer.txtrowsmenu}>Acessar conta</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={StyleDrawer.rowsmenu} onPress={() => navigation.navigate("clientes", {
                            screen: 'clientescadastrar'
                        })}>
                            <Icon name="account-plus" size={SIZE_ICON_MENU} color={colors.tertiary} />
                            <Text style={StyleDrawer.txtrowsmenu}>Cadastrar-se</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={StyleDrawer.rowsmenu} onPress={() => navigation.navigate("clientes", {
                            screen: 'clientesperfil'
                        })}>
                            <Icon name="account-circle" size={SIZE_ICON_MENU} color={colors.tertiary} />
                            <Text style={StyleDrawer.txtrowsmenu}>Meu perfil</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={StyleDrawer.separatormenu} />
                    <View style={StyleDrawer.titlerows}>
                        <Text style={StyleDrawer.txttitlerows}>Contato / Sobre</Text>
                    </View>
                    <View style={StyleDrawer.ctrowsmenu}>
                        <TouchableOpacity style={StyleDrawer.rowsmenu} onPress={() => navigation.navigate("menu", {
                            screen: 'contato'
                        })}>
                            <Icon name="email" size={SIZE_ICON_MENU} color={colors.tertiary} />
                            <Text style={StyleDrawer.txtrowsmenu}>Entre em contato</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={StyleDrawer.rowsmenu} onPress={() => navigation.navigate("menu", {
                            screen: 'sobre'
                        })}>
                            <Icon name="information" size={SIZE_ICON_MENU} color={colors.tertiary} />
                            <Text style={StyleDrawer.txtrowsmenu}>Sobre a empresa</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </DrawerContentScrollView>
    );
}