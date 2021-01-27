//בס"ד
var Qnum = 0;
var Qarr = [];
var Aarr = [];
var datasArr = [];
var QinputArr = [];
var AinputArr = []
var flagInputs = [];
for (var i = 0; i < 12; i++) {
    flagInputs[i] = false;
}
function changeList() {
    Qarr[Qnum] = document.getElementById("Qinput").value;
    Aarr[Qnum] = document.getElementById("Ainput").value;
    QinputArr[Qnum].value = Qarr[Qnum];
    AinputArr[Qnum].value = Aarr[Qnum];
}
function addStone() {
    changeList();
    document.getElementById("Qinput").value = "";
    document.getElementById("Ainput").value = "";
    QinputArr[Qnum].removeAttribute("disabled");
    AinputArr[Qnum].removeAttribute("disabled");
    createStone(Qnum);
}
function setValue() {
    var x = event.target;
    if (x.parentElement.id == "quastionsList")
        Qarr[x.dataset.num] = x.value;
    else
        Aarr[x.dataset.num] = x.value;

}
function FinishBoard() {
    datasArr = JSON.parse(localStorage.getItem(sessionStorage.getItem("name")));
    var len = datasArr[2].length;
    datasArr[0].unshift(Qarr);
    datasArr[1].unshift(Aarr);
    datasArr[2].unshift(document.getElementById("title").innerHTML);
    datasArr[3].unshift(document.getElementById("explain").innerHTML);
    localStorage.setItem(sessionStorage.getItem("name"), JSON.stringify(datasArr));
    //  x = window.opener;
    //  debugger
    //window.open(window.opener);
    window.location = 'Game.html';
}
function createInputs() {
    d = document.getElementById("list");
    lists = d.querySelectorAll("[id$=List]");
    x = document.createElement("input");
    x.setAttribute("disabled", "disabled");
    x.setAttribute("onchange", "setValue()");
    for (var i = 0; i < 12; i++) {
        x.setAttribute("data-num", i);
        x.setAttribute("placeholder", "שאלה" + " " + (i + 1));
        lists[0].appendChild(x.cloneNode(true));
        QinputArr[i] = lists[0].lastChild;
        x.setAttribute("placeholder", "תשובה" + " " + (i + 1));
        lists[1].appendChild(x.cloneNode(true));
        AinputArr[i] = lists[1].lastChild;
    }
}
function Fpre() {
    if (!flagInputs[Qnum]) {
        addStone();
        flagInputs[Qnum] = true;
    }
    else
        changeList();
    Qnum--;
    if (Qnum == 0)
        document.getElementById("pre").style.display = 'none';
    if (Qnum == 11)
        document.getElementById("next").style.display = 'block';
    document.getElementById("Ainput").value = AinputArr[Qnum].value;
    document.getElementById("Qinput").value = QinputArr[Qnum].value;
    
}
function Fnext() {
    if (Qnum == 0)
        document.getElementById("pre").style.display = 'block';
    if (!flagInputs[Qnum]) {
        addStone();
        flagInputs[Qnum] = true;
    }
    else
        changeList();
    Qnum++;
    if (Qnum == 12) {
        document.getElementById("next").style.display = 'none';
        var buttons = document.querySelectorAll("button");
        buttons[0].removeAttribute("disabled");
    }
    else
        if (flagInputs[Qnum])
        {
            document.getElementById("Ainput").value = AinputArr[Qnum].value;
            document.getElementById("Qinput").value = QinputArr[Qnum].value;
        }
   

}