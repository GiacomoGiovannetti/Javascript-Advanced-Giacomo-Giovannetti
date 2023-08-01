import imgLibro from '../assets/libro.png'
import {getBookList} from './apiRequest';
import { getBookDescription } from './apiRequest';
import { createElement } from './domManipulation';
import { SearchInputEmpty } from './error-handling';
import '../css/style.css';

let logoLibro = document.querySelector('#logo-libro');
logoLibro.src = imgLibro;

let searchText  = document.querySelector('#search-text');
let searchButton = document.querySelector('#search-button');
let bodyTitle = document.querySelector('#body-title');
let bookListElement = document.querySelector('#book-list');
let bodySubtitle = document.querySelector('#body-subtitle');
let bookDescription = document.querySelector('#book-description');
let searchInput;

searchText.addEventListener('keypress', (e)=>{
    //La funzione controlla che il tasto premuto sia 'invio', se lo è prende il testo di 'searchText'
    if(e.keyCode === 13){
        searchInput = e.target.value;
        SearchInputEmpty(searchInput);
        getBookList(searchInput);
    }
})

searchButton.addEventListener('click', (e)=>{
    //al click la funzione prende il testo di 'searchText'
    searchInput= searchText.value;
    emptySearchBar(searchInput);
    getBookList(searchInput);
})

//creo class per i libri presi dall'api
export class Book{
    static allBooks = []
    constructor(title, authors, key, description){
        this.title= title;
        this.authors= authors;
        this.key= key;
        this.description= description
        Book.allBooks.push(this);
    }
    static print(){
        console.log(this.allBooks);
    }
}

//funzione che crea un oggetto che contiene titolo, autore e chiave del libro e lo inserisce nel array 'bookList'
    export function createBookObj(booksResponse){
        booksResponse.forEach(element => {
            let book = new Book(element.title, element.authors[0].name , element.key);
        });
    }
//crea funzione che genera div lista e nasconde div hot to use

 //crea unordered list dove inserire i libri come elemnti della lista
 export function createList(){
    bodyTitle.textContent = 'Book List';
    addListElements(bookListElement);
    bookListElement.addEventListener('click', (e)=>{
        verifyClickedElement(e);
    })
 } 
 //Itera gli elementi di bookList creando gli elementi della lista HTML 
 function addListElements(bookListElement){
    for(let element of Book.allBooks){
        //crea container della coppia titolo/autore degli elementi della lista 
        const containerListElement = createElement('containerListElement','div', bookListElement, 'container-list-element');   
        createListElement(containerListElement, element.title);
        createListElement(containerListElement, '', element.authors);
    }
 }
//crea elementi della lista, in base ai parametri forniti crea l'elemento titolo oppure autore
 function createListElement(parent, bookTitle, bookAuthor){
    const listElement = createElement('listElement', 'li', parent, 'list-element');
    if (bookTitle){
        listElement.textContent = `${bookTitle}`;
        listElement.classList.add('book-title');
    }else{
        listElement.textContent = `${bookAuthor}`;
    }
 }

 //funzione controlla che il titolo cliccato corrisponda al titolo del oggetto per prendere la chiave 
 //dell'oggeto per fare richiesta all'api
 function verifyClickedElement(e){
    if(e.target.className.includes('book-title')){
        let bookTitle= e.target.innerText;
        let bookKey = getBookKey(bookTitle);
        getBookDescription(bookKey);
        //getRatings(bookKey);
    }
 }

//prende la chiave dall'oggetto libro 
function getBookKey(bookTitle){
    for(let element of Book.allBooks){
        if(bookTitle == element.title){
            return element.key;
        }
    }
}

//crea funzione che genera div descrizione e nasconde div lista 
export function createDescription(bookKey, description){
    for(let element of Book.allBooks){
        if(bookKey === element.key){
            bodyTitle.textContent = `${element.title}`;
            bodySubtitle.textContent= `${element.authors}`;
        }
    }
    bookDescription.textContent= `${description}`;
}