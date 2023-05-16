'use strict';

let promise = Promise.resolve();  // Used to hold chain of typesetting calls
const DateTime = luxon.DateTime;
const timerBlockID = 'timerBlockID';
const timeInfoBlockID = 'timerInfoBlockID';
const startButtonID = 'startKolokwiumButton';
const resetButtonID = 'resetKolokwiumButton';
const stopButtonID = 'stopKolokwiumButton';
const questionsID = 'QuestionsTest';

const AnswersID = 'Answers';
const AnswersTextAreaID = 'AnswersTextArea';
let now = null;
let countDownTime = null;
let timer;
const kolokwiumTime = 20;
let answerObject = {
  questions: [],
};

const testQuestions = [
  {
    id: 1,
    title: 'Jakie z podanych elementow sa w strukturie danych drzewie?',
    answers: [
      {
        label: 'a',
        value: 'lisc'
      },
      {
        label: 'b',
        value: 'korzen'
      },
      {
        label: 'c',
        value: 'wezel'
      },
      {
        label: 'd',
        value: 'stopien'
      },
      {
        label: 'e',
        value: 'wszystko prawidłowe'
      },
      {
        label: 'f',
        value: 'wszystko nieprawidłowe'
      }
    ],
    description: ''
  },
  {
    id: 2,
    title: 'Jakie z podanych wzorow jest rowna wysokość drzewa?',
    answers: [
      {
        label: 'a',
        value: 'wysokość korzenia -1'
      },
      {
        label: 'b',
        value: 'wysokość korzenia'
      },
      {
        label: 'c',
        value: 'wysokość korzenia +1'
      },
      {
        label: 'd',
        value: 'głębokość'
      },
      {
        label: 'e',
        value: 'wszystko prawidłowe'
      },
      {
        label: 'f',
        value: 'wszystko nieprawidłowe'
      }
    ],
    description: ''
  },
  {
    id: 3,
    title: 'Jakie z podanych operacji możliwe na drzewie binarnym?',
    answers: [
      {
        label: 'a',
        value: 'wstawienie elementa (insert)'
      },
      {
        label: 'b',
        value: 'obejście elementow (traverse)'
      },
      {
        label: 'c',
        value: 'poszukiwanie elementa (search)'
      },
      {
        label: 'd',
        value: 'kasowanie elements (delete)'
      },
      {
        label: 'e',
        value: 'wszystko prawidłowe'
      },
      {
        label: 'f',
        value: 'wszystko nieprawidłowe'
      }
    ],
    description: ''
  },
  {
    id: 4,
    title: 'Jakie z podanych operacji możliwe na drzewie binarnym poszukiwania?',
    answers: [
      {
        label: 'a',
        value: 'wstawienie elementa (insert)'
      },
      {
        label: 'b',
        value: 'obejście elementow (traverse)'
      },
      {
        label: 'c',
        value: 'poszukiwanie elementa (search)'
      },
      {
        label: 'd',
        value: 'kasowanie elements (delete)'
      },
      {
        label: 'e',
        value: 'wszystko prawidłowe'
      },
      {
        label: 'f',
        value: 'wszystko nieprawidłowe'
      }
    ],
    description: ''
  },
  {
    id: 5,
    title: 'Jakie z podanych operacji możliwe na drzewie AVL?',
    answers: [
      {
        label: 'a',
        value: 'wstawienie elementa (insert)'
      },
      {
        label: 'b',
        value: 'obejście elementow (traverse)'
      },
      {
        label: 'c',
        value: 'poszukiwanie elementa (search)'
      },
      {
        label: 'd',
        value: 'kasowanie elements (delete)'
      },
      {
        label: 'e',
        value: 'wszystko prawidłowe'
      },
      {
        label: 'f',
        value: 'wszystko nieprawidłowe'
      }
    ],
    description: ''
  },
  {
    id: 6,
    title: 'Jakie z podanych operacji możliwe na drzewie czerwono-czarnym?',
    answers: [
      {
        label: 'a',
        value: 'wstawienie elementa (insert)'
      },
      {
        label: 'b',
        value: 'obejście elementow (traverse)'
      },
      {
        label: 'c',
        value: 'poszukiwanie elementa (search)'
      },
      {
        label: 'd',
        value: 'kasowanie elements (delete)'
      },
      {
        label: 'e',
        value: 'wszystko prawidłowe'
      },
      {
        label: 'f',
        value: 'wszystko nieprawidłowe'
      }
    ],
    description: ''
  },
  {
    id: 7,
    title: 'Jakie z podanych operacji możliwe na B-drzewie?',
    answers: [
      {
        label: 'a',
        value: 'wstawienie elementa (insert)'
      },
      {
        label: 'b',
        value: 'obejście elementow (traverse)'
      },
      {
        label: 'c',
        value: 'poszukiwanie elementa (search)'
      },
      {
        label: 'd',
        value: 'kasowanie elements (delete)'
      },
      {
        label: 'e',
        value: 'wszystko prawidłowe'
      },
      {
        label: 'f',
        value: 'wszystko nieprawidłowe'
      }
    ],
    description: ''
  },
  {
    id: 8,
    title: 'Jakie z podanych operacji możliwe na Trie drzewie?',
    answers: [
      {
        label: 'a',
        value: 'wstawienie elementa (insert)'
      },
      {
        label: 'b',
        value: 'obejście elementow (traverse)'
      },
      {
        label: 'c',
        value: 'poszukiwanie elementa (search)'
      },
      {
        label: 'd',
        value: 'kasowanie elements (delete)'
      },
      {
        label: 'e',
        value: 'wszystko prawidłowe'
      },
      {
        label: 'f',
        value: 'wszystko nieprawidłowe'
      }
    ],
    description: ''
  },
  {
    id: 9,
    title: 'Jaki z podanych typow nie jest w binarnym drzewie?',
    answers: [
      {
        label: 'a',
        value: 'idealne'
      },
      {
        label: 'b',
        value: 'pelne'
      },
      {
        label: 'c',
        value: 'zerowe'
      },
      {
        label: 'd',
        value: 'degeneratywne'
      },
      {
        label: 'e',
        value: 'zbalansowane'
      },
      {
        label: 'f',
        value: 'lewoskrętne'
      },
      {
        label: 'g',
        value: 'prawoskrętne'
      },
      {
        label: 'h',
        value: 'wszystko prawidłowe'
      },
    ],
    description: ''
  },
  {
    id: 10,
    title: 'Jakimi sposobami możliwe obchodu drzewa binarnego?',
    answers: [
      {
        label: 'a',
        value: 'root order (w kolejności od korzenia)'
      },
      {
        label: 'b',
        value: 'post order (po kolejności)'
      },
      {
        label: 'c',
        value: 'in order (przechodzenie w kolejności)'
      },
      {
        label: 'd',
        value: 'pre order (przed kolejności)'
      },
      {
        label: 'e',
        value: 'wszystko prawidłowe'
      },
      {
        label: 'f',
        value: 'wszystko nieprawidłowe'
      }
    ],
    description: ''
  },
  {
    id: 11,
    title: 'Jaka czasowa złożoność poszukiwania w drzewie binarnym najgorszym wypadku?',
    answers: [
      {
        label: 'a',
        value: '$O(2^n)$'
      },
      {
        label: 'b',
        value: '$O(log(n))$'
      },
      {
        label: 'c',
        value: '$O(n^2)$'
      },
      {
        label: 'd',
        value: '$O(n)$'
      },
      {
        label: 'e',
        value: 'wszystko prawidłowe'
      },
      {
        label: 'f',
        value: 'wszystko nieprawidłowe'
      }
    ],
    description: ''
  },
  {
    id: 12,
    title: 'aka czasowa złożoność poszukiwania w drzewie binarnym poszukiwania najgorszym wypadku?',
    answers: [
      {
        label: 'a',
        value: '$O(n)$'
      },
      {
        label: 'b',
        value: '$O(2^n)$'
      },
      {
        label: 'c',
        value: '$O(n^2)$'
      },
      {
        label: 'd',
        value: '$O(log(n))$'
      },
      {
        label: 'e',
        value: 'wszystko prawidłowe'
      },
      {
        label: 'f',
        value: 'wszystko nieprawidłowe'
      }
    ],
    description: ''
  },
  {
    id: 13,
    title: 'Jaka czasowa złożoność poszukiwania w drzewie AVL najgorszym wypadku?',
    answers: [
      {
        label: 'a',
        value: '$O(n^2)$'
      },
      {
        label: 'b',
        value: '$O(n)$'
      },
      {
        label: 'c',
        value: '$O(log(n))$'
      },
      {
        label: 'd',
        value: '$O(2^n)$ '
      },
      {
        label: 'e',
        value: 'wszystko prawidłowe'
      },
      {
        label: 'f',
        value: 'wszystko nieprawidłowe'
      }
    ],
    description: ''
  },
  {
    id: 14,
    title: 'Jaka czasowa złożoność poszukiwania w B-drzewie najgorszym wypadku?',
    answers: [
      {
        label: 'a',
        value: '$O(log(n))$'
      },
      {
        label: 'b',
        value: '$O(2^n)$'
      },
      {
        label: 'c',
        value: '$O(n^2)$'
      },
      {
        label: 'd',
        value: '$O(n)$'
      },
      {
        label: 'e',
        value: 'wszystko prawidłowe'
      },
      {
        label: 'f',
        value: 'wszystko nieprawidłowe'
      }
    ],
    description: ''
  },
  {
    id: 15,
    title: 'Jaka czasowa złożoność poszukiwania w Trie drzewie najgorszym wypadku?',
    answers: [
      {
        label: 'a',
        value: '$O(n)$'
      },
      {
        label: 'b',
        value: '$O(log(n))$'
      },
      {
        label: 'c',
        value: '$O(n^2)$'
      },
      {
        label: 'd',
        value: '$O(2^n)$ '
      },
      {
        label: 'e',
        value: 'wszystko prawidłowe'
      },
      {
        label: 'f',
        value: 'wszystko nieprawidłowe'
      }
    ],
    description: ''
  },
  {
    id: 16,
    title: 'Jaka czasowa złożoność poszukiwania w czerwono-czarnym drzewie najgorszym wypadku?',
    answers: [
      {
        label: 'a',
        value: '$O(log(n))$'
      },
      {
        label: 'b',
        value: '$O(2^n)$'
      },
      {
        label: 'c',
        value: '$O(n^2)$'
      },
      {
        label: 'd',
        value: '$O(n)$'
      },
      {
        label: 'e',
        value: 'wszystko prawidłowe'
      },
      {
        label: 'f',
        value: 'wszystko nieprawidłowe'
      }
    ],
    description: ''
  },
  {
    id: 17,
    title: 'Według jakiej cechy jest balansowanie AVL drzewo?',
    answers: [
      {
        label: 'a',
        value: 'waga'
      },
      {
        label: 'b',
        value: 'priorytet'
      },
      {
        label: 'c',
        value: 'poziom'
      },
      {
        label: 'd',
        value: 'stopnia'
      },
      {
        label: 'e',
        value: 'wysokości'
      },
      {
        label: 'f',
        value: 'wszystko prawidłowe'
      },
      {
        label: 'g',
        value: 'wszystko nieprawidłowe'
      }
    ],
    description: ''
  },
  {
    id: 18,
    title: 'Według jakiej cechy jest balansowanie czerwono-czarnych drzewo?',
    answers: [
      {
        label: 'a',
        value: 'waga'
      },
      {
        label: 'b',
        value: 'priorytet'
      },
      {
        label: 'c',
        value: 'kolor'
      },
      {
        label: 'd',
        value: 'stopnia'
      },
      {
        label: 'd',
        value: 'wysokości'
      },
      {
        label: 'e',
        value: 'wszystko prawidłowe'
      },
      {
        label: 'f',
        value: 'wszystko nieprawidłowe'
      }
    ],
    description: ''
  },
  {
    id: 19,
    title: 'Według jakiej cechy jest balansowanie B-drzewo?',
    answers: [
      {
        label: 'a',
        value: 'waga'
      },
      {
        label: 'b',
        value: 'priorytet'
      },
      {
        label: 'c',
        value: 'poziom'
      },
      {
        label: 'd',
        value: 'stopnia'
      },
      {
        label: 'd',
        value: 'wysokości'
      },
      {
        label: 'e',
        value: 'wszystko prawidłowe'
      },
      {
        label: 'f',
        value: 'wszystko nieprawidłowe'
      }
    ],
    description: ''
  },
  {
    id: 20,
    title: 'Według jakiej cechy jest balansowanie Splay drzewo?',
    answers: [
      {
        label: 'a',
        value: 'waga'
      },
      {
        label: 'b',
        value: 'priorytet'
      },
      {
        label: 'c',
        value: 'operacji splay'
      },
      {
        label: 'd',
        value: 'stopnia'
      },
      {
        label: 'd',
        value: 'wysokości'
      },
      {
        label: 'e',
        value: 'wszystko prawidłowe'
      },
      {
        label: 'f',
        value: 'wszystko nieprawidłowe'
      }
    ],
    description: ''
  },
  {
    id: 21,
    title: 'Jakie z podanych podejść sa do równoważenia drzew?',
    answers: [
      {
        label: 'a',
        value: 'ścisła równowaga'
      },
      {
        label: 'b',
        value: 'nie balansuj'
      },
      {
        label: 'c',
        value: 'dostosuj przy dostępie'
      },
      {
        label: 'd',
        value: 'całkiem niezłe wyważenie'
      },
      {
        label: 'e',
        value: 'wszystko prawidłowe'
      },
      {
        label: 'f',
        value: 'wszystko nieprawidłowe'
      }
    ],
    description: ''
  },

];

