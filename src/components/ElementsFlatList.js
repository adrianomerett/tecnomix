import { View, Text, TouchableOpacity, Image } from 'react-native';

import styleflat from '../styles/StyleFlat';

export default ElementFlatList = ({ item, navigation }) => {
    let exibirpreco = item.exibirpreco == 'S' ? true : false;
    var estoque = item.estoque > 0 ? true : false;
    let vdiff = item.valorvenda - item.valoroferta;
    let percent = vdiff / item.valoroferta * 100;
    let valorpercent = percent.toFixed(2)
    let valoroferta = Number(item.valoroferta).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    let valorvenda = Number(item.valorvenda).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    let txtestoque = item.estoque > 1 ? `Estoque disponível ${item.estoque} unidades.` : 'Apenas 1 unidade disponível.';
    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={
                () => navigation.push('detalhesprodutos', {
                    categoriaid: item.categoriaid,
                    subcategoriaid: item.subcategoriaid,
                    namecategoria: item.namecategoria,
                    namesubcategoria: item.namesubcategoria,
                    productid: item.produtoid,
                })}
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

        </TouchableOpacity>
    )
}