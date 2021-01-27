//בס"ד
var tractorFull = false;
var lineHeight = 58;
var hookTop = 70.5;
var stoneTop = 72.5;
var rightConveyer;
var stoneOnTractor;
var id;
var mouseup = false;
var ctrlBoardArr = [[], []];//כג חשוון
//מערך שיאפשר/יגביל בבחירת אבן ששובצה
var flagID = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var flagKeyboard = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var fireworkFlag = false;
window.onkeyup = ctrlUp;//כג חשוון
window.onmouseup = function () { mouseup = true; }
var ctrl12arr = [[], []];
var indexArr = [];
var duringPutOnTractor = false;
function choose() {
    if (document.getElementById("crane").style.display != "none") {
        if (duringPutOnTractor) {
            return;
        }
        t = event.currentTarget;
        //stoneOnTractor = t.dataset.num;
        cheakTraktorFull(t.dataset.num);
    }
}
function cheakTraktorFull(x) {
    if (duringPutOnTractor) {
        return;
    }
    stoneOnTractor = x
    duringPutOnTractor = true;
    document.getElementsByClassName("bigblock2")[stoneOnTractor].firstChild.classList.add("Ichosed");
    if (tractorFull) {
        var y = document.getElementById("conveyercontainer").lastChild;
        document.getElementById("ContainStones").appendChild(y);
        document.getElementById("board2").querySelectorAll('.t2')[y.id.substring(3)].classList.remove("Ichosed");
        backToPlace();
        setTimeout(putOnTractor, 1200);
    }
    else

        putOnTractor();
}
function tractorFullOn() {
    tractorFull = true;
    audioArr[2].pause();
    audioArr[3].play();
}
function tractorFullOff() {
    tractorFull = false;
    audioArr[3].pause();
    audioArr[2].play();
}

function putOnTractor() {

    tractorFullOn();
    x = document.getElementById("stn" + stoneOnTractor);
    document.getElementById("conveyercontainer").appendChild(x);
    document.getElementById("hok").classList.add("hookAnimate");
    document.getElementById("line").classList.add("lineAnimate");

    setTimeout(longcable, 900);
    setTimeout(beginMove, 900);

    setTimeout(function () { duringPutOnTractor = false; }, 1200);

}
function longcable() {
    document.getElementById("cable1").classList.add("cablesAnimate");
    document.getElementById("cable2").classList.add("cablesAnimate");
}
function beginMove() {
    lineHeight = 51;
    hookTop = 64.5;
    stoneTop = 72.5;
    rightConveyer = 3.67;
    removeClass();
    moveUpDown();

}
function removeClass() {
    document.getElementById("hok").classList.remove("hookAnimate");
    document.getElementById("line").classList.remove("lineAnimate");
}
function locate() {

    tractorFullOff();

    place = document.getElementById("b" + id);
    t = place.firstChild;
    t2 = place.querySelectorAll(".t2")[0];
    b2 = document.getElementById("conveyercontainer").lastChild;
    b2.firstChild.setAttribute("hidden", "hidden");
    t2.setAttribute("hidden", "hidden");
    b2.removeAttribute("style");
    b2.removeAttribute("onmouseover");
    b2.removeAttribute("onmouseout");
    b2.lastChild.classList.remove("open");
    b2.firstChild.classList.remove("close");
    b2.classList.remove("open", "close");
    place.replaceChild(b2, t);
    backToPlace();
    document.getElementById("board2").children[stoneOnTractor].firstChild.removeAttribute("onclick");
    document.getElementById("board2").children[stoneOnTractor].firstChild.classList.add("Ilocated");
    flagKeyboard[stoneOnTractor] = 1;
    flagID[id] = 1;
    //עדכון


}
function getId() {
    var b = document.getElementById("board1");
    var crane = document.getElementById("crane");
    var st = document.getElementById("conveyercontainer").lastChild;
    var contain = document.getElementById("conveyercontainer");

    size = document.getElementById("b1").offsetHeight;
    topbrd = b.offsetTop;
    leftbrd = b.offsetLeft;
    hebrd = b.offsetHeight;
    widthbrd = b.offsetWidth;
    topSize = crane.offsetTop + contain.offsetTop + st.offsetTop;
    leftSize = crane.offsetLeft + contain.offsetLeft + st.offsetLeft;
    r = hebrd / size;
    r = Math.round(r);//שינוי
    c = widthbrd / size;
    c = Math.round(c);
    i = findRow(r, size, topbrd, topSize);
    j = findClm(c, size, leftbrd, leftSize);
    id = 3 * i + j;
    if (flagID[id] == 0)
        return true;
    return false;
}

