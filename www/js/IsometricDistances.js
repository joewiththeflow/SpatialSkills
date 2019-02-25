//////////////ISOMETRIC GRID VARIABLES////////////////////////

var distBetweenDots = 32; //a default value just now but could possibly be changed here without affecting rest of code. This offers the potential to adjust it based on user device or even user preference without altering rest of code. This distance is the vertical distance between dots with same x position, and the distance between dots diagonally between x coordinates for isometric paper.

//the position of the first dot in top left hand corner fixed
var firstDotXPos = distBetweenDots / 2;
var firstDotYPos  = firstDotXPos; 

var yDistBetweenDots = distBetweenDots / 2; //this is halfway between a dot and the dot immediately above and below

//the xDistance between the dots on the isometric grid can be worked out by creating a right angled triangle e.g. a line from the first dot that goes halfway to the dot directly below (yDistBetweenDots), then a line from there (the hypotenuse which is distBetweenDots) to the dot directly to the right of the first, and then a line from there back to the first dot to complete the triangle. Using Pythagoras' Theorem we can work out the distance between the first dot and the dot immediately to the right of the first dot (the length of the side of the triangle).
var xDistBetweenDots = Math.round(lengthOfSide(distBetweenDots, yDistBetweenDots)); 
 
//work out how many dots there are on the isometric canvas in terms of rows and columns
//var canvas = document.getElementById("isometricEx6"); 
//max canvas width and height
var canvasWidth = 600;
var canvasHeight = 600;
var numOfColumns = Math.floor(((canvasWidth - firstDotXPos) / xDistBetweenDots)) + 1;  
var numOfRows = Math.floor(((canvasHeight - firstDotYPos) / yDistBetweenDots)) + 1; 


//////AXIS PROPERTIES////////////////TODO Move these later, probably a better idea to move the isometric diatnaces above along with this to a global properties file e.g. LineProperties
//set the label for x axis that appears on canvas
var axisLabelX = "X";
//set the label for y axis that appears on canvas
var axisLabelY = "Y";
//set the label for z axis that appears on canvas
var axisLabelZ = "Z";
//set the string for blank axis
var axisLabelBlank = "blank";
//set the string for x axis
var axisStringX = "X";
//set the string for y axis
var axisStringY = "Y";
//set the string for z axis
var axisStringZ = "Z";
//set axis arrow lineWidth
var axisArrowLineWidth = 2;
//set axis arrow length
var axisArrowLength = 2* yDistBetweenDots; //original 2*
//set arrow offset
var axisArrowOffset = -yDistBetweenDots/2; //yDistBetweenDots/2; //original 1*
//set width of arrow head
var axisArrowHeadWidth = yDistBetweenDots/2;
//set width of arrow head
var axisArrowHeadHeight = yDistBetweenDots/2;
//set color of axis arrow head
var axisArrowHeadColor = 'black';
//set color of axis arrow tail
var axisArrowTailColor = 'black';
//set axis text color
var axisTextColor = 'black';
//set axis text pixels
var axisTextPixels = xDistBetweenDots;
//set axis text style
var axisTextStyle = 'sans-serif';
//set x axis arrow text offset height
var axisXTextOffsetHeight = yDistBetweenDots/2;
//set x axis arrow text offset Width
var axisXTextOffsetWidth = (-(distBetweenDots/4));
//set y axis arrow text offset height
var axisYTextOffsetHeight = yDistBetweenDots;
//set y axis arrow text offset Width
var axisYTextOffsetWidth = distBetweenDots/4;
//set z axis arrow text offset height
var axisZTextOffsetHeight = 2 * (distBetweenDots/3);
//set z axis arrow text offset Width
var axisZTextOffsetWidth = 0;
//set xAxis rotation
var axisXRotation = 120;
//set xAxis rotation
var axisYRotation = 0;
//set zAxis rotation
var axisZRotation = 240;

