import { StyleSheet } from 'react-native';
import colors from '../theme/colors';
import { red } from 'react-native-reanimated/lib/typescript/Colors';

export default StyleSheet.create({
    container: {
        flexDirection: 'column',
    },
    containerImage: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 5
    },
    imageproduct: {
        width: 100,
        height: 100,
        resizeMode: 'contain'
    },
    cttitleproduct: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    txttitleproduct: {
        fontSize: 15,
        color: colors.colortitleproduct,
        fontWeight: 'bold',
        marginLeft: 10,
        textAlign: 'justify'
    },
    ctpriceproduct:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    priceproduct: {
        fontSize: 13,
        fontWeight: 'bold',
        textDecorationLine: 'line-through',
        color: colors.colorprice,
    },
    colorsale:{
        color: colors.colorsale,
    },
    ctpricesale:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pricesale: {
        fontSize: 18,
        fontWeight: '900',
        color: colors.colorsale,
    },
    estoque: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    txtestoque: {
        fontSize: 13,
        color: colors.colortitleproduct,
        fontWeight: 'bold',
    },
    txtestoquenegativo: {
        fontSize: 13,
        color: colors.colorprice,
        fontWeight: 'bold',
        paddingTop: 5,
        paddingBottom: 5,
    },
    ctpercent: {
        position: 'absolute',
        top: 0,
        left: 0,
        marginTop: 10,
        marginLeft: 10,
        backgroundColor: "rgba(0,0,0,0.5)",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 3,
    },
    txtpercent:{
        fontSize: 13,
        color: colors.white,
        fontWeight: 'bold',
        zIndex: 5,
    },
    ctfavorito: {
        position: 'absolute',
        top: 0,
        right: 0,
        marginTop: 10,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
        justifyContent: 'center',
    },
    txtfavorito: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    separator:{
        height: 20,
        alignContent: 'center',
        justifyContent: 'center',
    },
    lineseparator: {
        width: '100%',
        height: 1,
        borderBottomWidth: 1,
        borderColor: colors.grayborder,
        borderStyle: 'dotted',
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
        paddingBottom: 10,
    },
    txtfooter: {
        fontSize: 13,
        color: colors.colortitleproduct,
        fontWeight: 'bold',
    },
    noestoque: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: colors.grayfundo,
        opacity: 0.7,
        zIndex: 10
    },
    containerempty:{
        flex: 1,
        paddingTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    txtempty:{
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.graynavigation,
    },
    loaderfavorit:{
        flex: 1,
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: "rgba(0,0,0,0.4)",
        zIndex: 10,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ctactiviindicator:{
        width: 40,
        height: 40,
        backgroundColor: colors.white,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    }
});