//function used before home page loads
//loops through all Questions in all Exercises and tallies up attempted and correct Questions

$(document).on('pagebeforeshow', '#home', function(){ 
                    //loop through the exercises
                    for (var i = 0; i < exercises.length; i++){
                        var numOfQs = document.getElementById("tdQuestions" + exercises[i].name);
                        var attemptedQs = document.getElementById("tdAttempted" + exercises[i].name);
                        var correctQs = document.getElementById("tdCorrect" + exercises[i].name);
                        
                        //count the number of questions
                        numOfQs.innerHTML = exercises[i].questions.length;
                        
                        //count the number of questions attempted (i.e. at least one attempt)
                        var attemptedNumber = 0;
                        var correctNumber = 0;
                        for (var j = 0; j < exercises[i].questions.length; j++){
                            var attempted = false;
                            var correct = true;
                            //loop through each answer canvas to see if there are any attempts
                            for (var k = 0; k < exercises[i].questions[j].answerCanvas.length; k++){
                                if (exercises[i].questions[j].answerCanvas[k].attempts.length > 0){
                                    attempted = true;
                                }
                                if (exercises[i].questions[j].answerCanvas[k].correct != true){
                                    correct = false;
                                }
                            }
                            //if attempted and completely correct, add numbers to totals
                            if (attempted == true){
                                attemptedNumber++;
                            }
                            if (correct == true){
                                correctNumber++;
                            }
                        }
                        //update table with exercise information
                        attemptedQs.innerHTML = attemptedNumber;
                        correctQs.innerHTML = correctNumber;
                    }
                    
                    
                    //count the number of questions that are correct (need 3 correct for ex1 qs)
                });