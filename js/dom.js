const UNCOMPLETED_BOOK_ID = "incompleteBookshelfList";
const COMPLETED_BOOK_ID = "completeBookshelfList";
const RAK_BUKUID = "bookId";

function createBookshelf(judul, penulis, tahun, isCompleted){
    const bookID = document.createElement("div");
    bookID.setAttribute("id", "bookId");

    const textJudul = document.createElement("h3");
    textJudul.setAttribute("id", "judul");
    textJudul.innerText = judul;

    const textPenulis = document.createElement("p");
    textPenulis.setAttribute("id", "penulis");
    textPenulis.innerText = penulis;

    const textTahun = document.createElement("p");
    textTahun.setAttribute("id", "tahun");
    textTahun.innerText = tahun;

    const textContainer = document.createElement("article");
    textContainer.classList.add("book_item");
    textContainer.append(bookID, textJudul, textPenulis, textTahun);

    if(isCompleted){
        textContainer.append(createUnfinishedButton(), createDeleteButton());
    }
    else{
        textContainer.append(createFinishedButton());
    }
    return textContainer;
}

function createUnfinishedButton(){
    return createButton("red", "Belum selesai dibaca", function(event){
        undoBookFromCompleted(event.target.parentElement);
    });
}

function createDeleteButton(){
    return createButton("red", "Hapus buku", function(event){
        removeBookFromCompleted(event.target.parentElement);
    });
}

function createFinishedButton(){
    return createButton("green", "Selesai dibaca", function(event){
        addBookToCompleted(event.target.parentElement);
    });
}

function createButton(buttonTypeClass, buttonText, eventListener){
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.innerText = buttonText;
    button.addEventListener("click", function(event){
        eventListener(event);
        event.stopPropagation();
    });
    return button;
}

function addBook(){
    const uncompletedBookList = document.getElementById(UNCOMPLETED_BOOK_ID);
    const textJudul = document.getElementById("inputBookTitle").value;
    const textPenulis = document.getElementById("inputBookAuthor").value;
    const textTahun = document.getElementById("inputBookYear").value;

    const buku = createBookshelf(textJudul, textPenulis, textTahun, false);
    const objekBuku = composeBookshelfObject(textJudul, textPenulis, textTahun. false);

    buku[RAK_BUKUID] = objekBuku.id;
    rakBuku.push(objekBuku);

    uncompletedBookList.append(buku);
    updateDataToStorage();
}

function addBookToCompleted(taskElement){
    const judul = taskElement.querySelector("book_item > judul").innerText;
    const penulis = taskElement.getElementById("book_item > penulis").innerText;
    const tahun = taskElement.getElementById("book_item > tahun").innerText;

    const newBook = createBookshelf(judul, penulis, tahun, true);
    const book = findBook(taskElement[RAK_BUKUID]);
    book.isCompleted = true;
    newBook[RAK_BUKUID] = book.id;

    const listCompleted = document.getElementById(COMPLETED_BOOK_ID);

    listCompleted.append(newBook);
    taskElement.remove();

    updateDataToStorage();
}

function removeBookFromCompleted(taskElement){
    const bookPosition = findBookIndex(taskElement[RAK_BUKUID]);
    rakBuku.splice(bookPosition, 1);

    taskElement.remove();
    updateDataToStorage();
}

function undoBookFromCompleted(taskElement){
    const listUncompleted = document.getElementById(UNCOMPLETED_BOOK_ID);
    const judul = taskElement.getElementById("judul");
    const penulis = taskElement.getElementById("penulis");
    const tahun = taskElement.getElementById("tahun");

    const newBook = createBookshelf(judul, penulis, tahun, false);

    const book = findBook(taskElement[RAK_BUKUID]);
    book.isCompleted = false;
    newBook[RAK_BUKUID] = book.id;

    listUncompleted.append(newBook);
    taskElement.remove();

    updateDataToStorage();
}