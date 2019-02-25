//Prototype for Line object. 
//This is required to store the start and end x,y coordinates of a line
//x1 and y1 note the start of the line on the canvas
//x2 and y2 note the end of the line on the canvas
//type is used to note whether the line is solid or dashed
//color set to default as this allows colour to be changed elsewhere due to named value in drawing functions

function Line(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.type = "solid";
    this.color = "default"
}

//function to compare two lines, based on x and y coordinates only
function compareLines(line1, line2){
    if ((line1.x1 == line2.x1) && (line1.y1 == line2.y1) && (line1.x2 == line2.x2) && (line1.y2 == line2.y2)){
        return true;
    }
    else{
        return false;
    }
}

//reverse x and y coordinates of a Line object
function reverseLine(line){
    
    var tempX = line.x1;
    var tempY = line.y1;
    line.x1 = line.x2;
    line.y1 = line.y2;
    line.x2 = tempX;
    line.y2 = tempY;
    
    return line;
}