const quoteText = document.getElementById("quote-text");
const quoteAuthor = document.getElementById("quote-author");
const langRuButton = document.getElementById("langRu");
const langEnButton = document.getElementById("langEn");
const StoicQuoteButton = document.getElementById("StoicQuote");
const regularContainer = document.getElementById("regular");
const notFoundContainer = document.getElementById("notFound");

const PREFIX = "wirtaw.githab.io";
const quoteKey = (lang) => `${PREFIX}-clientQuote-${lang}`;
const languageKey = `${PREFIX}-clientQuote-language`;

const StoicQuotes = [
  {
    quote:
      "What faculty tells you as to whether you should believe or disbelieve what someone tells you? If you believe it, should you be angry about it? Is it not the faculty of choice that tells you that?",
    author: "Epictetus",
    language: "en",
    comment: "",
    date: "2024-10-01",
  },
  {
    quote:
      "Reason, which controls nature, has no motive to do evil. It has no malice, it doesn’t injure anyone, and nothing is harmed by it.",
    author: "Marcus Aurelius",
    language: "en",
    comment: "",
    date: "2024-10-02",
  },
  {
    quote:
      "We must therefore persuade ourselves of the view that all the vices of the vulgar may not appear hateful to us, but merely ridiculous.",
    author: "Seneca",
    language: "en",
    comment: "",
    date: "2024-10-03",
  },
  {
    quote:
      "Only the faculty of choice can see clearly enough to evaluate the worth of all other faculties, as well as its own worth, and declare that it is the supreme faculty.",
    author: "Epictetus",
    language: "en",
    comment: "",
    date: "2024-10-04",
  },
  {
    quote:
      "Look below the surface. Don’t let a thing’s true nature or value escape you.",
    author: "Marcus Aurelius",
    language: "en",
    comment: "",
    date: "2024-10-05",
  },
  {
    quote:
      "We must take a lighter view of all things, tolerating and accepting them.",
    author: "Seneca",
    language: "en",
    comment: "",
    date: "2024-10-06",
  },
  {
    quote:
      "To advance towards perfection, you need to use spoken words to learn what is taught here, to purify your choice, and to deal correctly with impressions.",
    author: "Epictetus",
    language: "en",
    comment: "",
    date: "2024-10-07",
  },
  {
    quote: "Not to be like that is the best revenge.",
    author: "Marcus Aurelius",
    language: "en",
    comment: "",
    date: "2024-10-08",
  },
  {
    quote:
      "The human race owes more to the one who laughs than the one who mourns for it.",
    author: "Seneca",
    language: "en",
    comment: "",
    date: "2024-10-09",
  },
  {
    quote:
      "Your business, my friend, is to prepare yourself to use impressions according to nature, not fail in your desires, not experience anything you don’t desire, and never face misfortune, but be free, unrestricted, and unrestrained.",
    author: "Epictetus",
    language: "en",
    comment: "",
    date: "2024-10-10",
  },
  {
    quote:
      "Let this be your delight and refreshment. Move from one service to the community to another.",
    author: "Marcus Aurelius",
    language: "en",
    comment: "",
    date: "2024-10-11",
  },
  {
    quote:
      "The one who laughs provides a measure of optimism while the one who weeps does so foolishly, giving up all hopes of remedying things.",
    author: "Seneca",
    language: "en",
    comment: "",
    date: "2024-10-12",
  },
  {
    quote:
      "Don’t you see then, if speaking properly demands a skilled person, to listen with benefit also demands a skilled person?",
    author: "Epictetus",
    language: "en",
    comment: "",
    date: "2024-10-13",
  },
  {
    quote:
      "One universal nature brings about everything. There is no rival to it. There is nothing beyond it and nothing within it. There is nothing apart from it.",
    author: "Marcus Aurelius",
    language: "en",
    comment: "",
    date: "2024-10-14",
  },
  {
    quote:
      "When surveying the world, the person who cannot control her laughter shows a greater mind than the one who cannot control his tears.",
    author: "Seneca",
    language: "en",
    comment: "",
    date: "2024-10-15",
  },
  {
    quote:
      "Isn’t this ignorance the cause of all our errors and misfortunes? … Isn’t it for not knowing what is to one’s advantage and what is not?",
    author: "Epictetus",
    language: "en",
    comment: "",
    date: "2024-10-16",
  },
  {
    quote:
      "When things upset you, gain control over them quickly. Don’t be upset for longer than you can help. If you make it a habit of getting back to harmony, you will become a master at it.",
    author: "Marcus Aurelius",
    language: "en",
    comment: "",
    date: "2024-10-17",
  },
  {
    quote:
      "Let my mind be self-contained and improve itself. Let it not take part in other people’s affairs and let it do nothing that depends on the approval of others. Let me enjoy the tranquility undisturbed by public or private troubles.",
    author: "Seneca",
    language: "en",
    comment: "",
    date: "2024-10-18",
  },
  {
    quote: "Find fault with no one and accuse no one.",
    author: "Epictetus",
    language: "en",
    comment: "",
    date: "2024-10-19",
  },
  {
    quote:
      "Continually return to philosophy to renew yourself. Your court life – and you in it – will seem bearable.",
    author: "Marcus Aurelius",
    language: "en",
    comment: "",
    date: "2024-10-20",
  },
  {
    quote:
      "To be hurt by the sufferings of others is to be forever miserable. To enjoy the sufferings of others is an inhuman pleasure.",
    author: "Seneca",
    language: "en",
    comment: "",
    date: "2024-10-21",
  },
  {
    quote:
      "Just as there is a skill in speaking, there is also a skill in listening.",
    author: "Epictetus",
    language: "en",
    comment: "",
    date: "2024-10-22",
  },
  {
    quote:
      "Pretentiousness is an arch deceiver. It deludes you when you believe that your work has great merit.",
    author: "Marcus Aurelius",
    language: "en",
    comment: "",
    date: "2024-10-23",
  },
  {
    quote:
      "Many shed tears for show. When no one is looking at them, their eyes are dry.",
    author: "Seneca",
    language: "en",
    comment: "",
    date: "2024-10-24",
  },
  {
    quote:
      "Logic is necessary, since without it you can’t even tell whether it is necessary or not.",
    author: "Epictetus",
    language: "en",
    comment: "",
    date: "2024-10-25",
  },
  {
    quote:
      "People who value a rational, social, and universal mind aren’t interested in other things. All they are concerned about is their own minds – how to be rational and social, how to work with others for this purpose.",
    author: "Marcus Aurelius",
    language: "en",
    comment: "",
    date: "2024-10-26",
  },
  {
    quote:
      "This evil of being guided by other people’s opinions has become so deeply rooted in us that even grief, the simplest of all emotions, has become an affectation.",
    author: "Seneca",
    language: "en",
    comment: "",
    date: "2024-10-27",
  },
  {
    quote:
      "Now every rational mind is against contradiction. But if you don’t realize that you are involved in a contradiction, there is nothing that stops you from being contradictory.",
    author: "Epictetus",
    language: "en",
    comment: "",
    date: "2024-10-28",
  },
  {
    quote:
      "Change and fluidity constantly remake the world, just as the relentless flow of time remakes eternity. In this running river, where can you find a firm foothold?",
    author: "Marcus Aurelius",
    language: "en",
    comment: "",
    date: "2024-10-29",
  },
  {
    quote:
      "Let’s praise those who deserve constant praise: “The braver you are, the happier you are!”",
    author: "Seneca",
    language: "en",
    comment: "",
    date: "2024-10-30",
  },
  {
    quote:
      "It is not the hardship or death that is a fearful thing, but the fear of hardship or death.",
    author: "Epictetus",
    language: "en",
    comment: "",
    date: "2024-10-31",
  },
  {
    quote:
      "What makes a human being beautiful? Shouldn’t it be the excellence of a human being?",
    author: "Epictetus",
    language: "en",
    comment: "",
    date: "2024-11-01",
  },
  {
    quote:
      "There is no difference between breathing a single breath and having the ability to breathe for a long time only to give it back someday to the source.",
    author: "Marcus Aurelius",
    language: "en",
    comment: "",
    date: "2024-11-02",
  },
  {
    quote:
      "Many people take pains to hide their feelings and never show themselves as they are. They live an artificial life to impress others.",
    author: "Seneca",
    language: "en",
    comment: "",
    date: "2024-11-03",
  },
  {
    quote:
      "In every species, nature produces an exceptional being. Among cattle, among dogs, among bees, among horses. Don’t ask that exceptional being, “Why, who are you?”",
    author: "Epictetus",
    language: "en",
    comment: "",
    date: "2024-11-04",
  },
  {
    quote:
      "The elements move in all directions – above, below, and around us. But, virtue doesn’t move at random. She is more divine, moves serenely forward, and in ways we cannot understand.",
    author: "Marcus Aurelius",
    language: "en",
    comment: "",
    date: "2024-11-05",
  },
  {
    quote:
      "We can never be at ease if we imagine that everyone who looks at us is judging our real worth.",
    author: "Seneca",
    language: "en",
    comment: "",
    date: "2024-11-06",
  },
  {
    quote:
      "What makes you superior is your ability to reason. Decorate and beautify that aspect of you.",
    author: "Epictetus",
    language: "en",
    comment: "",
    date: "2024-11-07",
  },
  {
    quote:
      "People behave in strange ways. They won’t praise their colleagues who live among them, yet crave for themselves the praise of future generations they have never seen and will never see.",
    author: "Marcus Aurelius",
    language: "en",
    comment: "",
    date: "2024-11-08",
  },
  {
    quote:
      "What pleasure lies in that pure honesty, which is its own ornament, and which hides no part of its character!",
    author: "Seneca",
    language: "en",
    comment: "",
    date: "2024-11-09",
  },
  {
    quote:
      "You are not flesh or hair but what you choose. If you make that beautiful, then you will be beautiful.",
    author: "Epictetus",
    language: "en",
    comment: "",
    date: "2024-11-10",
  },
  {
    quote:
      "Don’t assume that something is impossible because you find it hard. Recognize that if something is possible and proper for a human being to do, you can do it too.",
    author: "Marcus Aurelius",
    language: "en",
    comment: "",
    date: "2024-11-11",
  },
  {
    quote:
      "Even a frank life can be despised. Some people heap scorn on whatever they come close to.",
    author: "Seneca",
    language: "en",
    comment: "",
    date: "2024-11-12",
  },
  {
    quote:
      "Passions arise only when we are frustrated in our desires or faced with what we don’t want.",
    author: "Epictetus",
    language: "en",
    comment: "",
    date: "2024-11-13",
  },
  {
    quote:
      "Let’s overlook many things in our fellow human beings, but keep our distance, without suspicion or ill will.",
    author: "Marcus Aurelius",
    language: "en",
    comment: "",
    date: "2024-11-14",
  },
  {
    quote:
      "It is better to be despised for one’s simplicity than to be burdened by endless hypocrisy.",
    author: "Seneca",
    language: "en",
    comment: "",
    date: "2024-11-15",
  },
  {
    quote:
      "I should not be unfeeling like a statue but should take care of my natural and acquired relationships – as a human being.",
    author: "Epictetus",
    language: "en",
    comment: "",
    date: "2024-11-16",
  },
  {
    quote:
      "If you can show me and prove to me that I am wrong in my thinking or in my actions, I will gladly change.",
    author: "Marcus Aurelius",
    language: "en",
    comment: "",
    date: "2024-11-17",
  },
  {
    quote:
      "There is a big difference between living simply and living carelessly.",
    author: "Seneca",
    language: "en",
    comment: "",
    date: "2024-11-18",
  },
  {
    quote:
      "The raw material for good human beings is their own mind – to respond to impressions the way intended by nature.",
    author: "Epictetus",
    language: "en",
    comment: "",
    date: "2024-11-19",
  },
  {
    quote:
      "Truth doesn’t harm anyone. Persistent self-delusion and ignorance do.",
    author: "Marcus Aurelius",
    language: "en",
    comment: "",
    date: "2024-11-20",
  },
  {
    quote:
      "We should combine the two: solitude and being with people and alternate between them. The former will make us long for people and the latter for ourselves.",
    author: "Seneca",
    language: "en",
    comment: "",
    date: "2024-11-21",
  },
  {
    quote:
      "Assent to what is true, dissent from what is false, and suspend judgment when uncertain.",
    author: "Epictetus",
    language: "en",
    comment: "",
    date: "2024-11-22",
  },
  {
    quote: "I do my duty. I am not interested in the rest.",
    author: "Marcus Aurelius",
    language: "en",
    comment: "",
    date: "2024-11-23",
  },
  {
    quote:
      "Solitude will cure us when we are sick of company, and company will cure us when we are sick of solitude.",
    author: "Seneca",
    language: "en",
    comment: "",
    date: "2024-11-24",
  },
  {
    quote:
      "To desire what is good, to reject what is bad, and be indifferent to what is neither.",
    author: "Epictetus",
    language: "en",
    comment: "",
    date: "2024-11-25",
  },
  {
    quote:
      "Be generous and liberal with irrational animals, with material things. You can reason and they can’t.",
    author: "Marcus Aurelius",
    language: "en",
    comment: "",
    date: "2024-11-26",
  },
  {
    quote:
      "We should not keep our mind tense all the time. We should relax and turn towards amusement as well.",
    author: "Seneca",
    language: "en",
    comment: "",
    date: "2024-11-27",
  },
  {
    quote:
      "What is misfortune? An opinion. What is subversion, dissension, complaint, blame, accusation, or foolish talk? All mere opinions.",
    author: "Epictetus",
    language: "en",
    comment: "",
    date: "2024-11-28",
  },
  {
    quote:
      "In death, Alexander the Great was no different from a stable boy. Both were absorbed by the universe the same way and dissolved into atoms.",
    author: "Marcus Aurelius",
    language: "en",
    comment: "",
    date: "2024-11-29",
  },
  {
    quote:
      "Our minds should relax. After rest, they will rise better and more vigorous.",
    author: "Seneca",
    language: "en",
    comment: "",
    date: "2024-11-30",
  },
];

