import { https } from "./api";

export default class {
    
    getAddress = (cep) => {
        return https.get(`${cep}/json/`)
    }
}