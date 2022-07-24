import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

const db = admin.firestore();
const fcm = admin.messaging();


interface ClothsArray extends admin.firestore.DocumentData {
  PriceValue?: number;
  Title?: string;
  favorites?: Array<any>;

}

interface UsersArray extends admin.firestore.DocumentData {
  token?: string;

}


export const notifyNewMessage = functions.firestore
    .document("Rooms/{roomId}")
    .onUpdate(async (snapshot, context) => {
      // const message = snapshot.after.data();

      const event = context.params.roomId;

      const dataU = (await db
          .collection("Rooms")
          .doc(event)
          .get()).data() as ClothsArray;

      const {PriceValue, Title, favorites} = dataU;

      favorites?.forEach(async (element) => {
        console.log("favorite: "+element);
        const dataUser = (await db
            .collection("Users")
            .doc(element)
            .get()).data() as UsersArray;

        const {token} = dataUser;
        const tk = token || "";

        const payload: admin.messaging.MessagingPayload = {
          notification: {
            title: Title,
            body: "O preço do quarto foi alterado para: " + PriceValue + "$",
            clickAction: "FLUTTER_NOTIFICATION_CLICK",
          },
        };
        fcm.sendToDevice(
            tk, payload);
      });
    });
