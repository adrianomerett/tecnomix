import React from 'react';
import { View } from 'react-native';

import style from '../styles/StyleFlat';

const SeparatorFlatList = () => {
    return (
        <View style={style.separator}>
            <View style={style.lineseparator}></View>
        </View>
    );
};

export default SeparatorFlatList;