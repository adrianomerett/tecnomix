import { StyleSheet } from 'react-native';
import colors from '../theme/colors';

export default StyleDetalhesProdutos = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.grayfundo,
        padding: 10,
    },
    containerdetalhes: {
        flex: 1,
        backgroundColor: colors.white,
        borderRadius: 4,
        padding: 6,
        marginTop: 10
    },
    cttitle: {
        width: '100%',
        alignItems: 'flex-start',
        paddingVertical: 10,
    },
    titleproduct: {
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.colortitleproduct,
        textAlign: 'justify'
    },
    containerprice: {
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    ctprice: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    txtprice: {
        paddingTop: 6,
        fontSize: 13,
        fontWeight: 'bold',
        textDecorationLine: 'line-through',
        color: colors.colorprice,
    },
    ctpricesale: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    txtforsile: {
        fontSize: 13,
        color: colors.graynavigation,
        fontWeight: 'bold',
    },
    pricesale: {
        fontSize: 20,
        fontWeight: '900',
        color: colors.colorsale,
    },
    ctestoque: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    txtestoque: {
        fontSize: 13,
        color: colors.graynavigation,
        fontWeight: 'bold'
    },
    txtestoquenegativo: {
        fontSize: 13,
        color: colors.colorprice,
        fontWeight: 'bold'
    },
    ctfavorito: {
        position: 'absolute',
        top: 0,
        right: 0,
        paddingRight: 10,
        paddingTop: 5,
        paddingLeft: 10,
        paddingBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        justifyContent: 'center',
        zIndex: 100
    },
    ctbuttom: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnshop: {
        width: '100%',
        backgroundColor: colors.secondary,
        borderRadius: 4,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 4,
    },
    txtbtnshop: {
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.colorfont,
    },
    ctinfo: {
        width: '100%',
        flexDirection: 'row',
        marginTop: 10,
        backgroundColor: colors.grayfundo,
    },
    titleinfos: {
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.colortitleproduct,
        paddingTop: 6,
        paddingBottom: 6,
        paddingHorizontal: 4
    }
});