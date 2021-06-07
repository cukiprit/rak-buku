document.addEventListener("DOMContentLoaded", function(){
    const submitForm = document.getElementById("inputBook");

    submitForm.addEventListener("submit", function(event){
        event.preventDefault();
        addBook();
    });

    if(supportStorage()){
        loadDataFromStorage();
    }
});

document.addEventListener("ondatasaved", () => {
    console.log("Buku berhasil disimpan");
});

document.addEventListener("ondataloaded", () => {
    refreshDataFromBookshelf();
});