document.body.onload = loadDocument();

document.getElementById(startButtonID).onclick = async function() {
  const button = document.getElementById(startButtonID);
  button.style.display = 'none';

  now = null;
  countDownTime = null;

  clearInterval(timer);
  await startKolokwium();
};

document.getElementById(resetButtonID).onclick = async function() {
  const button = document.getElementById(resetButtonID);
  button.style.display = 'none';

  now = null;
  countDownTime = null;

  clearStore();
  clearTextArea();
  clearInterval(timer);
  await startKolokwium();
};

document.getElementById(stopButtonID).onclick = function() {
  const button = document.getElementById(stopButtonID);
  const startButton = document.getElementById(startButtonID);
  const resetButton = document.getElementById(resetButtonID);

  button.style.display = 'none';
  resetButton.style.display = 'none';
  startButton.style.display = 'block';

  stopKolokwium();
};

async function startKolokwium() {
  let timeValue = { minutes: kolokwiumTime, seconds: 0 };
  const timerBlock = document.getElementById(timerBlockID);
  const resetButton = document.getElementById(resetButtonID);
  const stopButton = document.getElementById(stopButtonID);
  const timeInfoBlock = document.getElementById(timeInfoBlockID);
  const answersBlock = document.getElementById(AnswersID);

  const questionBlock = document.getElementById(questionsID);
  const randomQuestion = shuffle([...testQuestions], 0.123333).slice(0, 10);

  if (timerBlock && questionBlock) {
    timerBlock.style.display = 'block';
    resetButton.style.display = 'block';
    stopButton.style.display = 'block';
    questionBlock.style.display = 'block';
    timeInfoBlock.style.display = 'block';
    answersBlock.style.display = 'block';

    timerBlock.innerText = `${timeValue.minutes}:0${timeValue.seconds}`;
    now = DateTime.now();
    await appendQuestions(randomQuestion);

    timer = setInterval(function () {
      countDownTime = DateTime.now();
      const diff = countDownTime.diff(now, ['minutes', 'seconds']).toObject();
      if (diff) {
        const goneTime = diff.minutes * 60 + diff.seconds;
        const mustBeTime = timeValue.minutes * 60 + timeValue.seconds;
        const percent = 100 - ((goneTime * 100) / mustBeTime);
        // timeInfoBlock.innerHTML = '<span class="notification">goneTime: ' + goneTime + ' / mustBeTime: ' + mustBeTime + ' / ' + percent + '%.</span>';

        if (percent >= 0.75 && goneTime < mustBeTime) {
          timerBlock.setAttribute('class', 'has-text-primary');
          timerBlock.innerText = `${convertToMinutesAndSeconds(diff, timeValue)}`;
        } else if (percent < 0.75  && percent >= 0.25  && goneTime < mustBeTime) {
          timerBlock.setAttribute('class', 'has-text-warning');
          timerBlock.innerText = `${convertToMinutesAndSeconds(diff, timeValue)}`;
        } else if (percent < 0.25  && percent >= 0.01   && goneTime < mustBeTime) {
          timerBlock.setAttribute('class', 'has-text-error');
          timerBlock.innerText = `${convertToMinutesAndSeconds(diff, timeValue)}`;
        } else {
          timerBlock.innerHTML = '<span class="notification">Czas na praca jest wyczerpany. Proszę skopiować odpowiedzi i zapisać w Github w pliku `Kolokwium/Kolokwium1.md`. </span>';
        }
      }
    }, 1000);

  }
}

