import imports from "./lib.js";

const { sjcl } = imports;

export default {
    generateRandomString (length) {
        const possibleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let result = "";
        for (let i = 0; i < length; i++) {
            result += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
        }
        return result;
    },

    content_encrypt (content, password) {
        return sjcl.encrypt(password, content);
    },

    content_decrypt (content, password) {
        return sjcl.decrypt(password, content);
    }
}