const CryptoJS = require("crypto-js");

export function encrypt (plainText) {
    return CryptoJS.SHA256(plainText).toString();
}