function findRow(r, size, topbrd, topSize) {
    for (i = 0; i < r; i++)

        if (topSize < (topbrd + size))
            return i;
        else
            topbrd += size;

}
function findClm(c, size, leftbrd, leftSize) {
    for (j = c; j >= 0; j--)
        if (leftSize < (leftbrd + size))
            return j - 1;
        else
            leftbrd += size;
}

function moveValues() {

    if (!fireworkFlag) {
        x = event.keyCode;


        if (x > 48 && x < 58)
            if (flagKeyboard[x - 49] == 0)
                cheakTraktorFull(x - 49)

        if (x > 96 && x < 106)
            if (flagKeyboard[x - 97] == 0)
                cheakTraktorFull(x - 97)

        if (x == 96 || x == 48)//stone 10
            if (flagKeyboard[9] == 0)
                cheakTraktorFull(9);
        if (x == 109 || x == 189)//stone 11
            if (flagKeyboard[10] == 0)
                cheakTraktorFull(10);
        if (x == 107 || x == 187)//stone 12
            if (flagKeyboard[11] == 0)
                cheakTraktorFull(11);

        if (tractorFull)
            moveValueCreane(x);
    }
    else
        window.location = "Game.html";
}
//function MouseMoveValueCreane(x) {
//    mouseup = false;
//    moveValueCreane(x)
//    setTimeout(MouseMoveValueCreane(x), 10000)
//    if(mouseup)
//    return;

