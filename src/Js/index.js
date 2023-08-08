import {getBookList, getBookDescription} from './apiRequest';
import { createElement, listDomManipulation ,addThumbnailContent , addDescriptionContent 
        ,addTailwindClass, removeTailwindClass, resetPageContent, hideDescription} from './domManipulation';
import { SearchInputEmpty } from './error-handling';
import '../css/style.css';

let searchText  = document.querySelector('#search-text');
let searchButton = document.querySelector('#search-button');
let bodyTitle = document.querySelector('#body-title');
let bookListElement = document.querySelector('#book-list');
let bodySubtitle = document.querySelector('#body-subtitle');
let bookDescription = document.querySelector('#book-description');
let howToUseList = document.querySelector('#how-to-use-list');
let resetPage = document.querySelector('#reset-page');
let goBackButton = document.querySelector('#go-back-button');
let searchInput;



searchText.addEventListener('keypress', (e)=>{
    //La funzione controlla che il tasto premuto sia 'invio', se lo è prende il testo di 'searchText'
    if(e.keyCode === 13){
        searchInput = e.target.value.toLowerCase();
        console.log(searchInput);
        SearchInputEmpty(searchInput);
        getBookList(searchInput);
    }
})

searchButton.addEventListener('click', (e)=>{
    //al click la funzione prende il testo di 'searchText'
    searchInput= searchText.value.toLowerCase();
    SearchInputEmpty(searchInput);
    getBookList(searchInput);
})

 //crea funzione che genera div lista e nasconde div hot to use

 //crea unordered list dove inserire i libri come elemnti della lista
 export function createList(booksResponse){
    listDomManipulation(bodyTitle, howToUseList ,bookListElement);
    addListElements(booksResponse, bookListElement);
    bookListElement.addEventListener('click', (e)=>{
        if(e.target.classList.contains('book-title')){
            let bookKey = e.target.id;
            let coverId = e.target.attributes[2].nodeValue;
            getBookDescription(bookKey, coverId);
        }else{
            e.preventDefault();
        }
    })
 } 

 //Itera gli elementi di bookList creando gli elementi della lista HTML 
 function addListElements(booksResponse, bookListElement){
    for(let element of booksResponse){
        const coverId = element.cover_id ? `${element.cover_id}` : undefined; 

        //crea container della coppia titolo/autore degli elementi della lista 
        const card = createElement('card','div', bookListElement, ['card', 'card-styles']);
        const thumbnailContainer = createElement('thumbnailContainer', 'div', card, ['tumbnail-container', 'flex', 'items-center', 'justify-center'])
        const thumbnail = createElement('thumbnail', 'img', thumbnailContainer, ['book-thumbnail']);
        addThumbnailContent(coverId, card, thumbnail, thumbnailContainer);
        createListElement(card, element.title, '', element.key, coverId);
        createListElement(card, '', element.authors[0].name);
    }
 }
//crea elementi della lista, in base ai parametri forniti crea l'elemento titolo oppure autore
 function createListElement(parent, bookTitle, bookAuthor, bookKey, coverId){
    const listElement = createElement('listElement', 'li', parent, 'list-element');
    if (bookTitle){
        listElement.textContent = `${bookTitle}`;
        addTailwindClass(listElement, ['book-title']);
        listElement.setAttribute('id', `${bookKey}`);
        listElement.setAttribute('data-cover-id', `${coverId}`);
    }else{
        listElement.textContent = `${bookAuthor}`;
        addTailwindClass(listElement, ['flex', 'items-center', 'justify-center', 'col-span-2']);
    }
 }

 //funzione genera elemento con descrizione del libro, inserisce il contenuto e rende visibile un pulsante per tornare alla lista 
export function createDescription(title, author, description, coverImg){
    addTailwindClass(bookListElement, ['hidden']);
    removeTailwindClass(bookDescription, ['hidden']);
    goBackButton.classList.replace('hidden', 'inline-flex');
    addDescriptionContent(bodyTitle, title, author, description, coverImg);
}
//funzione per reset della pagina
resetPage.addEventListener('click', ()=> {
    resetPageContent(bodyTitle, howToUseList, bookListElement, searchText);
})

//funzione pulsante per otrnare indietro 
goBackButton.addEventListener('click', ()=>{
    bodyTitle.textContent = 'Book List';
    hideDescription();
    addTailwindClass(goBackButton, ['hidden']);
    removeTailwindClass(bookListElement, ['hidden']);
})