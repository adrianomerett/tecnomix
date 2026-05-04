import { StyleSheet } from "react-native";
import color from "../theme/colors";
import colors from "../theme/colors";


export default StyleContato = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.grayfundo,
        padding: 10
    },
    containercontato: {
        flex: 1,
        backgroundColor: color.white,
        marginTop: 10,
        borderRadius: 4,
        padding: 10,
    },
    cttitleinfo: {
        width: '100%',
        margimBottom: 10,
    },
    txttitleinfo: {
        fontSize: 14,
        color: color.graynavigation,
        fontWeight: 'bold',
    },
    cardinfo: {
        marginTop: 4,
        width: '100%',
        paddingHorizontal: 4,
        paddingVertical: 8,
        borderRadius: 2,
        backgroundColor: "#cff4fc",
        borderWidth: 1,
        borderColor: "#b6effb",
        marginBottom: 4,
    },
    txtcardinfo: {
        fontSize: 13,
        fontWeight: 'bold',
        color: "#055160"
    },
    input: {
        marginBottom: 10,
    },
    btnsendmsg: {
        flexDirection: 'row',
        backgroundColor: color.primary,
        padding: 10,
        borderRadius: 4,
        marginTop: 10,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    txtbtnsend: {
        fontSize: 14,
        color: color.grayfundo,
        fontWeight: 'bold',
        marginLeft: 10,

    },
    snacksuccess: {
        backgroundColor: colors.success,
    },
    snackerror: {
        backgroundColor: colors.error,
    },
    txtmessage: {
        fontSize: 14,
        color: color.white,
        fontWeight: 500,
    },
    containerloader: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 10,
    }
});