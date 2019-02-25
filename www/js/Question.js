//Prototype for Question object. 
//answerCanvas is an array which stores one or more canvases that the user will draw an answer on
//questionCanvas is an array which stores one or more canvases which have a predrawn shape
//rotationCanvas is an array which stores a rotation canvas with rotation instructions

function Question() {
    this.answerCanvas = [];
    this.questionCanvas = [];
    this.rotationCanvas = [];
}