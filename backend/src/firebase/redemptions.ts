import { collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore";
import { Redemption } from "../../../types";
import { db } from "../app";

const REDEMPTIONS = "redemptions";

export async function getRedemptions() {
       const redemptions: Redemption[] = [];
       const querySnapshot = await getDocs(collection(db, REDEMPTIONS));
       querySnapshot.forEach((doc) => {
              redemptions.push({ staff_pass_id: doc.id, team_name: doc.data()["team_name"], redeemed_at: doc.data()["redeemed_at"] });
       });
       return redemptions;
}

export async function addRedemptions(redemption: Redemption) {
       const querySnapshot = await getDocs(collection(db, REDEMPTIONS));
       querySnapshot.forEach((doc) => {
              if (doc.data()["team_name"] === redemption.team_name) {
                     throw Error;
              }
       });
       await setDoc(doc(db, REDEMPTIONS, redemption.staff_pass_id), {
              team_name: redemption.team_name,
              redeemed_at: redemption.redeemed_at,
       });
}

export async function deleteRedemptions(staff_pass_id: string) {
       const response = await deleteDoc(doc(db, REDEMPTIONS, staff_pass_id));
       return response;
}
