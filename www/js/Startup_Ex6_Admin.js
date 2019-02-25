////////////
//need a question variable to be available to all functions
//set up a question object to contain answerCanvas and QuestionCanvas
    question = new Question();

//set up a dummy currentQuestions variable to deal with changes made for Single Page Application in the handleStart methods
//we will just add the single question above as we are only creating that one full question
    var currentQuestions = [];
    currentQuestions.push(question);

    var preImageMirrorCanvasId = "isometricPreImageMirrorEx6";
    
    //create a new canvasObject for the mirror canvas
    
    var mirrorCanvasObject = new CanvasObject(preImageMirrorCanvasId);
    drawDots(mirrorCanvasObject);

function startup() {
    
    //set up button to write question object to JSON
    var writeToJSONButton = document.getElementById("writeToJSONButton");
    writeToJSONButton.onclick = function() {writeToJSON(question)};
    
    var isometricCanvasIds = ["isometricEx6"];
    var preImageCanvasIds = ["isometricPreImageEx6"];
    
    
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
    
    //create a new CanvasObject for each isometric canvas and add to the Question object's questionCanvas array
    for (var i = 0; i < preImageCanvasIds.length; i++){
        var canvasObj = new CanvasObject(preImageCanvasIds[i]);
        //draw isometric grid dots on the canvas
        drawDots(canvasObj);
        setUpButtonsIsometricMirror(canvasObj);
        question.questionCanvas.push(canvasObj);
        var canvasElement = document.getElementById(question.questionCanvas[i].canvasId); 
        enableTouchMirror(canvasElement, mirrorCanvasObject);
    
       /* var inputArray = [[1, 5, 3, 3, "solid"],
                    [3, 3, 5, 5, "solid"],
                    [5, 5, 3, 7, "solid"],
                    [3, 7, 1, 5, "solid"],
                    [1, 5, 1, 9, "solid"],
                    [1, 9, 3, 11, "solid"],
                    [3, 7, 3, 11, "solid"],
                    [3, 11, 5, 9, "solid"],
                    [5, 9, 5, 5, "solid"],];
    
        createAnswerFromArray(question.questionCanvas[i], inputArray);
        drawLines(question.questionCanvas[i], question.questionCanvas[i].correctAnswer);
        */
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
    
}

function setUpButtonsIsometricMirror(canvasObject) { //perhaps set up as question is a better name for function
    
    //configure isometric button onlick events
    document.getElementById(canvasObject.canvasId + "UndoButton").onclick = function() {undoLineMirror(canvasObject, mirrorCanvasObject)};
    document.getElementById(canvasObject.canvasId + "ClearButton").onclick = function() {clearLinesMirror(canvasObject, mirrorCanvasObject)};
    
    var solidButton = document.getElementById(canvasObject.canvasId + "SolidButton");
    var dashedButton = document.getElementById(canvasObject.canvasId + "DashedButton");
    solidButton.onclick = function() {drawSolidLine(canvasObject, solidButton, dashedButton)};
    dashedButton.onclick = function() {drawDashedLine(canvasObject, dashedButton, solidButton)};
    
    var answer = canvasObject.canvasId + "Answer";
    
    var checkAnswerButton = document.getElementById(canvasObject.canvasId + "CheckAnswerButton");
    checkAnswerButton.onclick = function () {checkAnswer(canvasObject, answer)};
    
    var frontLeftButton = document.getElementById(canvasObject.canvasId + "FrontLeftButton");
    var frontRightButton = document.getElementById(canvasObject.canvasId + "FrontRightButton");
    
}

function undoLineMirror(canvasObject, mirrorCanvasObject){
    undoLine(canvasObject);
    undoLine(mirrorCanvasObject);
}

function clearLinesMirror(canvasObject, mirrorCanvasObject){
    clearLines(canvasObject);
    clearLines(mirrorCanvasObject);
}

function drawSolidLine(canvasObject, pressedButton, secondButton) {
    canvasObject.dashed = false;
    mirrorCanvasObject.dashed = false;
    pressedButton.style.borderStyle = "inset";
    secondButton.style.borderStyle = "";  
}

function drawDashedLine(canvasObject, pressedButton, secondButton) {
    canvasObject.dashed = true;
    mirrorCanvasObject.dashed = true;
    pressedButton.style.borderStyle = "inset";
    secondButton.style.borderStyle = "";  
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
