import * as functions from 'firebase-functions';
import * as cors from 'cors';

const corsHandler = cors({origin: true});


/***
 *  DATABASE CONNECTION 
 */
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
    
const db = admin.database();
const ref = db.ref("/todos");





// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
    corsHandler(request,response, () => {
        response.send("Xello from Firebase!");
    })
});


export const testDB = functions.https.onRequest((req, res) => {


    console.log(req.params);

  
    ref.once("value", (snapshot : any) => {

      console.log(res.get("description"));
      
      res.status(200).json({ value: snapshot });
      
    });

  });
