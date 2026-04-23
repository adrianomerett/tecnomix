import React, { useState, useCallback } from "react";
import { View, Text, TouchableOpacity, FlatList, useWindowDimensions, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RenderHtml from "react-native-render-html";
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";

import api from "../../api/api";
import colors from "../../theme/colors";

import style from '../../styles/StyleDetalhesProdutos';
import stylebreadcrumb from '../../styles/StyleBreadcrumb';

import GaleriaZoom from "../../components/CarrousselDetalhes";
import StyleDetalhesProdutos from "../../styles/StyleDetalhesProdutos";

import ElementFlatList from "../../components/ElementsFlatList";
import SeparatorFlatList from "../../components/SeparatorFlatList";
import LoaderFavoritos from "../../components/LoaderFavoritos";
import SnackBarFavoritos from "../../components/SnackBarFavoritos";

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export default ScreenDetalhes = ({ route }) => {
    const navigation = useNavigation();
    const { productid, categoriaid, subcategoriaid, namecategoria, namesubcategoria } = route.params;
    const [produto, setProduto] = useState([]);
    const [favoritos, setFavoritos] = useState([]);
    const [images, setImages] = useState([]);
    const [related, setRelated] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingFavoritos, setLoadingFavoritos] = useState(false);
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [isFavorite, setIsFavorite] = useState(false);

    const { width } = useWindowDimensions();
    const widthdetalhes = width - 40;

    async function getDetalhes() {
        try {
            setLoading(true);
            const getidclient = await AsyncStorage.getItem("clienteid");
            const clienteid = getidclient == null || getidclient == undefined ? 0 : getidclient;
            const req = await api.get(`/produtos/detalhes/`, {
                params: {
                    productid: productid,
                    categoriaid: categoriaid,
                    clienteid: clienteid
                }
            });
            var { status, dados, images, rel, dafavoritos } = req.data;
            if (!status) {
                setLoading(false);
                setMessage(message);
                setSnackbarMessage(`${message}.`);
                setSnackbarVisible(true);
                return false;
            }
            // Seta os itens vistos recentemente
            await setRecentes(dados);
            setLoading(false);
            setImages(images);
            setProduto(dados);
            setRelated(rel);
            setFavoritos(dafavoritos);
            let checkIsFavorite = (dafavoritos || []).some((subArray) => subArray.includes(productid)) ? true : false;
            setIsFavorite(checkIsFavorite);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    // Setar Produtos vistos recentemente
    const setRecentes = async (dados) => {
        try {
            //await AsyncStorage.removeItem("recentes");
            const recentes = await AsyncStorage.getItem("recentes");
            let itemrecent = {
                productid: dados.produtoid,
                categoriaid: categoriaid,
                subcategoriaid: subcategoriaid,
                namecategoria: namecategoria,
                namesubcategoria: namesubcategoria,
                name: dados.nome,
                valoroferta: dados.valoroferta,
                exibirpreco: dados.exibirpreco,
                img: dados.img
            }
            if (recentes == null || recentes == undefined) {
                let item = []
                item.push(itemrecent);
                await AsyncStorage.setItem("recentes", JSON.stringify(item));
            } else {
                let item = JSON.parse(recentes);
                for (let i = 0; i < item.length; i++) {
                    if (item[i].productid === dados.produtoid) {
                        return false;
                    }
                }
                if (item.length >= 10) {
                    item.pop();
                }
                let newitem = [itemrecent, ...item];
                await AsyncStorage.setItem("recentes", JSON.stringify(newitem));
            }
            return true;
        } catch (error) {
            console.log(error);
        }
    }

    useFocusEffect(
        useCallback(() => {
            getDetalhes();
        }, [productid])
    );

    const loadingDetails = () => {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    const changeSnackbar = () => {
        setSnackbarVisible(!snackbarVisible);
    }

    const changeFavoriteDetails = async () => {
        try {
            setLoadingFavoritos(true);
            var statusloged = await AsyncStorage.getItem("statuslogin");
            if (statusloged === "false" || statusloged === null) {
                navigation.navigate("clientes", { screen: "clienteslogin" });
                return false;
            }
            const getidclient = await AsyncStorage.getItem("clienteid");
            const clienteid = getidclient == null || getidclient == undefined ? 0 : getidclient;
            var email = await AsyncStorage.getItem("email");
            var senha = await AsyncStorage.getItem("senha");
            var dados = {
                clienteid: clienteid,
                produtoid: productid,
                status: isFavorite,
                updateproduct: false,
                email: email,
                senha: senha
            }
            var req = await api.post('/favoritos/change', { dados: dados });
            const { status, msg } = req.data;
            if (!status) {
                setSnackbarVisible(true);
                setSnackbarMessage(`${msg}.`);
                return false;
            }
            setIsFavorite(!isFavorite);
            setLoadingFavoritos(false);
            setSnackbarVisible(true);
            setSnackbarMessage(`${msg}.`);
            return true;
        } catch (error) {
            console.log(error);
        }
    }

    const elementHeaderDetalhes = () => {
        return (
            <>
                <View style={StyleDetalhesProdutos.cttitle}>
                    <Text style={StyleDetalhesProdutos.titleproduct}>{produto.nome}</Text>
                </View>
                <GaleriaZoom images={images} percent={valorpercent} isFavorite={isFavorite} changeFavoriteDetails={changeFavoriteDetails} />
                {exibirpreco ? (
                    <View style={StyleDetalhesProdutos.containerprice}>
                        <View style={StyleDetalhesProdutos.ctprice}>
                            <Text style={StyleDetalhesProdutos.txtprice}>De {valorvenda}</Text>
                        </View>
                        <View style={StyleDetalhesProdutos.ctpricesale}>
                            <Text style={StyleDetalhesProdutos.txtforsile}>Por: </Text>
                            <Text style={StyleDetalhesProdutos.pricesale}>{valoroferta}</Text>
                        </View>
                    </View>
                ) : (null)}
                <View style={StyleDetalhesProdutos.ctestoque}>
                    {estoque ? (
                        <Text style={StyleDetalhesProdutos.txtestoque}>{txtestoque}</Text>
                    ) : (<Text style={StyleDetalhesProdutos.txtestoquenegativo}>Produto indisponível.</Text>)
                    }
                </View>
                <View style={StyleDetalhesProdutos.ctbuttom}>
                    <TouchableOpacity style={StyleDetalhesProdutos.btnshop}>
                        <Icon name="cart-variant" size={20} color={colors.colorfont} />
                        <Text style={StyleDetalhesProdutos.txtbtnshop}> Quero comprar</Text>
                    </TouchableOpacity>
                </View>
                <View style={StyleDetalhesProdutos.ctinfo}>
                    <Text style={StyleDetalhesProdutos.titleinfos}>Sobre este produto:</Text>
                </View>
                <View style={{ paddingHorizontal: 4, width: '100%' }}>
                    <RenderHtml
                        contentWidth={widthdetalhes}
                        source={{
                            html: produto?.descricao ?? ""
                        }}
                        tagsStyles={{
                            strong: {
                                fontWeight: 'bold',
                                color: colors.colortitleproduct,
                            },
                            table: {
                                width: '100%',
                            },
                            tbody: {
                                width: '100%',
                            },
                            tr: {
                                borderBottomWidth: 1,
                                borderBottomColor: colors.grayfundo,
                                flexDirection: 'row',
                                paddingVertical: 4,
                            },
                            td: {
                                width: '50%',
                                marginRight: 10,
                                color: colors.graynavigation,
                            },
                            strong: {
                                fontWeight: 'bold',
                                color: colors.colortitleproduct,
                            }
                        }}
                    />
                </View>
                <View style={StyleDetalhesProdutos.ctinfo}>
                    <Text style={StyleDetalhesProdutos.titleinfos}>Informações técnicas:</Text>
                </View>
                <View style={{ paddingHorizontal: 4, width: '100%' }}>
                    <RenderHtml
                        contentWidth={widthdetalhes}
                        source={{
                            html: produto?.informacoes ?? ""
                        }}
                        tagsStyles={{
                            strong: {
                                fontWeight: 'bold',
                                color: colors.colortitleproduct,
                            },
                            table: {
                                width: '100%',
                            },
                            tbody: {
                                width: '100%',
                            },
                            tr: {
                                borderBottomWidth: 1,
                                borderBottomColor: colors.grayfundo,
                                flexDirection: 'row',
                                paddingVertical: 4,
                            },
                            td: {
                                width: '50%',
                                marginRight: 10,
                                color: colors.graynavigation,
                            },
                            strong: {
                                fontWeight: 'bold',
                                color: colors.colortitleproduct,
                            }
                        }}
                    />
                </View>
                <View style={StyleDetalhesProdutos.ctinfo}>
                    <Text style={StyleDetalhesProdutos.titleinfos}>Você também poderá gostar de:</Text>
                </View>
            </>
        );
    }

    // Configurações de iyens 
    let exibirpreco = produto.exibirpreco == 'S' ? true : false;
    var estoque = produto.estoque > 0 ? true : false;
    let vdiff = produto.valorvenda - produto.valoroferta;
    let percent = vdiff / produto.valoroferta * 100;
    let valorpercent = percent.toFixed(2)
    let valoroferta = Number(produto.valoroferta).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    let valorvenda = Number(produto.valorvenda).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    let txtestoque = produto.estoque > 1 ? `Estoque disponível: ${produto.estoque} unidades.` : 'Apenas 1 unidade disponível.';
    return (
        <View style={style.container}>
            <View style={stylebreadcrumb.breadcrumb}>
                <TouchableOpacity onPress={() => navigation.navigate('home')}>
                    <Text style={stylebreadcrumb.activenavigation}>Início</Text>
                </TouchableOpacity>
                <Text style={stylebreadcrumb.inactivenavigation}> » </Text>
                <TouchableOpacity onPress={() => navigation.navigate('categorias', { idcate: categoriaid, namecate: namecategoria })}>
                    <Text style={stylebreadcrumb.activenavigation}>{namecategoria}</Text>
                </TouchableOpacity>
                <Text style={stylebreadcrumb.inactivenavigation}> » </Text>
                <TouchableOpacity onPress={() => navigation.navigate('subcategorias', {
                    idcate: categoriaid,
                    namecate: namecategoria,
                    idsubcate: subcategoriaid,
                    namesubcate: namesubcategoria
                })}>
                    <Text style={stylebreadcrumb.activenavigation}>{namesubcategoria}</Text>
                </TouchableOpacity>
                <Text style={stylebreadcrumb.inactivenavigation}> » </Text>
                <Text style={stylebreadcrumb.inactivenavigation}>Detalhes</Text>
            </View>
            <View style={style.containerdetalhes}>
                {loading ? (
                    loadingDetails()
                ) : (
                    <FlatList
                        data={related}
                        contentContainerStyle={{ padding: 2 }}
                        ListHeaderComponent={elementHeaderDetalhes}
                        renderItem={({ item }) => (
                            <ElementFlatList
                                item={item} navigation={navigation}
                                favoritos={favoritos}
                                setFavoritos={setFavoritos}
                                setLoadingFavoritos={setLoadingFavoritos}
                                setSnackbarVisible={setSnackbarVisible}
                                setSnackbarMessage={setSnackbarMessage}
                                setProdutos={setRelated}
                                updateProducts={false}
                            />
                        )}
                        keyExtractor={(item) => item.produtoid.toString()}
                        ItemSeparatorComponent={SeparatorFlatList}
                    />
                )}
                {loadingFavoritos ? (<LoaderFavoritos />) : null}
                <SnackBarFavoritos visible={snackbarVisible} message={snackbarMessage} changeSnackbar={changeSnackbar} />
            </View>
        </View>
    );
}

