//Prototype for axis trail object. 
//This is required for axes in rotation questions.
//Parameters x1 and y1 note the start coordinates of the axis trail on the canvas
//the axis is X, Y or Z

function AxisTrail(x1, y1, axis){
    this.x1 = x1;
    this.y1 = y1;
    this.axis = axis;
}