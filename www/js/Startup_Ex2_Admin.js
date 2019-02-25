////////////
//need a question variable to be available to all functions
//set up a question object to contain answerCanvas and QuestionCanvas
    question = new Question();

//set up a dummy currentQuestions variable to deal with changes made for Single Page Application in the handleStart methods
//we will just add the single question above as we are only creating that one full question
    var currentQuestions = [];
    currentQuestions.push(question);

function startup() {
    
    //set up button to write question object to JSON
    var writeToJSONButton = document.getElementById("writeToJSONButton");
    writeToJSONButton.onclick = function() {writeToJSON(question)};
    
    var isometricCanvasIds = ["isometricEx2"];
    var orthCanvasIds = ["orthographicTopEx2", "orthographicFrontEx2", "orthographicSideEx2"];
    
    //create a new CanvasObject for each isometric canvas and add to the Question object's answerCanvas array
    for (var i = 0; i < isometricCanvasIds.length; i++){
        var canvasObj = new CanvasObject(isometricCanvasIds[i]);
        //draw isometric grid dots on the canvas
        drawDots(canvasObj);
        setUpButtonsIsometric(canvasObj);
        question.answerCanvas.push(canvasObj);
        var canvasElement = document.getElementById(question.answerCanvas[i].canvasId); 
        enableTouch(canvasElement);
        
    } 
    
    //create a new CanvasObject for each orthographic canvas and add to the Question object's questionCanvas array
    for (var i = 0; i < orthCanvasIds.length; i++){
        var canvasObj = new CanvasObject(orthCanvasIds[i]);
        //draw orthographic grid dots on the canvas
        drawDotsOrth(canvasObj);
        setUpButtonsOrth(canvasObj);
        question.questionCanvas.push(canvasObj);
        var canvasElement = document.getElementById(question.questionCanvas[i].canvasId); 
        enableTouchOrth(canvasElement);
       
    }    
}

function setUpButtonsIsometric(canvasObject) { //perhaps set up as question is a better name for function
    
    //configure isometric button onlick events
    document.getElementById(canvasObject.canvasId + "UndoButton").onclick = function() {undoLine(canvasObject)};
    document.getElementById(canvasObject.canvasId + "ClearButton").onclick = function() {clearLines(canvasObject)};
    
    var solidButton = document.getElementById(canvasObject.canvasId + "SolidButton");
    var dashedButton = document.getElementById(canvasObject.canvasId + "DashedButton");
    solidButton.onclick = function() {drawSolidLine(canvasObject, solidButton, dashedButton)};
    dashedButton.onclick = function() {drawDashedLine(canvasObject, dashedButton, solidButton)};
    
    var answer = canvasObject.canvasId + "Answer";
    
    var checkAnswerButton = document.getElementById(canvasObject.canvasId + "CheckAnswerButton");
    checkAnswerButton.onclick = function () {checkAnswer(canvasObject, answer)};
    
    var frontLeftButton = document.getElementById(canvasObject.canvasId + "FrontLeftButton");
    var frontRightButton = document.getElementById(canvasObject.canvasId + "FrontRightButton");
    frontLeftButton.onclick = function (){enableDrawText(canvasObject, textFront, textSlopeDownToTheRightAngle, frontLeftButton, frontRightButton)};
    frontRightButton.onclick = function (){enableDrawText(canvasObject, textFront, textSlopeUpToRightAngle, frontRightButton, frontLeftButton)};
    
    var undoFrontButton = document.getElementById(canvasObject.canvasId + "UndoFrontButton");
    undoFrontButton.onclick = function (){undoText(canvasObject)};
}

function setUpButtonsOrth(canvasObject) { //perhaps set up as answer is a better name for function
    
    
    //configure isometric button onlick events
    document.getElementById(canvasObject.canvasId + "UndoButton").onclick = function() {undoLineOrth(canvasObject)};
    document.getElementById(canvasObject.canvasId + "ClearButton").onclick = function() {clearLinesOrth(canvasObject)};
    
    var orthographicSolidButton = document.getElementById(canvasObject.canvasId + "SolidButton");
    var orthographicDashedButton = document.getElementById(canvasObject.canvasId + "DashedButton");
    orthographicSolidButton.onclick = function() {drawSolidLine(canvasObject, orthographicSolidButton, orthographicDashedButton)};
    orthographicDashedButton.onclick = function() {drawDashedLine(canvasObject, orthographicDashedButton, orthographicSolidButton)};
    
    var orthographicAnswer = canvasObject.canvasId + "Answer";
    
    var orthographicCheckAnswerButton = document.getElementById(canvasObject.canvasId + "CheckAnswerButton");
    orthographicCheckAnswerButton.onclick = function () {checkAnswerOrth(canvasObject, orthographicAnswer)};
    
}


function drawSolidLine(canvasObject, pressedButton, secondButton) {
    canvasObject.dashed = false;
    pressedButton.style.borderStyle = "inset";
    secondButton.style.borderStyle = "";  
}

function drawDashedLine(canvasObject, pressedButton, secondButton) {
    canvasObject.dashed = true;
    pressedButton.style.borderStyle = "inset";
    secondButton.style.borderStyle = "";  
}

function enableDrawText(canvasObject, text, rotation, pressedButton, secondButton) {
    var canvasElement = document.getElementById(canvasObject.canvasId);
    enableTouchText(canvasElement, text, rotation);
    pressedButton.style.borderStyle = "inset";
    secondButton.style.borderStyle = "";  
}

function disableDrawText() {
    var buttonElements = document.getElementsByClassName("textButtons");
        for(var i = 0; i < buttonElements.length; i++){
            buttonElements[i].style.borderStyle = "";  
        }
}

function writeToJSON(question){
    //Create a copy of the Question object so that we can modify this before outputting to JSON format
    
    var tempQuestion = JSON.parse(JSON.stringify(question));
    
    for (var i = 0; i < question.answerCanvas.length; i++){
        tempQuestion.answerCanvas[i].correctAnswer = tempQuestion.answerCanvas[i].linesCurrentlyDrawn;
        tempQuestion.answerCanvas[i].linesCurrentlyDrawn = [];
        tempQuestion.answerCanvas[i].tempLine = [];
        tempQuestion.answerCanvas[i].linesAllDrawn = []; 
        tempQuestion.answerCanvas[i].dashed = false; 
    }
    for (var i = 0; i < question.questionCanvas.length; i++){
        tempQuestion.questionCanvas[i].correctAnswer = tempQuestion.questionCanvas[i].linesCurrentlyDrawn;
        tempQuestion.questionCanvas[i].linesCurrentlyDrawn = [];
        tempQuestion.questionCanvas[i].tempLine = [];
        tempQuestion.questionCanvas[i].linesAllDrawn = []; 
        tempQuestion.questionCanvas[i].dashed = false; 
    }
    
    //write the Question object out to the textarea in JSON format
    document.getElementById("question").value = JSON.stringify(tempQuestion);
}
