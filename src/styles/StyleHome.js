import { StyleSheet } from 'react-native';
import colors from '../theme/colors';

const StyleHome = StyleSheet.create({
    container: {
        flex: 1,
        padding: 0,
        backgroundColor: colors.grayfundo,
    },
    ctcarrosel: {
        flex: 1,
        padding: 8,
        width: '100%',
        height: 374,
        backgroundColor: colors.primary,
        borderRadius: 0,
    },
    cttitlerecentes: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    titlerecentes: {
        marginLeft: 4,
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.colorfont,
    },
    ctitensnew: {
        flex: 1,
        marginTop: 8,
        width: '100%',
        backgroundColor: colors.white,
        borderRadius: 4,
        padding: 4
    },
    loadingcarrousel: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10,
    },
    // Carousel

    card: {
        borderRadius: 16,
        height: 300,
        marginLeft: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: "100%",
        height: 200,
        borderRadius: 12,
        marginBottom: 10,
    },
    dotsContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10,
    },
    ctpricenews: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        marginTop: 4,
    },
    txttitlenews: {
        fontSize: 13,
        fontWeight: 'bold',
        color: colors.colortitleproduct,
    },
    txtpricenew: {
        fontSize: 13,
        color: colors.colorprice,
        textDecorationLine: 'line-through',
        fontWeight: 'bold',
    },
    txtsalenews: {
        fontSize: 18,
        fontWeight: '900',
        color: colors.colorsale,
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 4,
        backgroundColor: "rgb(255, 255, 255, 0.3)",
        marginHorizontal: 4
    },
    dotActive: {
        backgroundColor: "#fff",
        width: 6,
        height: 6,
        borderRadius: 4,
        marginHorizontal: 4
    },
    // Icones categorias
    cticonscategorias: {
        flex: 1,
        width: '100%',
        backgroundColor: colors.white,
        borderRadius: 4,
        marginTop: 4,
        padding: 4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    boxicons: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 8,
        marginHorizontal: 2,
        paddingTop: 4,
        paddingBottom: 4,
        borderRadius: 4,
        backgroundColor: colors.grayfundo,
    },
    iconcate: {
        borderWidth: 2,
        borderColor: colors.primary,
        padding: 8,
        borderRadius: 50,
        backgroundColor: colors.white,
    },
    txttitleicons: {
        fontSize: 9,
        fontWeight: 'bold',
    },
    // Recentes 
    ctrecentes: {
        flex: 1,
        width: '100%',
        padding: 0,
        marginTop: 4,
    },
    fundorecentes: {
        flex: 1,
        padding: 2,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
    },
    cttitlerecents: {
        padding: 4,
    },
    visitadosrecents: {
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.colortitleproduct,
    },
    ctitensrecents: {
        flex: 1,
        width: '100%',
        backgroundColor: colors.white,
        padding: 4,
        borderRadius: 4,
    },
    boxrecentes: {
        width: 150,
        height: 156,
        marginTop: 4,
        marginHorizontal: 2,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: colors.grayborder,
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    cttitleboxrecents: {
        padding: 4,
        backgroundColor: colors.grayfundo,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
    },
    titleboxrecents: {
        fontSize: 11,
        fontWeight: '600',
        color: colors.colortitleproduct,
    },
    ctimgvisitados: {
        width: '100%',
        height: 80,
        marginTop: 4,
        marginBottom: 4,
        borderColor: colors.grayborder
    },
    imagevisitados: {
        width: '100%',
        height: 80,
    },
    ctpricevisited: {
        width: '100%',
        padding: 4,
        backgroundColor: colors.grayfundo,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    txtpricevisited: {
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.colorsale,
    },
    // Produtos com desconto acima de 12%
    ctprodutosdesconto: {
        flex: 1,
        backgroundColor: colors.grayfundo,
        paddingTop: 4,
        paddingLeft: 4,
        paddingRight: 4,
    },
    cttitledesconto: {
        paddingTop: 4,
        paddingBottom: 8
    },
    txttitledesconto: {
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.colortitleproduct
    },
    ctitensdesconto: {
        flex: 1
    },
    rowsdescoto: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 8
    },
    boxdesconto: {
        backgroundColor: colors.white,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: colors.grayborder,
        marginHorizontal: 4,
        marginBottom: 8,
        padding: 4,
    },
    txtitendesconto: {
        fontSize: 12,
        fontWeight: 'bold',
        color: colors.colortitleproduct,
    },
    ctimgdesconto: {
        width: '100%',
        height: 200,
        padding: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imgdesconto: {
        width: '100%',
        height: 192,
    },
    ctpercentdesconto: {
        position: 'absolute',
        top: 38,
        left: 0,
        marginLeft: -4,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        paddingHorizontal: 4,
        paddingVertical: 2,
        borderTopEndRadius: 2,
        borderBottomEndRadius: 2,
    },
    txtpercentdescount: {
        fontSize: 12,
        fontWeight: 'bold',
        color: colors.white,
    },
    ctpricesdescont: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    txtpricedescont: {
        fontSize: 12,
        fontWeight: 'bold',
        color: colors.colorprice,
        textDecorationLine: 'line-through',
    },
    txtpriceofertadescont: {
        fontSize: 16,
        fontWeight: '900',
        color: colors.colorsale
    },
    txtestoquedesconto: {
        fontSize: 12,
        fontWeight: 'bold',
        color: colors.graynavigation
    },
    // Tudo a ver com você
    cttudoaver: {
        flex: 1,
        width: '100%',
    },
    cttitletudoaver: {
        paddingTop: 0,
        paddingLeft: 4,
        paddingBottom: 10,
    },
    ctitenstudoaver: {
        flex: 1,
        width: '100%',
        paddingLeft: 8,
        paddingRight: 8,
    },
    rowstudoaver: {
        width: '100%',
        backgroundColor: colors.white,
        padding: 4,
        borderRadius: 4,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: colors.grayborder,
        flexDirection: 'row',
    },
    ctimgtudoaver: {
        width: 170,
        height: 170,
        borderRightWidth: 1,
        borderRightColor: colors.grayborder,
        borderStyle: 'dotted',
        padding: 2
    },
    imagetudoaver: {
        width: '100%',
        height: 160,
    },
    ctinfotudoaver: {
        flex: 1,
        padding: 4
    },
    txtproducttudoaver: {
        fontSize: 13,
        fontWeight: 'bold',
        color: colors.colortitleproduct,
    },
    txtpricetudoaver: {
        fontSize: 12,
        fontWeight: 'bold',
        color: colors.colorprice,
        textDecorationLine: 'line-through',
    },
    txtofertatudoaver: {
        fontSize: 16,
        fontWeight: '900',
        color: colors.colorsale
    },
    txtestoquetudoaver: {
        fontSize: 12,
        fontWeight: 'bold',
        color: colors.graynavigation,
        paddingVertical: 4,
    },
    ctpercentdescontotudoaver: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        marginRight: 4,
        marginBottom: 4,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 2,
        zIndex: 10,
    },
    // Rodapé
    ctfooterempresa: {
        flex: 1,
        width: '100%',
        backgroundColor: colors.primary,
        marginBottom: 0,
        paddingHorizontal: 12,
        paddingVertical: 12
    },
    boxfooterempresa:{
    },
    txttitlefooterempresa:{
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.white,
    },
    rowsfooterempresa:{
        flexDirection: 'row',
        paddingLeft: 4,
        paddingVertical: 2,
        alignItems: 'flex-end',
    },
    iconsfooterempresa:{
        marginRight: 4,
    },
    txtrowsfooterempresa:{
        fontSize: 12,
        fontWeight: 'bold',
        color: colors.grayfundo,
    },
    separatorfooterempresa:{
        height: 1,
        backgroundColor: "rgba(64, 64, 64, 0.9)",
        marginTop: 8,
        marginBottom: 8,
    },
    ctversionempresa:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 4,
        paddingVertical: 2
    },
    txtversionempresa:{
        fontSize: 12,
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: colors.grayfundo,
    }
});

export default StyleHome;