///////////TRAIL PROPERTIES/////////////////////////////
//set the string for x axis
var trailStringX = "X";
//set the string for y axis
var trailStringY = "Y";
//set the string for z axis
var trailStringZ = "Z";
//set axis arrow length
var trailLength = 2* yDistBetweenDots; //original 2*yDistBetweenDots
//set trail offset
var trailOffset = -yDistBetweenDots/2; //original 1* yDistBetweenDots
//set trail color
var trailColor = 'black';
//set trail lineWidth
var trailLineWidth = 2;
//set trail rotation
var trailXRotation = 300;
//set xAxis rotation
var trailYRotation = 180;
//set zAxis rotation
var trailZRotation = 60;

///////////ISOMETRIC GRID HELPER FUNCTIONS//////////////////////////////

//function to work out the length of one side of a triangle
function lengthOfSide(hypotenuse, side) {
    //hypotenuse squared = side1 squared + side2 squared
    var side2 = Math.sqrt(((hypotenuse * hypotenuse) - (side * side)));
    return side2;
}

//Function to obtain the length of the hypotenuse
function lengthOfHypotenuse(side1, side2){
    
    //hypotenuse squared = side1 squared + side2 squared
    var hypotenuse = Math.sqrt((side1 * side1) + (side2 * side2));
    return hypotenuse;
}

//////FINDING GRID COORDINATES/////

//This function will make use of other functions to determine the closest coord (i.e. closest dot) based on the touch coordinates x and y.
function findClosestCoord(x, y){
    //find the x grid coordinate
    var xCoord = findXCoord(x);
        
    //If the value returned by findXCoord(x) is a whole number, then the closest dot will be based on y coordinate only. This is because the x Distance to another point can never be smaller than the y distance to another point.
    //Is x a whole number?
    if(xCoord % 1 === 0){
        //find the yCoord 
        yCoord = findYCoord(y);
        //if x is even then the closest y coord must be even
        if(xCoord == 0 || xCoord % 2 == 0){
            //check to see if yCoord is whole even number
            //////MIGHT NOT NEED THIS BIT AS if it is exact, math.round and math.floor in the else statements will work it out anyway but you would still need a check to prevent divide by 0
            if (yCoord == 0 || yCoord % 2 == 0){
                return [xCoord, yCoord];
            }
            //round to the nearest even number
            else {
                yCoord = 2 * Math.round(yCoord / 2);
                return [xCoord, yCoord];
            } 
            
        }
        //if x is odd the the y coord must be odd
        else if (xCoord % 2 != 0) {
            //check to see if yCoord is whole odd number
            if ((yCoord + 1) % 2 == 0){
                return [xCoord, yCoord];
            }
            //round to the nearest odd number
            else {
                yCoord = 2 * Math.floor(yCoord / 2) + 1;
                //test
                return [xCoord, yCoord];
            }    
        }
    }
    
    //Now we need some logic to deal with x when it is not a whole number
    //we would like to find out which numbers the xCoord is between
    else {
        var xCoordLeft = Math.floor(xCoord);
        var yCoord = findYCoord(y);
        var closestLeftDotY;
        var closestRightDotY
        //If the whole x value on the left of xCoord is even...
        if (xCoordLeft == 0 || xCoordLeft % 2 == 0){
            // need a separate check for y == 0
            //Find the closest dot on the left based on y
            closestLeftDotY = 2 * Math.round(yCoord / 2);  
            //find the closest dot on the right
            closestRightDotY = 2 * Math.floor(yCoord / 2) + 1;
        }
        //else if the whole x value on the left is odd...
        else {
            //find closest dot on the left
            closestRightDotY = 2 * Math.round(yCoord / 2);  
            //find the closest dot on the right
            closestLeftDotY = 2 * Math.floor(yCoord / 2) + 1;
            
        }
        //find the actual lengths from these dots to the touch point
        var lengthFromLeftDotX = x - (findTrueXCoord(xCoordLeft));
        var lengthFromLeftDotY = y - (findTrueYCoord(closestLeftDotY)); //negative won't matter
        var lengthFromRightDotX = (findTrueXCoord(xCoordLeft + 1)) - x;
        var lengthFromRightDotY = y - (findTrueYCoord(closestRightDotY)); //negative won't matter
            
        //find out the distance to the points which will be the hypotenuse of a triangle
        var lengthFromLeftDiagonal = lengthOfHypotenuse(lengthFromLeftDotX, lengthFromLeftDotY);
        var lengthFromRightDiagonal = lengthOfHypotenuse(lengthFromRightDotX, lengthFromRightDotY);
            
        //if distance from left is shorter then the dot on the left is closest
        if (lengthFromLeftDiagonal < lengthFromRightDiagonal){
            return [xCoordLeft, closestLeftDotY];
        }
        //otherwise the dot on the right is closest
        else {
            return [xCoordLeft + 1, closestRightDotY];
        }
    }
}

