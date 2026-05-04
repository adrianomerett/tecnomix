import React, { useState, useRef } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextInput, Snackbar } from 'react-native-paper';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import colors from "../../theme/colors";
import cst from "../../../constants";
import { validaemail } from "../../helpers/validacoes";
import api from "../../api/api";

import StyleContato from "../../styles/StyleContato";
import StyleBreadcrumb from "../../styles/StyleBreadcrumb";

export default function ScreenContato() {
    const navigation = useNavigation();
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [fone, setFone] = useState("");
    const [assunto, setAssunto] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorNome, setErrorNome] = useState(false);
    const [errorFone, setErrorFone] = useState(false);
    const [errorAssunto, setErrorAssunto] = useState(false);
    const [errorMensagem, setErrorMensagem] = useState(false);
    const [styleSnackbar, setStyleSnackbar] = useState(true);
    const [loading, setloading] = useState(false);
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('Isso é um teste');
    // Referência do input
    const inputNome = useRef(null);
    const inputEmail = useRef(null);
    const inputFone = useRef(null);
    const inputAssunto = useRef(null);
    const inputMensagem = useRef(null);

    // Mascara de telefone
    const phoneMask = (value) => {
        if (!value) return '';
        let numbers = value.replace(/\D/g, '');
        if (numbers.length <= 10) {
            return numbers
                .replace(/^(\d{2})(\d)/g, '($1) $2')
                .replace(/(\d{4})(\d)/, '$1-$2');
        } else {
            return numbers
                .replace(/^(\d{2})(\d)/g, '($1) $2')
                .replace(/(\d{5})(\d)/, '$1-$2');
        }
    };

    const changeSnackbar = () => {
        setSnackbarVisible(!snackbarVisible);
    }

    const sendMessage = async () => {
        try {
            let validate = await validateForm();
            if (!validate) {
                return false;
            }
            const dados = {
                nome: nome,
                email: email,
                fone: fone,
                assunto: assunto,
                mensagem: mensagem
            }
            setloading(true);
            const req = await api.post("/contato/enviarmsg/",
                { dados: dados },
                {
                    headers: { 'Content-Type': 'application/json' }
                });
            setloading(false);
            const { status, msg } = req.data;
            if (!status) {
                setSnackbarMessage(msg);
                setSnackbarVisible(true);
                setStyleSnackbar(false);
                return false;
            }
            setSnackbarMessage(`Olá ${nome}, recebemos a sua mensagem, retornaremos seu contato em breve!`);
            setSnackbarVisible(true);
            setStyleSnackbar(true);
            setNome('');
            setEmail('');
            setFone('');
            setAssunto('');
            setMensagem('');
        } catch (error) {
            setSnackbarMessage('Erro ao enviar mensagem...');
            setSnackbarVisible(true);
            setStyleSnackbar(false);
            console.error("Error sending message:", error);
        }finally{
            setloading(false);
        }
    };

    const validateForm = async () => {
        if (nome.length < 3) {
            setErrorNome(true);
            setSnackbarMessage('Informe seu nome...');
            setSnackbarVisible(true);
            setStyleSnackbar(false);
            inputNome.current.focus();
            return false;
        } else {
            setErrorNome(false);
        }
        if (!validaemail(email)) {
            setErrorEmail(true);
            setSnackbarMessage('Informe um email válido...');
            setSnackbarVisible(true);
            setStyleSnackbar(false);
            inputEmail.current.focus();
            return false;
        } else {
            setErrorEmail(false);
        }
        if (fone.length < 14) {
            setErrorFone(true);
            setSnackbarMessage('Informe um número de telefone válido...');
            setSnackbarVisible(true);
            setStyleSnackbar(false);
            inputFone.current.focus();
            return false;
        } else {
            setErrorFone(false);
        }
        if (assunto.length < 3) {
            setErrorAssunto(true);
            setSnackbarMessage('Informe um assunto para a mensagem...');
            setSnackbarVisible(true);
            setStyleSnackbar(false);
            inputAssunto.current.focus();
            return false;
        } else {
            setErrorAssunto(false);
        }
        if (mensagem.length < 3) {
            setErrorMensagem(true);
            setSnackbarMessage('Informe sua mensagem...');
            setSnackbarVisible(true);
            setStyleSnackbar(false);
            inputMensagem.current.focus();
            return false;
        } else {
            setErrorMensagem(false);
        }
        return true;
    }

    const loader = () => {
        return (
            <View style={StyleContato.containerloader}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    return (
        <View style={StyleContato.container}>
            {loading && loader()}
            <View style={StyleBreadcrumb.breadcrumb}>
                <TouchableOpacity onPress={() => navigation.navigate('home')}>
                    <Text style={StyleBreadcrumb.activenavigation}>Início</Text>
                </TouchableOpacity>
                <Text style={StyleBreadcrumb.inactivenavigation}> » </Text>
                <Text style={StyleBreadcrumb.inactivenavigation}> Contato </Text>
            </View>
            <KeyboardAwareScrollView style={StyleContato.containercontato}
                enableOnAndroid={true}
                extraScrollHeight={20}
                keyboardShouldPersistTaps="handled">
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
                    <View style={StyleContato.cttitleinfo}>
                        <Text style={StyleContato.txttitleinfo}>Dúvidas, críticas ou sugestões? Entre em contato conosco.</Text>
                    </View>
                    <View style={StyleContato.cardinfo}>
                        <Text style={StyleContato.txtcardinfo}>Informe os campos abaixo para enviar sua mensagem...</Text>
                    </View>
                    <View>
                        <TextInput
                            label="Nome"
                            mode="outlined"
                            ref={inputNome}
                            autoCapitalize="words"
                            value={nome}
                            onChangeText={text => setNome(text)}
                            style={StyleContato.input}
                            textColor={colors.primary}
                            theme={{
                                colors: {
                                    primary: colors.primary
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
                            style={StyleContato.input}
                            textColor={colors.primary}
                            theme={{
                                colors: {
                                    primary: colors.primary
                                }
                            }}
                            error={!!errorEmail}
                        />

                        <TextInput
                            label="Telefone"
                            mode="outlined"
                            ref={inputFone}
                            keyboardType="numeric"
                            autoCapitalize="none"
                            value={fone}
                            onChangeText={(text) => {
                                const masked = phoneMask(text);
                                setFone(masked);
                            }}
                            maxLength={15}
                            style={StyleContato.input}
                            textColor={colors.primary}
                            theme={{
                                colors: {
                                    primary: colors.primary
                                }
                            }}
                            error={!!errorFone}
                        />
                        <TextInput
                            label="Assunto"
                            mode="outlined"
                            ref={inputAssunto}
                            autoCapitalize="words"
                            value={assunto}
                            onChangeText={text => setAssunto(text)}
                            style={StyleContato.input}
                            textColor={colors.primary}
                            theme={{
                                colors: {
                                    primary: colors.primary
                                }
                            }}
                            error={!!errorAssunto}
                        />

                        <TextInput
                            label="Sua mensagem"
                            mode="outlined"
                            multiline
                            ref={inputMensagem}
                            numberOfLines={8}
                            value={mensagem}
                            onChangeText={setMensagem}
                            style={{ minHeight: 180 }}
                            textAlignVertical="top"
                            placeholder="Digite aqui..."
                            theme={{
                                colors: {
                                    primary: colors.primary
                                }
                            }}
                            error={!!errorMensagem}
                        />
                        <TouchableOpacity style={StyleContato.btnsendmsg} activeOpacity={0.8} onPress={sendMessage}>
                            <Icon name="send" size={24} color={colors.grayfundo} />
                            <Text style={StyleContato.txtbtnsend}>Eviar Mensagem</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAwareScrollView>
            <Snackbar
                visible={snackbarVisible}
                onDismiss={changeSnackbar}
                style={styleSnackbar ? StyleContato.snacksuccess : StyleContato.snackerror}
                duration={cst.DURATION_SNACKBAR}
                wrapperStyle={{ alignSelf: 'center' }}
                action={{
                    label: 'Fechar',
                    labelStyle: { color: colors.white }
                }}>
                <Text style={StyleContato.txtmessage}>{snackbarMessage}</Text>
            </Snackbar>
        </View>
    );
}