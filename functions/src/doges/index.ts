import * as functions from 'firebase-functions';
import db from '../db/index';

export const addTestDog = functions.https.onRequest((request, response) => {
    db.ref('dog/3').set({nome:'jake',idade:10})
    .then(() =>{
        response.status(200).send("Dog adicionado com sucesso");
    })
    .catch(error => {
        response.status(500).send('Deu o erro ${error}');
    })
});

export const getTestDog = functions.https.onRequest((requets, response) => {
    db.ref('dog').once('value')
    .then(snapshot => {
        const dog = snapshot.val();
        return dog;
    })
    .then(dog =>{
        response.status(200).send(dog);
    })
    .catch(error => {
        response.status(500).send("Deu o erro ${error}")
    }) 
})
