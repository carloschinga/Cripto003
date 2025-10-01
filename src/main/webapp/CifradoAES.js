let keySize = 256;
let ivSize = 128;
let  iterations = 100;
let message = "Antes de ayer";
let password = "Secret Password";

function encrypt(msg, pass) {
   
    var salt = CryptoJS.lib.WordArray.random(128 / 8);
    var key = CryptoJS.PBKDF2(pass, salt, {
        keySize: keySize / 32,
        iterations: iterations
    });
    var iv = CryptoJS.lib.WordArray.random(ivSize / 8);

    var encrypted = CryptoJS.AES.encrypt(msg, key, {
        iv: iv,
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC,
        hasher: CryptoJS.algo.SHA256
    });
    var transitmessage = salt.toString() + iv.toString() + encrypted.toString();
    return transitmessage;
}


function decrypt(transitmessage, pass) {
    var salt = CryptoJS.enc.Hex.parse(transitmessage.substr(0, 32));
    var iv = CryptoJS.enc.Hex.parse(transitmessage.substr(32, 32));
    var encrypted = transitmessage.substring(64);

    var key = CryptoJS.PBKDF2(pass, salt, {
        keySize: keySize / 32,
        iterations: iterations
    });
    var decrypted = CryptoJS.AES.decrypt(encrypted, key, {
        iv: iv,
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC,
        hasher: CryptoJS.algo.SHA256
    })
    return decrypted;
}

/*
let encrypted = encrypt(message, password);
let decrypted = decrypt(encrypted, password);
console.log("Cifrar: " + encrypted);
console.log("Decifrar: " + decrypted.toString(CryptoJS.enc.Utf8))*/
