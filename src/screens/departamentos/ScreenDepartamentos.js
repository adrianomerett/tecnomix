import React, { useState, useCallback, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import style from '../../styles/StyleDepartamentos';
import colors from '../../theme/colors';

const ScreenDepartamentos = () => {
    const navigation = useNavigation();
    const [categorias, setCategorias] = useState({});
    const [loading, setLoading] = useState(true);

    async function getDepartamentos() {
        try {
            const getcate = await AsyncStorage.getItem("categorias");
            let dados = JSON.parse(getcate);
            setCategorias(dados || {});
            setLoading(false);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setLoading(true);
        getDepartamentos();
    }, []);

    return (
        <View style={style.container}>
            <View style={style.cttitle}>
                <Text style={style.txttitle}>Departamento de produtos</Text>
            </View>

            <ScrollView style={style.containercate}>
                {loading ? (
                    <ActivityIndicator size="large" color="#000" style={{ marginTop: 20 }} />
                ) : (
                    Object.values(categorias).map((iten, indexCate, arrayCate) => {
                        return (
                            <React.Fragment key={iten.id.categoriaid}>
                                <View style={style.rowcat}>
                                    <TouchableOpacity
                                        style={style.tochablecate}
                                        onPress={() => navigation.navigate('categorias',
                                            { idcate: iten.id.categoriaid, namecate: iten.id.namecategoria })
                                        }>
                                        <Icon name={iten.id.iconcategoria} size={20} color={colors.primary} />
                                        <Text style={style.txtcat}>{iten.id.namecategoria}</Text>
                                    </TouchableOpacity>
                                </View>
                                {
                                    iten.id.subcategorias.map((sub, index, arraySub) => {
                                        var isLastSub = index === arraySub.length - 1;
                                        return (
                                            <View style={style.rowsubcate} key={sub.subcategoriaid}>
                                                <TouchableOpacity
                                                    style={[style.tochablesubcate, isLastSub && { borderBottomWidth: 0 }]}
                                                    onPress={() => navigation.navigate('subcategorias', {
                                                        idcate: iten.id.categoriaid,
                                                        namecate: iten.id.namecategoria,
                                                        idsubcate: sub.subcategoriaid,
                                                        namesubcate: sub.namesubcategoria
                                                    })}
                                                >
                                                    <Text style={style.txtsubcate}>» {sub.namesubcategoria}</Text>
                                                </TouchableOpacity>
                                            </View>
                                        );
                                    })
                                }

                            </React.Fragment>
                        );
                    })
                )}
            </ScrollView>
        </View>
    );
};

export default ScreenDepartamentos;