//touch functionality used by the main app, with separate touch for Isometric and Orthographic grids
//the function below have been created with help from the Mozilla Developer Network Canvas Totorials https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial
//However, with use of jquery and bind events, the addition and removal of touch is much simpler than with JavaScript. 

//The code below uses the JQuery bind structure posted by Levarne Sobotker on stackoverflow: https://stackoverflow.com/questions/7069458/prevent-touchstart-when-swiping as this ensures that scrolling can be enabled, rather than a touch, if the user attempts to scroll.

//The code below also makes use of the originalevent as described by user mkoistinen on stackoverflow: https://stackoverflow.com/questions/4780837/is-there-an-equivalent-to-e-pagex-position-for-touchstart-event-as-there-is-fo as we need the original event when making use of the JQuery bind structure

//////ISOMETRIC TOUCH FUNCTIONS/////////////////

function enableTouch(canvas) {
    //this enables touch for the canvas object
    //Based upon JQuery bind structure posted by Levarne Sobotker on stackoverflow: https://stackoverflow.com/questions/7069458/prevent-touchstart-when-swiping
    $('#' + canvas.id).on('touchend', function(e){
        if(touchmoved != true){
      
         
            //find the corresponding canvasObject for the touched canvas
            var currentCanvasObject;
            //check if touch is on an answer canvas
            //loop through all exercises and their currentQuestion objects
            for (var i = 0; i < exercises.length; i++){
                for (var j = 0; j < exercises[i].questions[exercises[i].currentQuestion-1].answerCanvas.length; j++){
                    if(exercises[i].questions[exercises[i].currentQuestion-1].answerCanvas[j].canvasId == canvas.id){
                        currentCanvasObject = exercises[i].questions[exercises[i].currentQuestion-1].answerCanvas[j];
                    }
                }
            }
            //find the x and y offsets of the canvas from top left of screen
            var xOffSet = $("#" + currentCanvasObject.canvasId).offset().left;
            var yOffSet = $("#" + currentCanvasObject.canvasId).offset().top;
            //pass to logic to help determine whether to add touch, and possibly a line
            addPoint(touches.pageX - xOffSet, touches.pageY - yOffSet, currentCanvasObject);
        }
    }).on('touchmove', function(e){
        touchmoved = true;
        
    }).on('touchstart', function(e){
        event.preventDefault();
        touchmoved = false; 
        touches = e.originalEvent.touches[0]; //as described by user mkoistinen on stackoverflow: https://stackoverflow.com/questions/4780837/is-there-an-equivalent-to-e-pagex-position-for-touchstart-event-as-there-is-fo
    });
    
    $('#' + canvas.id).on('mouseup', function(e){
        if(mousemoved != true){
      
         
            //find the corresponding canvasObject for the touched canvas
            var currentCanvasObject;
            //check if touch is on an answer canvas
            //loop through all exercises and their currentQuestion objects
            for (var i = 0; i < exercises.length; i++){
                for (var j = 0; j < exercises[i].questions[exercises[i].currentQuestion-1].answerCanvas.length; j++){
                    if(exercises[i].questions[exercises[i].currentQuestion-1].answerCanvas[j].canvasId == canvas.id){
                        currentCanvasObject = exercises[i].questions[exercises[i].currentQuestion-1].answerCanvas[j];
                    }
                }
            }
            //find the x and y offsets of the canvas from top left of screen
            var xOffSet = $("#" + currentCanvasObject.canvasId).offset().left;
            var yOffSet = $("#" + currentCanvasObject.canvasId).offset().top;
            //pass to logic to help determine whether to add touch, and possibly a line
            addPoint(touches.pageX - xOffSet, touches.pageY - yOffSet, currentCanvasObject);
        }
    }).on('mousemove', function(e){
        mousemoved = true;
        
    }).on('mousedown', function(e){
        mousemoved = false; 
        touches = e.originalEvent; //as described by user mkoistinen on stackoverflow: https://stackoverflow.com/questions/4780837/is-there-an-equivalent-to-e-pagex-position-for-touchstart-event-as-there-is-fo
    });
    
}
    