function stopKolokwium() {
  const timerBlock = document.getElementById(timerBlockID);
  timerBlock.innerText = '';
  now = null;
  countDownTime = null;

  const questionBlock = document.getElementById(questionsID);
  questionBlock.innerHTML = '';

  clearStore();
  clearTextArea();
  clearInterval(timer);
}

function loadDocument () {
  const kolokwiumTimeBlock = document.getElementById('kolokwiumTime');

  if (kolokwiumTimeBlock) {
    kolokwiumTimeBlock.innerText = `${kolokwiumTime}`;
  }
  clearStore();
  clearTextArea();
}

async function appendQuestions(questions) {
  const questionBlock = document.getElementById(questionsID);
  questionBlock.innerHTML = '';

  for await (const question of questions) {
    const {cardDiv, questionContentId} = createCardDiv(question, 'Test');

    questionBlock.appendChild(cardDiv);
    await addOptions(questionContentId, question.id, question.answers, 'Test');
    const br = document.createElement('br');
    questionBlock.appendChild(br);
  }
}

async function addOptions(elemId, id, answers, type = '') {
  const elem = document.getElementById(elemId);
  for await (const answer of answers) {
    const formField = document.createElement('div');
    formField.setAttribute('class', 'field');

    const labelId = 'label' + type + elemId + id + '' + answer.label;
    const optionLabel = document.createElement('label');
    optionLabel.setAttribute('class', 'checkbox');
    optionLabel.setAttribute('id', labelId);

    const optionInput = document.createElement('input');
    optionInput.setAttribute('type', 'checkbox');
    optionInput.setAttribute('id', 'checkbox' + type + elemId + id + '' + answer.label);
    optionInput.setAttribute('value', answer.label);

    optionInput.addEventListener('change', (event) => {
      getContentCheckboxes(elemId);
    });

    const optionTitleContent = document.createTextNode(answer.label + ') ' + answer.value + '   ');
    optionLabel.appendChild(optionTitleContent);

    optionLabel.appendChild(optionInput);
    formField.appendChild(optionLabel);
    elem.appendChild(formField);

    if (answer.value.includes('$')) {
      await typeset(() => {
        const math = document.getElementById(labelId);
        math.innerHTML = answer.label + ') ' + answer.value;
        math.appendChild(optionInput);
        return [math];
      });
    }
  }
  return Promise.resolve();
}

