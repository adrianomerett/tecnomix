import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import ScreenSplash from "../splash/ScreenSplash";
import MainDrawer from "./drawer/MainDrawer";

import api from "../api/api";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));



export default function IndexNavigation() {
    const [loading, setloading] = useState(true);
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    useEffect(() => {
        const getConfig = async () => {
            try {
                const req = await api.get("/config/getconfig/");
                const { status, dados, categorias } = req.data;
                if (!status) {
                    setSnackbarMessage('Erro ao carregar os dados...');
                    setSnackbarVisible(true);
                    return;
                }
                await AsyncStorage.setItem("nameloja", dados.nameloja);
                await AsyncStorage.setItem("slogan", dados.slogan);
                await AsyncStorage.setItem("categorias", JSON.stringify(categorias));
                await AsyncStorage.setItem("config", JSON.stringify(dados));
                await sleep(1000);
                setloading(false);
            } catch (error) {
                setloading(false);
                setSnackbarMessage('Erro ao carregar os dados...');
                setSnackbarVisible(true);
                console.error("Error fetching categorias:", error);
            }
        };
        getConfig();
    }, []);

    const changeSnackbar = () => {
        setSnackbarVisible(!snackbarVisible);
    }
    return (
        <>
            {loading ? (
                <ScreenSplash snackbarVisible={snackbarVisible} snackbarMessage={snackbarMessage} changeSnackbar={changeSnackbar} />
            ) : (
                <NavigationContainer>
                    <MainDrawer />
                </NavigationContainer >
            )}
        </>
    )
}
