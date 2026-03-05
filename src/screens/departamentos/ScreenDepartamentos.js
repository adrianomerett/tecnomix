import React, { useState, useEffect, useCallback, use } from 'react';
import { useFocusEffect} from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

import style from '../../styeles/styleDepartamentos';
import cst from '../../../constants';

const ScreenDepartamentos = () => {

    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);

    async function getDepartamentos() {
        try {
            const req = await axios.get(`${cst.BASE_URL}/categorias/getcategorias`);
            let dados = Object.values(req.data.dados);
            setCategorias(dados || []);
            setLoading(false);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useFocusEffect(
        useCallback(() => {
            setLoading(true);
            getDepartamentos();
        }, [])
    );

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
                        return(
                        <React.Fragment key={iten.id.categoriaid}>
                            <View style={style.rowcat}>
                                <TouchableOpacity style={style.tochablecate}>
                                    <Text style={style.txtcat}>{iten.id.namecategoria}</Text>
                                </TouchableOpacity>
                            </View>
                            {
                                iten.id.subcategorias.map((sub, index, arraySub) => {
                                var isLastSub = index === arraySub.length - 1;
                                return(
                                    <View style={style.rowsubcate} key={sub.subcategoriaid}>
                                        <TouchableOpacity style={[style.tochablesubcate, isLastSub && {borderBottomWidth: 0}]}>
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


// {loading ? (
//                     <ActivityIndicator size="large" color="#000" style={{ marginTop: 20 }} />
//                 ) : (
//                     categorias.map((iten) => (
//                         // Usamos o Fragment (<> </>) para agrupar a Categoria e suas Subcategorias
//                         <React.Fragment key={iten.id.categoriaid}>
                            
//                             {/* Categoria Principal */}
//                             <View style={style.rowcat}>
//                                 <TouchableOpacity style={style.tochablecate}>
//                                     <Text style={style.txtcat}>{iten.id.namecategoria}</Text>
//                                 </TouchableOpacity>
//                             </View>

//                             {/* Subcategorias */}
//                             {iten.id.subcategorias.map((sub) => (
//                                 <View style={style.rowsubcate} key={sub.subcategoriaid}>
//                                     <TouchableOpacity style={style.tochablesubcate}>
//                                         <Text style={style.txtsubcate}>» {sub.namesubcategoria}</Text>
//                                     </TouchableOpacity>
//                                 </View>
//                             ))}

//                         </React.Fragment>
//                     ))
//                 )}