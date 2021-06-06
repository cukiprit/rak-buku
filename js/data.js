const BOOKSHELF_KEY = "BOOKSHELF_APPS";

let rakBuku = [];

function supportStorage(){
    if(typeof(Storage) === undefined){
        alert("Browser tidak support local storage");
        return false;
    }
    return true;
}

function saveBook(){
    const parsed = JSON.stringify(rakBuku);
    localStorage.setItem(BOOKSHELF_KEY, parsed);
    document.dispatchEvent(new Event("ondatasaved"));
}

function loadDataFromStorage(){
    const serialData = localStorage.getItem(BOOKSHELF_KEY);
    let data = JSON.parse(serialData);

    if(data !== null){
        rakBuku = data;
    }
    document.dispatchEvent(new Event("ondataloaded"));
}

function updateDataToStorage(){
    if(supportStorage()){
        saveBook();
    }
}

function composeBookshelfObject(judul, penulis, tahun, isCompleted){
    return {
        id: +new Date,
        judul,
        penulis,
        tahun,
        isCompleted
    };
}

function findBook(idBuku){
    for(buku of rakBuku){
        if(buku.id === idBuku){
            return todo;
        }
    }
    return null;
}

function findBookIndex(idBuku){
    let index = 0;
    for(buku of idBuku){
        if(buku.id === idBuku){
            return index;
        }

        index++;
    }
    return -1;
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