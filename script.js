

const answerTrackerContainer = document.querySelector(".answers-tracker")
const options = document.querySelector(".options").children;
const correctAnswerSpan = document.querySelector(".correct-answers")
const totalQuestionSpan2 = document.querySelector(".total-questions2")
const percentage = document.querySelector(".percentage")
const questionNumberSpan = document.querySelector(".question-num-value")
const totalQuestionSpan = document.querySelector(".total-question")
const question = document.querySelector('.question')
const op1 = document.querySelector(".option1");
const op2 = document.querySelector(".option2");
const op3 = document.querySelector(".option3");
const op4 = document.querySelector(".option4");
let questionIndex = 0;
let index = 0;
let myArray = [];
let myArr=[];
let score = 0;
//question and options and answers

const questions = [
  {
    q:'How do you call a function named "myFunction"? ',
    options:['myFunction()', 'call myFunction()', 'call function myFunction()', 'all of the above'],
    answers: 0
  },
  {
    q:'How to write an IF statement in javascript ? ',
    options:['if i == 5 then', 'if  ( i == 5 )', 'if i = 5', 'if i = 5 then'],
    answers: 1
  },
  {
    q:'How does a FOR loop start ?',
    options:['for (i = 0; i <= 5)', 'for (i <= 5; i++)', 'for i = 1 to 5', 'for (i = 0; i <= 5; i++)'],
    answers: 3
  },
  {
    q:'How do you declare a javascript varaible ?',
    options:['variable carName;', 'var carName;', 'v carName;', 'none of these'],
    answers: 1
  },
  {
    q:'Whch operator is used to assign a value to a variable',
    options:['-', '=', '+', '>='],
    answers: 1
  },

]

//set questions  and options and question number
totalQuestionSpan.innerHTML = questions.length;

function load(){
  questionNumberSpan.innerHTML=index+1;
  question.innerHTML = questions[questionIndex].q;
  op1.innerHTML = questions[questionIndex].options[0];
  op2.innerHTML = questions[questionIndex].options[1];
  op3.innerHTML = questions[questionIndex].options[2];
  op4.innerHTML = questions[questionIndex].options[3];
  index++;
}

function check(element){
  if (element.id==questions[questionIndex].answers){
    element.classList.add("correct");
    updateAnswerTracker("correct")
    score++;
    console.log("Score: " + score);
  }
  else {
    element.classList.add("wrong");
    updateAnswerTracker("wrong")
  }
  disableOption()
}

function disableOption(){
  for(let i =0; i<options.length; i++){
    options[i].classList.add("disabled");
    if (options[i].id==questions[questionIndex].answers){
      options[i].classList.add("correct");
    }
  }
}

function enableOption(){
  for (let i=0; i<options.length; i++){
    options[i].classList.remove("disabled","correct","wrong")
  }
}


function validate(){
  if(!options[0].classList.contains("disabled")){
    alert("Please select one option")
  }else{
    enableOption();
    randomQuestion();
  }
}

function next(){
  validate();
}

function randomQuestion(){
  let randomNumber = Math.floor(Math.random()*questions.length);
  let hitDuplicate = 0;
  if(index == questions.length){
      quizOver();
      console.log("working");
  }
  else {
    if(myArray.length>0){
      for(let i=0; i<myArray.length; i++){
        if(myArray[i]==randomNumber){
          hitDuplicate = 1;
          break;
        }
      }
      if(hitDuplicate==1){
        randomQuestion();
      }else {
            questionIndex=randomNumber;
            load();
            myArr.push(questionIndex);
      }
    }
    if(myArray.length==0){
        questionIndex=randomNumber;
        load();
        myArr.push(questionIndex) ;
  }
  myArray.push(randomNumber);
  }
}

function  answerTracker(){
  for(let i = 0; i<question.length; i++){
    const div=document.createElement("div")
    answerTrackerContainer.appendChild(div);
  }
}
function updateAnswerTracker(classNam){
  answerTrackerContainer.children[index-1].classList.add(classNam);
}

function quizOver(){
  document.querySelector(".quiz-over").classList.add("show");
  correctAnswerSpan.innerHTML=score;
  totalQuestionSpan2.innerHTML=questions.length;
  percentage.innerHTML=(score/questions.length)*100 + "%";
}

function tryAgain(){
  window.location.reload();
}


window.onload = function(){
  randomQuestion();
  answerTracker();
}