//function to find and return the x grid coordinate on the isometric grid system based on the actual x coordinate given
function findXCoord(x){
    var xCoord;
    var xAdjustment = x - firstDotXPos;
    
    //if x touch coord is equal to or less than firstDotXPos x coord is 0
    if(xAdjustment <= 0){
        xCoord = 0;
    }
    //else if x coord is equal to or greater than last column x coord is the last column
    else if(xAdjustment / xDistBetweenDots >= (numOfColumns - 1) ){
        xCoord = numOfColumns -1;
    }
    //else work out the value for the x coord based on the touch coord given
    else {
        xCoord = xAdjustment / xDistBetweenDots;
    }
        
    //return the xCoord value
    return xCoord;
}

//function to find and return the y grid coordinate on the isometric grid system based on the actual y coordinate given
function findYCoord(y){
    var yCoord;
    var yAdjustment = y - firstDotYPos;
    
    //if y touch coord is equal to or less than firstDotYPos y coord is 0
    if(yAdjustment <= 0){
        yCoord = 0;
    }
    //else if y coord is equal to or greater than last row y coord is the last row
    else if(yAdjustment / yDistBetweenDots >= (numOfRows - 1) ){
        yCoord = numOfRows -1;
    }
    //else work out the value for the y coord based on the touch coord given
    else {
        yCoord = yAdjustment / yDistBetweenDots;
    }
        
    //return the xCoord value
    return yCoord;
}

//find the actual x coordinate based upon the grid x coordinate
function findTrueXCoord(x){
    var xCoord = firstDotXPos + (x * xDistBetweenDots);
    return xCoord;
}

//find the actual y coordinate based upon the grid y coordinate
function findTrueYCoord(y){
    var yCoord = firstDotYPos + (y * yDistBetweenDots);
    return yCoord;
} 



/////////////ISOMETRIC CANVAS DRAWING FUNCTIONS//////////////////////

//function to draw the Isometric dots, which clears the canvas first
function drawDots(canvasObject) {
    clearCanvas(canvasObject);
    
    //loop through the number of dot rows on the isometric grid
    for (var i = 0; i < numOfRows; i++) {
        var start = 1;
        //if i is even, j will be even, else if i is odd, j will be odd
        if (i == 0 || ((i % 2) == 0)) {
            start = 0;
        }
        //loop through dots in row i, increment j in steps of 2
        for (j = start; j < numOfColumns; (j+=2)) {
            drawACircle(canvasObject, firstDotXPos + (j * xDistBetweenDots), firstDotYPos + (i * yDistBetweenDots), dotWidth, dotColor); 
        }
    }
}

function clearCanvas(canvasObject) {
    var curCanvas = document.getElementById(canvasObject.canvasId);
    var curCtx = curCanvas.getContext("2d");
    curCtx.clearRect(0, 0, canvasWidth, canvasHeight);
}

