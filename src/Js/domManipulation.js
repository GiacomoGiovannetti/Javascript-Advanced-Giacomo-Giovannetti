

export function createElement(name, tag, parent, classSelector){
    name = document.createElement(tag);
    parent.appendChild(name);
    name.classList.add(`${classSelector}`);
    return name;
} 