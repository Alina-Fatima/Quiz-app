const StartScreen = document.getElementById('start-screen')
const StartQuizBtn = document.getElementById('quiz-strt-btn')
const QuizScreen = document.getElementById('quiz-screen')
const QstnText = document.getElementById('qstn-text')
const currentQstnSpan = document.getElementById('current-qstn')
const ScoreSpan = document.getElementById('score')
const AnsContainer = document.getElementById('answers-container')
const Progress = document.getElementById('progress')
const ResultScreen = document.getElementById('result-screen')
const FinalScoreSpan = document.getElementById('final-score')
const ResultMsg = document.getElementById('result-message')
const MaxScoreSpan = document.getElementById('maximum-score')
const RestartBtn = document.getElementById('restart-btn')
const totalQuestionSpan = document.getElementById('total-qstns')

const quizquestion = [
    {
    question: 'Which Country has the largest Area?',
    answer : [
        {text: 'London', correct : false},
        {text: 'Pakistan', correct : false},
        {text: 'UK', correct : false},
        {text: 'Russia', correct : true},
    ],
  },
  {
    question: 'Which Planet is called Red Planet?',
    answer: [
        {text: 'Mars', correct: true},
        {text: 'Earth', correct: false},
        {text: 'Jupiter', correct: false},
        {text: 'Venus', correct: false},
    ],
  },
  {
    question: 'What is the capital of Farance?',
    answer: [
        {text: 'London', correct: false},
        {text: 'Berlin', correct: false},
        {text: 'Paris', correct: true},
        {text: 'Madrid', correct: false},
    ],
  },
  {
    question: 'What is the modern name of Constantinople?',
    answer: [
        {text: 'Istanbul', correct: true},
        {text: 'Quantum', correct: false},
        {text: 'Iraq', correct: false},
        {text: 'United-State', correct: false},
    ],
  },
  {
    question: 'Who has got the title of babay-urdu?',
    answer: [
        {text: 'Allama Iqbal', correct: false},
        {text: 'Quid-e-Azam', correct: false},
        {text: 'Molvi-Abdul-Haq', correct: true},
        {text: 'Abdul Nazeer', correct: false},
    ],
  },
];

// QUIZ STATE VARS

let currentQuestionIndex = 0;
let score = 0;
let answerDisabled = false


totalQuestionSpan.textContent = quizquestion.length;
MaxScoreSpan.textContent = quizquestion.length

StartQuizBtn.addEventListener("click", startQuiz)
RestartBtn.addEventListener("click", restartQuiz)

function startQuiz() {
    currentQuestionIndex = 0;
    ScoreSpan.textContent = 0;

    StartScreen.classList.remove('active')
    QuizScreen.classList.add('active')

    showQuestion()
}

function showQuestion(){
    answerDisabled = false;
    const currentQuestion = quizquestion[currentQuestionIndex]
    currentQstnSpan.textContent = currentQuestionIndex + 1

    const progressPercent = (currentQuestionIndex / quizquestion.length) * 100;
    Progress.style.width = progressPercent + "%"

    QstnText.textContent = currentQuestion.question

    AnsContainer.innerHTML = "";

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button")
        button.textContent = answer.text
        button.classList.add('answer-btn')

        button.dataset.correct = answer.correct

        button.addEventListener('click', selectAnswer);
        AnsContainer.appendChild(button);
    })
}
function selectAnswer(event) {
    if(answerDisabled) return 

    answerDisabled = true 
    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === 'true'

    Array.from(AnsContainer.children).forEach(button => {
        if(button.dataset.correct === 'true'){
            button.classList.add('correct')
        } else if (button === selectedButton){
            button.classList.add('incorrect');
        }
    })
    if (isCorrect) {
        score ++;
        ScoreSpan.textContent = score
    }
    setTimeout(() => {
        currentQuestionIndex++;
        
        if(currentQuestionIndex < quizquestion.length){
            showQuestion()
        } else {
            showResults()
        }
    },1000)
}
function showResults() {
    QuizScreen.classList.remove('active')
    ResultScreen.classList.add('active')

    FinalScoreSpan.textContent = score;
    const percentage = (score/quizquestion.length) * 100
    if(percentage === 100) {
        ResultMsg.textContent = 'Perfect! You are a genius!';
    }  else if (percentage >= 80) {
         ResultMsg.textContent = 'Great job! You know your stuff!';
    } else if (percentage >= 60) {
         ResultMsg.textContent = 'Great effort! keep learning!';
    } else if (percentage >= 40) {
         ResultMsg.textContent = "Keep studying! You'll get better!"; 
    } 

}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    answerDisabled = false;

    ScoreSpan.textContent = 0;

    ResultScreen.classList.remove('active')
    StartScreen.classList.add('active')
}
