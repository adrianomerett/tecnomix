import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import styles from "../../styles/StyleClientePerfil";
import StyleBreadcrumb from "../../styles/StyleBreadcrumb";

import color from "../../theme/colors";

const ScreenClintesPerfil = ({ setLogged, logged }) => {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [iniciais, setIniciais] = useState("");
    const navigation = useNavigation();


    useEffect(() => {
        const checkLogin = async () => {
            try {
                const nomedb = await AsyncStorage.getItem("nome");
                const emaildb = await AsyncStorage.getItem("email");
                setNome(nomedb);
                setEmail(emaildb);
                if (nomedb) {
                    const partes = nomedb.split(" ");
                    const iniciais = `${partes[0][0]}${partes[1] ? partes[1][0] : ""}`;
                    setIniciais(iniciais);
                }
            } catch (error) {
                console.log(error);
            }
        };
        checkLogin();
    }, [logged]);

    const logout = async () => {
        try {
            Alert.alert("Atenção", "Deseja realmente sair?", [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Ok",
                    onPress: async () => {
                        await AsyncStorage.setItem("statuslogin", "false");
                        await AsyncStorage.removeItem("clienteid");
                        setLogged(false);
                    },
                    style: "destructive"
                }
            ]);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.container}>
            <View style={StyleBreadcrumb.breadcrumb}>
                <TouchableOpacity onPress={() => navigation.navigate('home')}>
                    <Text style={StyleBreadcrumb.activenavigation}>Início</Text>
                </TouchableOpacity>
                <Text style={StyleBreadcrumb.inactivenavigation}> » </Text>
                <Text style={StyleBreadcrumb.inactivenavigation}> Minha conta </Text>
            </View>
            <View style={styles.containercadastro}>
                <View style={styles.containericon}>
                    <View style={styles.circleicon}>
                        <View style={styles.fundoicon}>
                            {/* <Icon name="account-circle-outline" size={60} color={color.white} /> */}
                            <Text style={styles.iniciais}>{iniciais}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.ctinfo}>
                    <View style={styles.rows}>
                        <Icon name="account-circle-outline" size={28} color={color.graynavigation} />
                        <Text style={styles.txtinfoaccount}>{nome}</Text>
                    </View>
                    <View style={styles.rows}>
                        <Icon name="email-multiple-outline" size={24} color={color.graynavigation} />
                        <Text style={styles.txtinfoaccount}> {email}</Text>

                    </View>
                </View>
                <View style={styles.ctactions}>
                    <TouchableOpacity style={styles.rowsaction}>
                        <Icon name="account-edit-outline" size={24} color={color.coloredit} />
                        <Text style={[styles.txtinfoaccount, { color: color.coloredit }]}>Editar perfil</Text>
                    </TouchableOpacity>
                    <View style={styles.ctactions}>
                        <TouchableOpacity style={styles.rowsaction} onPress={() => logout()}>
                            <Icon name="logout" size={24} color={color.colordelete} />
                            <Text style={[styles.txtinfoaccount, { color: color.colordelete }]}>Sair</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default ScreenClintesPerfil;