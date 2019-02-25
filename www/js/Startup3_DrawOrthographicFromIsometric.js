////////////
//need a question variable to be available to all functions
//set up a question object to contain answerCanvas and QuestionCanvas
    //questionEx1 = new Question();

function setupQuestionEx1(exercise){
    
    //for each isometric question canvas (only 1 at the moment)
    for (var i = 0; i < exercise.questions[exercise.currentQuestion - 1].questionCanvas.length; i++){
        //draw dots on the isometric canvas
        drawDots(exercise.questions[exercise.currentQuestion - 1].questionCanvas[i]);
    
        //draw the question on the isometric canvas
        drawLines(exercise.questions[exercise.currentQuestion - 1].questionCanvas[i], exercise.questions[exercise.currentQuestion - 1].questionCanvas[i].correctAnswer);
    }
    
    //for each orthographic answer canvas (top, front and side)
    for (var i = 0; i < exercise.questions[exercise.currentQuestion - 1].answerCanvas.length; i++){
        //disable touch
        disableTouchOrth(document.getElementById(exercise.questions[exercise.currentQuestion - 1].answerCanvas[i].canvasId));
        
        //draw dots on the orthographic canvas
        drawDotsOrth(exercise.questions[exercise.currentQuestion - 1].answerCanvas[i]);
        
        //draw the currentLinesDrawn on the canvas
        drawLinesOrth(exercise.questions[exercise.currentQuestion - 1].answerCanvas[i], exercise.questions[exercise.currentQuestion - 1].answerCanvas[i].linesCurrentlyDrawn);
        
        //set up the buttons for each orthographic canvas
        setUpButtonsOrth(exercise.questions[exercise.currentQuestion - 1].answerCanvas[i]);
        
        //set up touch for the orthographic canvas
        enableTouchOrth(document.getElementById(exercise.questions[exercise.currentQuestion - 1].answerCanvas[i].canvasId));
        
        //clear any p tags with feedback
        clearPTags(exercise.questions[exercise.currentQuestion - 1].answerCanvas[i]);
        //set up labels for feedback, only required for this exercise
        setUpFeedback();
    }
    setUpQuestionNumber(exercise);
    setUpPreviousNextButtonsEx1(exercise);
    
    
}

function setUpQuestionNumber(exercise){
    var qNumPTag = document.getElementById("questionNumber" + exercise.name);
    qNumPTag.innerHTML = exercise.currentQuestion + " of " + exercise.questions.length;
}

function clearPTags(canvasObj){
    document.getElementById(canvasObj.canvasId + "Answer").innerHTML = "";
}

//only required for exercise 1 to differentiate between feedback
function setUpFeedback(){
    var topFeedback = document.getElementById("orthographicEx1FeedbackTop");
    var frontFeedback = document.getElementById("orthographicEx1FeedbackFront");
    var sideFeedback = document.getElementById("orthographicEx1FeedbackSide");
    
    topFeedback.innerHTML = "Top: ";
    topFeedback.style.visibility = "hidden";
    frontFeedback.innerHTML = "Front: ";
    frontFeedback.style.visibility = "hidden";
    sideFeedback.innerHTML = "Side: ";
    sideFeedback.style.visibility = "hidden";
    
    var checkButton = document.getElementById("Ex1CheckAnswerButton");
    checkButton.onclick = function () {provideFeedback()};
    
}

//only required for exercise 1 to differentiate between feedback
function provideFeedback(){
    var topFeedback = document.getElementById("orthographicEx1FeedbackTop");
    var frontFeedback = document.getElementById("orthographicEx1FeedbackFront");
    var sideFeedback = document.getElementById("orthographicEx1FeedbackSide");
    
    topFeedback.style.visibility = "visible";
    frontFeedback.style.visibility = "visible";
    sideFeedback.style.visibility = "visible";
    
    document.getElementById('orthographicTopEx1CheckAnswerButton').click();
    document.getElementById('orthographicFrontEx1CheckAnswerButton').click();
    document.getElementById('orthographicSideEx1CheckAnswerButton').click();
}

function setUpPreviousNextButtonsEx1(exercise){
    var previousButton = document.getElementById(exercise.name + "PreviousButton");
    var nextButton = document.getElementById(exercise.name + "NextButton");
    
    //if exercise.currentQuestion is greater than 1, show and set up previous button
    if(exercise.currentQuestion > 1){
        previousButton.style.visibility = "visible";
        previousButton.onclick = function () {loadPreviousEx1(exercise)};
    }
    else {
        previousButton.style.visibility = "hidden";
    }
    
    //if exerciseCurrentQuestion is less than exercis.currentQuestion, show and set up next button
    if(exercise.currentQuestion < exercise.questions.length){
        nextButton.style.visibility = "visible";
        nextButton.onclick = function () {loadNextEx1(exercise)};
    }
    else {
        nextButton.style.visibility = "hidden";
    }
}

function loadPreviousEx1(exercise) {
    //decrement currentQuestion by 1
    exercise.currentQuestion--;
    setupQuestionEx1(exercise);
}

function loadNextEx1(exercise) {
    //increment currentQuestion by 1
    exercise.currentQuestion++;
    setupQuestionEx1(exercise);
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
    
}

function setUpButtonsOrth(canvasObject) { //perhaps set up as answer is a better name for function
    
    
    //configure isometric button onlick events
    document.getElementById(canvasObject.canvasId + "UndoButton").onclick = function() {undoLineOrth(canvasObject)};
    document.getElementById(canvasObject.canvasId + "ClearButton").onclick = function() {clearLinesOrth(canvasObject)};
    
    var orthographicSolidButton = document.getElementById(canvasObject.canvasId + "SolidButton");
    $(orthographicSolidButton).addClass('ui-btn-active');
    var orthographicDashedButton = document.getElementById(canvasObject.canvasId + "DashedButton");
    $(orthographicDashedButton).removeClass('ui-btn-active');
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
    $('#' + pressedButton.id).addClass('ui-btn-active');
    $('#' + secondButton.id).removeClass('ui-btn-active');
}

function drawDashedLine(canvasObject, pressedButton, secondButton) {
    canvasObject.dashed = true;
    pressedButton.style.borderStyle = "inset";
    secondButton.style.borderStyle = "";  
    $(pressedButton).addClass('ui-btn-active');
    $(secondButton).removeClass('ui-btn-active');
}
