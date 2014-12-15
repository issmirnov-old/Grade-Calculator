

// A $( document ).ready() block.
$( document ).ready(function() {

    // bind change detector to class selector
    $("#classSelector").change(function () {
        updateClasses();
    }).change();

});

function updateClasses() {
    // savePage();
    var className = $("#classSelector").val();
    //console.log(className);
    loadPage(); // will this cheat work?

    // extract json data if it exists, and populate the values in the divs

}


    function validate(evt) {
        //alert("validator called for: " + evt);
        var theEvent = evt || window.event;
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode( key );
        var regex = /[0-9]|\.|\//;   //var regex = /[0-9]|\./;
        if( !regex.test(key) ) {
            theEvent.returnValue = false;
            if(theEvent.preventDefault) theEvent.preventDefault();
        }
        savePage();
        //alert("save page was called from validator");
    }//end validator function



    function addElement(){ /*Adds a blank text input in each column*/
            //add category
            $('#categories').append(
                $('<li>').append(
                    $('<input>').attr({
                    type: 'text',
                    value: " ",
                    onkeyup: "javascript:savePage()",
                    })
                )
            );

            //add weight
            $('#weight').append(
                $('<li>').append(
                    $('<input>').attr({
                    type: 'text',
                    value: " ",
                    onkeyup: "javascript:validate(event)"
                    })
                )
            );

            //add score
            $('#myscore').append(
                $('<li>').append(
                    $('<input>').attr({
                    type: 'text',
                    value: " ",
                    onkeyup: "javascript:validate(event)"
                    })
                )
            );
        savePage();
    }//end addElement()

    function delElement(){
        $('#weight li:last-child').remove();
        $('#myscore li:last-child').remove();
        $('#categories li:last-child').remove();
    }// end delElement

    function clearSave(){
        //set ALL cookies, and have the expire date at -1
        var exdays = -1;
        setCookie("pageJSON","",exdays);
        setCookie("desiredGrade",$('#currentGrade').val(),exdays);
    }//end clearSave


    //cookie work
    function getCookie(c_name)
    {
        var i,x,y,ARRcookies=document.cookie.split(";");
        for (i=0;i<ARRcookies.length;i++)
        {
            x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
            y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
            x=x.replace(/^\s+|\s+$/g,"");
            if (x==c_name)
            {
                return unescape(y);
            }
        }
    }// end getCookie()

    function setCookie(c_name,value,exdays)
    {
        var exdate=new Date();
        exdate.setDate(exdate.getDate() + exdays);
        var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
        document.cookie=c_name + "=" + c_value;
    }// end setCookie()

    function savePage(){
        //create all three arrays

        // determine which class we are in
        var classNum = $("#classSelector").val();

        // make a json
        var pageString = getCookie("pageJSON");
        

        if (pageString == undefined ) {
            var page = {};
        } else {
            var page = JSON.parse(pageString);
        }
        
        page[classNum] = {};
        page[classNum]["weight"] = [];
        page[classNum]["score"] = [];
        page[classNum]["categories"] = [];
        page[classNum]["desiredGrade"] = $('#currentGrade').val();

        //populate arrays
            //loop and add category values to array
            $("ul#categories > li > input").each(function(index) {
                page[classNum]["categories"].push($(this).val());
            });

            //loop and add weight values to array
            $("ul#weight > li > input").each(function(index) {
                page[classNum]["weight"].push($(this).val());
            });

            //loop and add score values to array
            $("ul#myscore > li > input").each(function(index) {
                page[classNum]["score"].push($(this).val());
            });


        // save user defined name
        page[classNum]["name"] = $("#classSelector option:selected").text();

        // make json string
        var pageString = JSON.stringify(page);
        console.log(pageString);

        var exdays = 365;
        setCookie("pageJSON", pageString, exdays);
    }
    
    
    
    

    function loadPage(){

        // determine which class we are in
        var classNum = $("#classSelector").val();

        // get page info
        var pageString = getCookie("pageJSON");
        if (pageString == undefined ) {
            return;
        }
        // extract page data
        var page = JSON.parse(pageString);
        // check if no saved data
        if (page[classNum] == undefined) {
            // load defaults
            loadDefaults();
            return;
        }
        
        //set desired grade back
        $('#currentGrade').attr('value', page[classNum]["desiredGrade"]);  
        
        // set class names back
        // 1. iterate over cookie, see what dicts are set
        for (var key in page) {
             var savedName = page[key]["name"];
             // inefficient way to loop through and set the names
             $('#classSelector option').each(function() {
                if ($(this).val() === key) {
                    $(this).text(savedName)
                }
              }); 
        } 
        
        // set user defined name back
        $("#classSelector option:selected").text(page[classNum]["name"]);


        // clear columns, add back headers
        $('#categories').empty();
        $('#weight').empty();
        $('#myscore').empty();
        $('#categories').append('<div class="header" id="categoriesHeader">Categories</div>');
        $('#weight').append('<div class="header" id="weightHeader">Weight (%)</div>');
        $('#myscore').append('<div class="header" id="myScoreHeader">My Score (decimals)</div>');

        //print arrays back to page
        for (i = 0; i < page[classNum]["score"].length; i++){
            //add category
            $('#categories').append(
                $('<li>').append(
                    $('<input>').attr({
                    type: 'text',
                    value: page[classNum]["categories"][i]
                    })
                )
            );

            //add weight
            $('#weight').append(
                $('<li>').append(
                    $('<input>').attr({
                    type: 'text',
                    value: page[classNum]["weight"][i],
                    onkeyup: "javascript:validate(event)"
                    })
                )
            );

            //add score
            $('#myscore').append(
                $('<li>').append(
                    $('<input>').attr({
                    type: 'text',
                    value: page[classNum]["score"][i],
                    onkeyup: "javascript:validate(event)"
                    })
                )
            );
        }///end for
    }//end loadPage



    function loadDefaults() {
         //clear columns, add headers
        $('#categories').empty();
        $('#weight').empty();
        $('#myscore').empty();
        $('#categories').append('<div class="header" id="categoriesHeader">Categories</div>');
        $('#weight').append('<div class="header" id="weightHeader">Weight (%)</div>');
        $('#myscore').append('<div class="header" id="myScoreHeader">My Score (decimals)</div>');
        
        var categoryConstants = ["Homework", "Attendance", "Quizzes", "Midterms", "Final"];
        var weightConstants = [20, 30, 50, "", "" ];
        var scoreConstants = [.9, 1, "", "", "" ];
        
        
        for (i = 0; i < categoryConstants.length; i++){
            //add category
            $('#categories').append(
                $('<li>').append(
                    $('<input>').attr({
                    type: 'text',
                    value: categoryConstants[i]
                    })
                )
            );

            //add weight
            $('#weight').append(
                $('<li>').append(
                    $('<input>').attr({
                    type: 'text',
                    value: weightConstants[i],
                    onkeyup: "javascript:validate(event)"
                    })
                )
            );

            //add score
            $('#myscore').append(
                $('<li>').append(
                    $('<input>').attr({
                    type: 'text',
                    value: scoreConstants[i],
                    onkeyup: "javascript:validate(event)"
                    })
                )
            );
        }///end for
        
        $('#currentGrade').attr('value', 90);
        
    }
    
    
    function renameClass() {
        var classIndex = $("#classSelector").val();
        var className =  $("#classSelector option:selected").text();
        
        var newName = prompt("Rename this class", className);
        if (newName != null) {
            $("#classSelector option:selected").text(newName);
        }
        
        savePage();
        
        // cookie is okay, but now also need to load and save the user defined names.
        
        
    
            
    }