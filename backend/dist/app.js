"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); // Import the functions you need from the SDKs you need
const app_1 = require("firebase/app");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDRRj1rStFvzz0uiCaUHR4Y197Yd1Nmh1M",
    authDomain: "redemption-ffe45.firebaseapp.com",
    projectId: "redemption-ffe45",
    storageBucket: "redemption-ffe45.appspot.com",
    messagingSenderId: "133307233902",
    appId: "1:133307233902:web:d8c56bc5b115a8f025187f",
};
// Initialize Firebase
const firebase = (0, app_1.initializeApp)(firebaseConfig);
const app = (0, express_1.default)();
const port = 3000;
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map