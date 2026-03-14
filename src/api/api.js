import axios from "axios";
import cst from "../../constants";
export default axios.create({
    baseURL: cst.URL_API,
    headers: {
        "Content-Type": "application/json"
    }
});