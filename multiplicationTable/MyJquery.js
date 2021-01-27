$(document).ready(function () {
    //יצירת לוח הכפל
    var table = $("#multiplicationTable");
    var row2add = "";

    for (var x = 1; x <= 10; x++) {
        row2add = "<tr>";

        for (var y = 1; y <= 10; y++) {
            row2add += "<td>" + x * y + "</td>";
        }
        row2add += "</tr>";

        table.append(row2add);
    }
    var duringStudy = false;
    var tdstudy;
    var firstLine;
    var studyLine;
    var study=true;

  //ללמידה פונקציית ההבהוב
    $("#send").click(function () {
        study = true;
        if (duringStudy)
            return;
        duringStudy = true;
       
        var num = $("input").val() - 1;
        if (num < 0||num>9){
            alert("הקש מספר תקין");
            return;
        }

        s = $("#amount").val();
        speed = (1 / s * 1000);
        firstLine = $("tr").children();
        studyLine = $("tr").eq(num).children();
        tdstudy = studyLine.eq(0);
        var index=1;
        setTimeout(function () { guide(index); }, speed);
        function guide(i) {
            if (study) {
                s = $("#amount").val();
                speed = (1 / s * 1000);
            setTimeout(function () { tdstudy.animate({ border: "solid #af1c1c",  backgroundColor: "#af1c1c" }, speed); }, 0);
            setTimeout(function () { firstLine.eq(i).animate({ border: "solid #af1c1c", backgroundColor: "#af1c1c" }, speed); }, speed);
            setTimeout(function () { studyLine.eq(i).animate({ border: "solid #FFEB3B", backgroundColor: "yellow", color: "black" }, speed); }, speed * 2);
            //חזרה לצבע המקורי
            setTimeout(function () {   tdstudy.animate({ border: "solid transparent", backgroundColor: "#030804" });
            firstLine.eq(i).animate({ border: "solid transparent", backgroundColor: "#030804" });
            studyLine.eq(i).animate({ border: "solid transparent", backgroundColor: "transparent", color: "white" });
            }, speed * 4);
            if(i<9)
                setTimeout(function () { guide(i + 1); }, speed * 4.5);
            }
        }
        //לאפשר לו ללמוד עוד
        setTimeout(function () { duringStudy = false; },speed*40.5);
    });
    $(function () {
        $("#tabs").tabs();
    });

    //בר מהירות
    $(function () {
        $("#slider").slider({
            //range: "min",
            value: 5,
            min: 1,
            max: 10,
            slide: function (event, ui) {
                $("#amount").val(ui.value);
            }
        });
        $("#amount").val($("#slider").slider("value"));
    });
    $("#a2").click(function () {
        study = false;
                 exersizes();
     
    });
    $("#a1").click(function () {
        study = true;
        

    });
    $("#stop").click(function () {
        study = false;
        duringStudy = false;
    });
    var x, y;
    var find = false;
    function exersizes() {
        rand();
        $("#exer").text(x + " * " + y + " = ");

        if (!find)
            setTimeout(exersizes, 9000);
    }
    function rand() {
        x = Math.floor((Math.random() * 10) + 1);
        y = Math.floor((Math.random() * 10) + 1);
    }

 //drag
    function drag() {
        if (cell.text() != x * y)
        { }
        else {
            cell.draggable({ helper: 'clone' });
            $("#exer").droppable({
                drop: function (event, ui) {
                    $("#exer").text($("#exer").text() + ui.draggable.text());

                }
            });

        }
    };

    $("#exer").droppable({
        drop: function (event, ui) {
            flag = false;
            if (ui.draggable.text() == x * y) {
                $("#exer").text($("#exer").text() + ui.draggable.text());
                dialo(help);

            }
            else dialo(-1);
        }
    });
    $("td").draggable({ revert: true });


    function dialo(he) {
        if (he != -1) {
            $('<div></div>').dialog({
                modal: true,
                title: "very good!",
                open: function () {
                    var foo = $(this);
                    setTimeout(function () {
                        foo.dialog('close');
                    }, 2000);
                    var markup = 'very good! num of clues:    ' + he;
                    $(this).html(markup);
                },
                close: function () {
                    $(this).dialog("close");
                    location.reload();
                },
            });
        }
        else {
            $('<div></div>').dialog({
                modal: true,
                title: "sorry...",

                open: function () {
                    var markup = 'very bad!';
                    $(this).html(markup);
                },

                buttons: {
                    answer: function () {
                        var table = $("#table")[0];
                        var cell1 = table.rows[x - 1].cells[0];
                        var $cell1 = $(cell1);
                        var cell2 = table.rows[0].cells[y - 1];
                        var $cell2 = $(cell2);
                        var cell3 = table.rows[x - 1].cells[y - 1];
                        var $cell3 = $(cell3);
                        $(this).dialog("close");
                        $cell1.animate({ outline: "solid" });
                        $cell2.animate({ outline: "solid" });
                        $cell3.animate({ outline: "solid" });
                        setTimeout(func, 1500);

                    },

                    study: function () {
                        $(this).dialog("close");
                        $("#a1").trigger("click");
                        $("#selectNum").val(x);
                        $("#send").trigger("click");

                    },
                }
            });

        }


    }
    
});

