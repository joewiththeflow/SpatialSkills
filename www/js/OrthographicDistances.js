//////////////ORTHOGRAPHIC GRID VARIABLES//////////////////////////////
        
//Orthographic distances defined separately as there may be a need to have different canvas sizes depending on context
var distBetweenDotsOrth = 25; //this will be the distance between dots in both the x and y axis

//the position of the first dot in top left hand corner fixed
var firstDotXPosOrth = distBetweenDotsOrth / 2;
var firstDotYPosOrth = firstDotXPosOrth;

//work out how many dots there are on the orthographic canvas in terms of rows and colums 
//var canvasOrth = document.getElementById("orthographicTopEx1");
//max canvas width and height
var canvasOrthWidth = 600;
var canvasOrthHeight = 600;
var numOfColumnsOrth = Math.floor(((canvasOrthWidth - firstDotXPosOrth) / distBetweenDotsOrth)) + 1;  
var numOfRowsOrth = Math.floor(((canvasOrthHeight - firstDotYPos) / distBetweenDotsOrth)) + 1; 


///////////FINDING ORTHOGRAPHIC GRID COORDINATES////////////////////////

//This function will make use of other functions to determine the closest coord (i.e. closest dot) based on the touch coordinates x and y.
function findClosestCoordOrth(x, y){
    //find the x grid coordinate
    var xCoord = findXCoordOrth(x);
    var yCoord = findYCoordOrth(y);
    
    //if x is not a whole number, round to nearest whole number
    if (xCoord % 1 != 0){
        xCoord = Math.round(xCoord);
    }
    
    //if y is not a whole number, round to nearest whole number
    if (yCoord % 1 != 0){
        yCoord = Math.round(yCoord);
    }
    
    return [xCoord, yCoord];
}

//function to find and return the x grid coordinate on the orthographic grid system based on the actual x coordinate given
function findXCoordOrth(x) {
    var xCoord;
    var xAdjustment = x - firstDotXPosOrth;
    
    //if x touch coord is equal to or less than firstDotXPos x coord is 0
    if(xAdjustment <= 0){
        xCoord = 0;
    }
    //if x coord is equal to or greater than last column x coord is the last column
    else if(xAdjustment / distBetweenDotsOrth >= (numOfColumnsOrth - 1) ){
        xCoord = numOfColumnsOrth -1;
    }
    //else work out the closest value for x based on the touch coord given
    else {
        xCoord = xAdjustment / distBetweenDotsOrth;
    }
        
    //return the xCoord value
    return xCoord;
}

//function to find and return the y grid coordinate on the orthographic grid system based on the actual y coordinate given
function findYCoordOrth(y) {
    var yCoord;
    var yAdjustment = y - firstDotYPosOrth;
    
    //if y touch coord is equal to or less than firstDotYPosOrth y coord is 0
    if(yAdjustment <= 0){
        yCoord = 0;
    }
    //if y coord is equal to or greater than last row y coord is the last row
    else if(yAdjustment / distBetweenDotsOrth >= (numOfRowsOrth - 1) ){
        yCoord = numOfRowsOrth -1;
    }
    //else work out the nearest value for the y coord based on the touch coord given
    else {
        yCoord = yAdjustment / distBetweenDotsOrth;
    }
        
    //return the xCoord value
    return yCoord;
}

//find the actual x coordinate based upon the grid x coordinate       
function findTrueXCoordOrth(x){
    var xCoord = firstDotXPosOrth + (x * distBetweenDotsOrth);
    return xCoord;
}

//find the actual y coordinate based upon the grid y coordinate
function findTrueYCoordOrth(y){
    var yCoord = firstDotYPosOrth + (y * distBetweenDotsOrth);
    return yCoord;
} 

///////////////////ORTHOGRAPHIC CANVAS DRAWING FUNCTIONS////////////////////////////

//function to draw the Orthographic dots, which clears the canvas first
function drawDotsOrth(canvasObject){ 
    clearCanvasOrth(canvasObject);
        
        //loop through the number of dot rows on the orthographic grid
        for (var i = 0; i < numOfRowsOrth; i++) {
            //loop through dots in row i
            for ( var j = 0; j < numOfColumnsOrth; j++) {
                drawACircleOrth(canvasObject, firstDotXPosOrth + (j * distBetweenDotsOrth), firstDotYPosOrth + (i * distBetweenDotsOrth), dotWidth, dotColor); 
            }
        }
}

//function to clear canvas described by canvasObject
function clearCanvasOrth(canvasObject) {
    var curCtx = document.getElementById(canvasObject.canvasId).getContext("2d");
    curCtx.fillStyle = backgroundColor;
    curCtx.fillRect(0, 0, canvasOrthWidth, canvasOrthHeight);
    curCtx.fill();
}

