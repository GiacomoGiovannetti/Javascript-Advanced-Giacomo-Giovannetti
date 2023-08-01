let errorText = document.querySelector('#error-text');
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
        errorText.textContent = 'You must write a subject in the search bar';
        //show error clear button 
        clearError();
    }
}

//gestione errore di Network che manda a schermo un messaggio di avviso
export function networkError(err){
    if(err.code === 'ERR_NETWORK'){
        errorText.textContent =  `${err.message}, caused by: typo or end space`;   
    }
    //show error clear button 
    clearError();
}

//gestione errore status404 che manda a schermo un messaggio di avviso
export function status404(err){
    if(err.status === 404){
        errorText.textContent = `${err.message}, probably caused by: typo`; //grassetto 
        //show error clear button
    }
}

//funzione per rimuovere il messaggio di avviso cliccando su un pulsante
export function clearError(){
    errorClearer.addEventListener('click', ()=>{
        errorText.textContent = '';
        //hide error clear button;
    })
}
