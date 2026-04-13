import React, { useState, useEffect, useCallback, useRef } from "react";
import { View, ScrollView, Text, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TextInput, Checkbox, Button } from 'react-native-paper';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import styles from "../../styles/StyleClienteLogin";
import StyleBreadcrumb from "../../styles/StyleBreadcrumb";

import color from "../../theme/colors";
import { validaemail } from "../../helpers/validacoes";
import api from "../../api/api";

const ScreenClintesPerfil = ({ setLogged }) => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [remember, setRemember] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorSenha, setErrorSenha] = useState(false);
    const [loading, setLoading] = useState(false);
    const inputEmail = useRef(null);
    const inputSenha = useRef(null);
    const navigation = useNavigation();

    const login = async () => {
        try {
            await saveDataLogin();
            if (!validarLogin()) {
                return false;
            }
            const dados = {
                email: email,
                senha: senha
            };
            setLoading(true);
            const req = await api.post('/clientes/login', { dados: dados });
            setLoading(false);
            const { status, msg, data } = req.data;
            if (!status) {
                ShowAlert('Erro', msg);
                return false;
            }
            await AsyncStorage.setItem("statuslogin", "true");
            await AsyncStorage.setItem("clienteid", String(data.clienteid));
            await AsyncStorage.setItem("nome", String(data.nome));
            await AsyncStorage.setItem("email", String(data.email));
            setLogged(true);
        } catch (e) {
            setLoading(false);
            console.log(e)
        }
    }

    useFocusEffect(
        useCallback(() => {
            setDataLogin();
        }, [])
    );


    const setDataLogin = async () => {
        try {
            let rememberdb = await AsyncStorage.getItem('remember');
            if (rememberdb == null) {
                setRemember(false);
                await AsyncStorage.setItem('remember', 'false');
                return false;
            }
            if (rememberdb == 'true') {
                const emaildb = await AsyncStorage.getItem('email');
                const senhadb = await AsyncStorage.getItem('senha');
                if (emaildb !== null) {
                    setEmail(emaildb);
                }
                if (senhadb !== null) {
                    setSenha(senhadb);
                }
                setEmail(emaildb);
                setSenha(senhadb);
                setRemember(true);
                return true;
            }
            setRemember(false);
            return true;
        } catch (e) {
            console.log(e)
        }
    }

    const changeRemember = async () => {
        setRemember(!remember);
        if (remember) {
            await AsyncStorage.setItem('remember', 'false');
            await AsyncStorage.setItem('email', '');
            await AsyncStorage.setItem('senha', '');
            setEmail('');
            setSenha('');
        } else {
            await AsyncStorage.setItem('email', email);
            await AsyncStorage.setItem('senha', senha);
            await AsyncStorage.setItem('remember', 'true');
        }
    }

    const saveDataLogin = async () => {
        if (remember) {
            await AsyncStorage.setItem('email', email);
            await AsyncStorage.setItem('senha', senha);
            await AsyncStorage.setItem('remember', 'true');
        } else {
            await AsyncStorage.setItem('email', '');
            await AsyncStorage.setItem('senha', '');
            await AsyncStorage.setItem('remember', 'false');
        }
        return true;
    }

    const validarLogin = () => {
        if (!validaemail(email)) {
            setErrorEmail(true);
            ShowAlert('Erro', 'E-mail inválido!');
            inputEmail.current.focus();
            return false;
        } else {
            setErrorEmail(false);
        }
        if (senha.length < 8) {
            setErrorSenha(true);
            ShowAlert('Erro', 'Por favor, informe sua senha com no mínimo 8 caracteres!');
            inputSenha.current.focus();
            return false;
        } else {
            setErrorSenha(false);
        }
        return true;
    }

    const ShowAlert = (title, message) => {
        Alert.alert(title, message, [
            { text: 'Ok', style: 'destructive' }
        ]);
    }

    const loader = () => {
        return (
            <View style={styles.containerloader}>
                <ActivityIndicator size="large" color={color.primary} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {loading ? loader() : null}
            <View style={StyleBreadcrumb.breadcrumb}>
                <TouchableOpacity onPress={() => navigation.navigate('home')}>
                    <Text style={StyleBreadcrumb.activenavigation}>Início</Text>
                </TouchableOpacity>
                <Text style={StyleBreadcrumb.inactivenavigation}> » </Text>
                <Text style={StyleBreadcrumb.inactivenavigation}> Login </Text>
            </View>
            <ScrollView style={styles.containercadastro}>
                <View style={styles.cttitlelogin}>
                    <Text style={styles.txttitle}>Acesse sua conta ou cadastre-se</Text>
                </View>
                <View style={styles.containericon}>
                    <View style={styles.circleicon}>
                        <View style={styles.fundoicon}>
                            <Icon name="account-lock" size={60} color={color.white} />
                        </View>
                    </View>
                </View>
                <View>
                    <TextInput
                        label="E-mail"
                        mode="outlined"
                        ref={inputEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={text => setEmail(text)}
                        style={styles.input}
                        textColor={color.primary}
                        theme={{
                            colors: {
                                primary: color.primary
                            }
                        }}
                        error={!!errorEmail}
                    />
                    <TextInput
                        label="Senha"
                        mode="outlined"
                        ref={inputSenha}
                        autoCapitalize="none"
                        secureTextEntry={!showPassword}
                        value={senha}
                        onChangeText={text => setSenha(text)}
                        style={styles.input}
                        textColor={color.primary}
                        theme={{
                            colors: {
                                primary: color.primary
                            }
                        }}
                        right={
                            <TextInput.Icon
                                icon={showPassword ? 'eye' : 'eye-off'}
                                onPress={() => setShowPassword(!showPassword)}
                                color={color.primary}
                            />
                        }
                        error={!!errorSenha}
                    />
                    <View style={styles.ctcheckbox}>
                        <Checkbox
                            status={remember ? 'checked' : 'unchecked'}
                            onPress={() => changeRemember()}
                            theme={{ colors: { primary: color.primary } }}
                        />
                        <TouchableOpacity onPress={() => {
                            changeRemember();
                        }}>
                            <Text style={styles.txtcheckbox}>Salvar acesso para o próximo login?</Text>
                        </TouchableOpacity>
                    </View>
                    <Button
                        mode="contained"
                        style={{ marginTop: 10 }}
                        onPress={() => login()}
                        theme={{
                            colors: {
                                primary: color.primary
                            }
                        }}
                    >
                        Login
                    </Button>
                    <Button
                        mode="contained"
                        style={{ marginTop: 10 }}
                        onPress={() => navigation.navigate("clientescadastrar")}
                        theme={{
                            colors: {
                                primary: color.primary
                            }
                        }}
                    >
                        Cadastrar-se
                    </Button>
                </View>
            </ScrollView>
        </View>
    )
}

export default ScreenClintesPerfil;