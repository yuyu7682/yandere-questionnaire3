const questions = [
    {
        question: "你是否愿意在我面前彻底丧失自己？",
        options: ["愿意，我会成为你的一切", "我不确定，但我会尽量", "绝不，我需要自由"]
    },
    {
        question: "如果我告诉你，你的每一步都在我的掌控之中，你会如何反应？",
        options: ["顺从，接受所有", "害怕", "反抗"]
    },
    {
        question: "我不会让你自由，你会如何反应？",
        options: ["不会离开你身边的", "挣扎", "逃跑"]
    },
    {
        question: "如果我决定你只能在我的监视下生活，你会如何应对？",
        options: ["顺从，我会承受一切", "反抗，我不想被束缚", "我会尽量逃离，不想被控制"]
    },
    {
        question: "你是否想要我彻底控制你，直到你再也没有反抗的能力？",
        options: ["是的，我会成为你的奴隶", "不确定，但我还是希望留在你身边", "不愿意，我不要成为你的玩物"]
    },
    {
        question: "如果你选择了背叛我，你知道会有什么后果吗？",
        options: ["我不会背叛你，我会忠诚", "我不知道，但我也想逃离", "背叛你？我永远不会原谅自己"]
    },
    {
        question: "你是否愿意为我丧失所有的自我，成为我的专属？",
        options: ["愿意，永远都只属于你", "犹豫，我不知道自己能不能承受", "不愿意，外界才是我真正的自由"]
    },
    {
        question: "如果你无视我的话，我会怎么办？",
        options: ["我会主动找你，无法忍受孤独", "等待你来找我，内心充满不安", "我会离开，不再依赖你"]
    },
    {
        question: "你是否愿意放弃所有联系外界的机会，只为了留在我身边？",
        options: ["我愿意，永远都只属于你", "我不确定，但我还是希望留在你身边", "我不愿意，外界才是我真正的自由"]
    },
];

let currentQuestionIndex = 0;
let timer;
let score = [0, 0, 0]; // 每个选项对应的分数
let ignoredAnswers = 0; // 用于记录无视的次数

// 随机分配每个选项的分数
function randomizeScores() {
    questions.forEach(question => {
        let shuffledScores = [0, 0, 0];
        while (shuffledScores[0] === shuffledScores[1] || shuffledScores[1] === shuffledScores[2] || shuffledScores[0] === shuffledScores[2]) {
            shuffledScores = [
                Math.floor(Math.random() * 3) + 1,
                Math.floor(Math.random() * 3) + 1,
                Math.floor(Math.random() * 3) + 1,
            ];
        }
        question.scores = shuffledScores;
    });
}

function startQuiz() {
    randomizeScores();  // 随机分配每个问题的选项分数
    displayQuestion();
    startTimer();
}

function displayQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById('question').innerText = question.question;
    const options = document.querySelectorAll('.option');
    options.forEach((button, index) => {
        button.innerText = question.options[index];
    });
}

function nextQuestion(selectedOptionIndex) {
    const question = questions[currentQuestionIndex];
    score[selectedOptionIndex] += question.scores[selectedOptionIndex];  // 增加对应的分数
    showReaction(selectedOptionIndex);  // 显示个性化的反应
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        displayQuestion();
        resetTimer();
    } else {
        showResult();
    }
}

function showReaction(index) {
    const reactions = [
        [
            "你愿意丧失自我？我也会",
            "反抗？你无法逃脱的，记住我永远掌控着你。",
            "不想依赖我？你敢挑战我？不可能的。"
        ],
        [
            "真乖",
            "我看到你心里动摇了，是不是开始害怕我了？",
            "为什么？难道我做了什么吗？"
        ],
        [
            "你依赖我，你会永远感到安全。",
            "你虽然反抗，但内心早已动摇，你无法摆脱我。",
            "你想逃跑？难道我做错了什么吗？我只是想保护你"
        ],
    ];

    alert(reactions[currentQuestionIndex][index]);  // 显示不同的情感反应
}

function startTimer() {
    let timeLeft = 20;
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            askWhyIgnored(); // 提醒用户回答
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    startTimer();
}

function askWhyIgnored() {
    ignoredAnswers++;
    if (ignoredAnswers < 3) {
        alert("为什么要无视我？快点认真回答我");
    } else {
        alert("为什么连续无视我？为什么？你不爱我吗？难道我很讨人厌吗？");
        window.close();  // 关闭网页
    }
}

function showResult() {
    let finalResult = "";
    if (score[0] > score[1] && score[0] > score[2]) {
        finalResult = {
            title: "彻底沦陷",
            description: "你完全顺从了我，沉溺在我的掌控中，再也没有回头路。"
        };
    } else if (score[1] > score[0] && score[1] > score[2]) {
        finalResult = {
            title: "危险依赖",
            description: "你虽然心存疑虑，但始终无法脱离我的掌控。你会一直挣扎，直到无法自拔。"
        };
    } else {
        finalResult = {
            title: "无情的背叛",
            description: "你拒绝了我，试图逃离。但我不会轻易放过你。你将被强制掌控。"
        };
    }

    document.getElementById('result-title').innerText = finalResult.title;
    document.getElementById('result-description').innerText = finalResult.description;
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('result-container').style.display = 'block';
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = [0, 0, 0];
    document.getElementById('result-container').style.display = 'none';
    document.getElementById('quiz-container').style.display = 'block';
    startQuiz();
}

startQuiz();  // 开始问卷
