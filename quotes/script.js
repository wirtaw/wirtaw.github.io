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
  {
    quote: "Дело не в пессимизме и не в оптимизме, а в том, что у девяноста девяти из ста нет ума.",
    author: "© А.Чехов",
    language: "ru"
  },
  {
    quote: "Если человек не курит и не пьёт, поневоле задумаешься, уж не сволочь ли он?",
    author: "© А.Чехов",
    language: "ru"
  },
  {
    quote: "Ехать с женой в Париж все равно, что ехать в Тулу со своим самоваром.",
    author: "© А.Чехов",
    language: "ru"
  },
  {
    quote: "Бывают люди, которые всегда говорят только умные и хорошие слова, но чувствуешь, что они тупые люди.",
    author: "© А.Чехов",
    language: "ru"
  },
  {
    quote: "Если жена тебе изменила, то радуйся, что она изменила тебе, а не отечеству.",
    author: "© А.Чехов",
    language: "ru"
  },
  {
    quote: "Университет развивает все способности, в том числе — глупость.",
    author: "© А.Чехов",
    language: "ru"
  },
  {
    quote: "Говорят: в конце концов правда восторжествует, но это неправда.",
    author: "© А.Чехов",
    language: "ru"
  },
  {
    quote: "Здоровы и нормальны только заурядные, стадные люди.",
    author: "© А.Чехов",
    language: "ru"
  },
  {
    quote: "Для того, чтобы ощущать в себе счастье без перерыва, даже в минуты скорби и печали, нужно: а) уметь довольствоваться настоящим и б) радоваться сознанию, что могло бы быть и хуже.",
    author: "© А.Чехов",
    language: "ru"
  },
  {
    quote: "Когда в твой палец попадает заноза, радуйся: «Хорошо, что не в глаз!»",
    author: "© А.Чехов",
    language: "ru"
  },
  {
    quote: "У очень хорошего человека такая физиономия, что его принимают за сыщика; думают, что он украл запонки.",
    author: "© А.Чехов",
    language: "ru"
  },
  {
    quote: "Замечательный день сегодня. То ли чай пойти выпить, то ли повеситься.",
    author: "© А.Чехов",
    language: "ru"
  },
  {
    quote: "Всё знают и всё понимают только дураки да шарлатаны.",
    author: "© А.Чехов",
    language: "ru"
  },
  {
    quote: "Тот, кому чужда жизнь, кто неспособен к ней, тому ничего больше не остается, как стать чиновником.",
    author: "© А.Чехов",
    language: "ru"
  },
  {
    quote: "Одна боль всегда уменьшает другую. Наступите вы на хвост кошке, у которой болят зубы, и ей станет легче.",
    author: "© А.Чехов",
    language: "ru"
  },
  {
    quote: "Нельзя ставить на сцене заряженное ружье, если никто не имеет в виду выстрелить из него.",
    author: "© А.Чехов",
    language: "ru"
  },
  {
    quote: "Сотни верст пустынной, однообразной, выгоревшей степи не могут нагнать такого уныния, как один человек, когда он сидит, говорит и неизвестно, когда он уйдет.",
    author: "© А.Чехов",
    language: "ru"
  },
  {
    quote: "Если хочешь, чтобы у тебя было мало времени, — ничего не делай.",
    author: "© А.Чехов",
    language: "ru"
  },
  {
    quote: "Нужно по капле выдавливать из себя раба.",
    author: "© А.Чехов",
    language: "ru"
  },
  {
    quote: "Никто не хочет любить в нас обыкновенного человека.",
    author: "© А.Чехов",
    language: "ru"
  },
  {
    quote: "Если против какой-нибудь болезни предлагается очень много средств, то это значит, что болезнь неизлечима.",
    author: "© А.Чехов",
    language: "ru"
  },
  {
    quote: "Не стоит мешать людям сходить с ума.",
    author: "© А.Чехов",
    language: "ru"
  },
  {
    quote: "«Циник» — слово греческое, в переводе на твой язык значащее: свинья, желающая, чтобы весь свет знал, что она свинья.",
    author: "© А.Чехов",
    language: "ru"
  },
  {
    quote: "Эти умники все такие глупые, что не с кем поговорить.",
    author: "© А.Чехов",
    language: "ru"
  },
  {
    quote: "Если бы все люди сговорились и стали вдруг искренни, то всё бы у них пошло к чёрту прахом.",
    author: "© А.Чехов",
    language: "ru"
  },
  {
    quote: "Талантливый человек в России не может быть чистеньким.",
    author: "© А.Чехов",
    language: "ru"
  },
  {
    quote: "Если твой поступок огорчает кого-нибудь, то это еще не значит, что он дурен.",
    author: "© А.Чехов",
    language: "ru"
  },
  {
    quote: "Стать писателем очень нетрудно. Нет того урода, который не нашел бы себе пары, и нет той чепухи, которая не нашла бы себе подходящего читателя.",
    author: "© А.Чехов",
    language: "ru"
  },
  {
    quote: "Нельзя требовать от грязи, чтобы она не была грязью.",
    author: "© А.Чехов",
    language: "ru"
  },
  {
    quote: "«Познай самого себя» — прекрасный и полезный совет; жаль только, что древние не догадались указать способ, как пользоваться этим советом.",
    author: "© А.Чехов",
    language: "ru"
  },
  {
    quote: "Уходить от людей — это самоубийство.",
    author: "© А.Чехов",
    language: "ru"
  },
  {
    quote: "На земле нет ничего хорошего, что в своём первоисточнике не имело бы гадости.",
    author: "© А.Чехов",
    language: "ru"
  },
  {
    quote: "...за почтовым отделением давно уже установилась репутация учреждения, в котором страшно бывать.",
    author: "© А.Чехов",
    language: "ru"
  },
  {
    quote: "На боль я отвечаю криком и слезами, на подлость — негодованием, на мерзость — отвращением. По-моему, это, собственно, и называется жизнью.",
    author: "© А.Чехов",
    language: "ru"
  },
  {
    quote: "Жизнь, по сути, очень простая штука и человеку нужно приложить много усилий, чтобы её испортить.",
    author: "© А.Чехов",
    language: "ru"
  }
];

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

function getRandomQuote() {
  const randomIndex = randomInt(0, quotes.length);
  return quotes[randomIndex];
}

function displayQuote() {
  const randomQuote = getRandomQuote();
  quoteText.textContent = randomQuote.quote;
  quoteAuthor.textContent = `- ${randomQuote.author}`;
}

displayQuote();

newQuoteButton.addEventListener('click', displayQuote);