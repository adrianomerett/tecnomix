import { View, Text, TouchableOpacity, Image } from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import styleflat from '../styles/StyleFlat';

import api from '../api/api';

export default ElementFlatList = ({
    item,
    navigation,
    favoritos,
    setFavoritos,
    setLoadingFavoritos,
    setSnackbarVisible,
    setSnackbarMessage,
    setProdutos,
    updateProducts
}) => {
    let exibirpreco = item.exibirpreco == 'S' ? true : false;
    var estoque = item.estoque > 0 ? true : false;
    let vdiff = item.valorvenda - item.valoroferta;
    let percent = vdiff / item.valoroferta * 100;
    let valorpercent = percent.toFixed(2)
    let valoroferta = Number(item.valoroferta).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    let valorvenda = Number(item.valorvenda).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    let txtestoque = item.estoque > 1 ? `Estoque disponível ${item.estoque} unidades.` : 'Apenas 1 unidade disponível.';
    let isFavorite = (favoritos || []).some((subArray) => subArray.includes(item.produtoid)) ? true : false;

    const changeFavorite = async (id, situacao) => {
        setLoadingFavoritos(true);
        var statusloged = await AsyncStorage.getItem("statuslogin");
        if (statusloged === "false" || statusloged === null) {
            navigation.navigate("clientes", { screen: "clienteslogin" });
            setLoadingFavoritos(false);
            return false;
        }
        var clientid = await AsyncStorage.getItem("clienteid");
        var email = await AsyncStorage.getItem("email");
        var senha = await AsyncStorage.getItem("senha");
        var dados = {
            clienteid: clientid,
            produtoid: id,
            status: situacao,
            updateproduct: updateProducts,
            email: email,
            senha: senha
        }
        var req = await api.post('/favoritos/change', { dados: dados });
        const { status, msg, newfavoritos } = req.data;
        if (!status) {
            setLoadingFavoritos(false);
            setSnackbarVisible(true);
            setSnackbarMessage(`${msg}.`);
            return false;
        }
        if (situacao) {
            var favoritoatual = favoritos;
            var novoFavoritos = favoritoatual.filter(iten => iten != id);
            setFavoritos(novoFavoritos);
        } else {
            var favoritoatual = favoritos;
            var novoFavoritos = [...favoritoatual, [id]];
            setFavoritos(novoFavoritos);
        }
        if (updateProducts) {
            setProdutos(newfavoritos);
        }
        setLoadingFavoritos(false);
        setSnackbarVisible(true);
        setSnackbarMessage(`${msg}.`);
    }

    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={
                () => navigation.navigate("produtos",
                    {
                        screen: "detalhesprodutos",
                        params: {
                            categoriaid: item.categoriaid,
                            subcategoriaid: item.subcategoriaid,
                            namecategoria: item.namecategoria,
                            namesubcategoria: item.namesubcategoria,
                            productid: item.produtoid
                        }
                    }
                )}
        >
            <View style={styleflat.container}>
                <View style={styleflat.containerImage}>
                    <Image source={{ uri: `${cst.BASE_URL}/loja/painel/public/upload/produtos/thamb/${item.img}` }}
                        style={styleflat.imageproduct}
                    />
                </View>
                <View style={styleflat.cttitleproduct}>
                    <Text style={styleflat.txttitleproduct}>{item.nome}</Text>
                </View>
                {exibirpreco ? (
                    <View>
                        <View style={styleflat.ctpriceproduct}>
                            <Text style={styleflat.priceproduct}>De: {valorvenda}</Text>
                        </View>
                        <View style={styleflat.ctpricesale}>
                            <Text style={styleflat.pricesale}>Por: {valoroferta}</Text>
                        </View>
                    </View>
                ) : (null)}
                {estoque ? (
                    <View style={styleflat.estoque}>
                        <Text style={styleflat.txtestoque}>{txtestoque}</Text>
                    </View>
                ) : (
                    <View style={styleflat.estoque}>
                        <Text style={styleflat.txtestoquenegativo}>Produto indisponível.</Text>
                    </View>

                )}
            </View>
            <View style={styleflat.ctpercent}>
                <Text style={styleflat.txtpercent}>-{valorpercent}%</Text>
            </View>
            {!estoque ? (<View style={styleflat.noestoque}></View>) : null}

            {isFavorite ? (
                <TouchableOpacity style={styleflat.ctfavorito} onPress={() => changeFavorite(item.produtoid, isFavorite)}>
                    <Icon name="cards-heart" size={24} color={colors.primary} />
                    <Text style={[styleflat.txtfavorito, { color: colors.primary }]}>Remover</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity style={styleflat.ctfavorito} onPress={() => changeFavorite(item.produtoid, isFavorite)}>
                    <Icon name="heart-outline" size={24} color={colors.tertiary} />
                    <Text style={[styleflat.txtfavorito, { color: colors.tertiary }]}>Adicionar</Text>
                </TouchableOpacity>
            )}
        </TouchableOpacity>
    )
}