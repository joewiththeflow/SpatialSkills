//Prototype for canvasObject object. 
//This is required for question and answer canvases.

//canvasId refers to the html id of the canvas
//ctx refers to the canvas context
//dashed signifies whether solid or dashed lines should be drawn and is false (solid) or true (dashed)
//linesCurrentlyDrawn is an array of all Line objects currently drawn on the canvas
//tempLine is used to help prepare next Line drawn
//attempts is an array used to see how the user got on at each attempt. This can't show exactly how a user drew the shape but can show which lines are marked correct and not
//correctAnswer is an array which holds the correct answer for an answer canvas, or the pre-drawn image for a question canvas
//justChecked - a thought regarding how to disable buttons but not currently used
//correct - boolean value to say whether the last attempt is correct and therefore mark the question as correct 
//gridText is used to store any text such as 'FRONT' which may need displayed on the canvas
//axes is used to store any axes which must be drawn onto the canvas
//axisTrails is used to store any axis trails which must be drawn onto the canvas

function CanvasObject(canvasId) {
    this.canvasId = canvasId;
    this.ctx = document.getElementById(this.canvasId).getContext("2d");
    this.dashed = false;
    this.linesCurrentlyDrawn = []; 
    this.linesAllDrawn = [];
    this.tempLine = []; 
    this.attempts = []; 
    this.correctAnswer = []; 
    this.justChecked = false; 
    this.correct; 
    this.gridText = [];
    this.axes = [];
    this.axisTrails = [];
}