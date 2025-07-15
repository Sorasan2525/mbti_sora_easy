// MBTI診断用の新しい質問と選択肢（ユーザー指定）
const questions = [
  { q: '休みの日はなるべく一人で過ごしたい', a: { text: 'YES', type: 'I' }, b: { text: 'NO', type: 'E' } },
  { q: '自分の発言が相手を傷つけないか、いつも気にする', a: { text: 'YES', type: 'F' }, b: { text: 'NO', type: 'T' } },
  { q: 'ジレンマについて考えることがよくある', a: { text: 'YES', type: 'N' }, b: { text: 'NO', type: 'S' } },
  { q: '熱く語られると、つい感情移入してしまう', a: { text: 'YES', type: 'F' }, b: { text: 'NO', type: 'T' } },
  { q: '旅行の際は、あまり細かく予定を立てたり下調べをしない', a: { text: 'YES', type: 'P' }, b: { text: 'NO', type: 'J' } },
  { q: '人生で、これは絶対に曲げられない信念のようなものがある', a: { text: 'YES', type: 'J' }, b: { text: 'NO', type: 'P' } },
  { q: 'パーティのような集まりが好きだ。', a: { text: 'YES', type: 'E' }, b: { text: 'NO', type: 'I' } },
  { q: '考えすぎて動けないことが多々ある。', a: { text: 'YES', type: 'N' }, b: { text: 'NO', type: 'S' } },
  { q: 'To do リストを作るのは好きな方だ。', a: { text: 'YES', type: 'J' }, b: { text: 'NO', type: 'P' } },
  { q: 'アートをみて、綺麗だな　とか素敵だな　という感想のほかに、「なぜこんな絵になったんだろう」「どんな気持ちで書いたのだろう」のような疑問が浮かんでくる', a: { text: 'YES', type: 'N' }, b: { text: 'NO', type: 'S' } },
  { q: '結果よりも頑張った過程が大切だと思う', a: { text: 'YES', type: 'F' }, b: { text: 'NO', type: 'T' } },
  { q: '悩みがあったら誰かに相談するタイプだ', a: { text: 'YES', type: 'E' }, b: { text: 'NO', type: 'I' } },
];

const mbtiDescriptions = {
  'ISTJ': 'ISTJ 管理者：責任感が強く、現実的で着実に物事を進めるタイプ。',
  'ISFJ': 'ISFJ 擁護者：思いやりがあり、周囲をサポートすることが得意なタイプ。',
  'INFJ': 'INFJ 提唱者：理想主義で直感的、他者の気持ちに敏感なタイプ。',
  'INTJ': 'INTJ 建築家：戦略的で独創的、計画的に物事を進めるタイプ。',
  'ISTP': 'ISTP 巨匠：柔軟で現実的、問題解決が得意なタイプ。',
  'ISFP': 'ISFP 冒険家：穏やかで感受性が豊か、自由を大切にするタイプ。',
  'INFP': 'INFP 仲介者：理想を追い求め、独自の価値観を持つタイプ。',
  'INTP': 'INTP 論理学者：論理的で分析的、新しいアイデアを考えるのが好きなタイプ。',
  'ESTP': 'ESTP 起業家：行動的で現実的、臨機応変に対応できるタイプ。',
  'ESFP': 'ESFP エンターテイナー：社交的で明るく、周囲を楽しませるタイプ。',
  'ENFP': 'ENFP 広報運動家：創造的で情熱的、人とのつながりを大切にするタイプ。',
  'ENTP': 'ENTP 討論者：好奇心旺盛で柔軟、新しいことに挑戦するタイプ。',
  'ESTJ': 'ESTJ 幹部：リーダーシップがあり、組織的に物事を進めるタイプ。',
  'ESFJ': 'ESFJ 領事：協調性が高く、周囲に気配りができるタイプ。',
  'ENFJ': 'ENFJ 主人公：人を導き、サポートすることが得意なタイプ。',
  'ENTJ': 'ENTJ 指揮官：目標志向で戦略的、リーダーシップを発揮するタイプ。',
};

let current = 0;
let scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

const questionEl = document.getElementById('question');
const choiceA = document.getElementById('choiceA');
const choiceB = document.getElementById('choiceB');
const questionArea = document.getElementById('question-area');
const resultArea = document.getElementById('result-area');
const resultType = document.getElementById('result-type');
const resultDesc = document.getElementById('result-desc');
const restartBtn = document.getElementById('restart');

function showQuestion() {
  const q = questions[current];
  questionEl.textContent = q.q;
  choiceA.textContent = q.a.text;
  choiceB.textContent = q.b.text;
}

function nextQuestion(type) {
  scores[type]++;
  current++;
  if (current < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  // 各指標ごとに多い方を採用
  const mbti =
    (scores.E >= scores.I ? 'E' : 'I') +
    (scores.S >= scores.N ? 'S' : 'N') +
    (scores.T >= scores.F ? 'T' : 'F') +
    (scores.J >= scores.P ? 'J' : 'P');
  resultType.textContent = mbti;
  resultDesc.textContent = mbtiDescriptions[mbti] || 'タイプの説明が見つかりませんでした。';
  questionArea.style.display = 'none';
  resultArea.style.display = 'block';
}

function restart() {
  current = 0;
  scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
  resultArea.style.display = 'none';
  questionArea.style.display = 'block';
  showQuestion();
}

choiceA.onclick = () => nextQuestion(questions[current].a.type);
choiceB.onclick = () => nextQuestion(questions[current].b.type);
restartBtn.onclick = restart;

// 初期表示
showQuestion(); 