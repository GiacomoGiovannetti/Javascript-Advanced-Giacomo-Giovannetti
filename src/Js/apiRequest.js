import axios from 'axios';
import { createBookObj } from './index.js';
import { createList } from './index.js';
import { createDescription } from './index.js';
import { networkError } from './error-handling.js';
import { SubjectNotFound } from './error-handling.js';
import { status404 } from './error-handling.js';

//crea funzione che prende i dati da API per categoria
export async function getBookList(searchInput){
    try{
        //prendo dati da API
        const response = await axios.get(`https://openlibrary.org/subjects/${searchInput}.json`);
        //creo Oggetto con i libri di quella categoria
        if(response.data.work_count == 0){
            throw new SubjectNotFound('Subject not found');
        }else{
            const books= response.data.works;
            createBookObj(books);
            createList();
        }
    }catch(err){
        console.error('errore nella presa di dati', err);
        networkError(err);
        status404(err);
    }
}

//crea funzione che prende la descrizione dall'API 

export async function getBookDescription(bookKey){
    try{
        const response = await axios.get(`https://openlibrary.org${bookKey}.json`);
        const descriptionResponse = response.data.description;
        createDescription(bookKey, descriptionResponse);
    }catch(err){
        console.error('errore nella presa di dati', err);
    }
}