const quotes = [
  {
    quote:
      "жизнь — привилегия и подарок, а вовсе не право. Если нас одарили жизнью, надо ее отслужить",
    author: "© Рэй Брэдбери «Дзен в искусстве написания книг» ",
    language: "ru",
    comment:
      "Причин своего успеха Брэдбери никогда не скрывал. Ему были присущи чувство детской восторженности перед миром и неизбывной любви к нему. И трудолюбие, достаточное для того, чтобы ежедневно писать не менее тысячи слов. Как сформулировал сам Рэй Брэдбери в одном из эссе из сборника «Дзен в искусстве написания книг» (в довольно парадоксальной формулировке, какая собственно только и подобает настоящему коану для медитации и размышлений)",
  },
  {
    quote:
      "​​Истинно отважны те души, которые не довольствуются общепринятыми ценностями и устремляются на поиски своих собственных. Но еще отвaжнее те, кто дерзaет не только воспарять в небесa, но и погружаться в глубины. И те из них, кто не отступится, поймут: это одно и то же.",
    author: "© Мишлен Линден «Тени бездны» ",
    language: "ru",
  },
  {
    quote:
      "Если человек твой, то он твой. А если его ещё куда-то тянет, то ничего его не удержит. Да и не стоит он ни нервов, ни внимания.",
    author: "© Пауло Коэльо ",
    language: "ru",
  },
  {
    quote:
      "​Всё всегда заканчивается хорошо. Если что-то закончилось плохо, значить это ещё не конец.",
    author: "© Пауло Коэльо ",
    language: "ru",
  },
  {
    quote:
      "Жизни всегда необходим какой-то кризис, чтобы показать себя во всей красе.",
    author: "© Пауло Коэльо ",
    language: "ru",
  },
  {
    quote:
      "Всегда говори то, что чувствуешь и делай то, что думаешь. Молчание ломает судьбы.",
    author: "© Пауло Коэльо ",
    language: "ru",
  },
  {
    quote:
      "​Если всегда делать только то, чего ждут от вас другие люди, вы неизбежно станете рабом.",
    author: "© Пауло Коэльо ",
    language: "ru",
  },
  {
    quote:
      "​Жизнь особенно интересна тем, что любой твой сон способен стать явью.",
    author: "© Пауло Коэльо ",
    language: "ru",
  },
  {
    quote:
      "​Иногда нужно обойти весь мир, чтобы понять, что клад зарыт у твоего собственного дома.",
    author: "© Пауло Коэльо ",
    language: "ru",
  },
  {
    quote:
      "Если ты думаешь, что приключения опасны, попробуй рутину — это смертельно.",
    author: "© Пауло Коэльо ",
    language: "ru",
  },
  {
    quote: "Цените вещи не за то, сколько они стоят, а за то, что они значат.",
    author: "© Пауло Коэльо ",
    language: "ru",
  },
  {
    quote: "Разумный человек должен ВЫБИРАТЬ, а не принимать свою судьбу",
    author: "© Пауло Коэльо ",
    language: "ru",
  },
  {
    quote:
      "Дело не в пессимизме и не в оптимизме, а в том, что у девяноста девяти из ста нет ума.",
    author: "© А.Чехов",
    language: "ru",
  },
  {
    quote:
      "Если человек не курит и не пьёт, поневоле задумаешься, уж не сволочь ли он?",
    author: "© А.Чехов",
    language: "ru",
  },
  {
    quote:
      "Ехать с женой в Париж все равно, что ехать в Тулу со своим самоваром.",
    author: "© А.Чехов",
    language: "ru",
  },
  {
    quote:
      "Бывают люди, которые всегда говорят только умные и хорошие слова, но чувствуешь, что они тупые люди.",
    author: "© А.Чехов",
    language: "ru",
  },
  {
    quote:
      "Если жена тебе изменила, то радуйся, что она изменила тебе, а не отечеству.",
    author: "© А.Чехов",
    language: "ru",
  },
  {
    quote: "Университет развивает все способности, в том числе — глупость.",
    author: "© А.Чехов",
    language: "ru",
  },
  {
    quote: "Говорят: в конце концов правда восторжествует, но это неправда.",
    author: "© А.Чехов",
    language: "ru",
  },
  {
    quote: "Здоровы и нормальны только заурядные, стадные люди.",
    author: "© А.Чехов",
    language: "ru",
  },
  {
    quote:
      "Для того, чтобы ощущать в себе счастье без перерыва, даже в минуты скорби и печали, нужно: а) уметь довольствоваться настоящим и б) радоваться сознанию, что могло бы быть и хуже.",
    author: "© А.Чехов",
    language: "ru",
  },
  {
    quote:
      "Когда в твой палец попадает заноза, радуйся: «Хорошо, что не в глаз!»",
    author: "© А.Чехов",
    language: "ru",
  },
  {
    quote:
      "У очень хорошего человека такая физиономия, что его принимают за сыщика; думают, что он украл запонки.",
    author: "© А.Чехов",
    language: "ru",
  },
  {
    quote:
      "Замечательный день сегодня. То ли чай пойти выпить, то ли повеситься.",
    author: "© А.Чехов",
    language: "ru",
  },
  {
    quote: "Всё знают и всё понимают только дураки да шарлатаны.",
    author: "© А.Чехов",
    language: "ru",
  },
  {
    quote:
      "Тот, кому чужда жизнь, кто неспособен к ней, тому ничего больше не остается, как стать чиновником.",
    author: "© А.Чехов",
    language: "ru",
  },
  {
    quote:
      "Одна боль всегда уменьшает другую. Наступите вы на хвост кошке, у которой болят зубы, и ей станет легче.",
    author: "© А.Чехов",
    language: "ru",
  },
  {
    quote:
      "Нельзя ставить на сцене заряженное ружье, если никто не имеет в виду выстрелить из него.",
    author: "© А.Чехов",
    language: "ru",
  },
  {
    quote:
      "Сотни верст пустынной, однообразной, выгоревшей степи не могут нагнать такого уныния, как один человек, когда он сидит, говорит и неизвестно, когда он уйдет.",
    author: "© А.Чехов",
    language: "ru",
  },
  {
    quote: "Если хочешь, чтобы у тебя было мало времени, — ничего не делай.",
    author: "© А.Чехов",
    language: "ru",
  },
  {
    quote: "Нужно по капле выдавливать из себя раба.",
    author: "© А.Чехов",
    language: "ru",
  },
  {
    quote: "Никто не хочет любить в нас обыкновенного человека.",
    author: "© А.Чехов",
    language: "ru",
  },
  {
    quote:
      "Если против какой-нибудь болезни предлагается очень много средств, то это значит, что болезнь неизлечима.",
    author: "© А.Чехов",
    language: "ru",
  },
  {
    quote: "Не стоит мешать людям сходить с ума.",
    author: "© А.Чехов",
    language: "ru",
  },
  {
    quote:
      "«Циник» — слово греческое, в переводе на твой язык значащее: свинья, желающая, чтобы весь свет знал, что она свинья.",
    author: "© А.Чехов",
    language: "ru",
  },
  {
    quote: "Эти умники все такие глупые, что не с кем поговорить.",
    author: "© А.Чехов",
    language: "ru",
  },
  {
    quote:
      "Если бы все люди сговорились и стали вдруг искренни, то всё бы у них пошло к чёрту прахом.",
    author: "© А.Чехов",
    language: "ru",
  },
  {
    quote: "Талантливый человек в России не может быть чистеньким.",
    author: "© А.Чехов",
    language: "ru",
  },
  {
    quote:
      "Если твой поступок огорчает кого-нибудь, то это еще не значит, что он дурен.",
    author: "© А.Чехов",
    language: "ru",
  },
  {
    quote:
      "Стать писателем очень нетрудно. Нет того урода, который не нашел бы себе пары, и нет той чепухи, которая не нашла бы себе подходящего читателя.",
    author: "© А.Чехов",
    language: "ru",
  },
  {
    quote: "Нельзя требовать от грязи, чтобы она не была грязью.",
    author: "© А.Чехов",
    language: "ru",
  },
  {
    quote:
      "«Познай самого себя» — прекрасный и полезный совет; жаль только, что древние не догадались указать способ, как пользоваться этим советом.",
    author: "© А.Чехов",
    language: "ru",
  },
  {
    quote: "Уходить от людей — это самоубийство.",
    author: "© А.Чехов",
    language: "ru",
  },
  {
    quote:
      "На земле нет ничего хорошего, что в своём первоисточнике не имело бы гадости.",
    author: "© А.Чехов",
    language: "ru",
  },
  {
    quote:
      "...за почтовым отделением давно уже установилась репутация учреждения, в котором страшно бывать.",
    author: "© А.Чехов",
    language: "ru",
  },
  {
    quote:
      "На боль я отвечаю криком и слезами, на подлость — негодованием, на мерзость — отвращением. По-моему, это, собственно, и называется жизнью.",
    author: "© А.Чехов",
    language: "ru",
  },
  {
    quote:
      "Жизнь, по сути, очень простая штука и человеку нужно приложить много усилий, чтобы её испортить.",
    author: "© А.Чехов",
    language: "ru",
  },
  {
    quote:
      "​​Чем спокойнее и уравновешеннее человек, тем мощнее его потенциaл и тем большим будет его успех в достойных делах. Невозмутимость разумa – одно из величайших сокровищ мудроcти. ",
    author: "© Джеймс Аллен",
    language: "ru",
  },
  {
    quote: "There are years that ask questions and years that answer.",
    author: "© Zora Neale Hurston, “Dust Tracks on a Road”",
    language: "en",
  },
  {
    quote:
      "​Ситуации не только нужно уметь использовать, нужно уметь их ещё и создавать.",
    author: "©  Уинстон Черчилль",
    language: "ru",
  },
  {
    quote:
      "Умный человек не делает все ошибки сам. Он даёт шанс ошибаться другим и наблюдает.​",
    author: "©  Уинстон Черчилль",
    language: "ru",
  },
  {
    quote:
      "У тебя есть враги? Это отлично. Значит, что что-то ты когда-то в своей жизни отстаивал.​",
    author: "©  Уинстон Черчилль",
    language: "ru",
  },
  {
    quote:
      "Вы никогда не дойдёте до желаемого, если будете останавливаться возле каждой собаки, чтобы кинуть в неё камень.​",
    author: "©  Уинстон Черчилль",
    language: "ru",
  },
  {
    quote:
      "Ни одна звезда не засияет, пока не найдётся человек, который будет держать сзади чёрное полотно.​",
    author: "©  Уинстон Черчилль",
    language: "ru",
  },
  {
    quote:
      "Успех не окончателен, неудачи не фатальны. Единственное, что имеет значение — мужество продолжать.​",
    author: "©  Уинстон Черчилль",
    language: "ru",
  },
  {
    quote:
      "​Самая горькая правда жизни в том, что и дураки порой бывают правы.",
    author: "©  Уинстон Черчилль",
    language: "ru",
  },
  {
    quote: "Глуп тот человек, который никогда не меняет своего мнения.​",
    author: "©  Уинстон Черчилль",
    language: "ru",
  },
  {
    quote:
      "Не желайте здоровья и богатства. На Титанике все были здоровы и богаты, а выбрались лишь те, кому желали удачи.​",
    author: "©  Уинстон Черчилль",
    language: "ru",
  },
];

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

