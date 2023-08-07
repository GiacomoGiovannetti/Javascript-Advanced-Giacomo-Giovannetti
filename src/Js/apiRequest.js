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

 export async function getBookDescription(bookKey){
    try{
        const response = await axios.get(`https://openlibrary.org${bookKey}.json`);
        console.log(response.data);
        const titleResponse = response.data.title;
        const authorResponse = await getAuthorName(response.data.authors);
        const descriptionResponse = response.data.description;
        createDescription(titleResponse, authorResponse, descriptionResponse);
    }catch(err){
        console.error('errore nella presa di dati a descr', err);
    }
}


//crea funzione che prende il nome dell'autore dall'API
async function getAuthorName(authors){
    let authorsName = []
    try{
        for(let element of authors){
            const response = await axios.get( `https://openlibrary.org${element.author.key}.json`);
            let authorName =  `${response.data.name} `;
            authorsName.push(authorName);
        }
        console.log(authorsName);
        return authorsName;
    }catch(err){
        console.error('errore nella presa di dati ad autore', err);
    }
}