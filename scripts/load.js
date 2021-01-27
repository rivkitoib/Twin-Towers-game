//בס"ד

var questionsArr = [];
var answersArr = [];
var titlesArr = [];
var explainsArr = [];
var datasArr = [];
var name;
var keepRandRatio = [];
var sulotion = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
var mixAns = [];
var mixShapes = [];
var begin = true;
var audioArr = [];
window.onkeydown = moveValues;
window.onmousedown = function () {

    if (fireworkFlag)
        window.location = "Game.html";
}
function load() {

    createbuilding();
    createBoards();
    createAudio();

    createShapes();
    createStones();
    parse();
    if (datasArr && sessionStorage.getItem("lenght") && datasArr[0].length > sessionStorage.getItem("lenght"))
        newGame(false, (datasArr[0].length - 1));
    else
        randBoard();
    fullList();

}
function createAudio() {//עדכון
    audioArr[0] = document.createElement("audio");//תשובה נכונה
    audioArr[0].setAttribute("src", "../audio/good.mp3");
    audioArr[0].setAttribute("controls", "controls");
    audioArr[0].setAttribute("type", "audio/mpeg");
    audioArr[1] = document.createElement("audio");//תשובה שגויה
    audioArr[1].setAttribute("src", "../audio/wrong.mp3");
    audioArr[1].setAttribute("controls", "controls");
    audioArr[1].setAttribute("type", "audio/mpeg");
    audioArr[2] = document.createElement("audio");//מנגינת רקע
    audioArr[2].setAttribute("src", "../audio/ground.mp3");
    audioArr[2].setAttribute("controls", "controls");
    audioArr[2].setAttribute("type", "audio/mpeg");
    audioArr[3] = document.createElement("audio");//מנגינה לזמן משחק
    audioArr[3].setAttribute("src", "../audio/stoneOnTractor.mp3");
    audioArr[3].setAttribute("controls", "controls");
    audioArr[3].setAttribute("type", "audio/mpeg");
    audioArr[4] = document.createElement("audio");//מנגינה לניצחון
    audioArr[4].setAttribute("src", "../audio/win.mp3");
    audioArr[4].setAttribute("controls", "controls");
    audioArr[4].setAttribute("type", "audio/mpeg");
    audioArr[2].play();
}

