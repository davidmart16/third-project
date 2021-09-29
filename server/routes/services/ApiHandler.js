const axios = require('../../node_modules/axios')

class APIHandler {
    constructor(){
        this.instance = axios.create({
            baseURL: `$process.env`,        //pillardel codigo de trio la api de googlebooks
            withCredentials: true
        })
    }
}
export default APIHandler;