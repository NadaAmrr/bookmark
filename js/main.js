var bookmarkName = document.getElementById('bookmarkName');
var bookmarkURL = document.getElementById('bookmarkURL');
var btn = document.getElementById('btnSubmit');
var updateIndex;
var bookmarkContainer;
var regexName = /^.{3,}$/;
var regexUrl = /^(https?:\/\/)?[w{3}\.]{0,1}[A-Za-z0-9\.]{1,}(\.edu|\.net|\.com|[a-zA-Z]{2,4})[\/]{0,1}[A-Za-z0-9\.\/\?\_\=]{0,}$/;
var closeBtn = document.getElementById("dialog");

if(localStorage.getItem('myBookmarks') != null){
    bookmarkContainer = JSON.parse(localStorage.getItem('myBookmarks'))
    displayBookmarks(bookmarkContainer)
}else{
    bookmarkContainer = []
}
// Add one bookmark
function addBookmark(){
    if (validName() === true && validUrl() === true) {
        if (btn.innerHTML =='Update') {
            btn.innerHTML = 'Submit'
             var bookmark = {
               name: bookmarkName.value,
               url: bookmarkURL.value,
             };
             bookmarkContainer.splice(updateIndex , 1 , bookmark);
        } else if(btn.innerHTML =='Submit'){
            var bookmark = {
                name: bookmarkName.value,
                url: bookmarkURL.value,
              };
              bookmarkContainer.push(bookmark);
        }
        localStorage.setItem("myBookmarks", JSON.stringify(bookmarkContainer));
        displayBookmarks(bookmarkContainer);
        clearForm();
        
    } else  {
      document.getElementById("dialog").classList.add("overlay");
      document.getElementById("dialog").style.display = "block";

        var data;
        data = `<dialog open id="dialog"
        class="border-0 d-flex justify-content-center align-items-center p-0"
        id="dialogShow">
    <div class="dialog p-4">
      <header class="box-header  d-flex justify-content-between align-items-center mb-4">
        <div class="circles d-flex">
          <span class="circle me-2"></span>
          <span class="circle me-2"></span>
          <span class="circle me-2"></span>
        </div>
        <button class="btn" id="closeBtn" onclick="closeDialog()">
          <i class="fa-solid fa-xmark text-black fs-3"></i>
        </button>
      </header>
      <p class="pb-2 fw-bold fs-5">
        Site Name or Url is not valid, Please follow the rules below :
      </p>
      <ol class="list-unstyled m-0">
        <li class="fw-medium fs-5">
          <i class="fa-regular fa-circle-right text-danger me-2"></i>Site name must
          contain at least 3 characters
        </li>
        <li class="fw-medium fs-5">
          <i class="fa-regular fa-circle-right text-danger me-2"></i>Site URL must be a
          valid one
        </li>
      </ol>
    </div>
        
      </dialog>`
      document.getElementById('dialog').innerHTML = data;
       

     }

   
}
//clear form
function clearForm(){
    bookmarkName.value = ""
    bookmarkURL.value = ""
}
// Display bookmarks
function displayBookmarks(data){
    var listTable = ``
    for (let i = 0; i < data.length; i++) {
        listTable += ` <tr>
        <td>${i}</td>
        <td>${data[i].name}</td>
        <td><button onclick="window.location.href='${data[i].url}'" class="btn btn-visit"><i class="fa-solid fa-eye pe-2"></i>Visit</button></td>
        <td><button onclick="deleteBookmark(${i})" class="btn btn-delete"><i class="fa-solid fa-trash-can me-2"></i>Delete</button></td>
        <td><button onclick="updateBookmark(${i})" class="btn btn-update"><i class="fa-solid fa-pen-to-square me-2"></i>Update</button></td>
      </tr>`;
        
    }
    document.getElementById('displayBookmarks').innerHTML = listTable
}
//Delete one bookmark
function deleteBookmark(index){
    bookmarkContainer.splice(index, 1);
    localStorage.setItem('myBookmarks' , JSON.stringify(bookmarkContainer));
    displayBookmarks(bookmarkContainer)
}
//visit one bookmark
function visitBookmark(){
}
//update one bookmark
function updateBookmark(index){
    btn.innerHTML='Update'
    bookmarkName.value = bookmarkContainer[index].name;
    bookmarkURL.value = bookmarkContainer[index].url;
    updateIndex = index;
}
//search
function search(term){
var selected = [];
    for (var i = 0; i < bookmarkContainer.length; i++) {
        if(bookmarkContainer[i].name.toLowerCase().includes(term.toLowerCase())){
            selected.push(bookmarkContainer[i])
        }
        displayBookmarks(selected)        
    }
}
//validation Name
function validName(){
    if(regexName.test(bookmarkName.value)){
        return true
    }else{
        return false
    }
}
//validation url
function validUrl(){
    if(regexUrl.test(bookmarkURL.value)){
        return true
    }else{
        return false
    }
}
// close dialog
function closeDialog(){
  document.getElementById("dialog").classList.remove("overlay");
    document. getElementById("dialog"). style. display = "none";
}
