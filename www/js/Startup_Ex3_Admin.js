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
    
    var isometricCanvasIds = ["isometricEx3"];
    var preImageCanvasIds = ["isometricPreImageEx3"];
    var rotationCanvasIds = ["rotationsEx3"];
    
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
        setUpButtonsIsometric(canvasObj);
        setUpButtonsBlankAxes(canvasObj);
        setUpButtonsAxisTrails(canvasObj);
        question.questionCanvas.push(canvasObj);
        var canvasElement = document.getElementById(question.questionCanvas[i].canvasId); 
        enableTouch(canvasElement);
       
    } 
    //create a new CanvasObject for each rotation canvas and add to the Question object's rotationCanvas array
    for (var i = 0; i < rotationCanvasIds.length; i++){
        var canvasObj = new RotationCanvas(rotationCanvasIds[i]);
        //clear the rotation canvas
        clearNumericRotations(canvasObj);
        setUpButtonsNumeric(canvasObj);
        question.rotationCanvas.push(canvasObj);        
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

function setUpButtonsBlankAxes(canvasObject){
    
    document.getElementById(canvasObject.canvasId + "UndoAxisButton").onclick = function() {undoAxis(canvasObject)};
    document.getElementById(canvasObject.canvasId + "ClearAxesButton").onclick = function() {clearAxes(canvasObject)};
    
    var xAxisButton = document.getElementById(canvasObject.canvasId + "xAxis");
    var yAxisButton = document.getElementById(canvasObject.canvasId + "yAxis");
    var zAxisButton = document.getElementById(canvasObject.canvasId + "zAxis");
    xAxisButton.onclick = function() {enableDrawAxes(canvasObject, axisStringX, axisLabelBlank, xAxisButton, yAxisButton, zAxisButton)};
    yAxisButton.onclick = function() {enableDrawAxes(canvasObject, axisStringY, axisLabelBlank, yAxisButton, xAxisButton, zAxisButton)};
    zAxisButton.onclick = function() {enableDrawAxes(canvasObject, axisStringZ, axisLabelBlank, zAxisButton, xAxisButton, yAxisButton)};
}

function setUpButtonsAxisTrails(canvasObject){
    
    document.getElementById(canvasObject.canvasId + "UndoTrailButton").onclick = function() {undoTrail(canvasObject)};
    document.getElementById(canvasObject.canvasId + "ClearTrailsButton").onclick = function() {clearTrails(canvasObject)};
    
    var xTrailButton = document.getElementById(canvasObject.canvasId + "xTrail");
    var yTrailButton = document.getElementById(canvasObject.canvasId + "yTrail");
    var zTrailButton = document.getElementById(canvasObject.canvasId + "zTrail");
    xTrailButton.onclick = function() {enableDrawTrails(canvasObject, trailStringX, xTrailButton, yTrailButton, zTrailButton)};
    yTrailButton.onclick = function() {enableDrawTrails(canvasObject, trailStringY, yTrailButton, xTrailButton, zTrailButton)};
    zTrailButton.onclick = function() {enableDrawTrails(canvasObject, trailStringZ, zTrailButton, xTrailButton, yTrailButton)};
}

function setUpButtonsNumeric(canvasObject) { //perhaps set up as question is a better name for function
    
    //configure isometric button onlick events
    document.getElementById(canvasObject.canvasId + "UndoButton").onclick = function() {undoNumericRotation(canvasObject)};
    document.getElementById(canvasObject.canvasId + "ClearButton").onclick = function() {clearNumericRotations(canvasObject)};
    
    var pos90Button = document.getElementById("pos90");
    var pos180Button = document.getElementById("pos180");
    var pos270Button = document.getElementById("pos270");
    var neg90Button = document.getElementById("neg90");
    var neg180Button = document.getElementById("neg180");
    var neg270Button = document.getElementById("neg270");
    pos90Button.onclick = function() {addNumericRotation(canvasObject, "+90")};
    pos180Button.onclick = function() {addNumericRotation(canvasObject, "+180")};
    pos270Button.onclick = function() {addNumericRotation(canvasObject, "+270")};
    neg90Button.onclick = function() {addNumericRotation(canvasObject, "-90")};
    neg180Button.onclick = function() {addNumericRotation(canvasObject, "-180")};
    neg270Button.onclick = function() {addNumericRotation(canvasObject, "-270")};    
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

function enableDrawAxes(canvasObject, axis, axisLabel, pressedButton, secondButton, thirdButton) {
    var canvasElement = document.getElementById(canvasObject.canvasId);
    enableTouchAxes(canvasElement, axis, axisLabel);
    pressedButton.style.borderStyle = "inset";
    secondButton.style.borderStyle = ""; 
    secondButton.style.borderStyle = "";
}

function disableDrawAxes() {
    var buttonElements = document.getElementsByClassName("axisButtons");
        for(var i = 0; i < buttonElements.length; i++){
            buttonElements[i].style.borderStyle = "";  
        }
}

function enableDrawTrails(canvasObject, axis, pressedButton, secondButton, thirdButton) {
    var canvasElement = document.getElementById(canvasObject.canvasId);
    enableTouchTrails(canvasElement, axis);
    pressedButton.style.borderStyle = "inset";
    secondButton.style.borderStyle = ""; 
    secondButton.style.borderStyle = "";
}

function disableDrawTrails() {
    var buttonElements = document.getElementsByClassName("trailButtons");
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
