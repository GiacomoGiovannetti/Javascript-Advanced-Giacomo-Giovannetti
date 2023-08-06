import axios from 'axios';
import { hideDescription } from './domManipulation.js';
import { createList, createDescription } from './index.js';
import { networkError, SubjectNotFound, status404 } from './error-handling.js';

//crea funzione che prende i dati da API per categoria

export async function getBookList(searchInput){
    try{
        const response = await axios.get(`https://openlibrary.org/subjects/${searchInput}.json`);
        console.log(response.data);
        const booksResponse = response.data.works;
        if(response.data.work_count == 0){
            throw new SubjectNotFound('Subject not found');
        }else{
        createList(booksResponse);
        hideDescription();
        }
    }catch(err){
        console.error('errore nella presa di dati', err);
        networkError(err);
        status404(err);
    }
}

// //crea funzione che prende la descrizione dall'API 

 export async function getBookDescription(bookKey , bookId){
    try{
        const response = await axios.get(`https://openlibrary.org${bookKey}.json`);
        console.log(response.data);
        const titleResponse = response.data.title;
        const authorResponse = await getAuthorName(response.data.authors[0].author.key);
        const descriptionResponse = response.data.description;
        const coverResponse = await getCover(bookId);
        createDescription(titleResponse, authorResponse, descriptionResponse, coverResponse);
    }catch(err){
        console.error('errore nella presa di dati', err);
    }
}


//crea funzione che prende il nome dell'autore dall'API
async function getAuthorName(authorKey){
    try{
        const response = await axios.get( `https://openlibrary.org${authorKey}.json`);
        let authorName =  response.data.name;
        return authorName;
    }catch(err){
        console.error('errore nella presa di dati', err);
    }
}

async function getCover(bookId){
    const olid = `OLID:${bookId}`;
    try{
        const response = await axios.get(`https://openlibrary.org/api/books?bibkeys=OLID:${bookId}&format=json&jscmd=data`)
        console.log(response)
        const coverURL = response.data[olid].cover.medium;
        return coverURL;
    }catch(err){
        console.error('errore nella presa di dati', err);
    }
}
