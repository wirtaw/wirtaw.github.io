const proverbsText = document.getElementById('proverbs-text');
const proverbsSource = document.getElementById('proverbs-source');
// const newProverbsButton = document.getElementById('new-proverbs-button');

const PREFIX = 'wirtaw.githab.io';

const proverbs = [
  {
      proverb: "Искушение сдаться будет особенно сильным незадолго до победы.",
      source: "Китайские пословицы и поговорки",
      language: "ru"
  },
  {
      proverb: "Хитрость жизни в том, чтобы умереть молодым, но как можно позже.",
      source: "Китайские пословицы и поговорки",
      language: "ru"
  },
  {
      proverb: "Не говорите, если это не изменяет тишину к лучшему.",
      source: "Китайские пословицы и поговорки",
      language: "ru"
  },
  {
      proverb: "Путешествие в тысячу ли начинается с одного шага.",
      source: "Китайские пословицы и поговорки",
      language: "ru"
  },
  {
      proverb: "Сильный преодолеет преграду, мудрый — весь путь.",
      source: "Китайские пословицы и поговорки",
      language: "ru"
  },
  {
      proverb: "Не бойся медлить, бойся остановиться.",
      source: "Китайские пословицы и поговорки",
      language: "ru"
  },
  {
      proverb: "У дурака и счастье глупое.",
      source: "Китайские пословицы и поговорки",
      language: "ru"
  },
  {
      proverb: "Если ты споткнулся и упал, это ещё не значит, что ты идёшь не туда.",
      source: "Китайские пословицы и поговорки",
      language: "ru"
  },
  {
      proverb: "Хижина, где смеются, богаче дворца, где скучают.",
      source: "Китайские пословицы и поговорки",
      language: "ru"
  },
  {
      proverb: "Всегда смотри на вещи со светлой стороны, а если таковых нет — натирай тёмные, пока не заблестят.",
      source: "Китайские пословицы и поговорки",
      language: "ru"
  },
  {
      proverb: "То, что случается, случается вовремя.",
      source: "Китайские пословицы и поговорки",
      language: "ru"
  },
  {
      proverb: "Тот, кто указывает на твои недостатки, не всегда твой враг; тот, кто говорит о твоих достоинствах, не всегда твой друг.",
      source: "Китайские пословицы и поговорки",
      language: "ru"
  },
  {
      proverb: "Не бойся, что не знаешь — бойся, что не учишься.",
      source: "Китайские пословицы и поговорки",
      language: "ru"
  },
  {
      proverb: "Учителя только открывают двери, дальше вы идете сами.",
      source: "Китайские пословицы и поговорки",
      language: "ru"
  },
  {
      proverb: "Как бы сильно ни дул ветер, гора перед ним не склонится.",
      source: "Китайские пословицы и поговорки",
      language: "ru"
  },
  {
      proverb: "Живи, сохраняя покой. Придет время и цветы распустятся сами.",
      source: "Китайские пословицы и поговорки",
      language: "ru"
  },
  {
      proverb: "Друга без изъяна не бывает; если будешь искать изъян — останешься без друга.",
      source: "Китайские пословицы и поговорки",
      language: "ru"
  },
  {
      proverb: "Несчастье входит в ту дверь, которую ему открыли.",
      source: "Китайские пословицы и поговорки",
      language: "ru"
  },
  {
      proverb: "Никто не возвращается из путешествий таким, каким он был раньше.",
      source: "Китайские пословицы и поговорки",
      language: "ru"
  },
  {
      proverb: "У тех, кто способен краснеть, не может быть чёрного сердца.",
      source: "Китайские пословицы и поговорки",
      language: "ru"
  },
  {
      proverb: "Лучше один день быть человеком, чем тысячу дней быть тенью.",
      source: "Китайские пословицы и поговорки",
      language: "ru"
  },
  {
      proverb: "Твой дом там, где спокойны твои мысли.",
      source: "Китайские пословицы и поговорки",
      language: "ru"
  },
  {
      proverb: "Человек, который смог сдвинуть гору, начинал с того, что перетаскивал с места на место мелкие камешки.",
      source: "Китайские пословицы и поговорки",
      language: "ru"
  },
  {
      proverb: "Если совершишь ошибку — лучше сразу рассмеяться.",
      source: "Китайские пословицы и поговорки",
      language: "ru"
  },
  {
      proverb: "Лучшее время, чтобы посадить дерево, было двадцать лет назад. Следующее лучшее время — сегодня.",
      source: "Китайские пословицы и поговорки",
      language: "ru"
  }
];

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

function saveProverb(proverb) {
    const expirationTime = Date.now() + 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    const proverbData = {
      data: proverb,
      expires: expirationTime
    };
    localStorage.setItem(PREFIX + '-clientProverb', JSON.stringify(proverbData));
  }

function getRandomProverb() {
  const randomIndex = randomInt(0, proverbs.length);
  return proverbs[randomIndex];
}

function displayProverb() {
  let proverbData = JSON.parse(localStorage.getItem(PREFIX + '-clientProverb'));
  let proverb = proverbData?.data?.proverb || '';
  let source = proverbData?.data?.source || '';
  if (!proverbData || proverbData.expires < Date.now()) {
    proverbData = getRandomProverb();
    saveProverb(proverbData);
    proverb = proverbData.proverb;
    source = proverbData.source;
  }

  proverbsText.textContent = proverb;
  proverbsSource.textContent = `- ${source}`;
}

document.addEventListener('DOMContentLoaded', function() {
    displayProverb();
});

// newProverbsButton.addEventListener('click', displayProverb);