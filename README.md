# Library 

## Javascript Advanced Project by Giacomo Giovannetti

### A Library online where you can find your next book searching by subject and read their description 

## :bookmark_tabs: Index
* [About the project](#floppy_disk-about-the-project)
* [How it works](#mag-how-it-works)
* [Languages](#keyboard-languages)
* [Libraries](#books-libraries)
* [Bundler](#package-bundler)
* [External Services](#outbox_tray-external-services)
* [Try it](#computer-try-it)
* [Contact Me](#email-contact-me)

## 	:floppy_disk: About the project

This is a project realized for [Start2Impact's](https://www.start2impact.it/) -Javascript Advanced- module of the Full Stack Web Developer course. For this project i had to build: 
* A web app to search for books by subject by fetching them from an API with the value of the search bar
* The web app in the first place after the search has to display a list of all the books, if the user clicks on one of them the description has to be displayed
* To do that i had to implement API requests functions for the books and their data and function to display/hide the different elements

### My Idea: 

In my mind the project had to be realized in three stages: 
* The Homepage: Where the user lands once he opens the Web app, and find a list with a few guidelines on how it works
* The Book List screen: A list of cards that appears after the research and each card contains the main informations about a book. 
* The Description screen: it appears after the user clicked on a book, contains the description of the book.

## :mag: How it works

As you land on the page there are 3 elements displayed: 
* Header : contains the Title of the web app and an icon which on click redirects to the homepage
* Search bar: Here the user con specify the subject to research, the research can be sterted by clicking on the search button or by pressing the "enter" key
* How-to-use list: A list of instructions on the usage of the web app.  
![Screenshot of the Library homepage](/src/assets/Homepage.jpg)

Once the user searched fo a subject the book list is displayed. The content title changes and the cards for each book are generated. Each card contains cover, title and first author of the book. 
I made the decision to put only the first author in order to not overcrowd the cards.
The title in the card is clickable, and allows the user to display the description of the book.

![Screenshot of the Book list](/src/assets/Book-list.jpg)

After the title in the book list is clicked the description of the book is displayed. The content title changes and becomes the book title, below it there is a subtitle with all the authors of the book. Then we can find the description of the book and on its left the book cover.
Below the description i decided to implement a button to allow the user to go back to the book list by clicking it. 

![Screenshot of the book description](/src/assets/book-description.jpg)

## :keyboard: Languages
* HTML5
* Tailwind CSS
* Javascript
## :books: Libraries
* [axios](https://axios-http.com/)
## :package: Bundler
* [Webpack](https://webpack.js.org/) 
## :outbox_tray: External Services
* [Open Library API](https://openlibrary.org/developers/api)
## :computer: Try it!
That's my project, try it here: [Library](https://js-advanced-giacomo-giovannetti.netlify.app/)
## :email: Contact Me

My Linkedin Profile: [Linkedin](https://www.linkedin.com/in/giacomogiovannetti/)

My email if you have any questions: giovannettii.giacomo@gmail.com