//function to add touch to grid and possibly drawing a new line
function addPoint(x, y, canvasObject) {
    var dotCoordinateArray = findClosestCoord(x, y);
    var adjustedCoordinateX = findTrueXCoord(dotCoordinateArray[0]);
    var adjustedCoordinateY = findTrueYCoord(dotCoordinateArray[1]);    
    
    //if empty then this is the first touch point, otherwise it is the second touch point
    if(canvasObject.tempLine.length == 0){
        //below we used to add a new line to lines, but let's create a temp line instead so we can do some checks e.g. make sure there are 2 points, and make sure they are different
        canvasObject.tempLine[0] = new Line(dotCoordinateArray[0], dotCoordinateArray[1], 0, 0);
        //we want to set the dashed property to true if the corresponding button is pressed
       
        //draw a circle on the isometric dot that the touch is closest to
        drawACircle(canvasObject, adjustedCoordinateX, adjustedCoordinateY, lineTouchCircleWidth, lineTouchColor);
    }
    else {
        //let's check that second point is different from the first
        if((canvasObject.tempLine[0].x1 == dotCoordinateArray[0]) && (canvasObject.tempLine[0].y1 == dotCoordinateArray[1])){
            //the two points are the same so cancel the point selection by removing the Line
            canvasObject.tempLine.pop();
            drawLines(canvasObject, canvasObject.linesCurrentlyDrawn); //this will redraw the linesCurrentlyDrawn without the orange touch point
        }
        else {
            //the points are different so add the second touch point x and y values to tempLine
            canvasObject.tempLine[0].x2 = dotCoordinateArray[0];
            canvasObject.tempLine[0].y2 = dotCoordinateArray[1];
            if (canvasObject.dashed == true){
                canvasObject.tempLine[0].type = "dashed";
            }
            //add tempLine to the currently drawn lines array
            canvasObject.linesCurrentlyDrawn.push(canvasObject.tempLine[0]);
            //add the new line to All Lines drawn as well
            canvasObject.linesAllDrawn.push(canvasObject.tempLine[0]);
            
            //let's add a new line into tempLine, using the x2 and y2 coordinates as the x1 and y1 of the new temp line
            canvasObject.tempLine[0] = new Line(dotCoordinateArray[0], dotCoordinateArray[1], 0, 0);
            drawLines(canvasObject, canvasObject.linesCurrentlyDrawn);
            //draw a circle on the isometric dot that the touch is closest to
            drawACircle(canvasObject, adjustedCoordinateX, adjustedCoordinateY, lineTouchCircleWidth, lineTouchColor);
        }
    }
}

//function to draw a circle on a canvas
function drawACircle(canvasObject, x, y, radius, color){
    var curCtx = document.getElementById(canvasObject.canvasId).getContext("2d");
        curCtx.beginPath();
        curCtx.arc(x, y, radius, 0, 2 * Math.PI, false);
        curCtx.fillStyle = color;                              
        curCtx.fill();  
}

//function to draw all line objects in an array
function drawLines(canvasObject, lineArray) {
    //now clear the canvas by running drawDots and draw each Line object in the lines array
    drawDots(canvasObject);
    var curCtx = document.getElementById(canvasObject.canvasId).getContext("2d");
    for(var i = 0; i < lineArray.length; i++){
        //drawALine(canvasObject.ctx, lineArray[i]);
        drawALine(curCtx, lineArray[i]);
    }
    //have to make sure any canvas text is drawn too
    drawText(canvasObject);
    //have to make sure any canvas axes are drawn too
    drawAxes(canvasObject);
    //have to make sure any canvas trails are drawn too
    drawTrails(canvasObject);
}

//function to draw a line between 2 points based on a line object
function drawALine(ctx, line) { 
    //check whether drawing dashed lines
    if (line.type == "dashed"){
        ctx.setLineDash([dashLineWidth, dashSpaceWidth]);
    }
    else{
        ctx.setLineDash([]);
    }
    
    ctx.beginPath();
    ctx.moveTo(findTrueXCoord(line.x1), findTrueYCoord(line.y1));
    ctx.lineWidth = lineWidth;
    ctx.lineTo(findTrueXCoord(line.x2), findTrueYCoord(line.y2));
    if (line.color == "correct"){
        ctx.strokeStyle = lineCorrectColor;
    }
    else if (line.color == "incorrect"){
        ctx.strokeStyle = lineIncorrectColor;
    }
    else {
        ctx.strokeStyle = lineColor;
    }
    ctx.stroke();
}