function manageLanguageButtons(language) {
  langRuButton.disabled = language === "ru";
  langEnButton.disabled = language === "en";
  StoicQuoteButton.disabled = false;
}

function saveQuote(quote, lang) {
  const expirationTime = Date.now() + 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  const quoteData = { data: quote, expires: expirationTime };
  localStorage.setItem(quoteKey(lang), JSON.stringify(quoteData));
}

function getRandomQuote(lang) {
  const filteredQuotes = quotes.filter(({ language }) => language === lang);
  return filteredQuotes.length
    ? filteredQuotes[randomInt(0, filteredQuotes.length - 1)]
    : null;
}

function displayQuote(lang = null) {
  let language =
    lang ||
    localStorage.getItem(languageKey) ||
    navigator.languages[0].split("-")[0] ||
    "en";

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
    quoteAuthor.textContent = quoteData?.author
      ? `- ${quoteData.author}`
      : `- ${quoteData.data.author}`;
    regularContainer.style.display = "block";
    notFoundContainer.style.display = "none";
  } else {
    quoteText.textContent = "";
    quoteAuthor.textContent = "";
    regularContainer.style.display = "none";
    notFoundContainer.style.display = "block";
  }
}

function displayStoicQuote() {
  let lang = navigator.languages[0].split("-")[0] || "en";

  const now = new Date();
  let quote = StoicQuotes.filter(({ language }) => language === lang).find(
    ({ date }) => {
      const dateArray = date.split("-").map((item) => Number.parseInt(item));
      return (
        dateArray[1] === now.getMonth() + 1 && dateArray[2] === now.getDate()
      );
    }
  );

  if (quote) {
    regularContainer.style.display = "block";
    notFoundContainer.style.display = "none";
    quoteText.textContent = quote.quote;
    quoteAuthor.textContent = `- ${quote.author}`;
  } else {
    quote = StoicQuotes.find(({ date }) => {
      const dateArray = date.split("-").map((item) => Number.parseInt(item));
      return (
        dateArray[1] === now.getMonth() + 1 && dateArray[2] === now.getDate()
      );
    });

    if (quote) {
      regularContainer.style.display = "block";
      notFoundContainer.style.display = "none";
      quoteText.textContent = quote.quote;
      quoteAuthor.textContent = `- ${quote.author}`;
    } else {
      quoteText.textContent = "";
      quoteAuthor.textContent = "";
      regularContainer.style.display = "none";
      notFoundContainer.style.display = "block";
    }
  }
}

document.addEventListener("DOMContentLoaded", displayQuote(null));
langEnButton.addEventListener("click", () => displayQuote("en"));
langRuButton.addEventListener("click", () => displayQuote("ru"));
StoicQuoteButton.addEventListener("click", () => displayStoicQuote());
