//touch functionality used by the admin html pages, with separate touch for Isometric and Orthographic grids
//the functions below have been created with help from the Mozilla Developer Network Canvas Totorials https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial

//The functions below are using native JavaScript to handle touch events and disable them but this would probably be easier with JQuery as shown and described in AddTouch.js
//As a result of using native JavaScript with anonymous functions, a method suggested by user Sudipta Kumar Maiti on stackoverflow was used to help remove event listeners: https://stackoverflow.com/questions/33786630/removeeventlistener-and-anonymous-function-with-arguments

//The functions below as they are, are indebted to the tutorials mentioned aboved from the Mozilla Developer Network with some of the later functions from this website stored at the bottom of this page even though they are not currently used as they could be modified and made use of at a later date.

/////NEED SOME REFERENCE TO TOUCHES//////////////
//keep track of touches in progress
var ongoingTouches = [];


//////ISOMETRIC TOUCH FUNCTIONS/////////////////

function enableTouch(canvas) {
    //this enables touch for the canvas object
    canvas.addEventListener("touchstart", handleStart, false);
    canvas.addEventListener("touchend", handleEnd, false);
    canvas.addEventListener("touchcancel", handleCancel, false);
    canvas.addEventListener("touchmove", handleMove, false);
}
    
function disableTouch(canvas) {
    //this disables touch for the canvas object
    canvas.removeEventListener("touchstart", handleStart, false);
    canvas.removeEventListener("touchend", handleEnd, false);
    canvas.removeEventListener("touchcancel", handleCancel, false);
    canvas.removeEventListener("touchmove", handleMove, false);
}

//function to handleStart during an exercise or question
//touch will only take place on answerCanvas
function handleStart(evt) { 
    //prevent mouseclick being processed too
    evt.preventDefault(); 
    //get the id of the touched canvas
    var targetId = evt.targetTouches[0].target.id;
    //find the corresponding canvasObject for the touched canvas
    var currentCanvasObject;
    //check if touch is on an answer canvas
    for (var i = 0; i < question.answerCanvas.length; i++ ){
        if(question.answerCanvas[i].canvasId == targetId){
            currentCanvasObject = question.answerCanvas[i];
        }
    }
    //necessary to check if touch is actually on a question canvas (only for ADMIN)
    if (currentCanvasObject == undefined){
        for (var i = 0; i < question.questionCanvas.length; i++ ){
            if(question.questionCanvas[i].canvasId == targetId){
            currentCanvasObject = question.questionCanvas[i];
            }
        }
    }
    //track ongoing touches
    var touches = evt.changedTouches;   
    for (var i = 0; i < touches.length; i++) {
        ongoingTouches.push(copyTouch(touches[i]));
        //find the x and y offsets of the canvas from top left of screen
        var xOffSet = $("#" + currentCanvasObject.canvasId).offset().left;
        var yOffSet = $("#" + currentCanvasObject.canvasId).offset().top;
        //pass to logic to help determine whether to add touch, and possibly a line
        addPoint(touches[i].pageX - xOffSet, touches[i].pageY - yOffSet, currentCanvasObject);
    }
}

//////ORTHOGRAPHIC TOUCH FUNCTIONS/////////////////

function enableTouchOrth(canvas) {
    //this enables touch for the canvas object
    canvas.addEventListener("touchstart", handleStartOrth, false);
    canvas.addEventListener("touchend", handleEnd, false);
    canvas.addEventListener("touchcancel", handleCancel, false);
    canvas.addEventListener("touchmove", handleMove, false);
}
    
function disableTouchOrth(canvas) {
    //this disables touch for the canvas object
    canvas.removeEventListener("touchstart", handleStartOrth, false);
    canvas.removeEventListener("touchend", handleEnd, false);
    canvas.removeEventListener("touchcancel", handleCancel, false);
    canvas.removeEventListener("touchmove", handleMove, false);
}