function randBoard() {
    var base;
    var boardNum;
    if (!datasArr) {//שחקן לא מוכר
        base = true;
        boardNum = Math.floor(Math.random() * answersArr.length);
    }
    else {
        boardNum = Math.floor(Math.random() * keepRandRatio.length);
        //base = temp == 1 ? false : true;
        if (keepRandRatio[boardNum] === 1) {
            base = false;
            boardNum -= titlesArr.length;
        }
        else
            base = true;
    }
    newGame(base, boardNum);

}
function fullPlayerList() {

    document.getElementById("knownPlayerList").innerHTML = '';
    for (var i = 0; i < datasArr[3].length; i++) {
        var y = document.createElement("p");
        y.setAttribute("onclick", "clickBoard(false," + i + ")");//כג חשוון
        y.innerHTML = datasArr[2][i];
        y.classList.add("tooltip");
        x = document.createElement("span");
        x.classList.add("tooltiptext");
        x.innerHTML = datasArr[3][i];
        x.style.top = (12 + i * 6) + "vh";
        y.appendChild(x);
        document.getElementById("knownPlayerList").appendChild(y);

    }
}
function fullList() {
    var topFirst = 0;
    if (datasArr && datasArr[3].length > 0) {

        fullPlayerList();
        topFirst = document.getElementById("knownPlayerList").lastChild.lastChild.style.top.substring(0, 2);
    }
    document.getElementById("BaseList").innerHTML = '';
    for (var i = 0; i < titlesArr.length; i++) {
        y = document.createElement("p");
        y.setAttribute("onclick", "clickBoard(true," + i + ")");//כג חשוון
        y.innerHTML = titlesArr[i];

        y.classList.add("tooltip");
        x = document.createElement("span");
        x.classList.add("tooltiptext");
        x.innerHTML = explainsArr[i];
        topFirst = parseInt(topFirst);
        if (!topFirst)
            x.style.top = (topFirst + 12.5 + i * 6) + "vh";
        else
            x.style.top = (topFirst + 6.5 + i * 6) + "vh";
        y.appendChild(x);

        document.getElementById("BaseList").appendChild(y);

    }


}
function FunckeepRandRatio() {
    var i = 0;
    for (; i < titlesArr.length; i++)
        keepRandRatio[i] = 0;
    for (; i < titlesArr.length + datasArr[0].length; i++)
        keepRandRatio[i] = 1;
}
//
function parse() {
    name = sessionStorage.getItem("name");
    if (localStorage.getItem(name)) {
        datasArr = JSON.parse(localStorage.getItem(name));
        FunckeepRandRatio();
    }
    else//שחקן לא מוכר
        datasArr = false;

}
function newGame(baseBoard, choosedBoard) {

     shapesInBoard = document.getElementById("board1").querySelectorAll('.Shapes');
    clearBoard();
    mixSulotion();
    if (baseBoard) {
        mixAnswers(answersArr[choosedBoard]);
        setAnsQtn(questionsArr[choosedBoard], mixAns, mixShapes);
    }
    else {
        mixAnswers(datasArr[1][choosedBoard]);
        setAnsQtn(datasArr[0][choosedBoard], mixAns, mixShapes);
    }

}
function createbuilding() {
    for (var i = 0; i < 12; i++) {
        var x = document.createElement("div");//בבנין החסר יש לכל דיו אי די ובתוכו אלמנט ללא אי די
        x.classList.add("bigblock", "block");
        x.setAttribute("id", "b" + i);
        t = document.createElement("div");
        t.classList.add("t2");
        c = document.createElement("div");
        c.setAttribute("id", "c" + i);
        c.setAttribute("class", "placeToAns");
        x.appendChild(c);
        x.appendChild(t);
        document.getElementById("board1").appendChild(x);
        var y = document.createElement("div");//בבנין הבנוי אין אי די לדיו עצמו אלא דטה נם לאלמנט שבתוכו
        y.classList.add("bigblock2", "block");
        t2 = document.createElement("div");
        t2.classList.add("t2");
        t2.setAttribute("data-num", i);
        t2.setAttribute("onclick", "choose()");

        var num = document.createElement("label");
        num.innerHTML += i + 1;
        num.classList.add("numbers")
        y.appendChild(t2);
        y.appendChild(num);
        document.getElementById("board2").appendChild(y);
        var z = document.createElement("div");
        z.classList.add("block");
        t3 = document.createElement("div");
        t3.classList.add("t1");
        z.appendChild(t3);
        document.getElementById("board3").appendChild(z);
    }

}
function createStones() {
    for (var i = 0; i < 12; i++) {
        createStone(i);
        var currentSton = document.getElementById("ContainStones").lastChild;
        currentSton.setAttribute("data-num", i);
        currentSton.setAttribute("onclick", "choose()");
        currentSton.setAttribute("onmouseover", "cardInvert()");
        currentSton.setAttribute("onmouseout", "stopCardInvert()");
    }
}
function mixSulotion() {
    for (var i = 0; i < 50; i++) {
        n1 = Math.floor(Math.random() * 12);
        n2 = Math.floor(Math.random() * 12);
        temp = sulotion[n1];
        sulotion[n1] = sulotion[n2];
        sulotion[n2] = temp;
    }

}
function mixAnswers(Ans) {
    for (var i = 0; i < 12; i++) {
        mixAns[i] = Ans[sulotion[i]];
        mixShapes[i] = cards[sulotion[i]];
    }
}
function setAnsQtn(bQ, bA, solutions) {
    boardQ = document.getElementById("board2").querySelectorAll('.t2');
    boardA = document.getElementById("board1").querySelectorAll('.t2');
    boardS = document.getElementById("board3").querySelectorAll('.t1');
    if (typeof bQ[0] === "object")
        for (var i = 0; i < 12; i++) {
            boardQ[i].innerHTML = "";
            boardQ[i].appendChild(bQ[i].cloneNode(true));

        }

    else {
        crane = document.getElementById("crane").style.display;
        for (i = 0; i < 12; i++) {
            boardQ[i].style.fontSize = "1vw"
            if (bQ[i].length > 21 && crane != "none")
                boardQ[i].style.fontSize = "0.8vw";
            boardQ[i].innerHTML = bQ[i];

        }
    }
    if (typeof bA[0] == "object")
        for (i = 0; i < 12; i++) {
            boardA[i].innerHTML = "";
            boardA[i].appendChild(bA[i].cloneNode(true));
        }
    else
        for (i = 0; i < 12; i++) {
            boardQ[i].style.fontSize = "1vw"
            if (bA[i].length > 21 && crane != "none")
                boardA[i].style.fontSize = "0.8vw";
            boardA[i].innerHTML = bA[i];
        }
    for (i = 0; i < 12; i++) {
        boardS[i].appendChild(solutions[i].cloneNode(true));
        boardS[i].firstChild.classList.add("CardsS");
    }
}
//מערך ששומר פונקצית השמה מתאימה לכל מערך
var funcsArr = [setPairs, setRav,setBooks, setCity, setCountries,setCoins, setFlag,setCars,setTrafics, setInstrumens ,setBody,setChemistry, setHouses, setShoes,setLess, setAnimals,setFaces,setShapes, setShapes2, setSillhoutte,  setShikuf,   setFruits, setLetters];
//יצירת לוחות
function createBoards() {

    for (var i = 0; i < funcsArr.length; i++) {
        funcsArr[i](i);
    }
}

