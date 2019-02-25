//Prototype for RotationsCanvas object. 
//This is needed to display rotation instructions

//canvasId is the id tag of the rotation canvas
//ctx is the context of the rotation canvas
//numericRotations is an array of any numeric rotation instructions
//alphabeticRotations is an array of any alphabetic instructions

function RotationCanvas(canvasId) {
    this.canvasId = canvasId;
    this.ctx = document.getElementById(this.canvasId).getContext("2d");
    
    this.numericRotations = [];
    this.alphabeticRotations = [];
}