//Prototype for gridText object. 
//This is needed for any text that has to be displayed on the canvas e.g. 'FRONT'.
//x1 and y1 note the start of the text on the canvas
//text is used to store the text that will be displayed
//rotation is used to indicate the rotation in degrees of the text on the canvas

function GridText(x1, y1, text, rotation){
    this.x1 = x1;
    this.y1 = y1;
    this.text = text;
    this.rotation = rotation;
}