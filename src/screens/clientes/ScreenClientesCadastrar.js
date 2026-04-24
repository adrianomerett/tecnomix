import React, { useState, useRef } from "react";
import { View, ScrollView, Text, TouchableOpacity, Alert, ActivityIndicator, Keyboard } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { TextInput, Button } from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../../styles/StyeleCadastrarClientes";
import StyleBreadcrumb from "../../styles/StyleBreadcrumb";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { validaemail } from "../../helpers/validacoes";

import color from "../../theme/colors";
import api from "../../api/api"

const ScreenClientesCadastrar = () => {
    const navigation = useNavigation();
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarsenha, setConfirmarsenha] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmar, setShowPasswordConfirmar] = useState(false);
    const [errorNome, setErrorNome] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorSenha, setErrorSenha] = useState(false);
    const [errorConfirmarSenha, setErrorConfirmarSenha] = useState(false);
    const [loading, setLoading] = useState(false);
    // Referência do input
    const inputNome = useRef(null);
    const inputEmail = useRef(null);
    const inputSenha = useRef(null);
    const inputConfirmarSenha = useRef(null);

    const salvarCliente = async () => {
        try {
            setLoading(true);
            if (!validarDados()) {
                return false;
            }
            const dados = {
                nome: nome,
                email: email,
                senha: senha,
                rsenha: confirmarsenha
            }
            const req = await api.post('/clientes/cadastrar', { dados: dados });
            setLoading(false);
            const { status, msg, clienteid } = req.data;
            if (!status) {
                ShowAlert('Erro', msg);
                return false;
            }
            await AsyncStorage.setItem("statuslogin", "true");
            await AsyncStorage.setItem("clienteid", String(clienteid));
            await AsyncStorage.setItem("nome", String(nome));
            await AsyncStorage.setItem("email", String(email));
            Alert.alert("Sucesso", msg, [
                { text: 'Ok', onPress: () => navigation.navigate("clientesperfil") }
            ]);
        } catch (erro) {
            setLoading(false);
            console.log(erro);
        }
    }

    const ShowAlert = (title, message) => {
        Alert.alert(title, message, [
            { text: 'Ok', style: 'destructive' }
        ]);
    }

    // Validar os dados
    const validarDados = async () => {
        if (nome.length < 3) {
            setErrorNome(true);
            ShowAlert('Erro', 'Nome inválido');
            inputNome.current.focus();
            return false;
        } else {
            setErrorNome(false);
        }
        if (!validaemail(email)) {
            setErrorEmail(true);
            ShowAlert('Erro', 'E-mail inválido');
            inputEmail.current.focus();
            return false;
        } else {
            setErrorEmail(false);
        }
        if (senha.length < 8) {
            setErrorSenha(true);
            ShowAlert('Erro', 'A senha deve ter no mínimo 8 caracteres');
            inputSenha.current.focus();
            return false;
        } else {
            setErrorSenha(false);
        }
        if (confirmarsenha !== senha) {
            setErrorConfirmarSenha(true);
            ShowAlert('Erro', 'As senhas não coincidem');
            inputConfirmarSenha.current.focus();
            return false;
        } else {
            setErrorConfirmarSenha(false);
        }
        return true;
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
                <Text style={StyleBreadcrumb.inactivenavigation}> Cadastrar </Text>
            </View>
            <KeyboardAwareScrollView style={styles.containercadastro}
                enableOnAndroid={true}
                extraScrollHeight={20}
                keyboardShouldPersistTaps="handled">
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">

                    <View style={styles.containericon}>
                        <View style={styles.circleicon}>
                            <View style={styles.fundoicon}>
                                <Icon name="account-plus" size={60} color={color.white} />
                            </View>
                        </View>
                    </View>
                    <View>
                        <TextInput
                            label="Nome completo"
                            mode="outlined"
                            ref={inputNome}
                            autoCapitalize="words"
                            value={nome}
                            onChangeText={text => setNome(text)}
                            style={styles.input}
                            textColor={color.primary}
                            theme={{
                                colors: {
                                    primary: color.primary
                                }
                            }}
                            error={!!errorNome}
                        />

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
                        <TextInput
                            label="Confirmar senha"
                            mode="outlined"
                            ref={inputConfirmarSenha}
                            autoCapitalize="none"
                            secureTextEntry={!showPasswordConfirmar}
                            value={confirmarsenha}
                            onChangeText={text => setConfirmarsenha(text)}
                            style={styles.input}
                            textColor={color.primary}
                            theme={{
                                colors: {
                                    primary: color.primary
                                }
                            }}
                            right={
                                <TextInput.Icon
                                    icon={showPasswordConfirmar ? 'eye' : 'eye-off'}
                                    onPress={() => setShowPasswordConfirmar(!showPasswordConfirmar)}
                                    color={color.primary}
                                />
                            }
                            error={!!errorConfirmarSenha}
                        />
                        <Button
                            mode="contained"

                            style={{ marginTop: 10 }}
                            onPress={() => salvarCliente()}
                            theme={{
                                colors: {
                                    primary: color.primary
                                }
                            }}
                        >
                            Cadastrar
                        </Button>
                        <Button
                            mode="contained"
                            style={{ marginTop: 10, marginBottom: 20 }}
                            onPress={() => navigation.navigate('clienteslogin')}
                            theme={{
                                colors: {
                                    primary: color.primary
                                }
                            }}
                        >
                            Já tem uma conta? Entre aqui.
                        </Button>
                    </View>
                </ScrollView>
            </KeyboardAwareScrollView>
        </View>
    )
}

export default ScreenClientesCadastrar;