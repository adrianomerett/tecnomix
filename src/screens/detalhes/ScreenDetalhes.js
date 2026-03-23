import React, { useState, useCallback } from "react";
import { View, Text, TouchableOpacity, FlatList, useWindowDimensions, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RenderHtml from "react-native-render-html";
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import api from "../../api/api";
import colors from "../../theme/colors";

import style from '../../styles/StyleDetalhesProdutos';
import stylebreadcrumb from '../../styles/StyleBreadcrumb';

import GaleriaZoom from "../../components/CarrousselDetalhes";
import StyleDetalhesProdutos from "../../styles/StyleDetalhesProdutos";
import ElementFlatList from "../../components/ElementsFlatList";
import SeparatorFlatList from "../../components/SeparatorFlatList";

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export default ScreenDetalhes = ({ route }) => {
    const navigation = useNavigation();
    const { productid, categoriaid, subcategoriaid, namecategoria, namesubcategoria } = route.params;
    const [produto, setProduto] = useState([]);
    const [images, setImages] = useState([]);
    const [related, setRelated] = useState([]);
    const [loading, setLoading] = useState(true);

    const { width } = useWindowDimensions();
    const widthdetalhes = width - 40;

    async function getDetalhes() {
        try {
            setLoading(true);
            const req = await api.get(`/produtos/detalhes/`, { params: { productid: productid, categoriaid: categoriaid } });
            var { status, dados, images, rel } = req.data;
            setLoading(false);
            setImages(images);
            setProduto(dados);
            setRelated(rel);

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
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

    const elementHeaderDetalhes = () => {
        return (
            <>
                <View style={StyleDetalhesProdutos.cttitle}>
                    <Text style={StyleDetalhesProdutos.titleproduct}>{produto.nome}</Text>
                </View>
                <GaleriaZoom images={images} percent={valorpercent} />
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
                        renderItem={({ item }) => (<ElementFlatList item={item} navigation={navigation} />)}
                        keyExtractor={(item) => item.produtoid.toString()}
                        ItemSeparatorComponent={SeparatorFlatList}
                    />
                )}
            </View>
        </View>
    );
}

