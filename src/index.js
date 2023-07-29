import imgLibro from './assets/libro.png'
import axios from 'axios';

let logoLibro = document.querySelector('#logo-libro');
logoLibro.src = imgLibro;

let searchText  = document.querySelector('#search-text');
let searchButton = document.querySelector('#search-button');
let bodyTitle = document.querySelector('#body-title');
let bodyContent = document.querySelector('#body-content');
let searchInput;
//let bookList = [];

searchText.addEventListener('keypress', (e)=>{
    //La funzione controlla che il tasto premuto sia 'invio', se lo è prende il testo di 'searchText'
    if(e.keyCode === 13){
        searchInput = e.target.value;
        console.log(searchInput);
        getBookList(searchInput);
    }
})
searchButton.addEventListener('click', (e)=>{
    //al click la funzione prende il testo di 'searchText'
    searchInput= searchText.value;
    console.log(searchInput);
    getBookList(searchInput);
})

class Book{
    static allBooks = []
    constructor(title, authors, key, description){
        this.title= title;
        this.authors= authors;
        this.key= key;
        this.description= description
        Book.allBooks.push(this);
    }
    static print(){
        //Book.allBooks.forEach(book => console.log( this.allBooks));
        console.log(this.allBooks);
    }
}

//crea funzione che prende i dati da API per categoria 
 async function getBookList(searchInput){
    try{
        //prendo dati da API
        const response = await axios.get(`https://openlibrary.org/subjects/${searchInput}.json`);
        //creo Oggetto con i libri di quella categoria
        console.log(response.data)
        const booksResponse= response.data.works;
       // console.log(booksResponse);
        createBookObj(booksResponse);
        createListContainer();
    }catch(err){
        console.error('errore nella presa di dati', err);
    }
}
    //funzione che crea un oggetto che contiene titolo e autore del libro e lo inserisce nel array 'bookList'
    function createBookObj(booksResponse){
        booksResponse.forEach(element => {
            let bookAuthor = getAuthorName(element)
            let book = new Book(element.title, bookAuthor , element.key);
        });
        Book.print();
    }
    //funzione prende il nome dell'autore dall'array authors e lo ritorna
    function  getAuthorName(element){
        for(let author of element.authors){
            let name = author.name;
            return name;
        }
    }

//crea funzione che genera div lista e nasconde div descrizione

 //crea unordered list dove inserire i libri come elemnti della lista
 function createListContainer(){
    bodyTitle.textContent = 'Book List';
    let bookListElement = document.createElement('ul');
    bookListElement.setAttribute('id', 'book-list-element');
    bodyContent.appendChild(bookListElement);
    createList(bookListElement);
    bookListElement.addEventListener('click', (e)=>{
        verifyClickedElement(e);

    })
 } 
 //Itera gli elementi di bookList creando gli elementi della lista HTML 
 function createList(bookListElement){
    for(let element of Book.allBooks){
        let containerListElement = createContainer('containerListElement', bookListElement, 'container-list-element')    
        createListElement(containerListElement, element.title);
        createListElement(containerListElement,"", element.authors);
    }
 }
 //crea container della coppia titolo/autore degli elementi della lista 
 function createContainer(nome, parent, classSelector){
    nome = document.createElement('div');
    nome.classList.add(`${classSelector}`);
    parent.appendChild(nome);
    return nome;
 }
//crea elementi della lista, in base ai parametri forniti crea l'elemento titolo oppure autore
 function createListElement(containerListElement, bookTitle, bookAuthor){
    let listElement= document.createElement('li');
    containerListElement.appendChild(listElement);
    listElement.classList.add('list-element');
    if (bookTitle){
        listElement.textContent = `${bookTitle}`;
        listElement.classList.add('book-title');
    }else{
        listElement.textContent = `${bookAuthor}`;
    }
 }

 function verifyClickedElement(e){
    console.log(e);
    if(e.target.className.includes('book-title')){
        let bookTitle= e.target.innerText;
        let bookKey = getBookKey(bookTitle);
        getBookDescription(bookKey);
    }
 }
//crea funzione che al click su un libro della lista prende la descrizione dall'API 

function getBookKey(bookTitle){
    for(let element of Book.allBooks){
        if(bookTitle == element.title){
            return element.key;
        }
    }
}

async function getBookDescription(bookKey){
    try{
        const response = await axios.get(`https://openlibrary.org${bookKey}.json`);
        const descriptionResponse = response.data.description;
        console.log(descriptionResponse);
    }catch(err){
        console.error('errore nella presa di dati', err);
    }
}

//crea funzione che genera div descrizione e nasconde div lista 


//prendere input barra ricerca con input.target.value -> tipo onenter/onclick prendi tot

//prendere libro categoria cercata -> `link api ${input.target.value}`; 