function getContentCheckboxes(contentId) {
  const options = document.querySelectorAll(`#${contentId} input[type='checkbox']`);
  if (options) {
    let type = 'Test';

    const questionId = +contentId.replace(/Content/gi, '').replace(/question/gi, '').replace(/Test/gi, '')
    const question = { id: questionId, answers: [] };

    options.forEach((option) => {
      if (option.checked) {
        question.answers.push(option.value);
      }
    });

    if (type === 'Test') {
      answerObject.questions = answerObject.questions.filter(({id}) => id !== questionId);
      answerObject.questions.push(question);
      answerObject.questions = answerObject.questions.sort((a, b) => b.id - a.id);
    }

    fillTextArea();
  }
}

function fillTextArea() {
  const answersTextAreaBlock = document.getElementById(AnswersTextAreaID);
  let innerText = '';

  if (answerObject.questions && Array.isArray(answerObject.questions)) {
    for (const question of answerObject.questions) {
      const questionTitle = document.getElementById('questionTest' + question.id + 'Title');
      // let answers = '';

      innerText = `${innerText}
Pytanie ${(questionTitle) ? `${question.id}) '${questionTitle.innerText}'` : question.id}: 
Odpowiedzi: 
        ${question.answers.map((answerId) => {
          const answerTitle = document.getElementById('labelTestquestionTest' + question.id + 'Content' +question.id + answerId);
          return `${answerTitle.innerText}
`;
        }).join('')}
`;
    }
  }

  answersTextAreaBlock.value = innerText;
}