//}
function moveValueCreane(pressValue) {
    x = pressValue;
    if (tractorFull) {

        //תזוזת מנוף
        switch (x) {
            case 40://למטה
                if (stoneTop < 94.5) {
                    lineHeight += 2.5;
                    hookTop += 2.5;
                    stoneTop += 2.5;
                    moveUpDown();
                }
                break;
            case 38://למעלה
                if (stoneTop > 23.5) {
                    lineHeight -= 2.5;
                    hookTop -= 2.5;
                    stoneTop -= 2.5;
                    moveUpDown();
                }
                break;
            case 37://שמאל
                if (rightConveyer < 62.67) {
                    rightConveyer += 1.5;
                    document.getElementById("conveyercontainer").style.right = rightConveyer + "%";
                }
                break;
            case 39://ימין
                if (rightConveyer > 2.67) {
                    rightConveyer -= 1.5;
                    document.getElementById("conveyercontainer").style.right = rightConveyer + "%";
                }
                break;
            case 13:
                if (check() && getId())
                    if (document.querySelector("input[type='range']").value == 1)//עדכון
                        if (sulotion[id] == stoneOnTractor) {
                            audioArr[0].play();
                            callLocate();
                        }
                        else
                            audioArr[1].play();
                    else
                        callLocate();
                break;


        }

    }
}
function callLocate() {
    document.getElementById("conveyercontainer").lastChild.firstChild.classList.add("close");
    document.getElementById("conveyercontainer").lastChild.lastChild.classList.add("open");
    document.getElementById("conveyercontainer").lastChild.classList.add("open", "close");
    setTimeout(locate, 400);
}
function moveUpDown() {
    document.getElementById("hok").style.top = hookTop + "%";
    document.getElementById("line").style.height = lineHeight + "%";
    document.getElementById("conveyercontainer").lastChild.style.top = stoneTop + "%";
}
//בודקת אם האבן ממוקמת בטווח הלוח
function check() {
    //var criterions = [offsetTop, offsetRight, offsetLeft]
    var b = document.getElementById("board1");
    var crane = document.getElementById("crane");
    var st = document.getElementById("conveyercontainer").lastChild;
    var contain = document.getElementById("conveyercontainer");
    if (b.offsetTop <= (crane.offsetTop + contain.offsetTop + st.offsetTop))
        if (b.offsetLeft <= (crane.offsetLeft + contain.offsetLeft + st.offsetLeft))
            if ((b.offsetLeft + b.offsetWidth) >= (crane.offsetLeft + contain.offsetLeft + st.offsetLeft + st.offsetWidth))
                return true;
    return false;


}
function backToPlace() {
    setTimeout(hookAndLineBack, 100);
    cables = document.getElementById("conveyercontainer").lastElementChild.children;
    cables[0].classList.add("cablesAnimateBack");
    cables[1].classList.add("cablesAnimateBack");
    document.getElementById("conveyercontainer").classList.add("containerAnimate");
    setTimeout(removeBackToPlace, 1100);
}
function hookAndLineBack() {
    document.getElementById("hok").classList.add("hookAnimateBack");
    document.getElementById("line").classList.add("lineAnimateBack");
}
function removeBackToPlace() {
    document.getElementById("hok").style.top = "13.5%";
    document.getElementById("line").style.height = "0";
    cables = document.getElementById("hok").children;
    cables[0].style.width = "0";
    cables[1].style.width = "0";
    lineHeight = 13.5;
    hookTop = 0;
    rightConveyer = 0;
    document.getElementById("hok").classList.remove("hookAnimateBack");
    document.getElementById("line").classList.remove("lineAnimateBack");
    cables[0].classList.remove("cablesAnimate", "cablesAnimateBack");
    cables[1].classList.remove("cablesAnimate", "cablesAnimateBack");
    document.getElementById("conveyercontainer").style.right = "3.67%";
    document.getElementById("conveyercontainer").classList.remove("containerAnimate");
}
function cardInvert() {
    x = event.currentTarget;
    x.firstChild.classList.add("close");
    x.lastChild.classList.add("open");
    //  x.classList.add("close", "open");
}
function stopCardInvert() {
    x = event.currentTarget;
    x.firstChild.classList.add("open");
    x.lastChild.classList.add("close");

    //   x.classList.remove("close", "open");
    //  x.classList.add("open", "close");
    setTimeout(500, removeOpenClose(x));
}
function removeOpenClose(x) {
    x.firstChild.classList.remove("open", "close");
    x.lastChild.classList.remove("open", "close");
    //  x.classList.remove("open", "close");
}

function Regret() {
    if (!tractorFull)
        returnStone(stoneOnTractor, id);
}
function returnStone(stoneBack, stonePlace) {
    arr = document.getElementById("board2").querySelectorAll(".t2");
    arr2 = document.getElementById("board1").querySelectorAll(".t2");
    arr[stoneBack].setAttribute("onclick", "choose()");
    arr[stoneBack].classList.remove("Ilocated");
    ston = document.getElementById("stn" + stoneBack);
    ston.firstChild.removeAttribute("hidden");
    arr2[stonePlace].removeAttribute("hidden");
    var c = document.createElement("div");
    c.setAttribute("id", "c" + stonePlace);
    c.classList.add("placeToAns");

    /*ston = */document.getElementById("b" + stonePlace).replaceChild(c, ston);
    document.getElementById("ContainStones").appendChild(ston);
    flagKeyboard[stoneBack] = 0;
    flagID[stonePlace] = 0;
    document.querySelector("#board2 [data-num='" + stoneBack + "']").classList.remove("Ichosed");
    ston.setAttribute("onmouseover", "cardInvert()");
    ston.setAttribute("onmouseout", "stopCardInvert()");
}
var shapesInBoard;
function checkBoard() {
    shapesInBoard = document.getElementById("board1").querySelectorAll('.Shapes');
    if (!shapesInBoard[11])
        return false;
    else {
        for (var i = 0; i < 12 && shapesInBoard[i].dataset.num == sulotion[i]; i++);
        if (i == 12)
            return true;
        else
            return false;
    }
}
function backdark() {
    dark.style.animationName = "redark";
    document.getElementById("cranebody").style.zIndex = "5";
    document.getElementById("conveyercontainer").style.zIndex = "5";
    closeNote();
    setTimeout(function () { document.getElementById("dark").style.display = "none" }, 600);
}
function finish() {
    if (!tractorFull)
        if (checkBoard()) {
            document.getElementById("board1").style.zIndex = "8";
            document.getElementById("container").style.zIndex = "8";
            dark.style.animationName = "bedark";
            document.getElementById("dark").style.display = "block";
            document.getElementById("dark").style.background = "radial-gradient(ellipse at center, #001b36 0%, #000 100%);";

            spin();
            fireworkFlag = true;
            audioArr[2].pause();
            audioArr[4].play();
            firework();
        }
        else {
            document.getElementById("cranebody").style.zIndex = "8";
            document.getElementById("conveyercontainer").style.zIndex = "8";
            openNote();
            dark.style.animationName = "bedark";
            setTimeout(function () { document.getElementById("dark").style.display = "block" }, 600);
        }
}

