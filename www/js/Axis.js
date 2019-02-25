//Prototype for axis object. 
//This is required for axes in rotation questions.
//x1 and y1 parameters note the start cooridnates of the axis on the canvas
//the axis parameter is X, Y or Z
//the label parameter is 'X', 'Y', 'Z' or 'blank'

function Axis(x1, y1, axis, axisLabel){
    this.x1 = x1;
    this.y1 = y1;
    this.axis = axis;
    this.axisLabel = axisLabel;
}