//function to undo the last line drawn
function undoLine(canvasObject) {
    if (canvasObject.linesCurrentlyDrawn.length > 0){
        //remove the last item from the lines currently drawn, but add an undo line to linesAllDrawn to keep a record of the event
        canvasObject.linesAllDrawn.push(canvasObject.linesCurrentlyDrawn.pop()); 
        canvasObject.linesAllDrawn[canvasObject.linesAllDrawn.length - 1].type = "undo";
        
        drawLines(canvasObject, canvasObject.linesCurrentlyDrawn);
        //ensure any touch points become unselected
        canvasObject.tempLine.pop();
    }
}

//function to clear the canvas
function clearLines(canvasObject) {
    drawDots(canvasObject);

    //clear any touch points
    canvasObject.tempLine.pop();
    //remove all lines from the lines currently drawn, but add them to linesAllDrawn to keep a record of the lines cleared
    for (var i = 0; i < canvasObject.linesCurrentlyDrawn; i++){
        canvasObject.linesAllDrawn.push(canvasObject.linesCurrentlyDrawn[i]);
        canvasObject.linesAllDrawn[canvasObject.linesAllDrawn.length - 1].type = "clear";
    }
    canvasObject.linesCurrentlyDrawn.length = 0;
}

////////////////ADDITIONAL ISOMETRIC FUNCTIONS//////////////////////

///////////ADD GRID TEXT TO A CANVAS////////////////

function addGridText(canvasObject, x, y, text, rotation) {
    
    var dotCoordinateArray = findClosestCoord(x, y);
    canvasObject.gridText.push(new GridText(dotCoordinateArray[0], dotCoordinateArray[1], text, rotation));
    drawLines(canvasObject, canvasObject.linesCurrentlyDrawn);
}

//function to add text to the canvas at the touch point////
function drawText(canvasObject){
    for (var i = 0; i < canvasObject.gridText.length; i++){
        var trueX = findTrueXCoord(canvasObject.gridText[i].x1);
        var trueY = findTrueYCoord(canvasObject.gridText[i].y1);
        var curCtx = document.getElementById(canvasObject.canvasId).getContext("2d");
        //need some rotation
        //save the current canvas state
        curCtx.save();
        //move the canvas origin to the start of the text
        curCtx.translate(trueX, trueY);
        //do the rotation
        curCtx.rotate((Math.PI / 180) * canvasObject.gridText[i].rotation);
        
        //set the font and color
        curCtx.fillStyle = textColor;
        curCtx.font = '' + textPixels + 'px ' + textStyle;
        
        //draw the text
        curCtx.fillText(canvasObject.gridText[i].text, 0, 0);
        
        //restore the canvas
        curCtx.restore();
    }
}

//function to undo the last text drawn
function undoText(canvasObject) {
    if (canvasObject.gridText.length > 0){
        //remove the last item from the text currently drawn 
        canvasObject.gridText.pop();
        
        drawLines(canvasObject, canvasObject.linesCurrentlyDrawn);        
    }
}

///////////ADD NUMERIC ROTATIONS TO A CANVAS/////////////////

//function to add numeric rotation instruction
function addNumericRotation(rotationCanvas, degrees){
    rotationCanvas.numericRotations.push(new NumericRotation(degrees));
    drawNumericRotations(rotationCanvas);
}

//function to undo a numeric rotation instruction
function undoNumericRotation(rotationCanvas) {
    rotationCanvas.numericRotations.pop();
    drawNumericRotations(rotationCanvas);
}

//function to clear numeric rotation instructions
function clearNumericRotations(rotationCanvas){
    rotationCanvas.numericRotations.length = 0;
    clearRotationCanvas(rotationCanvas);
}

