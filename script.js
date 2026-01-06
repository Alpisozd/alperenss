// Sorular: 3 tanesi kullanıcı tarafından verildi, kalan 7 benim tarafımdan eklendi.
const questions = [
  {
    q: "Alperen'in en sevdiği renk hangisidir?",
    options: ["Mavi", "Yeşil", "Kırmızı", "Siyah"],
    answer: 1
  },
  {
    q: "Alperen'in en sevdiği yemek hangisidir?",
    options: ["Lahmacun", "İskender", "Makarna", "Kebap"],
    answer: 1
  },
  {
    q: "Alperen'in en sevdiği şarkı hangisidir?",
    options: ["Sezen Aksu - Geri Dön", "Tarkan - Şımarık", "Lullaby", "Ezginin Günlüğü - Gönül"],
    answer: 2
  },
  {
    q: "Alperen'in en sevdiği hayvan hangisidir?",
    options: ["Köpek", "Kedi", "Kuş", "Balık"],
    answer: 0
  },
  {
    q: "Alperen en çok hangi sporu sever?",
    options: ["Futbol", "Basketbol", "Yüzme", "Koşu"],
    answer: 0
  },
  {
    q: "En sevdiği tatil türü hangisidir?",
    options: ["Deniz tatili", "Dağ tatili", "Şehir turu", "Köy kaçamağı"],
    answer: 0
  },
  {
    q: "Alperen'in en sevdiği içecek hangisidir?",
    options: ["Çay", "Kahve", "Ayran", "Kola"],
    answer: 0
  },
  {
    q: "En sevdiği film türü hangisidir?",
    options: ["Aksiyon", "Romantik", "Komedi", "Korku"],
    answer: 0
  },
  {
    q: "Hangi mevsimi daha çok sever?",
    options: ["Yaz", "Kış", "İlkbahar", "Sonbahar"],
    answer: 0
  },
  {
    q: "Alperen en çok hangi oyun türünü tercih eder?",
    options: ["Bilgisayar oyunu", "Masa oyunu", "Kart oyunu", "Spor oyunu"],
    answer: 0
  }
];

const quizEl = document.getElementById('quiz');
const submitBtn = document.getElementById('submitBtn');
const retryBtn = document.getElementById('retryBtn');
const resultEl = document.getElementById('result');

function renderQuiz() {
  quizEl.innerHTML = '';
  questions.forEach((item, idx) => {
    const field = document.createElement('fieldset');
    field.className = 'card';
    const legend = document.createElement('legend');
    legend.textContent = `Soru ${idx + 1}: ${item.q}`;
    field.appendChild(legend);

    const opts = document.createElement('div');
    opts.className = 'options';

    item.options.forEach((opt, i) => {
      const label = document.createElement('label');
      label.className = 'option';
      label.innerHTML = `
        <input type="radio" name="q${idx}" value="${i}" />
        <span>${opt}</span>
      `;
      opts.appendChild(label);
    });

    field.appendChild(opts);
    quizEl.appendChild(field);
  });
}

function gradeQuiz() {
  let score = 0;
  const userAnswers = [];

  questions.forEach((item, idx) => {
    const selected = document.querySelector(`input[name="q${idx}"]:checked`);
    const value = selected ? Number(selected.value) : null;
    userAnswers.push(value);
    if (value === item.answer) score += 1;
  });

  showResult(score, userAnswers);
}

function showResult(score, userAnswers) {
  const percent = Math.round((score / questions.length) * 100);
  let message = '';
  if (score >= 9) message = 'Mükemmel! 🎉 Alperen'i çok iyi tanıyorsun.';
  else if (score >= 7) message = 'Çok iyi 👏 Biraz daha yakınsın.';
  else if (score >= 4) message = 'Orta seviyede — biraz daha öğrenmelisin.';
  else message = 'Daha fazlasını öğrenmelisin 😅';

  resultEl.className = 'result';
  resultEl.innerHTML = `
    <div class="score"><strong>Puan:</strong> ${score} / ${questions.length} — ${percent}%</div>
    <div class="message">${message}</div>
  `;

  // Show correct/incorrect per question
  const fields = quizEl.querySelectorAll('fieldset');
  fields.forEach((field, idx) => {
    const user = userAnswers[idx];
    const correct = questions[idx].answer;
    // remove prior classes
    field.classList.remove('correct','wrong');

    if (user === null) {
      field.classList.add('wrong');
    } else if (user === correct) {
      field.classList.add('correct');
    } else {
      field.classList.add('wrong');
    }

    const showKey = document.createElement('div');
    showKey.className = 'answer-key';
    showKey.innerHTML = `<strong>Doğru cevap:</strong> ${questions[idx].options[correct]}`;
    // Remove old if exists
    const old = field.querySelector('.answer-key');
    if (old) old.remove();
    field.appendChild(showKey);
  });

  submitBtn.style.display = 'none';
  retryBtn.style.display = 'inline-block';
}

function resetQuiz() {
  renderQuiz();
  resultEl.innerHTML = '';
  submitBtn.style.display = 'inline-block';
  retryBtn.style.display = 'none';
}

submitBtn.addEventListener('click', gradeQuiz);
retryBtn.addEventListener('click', resetQuiz);

// İlk render
renderQuiz();
