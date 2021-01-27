//בס"ד
var cards = [];
function createShapes() {
    var shapes = [];

    for (i = 0; i < 12; i++) {
        shapes[i] = document.createElement("div");
        shapes[i].classList.add("Shapes");
        shapes[i].setAttribute("data-num", i);
    }

    for (var i = 0; i < 12; i += 4) {
        shapes[i].classList.add("TopRight");
    }
    for (var i = 1; i < 12; i += 4) {
        shapes[i].classList.add("BottomRight");
    }
    for (var i = 2; i < 12; i += 4) {
        shapes[i].classList.add("BottomLeft");
    }
    for (var i = 3; i < 12; i += 4) {
        shapes[i].classList.add("TopLeft");
    }
    for (var i = 0; i < 4; i++) {
        shapes[i].classList.add("Color_1");
    }
    for (var i = 4; i < 8; i++) {
        shapes[i].classList.add("Color_2");
    }
    for (var i = 8; i < 12; i++) {
        shapes[i].classList.add("Color_3");
    }
    for (var i = 0; i < 12; i++) {
        document.getElementsByTagName("div")[0].appendChild(shapes[i]);
    }
    for (var i = 0; i < 12; i++) {
        cards[i] = document.createElement("div");
        cards[i].classList.add("Cards")
        cards[i].appendChild(shapes[i]);
    }
}
function createStone(ind) {
        var y = document.createElement("div");

        y.setAttribute("id", "stn" + ind);
        var x = document.createElement("div");

        x.innerHTML += ind + 1;
        x.classList.add("stones");
        
        //if (i == 5 || i == 9)
        //    y.classList.add("marginStones" + i);
    y.appendChild(x);
    if (cards[ind]) {
        y.appendChild(cards[ind]);
        document.getElementById("ContainStones").appendChild(y);
    }
    
}
function openNoteNextStep() {
    var cables = document.querySelectorAll("#hok div");
    cables[0].style.width = "773%";
    cables[1].style.width = "773%";
    var note = document.getElementById("note");
    note.style.display = "block";
}
function closeNote() {
    var elementsInCrane = document.querySelectorAll("#crane img, #crane div");

    document.getElementById("hok").style.top = "13.5%";
    document.getElementById("line").style.height = "0";
    document.getElementById("conveyercontainer").style.right = "3.67%";
    var cables = document.querySelectorAll("#hok div");
    cables[0].style.width = "0";
    cables[1].style.width = "0";
    var note = document.getElementById("note");
    note.style.display = "none";
    for (var i = 0; i < elementsInCrane.length; i++)
        elementsInCrane[i].style.transition = "";
}
function openNote() {

    var elementsInCrane = document.querySelectorAll("#crane img, #crane div");
    for (var i = 0; i < elementsInCrane.length; i++)
        elementsInCrane[i].style.transition = "0.8s linear";
    document.getElementById("hok").style.top = "20.5%";
    document.getElementById("line").style.height = "7%";
    document.getElementById("conveyercontainer").style.right = "25%";

    openNoteNextStep();
}