//יצירת לוח ערי בירה
function setCity(index) {
    titlesArr[index] = "ערים";
    explainsArr[index] = "התאם עיר בירה לארצה";
    var QCity = ["מרוקו", "שוויץ", "רומניה", "לבנון", "ספרד", "מצרים", "פיננלנד", "הונגריה", "שבדיה", "גרמניה", "יפן", "בלגיה"]
    questionsArr[index] = QCity;
    var ACity = ["רבאט", "ברן", "בוקרשט", "בירות", "מדריד", "קהיר", "אלסינקי", "בודפשט", "שטוקולהם", "ברלין", "טוקיו", "בריסל"]
    answersArr[index] = ACity;
}
//יצירת לוח מטבעות
function setCoins(index) {
    titlesArr[index] = "מטבע מקומית";
    explainsArr[index] = "שיך סוג כסף למקומו";
    var QCoins = ["ישראל", "תימן", "רוסיה", "רומניה", "הולנד", "יפן", "ליכטנשטיין", "הממלכה המאוחדת", "פולין", "דנמרק", "אינדוזיה", "ליטא"]
    questionsArr[index] = QCoins;
    var ACoins = ["שקל", "ריאל", "רובל", "ליי", "אירו", "ין", "פרנק שוויצרי", "לירה שטרלינג", "זלוטי", "כתר דני", "רופיה", "ליטאס"]
    answersArr[index] = ACoins;
}
//יצירת לוח אותיות אנגלית
function setLetters(index) {
    titlesArr[index] = "אותיות";
    explainsArr[index] = "זהה אות גדולה לקטנה";
    var QLetters = [];
    var ALetters = [];
    for (var i = 0; i < 12; i++) {
        var temp = document.createElement("img");
        temp.setAttribute("src", "../pictures/letters/capital (" + (i + 1) + ").jpg");
        temp.setAttribute("class", "picturesInWindows");
        QLetters[i] = temp;
        var temp2 = document.createElement("img");
        temp2.setAttribute("src", "../pictures/letters/small (" + (i + 1) + ").jpg");
        temp2.setAttribute("class", "picturesInWindows");
        ALetters[i] = temp2;
    }
    questionsArr[index] = QLetters;
    answersArr[index] = ALetters;
}
//יצירת לוח פירות וירקות
function setFruits(index) {
    titlesArr[index] = "פרות וירקות";
    explainsArr[index] = "תרגם את התמונה"
    var QFruits = [];
    var AFruits = [];
    for (var i = 0; i < 12; i++) {
        var temp = document.createElement("img");
        temp.setAttribute("src", "../pictures/fruits/fruitsQ (" + (i + 1) + ").png");
        temp.setAttribute("class", "picturesInWindows");
        QFruits[i] = temp;
    }
    var AFruits = ["Orange", "Pineapple", "Pomegranate", "Banana", "Pear", "Crembola", "watermelon", "Apple", "Kiwi", "Lemon", "strawberry", "cherry"]

    questionsArr[index] = QFruits;
    answersArr[index] = AFruits;

}
//יצירת לוח יבשות
function setCountries(index) {
    titlesArr[index] = "מדינות";
    explainsArr[index] = "הכר את השטח"
    var QCountries = [];
    var ACountries = [];
    for (var i = 0; i < 12; i++) {
        var temp = document.createElement("img");
        //<img src="../pictures/countries/1.png" />
        temp.setAttribute("src", "../pictures/countries/" + (i + 1) + ".png");
        temp.setAttribute("class", "picturesInWindows");
        QCountries[i] = temp;
    }
    var ACountries = ["רוסיה", "סין", "ישראל", "איטליה", "ארה'ב", "קנדה", "בריטניה", "צרפת", "צילה", "יוון", "שוויץ", "ספרד"]

    questionsArr[index] = QCountries;
    answersArr[index] = ACountries;

}
//יצירת לוח צלליות
function setSillhoutte(index) {
    titlesArr[index] = "צלליות";
    explainsArr[index] = "לכל פרצוף- צללית!"
    var QShadow = [];
    var AShadow = [];
    for (var i = 0; i < 12; i++) {
        var temp = document.createElement("img");
        temp.setAttribute("src", "../pictures/צלליות/silhouetteFalse (" + (i + 1) + ").png");
        temp.setAttribute("class", "picturesInWindows");
        QShadow[i] = temp;
        var temp2 = document.createElement("img");
        temp2.setAttribute("src", "../pictures/צלליות/silhouetteTrue (" + (i + 1) + ").png");
        temp2.setAttribute("class", "picturesInWindows");
        AShadow[i] = temp2;
    }
    questionsArr[index] = QShadow;
    answersArr[index] = AShadow;
}
//יצירת לוח דגלים
function setFlag(index) {
    titlesArr[index] = "דגלים";
    explainsArr[index] = "מצא ארץ לדגל"
    var QFlags = [];
    var AFlags = [];
    for (var i = 0; i < 12; i++) {
        var temp = document.createElement("img");
        temp.setAttribute("src", "../pictures/flags/flag (" + (i + 1) + ").png");
        temp.setAttribute("class", "picturesInWindows");
        QFlags[i] = temp;
    }

    var AFlags = ["קרואטיה", "קנדה", "פורטוגל", "יוון", "ישראל", "פולין", "האיחוד האירופי", "לטביה", "ארה'ב", "אנגליה", "צרפת", "ערב הסעודית"]

    questionsArr[index] = QFlags;
    answersArr[index] = AFlags;

}
//יצירת לוח רבנים
function setRav(index) {
    titlesArr[index] = "רבנים";
    explainsArr[index] = "שיך שם לרב"
    var Qrav = [];
    var Arav = [];
    for (var i = 0; i < 12; i++) {
        var temp = document.createElement("img");
        temp.setAttribute("src", "../pictures/Rabays/Rabays (" + (i + 1) + ").JPG");
        temp.setAttribute("class", "picturesInWindows");
        Qrav[i] = temp;
    }

    var Arav = ["החפץ חיים", "ר' ירוחם ליבוביץ", "הרב מבריסק", "הרב שך", "רבי אי'ש קרליץ", "ר' יחזקאל לוינשטיין", "ר' חיים שמואלביץ", "הרב דסלר", "ר' יצחק אלחנן ספקטור", "הרב שטיינמן", "הרש'ר הירש", "החת'ם סופר"]

    questionsArr[index] = Qrav;
    answersArr[index] = Arav;

}
//יצירת לוח ספרים
function setBooks(index) {
    titlesArr[index] = "ספרים";
    explainsArr[index] = "מחברים"
    var QBooks = [];
    var ABooks = [];
    for (var i = 0; i < 12; i++) {
        var temp = document.createElement("img");
        temp.setAttribute("src", "../pictures/books/" + (i + 1) + ".JPG");
        temp.setAttribute("class", "picturesInWindows");
        QBooks[i] = temp;
    }

  
    var ABooks = ["האדמו'ר מפיאסאצא", "הרב וולבא", "ר' יהודה הלוי", "ר' אליהו לאפיאן", "הסבא מסלבודקא", "הסבא מנובהרדוק", "השל'ה", "ר' אלעזר פאפו", "ר' שלמה קורדבירו", "החזו'א", "האדמו'ר מסלונים", "ר' לייב חסמן"]

    questionsArr[index] = QBooks ;
    answersArr[index] = ABooks ;

}
//יצירת לוח שיקוף
function setShikuf(index) {
    titlesArr[index] = "שיקוף";
    explainsArr[index] = "החלף ימין <---> בשמאל"
    var QShikuf = [];
    var AShikuf = [];
    for (var i = 0; i < 12; i++) {
        var temp = document.createElement("img");
        temp.setAttribute("src", "../pictures/Shikuf/" + (i + 1) + ".JPG");
        temp.setAttribute("class", "picturesInWindows");
        QShikuf[i] = temp;
        var temp2 = document.createElement("img");
        temp2.setAttribute("src", "../pictures/Shikuf/a" + (i + 1) + ".JPG");
        temp2.setAttribute("class", "picturesInWindows");
        AShikuf[i] = temp2;
    }
    questionsArr[index] = QShikuf;
    answersArr[index] = AShikuf;
}
//יצירת לוח חיות
function setAnimals(index) {
    titlesArr[index] = "החיה וביתה";
    explainsArr[index] = "איפה אני גר/ה?"
    var QAnimals = [];
    var AAnimals = [];
    for (var i = 0; i < 12; i++) {
        var temp = document.createElement("img");
        temp.setAttribute("src", "../pictures/animals/" + (i + 1) + ".png");
        temp.setAttribute("class", "picturesInWindows");
        QAnimals[i] = temp;
        var temp2 = document.createElement("img");
        temp2.setAttribute("src", "../pictures/animals/a" + (i + 1) + ".png");
        temp2.setAttribute("class", "picturesInWindows");
        AAnimals[i] = temp2;
    }
    questionsArr[index] = QAnimals;
    answersArr[index] = AAnimals;
}
//יצירת לוח גוף האדם
function setBody(index) {
    titlesArr[index] = "גוף האדם";
    explainsArr[index] = "איברים פנימיים"
    var QBody = [];
    var ABody = [];
    for (var i = 0; i < 12; i++) {
        var temp = document.createElement("img");
        temp.setAttribute("src", "../pictures/body/" + (i + 1) + ".png");
        temp.setAttribute("class", "picturesInWindows");
        QBody[i] = temp;
    }
    ABody = ["ריאות", "לב", "מח", "כליות", "טחול", "כבד", "כיס המרה", "עור", "עורק", "לבלב", "כדוריות דם", "עין"];
    questionsArr[index] = QBody;
    answersArr[index] = ABody;
}
//יצירת לוח תמרורים
function setTrafics(index) {
    titlesArr[index] = "תמרורים";
    explainsArr[index] = "מה מורה התמרור?"
    var QTrafic = [];
    var ATrafic = [];
    for (var i = 0; i < 12; i++) {
        var temp = document.createElement("img");
        temp.setAttribute("src", "../pictures/trafic/" + (i + 1) + ".png");
        temp.setAttribute("class", "picturesInWindows");
        QTrafic[i] = temp;
    }
    ATrafic = ["שבילים נפרדים לאופנים והולכי רגל", "מפגש מסילת ברזל", "מנהרה", "פסי האטה", "עצירה להעלאת או הורדת נוסעים בלבד", "איסור חנית רכב מסחרי", "אין לעקוף רכב הנע באותו כיוון ", "אזור אסור ללימוד נהיגה", "רחוב ללא מוצא", "כביש משובש", "הכביש הולך וצר", "ירידה תלולה"];
    questionsArr[index] = QTrafic;
    answersArr[index] = ATrafic;
}
//יצירת לוח רכבים
function setCars(index) {
    titlesArr[index] = "יצרניות רכב";
    explainsArr[index] = "שיך לוגו לשם החברה"
    var QCars = [];
    var ACars = [];
    for (var i = 0; i < 12; i++) {
        var temp = document.createElement("img");
        temp.setAttribute("src", "../pictures/cars/" + (i + 1) + ".png");
        temp.setAttribute("class", "picturesInWindows");
        QCars[i] = temp;
    }
    ACars = ["פורד","מיצובישי", "אופל","יונדאי","קרייזלר", "ביוויק","אאודי","טויוטה","סיאט","סובארו","סקודה","מאזדה" ];
    questionsArr[index] = QCars;
    answersArr[index] = ACars;
}
//יצירת לוח כימיה
function setChemistry(index) {
    titlesArr[index] = "כימיה";
    explainsArr[index] = "הרכב מולקלות"
    var QChemistry = ["H2O", "CO2", "CH4", "CO", "H2O2", "CH3COOH", "P4", "N2", "NH3", "O3", "NaCl", "O2"]
    questionsArr[index] = QChemistry;
    var AChemistry = ["מים", "פחמן דו חמצני", "מתאן", "פחמן חד חמצני", "מי חמצן", "חומץ", "זרחן", "חנקן", "אמוניה", "אוזון", "מלח בישול", "חמצן"]
    answersArr[index] = AChemistry;
}
//יצירת לוח זוגות
function setPairs(index) {
    titlesArr[index] = "זוגות בתנ'ך";
    explainsArr[index] = "שיך אישה לבעלה"
    var QPairs = ["אברהם אבינו", "אהרן", "תרח", "מנוח", "ישי", "שלמה", "אחאב", "יוסף", "לבן", "דוד", "ברק", "כלב"]
    questionsArr[index] = QPairs;
    var APairs = ["קטורה", "אלישבע", "אמתלאי בת כרנבו", "צללפונית", "ניצבת בת עדיאל", "נעמה", "איזבל", "אסנת בת דינה", "עדינה", "חגית", "דבורה", "מרים"]
    answersArr[index] = APairs;
}
//יצירת לוח נעליים
function setShoes(index) {
    titlesArr[index] = "מה נועלים?";
    explainsArr[index] = "לכל איש נעל משלו"
    var QShoes = [];
    var AShoes = [];
    for (var i = 0; i < 12; i++) {
        var temp = document.createElement("img");
        temp.setAttribute("src", "../pictures/Shoes/" + (i + 1) + ".png");
        temp.setAttribute("class", "picturesInWindows");
        QShoes[i] = temp;
        var temp2 = document.createElement("img");
        temp2.setAttribute("src", "../pictures/Shoes/a" + (i + 1) + ".png");
        temp2.setAttribute("class", "picturesInWindows");
        AShoes[i] = temp2;
    }
    questionsArr[index] = QShoes;
    answersArr[index] = AShoes;
}
//יצירת לוח צורות
function setShapes(index) {
    titlesArr[index] = "הפשטה";
    explainsArr[index] = "החלף חיצוני בפנימי"
    var QShapes = [];
    var AShapes = [];
    for (var i = 0; i < 12; i++) {
        var temp = document.createElement("img");
        temp.setAttribute("src", "../pictures/shapes/" + (i + 1) + ".png");
        temp.setAttribute("class", "picturesInWindows");
        QShapes[i] = temp;
        var temp2 = document.createElement("img");
        temp2.setAttribute("src", "../pictures/shapes/a" + (i + 1) + ".png");
        temp2.setAttribute("class", "picturesInWindows");
        AShapes[i] = temp2;
    }
    questionsArr[index] = QShapes;
    answersArr[index] = AShapes;
}
//יצירת לוח צורות ורקע
function setShapes2(index) {
    titlesArr[index] = "צורה ורקע";
    explainsArr[index] = "התאם צורה לרקע"
    var QShapes2 = [];
    var AShapes2 = [];
    for (var i = 0; i < 12; i++) {
        var temp = document.createElement("img");
        temp.setAttribute("src", "../pictures/Shapes2/" + (i + 1) + ".png");
        temp.setAttribute("class", "picturesInWindows");
        QShapes2[i] = temp;
        var temp2 = document.createElement("img");
        temp2.setAttribute("src", "../pictures/Shapes2/a" + (i + 1) + ".png");
        temp2.setAttribute("class", "picturesInWindows");
        AShapes2[i] = temp2;
    }
    questionsArr[index] = QShapes2;
    answersArr[index] = AShapes2;
}
//יצירת לוח כלי נגינה
function setInstrumens(index) {
    titlesArr[index] = "כלי נגינה";
    explainsArr[index] = "סוגים שונים"
    var QInstrumens = [];
    var AInstrumens = [];
    for (var i = 0; i < 12; i++) {
        var temp = document.createElement("img");
        temp.setAttribute("src", "../pictures/Instrumens/instrumens (" + (i + 1) + ").jpg");
        temp.setAttribute("class", "picturesInWindows");
        QInstrumens[i] = temp;
    }
    AInstrumens = ["בסון", "חליל צד", "חצוצרה", "טובה", "לאוטה", "מנדולינה", "מפוחית", "עוגב", "פיקולו", "קלרינט", "קסילופון", "קרן יער"];
    questionsArr[index] = QInstrumens;
    answersArr[index] = AInstrumens;
}
//יצירת לוח מה חסר
function setLess(index) {
    titlesArr[index] = "מה חסר?";
    explainsArr[index] = "מצא פריט משלים"
    var QLess = [];
    var ALess = [];
    for (var i = 0; i < 12; i++) {
        var temp = document.createElement("img");
        temp.setAttribute("src", "../pictures/fit/" + (i + 1) + ".png");
        temp.setAttribute("class", "picturesInWindows");
        QLess[i] = temp;
        var temp2 = document.createElement("img");
        temp2.setAttribute("src", "../pictures/fit/a" + (i + 1) + ".png");
        temp2.setAttribute("class", "picturesInWindows");
        ALess[i] = temp2;
    }
    questionsArr[index] = QLess;
    answersArr[index] = ALess;
}
//יצירת לוח פנים
function setFaces(index) {
    titlesArr[index] = "צדודיות";
    explainsArr[index] = "פרופילים"
    var QFaces = [];
    var AFaces = [];
    for (var i = 0; i < 12; i++) {
        var temp = document.createElement("img");
        temp.setAttribute("src", "../pictures/face/" + (i + 1) + ".png");
        temp.setAttribute("class", "picturesInWindows");
        QFaces[i] = temp;
        var temp2 = document.createElement("img");
        temp2.setAttribute("src", "../pictures/face/a" + (i + 1) + ".png");
        temp2.setAttribute("class", "picturesInWindows");
        AFaces[i] = temp2;
    }
    questionsArr[index] = QFaces;
    answersArr[index] = AFaces;
}
//יצירת לוח בתים
function setHouses(index) {
    titlesArr[index] = "בתים";
    explainsArr[index] = "איפה אני גר?"
    var QHouses = [];
    var AHouses = [];
    for (var i = 0; i < 12; i++) {
        var temp = document.createElement("img");
        temp.setAttribute("src", "../pictures/house/" + (i + 1) + ".png");
        temp.setAttribute("class", "picturesInWindows");
        QHouses[i] = temp;
        var temp2 = document.createElement("img");
        temp2.setAttribute("src", "../pictures/house/" + (i + 1) + ".JPG");
        temp2.setAttribute("class", "picturesInWindows");
        AHouses[i] = temp2;
    }
    questionsArr[index] = QHouses;
    answersArr[index] = AHouses;
}