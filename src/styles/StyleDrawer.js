import { StyleSheet } from "react-native";
import colors from "../theme/colors";

export default StyleDrawer = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.grayfundo,
        padding: 0,
    },
    containermenu: {
        flex: 1
    },
    cttitle: {
        paddingVertical: 8,
        paddingHorizontal: 4,
        flexDirection: "row",
        alignItems: "center",
    },
    txttitle: {
        color: colors.primary,
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: 4,
    },
    menu: {
        flex: 1,
        width: "100%",
        paddingHorizontal: 8,
        paddingTop: 4,
        backgroundColor: colors.white,
        borderRadius: 4,
    },
    titlerows: {
        paddingVertical: 4,
    },
    txttitlerows: {
        color: colors.secondary,
        fontSize: 16,
        fontWeight: "bold",
    },
    ctrowsmenu: {
        flexDirection: "column",
        paddingLeft: 10,
    },
    rowsmenu: {
        flexDirection: "row",
        alignItems: "flex-end",
        width: "100%",
        paddingTop: 4,
        paddingBottom: 8,
    },
    txtrowsmenu: {
        color: colors.tertiary,
        fontSize: 13,
        fontWeight: "bold",
        marginLeft: 4,
    },
    separatormenu: {
        width: "100%",
        height: 1,
        backgroundColor: "rgba(0,0,0,0.2)",
        marginVertical: 8,
    }
});