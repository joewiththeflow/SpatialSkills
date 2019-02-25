/////////////////ISOMETRIC GRID ANSWER FUNCTIONS/////////////////////////////

//function to create answer from an array of values, rather than line objects
function createAnswerFromArray(canvasObject, inputArray) {
    for (var i = 0; i < inputArray.length; i++){
        //fill the correctAnswer with the correct values from the inputArray
        canvasObject.correctAnswer.push(new Line(inputArray[i][0], inputArray[i][1], inputArray[i][2], inputArray[i][3])); 
        //set type of line to solid, dashed, undo, clear
        canvasObject.correctAnswer[canvasObject.correctAnswer.length-1].type = inputArray[i][4];
    }
}

//function to check current drawing matches answer
function checkAnswer(canvasObject, answerId){
    //first you have to create an attempt from the current lines array which can be compared with the coorect answer
    canvasObject.attempts.push(breakUpAllLines(canvasObject.linesCurrentlyDrawn));
    var correctAnswer = breakUpAllLines(canvasObject.correctAnswer);
    var correctLines = 0;
    var incorrectLines = 0;
    var incorrectDashedLines = false;
    
    //find bottom left x,y point of correct answer and the attempt
    var bottomLeftAttempt = findBottomLeftPoint(canvasObject.attempts[canvasObject.attempts.length - 1]);
    var bottomLeftCorrectAnswer = findBottomLeftPoint(correctAnswer);
    
    //find the x difference and y difference between the two shapes
    var xDiff = bottomLeftAttempt[0] - bottomLeftCorrectAnswer[0];
    var yDiff = bottomLeftAttempt[1] - bottomLeftCorrectAnswer[1];
    
    //loop through every broken up line in the current attempt
    for (var i = 0; i < canvasObject.attempts[canvasObject.attempts.length - 1].length; i++){
        //loop through every line in correctAnswerLines and compare currentAttempt[i] with correctAnswer[i]
        var found = false;
        var j = 0;
        //adjust current attempt line based on how far it is assumed it is offset from correct answer based on the leftmost bottom point
        var adjustedLine = new Line((canvasObject.attempts[canvasObject.attempts.length - 1][i].x1 - xDiff), (canvasObject.attempts[canvasObject.attempts.length - 1][i].y1 - yDiff), (canvasObject.attempts[canvasObject.attempts.length - 1][i].x2 - xDiff), (canvasObject.attempts[canvasObject.attempts.length - 1][i].y2 - yDiff));
        //make sure adjusted line is also solid or dashed as appropriate
        adjustedLine.type = canvasObject.attempts[canvasObject.attempts.length - 1][i].type;
        //loop through the broken up correct answer to see if lines match
        while(!found && (j < correctAnswer.length)) {
            found = compareLines(adjustedLine, correctAnswer[j]);
            j++;
        }
        if(found == true){
            canvasObject.attempts[canvasObject.attempts.length - 1][i].color = "correct";
            correctLines++;
            
            if (adjustedLine.type != correctAnswer[j-1].type){
                incorrectDashedLines = true;
            }
        }
        else {
            canvasObject.attempts[canvasObject.attempts.length - 1][i].color = "incorrect";
            incorrectLines++;
        }
    }
    drawLines(canvasObject, canvasObject.attempts[canvasObject.attempts.length - 1]);
    canvasObject.tempLine.pop(); //more user friendly to remove any touch points
    //check if all correct lines have been drawn
    var answer = document.getElementById(answerId);
    if (correctLines == correctAnswer.length && incorrectLines == 0 && incorrectDashedLines == false){
        answer.innerHTML = correctMessage;
        //mark the answer canvas as being correct
        canvasObject.correct = true;
    }
    else if (correctLines == correctAnswer.length && incorrectLines == 0 && incorrectDashedLines == true){
        answer.innerHTML = almostCorrectMessage;
    }
    else if (incorrectLines > 0) {
        answer.innerHTML = incorrectRemoveRedMessage;
    }
    else if (correctLines < correctAnswer.length){
         answer.innerHTML = incorrectAddMoreMessage;
    }
}

