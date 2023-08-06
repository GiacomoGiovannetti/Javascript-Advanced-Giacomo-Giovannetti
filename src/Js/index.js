import {getBookList, getBookDescription} from './apiRequest';
import { createElement, listDomManipulation , addDescriptionContent 
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
        searchInput = e.target.value;
        console.log(searchInput);
        SearchInputEmpty(searchInput);
        getBookList(searchInput);
    }
})

searchButton.addEventListener('click', (e)=>{
    //al click la funzione prende il testo di 'searchText'
    searchInput= searchText.value;
    SearchInputEmpty(searchInput);
    getBookList(searchInput);
})

 //crea funzione che genera div lista e nasconde div hot to use

 //crea unordered list dove inserire i libri come elemnti della lista
 export function createList(booksResponse){
    listDomManipulation(bodyTitle, howToUseList ,bookListElement);
    addListElements(booksResponse, bookListElement);
    bookListElement.addEventListener('click', (e)=>{
        let bookKey = e.target.id;
        let bookId = e.target.attributes[2].nodeValue;
        getBookDescription(bookKey, bookId);

    })
 } 

 //Itera gli elementi di bookList creando gli elementi della lista HTML 
 function addListElements(booksResponse, bookListElement){
    for(let element of booksResponse){
        //crea container della coppia titolo/autore degli elementi della lista 
        const containerListElement = createElement('containerListElement','div', bookListElement, ['container-list-element', 'card']);   
        createListElement(containerListElement, element.title, '', element.key, element.availability.openlibrary_edition);
        createListElement(containerListElement, '', element.authors[0].name);
    }
 }
//crea elementi della lista, in base ai parametri forniti crea l'elemento titolo oppure autore
 function createListElement(parent, bookTitle, bookAuthor, bookKey, bookId){
    const listElement = createElement('listElement', 'li', parent, 'list-element');
    if (bookTitle){
        listElement.textContent = `${bookTitle}`;
        addTailwindClass(listElement, ['book-title']);
        listElement.setAttribute('id', `${bookKey}`);
        listElement.setAttribute('book-id', `${bookId}`);
    }else{
        listElement.textContent = `${bookAuthor}`;
        addTailwindClass(listElement, ['flex', 'items-center', 'justify-center']);
    }
 }

 //funzione genera elemento con descrizione del libro, inserisce il contenuto e rende visibile un pulsante per tornare alla lista 
export function createDescription(title, author, description, coverURL){
    addTailwindClass(bookListElement, ['hidden']);
    removeTailwindClass(bookDescription, ['hidden']);
    goBackButton.classList.replace('hidden', 'inline-flex');
    //addTailwindClass(bodySubtitle, ['font-medium', 'text-2xl', 'md:text'])
    //addTailwindClass(bookDescription, ['p-5', 'text-left'])
    addDescriptionContent(bodyTitle, title, author, description, coverURL);
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