//function to handleStart during an exercise or question
//touch will only take place on answerCanvas
function handleStartOrth(evt) { 
    //prevent mouseclick being processed too
    evt.preventDefault(); 
    //get the id of the touched canvas
    var targetId = evt.targetTouches[0].target.id;
    //find the corresponding canvasObject for the touched canvas
    var currentCanvasObject;
    //check if touch is on an answer canvas
    for (var i = 0; i < question.answerCanvas.length; i++ ){
        if(question.answerCanvas[i].canvasId == targetId){
            currentCanvasObject = question.answerCanvas[i];
        }
    }
    //necessary to check if touch is actually on a question canvas (only for ADMIN)
    if (currentCanvasObject == undefined){
        for (var i = 0; i < question.questionCanvas.length; i++ ){
            if(question.questionCanvas[i].canvasId == targetId){
            currentCanvasObject = question.questionCanvas[i];
            }
        }
    }
    //track ongoing touches
    var touches = evt.changedTouches;   
    for (var i = 0; i < touches.length; i++) {
        ongoingTouches.push(copyTouch(touches[i]));
        //find the x and y offsets of the canvas from top left of screen
        var xOffSet = $("#" + currentCanvasObject.canvasId).position().left;
        var yOffSet = $("#" + currentCanvasObject.canvasId).position().top;
        //pass to logic to help determine whether to add touch, and possibly a line
        addPointOrth(touches[i].pageX - xOffSet, touches[i].pageY - yOffSet, currentCanvasObject);
    }
}


//////OTHER TOUCH FUNCTIONS//////////////////////

//variable to help remove eventlisteners with anonymous functions as described by by user Sudipta Kumar Maiti on stackoverflow: https://stackoverflow.com/questions/33786630/removeeventlistener-and-anonymous-function-with-arguments
var myAnonymous = null

function enableTouchText(canvas, text, rotation) {
    //we have to disable drawing lines on the canvas while we add text (only isometric)
    disableTouch(canvas);
    //this enables touch for the canvas object and sets it to handle placing text with touch
    canvas.addEventListener("touchstart", function(evt){myAnonymous = arguments.callee; handleStartText(evt, text,rotation);}, false);
}
    
function disableTouchText(canvas, text, rotation) {
    //this disables touch for the canvas object in terms of placing text
    canvas.removeEventListener("touchstart", myAnonymous);
    //deselect the adding text buttons
    disableDrawText();
    //we have to then enable the drawing of lines again (only isometric)
    enableTouch(canvas);
}

function enableTouchAxes(canvas, axis, axisLabel) {
    //we have to disable drawing lines on the canvas while we add axis (only isometric)
    disableTouch(canvas);
    //this enables touch for the canvas object and sets it to handle placing axis with touch
    canvas.addEventListener("touchstart", function(evt){myAnonymous = arguments.callee; handleStartAxes(evt, axis, axisLabel);}, false);
}
    
function disableTouchAxes(canvas, axis, axisLabel) {
    //this disables touch for the canvas object in terms of placing axes
    canvas.removeEventListener("touchstart", myAnonymous);
    //deselect the adding axes buttons
    disableDrawAxes();
    //we have to then enable the drawing of lines again (only isometric)
    enableTouch(canvas);
}

function enableTouchTrails(canvas, axis) {
    //we have to disable drawing lines on the canvas while we add trail (only isometric)
    disableTouch(canvas);
    //this enables touch for the canvas object and sets it to handle placing trail with touch
    canvas.addEventListener("touchstart", function(evt){myAnonymous = arguments.callee; handleStartTrails(evt, axis);}, false);
}
    
function disableTouchTrails(canvas, axis) {
    //this disables touch for the canvas object in terms of placing trails
    canvas.removeEventListener("touchstart", myAnonymous);
    //deselect the adding trail buttons
    disableDrawTrails();
    //we have to then enable the drawing of lines again (only isometric)
    enableTouch(canvas);
}

function enableTouchMirror(canvas, mirrorCanvasObject) {
    //this enables touch for the canvas object and sets it to handle touch and mirrors on other canvas
    canvas.addEventListener("touchstart", function(evt){myAnonymous = arguments.callee; handleStartMirror(evt, mirrorCanvasObject);}, false);
}
    
function disableTouchMirror(canvas, axis) {
    //this disables touch for the canvas object in terms of placing trails
    canvas.removeEventListener("touchstart", myAnonymous);
}