//function to find the bottom left point of a shape
function findBottomLeftPoint(lineArray){
    
    //bottom left is the point with lowest x (if tied then it is also the point with the highest y)
    var bottomLeftX = 999; 
    var bottomLeftY = -1;
    
    for (var i = 0; i < lineArray.length; i++){
        //if x1 of line is less than current bottomLeftX
        if(lineArray[i].x1 < bottomLeftX){
            bottomLeftX = lineArray[i].x1;
            
            //vertical lines where x1 and x2 are the same
            if(lineArray[i].x1 == lineArray[i].x2){
                //if the line is vertical, x1 will be the leftmost position and y2 will be the bottom y position as vertical lines have been arranged top to bottom
                bottomLeftY = lineArray[i].y2;
            }
            //diagonal or horizontal
            else{
            //if the line is a diagonal or horizontal, x1 will be leftmost x position of the line as all diagonals and horizontals have been rearranged left to right
            //if the line is a diagonal, y1 will be the leftmost y position associated with the line as all diagonals have been rearranged left to right
            bottomLeftY = lineArray[i].y1;
            }
        }
        //If x1 of line is equal to bottomLeft
        else if((lineArray[i].x1 == bottomLeftX)){
            //vertical
            if(lineArray[i].x1 == lineArray[i].x2){
            //remember that vertical lines have been ordered from top to bottom so lowest point on canvas (which actually means a higher y value) is actually y2
                if(lineArray[i].y2 > bottomLeftY){
                    bottomLeftY = lineArray[i].y2;
                }
            }
            //diagonal or horizontal
             else {
            //remember that diagonals and horizontals are arranged from left to right so y1 corresponds to the leftmost x point
                if(lineArray[i].y1 > bottomLeftY) {
                    bottomLeftY = lineArray[i].y1;
                }
            }
        }
    }
    return [bottomLeftX, bottomLeftY];
}

//function to break up all the lines in the line array and return array with all smaller lines
function breakUpAllLines(lineArray){
    //create an array to hold smaller lines which make up the Line objects in the lineArray
    var brokenUpLineArray = [];
    //every line will be ordered from left to right (low x to high x)
    //any vertical line will be ordered from top to bottom (low y to high y)
    for(var i = 0; i < lineArray.length; i++){
        //create a copy of the Line object at lineArray[i] so as not to alter the original drawing
        var lineCopy = new Line(lineArray[i].x1, lineArray[i].y1, lineArray[i].x2, lineArray[i].y2);
        lineCopy.type = lineArray[i].type;
        
        //order left to right if necessary
        if (lineCopy.x1 > lineCopy.x2){
            lineCopy = reverseLine(lineCopy);
        }
        
        //order top to bottom if necessary
        if ((lineCopy.x1 == lineCopy.x2) && (lineCopy.y1 > lineCopy.y2)){
            lineCopy = reverseLine(lineCopy);
        }
        //pass the lineCopy to see if it needs broken up and place the lines returned into the BrokenUpLineArray - we have to check for any duplicate lines first
        var tempArray = breakUpLine(lineCopy);
        //only need to check for duplicates if brokenUpLineArray is not empty
        if (brokenUpLineArray.length > 0){
            for (var j = 0; j < tempArray.length; j++) {
                var found = false;
                var k = 0;
                while(!found && (k < brokenUpLineArray.length)) {
                    found = compareLines(tempArray[j], brokenUpLineArray[k]);
                    k++;
                }
                //if tempArray Line not found, add to brokenUpLineArray
                if (!found){
                    brokenUpLineArray.push(tempArray[j]);
                }
            }
        }
        else {
            brokenUpLineArray.push.apply(brokenUpLineArray, tempArray);
        }
        //brokenUpLineArray.push.apply(brokenUpLineArray, breakUpLine(lineCopy));
    }
    return brokenUpLineArray;
}