function createCardDiv(question, type = '') {
  const cardDiv = document.createElement('div');
  cardDiv.setAttribute('class', 'card');
  const cardHeaderDiv = document.createElement('div');
  cardHeaderDiv.setAttribute('class', 'card-header');
  const cardHeaderTitleDiv = document.createElement('div');
  cardHeaderTitleDiv.setAttribute('class', 'card-header-title');
  cardHeaderTitleDiv.setAttribute('id', 'question' + type + question.id + 'Title');

  const newTitleContent = document.createTextNode(question.title);
  cardHeaderTitleDiv.appendChild(newTitleContent);

  cardHeaderDiv.appendChild(cardHeaderTitleDiv);
  cardDiv.appendChild(cardHeaderDiv);

  const cardContentDiv = document.createElement('div');
  cardContentDiv.setAttribute('class', 'card-content');

  const contentDiv = document.createElement('div');
  contentDiv.setAttribute('class', 'content');
  const questionContentId = 'question' + type + question.id + 'Content';
  contentDiv.setAttribute('id', questionContentId);

  cardContentDiv.appendChild(contentDiv);
  cardDiv.appendChild(cardContentDiv);

  return { cardDiv, questionContentId };
}

function clearTextArea() {
  const answersTextAreaBlock = document.getElementById(AnswersTextAreaID);
  answersTextAreaBlock.value = '';
}

function clearStore() {
  answerObject.questions = [];
  answerObject.complexity = [];
  answerObject.correctness = [];
  answerObject.pseudocode = [];
}

const convertToMinutesAndSeconds = (diff, timeValue) => {
  const minutes = timeValue.minutes - diff.minutes;
  const seconds = Math.floor(diff.seconds) > 0 ? 60 - Math.floor(diff.seconds) : 0;
  return `${(minutes - 1) <= 0 ? 0 : minutes - 1}:${seconds < 10 ? `0${seconds}` : seconds}`;
};

function typeset(code) {
  promise = promise.then(() => MathJax.typesetPromise(code()))
    .catch((err) => console.log('Typeset failed: ' + err.message));
  return promise;
}
