let bodySubtitle = document.querySelector('#body-subtitle');
let bookDescription = document.querySelector('#book-description');
let goBackButton = document.querySelector('#go-back-button');
let cover = document.querySelector('#cover');

//funzione generazione elementi HTML 
export function createElement(name, tag, parent, classSelector){
    name = document.createElement(tag);
    parent.appendChild(name);
    for (let element of classSelector){
        name.classList.add(`${element}`);
    }
    return name;
} 

//funzione per la manipolazione del dom durante la creazione dell'elemento bookList
export function listDomManipulation(bodyTitle, howToUseList ,bookListElement){
    bodyTitle.textContent = 'Book List';
    addTailwindClass(howToUseList, ['hidden']);
    removeTailwindClass(bookListElement, ['hidden']);
    bookListElement.innerHTML='';
}

//funzione per l'inserimento del contenuto nel elemento descrizione
export function addDescriptionContent(titleElement, title, author, description, coverImg){
    titleElement.textContent = `${title}`;
    bodySubtitle.textContent= `${author}`;
    if(typeof description === 'object'){
        bookDescription.textContent= `${description.value}`;
    }else if(typeof description === 'undefined'){
        bookDescription.textContent= `There isn't a description available for this book`;
    }else{
        bookDescription.textContent= `${description}`;
    }
    if(coverImg === undefined){
        cover.src=`${coverImg}`;
        addTailwindClass(cover, ['hidden']);
    }else{
        removeTailwindClass(cover, ['hidden']);
        cover.src=`${coverImg}`;
    }
}

//funzione per nascondere tutti gli elementi relativi alla descrizione
export function hideDescription(){
    bodySubtitle.textContent = '';
    addTailwindClass(bookDescription, ['hidden']);
    addTailwindClass(goBackButton , ['hidden']);
    addTailwindClass(cover, ['hidden']);
    bookDescription.textContent = ''; 
}


//funzione per aggiungere piu classi tailwind contemporaneamente
export function addTailwindClass(name, classSelectors){
    for (let element of classSelectors){
        name.classList.add(`${element}`);
    }
}

//funzione per aggiungere piu classi tailwind contemporaneamente
export function removeTailwindClass(name, classSelectors){
    for (let element of classSelectors){
        name.classList.remove(`${element}`);
    }
}

//funzione per impostare il design della pagina a quello iniziale 
export function resetPageContent(titleName, howToUseList, bookList, searchText){
    titleName.textContent = 'How to use: ';
    howToUseList.classList.remove('hidden');
    bookList.innerHTML = '';
    searchText.value = '';
   hideDescription();
}