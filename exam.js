var main_container = document.getElementById("main");
var result_container = document.getElementById("result");
var question = document.getElementById("question_id");
var answerList = document.getElementById("answer_list_id");
var mark_btn = document.getElementById("mark_id");
var back_btn = document.getElementById("back_id");
var numOfQuestion = document.getElementById("question_num_id");
var next_btn = document.getElementById("next_id");
var finish_btn = document.getElementById("res_id");
var clock_timer = document.getElementById("clock");
var markedList = document.getElementById("marked_id");

var answers = document.querySelectorAll("ol label");

var marked_questions = document.getElementsByName("marked");
var done_btn = document.getElementById("done_btn");
var answersOptions = document.getElementsByName("answer");
// result page
var msg = document.getElementById("msg");
var user_name = document.getElementById("name");
var passed = document.getElementById("passed");

var counter = 0;
var checked = [];
var res = [];

var Questions = {
  answers: [""],
  correct: "",
  question: "",
};

var q1 = [
  new questionFactor(
    (Questions.answers = ["java", "java script", "#c", "Xml"]),
    (Questions.correct = "1"),
    (Questions.question =
      " What are the most common languages used for web designing?")
  ),
  new questionFactor(
    (Questions.answers = [
      "select item and remove",
      "defining id",
      "add color",
      "select element",
    ]),
    (Questions.correct = "3"),
    (Questions.question = "What is selector in css")
  ),
  new questionFactor(
    (Questions.answers = [
      " Search Engine",
      "Web server",
      "Protocol",
      "Web browser",
    ]),
    (Questions.correct = "3"),
    (Questions.question =
      "Which program is used by web clients to view the web pages?")
  ),
  new questionFactor(
    (Questions.answers = ["summary", "anchor", "div", "ol"]),
    (Questions.correct = "0"),
    (Questions.question = "What is one Semantic HTML?")
  ),
  new questionFactor(
    (Questions.answers = ["Vue Js", "Anqular", "Larvel", "Node js"]),
    (Questions.correct = "3"),
    (Questions.question = "what is the backend using js")
  ),
];
// rearrange all questions
q1 = q1.sort(function () {
  return 0.5 - Math.random();
});

var totalTime = q1.length * 60;

setInterval(UpdateTime, 1000);
setTimeout(function () {
  calculate();
}, totalTime * 1000);

function UpdateTime() {
  if (totalTime !== 0) {
    if (totalTime < 120) {
      clock_timer.style.color = "red";
    }
    var minutes = Math.floor(totalTime / 60);
    var seconds = totalTime % 60;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    clock_timer.innerHTML = `${minutes} : ${seconds}`;
    totalTime--;
  } else {
    clock_timer.innerHTML = "Time Out";
  }
}

function questionFactor(_answer, _correct, _question) {
  this.answers = _answer;
  this.correct = _correct;
  this.question = _question;
}

function displayRandom() {
  var choise = res[counter];
  if (choise == undefined) {
    for (var i = 0; i < answersOptions.length; i++) {
      answersOptions[i].checked = false;
    }
  } else {
    console.log(choise);
    answersOptions[choise].checked = true;
  }
  for (counter; counter < q1.length; counter++) {
    question.innerHTML = `${q1[counter].question}`;
    for (var i = 0; i <= 3; i++) {
      answers[i].innerHTML = `${q1[counter].answers[i]}`;
    }
    numOfQuestion.innerHTML = counter + 1;
    return counter;
  }
}

displayRandom();

next_btn.addEventListener("click", function () {
  nextQuestion();
  displayRandom();
});

back_btn.addEventListener("click", function () {
  backQuestion();
  displayRandom();
  //checkTrueOrNot();
});

// answers eventListners when choose answer
for (var i = 0; i < answersOptions.length; i++) {
  answersOptions[i].addEventListener("click", checkTrueOrNot);
}

function checkTrueOrNot() {
  var correctAns = q1[counter].correct;
  for (var i = 0; i < answersOptions.length; i++) {
    if (answersOptions[i].checked === true) {
      if (i == correctAns) {
        checked[counter] = true;
        res[counter] = i;
      } else {
        checked[counter] = false;
        res[counter] = i;
      }
    }
  }
  //console.log(checked);
}
mark_btn.addEventListener("click", function (e) {
  if (mark_btn.value === "remove") {
    markedList.removeChild(marked_questions[counter]);
    restBtn();
  } else {
    if (markedList.children[counter] == undefined) {
      if (markedList.children.length < q1.length) {
        var newLi = document.createElement("li");
        newLi.appendChild(document.createTextNode(`Question : ${counter + 1}`));
        newLi.setAttribute("value", counter);
        newLi.setAttribute("name", "marked");
        newLi.setAttribute("onClick", "retrnQuestion(this)");
        markedList.append(newLi);
        console.log(newLi);
      }
    }
    nextQuestion();
    displayRandom();
  }
});

function nextQuestion() {
  restBtn();
  if (counter === 3) {
    next_btn.style.visibility = "hidden";
  }
  back_btn.style.visibility = "visible";
  counter++;
}
function backQuestion() {
  restBtn();
  counter--;
  next_btn.style.visibility = "visible";
  if (counter === 0) {
    back_btn.style.visibility = "hidden";
  }
}
function retrnQuestion(e) {
  counter = e.value;
  if (counter == 4) {
    next_btn.style.visibility = "hidden";
  }
  if (counter == 0) {
    back_btn.style.visibility = "hidden";
  }
  displayRandom();
  mark_btn.style.backgroundColor = "rgba(5, 148, 60, 0.9)";
  mark_btn.style.border = "3px solid rgba(9, 241, 79, 0.9)";
  mark_btn.textContent = "Remove";
  mark_btn.value = "remove";
}

finish_btn.addEventListener("click", calculate);

function calculate() {
  var nameStorage = localStorage.getItem("name");
  main_container.style.zIndex = "-1";
  main_container.style.opacity = ".2";
  result_container.style.visibility = "visible";
  var numOfCorrect = 0;
  for (var i = 0; i < res.length; i++) {
    if (checked[i] === true) {
      numOfCorrect += 1;
    }
  }
  if (numOfCorrect > q1.length / 2) {
    msg.innerText = "CONGRATULLTIONS !!";
    passed.innerText = "YOU PASSED YOUR EXAM";
  } else {
    msg.innerText = "OOPS YOU FAILED ,";
    passed.innerText = "YOU SHOULD PRACTICE MORE";
  }
  user_name.innerText = nameStorage;
  totalTime = 0;
}
function restBtn() {
  mark_btn.style.backgroundColor = "rgba(148, 5, 100, 0.9)";
  mark_btn.style.border = "3px solid rgba(170, 2, 114, 0.9)";
  mark_btn.textContent = "Mark";
  mark_btn.value = "";
}
done_btn.addEventListener("click", function () {
  localStorage.clear();
});


if (performance.navigation.type == performance.navigation.TYPE_BACK_FORWARD ||
  performance.navigation.type == performance.navigation.TYPE_RELOAD ) {
  //confirm("you want leave")
  calculate()
}
