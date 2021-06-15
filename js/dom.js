const UNCOMPLETED_BOOK_ID = "incompleteBookshelfList";
const COMPLETED_BOOK_ID = "completeBookshelfList";
const RAK_BUKUID = "bookId";

function createBookshelf(judul, penulis, tahun, isCompleted){
    const judulBuku = document.createElement("h3");
    judulBuku.innerText = judul;

    const namaPenulis = document.createElement("p");
    namaPenulis.innerHTML = `Penulis: <span id="penulis"> ${penulis} </span>`;

    const tahunTerbit = document.createElement("p");
    tahunTerbit.innerHTML = `Tahun: <span id="tahun"> ${tahun} </span>`;

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("action");

    const textContainer = document.createElement("article");
    textContainer.classList.add("book_item");
    textContainer.append(judulBuku, namaPenulis, tahunTerbit);

    if(isCompleted){
        textContainer.append(
            createUnfinishedButton(),
            createDeleteButton()
        );
    } else {
        textContainer.append(
            createFinishedButton(),
            createDeleteButton()
        );
    }
    return textContainer;
}

function addBook(){
    const uncompletedBookList = document.getElementById(UNCOMPLETED_BOOK_ID);
    const completedBookList = document.getElementById(COMPLETED_BOOK_ID);
    const textJudul = document.getElementById("inputBookTitle").value;
    const textPenulis = document.getElementById("inputBookAuthor").value;
    const textTahun = document.getElementById("inputBookYear").value;
    const checkBox = document.getElementById("inputBookIsComplete");

    let check = null;

    if(checkBox.checked){
        check = true;
        document.querySelector("span").innerText = "Selesai dibaca";
    }else {
        check = false;
        document.querySelector("span").innerText = "Belum selesai dibaca";
    }

    const buku = createBookshelf(textJudul, textPenulis, textTahun, check);
    const bookObject = composeBookshelfObject(textJudul, textPenulis, textTahun, check);

    buku[RAK_BUKUID] = bookObject.id;
    rakBuku.push(bookObject);

    if(check){
        completedBookList.append(buku);
    }else{
        uncompletedBookList.append(buku);
    }
    updateDataToStorage();
}

function addBookToCompleted(taskElement){
    const listCompleted = document.getElementById(COMPLETED_BOOK_ID);
    const judul = taskElement.querySelector(".book_item > h3").innerText;
    const penulis = taskElement.querySelector("#penulis").innerText;
    const tahun = taskElement.querySelector("#tahun").innerText;

    const newBook = createBookshelf(judul, penulis, tahun, true);

    const buku = findBook(taskElement[RAK_BUKUID]);
    buku.isCompleted = true;
    newBook[RAK_BUKUID] = buku.id;

    listCompleted.append(newBook);
    taskElement.remove();

    updateDataToStorage();
}

function undoBookFromCompleted(taskElement){
    const listUncompleted = document.getElementById(UNCOMPLETED_BOOK_ID);
    const judul = taskElement.querySelector(".book_item > h3").innerText;
    const penulis = taskElement.querySelector("#penulis").innerText;
    const tahun = taskElement.querySelector("#tahun").innerText;

    const newBook = createBookshelf(judul, penulis, tahun, false);

    const book = findBook(taskElement[RAK_BUKUID]);
    book.isCompleted = false;
    newBook[RAK_BUKUID] = book.id;

    listUncompleted.append(newBook);
    taskElement.remove();

    updateDataToStorage();
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

function removeBookFromCompleted(taskElement){
    const bookPosition = findBookIndex(taskElement[RAK_BUKUID]);
    rakBuku.splice(bookPosition, 1);

    taskElement.remove();
    updateDataToStorage();
}

function refreshDataFromBookshelf(){
    const listUncompleted = document.getElementById(UNCOMPLETED_BOOK_ID);
    let listCompleted = document.getElementById(COMPLETED_BOOK_ID);

    for(buku of rakBuku){
        const newBook = createBookshelf(buku.judul, buku.penulis, buku.tahun, buku.isCompleted);
        newBook[RAK_BUKUID] = buku.id;

        if(buku.isCompleted){
            listCompleted.append(newBook);
        }
        else {
            listUncompleted.append(newBook);
        }
    }
}