function disableTouch(canvas) {
    //this disables touch for the canvas object
    $('#' + canvas.id).unbind('touchend');
    $('#' + canvas.id).unbind('mouseup');
}


//////ORTHOGRAPHIC TOUCH FUNCTIONS/////////////////

function enableTouchOrth(canvas) {
    //this enables touch for the canvas object
    //Based upon JQuery bind structure posted by Levarne Sobotker on stackoverflow: https://stackoverflow.com/questions/7069458/prevent-touchstart-when-swiping
        $('#' + canvas.id).on('touchend', function(e){
            if(touchmoved != true){
      
         
                //find the corresponding canvasObject for the touched canvas
                var currentCanvasObject;
                //check if touch is on an answer canvas
                //loop through all exercises and their currentQuestion objects
                for (var i = 0; i < exercises.length; i++){
                    for (var j = 0; j < exercises[i].questions[exercises[i].currentQuestion-1].answerCanvas.length; j++){
                        if(exercises[i].questions[exercises[i].currentQuestion-1].answerCanvas[j].canvasId == canvas.id){
                            currentCanvasObject = exercises[i].questions[exercises[i].currentQuestion-1].answerCanvas[j];
                        }
                    }
                }
                //find the x and y offsets of the canvas from top left of screen
                var xOffSet = $("#" + currentCanvasObject.canvasId).offset().left;
                var yOffSet = $("#" + currentCanvasObject.canvasId).offset().top;
                //pass to logic to help determine whether to add touch, and possibly a line
                addPointOrth(touches.pageX - xOffSet, touches.pageY - yOffSet, currentCanvasObject);
            }
        }).on('touchmove', function(e){
            touchmoved = true;
        
        }).on('touchstart', function(e){
            event.preventDefault();
            touchmoved = false; 
            touches = e.originalEvent.touches[0]; //as described by user mkoistinen on stackoverflow: https://stackoverflow.com/questions/4780837/is-there-an-equivalent-to-e-pagex-position-for-touchstart-event-as-there-is-fo
        });
    
    $('#' + canvas.id).on('mouseup', function(e){
            if(mousemoved != true){
      
         
                //find the corresponding canvasObject for the touched canvas
                var currentCanvasObject;
                //check if touch is on an answer canvas
                //loop through all exercises and their currentQuestion objects
                for (var i = 0; i < exercises.length; i++){
                    for (var j = 0; j < exercises[i].questions[exercises[i].currentQuestion-1].answerCanvas.length; j++){
                        if(exercises[i].questions[exercises[i].currentQuestion-1].answerCanvas[j].canvasId == canvas.id){
                            currentCanvasObject = exercises[i].questions[exercises[i].currentQuestion-1].answerCanvas[j];
                        }
                    }
                }
                //find the x and y offsets of the canvas from top left of screen
                var xOffSet = $("#" + currentCanvasObject.canvasId).offset().left;
                var yOffSet = $("#" + currentCanvasObject.canvasId).offset().top;
                //pass to logic to help determine whether to add touch, and possibly a line
                addPointOrth(touches.pageX - xOffSet, touches.pageY - yOffSet, currentCanvasObject);
            }
        }).on('mousemove', function(e){
            mousemoved = true;
        
        }).on('mousedown', function(e){
            mousemoved = false; 
            touches = e.originalEvent; //as described by user mkoistinen on stackoverflow: https://stackoverflow.com/questions/4780837/is-there-an-equivalent-to-e-pagex-position-for-touchstart-event-as-there-is-fo
        });
}
    
function disableTouchOrth(canvas) {
    //this disables touch for the canvas object
    $('#' + canvas.id).unbind('touchend');
    $('#' + canvas.id).unbind('mouseup');
}