function solution() {
    backdark();
    spin();
    setTimeout(spinBack, 5000);
}
function firework() {
    var fw = document.getElementsByClassName("firework");
    for (var i = 0; i < fw.length; i++) {
        fw[i].style.zIndex = "12";
    }
    //timer();
    draw_vars();//שינוי
    draw();
}
function fail() {
    // alert("bad");
}
function getPlace(snum) {
    return shapesInBoard[snum].parentElement.parentElement.parentElement.id.substring(1);
}

function fix() {
    //  var needFix = [];
    //  for (var i = 0; i < 12; i++) 
    //      needFix[i] = false;
    backdark();
    var place;
    //shapesInBoard = document.getElementById("board1").querySelectorAll('div>.Shapes');השורה מיותרת כי הוספתי משתנה גלובלי והמערך נשמר מהפונקציה FINISH וכן לכאורה מספיק בסלקטור לציין את שם המחלקה ואין צורך להביע כבן של...
    for (shape in shapesInBoard) {
        place = getPlace(shape);
        if (cards[sulotion[place]] != shapesInBoard[shape].parentElement)
            // needFix[place] = true;
            //returnStone(sulotion[shape], place);
            returnStone(shapesInBoard[shape].dataset.num, place);
    }
}

function clearBoard() {

    if (document.getElementById("dark").style.display == "none")
        backdark();
    if (shapesInBoard.length)
        for (var i = 0; i < shapesInBoard.length; i++)
            returnStone(shapesInBoard[i].dataset.num, getPlace(i));
}


function newBoard() {
    if (datasArr) {
        sessionStorage.setItem("lenght", datasArr[0].length);
        window.open("makeBoard.html");
    }
    else
        if (confirm("כדי ליצור לוח חדש עליך להיות משתמש רשום. האם ברצונך להרשם כעת?")) {
            datasArr = [[], [], [], []];
            localStorage.setItem(sessionStorage.getItem("name"), JSON.stringify(datasArr));
            FunckeepRandRatio();
            //  alert("נרשמת בהצלחה");
            sessionStorage.setItem("lenght", datasArr[0].length);
            //window.open("makeBoard.html");
            window.open("makeBoard.html", '', 'type=fullWindow, fullscreen, scrollbars=yes');

        }

}
function openNav(id) {
    document.getElementById(id + "Menu").style.right = "0";
    document.getElementById("open" + id + "Menu").style.right = "25vh";
    //document.getElementById(id + "Menu").setAttribute("style", "right: 0;");
    document.getElementById("open" + id + "Menu").setAttribute("z-index", "5");
    document.getElementById(id + "Menu").setAttribute("z-index", "5");

}
function closeNav(id) {
    document.getElementById(id + "Menu").style.right = "-25vh";
    document.getElementById("open" + id + "Menu").setAttribute("z-index", "1");
    document.getElementById(id + "Menu").setAttribute("z-index", "1");
    document.getElementById("open" + id + "Menu").style.right = "0vh";

}

