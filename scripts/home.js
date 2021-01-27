var name;
var audio;
window.onkeypress = function () {
    if (event.keyCode == 13)
        player();

}
function player()
{
    name = document.getElementById("name").value;
    sessionStorage.setItem("name", name);
    if (localStorage.getItem(name))
        openGame();
    else {
        document.getElementById("enterName").setAttribute('hidden', 'hidden');
        document.getElementById("ifWantNew").removeAttribute('hidden');
    }

}
function instractions() {
        document.getElementById("nameWindow").setAttribute('hidden', 'hidden');
    document.getElementById("instruction").removeAttribute("hidden");
    document.getElementsByClassName("OpenGame")[0].removeAttribute("disabled");
   // openGame();
}
function openGame() {
window.location='htmlPages/Game.html';
}

function newPlayer() {
    var questionsArr = [];
    var answersArr = [];
    var titlesArr = [];
    var explainsArr = [];
    nameArr = JSON.stringify([questionsArr, answersArr, titlesArr, explainsArr]);

    localStorage.setItem(name, nameArr);
    if (localStorage.getItem(name))
      //  alert("ברוך הבא!");
    instractions();
}
function writeName() {
    document.getElementById("enterName").removeAttribute('hidden');
    document.getElementById("ifWantNew").setAttribute('hidden', 'hidden');
     document.getElementById("name").value = '';
    document.getElementById("name").focus();
   
}
function openF5note() {
       document.getElementsByClassName("OpenGame")[1].removeAttribute("disabled");
    document.getElementById("F5note").removeAttribute("hidden");
    
}