//function to clear the rotationsCanvas
function clearRotationCanvas(rotationCanvas){
    var rotationCanvasWidth = document.getElementById(rotationCanvas.canvasId).width;
    var rotationCanvasHeight = document.getElementById(rotationCanvas.canvasId).height;
    var curCtx = document.getElementById(rotationCanvas.canvasId).getContext("2d");
    curCtx.fillStyle = rotationsBackgroundColor;
    curCtx.fillRect(0, 0, rotationCanvasWidth, rotationCanvasHeight);
    curCtx.fill();
}

function drawNumericRotations(rotationCanvas){
    clearRotationCanvas(rotationCanvas);
    var width = document.getElementById(rotationCanvas.canvasId).width;
    var height = document.getElementById(rotationCanvas.canvasId).height;
    var curCtx = document.getElementById(rotationCanvas.canvasId).getContext("2d");
    curCtx.fillStyle = rotationColor;
    curCtx.font = '' + rotationPixelSize + 'px ' + rotationStyle;
    
    for (var i = 0; i < rotationCanvas.numericRotations.length; i++){
        curCtx.fillText(rotationCanvas.numericRotations[i].degrees + " degrees", width/3, rotationPixelSize + (rotationPixelSize * i));
        curCtx.strokeText(rotationCanvas.numericRotations[i].degrees + " degrees", width/3, rotationPixelSize + (rotationPixelSize * i));
    }
}

///////////ADD ALPHABETIC ROTATIONS TO A CANVAS/////////////////

//function to add alphabetic rotation instruction
function addAlphabeticRotation(rotationCanvas, direction, axis){
    rotationCanvas.alphabeticRotations.push(new AlphabeticRotation(direction, axis));
    drawAlphabeticRotations(rotationCanvas);
}

//function to undo a alphabetic rotation instruction
function undoAlphabeticRotation(rotationCanvas) {
    rotationCanvas.alphabeticRotations.pop();
    drawAlphabeticRotations(rotationCanvas);
}

//function to clear alphabetic rotation instructions
function clearAlphabeticRotations(rotationCanvas){
    rotationCanvas.alphabeticRotations.length = 0;
    clearRotationCanvas(rotationCanvas);
}

function drawAlphabeticRotations(rotationCanvas){
    clearRotationCanvas(rotationCanvas);
    var width = document.getElementById(rotationCanvas.canvasId).width;
    var height = document.getElementById(rotationCanvas.canvasId).height;
    
    for (var i = 0; i < rotationCanvas.alphabeticRotations.length; i++){
        if (rotationCanvas.alphabeticRotations[i].direction == "positive"){
            drawPositiveAlphabeticArrow(rotationCanvas, rotationCanvas.alphabeticRotations[i], width/3, rotationPixelSize + (rotationPixelSize * i));
        }
        else {
            drawNegativeAlphabeticArrow(rotationCanvas, rotationCanvas.alphabeticRotations[i],  width/3, rotationPixelSize + (rotationPixelSize * i));
        }
    }
}

function drawNegativeAlphabeticArrow(rotationCanvas, alphabeticRotation, width, height){
    var curCtx = document.getElementById(rotationCanvas.canvasId).getContext("2d");
    curCtx.beginPath();
    curCtx.moveTo(width, height);
    curCtx.lineWidth = rotationArrowLineWidth;
    
    //draw the arrow head
    curCtx.lineTo(width , height - (rotationArrowHeadWidth/2));
    curCtx.lineTo(width - rotationArrowHeadHeight, height);
    curCtx.lineTo(width , height + (rotationArrowHeadWidth/2));
    curCtx.lineTo(width , height);
    curCtx.strokeStyle = rotationArrowHeadColor;
    curCtx.stroke();
    curCtx.fillStyle = rotationArrowHeadColor;
    curCtx.fill();
    
    
    
    curCtx.lineTo(width + rotationArrowLength, height);
    curCtx.strokeStyle = rotationArrowTailColor;
    curCtx.stroke();
    
    curCtx.font = '' + rotationPixelSize + 'px ' + rotationStyle;
    curCtx.fillStyle = rotationColor;
    curCtx.fillText(alphabeticRotation.axis, width + rotationArrowLength + rotationTextOffsetWidth, height + rotationTextOffsetHeight);
    curCtx.strokeStyle = rotationColor;
    curCtx.strokeText(alphabeticRotation.axis, width + rotationArrowLength + rotationTextOffsetWidth, height + rotationTextOffsetHeight);
    
}
    
