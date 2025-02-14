const questions = [
    {
        question: "你觉得我应该怎样才会彻底属于我？",
        options: ["完全依赖我", "有自己的空间", "我不需要任何束缚"]
    },
    {
        question: "如果我说你只能属于我一个人，你会怎么做？",
        options: ["顺从", "犹豫", "拒绝"]
    },
    {
        question: "我为你做了这么多，你还想要什么？",
        options: ["更多的关心", "你已经做得足够了", "我不需要任何东西"]
    },
    {
        question: "如果你有选择的权利，你想怎么过我们的生活？",
        options: ["依赖我，永远不离开", "我希望有更多的自由", "我不需要任何束缚"]
    },
    {
        question: "你是否愿意为了我放弃一切？",
        options: ["愿意", "犹豫", "拒绝"]
    },
    {
        question: "如果我不理你，你会怎么做？",
        options: ["主动找我", "等我主动", "我会离开"]
    },
    {
        question: "你觉得自己会一直属于我吗？",
        options: ["是的，永远属于你", "不确定", "我不想属于任何人"]
    },
    {
        question: "如果我说‘你必须遵从我’，你会怎么办？",
        options: ["顺从", "反抗", "无所谓"]
    },
    {
        question: "你觉得我们之间的关系应该是什么样的？",
        options: ["完全依赖我", "彼此独立，但还是在一起", "我不想依赖任何人"]
    },
    {
        question: "如果我让你失望了，你怎么办？",
        options: ["会原谅你", "感到不满，但还是会原谅", "我会离开"]
    },
    {
        question: "如果我控制了你的一切，你会如何反应？",
        options: ["顺从", "抗拒", "无所谓"]
    },
    {
        question: "你愿意为我牺牲吗？",
        options: ["愿意", "犹豫", "不愿意"]
    },
    {
        question: "如果你和我发生争执，你会怎么做？",
        options: ["主动道歉", "我会反抗", "我会离开"]
    },
    {
        question: "你希望我对你有多少占有欲？",
        options: ["完全掌控", "适度的占有欲", "不需要占有欲"]
    },
    {
        question: "如果我要求你做到什么，你会感到如何？",
        options: ["顺从", "怀疑", "拒绝"]
    },
];

let currentQuestionIndex = 0;
let timer;
let score = [0, 0, 0]; // 每个选项对应的分数

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
    alert(`反应: ${getReaction(selectedOptionIndex)}`); // 显示反应
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        displayQuestion();
        resetTimer();
    } else {
        showResult();
    }
}

function getReaction(index) {
    const reactions = [
        "乖，真是我的宝贝", "你不想让我完全掌控吗？", "好吧，你的反抗让我不悦"
    ];
    return reactions[index];
}

function startTimer() {
    let timeLeft = 20;
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            nextQuestion(1);  // 默认选项，自动选中第二个
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    startTimer();
}

function showResult() {
    let finalResult = "";
    if (score[0] > score[1] && score[0] > score[2]) {
        finalResult = {
            title: "彻底沦陷",
            description: "你完全顺从了我，沉溺在我的掌控中，再也没有回头路。我会永远爱你。"
        };
    } else if (score[1] > score[0] && score[1] > score[2]) {
        finalResult = {
            title: "危险依赖",
            description: "你虽然心存疑虑，但始终无法脱离我的掌控。你会一直挣扎，直到无法自拔。"
        };
    } else {
        finalResult = {
            title: "无情的背叛",
            description: "为什么你拒绝了我？为什么试图逃离？为什么为什么为什么为什么为什么为什么为什么为什么为什么"
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
