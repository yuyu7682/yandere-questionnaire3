const questions = [
    {
        question: "你是否愿意在我面前彻底丧失自己？",
        options: ["愿意，我会成为你的一切", "我不确定，但我会尽量", "绝不，我需要自由"]
    },
    {
        question: "如果我告诉你，你的每一步都在我的掌控之中，你会如何反应？",
        options: ["顺从，接受所有", "反抗，但内心开始动摇", "拒绝，我要逃离"]
    },
    {
        question: "我不会让你自由，你会如何反应？",
        options: ["顺从，我不会离开", "我会挣扎，但最终会屈服", "我会逃跑，拒绝接受束缚"]
    },
    {
        question: "如果我让你做一个决定，你会选择：永远依赖我，还是试图逃脱？",
        options: ["我会依赖你，永远不离开", "我会逃脱，但我心里清楚自己不能离开你", "我不需要任何人，我要自由"]
    },
    {
        question: "如果我决定你只能在我的监视下生活，你会如何应对？",
        options: ["顺从，我会承受一切", "反抗，我不想被束缚", "我会尽量逃离，不想被控制"]
    },
    {
        question: "你是否想要我彻底控制你，直到你再也没有反抗的能力？",
        options: ["是的，我会成为你的奴隶", "不确定，但我开始动摇", "绝不，我要自由"]
    },
    {
        question: "如果你选择了背叛我，你知道会有什么后果吗？",
        options: ["我不会背叛你，我会忠诚", "我不知道，但我也想逃离", "背叛你？我永远不会原谅自己"]
    },
    {
        question: "你是否愿意为我丧失所有的自我，成为我的专属？",
        options: ["愿意，我会永远属于你", "犹豫，我不知道自己能不能承受", "不愿意，我不要成为你的玩物"]
    },
    {
        question: "如果我不理你，你会怎么做？",
        options: ["主动找我，无法忍受孤独", "等待我来找你，内心充满不安", "我会离开，不再依赖你"]
    },
    {
        question: "你认为，谁才是你真正需要的人？",
        options: ["只有你，除了你没有人能替代", "也许是我，但我还是想要些许自由", "没有人，我只依赖自己"]
    },
    {
        question: "如果我决定把你束缚在我的世界里，你能忍受多久？",
        options: ["永远，我会在你身边", "也许可以，但心里会反抗", "无法忍受，我必须逃脱"]
    },
    {
        question: "你认为自己能一直忍受我对你的控制吗？",
        options: ["我会顺从，一直依赖你", "我会反抗，但终究无法摆脱", "我会逃离，你的控制让我窒息"]
    },
    {
        question: "如果你想背叛我，我会如何处理你？",
        options: ["我不会背叛你，你是我唯一的依赖", "我会反抗，但知道无法逃脱", "我无法再忍受这种控制，想要逃走"]
    },
    {
        question: "你是否愿意放弃所有联系外界的机会，只为了留在我身边？",
        options: ["我愿意，永远都只属于你", "我不确定，但我还是希望留在你身边", "我不愿意，外界才是我真正的自由"]
    },
    {
        question: "如果我让你彻底依赖我，你是否会感到满足？",
        options: ["我会感到满足，依赖你就是我的全部", "我不确定，我害怕失去自我", "不，我不想完全依赖你"]
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
            "你愿意丧失自我？真好，你很快就会属于我。",
            "反抗？你无法逃脱的，记住我永远掌控着你。",
            "不想依赖我？你敢挑战我？不可能的。"
        ],
        [
            "你顺从了，真是个乖宝贝。",
            "我看到你心里动摇了，是不是开始害怕我了？",
            "拒绝我？你不可能离开我的控制，永远也逃不掉。"
        ],
        [
            "你依赖我，你会永远感到安全。",
            "你虽然反抗，但内心早已动摇，你无法摆脱我。",
            "你想逃跑？我会让你后悔的。"
        ],
        // 更多的反应继续...
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
            askWhyIgnored(); 
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
        alert("你竟然无视了我？告诉我，为什么要无视我？");
    } else {
        alert("你竟敢连续无视我？我再也不会放过你，游戏将结束。");
        window.close();  // 关闭网页
    }
}

function showResult() {
    let finalResult = "";
    if (score[0] > score[1] && score[0] > score[2]) {
        finalResult = {
            title: "彻底沦陷",
            description: "你彻底丧失了所有的独立性，完全依赖于我。你将成为我唯一的所有物，无法再逃脱。"
        };
    } else if (score[1] > score[0] && score[1] > score[2]) {
        finalResult = {
            title: "危险依赖",
            description: "你虽然内心挣扎，但始终无法离开我。你会一直依赖我，直到无法自拔。"
        };
    } else {
        finalResult = {
            title: "无情的背叛",
            description: "你背叛了我，我不会放过你。你以为逃脱得了我的掌控吗？我会强迫你回到我身边。"
        };
    }

    document.get
