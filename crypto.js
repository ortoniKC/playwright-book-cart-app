const CryptoJS = require("crypto-js")
// Encrypt the message using the AES encryption algorithm
var encrypted = CryptoJS.AES.encrypt("Pass1234$", "Pass!23$");
console.log(encrypted.toString());
// Decrypt the encrypted message using the same key
// var decrypted = CryptoJS.AES.decrypt(encrypted, "Pass!23$");

// // Convert the decrypted message from a CryptoJS object to a regular string
// var plaintext = decrypted.toString(CryptoJS.enc.Utf8);

// // Output the original and decrypted messages to the console
// console.log("Original message: " + "Hello, world!");
// console.log("Decrypted message: " + plaintext);
