//Prototype for Exercise object. 

//name is the name of the Exercies e.g. ex1
//questions holds the array of Question objects for the Exercise
//currentQuestion is initially set to the 1st Question
//numRight is used to store the number of correct answered Questions for the Exercise
//numWrong is used to store the number of incorrect answered Questions for the Exercise

function Exercise(name) {
    this.name = name;
    this.questions = [];
    this.currentQuestion = 1;
    this.numRight = 0;
    this.numWrong = 0;
}