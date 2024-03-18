import cors from "cors";
import express from "express";
import { initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";
import fs from "fs";
import { addRedemptions, deleteRedemptions, getRedemptions } from "./firebase/redemptions";

const firebaseConfig = {
       apiKey: "AIzaSyDRRj1rStFvzz0uiCaUHR4Y197Yd1Nmh1M",
       authDomain: "redemption-ffe45.firebaseapp.com",
       projectId: "redemption-ffe45",
       storageBucket: "redemption-ffe45.appspot.com",
       messagingSenderId: "133307233902",
       appId: "1:133307233902:web:d8c56bc5b115a8f025187f",
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);
export const db: Firestore = getFirestore(firebase);
const app = express();
app.use(express.json());
app.use(cors());
const port = 3000;

app.get("/staff-list", (req, res) => {
       const csv = fs.readFileSync("src/mappingFiles/staff-id-to-team-mapping-long.csv");
       const array = csv.toString().split("\r");

       const staffList = [];
       for (let i = 1; i < array.length - 1; i++) {
              const splitData = array[i].split(",");
              splitData[0] = splitData[0].substring(1);
              const staffInfo = {
                     staff_pass_id: splitData[0],
                     team_name: splitData[1],
                     created_at: splitData[2],
              };
              staffList.push(staffInfo);
       }
       res.status(200).header("Access-Control-Allow-Origin", "*").send(staffList);
});

app.get("/redemption", async (req, res) => {
       const redemptions = await getRedemptions();
       res.status(200).header("Access-Control-Allow-Origin", "*").send(redemptions);
});

app.post("/redemption", async (req, res) => {
       try {
              const response = await addRedemptions(req.body);
              res.status(200).header("Access-Control-Allow-Origin", "*").send(response);
       } catch (e) {
              res.status(403).header("Access-Control-Allow-Origin", "*").send("Team already redeemed.");
       }
});

app.delete("/redemption", async (req, res) => {
       try {
              const staff_pass_id = req.query.staff_pass_id;
              const response = await deleteRedemptions(staff_pass_id.toString());
              res.status(200).header("Access-Control-Allow-Origin", "*").send(response);
       } catch (e) {
              console.log(e);
       }
});

app.listen(port, () => {
       return console.log(`Express is listening at http://localhost:${port}`);
});
