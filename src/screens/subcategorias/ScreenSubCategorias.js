import React, { useState, useEffect, useCallback } from "react";
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, FlatList, } from 'react-native';
import { RefreshControl } from "react-native-gesture-handler";

import api from "../../api/api";
import cst from "../../../constants";

import style from '../../styles/StyleBoryList';
import stylebreadcrumb from '../../styles/StyleBreadcrumb';

import ElementFlatList from "../../components/ElementsFlatList";
import SeparatorFlatList from "../../components/SeparatorFlatList";
import LoaderFlatList from "../../components/LoaderFlatList";
import EmptyList from "../../components/EmptyList";
import FooterFlatList from "../../components/FooterFlatList";
import colors from "../../theme/colors";

const ScreenSubCategorias = ({ route }) => {
    const navigation = useNavigation();
    const { namecate, idcate, namesubcate, idsubcate } = route.params;
    const [produtos, setProdutos] = useState([]);
    const [paginaatual, setPaginaatual] = useState(1);
    const [totalpages, setTotalpages] = useState(0);
    const [loading, setloading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [refreshing, setrefreshing] = useState(false);
    const [message, setMessage] = useState('Nenhum resultado encontrado...');

    async function getProducts(page) {
        try {
            if (page === 1) {
                setloading(true);
            } else {
                setLoadingMore(true);
            }
            var req = await api.get('/subcategorias/listar/', {
                params: {
                    subcategoriaid: idsubcate,
                    pagina_atual: page,
                    por_pagina: cst.PAGINATION
                }
            });
            var { status, dados, message, paginacao } = req.data;
            if (!status) {
                setMessage(message);
                return;
            }
            setPaginaatual(page);
            setTotalpages(paginacao.total_paginas);
            if (page === 1) {
                setProdutos(dados);
            } else {
                setProdutos((prev) => [...prev, ...dados]);
            }
            setloading(false);
        } catch (error) {
            setMessage(message);
            setloading(false);
            console.log(error.message);
        } finally {
            setloading(false);
            setLoadingMore(false);
        }
    }

    useEffect(() => {
        getProducts(paginaatual);
    }, []);

    const onRefresh = useCallback(() => {
        setrefreshing(true);
        setPaginaatual(1);
        getProducts(1);
        setrefreshing(false);
    }, []);

    const loadPages = () => {
        if (loadingMore) return;
        if (paginaatual < totalpages && !loading) {
            const nextpagina = paginaatual + 1;
            getProducts(nextpagina);
        }
    }

    if (loading) {
        return <LoaderFlatList />;
    }

    return (
        <View style={style.container}>
            <View style={stylebreadcrumb.breadcrumb}>
                <TouchableOpacity onPress={() => navigation.navigate('home')}><Text style={stylebreadcrumb.activenavigation}>Início</Text></TouchableOpacity>
                <Text style={stylebreadcrumb.inactivenavigation}> » </Text>
                <TouchableOpacity onPress={() => navigation.navigate('departamentos')}><Text style={stylebreadcrumb.activenavigation}>Departamentos</Text></TouchableOpacity>
                <Text style={stylebreadcrumb.inactivenavigation}> » </Text>
                <TouchableOpacity onPress={() => navigation.navigate('categorias', {
                    idcate: idcate,
                    namecate: namecate
                })}><Text style={stylebreadcrumb.activenavigation}>{namecate}</Text></TouchableOpacity>
                <Text style={stylebreadcrumb.inactivenavigation}> » </Text>
                <Text style={stylebreadcrumb.inactivenavigation}> {namesubcate} </Text>
            </View>
            <View style={style.containerlist}>
                <FlatList
                    data={produtos}
                    contentContainerStyle={{ padding: 2 }}
                    renderItem={({ item }) => (<ElementFlatList item={item} navigation={navigation} />)}
                    keyExtractor={(item) => item.produtoid.toString()}
                    ItemSeparatorComponent={SeparatorFlatList}
                    onEndReached={loadPages}
                    onEndReachedThreshold={0.5}
                    ListEmptyComponent={<EmptyList message={message} />}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            colors={[colors.primary]}
                        />
                    }
                    ListFooterComponent={<FooterFlatList loadingMore={loadingMore} paginaatual={paginaatual} totalpages={totalpages} produtos={produtos} />}
                />
            </View>
        </View>
    );

}

export default ScreenSubCategorias;