//take in a larger line and break it up into smaller lines
function breakUpLine(line){
    
    var smallerLines = [];
    var xDiff = line.x2 - line.x1;
    var yDiff = line.y2 - line.y1;
    
    //Check to see if line is horizontal or vertical first
    //if a line is vertical, x will always be the same value
    //if the difference between y2 and y1 is greater than 2, the line is made up of many smaller lines
    if (line.x1 == line.x2){
        if ((line.y2 - line.y1) > 2) {
            for(var i = 0; i < ((line.y2 - line.y1) / 2); i++){
                smallerLines[i] = new Line(line.x1, (line.y1 + (2 * i)), line.x1, (line.y1 + (2 * i) + 2));
                smallerLines[i].type = line.type;
            }
        }
        else {
            smallerLines[0] = line;
            smallerLines[0].type = line.type;
        }
        return smallerLines;
    }
    //if a line is horizontal, y will always be the same value
    //if the difference between x2 and x1 is greater than 2, the line is made up of many smaller lines
    if (line.y1 == line.y2){
        if ((line.x2 - line.x1) > 2) {
            for(var i = 0; i < ((line.x2 - line.x1) / 2); i++){
                smallerLines[i] = new Line((line.x1 + (2 * i)), line.y1, (line.x1 + (2 * i) + 2), line.y1);
                smallerLines[i].type = line.type;
            }
        }
        else {
            smallerLines[0] = line;
            smallerLines[0].type = line.type;
        }
        return smallerLines;
    }
    //Diagonals
    
    //work out the gradient based upon whether xdiff or ydiff is higher
    //y can be negative so use the absolute value for testing
    var gradient;
    //Check to see whether the diagonal line doesn't need breaking up and return it if this is the case
    if(xDiff == 1 && Math.abs(yDiff) == 1){
        smallerLines[0] = line;
        smallerLines[0].type = line.type;
    }
    //x grows at the same rate as y
    else if (xDiff == Math.abs(yDiff)){
        //diagonal that slopes downwards
        if(yDiff > 0){
            for (var i = 0; i < xDiff; i++ ){
                smallerLines[i] = new Line((line.x1 + i), (line.y1 + i), (line.x1 + i + 1), (line.y1 + i + 1));
                smallerLines[i].type = line.type;
            }
        }
        //diagonal that slopes upwards
        else if(yDiff < 0){
            for (var i = 0; i < xDiff; i++ ){
                smallerLines[i] = new Line((line.x1 + i), (line.y1 - i), (line.x1 + i + 1), (line.y1 - i - 1));
                smallerLines[i].type = line.type;
            }
        }
    }
    //x grows faster than y
    else if (xDiff > Math.abs(yDiff)){
        gradient = ((line.x2 - line.x1)/(line.y2 - line.y1))
        //if gradient is a whole number then the line will cut across other dots and therefore need to be broken into smaller lines
        if (gradient % 1 === 0){
            
            if( gradient > 0){
                for (var i = 0; i < (xDiff / gradient); i++ ){
                    smallerLines[i] = new Line((line.x1 + (i * gradient)), (line.y1 + i), (line.x1 + (i * gradient) + gradient), (line.y1 + i + 1)); 
                    smallerLines[i].type = line.type;
                }
            }
            //if gradient is negative then diagonal goes up to the right
            else if( gradient < 0){
                for (var i = 0; i < (xDiff / Math.abs(gradient)); i++ ){
                    smallerLines[i] = new Line((line.x1 + (i * Math.abs(gradient))), (line.y1 - i), (line.x1 + (i * Math.abs(gradient)) + Math.abs(gradient)), (line.y1 - i - 1));
                    smallerLines[i].type = line.type;
                }
            }
        }
        //else if gradient is not a whole number
        else {
            smallerLines[0] = line;
            smallerLines[0].type = line.type;
        }  
    }
    // y grows faster than x
    else if (xDiff < Math.abs(yDiff)){
        gradient = ((line.y2 - line.y1)/(line.x2 - line.x1))
        //if gradient is a whole number then the line will cut across other dots and therefore need to be broken into smaller lines
        if (gradient % 1 === 0){
            
            if( gradient > 0){
                for (var i = 0; i < (yDiff / gradient); i++ ){
                    smallerLines[i] = new Line((line.x1 + i), (line.y1 + (i * gradient)), (line.x1 + i + 1), (line.y1 + (i * gradient) + gradient)); 
                    smallerLines[i].type = line.type;
                }
            }
            //if gradient is negative then diagonal goes up to the right
            else if( gradient < 0){
                for (var i = 0; i < (Math.abs(yDiff / gradient)); i++ ){
                    smallerLines[i] = new Line((line.x1 + i), (line.y1 - (i * Math.abs(gradient))), (line.x1 + i + 1), (line.y1 - (i * Math.abs(gradient)) - Math.abs(gradient)));
                    smallerLines[i].type = line.type;
                }
            }
        }
        //else if gradient is not a whole number
        else {
            smallerLines[0] = line;
            smallerLines[0].type = line.type;
        }        
    }
    else {
        // smallerLines.add(line);
    }
    
    return smallerLines; 
}