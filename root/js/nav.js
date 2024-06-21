const navbutton = document.querySelector(".toggle");
const flexcontainer = document.querySelector(".flex-container");

navbutton.onclick = function(){
    console.log("col");
    flexcontainer.classList.toggle("open");
}
