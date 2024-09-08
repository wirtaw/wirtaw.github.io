const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const newQuoteButton = document.getElementById('new-quote-button');

const quotes = [
  {
    quote: "​​Истинно отважны те души, которые не довольствуются общепринятыми ценностями и устремляются на поиски своих собственных. Но еще отвaжнее те, кто дерзaет не только воспарять в небесa, но и погружаться в глубины. И те из них, кто не отступится, поймут: это одно и то же.",
    author: "© Мишлен Линден «Тени бездны» ",
    language: 'ru'
  },
  {
    quote: "Если человек твой, то он твой. А если его ещё куда-то тянет, то ничего его не удержит. Да и не стоит он ни нервов, ни внимания.",
    author: "© Пауло Коэльо ",
    language: 'ru'
  },
  {
    quote: "​Всё всегда заканчивается хорошо. Если что-то закончилось плохо, значить это ещё не конец.",
    author: "© Пауло Коэльо ",
    language: 'ru'
  },
  {
    quote: "Жизни всегда необходим какой-то кризис, чтобы показать себя во всей красе.",
    author: "© Пауло Коэльо ",
    language: 'ru'
  },
  {
    quote: "Всегда говори то, что чувствуешь и делай то, что думаешь. Молчание ломает судьбы.",
    author: "© Пауло Коэльо ",
    language: 'ru'
  },
  {
    quote: "​Если всегда делать только то, чего ждут от вас другие люди, вы неизбежно станете рабом.",
    author: "© Пауло Коэльо ",
    language: 'ru'
  },
  {
    quote: "​Жизнь особенно интересна тем, что любой твой сон способен стать явью.",
    author: "© Пауло Коэльо ",
    language: 'ru'
  },
  {
    quote: "​Иногда нужно обойти весь мир, чтобы понять, что клад зарыт у твоего собственного дома.",
    author: "© Пауло Коэльо ",
    language: 'ru'
  },
  {
    quote: "Если ты думаешь, что приключения опасны, попробуй рутину — это смертельно.",
    author: "© Пауло Коэльо ",
    language: 'ru'
  },
  {
    quote: "Цените вещи не за то, сколько они стоят, а за то, что они значат.",
    author: "© Пауло Коэльо ",
    language: 'ru'
  },
  {
    quote: "Разумный человек должен ВЫБИРАТЬ, а не принимать свою судьбу",
    author: "© Пауло Коэльо ",
    language: 'ru'
  },
];

function getRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
}

function displayQuote() {
  const randomQuote = getRandomQuote();
  quoteText.textContent = randomQuote.quote;
  quoteAuthor.textContent = `- ${randomQuote.author}`;
}

displayQuote();

newQuoteButton.addEventListener('click', displayQuote);