function drawPositiveAlphabeticArrow(rotationCanvas, alphabeticRotation, width, height){
    var curCtx = document.getElementById(rotationCanvas.canvasId).getContext("2d");
    curCtx.beginPath();
    curCtx.moveTo(width, height);
    curCtx.lineWidth = rotationArrowLineWidth;
    
    curCtx.lineTo(width + rotationArrowLength, height);
    curCtx.strokeStyle = rotationArrowTailColor;
    curCtx.stroke();
    
    //draw the arrow head
    curCtx.lineTo(width + rotationArrowLength, height - (rotationArrowHeadWidth/2));
    curCtx.lineTo(width + rotationArrowLength + rotationArrowHeadHeight, height);
    curCtx.lineTo(width + rotationArrowLength, height + (rotationArrowHeadWidth/2));
    curCtx.lineTo(width + rotationArrowLength, height);
    curCtx.strokeStyle = rotationArrowHeadColor;
    curCtx.stroke();
    curCtx.fillStyle = rotationArrowHeadColor;
    curCtx.fill();
    
    
    curCtx.font = '' + rotationPixelSize + 'px ' + rotationStyle;
    curCtx.fillText(alphabeticRotation.axis, width + rotationArrowLength + rotationTextOffsetWidth, height + rotationTextOffsetHeight);
    curCtx.strokeText(alphabeticRotation.axis, width + rotationArrowLength + rotationTextOffsetWidth, height + rotationTextOffsetHeight);
    
}

////////////////AXES////////////////////////////////////////////////////

function addGridAxis(canvasObject, x, y, axis, axisLabel) {
    
    var dotCoordinateArray = findClosestCoord(x, y);
    canvasObject.axes.push(new Axis(dotCoordinateArray[0], dotCoordinateArray[1], axis, axisLabel));
    //drawText(canvasObject);
    drawLines(canvasObject, canvasObject.linesCurrentlyDrawn);
}

//function to add axis to the canvas at the touch point////
function drawAxes(canvasObject){
    for (var i = 0; i < canvasObject.axes.length; i++){
        var trueX = findTrueXCoord(canvasObject.axes[i].x1);
        var trueY = findTrueYCoord(canvasObject.axes[i].y1);
        var curCtx = document.getElementById(canvasObject.canvasId).getContext("2d");
        var axis = canvasObject.axes[i].axis;
        var axisLabel = canvasObject.axes[i].axisLabel;
        var rotation = 0;
        var textHeightOffset = axisYTextOffsetHeight;
        var textWidthOffset = axisYTextOffsetWidth;
        
        if (canvasObject.axes[i].axis == axisStringX){
            rotation = axisXRotation;
            textHeightOffset = axisXTextOffsetHeight;
            textWidthOffset = axisXTextOffsetWidth;
        }
        if (canvasObject.axes[i].axis == axisStringZ){
            rotation = axisZRotation;
            textHeightOffset = axisZTextOffsetHeight;
            textWidthOffset = axisZTextOffsetWidth;
        }
        
        //may need some rotation
        //save the current canvas state
        curCtx.save();
        //move the canvas origin to the start of the arrow
        curCtx.translate(trueX, trueY);
        //do the rotation
        curCtx.rotate((Math.PI / 180) * rotation);
        //move the canvas origin to the start of the canvas again
        curCtx.translate(-(trueX), -(trueY));
        
        //draw the arrow line
        curCtx.beginPath();
        curCtx.moveTo(trueX, trueY + axisArrowOffset);
        curCtx.lineWidth = axisArrowLineWidth;
        curCtx.lineTo(trueX, trueY - axisArrowLength);
        curCtx.strokeStyle = axisArrowTailColor;
        curCtx.stroke();
        
        //draw the arrow head
        curCtx.lineTo(trueX - (axisArrowHeadWidth/2), trueY - axisArrowLength);
        curCtx.lineTo(trueX, trueY - axisArrowLength - axisArrowHeadHeight);
        curCtx.lineTo(trueX + (axisArrowHeadWidth/2), trueY - axisArrowLength);
        curCtx.lineTo(trueX, trueY - axisArrowLength);
        curCtx.strokeStyle = axisArrowHeadColor;
        curCtx.stroke();
        curCtx.fillStyle = axisArrowHeadColor;
        curCtx.fill();
        
        if (canvasObject.axes[i].axisLabel != axisLabelBlank) {
        
            curCtx.translate(trueX - textWidthOffset, trueY - axisArrowLength - axisArrowHeadHeight - textHeightOffset);
        
            //rotate back so that that text is not rotated
            curCtx.rotate((Math.PI / 180) * (-(rotation)));
        
            //set the font and color
            curCtx.fillStyle = axisTextColor;
            curCtx.font = '' + axisTextPixels + 'px ' + axisTextStyle;
        
        
            //draw the text
            curCtx.fillText(canvasObject.axes[i].axisLabel, 0, 0);
        }
        
        //restore the canvas
        curCtx.restore();
        
    }
}

