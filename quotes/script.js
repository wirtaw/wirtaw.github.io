const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const newQuoteButton = document.getElementById('new-quote-button');

const quotes = [
  {
    quote: "​​Истинно отважны те души, которые не довольствуются общепринятыми ценностями и устремляются на поиски своих собственных. Но еще отвaжнее те, кто дерзaет не только воспарять в небесa, но и погружаться в глубины. И те из них, кто не отступится, поймут: это одно и то же.",
    author: "© Мишлен Линден «Тени бездны» ",
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