//delete an object
function remove(id){
    document.getElementsByClassName("delete")[id].submit();
}

//toggle which comment box is being used
function revealEdit(id){
    document.getElementsByClassName("editbox")[id].hidden = !document.getElementsByClassName("editbox")[id].hidden;
    document.getElementById("commentSection").hidden = !document.getElementById("commentSection").hidden;
}