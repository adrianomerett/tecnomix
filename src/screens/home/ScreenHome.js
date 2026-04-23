import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  ActivityIndicator
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Carousel from "react-native-reanimated-carousel";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from "@react-native-async-storage/async-storage";


import api from "../../api/api";
import cst from "../../../constants"
import { generateCode } from "../../helpers/validacoes";

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));


const { width } = Dimensions.get("window");

import StyleHome from "../../styles/StyleHome"
import colors from "../../theme/colors";
import { screen } from "electron";

const ScreenHome = () => {
  const [news, setNews] = useState([]);
  const [recents, setRecents] = useState([]);
  const [desconto, setDesconto] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [yourlike, setYourLike] = useState([]);
  const [config, setConfig] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const slideWidth = width - 32;
  const widthDesconto = (width - 32) / 2;

  // Buscar os produtos para página home 
  const getProducts = async () => {
    try {
      setLoading(true);
      const req = await api.get("/produtos/recentes");
      setLoading(false);
      var { status, news, desconto, config, categorias, yourlike } = req.data;
      setDesconto(desconto)
      setNews(news);
      setConfig(config);
      setCategorias(categorias);
      setYourLike(yourlike);
    } catch (error) {
      setLoading(false);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const loadingCarrousel = () => {
    return (
      <View style={StyleHome.loadingcarrousel}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    )
  }

  const getRecents = async () => {
    try {
      const getrecents = await AsyncStorage.getItem("recentes");
      if (getrecents !== null && getrecents !== undefined) {
        let recentes = JSON.parse(getrecents);
        setRecents(recentes);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getRecents();
    }, [])
  );

  return (
    <View style={StyleHome.container}>
      <ScrollView style={{ flex: 1, width: '100%' }}>
        <LinearGradient style={StyleHome.ctcarrosel}
          colors={[colors.primary,
          colors.secondary, colors.tertiary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={StyleHome.cttitlerecentes}>
            <Icon name="newspaper" size={24} color={colors.colorfont} />
            <Text style={StyleHome.titlerecentes}>Produtos recém-chegados</Text>
          </View>
          <View style={StyleHome.ctitensnew}>
            {loading ? loadingCarrousel() : (
              <Carousel
                width={slideWidth}
                height={300}
                data={news}
                loop
                autoPlay
                autoPlayInterval={4000}
                scrollAnimationDuration={800}
                onProgressChange={(_, absoluteProgress) => {
                  setIndex(Math.round(absoluteProgress));
                }}
                onSnapToItem={(i) => setIndex(i)}
                renderItem={({ item }) => (
                  <View style={StyleHome.card}>
                    <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate("produtos", {
                      screen: "detalhesprodutos",
                      params: {
                        categoriaid: item.categoriaid,
                        subcategoriaid: item.subcategoriaid,
                        namecategoria: item.namecategoria,
                        namesubcategoria: item.namesubcategoria,
                        productid: item.produtoid
                      }
                    })}>
                      <View style={StyleHome.ctimgcard}>
                        <Image
                          source={{ uri: `${cst.BASE_URL}/loja/painel/public/upload/produtos/extra/${item.img}` }}
                          style={StyleHome.image}
                          resizeMode="contain"
                        />
                      </View>
                      <Text style={StyleHome.txttitlenews} ellipsizeMode="tail" numberOfLines={2}>{item.nome}</Text>
                      <View style={StyleHome.ctpricenews}>
                        <Text style={StyleHome.txtpricenew}>De: {Number(item.valorvenda).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
                        <Text style={StyleHome.txtsalenews}>Por: {Number(item.valoroferta).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
              />
            )}
          </View>
          <View style={StyleHome.dotsContainer}>
            {news.map((_, i) => (
              <View
                key={generateCode()}
                style={[
                  StyleHome.dot,
                  index === i && StyleHome.dotActive,
                ]}
              />
            ))}
          </View>
        </LinearGradient>
        {/* Icones de categorias */}
        <View style={StyleHome.cticonscategorias}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity onPress={() => navigation.navigate("produtos", {
              screen: "departamentos"
            })}>
              <View style={StyleHome.boxicons}>
                <View style={StyleHome.iconcate}>
                  <Icon name="menu" size={22} color={colors.primary} />
                </View>
                <Text style={StyleHome.txttitleicons}>Departamentos</Text>
              </View>
            </TouchableOpacity>
            {categorias.map((iten, index, array) => {
              return (
                <TouchableOpacity key={`categorias-${iten.categoriaid}`} onPress={() => navigation.navigate("produtos",
                  {
                    screen: "categorias",
                    params: {
                      idcate: iten.categoriaid,
                      namecate: iten.namecategoria

                    }
                  })}>
                  <View style={StyleHome.boxicons}>
                    <View style={StyleHome.iconcate}>
                      <Icon name={iten.iconcategoria} size={22} color={colors.primary} />
                    </View>
                    <Text style={StyleHome.txttitleicons}>{iten.namecategoria}</Text>
                  </View>
                </TouchableOpacity>
              )
            })}
          </ScrollView>
        </View>
        {/* Produtos Visitados recentes */}
        {recents.length > 0 && (
          <View style={StyleHome.ctrecentes}>
            <View style={StyleHome.fundorecentes}>
              <View style={StyleHome.cttitlerecents}>
                <Text style={StyleHome.visitadosrecents}>Vistos recentemente</Text>
              </View>
              <ScrollView style={StyleHome.ctitensrecents} horizontal showsHorizontalScrollIndicator={false}>
                {recents.map((iten, index, array) => {
                  return (
                    <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate("produtos", {
                      screen: "detalhesprodutos",
                      params: {
                        categoriaid: iten.categoriaid,
                        subcategoriaid: iten.subcategoriaid,
                        namecategoria: iten.namecategoria,
                        namesubcategoria: iten.namesubcategoria,
                        productid: iten.productid
                      }
                    })} key={`recents-${iten.productid}`}>
                      <View style={StyleHome.boxrecentes}>
                        <LinearGradient style={StyleHome.cttitleboxrecents}
                          colors={[colors.grayfundo, colors.gray]}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 1 }}
                        >
                          <Text style={StyleHome.titleboxrecents} ellipsizeMode="tail" numberOfLines={2}>{iten.name}</Text>
                        </LinearGradient>
                        <View style={StyleHome.ctimgvisitados}>
                          <Image source={{ uri: `${cst.BASE_URL}/loja/painel/public/upload/produtos/thamb/${iten.img}` }} style={StyleHome.imagevisitados} resizeMode="contain" />
                        </View>
                        <LinearGradient style={StyleHome.ctpricevisited}
                          colors={[colors.grayfundo, colors.gray]}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 1 }}
                        >
                          <Text style={StyleHome.txtpricevisited}>{Number(iten.valoroferta).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
                        </LinearGradient>
                      </View>
                    </TouchableOpacity>
                  )
                })}
              </ScrollView>
            </View>
          </View>
        )}
        {/* Produtos com desconto acima de 10% */}
        <View style={StyleHome.ctprodutosdesconto}>
          <View style={StyleHome.cttitledesconto}>
            <Text style={StyleHome.txttitledesconto}>Produtos com desconto acima de 10%</Text>
          </View>
          <View style={StyleHome.ctitensdesconto}>
            <View style={StyleHome.rowsdescoto}>
              {desconto.map((iten, index, array) => {
                let exibirpreco = iten.exibirpreco == "S" && config.exibir_preco == "S" ? true : false;
                let exibirestoque = config.exibir_estoque == "S" ? true : false;
                let vdiff = iten.valorvenda - iten.valoroferta;
                let percent = vdiff / iten.valoroferta * 100;
                let valorpercent = percent.toFixed(1)
                let plural = iten.estoque > 1 ? 's' : '';
                return (
                  <View style={[StyleHome.boxdesconto, { width: widthDesconto }]} key={`desconto-${iten.produtoid}`}>
                    <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate("produtos", {
                      screen: "detalhesprodutos",
                      params: {
                        categoriaid: iten.categoriaid,
                        subcategoriaid: iten.subcategoriaid,
                        namecategoria: iten.namecategoria,
                        namesubcategoria: iten.namesubcategoria,
                        productid: iten.produtoid
                      }
                    })}>
                      <View>
                        <Text style={StyleHome.txtitendesconto} ellipsizeMode="tail" numberOfLines={2}>{iten.nome}</Text>
                      </View>
                      <View style={StyleHome.ctimgdesconto}>
                        <Image source={{ uri: `${cst.BASE_URL}/loja/painel/public/upload/produtos/extra/${iten.img}` }} style={StyleHome.imgdesconto} resizeMode="contain" />
                      </View>
                      <View style={StyleHome.ctpercentdesconto}>
                        <Text style={StyleHome.txtpercentdescount}>-{valorpercent}%</Text>
                      </View>
                      <View style={StyleHome.ctpricesdescont}>
                        {exibirpreco && (
                          <>
                            <Text style={StyleHome.txtpricedescont}>{Number(iten.valorvenda).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
                            <Text style={StyleHome.txtpriceofertadescont}>Por: {Number(iten.valoroferta).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
                          </>
                        )}
                        {exibirestoque && (
                          <>
                            <Text style={StyleHome.txtestoquedesconto}>Estoque disponível: {iten.estoque} unidade{plural}</Text>
                          </>
                        )}
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          </View>
        </View>
        {/* Tudo a ver com você */}
        <View style={StyleHome.cttudoaver}>
          <View style={StyleHome.cttitletudoaver}>
            <Text style={StyleHome.txttitledesconto}>Tem tudo a ver com você</Text>
          </View>
          <View style={StyleHome.ctitenstudoaver}>
            {yourlike.map((iten, index, array) => {
              let exibirpreco = iten.exibirpreco == "S" && config.exibir_preco == "S" ? true : false;
              let exibirestoque = config.exibir_estoque == "S" ? true : false;
              let vdiff = iten.valorvenda - iten.valoroferta;
              let percent = vdiff / iten.valoroferta * 100;
              let valorpercent = percent.toFixed(1)
              let plural = iten.estoque > 1 ? 's' : '';
              return (
                <TouchableOpacity style={StyleHome.rowstudoaver} activeOpacity={1} key={`yourlike-${iten.produtoid}`} onPress={() => navigation.navigate("produtos", {
                  screen: "detalhesprodutos",
                  params: {
                    categoriaid: iten.categoriaid,
                    subcategoriaid: iten.subcategoriaid,
                    namecategoria: iten.namecategoria,
                    namesubcategoria: iten.namesubcategoria,
                    productid: iten.produtoid
                  }
                })}>
                  <View style={StyleHome.ctimgtudoaver}>
                    <Image source={{ uri: `${cst.BASE_URL}/loja/painel/public/upload/produtos/extra/${iten.img}` }} style={StyleHome.imagetudoaver} resizeMode="contain" />
                  </View>
                  <View style={StyleHome.ctinfotudoaver}>
                    <Text style={StyleHome.txtproducttudoaver}>{iten.nome}</Text>
                    {exibirpreco && (
                      <>
                        <Text style={StyleHome.txtpricetudoaver}>De: {Number(iten.valorvenda).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
                        <Text style={StyleHome.txtofertatudoaver}>Por: {Number(iten.valoroferta).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
                      </>
                    )}
                    {exibirestoque && (
                      <>
                        <Text style={StyleHome.txtestoquetudoaver}>Estoque disponível: {iten.estoque} unidade{plural}</Text>
                      </>
                    )}
                  </View>
                  <View style={StyleHome.ctpercentdescontotudoaver}>
                    <Text style={StyleHome.txtpercentdescount}>-{valorpercent}%</Text>
                  </View>
                </TouchableOpacity>
              )
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ScreenHome;