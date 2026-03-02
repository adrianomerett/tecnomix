import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

import colors from '../../theme/colors';

const ScreenDepartamentos = () => {

    console.log('ScreenDepartamentos');

    getDepartamentos();
    async function getDepartamentos() {
        try {
            console.log('getDepartamentos');
            const req = await axios.get('http://192.168.100.9/loja/api/categorias/getcategorias');
            const categorias = req.data.dados;
            for (let i in categorias) {
                let teste = categorias[i].id.namecategoria;
                console.log(teste);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.cttitle}>
                <Text style={styles.txttitle}>Departamento de produtos</Text>
            </View>
            <ScrollView style={styles.containercate}>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#DDD9D9',
        padding: 16,
    },
    cttitle: {
        paddingBottom: 16,
    },
    txttitle: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    containercate: {
        flex: 1,
        backgroundColor: colors.white
    }
});

export default ScreenDepartamentos;