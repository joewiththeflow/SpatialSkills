////////////
//need a question variable to be available to all functions
//set up a question object to contain answerCanvas and QuestionCanvas
    //questionEx2 = new Question();

function setupQuestionEx2(exercise){
    
    //for each orthographic question canvas (top, front and side)
    for (var i = 0; i < exercise.questions[exercise.currentQuestion - 1].questionCanvas.length; i++){
        //draw dots on the isometric canvas
        drawDotsOrth(exercise.questions[exercise.currentQuestion - 1].questionCanvas[i]);
    
        //draw the question on the isometric canvas
        drawLinesOrth(exercise.questions[exercise.currentQuestion - 1].questionCanvas[i], exercise.questions[exercise.currentQuestion - 1].questionCanvas[i].correctAnswer);
    }
    
    //for each isometric answer canvas (top, front and side)
    for (var i = 0; i < exercise.questions[exercise.currentQuestion - 1].answerCanvas.length; i++){
        //disable touch
        disableTouch(document.getElementById(exercise.questions[exercise.currentQuestion - 1].answerCanvas[i].canvasId));
        
        //draw dots on the orthographic canvas
        drawDots(exercise.questions[exercise.currentQuestion - 1].answerCanvas[i]);
        
        //draw the lines currently drawn on the canvas
        drawLines(exercise.questions[exercise.currentQuestion - 1].answerCanvas[i], exercise.questions[exercise.currentQuestion - 1].answerCanvas[i].linesCurrentlyDrawn);
        
        //set up the buttons for each orthographic canvas
        setUpButtonsIsometric(exercise.questions[exercise.currentQuestion - 1].answerCanvas[i]);
        
        //set up touch for the orthographic canvas
        enableTouch(document.getElementById(exercise.questions[exercise.currentQuestion - 1].answerCanvas[i].canvasId));
        
        //clear any p tags with feedback
        clearPTags(exercise.questions[exercise.currentQuestion - 1].answerCanvas[i]);
    }
    setUpQuestionNumber(exercise);
    setUpPreviousNextButtonsEx2(exercise);
}

function setUpPreviousNextButtonsEx2(exercise){
    var previousButton = document.getElementById(exercise.name + "PreviousButton");
    var nextButton = document.getElementById(exercise.name + "NextButton");
    
    //if exercise.currentQuestion is greater than 1, show and set up previous button
    if(exercise.currentQuestion > 1){
        previousButton.style.visibility = "visible";
        previousButton.onclick = function () {loadPreviousEx2(exercise)};
    }
    else {
        previousButton.style.visibility = "hidden";
    }
    
    //if exerciseCurrentQuestion is less than exercis.currentQuestion, show and set up next button
    if(exercise.currentQuestion < exercise.questions.length){
        nextButton.style.visibility = "visible";
        nextButton.onclick = function () {loadNextEx2(exercise)};
    }
    else {
        nextButton.style.visibility = "hidden";
    }
}

function loadPreviousEx2(exercise) {
    //decrement currentQuestion by 1
    exercise.currentQuestion--;
    setupQuestionEx2(exercise);
}

function loadNextEx2(exercise) {
    //increment currentQuestion by 1
    exercise.currentQuestion++;
    setupQuestionEx2(exercise);
}
