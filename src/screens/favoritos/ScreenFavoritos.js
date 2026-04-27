import React, { useState, useCallback, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, useWindowDimensions, ActivityIndicator } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { RefreshControl } from "react-native-gesture-handler";

import api from "../../api/api";
import colors from "../../theme/colors";

import style from "../../styles/StyleBoryList";
import stylebreadcrumb from "../../styles/StyleBreadcrumb";

import ElementFlatList from "../../components/ElementsFlatList";
import SeparatorFlatList from "../../components/SeparatorFlatList";
import LoaderFlatList from "../../components/LoaderFlatList";
import LoaderFavoritos from "../../components/LoaderFavoritos";
import SnackBarFavoritos from "../../components/SnackBarFavoritos";
import EmptyList from "../../components/EmptyList";

export default ScreenFavoritos = () => {
    const navigation = useNavigation();
    const [produtos, setProdutos] = useState([]);
    const [favoritos, setFavoritos] = useState([]);
    const [loading, setloading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [refreshing, setrefreshing] = useState(false);
    const [message, setMessage] = useState('Você não possui produtos adicionados aos favoritos.');
    const [loadingFavoritos, setLoadingFavoritos] = useState(false);
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    async function getFavoritos() {
        try {
            setloading(true);
            const clientid = await AsyncStorage.getItem('clienteid');
            const email = await AsyncStorage.getItem('emailfavoritos');
            const senha = await AsyncStorage.getItem('senhafavoritos');
            const req = await api.get('/produtos/favoritos/', { params: { clientid: clientid, email: email, senha: senha } });
            const { status, dados, message, dafavoritos } = req.data;
            setloading(false);
            if (!status) {
                setMessage(message);
                return;
            }
            setProdutos(dados);
            setFavoritos(dafavoritos);
        } catch (e) {
            setloading(false);
            console.log(e);
        } finally {
            setloading(false);
        }
    }

    useFocusEffect(
        useCallback(() => {
            getFavoritos();
        }, [])
    );

    const onRefresh = useCallback(() => {
        setrefreshing(true);
        getFavoritos();
        setrefreshing(false);
    }, []);

    const changeSnackbar = () => {
        setSnackbarVisible(!snackbarVisible);
    }

    if (loading) {
        return <LoaderFlatList />;
    }

    return (
        <View style={style.container}>
            <View style={stylebreadcrumb.breadcrumb}>
                <TouchableOpacity onPress={() => navigation.navigate('home')}><Text style={stylebreadcrumb.activenavigation}>Início</Text></TouchableOpacity>
                <Text style={stylebreadcrumb.inactivenavigation}> » </Text>
                <TouchableOpacity onPress={() => navigation.navigate('produtos')}><Text style={stylebreadcrumb.activenavigation}>Produtos</Text></TouchableOpacity>
                <Text style={stylebreadcrumb.inactivenavigation}> » </Text>
                <Text style={stylebreadcrumb.inactivenavigation}> Favoritos </Text>
            </View>
            <View style={style.containerlist}>
                <FlatList
                    data={produtos}
                    contentContainerStyle={{ padding: 2 }}
                    renderItem={({ item }) => (
                        <ElementFlatList
                            item={item} navigation={navigation}
                            favoritos={favoritos}
                            setFavoritos={setFavoritos}
                            setLoadingFavoritos={setLoadingFavoritos}
                            setSnackbarVisible={setSnackbarVisible}
                            setSnackbarMessage={setSnackbarMessage}
                            setProdutos={setProdutos}
                            updateProducts={true}
                        />
                    )}
                    keyExtractor={(item) => item.produtoid.toString()}
                    ItemSeparatorComponent={SeparatorFlatList}
                    onEndReachedThreshold={0.5}
                    ListEmptyComponent={<EmptyList message={message} />}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            colors={[colors.primary]}
                        />
                    }
                />
                {loadingFavoritos ? (<LoaderFavoritos />) : null}
                <SnackBarFavoritos visible={snackbarVisible} message={snackbarMessage} changeSnackbar={changeSnackbar} />
            </View>
        </View>
    );

};