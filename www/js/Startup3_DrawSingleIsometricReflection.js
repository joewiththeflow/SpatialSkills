////////////
//need a question variable to be available to all functions
//set up a question object to contain answerCanvas and QuestionCanvas
    //questionEx6 = new Question();

function setupQuestionEx6(exercise) {
    
    //for each isometric question canvas (only 1 at the moment)
    for (var i = 0; i < exercise.questions[exercise.currentQuestion - 1].questionCanvas.length; i++){
        //draw dots on the isometric canvas
        drawDots(exercise.questions[exercise.currentQuestion - 1].questionCanvas[i]);
    
        //draw the question on the isometric canvas
        drawLines(exercise.questions[exercise.currentQuestion - 1].questionCanvas[i], exercise.questions[exercise.currentQuestion - 1].questionCanvas[i].correctAnswer);
    }
    
    //for each isometric answer canvas (only 1 at the moment)
    for (var i = 0; i < exercise.questions[exercise.currentQuestion - 1].answerCanvas.length; i++){
        //disable touch
        disableTouch(document.getElementById(exercise.questions[exercise.currentQuestion - 1].answerCanvas[i].canvasId));
        
        //draw dots on the isometric canvas
        drawDots(exercise.questions[exercise.currentQuestion - 1].answerCanvas[i]);
        
        //draw the lines currently drawn on the canvas
        drawLines(exercise.questions[exercise.currentQuestion - 1].answerCanvas[i], exercise.questions[exercise.currentQuestion - 1].answerCanvas[i].linesCurrentlyDrawn);
        
        //set up the buttons for each isometric canvas
        setUpButtonsIsometric(exercise.questions[exercise.currentQuestion - 1].answerCanvas[i]);
        
        //set up touch for the orthographic canvas
        enableTouch(document.getElementById(exercise.questions[exercise.currentQuestion - 1].answerCanvas[i].canvasId));
        /*
        //drawLines to ensure any grid text appears immediately
        drawLines(exercise.questions[exercise.currentQuestion - 1].answerCanvas[i], []);
        */
        
        //clear any p tags with feedback
        clearPTags(exercise.questions[exercise.currentQuestion - 1].answerCanvas[i]);
    }   
    setUpQuestionNumber(exercise);
    setUpPreviousNextButtonsEx6(exercise);
}

function setUpPreviousNextButtonsEx6(exercise){
    var previousButton = document.getElementById(exercise.name + "PreviousButton");
    var nextButton = document.getElementById(exercise.name + "NextButton");
    
    //if exercise.currentQuestion is greater than 1, show and set up previous button
    if(exercise.currentQuestion > 1){
        previousButton.style.visibility = "visible";
        previousButton.onclick = function () {loadPreviousEx6(exercise)};
    }
    else {
        previousButton.style.visibility = "hidden";
    }
    
    //if exerciseCurrentQuestion is less than exercis.currentQuestion, show and set up next button
    if(exercise.currentQuestion < exercise.questions.length){
        nextButton.style.visibility = "visible";
        nextButton.onclick = function () {loadNextEx6(exercise)};
    }
    else {
        nextButton.style.visibility = "hidden";
    }
}

function loadPreviousEx6(exercise) {
    //decrement currentQuestion by 1
    exercise.currentQuestion--;
    setupQuestionEx6(exercise);
}

function loadNextEx6(exercise) {
    //increment currentQuestion by 1
    exercise.currentQuestion++;
    setupQuestionEx6(exercise);
}

