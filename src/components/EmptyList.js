import React from 'react';
import { View, Text } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import style from '../styles/StyleFlat';

const EmptyList = ({ message }) => {
    return (
        <View style={style.containerempty}>
            <Text style={style.txtempty}><FontAwesome name="frown-o" size={40} /></Text>
            <Text style={style.txtempty}>{message}</Text>
        </View>
    );
}

export default EmptyList;