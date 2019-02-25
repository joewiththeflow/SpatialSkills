//set up each Exercise and add to the exercises array

var exercises = [];
var ex1, ex2, ex3, ex4, ex5, ex6;

function setUpExercises(){
    ex1 = new Exercise("Ex1");
    for (var i = 0; i < exercise1.length; i++){
        ex1.questions.push(exercise1[i]);
    }
    exercises.push(ex1);
    setupQuestionEx1(ex1);
    
    ex2 = new Exercise("Ex2");
    for (var i = 0; i < exercise2.length; i++){
        ex2.questions.push(exercise2[i]);
    }
    exercises.push(ex2);
    setupQuestionEx2(ex2);
    
    ex3 = new Exercise("Ex3");
    for (var i = 0; i < exercise3.length; i++){
        ex3.questions.push(exercise3[i]);
    }
    exercises.push(ex3);
    setupQuestionEx3(ex3);
    
    ex4 = new Exercise("Ex4");
    for (var i = 0; i < exercise4.length; i++){
        ex4.questions.push(exercise4[i]);
    }
    exercises.push(ex4);
    setupQuestionEx4(ex4);
    
    ex5 = new Exercise("Ex5");
    for (var i = 0; i < exercise5.length; i++){
        ex5.questions.push(exercise5[i]);
    }
    exercises.push(ex5);
    setupQuestionEx5(ex5);
    
    ex6 = new Exercise("Ex6");
    for (var i = 0; i < exercise6.length; i++){
        ex6.questions.push(exercise6[i]);
    }
    exercises.push(ex6);
    setupQuestionEx6(ex6);
}