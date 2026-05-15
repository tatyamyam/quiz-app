const questions = [
  {
    question: "日本の国鳥は何ですか？",
    choices: ["ツル", "スズメ", "キジ", "ハト"],
    correct: 2
  },
  {
    question: "世界で最も面積が大きい国はどこですか？",
    choices: ["カナダ", "アメリカ合衆国", "中国", "ロシア"],
    correct: 3
  },
  {
    question: "「モナ・リザ」を描いた芸術家は誰ですか？",
    choices: ["ミケランジェロ", "レオナルド・ダ・ヴィンチ", "ラファエロ", "ピカソ"],
    correct: 1
  },
  {
    question: "水が沸騰する温度（1気圧）は何℃ですか？",
    choices: ["80℃", "90℃", "100℃", "120℃"],
    correct: 2
  },
  {
    question: "太陽系で最も大きな惑星は何ですか？",
    choices: ["土星", "木星", "天王星", "海王星"],
    correct: 1
  },
  {
    question: "日本で最も長い川はどれですか？",
    choices: ["利根川", "信濃川", "北上川", "吉野川"],
    correct: 1
  },
  {
    question: "オリンピックの五輪マークは何色ありますか？",
    choices: ["3色", "4色", "5色", "6色"],
    correct: 2
  },
  {
    question: "日本で初めて消費税が導入されたのは何年ですか？",
    choices: ["1985年", "1987年", "1989年", "1991年"],
    correct: 2
  },
  {
    question: "地球上で最も深い海溝はどれですか？",
    choices: ["フィリピン海溝", "トンガ海溝", "マリアナ海溝", "日本海溝"],
    correct: 2
  },
  {
    question: "「ゲルニカ」を描いた芸術家は誰ですか？",
    choices: ["ダリ", "マティス", "ピカソ", "ムンク"],
    correct: 2
  }
];

const TOTAL = questions.length;

let currentIndex = 0;
let score = 0;
let answered = false;

const startScreen   = document.getElementById('start-screen');
const quizScreen    = document.getElementById('quiz-screen');
const resultScreen  = document.getElementById('result-screen');
const progressText  = document.getElementById('progress-text');
const progressFill  = document.getElementById('progress-fill');
const questionText  = document.getElementById('question-text');
const choicesEl     = document.getElementById('choices');
const feedbackEl    = document.getElementById('feedback');
const nextBtn       = document.getElementById('next-btn');
const scoreNumber   = document.getElementById('score-number');
const resultMessage = document.getElementById('result-message');

document.getElementById('start-btn').addEventListener('click', startQuiz);
document.getElementById('retry-btn').addEventListener('click', restartQuiz);
nextBtn.addEventListener('click', goToNext);

function startQuiz() {
  currentIndex = 0;
  score = 0;
  startScreen.classList.add('hidden');
  quizScreen.classList.remove('hidden');
  showQuestion();
}

function showQuestion() {
  answered = false;

  const q = questions[currentIndex];
  const isLast = currentIndex === TOTAL - 1;

  progressText.textContent = `問題 ${currentIndex + 1} / ${TOTAL}`;
  progressFill.style.width = `${((currentIndex + 1) / TOTAL) * 100}%`;

  questionText.textContent = q.question;

  choicesEl.innerHTML = '';
  q.choices.forEach((choice, i) => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.textContent = choice;
    btn.addEventListener('click', () => selectAnswer(i));
    choicesEl.appendChild(btn);
  });

  feedbackEl.className = 'feedback hidden';
  feedbackEl.textContent = '';
  nextBtn.classList.add('hidden');
  nextBtn.textContent = isLast ? '結果を見る' : '次の問題へ →';
}

function selectAnswer(selectedIndex) {
  if (answered) return;
  answered = true;

  const q = questions[currentIndex];
  const buttons = choicesEl.querySelectorAll('.choice-btn');
  buttons.forEach(btn => (btn.disabled = true));

  const isCorrect = selectedIndex === q.correct;

  if (isCorrect) {
    score++;
    buttons[selectedIndex].classList.add('correct');
    feedbackEl.className = 'feedback is-correct';
    feedbackEl.textContent = '正解です！';
  } else {
    buttons[selectedIndex].classList.add('incorrect');
    buttons[q.correct].classList.add('correct');
    feedbackEl.className = 'feedback is-incorrect';
    feedbackEl.textContent = `不正解。正解は「${q.choices[q.correct]}」です。`;
  }

  nextBtn.classList.remove('hidden');
}

function goToNext() {
  currentIndex++;
  if (currentIndex < TOTAL) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  quizScreen.classList.add('hidden');
  resultScreen.classList.remove('hidden');

  scoreNumber.textContent = score;

  if (score === TOTAL) {
    resultMessage.textContent = '全問正解！素晴らしい知識をお持ちです！';
  } else if (score >= 7) {
    resultMessage.textContent = 'よくできました！あと少しで満点です。';
  } else {
    resultMessage.textContent = 'まだまだこれから！再挑戦してみましょう。';
  }
}

function restartQuiz() {
  resultScreen.classList.add('hidden');
  startScreen.classList.remove('hidden');
}
