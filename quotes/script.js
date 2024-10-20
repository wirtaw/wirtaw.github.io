const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const langRuButton = document.getElementById('langRu');
const langEnButton = document.getElementById('langEn');
const regularContainer = document.getElementById('regular');
const notFoundContainer = document.getElementById('notFound');

const PREFIX = 'wirtaw.githab.io';
const quoteKey = (lang) => `${PREFIX}-clientQuote-${lang}`;
const languageKey = `${PREFIX}-clientQuote-language`;

const quotes = [
  {
    quote: "жизнь — привилегия и подарок, а вовсе не право. Если нас одарили жизнью, надо ее отслужить",
    author: "© Рэй Брэдбери «Дзен в искусстве написания книг» ",
    language: 'ru',
    comment: 'Причин своего успеха Брэдбери никогда не скрывал. Ему были присущи чувство детской восторженности перед миром и неизбывной любви к нему. И трудолюбие, достаточное для того, чтобы ежедневно писать не менее тысячи слов. Как сформулировал сам Рэй Брэдбери в одном из эссе из сборника «Дзен в искусстве написания книг» (в довольно парадоксальной формулировке, какая собственно только и подобает настоящему коану для медитации и размышлений)',
  },
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
  },
  {
    quote: "​​Чем спокойнее и уравновешеннее человек, тем мощнее его потенциaл и тем большим будет его успех в достойных делах. Невозмутимость разумa – одно из величайших сокровищ мудроcти. ",
    author: "© Джеймс Аллен",
    language: "ru"
  },
  {
    quote: "There are years that ask questions and years that answer.",
    author: "© Zora Neale Hurston, “Dust Tracks on a Road”",
    language: "en"
  },
  {
    quote: "​Ситуации не только нужно уметь использовать, нужно уметь их ещё и создавать.",
    author: "©  Уинстон Черчилль",
    language: 'ru'
  },
  {
    quote: "Умный человек не делает все ошибки сам. Он даёт шанс ошибаться другим и наблюдает.​",
    author: "©  Уинстон Черчилль",
    language: 'ru'
  },
  {
    quote: "У тебя есть враги? Это отлично. Значит, что что-то ты когда-то в своей жизни отстаивал.​",
    author: "©  Уинстон Черчилль",
    language: 'ru'
  },
  {
    quote: "Вы никогда не дойдёте до желаемого, если будете останавливаться возле каждой собаки, чтобы кинуть в неё камень.​",
    author: "©  Уинстон Черчилль",
    language: 'ru'
  },
  {
    quote: "Ни одна звезда не засияет, пока не найдётся человек, который будет держать сзади чёрное полотно.​",
    author: "©  Уинстон Черчилль",
    language: 'ru'
  },
  {
    quote: "Успех не окончателен, неудачи не фатальны. Единственное, что имеет значение — мужество продолжать.​",
    author: "©  Уинстон Черчилль",
    language: 'ru'
  },
  {
    quote: "​Самая горькая правда жизни в том, что и дураки порой бывают правы.",
    author: "©  Уинстон Черчилль",
    language: 'ru'
  },
  {
    quote: "Глуп тот человек, который никогда не меняет своего мнения.​",
    author: "©  Уинстон Черчилль",
    language: 'ru'
  },
  {
    quote: "Не желайте здоровья и богатства. На Титанике все были здоровы и богаты, а выбрались лишь те, кому желали удачи.​",
    author: "©  Уинстон Черчилль",
    language: 'ru'
  },
];

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

function manageLanguageButtons(language) {
  langRuButton.disabled = language === 'ru';
  langEnButton.disabled = language === 'en';
}

function saveQuote(quote, lang) {
  const expirationTime = Date.now() + 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  const quoteData = { data: quote, expires: expirationTime };
  localStorage.setItem(quoteKey(lang), JSON.stringify(quoteData));
}

function getRandomQuote(lang) {
  const filteredQuotes = quotes.filter(({ language }) => language === lang);
  return filteredQuotes.length ? filteredQuotes[randomInt(0, filteredQuotes.length - 1)] : null;
}

function displayQuote(lang = null) {
  let language = lang || localStorage.getItem(languageKey) || navigator.languages[0].split('-')[0] || 'en';

  if (lang) {
    localStorage.setItem(languageKey, language);
  }

  let quoteData = JSON.parse(localStorage.getItem(quoteKey(language)));
  
  if (!quoteData || quoteData.expires < Date.now()) {
    quoteData = getRandomQuote(language);
    if (quoteData) {
      saveQuote(quoteData, language);
    }
  }

  if (quoteData) {
    manageLanguageButtons(language);
    quoteText.textContent = quoteData.quote || quoteData.data.quote;
    quoteAuthor.textContent = (quoteData?.author) ? `- ${quoteData.author}` : `- ${quoteData.data.author}`;
    regularContainer.style.display = 'block';
    notFoundContainer.style.display = 'none';
  } else {
    quoteText.textContent = '';
    quoteAuthor.textContent = '';
    regularContainer.style.display = 'none';
    notFoundContainer.style.display = 'block';
  }
}

document.addEventListener('DOMContentLoaded', displayQuote(null));
langEnButton.addEventListener('click', () => displayQuote('en'));
langRuButton.addEventListener('click', () => displayQuote('ru'));