
export function createElement(name, tag, parent, classSelector){
    name = document.createElement(tag);
    parent.appendChild(name);
    for (let element of classSelector){
        name.classList.add(`${element}`);
    }
    return name;
} 

export function addTailwindClass(name, classSelectors){
    for (let element of classSelectors){
        name.classList.add(`${element}`);
    }
}

export function removeTailwindClass(name, classSelectors){
    for (let element of classSelectors){
        name.classList.remove(`${element}`);
    }
}

export function resetPageContent(titleName, howToUseList, bookList, subtitleName, bookDescription){
    titleName.textContent = 'How to use: ';
    howToUseList.classList.remove('hidden');
    if(!bookList.classList.contains('hidden')){
        bookList.classList.add('hidden');
    }
    bookDescription.classList.add('hidden');
    subtitleName.textContent= "";
}