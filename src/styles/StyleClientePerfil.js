import { StyleSheet } from 'react-native';

import color from "../theme/colors";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.grayfundo,
        padding: 10
    },
    containercadastro: {
        flex: 1,
        backgroundColor: color.white,
        marginTop: 10,
        borderRadius: 4,
        padding: 10,
    },
    containericon: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    circleicon: {
        width: 100,
        height: 100,
        borderRadius: 100,
        borderWidth: 4,
        borderColor: color.primary,
        padding: 4,
        backgroundColor: color.grayfundo,
    },
    fundoicon: {
        flex: 1,
        backgroundColor: color.secondary,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ctinfo:{
        borderBottomWidth: 1,
        borderBottomColor: color.tertiary,
        paddingBottom: 10,
    },
    iniciais: {
        fontSize: 40,
        color: color.colorfont,
        fontWeight: 'bold',
    },
    rows: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
    },
    txtinfoaccount:{
        fontSize: 14,
        color: color.graynavigation,
        fontWeight: 'bold',
    },
    rowsaction:{
        paddingVertical: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    txtedit:{
        color: color.p,
    }
});