//function to handleStartText - i.e. when placing some text on the canvas
function handleStartText(evt, text, rotation) { 
    //prevent mouseclick being processed too
    evt.preventDefault(); 
    //get the id of the touched canvas
    var targetId = evt.targetTouches[0].target.id;
    //find the corresponding canvasObject for the touched canvas
    var currentCanvasObject;
    //check if touch is on an answer canvas
    for (var i = 0; i < question.answerCanvas.length; i++ ){
        if(question.answerCanvas[i].canvasId == targetId){
            currentCanvasObject = question.answerCanvas[i];
        }
    }
    //necessary to check if touch is actually on a question canvas (only for ADMIN)
    if (currentCanvasObject == undefined){
        for (var i = 0; i < question.questionCanvas.length; i++ ){
            if(question.questionCanvas[i].canvasId == targetId){
            currentCanvasObject = question.questionCanvas[i];
            }
        }
    }
    //track ongoing touches
    var touches = evt.changedTouches;   
    for (var i = 0; i < touches.length; i++) {
        ongoingTouches.push(copyTouch(touches[i]));
        //find the x and y offsets of the canvas from top left of screen
        var xOffSet = $("#" + currentCanvasObject.canvasId).position().left;
        var yOffSet = $("#" + currentCanvasObject.canvasId).position().top;
        //pass to logic to help determine whether to add touch, and possibly a line
        addGridText(currentCanvasObject, touches[i].pageX - xOffSet, touches[i].pageY - yOffSet, text, rotation);
    }
    //remove the event listener when first touch has completed
    var canvasElement = document.getElementById(targetId);
    disableTouchText(canvasElement, text, rotation);
}

//function to handleStartText - i.e. when placing some text on the canvas
function handleStartAxes(evt, axis, axisLabel) { 
    //prevent mouseclick being processed too
    evt.preventDefault(); 
    //get the id of the touched canvas
    var targetId = evt.targetTouches[0].target.id;
    //find the corresponding canvasObject for the touched canvas
    var currentCanvasObject;
    //check if touch is on an answer canvas
    for (var i = 0; i < question.answerCanvas.length; i++ ){
        if(question.answerCanvas[i].canvasId == targetId){
            currentCanvasObject = question.answerCanvas[i];
        }
    }
    //necessary to check if touch is actually on a question canvas (only for ADMIN)
    if (currentCanvasObject == undefined){
        for (var i = 0; i < question.questionCanvas.length; i++ ){
            if(question.questionCanvas[i].canvasId == targetId){
            currentCanvasObject = question.questionCanvas[i];
            }
        }
    }
    //track ongoing touches
    var touches = evt.changedTouches;   
    for (var i = 0; i < touches.length; i++) {
        ongoingTouches.push(copyTouch(touches[i]));
        //find the x and y offsets of the canvas from top left of screen
        var xOffSet = $("#" + currentCanvasObject.canvasId).position().left;
        var yOffSet = $("#" + currentCanvasObject.canvasId).position().top;
        //pass to logic to help determine whether to add touch, and possibly a line
        addGridAxis(currentCanvasObject, touches[i].pageX - xOffSet, touches[i].pageY - yOffSet, axis, axisLabel);
    }
    //remove the event listener when first touch has completed
    var canvasElement = document.getElementById(targetId);
    disableTouchAxes(canvasElement, axis, axisLabel);
}

//function to handleStartTrails - i.e. when placing trails on the canvas
function handleStartTrails(evt, axis) { 
    //prevent mouseclick being processed too
    evt.preventDefault(); 
    //get the id of the touched canvas
    var targetId = evt.targetTouches[0].target.id;
    //find the corresponding canvasObject for the touched canvas
    var currentCanvasObject;
    //check if touch is on an answer canvas
    for (var i = 0; i < question.answerCanvas.length; i++ ){
        if(question.answerCanvas[i].canvasId == targetId){
            currentCanvasObject = question.answerCanvas[i];
        }
    }
    //necessary to check if touch is actually on a question canvas (only for ADMIN)
    if (currentCanvasObject == undefined){
        for (var i = 0; i < question.questionCanvas.length; i++ ){
            if(question.questionCanvas[i].canvasId == targetId){
            currentCanvasObject = question.questionCanvas[i];
            }
        }
    }
    //track ongoing touches
    var touches = evt.changedTouches;   
    for (var i = 0; i < touches.length; i++) {
        ongoingTouches.push(copyTouch(touches[i]));
        //find the x and y offsets of the canvas from top left of screen
        var xOffSet = $("#" + currentCanvasObject.canvasId).position().left;
        var yOffSet = $("#" + currentCanvasObject.canvasId).position().top;
        //pass to logic to help determine whether to add touch, and possibly a line
        addGridTrails(currentCanvasObject, touches[i].pageX - xOffSet, touches[i].pageY - yOffSet, axis);
    }
    //remove the event listener when first touch has completed
    var canvasElement = document.getElementById(targetId);
    disableTouchTrails(canvasElement, axis);
}

