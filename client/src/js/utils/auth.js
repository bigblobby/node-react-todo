import queryString from "query-string";
import { verifyAndGetUser } from "../api";

const Auth = {
    storage: queryString.parse(document.cookie),

    updateStorage(){
        this.storage = queryString.parse(document.cookie);
    },

    getToken(){
        if(this.checkTokenExists()){
            return this.storage.token;
        }
    },

    checkTokenExists() {
        return 'token' in this.storage;
    },

    verifyTokenAndGetUser() {
        return new Promise((resolve, reject) => {
            verifyAndGetUser({ token: this.getToken() })
                .then(result => {
                    console.log(result);
                    resolve(result);
                }).catch(err => {
                    console.log(err);
                    reject(err);
                });
        });
    },

    clearToken() {
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        window.location = '/';
    }
};

export default Auth;
