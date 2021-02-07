import { serviceAccount } from './KeyServiceAccount';
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as corsModule from 'cors';


const cors = corsModule({ origin: true })
// const auth = admin.auth();
// const firestore = admin.firestore();
const https = functions.https;

// // https://firebase.google.com/docs/functions/typescript
//https://us-central1-uowcos.cloudfunctions.net/user

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://uowcos.firebaseio.com"
});


exports.getUsers = https.onRequest((request, response) => {
    cors(request, response, async () => {

        if (request.method === 'GET') {
            await admin.auth().listUsers().then(function (listUsersResult) {
                listUsersResult.users.forEach(function (userRecord) {
                    response.json(userRecord)
                    // response.send('user'+JSON.stringify( userRecord.toJSON()));
                });

            })
                .catch(function (error) {
                    response.send('Error listing users:' + error);
                });
        }

    });
})

exports.addAdmin = https.onRequest((request, response) => {
    cors(request, response, async () => {
        if (request.method === 'POST') {
            const data = request.body;
            const infoCurrentUser = {
                email: data.email,
                displayName: data.displayName,
                password: data.password,
                photoURL: "https://img.icons8.com/bubbles/100/000000/business-man-with-beard.png"
            };
            const infoUser = {
                email: data.email,
                displayName: data.displayName,
                role: data.role,
                lastStatUs: null
            };
            try {
                admin.auth().createUser(infoCurrentUser).then(async (userRecord: any) => {
                    await admin.firestore().collection('users').doc(userRecord.email).set(infoUser);
                    response.status(200).send('200');
                }).catch((error) => response.send(error));
            } catch (err) {
                response.json(err);
            }

        }
    });

});

exports.addTeacher = https.onRequest((request, response) => {
    cors(request, response, async () => {
        if (request.method === 'POST') {
            const data = request.body;
            const infoCurrentUser = {
                email: data.email,
                displayName: data.displayName,
                password: data.password,
                photoURL: "https://img.icons8.com/bubbles/100/000000/business-man-with-beard.png"
            };
            const infoUser = {
                email: data.email,
                displayName: data.displayName,
                description: "Add Description",
                careerTitle: data.careerTitle,
                facebook: "Https://Facebook.com/",
                Teachstage: data.Teachstage,
                role: data.role,
                photoURL: "https://img.icons8.com/bubbles/100/000000/business-man-with-beard.png",
                lastStatUs: null
            };
            try {
                admin.auth().createUser(infoCurrentUser).then(async (userRecord: any) => {
                    await admin.firestore().collection('users').doc(userRecord.email).set(infoUser);
                    response.status(200).send('200');
                }).catch((error) => response.send(error));
            } catch (err) {
                response.json(err);
            }

        }
    });

});

exports.addStudent = https.onRequest((request, response) => {
    cors(request, response, async () => {
        if (request.method === 'POST') {
            const data = request.body;
            const infoCurrentUser = {
                email: data.email,
                displayName: data.displayName,
                password: data.password,
                photoURL: "https://img.icons8.com/bubbles/100/000000/business-man-with-beard.png"
            };
            const infoUser = {
                email: data.email,
                displayName: data.displayName,
                stage: data.stage,
                role: data.role,
                lastStatUs: null
            };
            try {
                admin.auth().createUser(infoCurrentUser).then(async (userRecord: any) => {
                    await admin.firestore().collection('users').doc(userRecord.email).set(infoUser);
                    response.status(200).send('200');
                }).catch((error) => response.send(error));
            } catch (err) {
                response.json(err);
            }

        }
    });

});