//function to undo the last axis drawn
function undoAxis(canvasObject) {
    canvasObject.axes.pop();
    drawLines(canvasObject, canvasObject.linesCurrentlyDrawn);        
}

//function to clear axes
function clearAxes(canvasObject){
    canvasObject.axes.length = 0;
    drawLines(canvasObject, canvasObject.linesCurrentlyDrawn);
}

/////////////////////////////TRAILS//////////////////////////////////////////////

function addGridTrails(canvasObject, x, y, axis) {
    
    var dotCoordinateArray = findClosestCoord(x, y);
    canvasObject.axisTrails.push(new AxisTrail(dotCoordinateArray[0], dotCoordinateArray[1], axis));
    //drawText(canvasObject);
    drawLines(canvasObject, canvasObject.linesCurrentlyDrawn);
}

//function to add trail to the canvas at the touch point////
function drawTrails(canvasObject){
    for (var i = 0; i < canvasObject.axisTrails.length; i++){
        var trueX = findTrueXCoord(canvasObject.axisTrails[i].x1);
        var trueY = findTrueYCoord(canvasObject.axisTrails[i].y1);
        var curCtx = document.getElementById(canvasObject.canvasId).getContext("2d");
        var axis = canvasObject.axisTrails[i].axis;
        var rotation = trailYRotation;
        
        if (canvasObject.axisTrails[i].axis == trailStringX){
            rotation = trailXRotation;
        }
        if (canvasObject.axisTrails[i].axis == trailStringZ){
            rotation = trailZRotation;
        }
        
        //may need some rotation
        //save the current canvas state
        curCtx.save();
        //move the canvas origin to the start of the arrow
        curCtx.translate(trueX, trueY);
        //do the rotation
        curCtx.rotate((Math.PI / 180) * rotation);
        //move the canvas origin to the start of the canvas again
        curCtx.translate(-(trueX), -(trueY));
        
        //draw the trail line
        curCtx.beginPath();
        curCtx.moveTo(trueX, trueY + trailOffset);
        curCtx.lineWidth = trailLineWidth;
        curCtx.lineTo(trueX, trueY - trailLength);
        curCtx.strokeStyle = trailColor;
        curCtx.stroke();
        
        //restore the canvas
        curCtx.restore();
        
    }
}

//function to undo the last trail drawn
function undoTrail(canvasObject) {
    canvasObject.axisTrails.pop();
    drawLines(canvasObject, canvasObject.linesCurrentlyDrawn);        
}

//function to clear trails
function clearTrails(canvasObject){
    canvasObject.axisTrails.length = 0;
    drawLines(canvasObject, canvasObject.linesCurrentlyDrawn);
}