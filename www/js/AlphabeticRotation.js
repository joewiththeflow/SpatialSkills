//Prototype for AlphabeticRotation object. 
//This is required for arrow code rotation information displayed in the rotation canvas in rotation questions.
//the direction denotes whether the rotation is 'positive' or 'negative'
//the axis is X, Y or Z

function AlphabeticRotation(direction, axis){
    this.direction = direction;
    this.axis = axis;
}