function myColors(num) {
    color = event.currentTarget.value;

    arr = document.getElementsByClassName("Color_" + num);
    for (var i = 0; i < arr.length; i++)
        arr[i].style.backgroundColor = color;


}
function hint() {
    spin();

    setTimeout(spinBack, 3000);
}
function spin() {
    x = document.getElementById("container");

    brd = document.getElementById("board2");
    brd.classList.add("front");
    document.getElementById("cube").insertBefore(brd, document.getElementById("rt"));
    x.style.display = "block";
}
function spinBack() {

    x = document.getElementById("cube").style;
    x.animation = "spinBack 1s";

    setTimeout(stopSpin, 1000);
}
function stopSpin() {

    brd = document.getElementById("board2");
    brd.classList.remove("front");
    document.getElementsByTagName("body")[0].appendChild(brd);
    x = document.getElementById("container");
    document.getElementById("cube").style.animation = "spin 3s forwards";//כג חשוון
    x.style.display = "none";
}
//כג חשוון
function clickBoard(x, BoardNum) {

    if (event.ctrlKey)
        ctrlboards(x, BoardNum);
    else
        (newGame(x, BoardNum));
}
function ctrlboards(x, Num) {

    long = ctrlBoardArr[0].length;
    if (ctrlBoardArr[0].indexOf(questionsArr[Num][0]) < 0) //רק אם עוד לא שורשר למערך
        {//מלוחות הבסיס
            if (x) {

                for (var i = long, j = 0; j < 12; i++ , j++)
                    ctrlBoardArr[0][i] = questionsArr[Num][j];

                for (var i = long, j = 0; j < 12; i++ , j++)
                    ctrlBoardArr[1][i] = answersArr[Num][j];

            }
        //מהלחוחות הפרטיים
            else {
                for (var i = long, j = 0; j < 12; i++ , j++)
                    ctrlBoardArr[0][i] = datasArr[0][Num][j];
                for (var i = long, j = 0; j < 12; i++ , j++)
                    ctrlBoardArr[1][i] = datasArr[1][Num][j];
            }
        }

    }
    function ctrlUp() {

        if (event.key == 'Control' && ctrlBoardArr[0].length > 12) {
            rand12Pairs();
            setCtrlBoard();}
            ctrlBoardArr = [[], []];
        
    }
    function rand12Pairs() {
        var size = ctrlBoardArr[0].length;
        for (var i = 0; i < 12; i++) {
            n = Math.floor(Math.random() * size);
            n = 4;
            while (indexArr.indexOf(n) > -1)
                n = Math.floor(Math.random() * size);
            indexArr[i] = n;
        }
        for (var i = 0; i < 12; i++) {
            ctrl12arr[0][i] = ctrlBoardArr[0][indexArr[i]]
            ctrl12arr[1][i] = ctrlBoardArr[1][indexArr[i]]
        }
    }
    function setCtrlBoard() {
        shapesInBoard = document.getElementById("board1").querySelectorAll('.Shapes');
        if (shapesInBoard.length)
            clearBoard();
        mixSulotion();
        mixAnswers(ctrl12arr[1]);//מערב את התשובות והצורות מהמערך שלו
        set12QandA(1);//ימקם את התשובות
        set12QandA(2);//ימקם את השאלות
        //שופך את הפיתרון
        for (i = 0; i < 12; i++) {
            boardS[i].appendChild(mixShapes[i].cloneNode(true));
            boardS[i].firstChild.classList.add("CardsS");
        }
    }
    function set12QandA(n) {
        brd = document.getElementById("board" + n).querySelectorAll('.t2');
        if (n == 2) { //אם אתה שאלות
            arr = ctrl12arr[0];
        }
        else
            arr = mixAns;

        for (var i = 0; i < 12; i++) {
            if (typeof arr[i] == "object") {//אם הוא אוביקט

                brd[i].innerHTML = "";
                brd[i].appendChild(arr[i].cloneNode(true));
            }
            else {
                brd[i].style.fontSize = "1vw"
                //אם הטקסט ארוך
                if (arr[i].length > 21 && crane != "none")
                    brd[i].style.fontSize = "0.8vw";
                brd[i].innerHTML = arr[i];
            }
        }

    }