//function to handleStart during a mirror admin
//touch will only take place on question and mirror Canvas
function handleStartMirror(evt, mirrorCanvasObject) { 
    //prevent mouseclick being processed too
    evt.preventDefault(); 
    //get the id of the touched canvas
    var targetId = evt.targetTouches[0].target.id;
    //find the corresponding canvasObject for the touched canvas
    var currentCanvasObject;
    //check if touch is on an answer canvas
    for (var i = 0; i < question.answerCanvas.length; i++ ){
        if(question.answerCanvas[i].canvasId == targetId){
            currentCanvasObject = question.answerCanvas[i];
        }
    }
    //necessary to check if touch is actually on a question canvas (only for ADMIN)
    if (currentCanvasObject == undefined){
        for (var i = 0; i < question.questionCanvas.length; i++ ){
            if(question.questionCanvas[i].canvasId == targetId){
            currentCanvasObject = question.questionCanvas[i];
            }
        }
    }
    //track ongoing touches
    var touches = evt.changedTouches;   
    for (var i = 0; i < touches.length; i++) {
        ongoingTouches.push(copyTouch(touches[i]));
        //find the x and y offsets of the canvas from top left of screen
        var xOffSet = $("#" + currentCanvasObject.canvasId).offset().left;
        var yOffSet = $("#" + currentCanvasObject.canvasId).offset().top;
        //pass to logic to help determine whether to add touch, and possibly a line
        addPoint(touches[i].pageX - xOffSet, touches[i].pageY - yOffSet, currentCanvasObject);
        //add the same touches to the mirror canvas to help with admin
        addPoint(touches[i].pageX - xOffSet, touches[i].pageY - yOffSet, mirrorCanvasObject);
    }
}

////////The following functions are directly from the Mozilla Developer Network Tutorial https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/////////////////

//////////Not Currently used but template left here in case necessary/////////
function handleMove(evt) {
  evt.preventDefault();

  var touches = evt.changedTouches;

  for (var i = 0; i < touches.length; i++) {
    var idx = ongoingTouchIndexById(touches[i].identifier); 

    if (idx >= 0) {
      ongoingTouches.splice(idx, 1, copyTouch(touches[i]));  // swap in the new touch record
    } else {
    
    }
  }
}

///////////Not Currently used but template left here in case necessary//////////        
function handleEnd(evt) {
  evt.preventDefault();

  var touches = evt.changedTouches;

  for (var i = 0; i < touches.length; i++) {
   
    var idx = ongoingTouchIndexById(touches[i].identifier); 

    if (idx >= 0) {
        ongoingTouches.splice(idx, 1); //remove
    } else {
     
    }
  }
}

////////////Not Currently used but template left here in case necessary//////////
function handleCancel(evt) {
  evt.preventDefault();

  var touches = evt.changedTouches;
  
  for (var i = 0; i < touches.length; i++) {
    var idx = ongoingTouchIndexById(touches[i].identifier);  
    ongoingTouches.splice(idx, 1);  //remove
  }
}
        
////////////////The following are convenience functions////////////////////////////
        
//Some browsers (e.g. mobile Safari) reuse touch objects between events, so it's best to copy the bits you care about, rather than referencing the entire object.    
function copyTouch(touch) {
  return { identifier: touch.identifier, pageX: touch.pageX, pageY: touch.pageY };
}
        
//The ongoingTouchIndexById() function below scans through the ongoingTouches array to find the touch matching the given identifier, then returns that touch's index into the array.      
function ongoingTouchIndexById(idToFind) {
  for (var i = 0; i < ongoingTouches.length; i++) {
    var id = ongoingTouches[i].identifier;
    
    if (id == idToFind) {
      return i;
    }
  }
  return -1;    // not found
}