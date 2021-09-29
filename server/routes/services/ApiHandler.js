const axios = require('../../node_modules/axios')

class APIHandler {
    constructor(){
        this.instance = axios.create({
            baseURL: `$process.env`,
            withCredentials: true
        })
    }
}
export default APIHandler;