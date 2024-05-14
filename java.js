const startBtn = document.querySelector('.start-btn');
const popupInfo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const continueBtn = document.querySelector('.continue-btn');
const quizSection = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-box');
const resultBox = document.querySelector('.result-box');
const tryAgainBtn = document.querySelector('.tryAgain-btn');
const goHomeBtn = document.querySelector('.goHome-btn');

startBtn.onclick = () => {
    popupInfo.classList.add('active');
    main.classList.add('active');
}

exitBtn.onclick = () => {
    popupInfo.classList.remove('active');
    main.classList.remove('active');
}

continueBtn.onclick = () => {
    quizSection.classList.add('active');
    popupInfo.classList.remove('active');
    main.classList.remove('active');
    quizBox.classList.add('active');
    
    showQuestions(0);
    questionCounter(1);
    headerScore();
}

tryAgainBtn.onclick = () => {
    quizBox.classList.add('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');

    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
    showQuestions(questionCount);
    questionCounter(questionNumb);

    headerScore();
}

goHomeBtn.onclick = () => {
    quizSection.classList.remove('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');

    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
    showQuestions(questionCount);
    questionCounter(questionNumb);
}

let questionCount = 0;
let questionNumb = 1;
let userScore = 0;

const nextBtn = document.querySelector('.next-btn');

nextBtn.onclick = () => {
    if (questionCount < questions.length - 1) {
        questionCount++;
        showQuestions(questionCount);

        questionNumb++;
        questionCounter(questionNumb);

        nextBtn.classList.remove('active');
    }
    else {
        showResultBox();
    }

}

const optionList = document.querySelector('.option-list');

// getting questions and options from array
function showQuestions(index) {
    const questionText = document.querySelector('.question-text');
    questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;

    let optionTag = `<div class="option"><span>${questions[index].options[0]}</span></div>
        <div class="option"><span>${questions[index].options[1]}</span></div>
        <div class="option"><span>${questions[index].options[2]}</span></div>
        <div class="option"><span>${questions[index].options[3]}</span></div>`
        
    optionList.innerHTML = optionTag;

    const option = document.querySelectorAll('.option');
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute('onclick',  'optionSelected(this)');
    }
}

function optionSelected(answer) {
    let userAnswer = answer.textContent;
    let correctAnswer = questions[questionCount].answer;
    let allOptions =optionList.children.length;
    
    if (userAnswer == correctAnswer) {
        answer.classList.add('correct');
        userScore += 1;
        headerScore();
    }
    else{
        answer.classList.add('incorrect');
        
        // if answer incorrect, auto selected correct answer
        for (let i = 0; i < allOptions; i++) {
            if (optionList.children[i].textContent == correctAnswer) {
                optionList.children[i].setAttribute('class', 'option correct');
            }
        }
    }

    // if user has selected, disabled all options
    for (let i = 0; i < allOptions; i++) {
        optionList.children[i].classList.add('disabled');
    }

    nextBtn.classList.add('active');
}

function questionCounter(index) {
    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent = `${index} of ${questions.length} Questions`;
}

function headerScore() {
    const headerScoreText = document.querySelector('.header-score');
    headerScoreText.textContent = `Score: ${userScore} / ${questions.length}`;
}

