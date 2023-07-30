let errorContainer = document.querySelector('#error-container');
let errorText = document.querySelector('#error-text');
let errorClearer = document.querySelector('#clear-error-button');

export class SubjectNotFound extends Error{
    constructor(message){
        super(message);
        this.name = 'SubjectNotFound';
        this.status = 404;
    }
}

export function SearchInputEmpty(searchInput){
    if(searchInput == ''){
        errorText.textContent = 'You must write a subject in the search bar';
        //show error clear button 
        clearError();
    }
}

export function networkError(err){
    if(err.code === 'ERR_NETWORK'){
        errorText.textContent =  `${err.message}, caused by: typo or end space`;   
    }
    //show error clear button 
    clearError();
}

export function status404(err){
    if(err.status === 404){
        errorText.textContent = `${err.message}, caused by: typo`; //grassetto 
        //show error clear button
    }
}

export function clearError(){
    errorClearer.addEventListener('click', ()=>{
        errorText.textContent = '';
        //hide error clear button;
    })
}
