import React, { useState, useCallback, useEffect } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';

import style from '../../styles/StyleDepartamentos';
import cst from '../../../constants';

const ScreenDepartamentos = () => {
    const navigation = useNavigation();
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);

    async function getDepartamentos() {
        try {
            const req = await axios.get(`${cst.URL_API}/categorias/getcategorias`);
            let dados = Object.values(req.data.dados);
            setCategorias(dados || []);
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
                    categorias.map((iten, indexCate, arrayCate) => {
                        return (
                            <React.Fragment key={iten.id.categoriaid}>
                                <View style={style.rowcat}>
                                    <TouchableOpacity
                                        style={style.tochablecate}
                                        onPress={() => navigation.navigate('categorias',
                                            { idcate: iten.id.categoriaid, namecate: iten.id.namecategoria })
                                        }>
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