function showResultBox() {
    quizBox.classList.remove('active');
    resultBox.classList.add('active');

    const scoreText = document.querySelector('.score-text');
    scoreText.textContent = `Your Score ${userScore} out of ${questions.length}`;
    
    const circularProgress = document.querySelector('.circular-progress');
    const progressvalue = document.querySelector('.progress-value');
    let progressStartValue = -1;
    let progressEndValue = (userScore / questions.length) * 100;
    let speed =20;

    let progress = setInterval(() => {
        progressStartValue++;

        progressvalue.textContent = `${progressStartValue}%`;
        circularProgress.style.background = `conic-gradient(red ${progressStartValue * 3.6}deg, rgba(255, 255, 255, .1) 0deg)`;

        if (progressStartValue == progressEndValue) {
            clearInterval(progress);
        }
    }, speed);
}
let questions = [
    {
        numb: 1,
        question: "what does html stand for?",
        answer: "A. Hyper Text Markup Language",
        options: [
            "A. Hyper Text Markup Language",
            "B. Hyper Text Multi Language",
            "C. Hyper Text Multiple Language",
            "D. Home Text Multi Language"
        ]
    },
    {
        numb: 2,
        question: "what does CSS stand for?",
        answer: "A. Cascading Style Sheet",
        options: [
            "A. Cascading Style Sheet",
            "B. Cute Style Sheet",
            "C. Computer Style Sheet",
            "D. Codehal Style Sheet"
        ]
    },
    {
        numb: 3,
        question: "what does PHP stand for?",
        answer: "A. Hypertext preprocessor",
        options: [
            "A. Hypertext preprocessor",
            "B. Hyper Text Multi Language",
            "C. Hyper Text Multiple Language",
            "D. Home Text Multi Language"
        ]
    },
    {
        numb: 4,
        question: "what does SQL stand for?",
        answer: "D. Structured Query Language",
        options: [
            "A. Strength Query Language",
            "B. Stylesheet Query Language",
            "C. Science Question Language",
            "D. Structured Query Language"
        ]
    },
    {
        numb: 5,
        question: "what does XML stand for?",
        answer: "D. Extensible Markup Language",
        options: [
            "A. Excellent Multiple Language",
            "B. Explore Multiple Language",
            "C. Extra Markup Language",
            "D. Extensible Markup Language"
        ]
    },
    {
        numb: 6,
        question: "Who is making the Web standards?",
        answer: "C. The world wide web consortium",
        options: [
            "A. Google",
            "B. Microsoft",
            "C. The world wide web consortium",
            "D. Mozilla"
        ]
    },
    {
        numb: 7,
        question: "Choose the correct HTML element for the largest heading?",
        answer: "A. h1",
        options: [
            "A. h1",
            "B. h6",
            "C. head",
            "D. heading"
        ]
    },
    {
        numb: 8,
        question: "What is the correct HTML element for inserting a line break?",
        answer: "B. br",
        options: [
            "A. break",
            "B. br",
            "C. lb",
            "D. li"
        ]
    },
    {
        numb: 9,
        question: "Which HTML element defines the title of a document?",
        answer: "C. Title tag",
        options: [
            "A. Head tag",
            "B. Body tag",
            "C. Title tag",
            "D. Meta tag"
        ]
    },
    {
        numb: 10,
        question: "What is the correct HTML element for playing video files?",
        answer: "A. Video element",
        options: [
            "A. Video element",
            "B. Movie element",
            "C. Media element",
            "D. Audio"
        ]
    },
    {
        numb: 11,
        question: "What is the correct HTML element for playing audio files?",
        answer: "D. Audio element",
        options: [
            "A. Sound element",
            "B. Mp3 element",
            "C. Mp4 element",
            "D. Audio element"
        ]
    },
    {
        numb: 12,
        question: "Choose the correct HTML element to define important text?",
        answer: "A. strong",
        options: [
            "A. strong",
            "B. b",
            "C. i",
            "D. important"
        ]
    },
    {
        numb: 13,
        question: "Choose the correct HTML element to define emphasized text?",
        answer: "A. em",
        options: [
            "A. em",
            "B. i",
            "C. italic",
            "D. font"
        ]
    },
    {
        numb: 14,
        question: "Which character is used to indicate an end tag?",
        answer: "B. /",
        options: [
            "A. <",
            "B. /",
            "C. >",
            "D. *"
        ]
    },
    {
        numb: 15,
        question: "How can you make a numbered list?",
        answer: "D. ol",
        options: [
            "A. ul",
            "B. list",
            "C. dl",
            "D. ol"
        ]
    },
    {
        numb: 16,
        question: "How can you make a bulleted list?",
        answer: "A. ul",
        options: [
            "A. ul",
            "B. list",
            "C. dl",
            "D. ol"
        ]
    },
    {
        numb: 17,
        question: "Which HTML attribute specifies an alternate text for an image, if the image cannot be displayed?",
        answer: "C. alt",
        options: [
            "A. longdesc",
            "B. title",
            "C. alt",
            "D. src"
        ]
    },
    {
        numb: 18,
        question: "In HTML, onblur and onfocus are?",
        answer: "A. Event attributes",
        options: [
            "A. Event attributes",
            "B. Style attributes",
            "C. CSS attributes",
            "D. HTML attributes"
        ]
    },
    {
        numb: 19,
        question: "Graphics defined by SVG is in which format?",
        answer: "B. XML",
        options: [
            "A. HTML",
            "B. XML",
            "C. CSS",
            "D. JAVA SCRIPT"
        ]
    },
    {
        numb: 20,
        question: "In HTML, which attribute is used to specify that an input field must be filled out?",
        answer: "A. required",
        options: [
            "A. required",
            "B. formvalidate",
            "C. placeholder",
            "D. validate"
        ]
    }
]