//function to add touch to grid and possibly drawing a new line
function addPointOrth(x, y, canvasObject){
    var dotCoordinateArray = findClosestCoordOrth(x, y);
        var adjustedCoordinateX = findTrueXCoordOrth(dotCoordinateArray[0]);
        var adjustedCoordinateY = findTrueYCoordOrth(dotCoordinateArray[1]);
    
    //if empty then this is the first touch point, otherwise it is the second touch point
    if(canvasObject.tempLine.length == 0){
        //below we used to add a new line to lines, but let's create a temp line instead so we can do some checks e.g. make sure there are 2 points, and make sure they are different
        canvasObject.tempLine[0] = new Line(dotCoordinateArray[0], dotCoordinateArray[1], 0, 0);
        //we want to set the dashed property to true if the corresponding button is pressed
       
        //draw a circle on the isometric dot that the touch is closest to
        drawACircleOrth(canvasObject, adjustedCoordinateX, adjustedCoordinateY, lineTouchCircleWidth, lineTouchColor);
    }
    else {
        //let's check that second point is different from the first
        if((canvasObject.tempLine[0].x1 == dotCoordinateArray[0]) && (canvasObject.tempLine[0].y1 == dotCoordinateArray[1])){
            //the two points are the same so cancel the point selection by removing the Line
            canvasObject.tempLine.pop();
            drawLinesOrth(canvasObject, canvasObject.linesCurrentlyDrawn); //this will redraw the linesCurrentlyDrawn without the orange touch point
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
            drawLinesOrth(canvasObject, canvasObject.linesCurrentlyDrawn);
            //draw a circle on the isometric dot that the touch is closest to
            drawACircleOrth(canvasObject, adjustedCoordinateX, adjustedCoordinateY, lineTouchCircleWidth, lineTouchColor);
        }
    }
}        

//function to draw a circle on a canvas
function drawACircleOrth(canvasObject, x, y, radius, color){
    var curCtx = document.getElementById(canvasObject.canvasId).getContext("2d");
        curCtx.beginPath();
        curCtx.arc(x, y, radius, 0, 2 * Math.PI, false);
        curCtx.fillStyle = color;                              
        curCtx.fill();  
}


//function to draw all line objects in an array
function drawLinesOrth(canvasObject, lineArray) {
    //now clear the canvas by running drawDotsOrth and draw each Line object in the lines array
    drawDotsOrth(canvasObject);
    var curCtx = document.getElementById(canvasObject.canvasId).getContext("2d");
    for(var i = 0; i < lineArray.length; i++){
        drawALineOrth(curCtx, lineArray[i]);
    }
}

//function to draw a line between 2 points based on a line object
function drawALineOrth(ctx, line) { 
    //check whether drawing dashed lines
    if (line.type == "dashed"){
        ctx.setLineDash([dashLineWidth, dashSpaceWidth]);
    }
    else{
        ctx.setLineDash([]);
    }
    
    ctx.beginPath();
    ctx.moveTo(findTrueXCoordOrth(line.x1), findTrueYCoordOrth(line.y1));
    ctx.lineWidth = lineWidth;
    ctx.lineTo(findTrueXCoordOrth(line.x2), findTrueYCoordOrth(line.y2));
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
function undoLineOrth(canvasObject) {
    if (canvasObject.linesCurrentlyDrawn.length > 0){
        //remove the last item from the lines currently drawn, but add an undo line to linesAllDrawn to keep a record of the event
        canvasObject.linesAllDrawn.push(canvasObject.linesCurrentlyDrawn.pop()); 
        canvasObject.linesAllDrawn[canvasObject.linesAllDrawn.length - 1].type = "undo";
        
        drawLinesOrth(canvasObject, canvasObject.linesCurrentlyDrawn);
        //ensure any touch points become unselected
        canvasObject.tempLine.pop();
    }
}


//function to clear the canvas
function clearLinesOrth(canvasObject) {
    drawDotsOrth(canvasObject);

    //clear any touch points
    canvasObject.tempLine.pop();
    //remove all lines from the lines currently drawn, but add them to linesAllDrawn to keep a record of the lines cleared
    for (var i = 0; i < canvasObject.linesCurrentlyDrawn; i++){
        canvasObject.linesAllDrawn.push(canvasObject.linesCurrentlyDrawn[i]);
        canvasObject.linesAllDrawn[canvasObject.linesAllDrawn.length - 1].type = "clear";
    }
    canvasObject.linesCurrentlyDrawn.length = 0;
}





