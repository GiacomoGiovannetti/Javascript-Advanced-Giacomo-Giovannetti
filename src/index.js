import imgLibro from './assets/libro.png'
import axios from 'axios';

let logoLibro = document.querySelector('#logo-libro');
logoLibro.src = imgLibro;

let searchText  = document.querySelector('#search-text');
let searchButton = document.querySelector('#search-button');
let bodyTitle = document.querySelector('#body-title');
let searchInput;
let bookList = [];

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



//crea funzione che prende i dati da API per categoria 
 async function getBookList(searchInput){
    try{
        //prendo dati da API
        const response = await axios.get(`https://openlibrary.org/subjects/${searchInput}.json`);
        //creo Oggetto con i libri di quella categoria
        const booksResponse= response.data.works;
       // console.log(booksResponse);
        createBookObj(booksResponse);
        createDivList();
    }catch(err){
        console.error('errore nella presa di dati', err);
    }
}
    //funzione che crea un oggetto che contiene titolo e autore del libro e lo inserisce nel array 'bookList'
    function createBookObj(booksResponse){
        booksResponse.forEach(element => {
            let book = new Object();
            book.title = element.title;
            book.authors = getAuthorName(element);
            bookList.push(book);
        });
        //console.log(bookList);
    }
    //funzione prende il nome dell'autore dall'array authors e lo ritorna
    function  getAuthorName(element){
        for(let author of element.authors){
            let name = author.name;
            return name;
        }
    }

//crea funzione che genera div lista e nasconde div descrizione
 function createDivList(){
    bodyTitle.textContent = 'Book List';
 } 

//crea funzione che al click su un libro della lista prende la descrizione dall'API 

//crea funzione che genera div descrizione e nasconde div lista 


//prendere input barra ricerca con input.target.value -> tipo onenter/onclick prendi tot

//prendere libro categoria cercata -> `link api ${input.target.value}`; 

