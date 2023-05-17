//References
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let userStudy = document.getElementById("user-study");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
var ivtCount = 0;
var isitCount = 0;

const quizArray = [
    {
        id: "0",
        question: "Какое направление вас больше интересует?",
        options: ["Разработка программного обеспечения", "Управление информационными системами"],
        correct: "Разработка программного обеспечения"
    },
    {
        id: "1",
        question: "Вам нравится работать с аппаратным обеспечением?",
        options: ["Да", "Нет"],
        correct: "Да"
    },
    {
        id: "2",
        question: "Какую область информатики вы предпочитаете?",
        options: ["Искусственный интеллект и машинное обучение", "Базы данных и системы управления данными"],
        correct: "Искусственный интеллект и машинное обучение"
    },
    {
        id: "3",
        question: "Вам интересно изучать сетевые технологии?",
        options: ["Да", "Нет"],
        correct: "Нет"
    },
    {
        id: "4",
        question: "Какую роль вы предпочитаете в командном проекте?",
        options: ["Программист", "Аналитик"],
        correct: "Прогаммист"
    },
    {
        id: "5",
        question: "Вам нравится работать с большими объемами данных?",
        options: ["Да", "Нет"],
        correct: "Нет"
    }, {
        id: "6",
        question: "Какие навыки вас больше привлекают?",
        options: ["Программирование и алгоритмы", "Анализ данных и моделирование"],
        correct: "Программирование и алгоритмы"
    },
    {
        id: "7",
        question: "Вы предпочитаете работать с пользовательским интерфейсом?",
        options: ["Да", "Нет"],
        correct: "Нет"
    },
    {
        id: "8",
        question: "Какое направление ближе к вашим интересам?",
        options: ["Разработка веб-приложений", "Управление информационной безопасностью"],
        correct: "Разработка веб-приложений"
    },
    {
        id: "9",
        question: "Вы предпочитаете работать с готовыми программными продуктами или разрабатывать собственные решения?",
        options: ["Готовые программные продукты", "Собственные решения"],
        correct: "Собственные решения"
    }
];

//Restart Quiz
restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});

//Next Button
function nextQuestion() {
    questionCount += 1;
    //if last question
    if (questionCount == quizArray.length) {
      //hide question container and display score
      displayContainer.classList.add("hide");
      scoreContainer.classList.remove("hide");
      //user score
      userScore.innerHTML =
        "Ваш счет " + scoreCount + " из " + questionCount;
      if (ivtCount > isitCount) {
        userStudy.innerHTML = "Вам подходит направление ИВТ";
      } else if (isitCount > ivtCount) {
        userStudy.innerHTML = "Вам подходит направление ИСИТ";
      } else {
        userStudy.innerHTML = "Вам подходят оба направления";
      }
    } else {
      countOfQuestion.innerHTML =
        questionCount + 1 + " из " + quizArray.length + " вопросов";
      quizDisplay(questionCount);
    }
  }
//Display quiz
const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
    //Hide other cards
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    //display current question card
    quizCards[questionCount].classList.remove("hide");
};

function quizCreator() {
    //generate quiz
    for (let i of quizArray) {
      let div = document.createElement("div");
      div.classList.add("container-mid", "hide");
      countOfQuestion.innerHTML = 1 + " из " + quizArray.length + " вопросов";
      let question_DIV = document.createElement("p");
      question_DIV.classList.add("question");
      question_DIV.innerHTML = i.question;
      div.appendChild(question_DIV);
  
      for (let option of i.options) {
        let optionBtn = document.createElement("button");
        optionBtn.classList.add("option-div");
        optionBtn.innerText = option;
        optionBtn.addEventListener("click", () => {
          checker(optionBtn);
          nextQuestion();
        });
        div.appendChild(optionBtn);
      }
  
      quizContainer.appendChild(div);
    }
  }

function checker(userOption) {
    let userSolution = userOption.innerText;
    let question = document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");

    options.forEach((element) => {
        element.disabled = true;
        element.classList.remove("selected");
        if (element.innerText == userSolution) {
            element.classList.add("selected");
            if (userSolution === quizArray[questionCount].correct) {
                scoreCount++;
                ivtCount++;
            } else {
                isitCount++;
            }
        }
        if (element.innerText == quizArray[questionCount].correct) {
            element.classList.add("correct");
        }
    });
}



//initial setup
function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    quizCreator();
    quizDisplay(questionCount);
}

//when user click on start button
startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
});

window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
};