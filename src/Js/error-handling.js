import { addTailwindClass } from "./domManipulation";
import { removeTailwindClass } from "./domManipulation";

let errorContainer = document.querySelector('#error-container');
let errorMessage = document.querySelector('#error-message');
let errorClearer = document.querySelector('#clear-error-button');

//creazione oggetto Error per categoria non presente
export class SubjectNotFound extends Error{
    constructor(message){
        super(message);
        this.name = 'SubjectNotFound';
        this.status = 404;
    }
}

//funzione contralla che input non sia vuoto. Se lo è manda a schemro un messaggio di avviso 
export function SearchInputEmpty(searchInput){
    if(searchInput == ''){
        errorMessage.textContent = 'You must write a subject in the search bar';
        showError();
        clearError();
    }
}

//gestione errore di Network che manda a schermo un messaggio di avviso
export function networkError(err){
    if(err.code === 'ERR_NETWORK'){
        errorMessage.textContent =  `${err.message}, caused by: typo or end space`;   
    }
    showError();
    clearError();
}

//gestione errore status404 che manda a schermo un messaggio di avviso
export function status404(err){
    if(err.status === 404){
        errorMessage.textContent = `${err.message}, probably caused by: typo`;
    }
    showError();
    clearError();
}

//funzione per rimuovere il messaggio di avviso cliccando su un pulsante
function clearError(){
    errorClearer.addEventListener('click', ()=>{
        errorContainer.classList.replace('flex', 'hidden');
    })
}

function showError(){
    errorContainer.classList.replace('hidden', 'flex');
}