'use strict';

let promise = Promise.resolve();  // Used to hold chain of typesetting calls
const DateTime = luxon.DateTime;
const timerBlockID = 'timerBlockID';
const timeInfoBlockID = 'timerInfoBlockID';
const startButtonID = 'startEgzaminButton';
const resetButtonID = 'resetEgzaminButton';
const stopButtonID = 'stopEgzaminButton';
const questionsID = 'QuestionsTest';
const questionsComplexityID = 'QuestionsComplexity';
const questionsCorrectnessID = 'QuestionsCorrectness';
const questionsUniversalRecursionID = 'QuestionsUniversalRecursion';

const AnswersID = 'Answers';
const AnswersTextAreaID = 'AnswersTextArea';
let now = null;
let countDownTime = null;
let timer;
const egzaminTime = 30;
let answerObject = {
  questions: [],
  complexity: [],
  correctness: [],
  pseudocode: [],
  recursion: [],
};

const { testQuestions, testComplexity, testCorrectness, testRecursion } = {"testQuestions":[{"id":1,"title":"Jaka z podanych definicji jest definicja algorytmu?","answers":[{"label":"a","value":"dokładny opis, przepis, np. w postaci listy kolejnych kroków, jak coś wykonać, etc. (nie tylko zadania obliczeniowe, np. przepis wykonania pewnej potrawy albo dokonania pewnej procedury prawnej, etc."},{"label":"b","value":"sposob pracy i przetwarzania danych w pamięci komputera"},{"label":"c","value":"olbiczenie matymatycznych twierdzen na psedokodowym"},{"label":"d","value":"przepis wykonania pewnej potrawy albo dokonania pewnej procedury prawnej"},{"label":"e","value":"wszystko prawidłowe"},{"label":"f","value":"wszystko nieprawidłowe"}],"description":""},{"id":2,"title":"Jaka podanych niżej nie jest bazowa struktura danych ","answers":[{"label":"a","value":"Stos"},{"label":"b","value":"Lista cykliczna"},{"label":"c","value":"Kolejka"},{"label":"d","value":"Graph"},{"label":"e","value":"wszystko prawidłowe"},{"label":"f","value":"wszystko nieprawidłowe"}],"description":""},{"id":3,"title":"Jaka z podanych definicji jest definicja złożoności czasowej algorytmu?","answers":[{"label":"a","value":"ilość kroków do stosunku czasu wykonania algorytmu"},{"label":"b","value":"stosunek pesymystecnej zlozonosci to przecientej zlozonosci czasowej"},{"label":"c","value":"liczba operacji dominujących jakie wykona algorytm jako funkcja rozmiaru danych."},{"label":"d","value":"szybkość opracowania wszystkich operacji algorytmu"},{"label":"e","value":"wszystko prawidłowe"},{"label":"f","value":"wszystko nieprawidłowe"}],"description":""},{"id":4,"title":"Jaka złożoność czasowa z podanych niżej jest dla poszukiwania najmniejszej liczby w tablice niesortowanej","answers":[{"label":"a","value":"$O(2^n)$"},{"label":"b","value":"$O(log(n))$"},{"label":"c","value":"$O(n^2)$"},{"label":"d","value":"$O(n)$"},{"label":"e","value":"wszystko prawidłowe"},{"label":"f","value":"wszystko nieprawidłowe"}],"description":""},{"id":5,"title":"Jaka z podanych definicji jest definicja rekurencji.","answers":[{"label":"a","value":"Algorytm do obliczenia silni"},{"label":"b","value":"Algorytm z wykorzystaniem pętli for"},{"label":"c","value":"Algorytm do poszukiwania maksymalnej"},{"label":"d","value":"Typ algorytmów chciwych"},{"label":"e","value":"wszystko prawidłowe"},{"label":"f","value":"wszystko nieprawidłowe"}],"description":""},{"id":6,"title":"Jakie z podanych operacji mozliwe w kolejkie.","answers":[{"label":"a","value":"push (dodanie elementa)"},{"label":"b","value":"pop (wyjmowanie elementa)"},{"label":"c","value":"print (wyswetlenia elementow)"},{"label":"d","value":"search (poszukiwanie elementa)"},{"label":"e","value":"wszystko prawidłowe"},{"label":"f","value":"wszystko nieprawidłowe"}],"description":""},{"id":7,"title":"W jakiej postaci możliwa reprezentacji algorytmu?","answers":[{"label":"a","value":"pseudokod"},{"label":"b","value":"pszemis slowny"},{"label":"c","value":"schemat blokowy"},{"label":"d","value":"stereograma"},{"label":"e","value":"wszystko prawidłowe"},{"label":"f","value":"wszystko nieprawidłowe"}],"description":""},{"id":8,"title":"Ktory(e) sa sposobami udowodnię poprawności algorytmów","answers":[{"label":"a","value":"implementacia"},{"label":"b","value":"matetamtycnza indukcja"},{"label":"c","value":"redukcja"},{"label":"d","value":"kontrargumentowanie"},{"label":"e","value":"wszystko prawidłowe"},{"label":"f","value":"wszystko nieprawidłowe"}],"description":""},{"id":9,"title":"Przy jakich warunkach algorytm jest całkowicie poprawny?","answers":[{"label":"a","value":"algorytm zatrzymuje się po skończonej liczbie kroków"},{"label":"b","value":"jest pętla albo redukcja"},{"label":"c","value":"redukcja"},{"label":"d","value":"algorytm przy zatrzymaniu zwraca poprawny wynik"},{"label":"e","value":"wszystko prawidłowe"},{"label":"f","value":"wszystko nieprawidłowe"}],"description":""},{"id":10,"title":"Jaka z cech nie jest obowiązkowa w algorytmie?","answers":[{"label":"a","value":"Jednoznaczność"},{"label":"b","value":"Dane wejściowe"},{"label":"c","value":"Szybkość"},{"label":"d","value":"Konieczność"},{"label":"e","value":"Wykonalność"},{"label":"f","value":"Niezależność"},{"label":"g","value":"Wyjście"},{"label":"h","value":"wszystko prawidłowe"},{"label":"i","value":"wszystko nieprawidłowe"}],"description":""},{"id":11,"title":"Jaka z notacji asymptotycznych jest ze złożonością stalą?","answers":[{"label":"a","value":"$A(n) = Θ(n^3)$"},{"label":"b","value":"$W(n) = 2 + lg2 n = Θ(log(n))$"},{"label":"c","value":"$Θ(n!)$"},{"label":"d","value":"$S(n) = 3 = Θ(1)$"},{"label":"e","value":"$W(n) = 3n^2 + 4 = Θ(n^2 )$"},{"label":"f","value":"$A(n) = Θ(nlog(n))$"},{"label":"g","value":"$A(n) = Θ(2^n)$"},{"label":"h","value":"wszystko prawidłowe"},{"label":"i","value":"wszystko nieprawidłowe"}],"description":""},{"id":12,"title":"Jaka z notacji asymptotycznych jest ze złożonością pod-wykładniczna?","answers":[{"label":"a","value":"$W(n) = 3n^2 + 4 = Θ(n^2 )$"},{"label":"b","value":"$A(n) = Θ(n^3)$"},{"label":"c","value":"$Θ(n!)$"},{"label":"d","value":"$W(n) = 2 + lg2 n = Θ(log(n))$"},{"label":"e","value":"$S(n) = 3 = Θ(1)$"},{"label":"f","value":"$A(n) = Θ(nlog(n))$"},{"label":"g","value":"$A(n) = Θ(2^n)$"},{"label":"h","value":"wszystko prawidłowe"},{"label":"i","value":"wszystko nieprawidłowe"}],"description":""},{"id":13,"title":"Jaki warunek odpowiada niezmienniku pętli?","answers":[{"label":"a","value":"ma byc for pętlia"},{"label":"b","value":"jeśli predykat jest spełniony przed wejściem w pewną (dowolną) iterację pętli to jest także spełniony po wyjściu z tej iteracji pętli"},{"label":"c","value":"ma byc while pętlia"},{"label":"d","value":"musi być poprawny algorytm"},{"label":"e","value":"wszystko prawidłowe"},{"label":"f","value":"wszystko nieprawidłowe"}],"description":""},{"id":14,"title":"Jaki kroki nieprzepisowe jest w metoda indukcji pętli przy udowodnieniu poprawności algorytmu?","answers":[{"label":"a","value":"użyć indukcji, aby pokazać resztę"},{"label":"b","value":"określić złożoność czasowa"},{"label":"c","value":"znajdź operacja dominująca"},{"label":"d","value":"znajdź p, niezmiennik pętli"},{"label":"e","value":"pokazać przypadek podstawowy dla p"},{"label":"f","value":"wszystko prawidłowe"},{"label":"g","value":"wszystko nieprawidłowe"}],"description":""},{"id":15,"title":"Jaka z podanych definicji jest definicja chciwego algorytmu.","answers":[{"label":"a","value":"Algorytm, który wybiera najlepszy wybór na każdym kroku, zamiast uwzględnienie wszystkich sekwencji kroków, które mogą prowadzić do optymalnego rozwiązania."},{"label":"b","value":"Algorytm, który uwzględnienie wszystkich sekwencji kroków prowadzych do optymalnego rozwiązania problemy"},{"label":"c","value":"Algorytm, dla ktorego niemozliwe udowodnic poprawnosc."},{"label":"d","value":"Algorytm, ktore sa poprawne i wydajne wedlug czasu"},{"label":"e","value":"wszystko prawidłowe"},{"label":"f","value":"wszystko nieprawidłowe"}],"description":""},{"id":16,"title":"Jaka z podanych definicji jest definicja algorytmu śledzenia wstecznego.","answers":[{"label":"a","value":"Algorytm, który wybiera najlepszy wybór na każdym kroku, zamiast uwzględnienie wszystkich sekwencji kroków, które mogą prowadzić do optymalnego rozwiązania."},{"label":"b","value":"Algorytm, który uwzględnienie wszystkich sekwencji kroków prowadzych do optymalnego rozwiązania problemy"},{"label":"c","value":"Algorytm, ktore sa poprawne i wydajne wedlug czasu"},{"label":"d","value":"Algorytm, metoda którego polega na rozwiązywaniu problemów decyzyjnych poprzez stopniowe poszukiwanie wykonalnego rozwiązania"},{"label":"e","value":"wszystko prawidłowe"},{"label":"f","value":"wszystko nieprawidłowe"}],"description":""},{"id":17,"title":"Jakie z podanych operacji niemozliwe w liscie jednekierunkowej.","answers":[{"label":"a","value":"push (dodanie elementa)"},{"label":"b","value":"pop (wyjmowanie elementa)"},{"label":"c","value":"print (wyswetlenia elementow)"},{"label":"d","value":"search (poszukiwanie elementa)"},{"label":"e","value":"next (przejście od head do tail)"},{"label":"f","value":"previous (przejście od taila do head)"},{"label":"g","value":"wszystko prawidłowe"},{"label":"h","value":"wszystko nieprawidłowe"}],"description":""},{"id":18,"title":"Jakie z podanych operacji niemozliwe w liscie dwukierunkowej.","answers":[{"label":"a","value":"push (dodanie elementa)"},{"label":"b","value":"pop (wyjmowanie elementa)"},{"label":"c","value":"print (wyswetlenia elementow)"},{"label":"d","value":"search (poszukiwanie elementa)"},{"label":"e","value":"next (przejście od head do tail)"},{"label":"f","value":"previous (przejście od taila do head)"},{"label":"g","value":"wszystko prawidłowe"},{"label":"h","value":"wszystko nieprawidłowe"}],"description":""},{"id":19,"title":"Jaka z notacji asymptotycznych jest ze złożonością liniowo-logarytmiczna?","answers":[{"label":"a","value":"$W(n) = 3n^2 + 4 = Θ(n^2)$"},{"label":"b","value":"$A(n) = Θ(n^3)$"},{"label":"c","value":"$Θ(n!)$"},{"label":"d","value":"$W(n) = 2 + lg2 n = Θ(log(n))$"},{"label":"e","value":"$S(n) = 3 = Θ(1)$"},{"label":"f","value":"$A(n) = Θ(nlog(n))$"},{"label":"g","value":"$A(n) = Θ(2^n)$"},{"label":"h","value":"wszystko prawidłowe"},{"label":"i","value":"wszystko nieprawidłowe"}],"description":""},{"id":20,"title":"Jakie z wymienionych algorytmow sa do wyszukiwania wzorcow?","answers":[{"label":"a","value":"najwy"},{"label":"b","value":"rekurencja trojkata Paskala"},{"label":"c","value":"Rabina-Karpa"},{"label":"d","value":"Boyera-Moore'a"},{"label":"e","value":"Knutha-Morrisa-Pratta"},{"label":"f","value":"Sharpa"},{"label":"g","value":"Morrisa-Pratta"},{"label":"h","value":"wszystko prawidłowe"},{"label":"i","value":"wszystko nieprawidłowe"}],"description":""},{"id":21,"title":"Jakie sa rodzaje algorytmu śledzenia wstecznego?","answers":[{"label":"a","value":"decyzyjny"},{"label":"b","value":"obliczalny"},{"label":"c","value":"optymalizacji"},{"label":"d","value":"z permutacja "},{"label":"e","value":"z wyliczeniem"},{"label":"g","value":"wszystko prawidłowe"},{"label":"h","value":"wszystko nieprawidłowe"}],"description":""},{"id":22,"title":"Złożoność sortowania babelkowego (bubble sort):","answers":[{"label":"a","value":"$A(n) = Θ(n^2)$"},{"label":"b","value":"$A(n) = Θ(n+m)$"},{"label":"c","value":"$A(n) = Θ(n \\log(n))$"},{"label":"d","value":"$A(n) = Θ(n)$"},{"label":"e","value":"$A(n) = Θ(\\log(n))$"},{"label":"f","value":"wszystko prawidłowe"},{"label":"g","value":"wszystko nieprawidłowe"}],"description":""},{"id":23,"title":"Złożoność sortowania przez wstawianie (insertion sort):","answers":[{"label":"a","value":"$A(n) = Θ(n^2)$"},{"label":"b","value":"$A(n) = Θ(n+m)$"},{"label":"c","value":"$A(n) = Θ(n \\log(n))$"},{"label":"d","value":"$A(n) = Θ(n)$"},{"label":"e","value":"$A(n) = Θ(\\log(n))$"},{"label":"h","value":"wszystko nieprawidłowe"}],"description":""},{"id":24,"title":"Złożoność sortowania przez wymiana (selection sort):","answers":[{"label":"a","value":"$A(n) = Θ(n^2)$"},{"label":"b","value":"$A(n) = Θ(n+m)$"},{"label":"c","value":"$A(n) = Θ(n \\log(n))$"},{"label":"d","value":"$A(n) = Θ(n)$"},{"label":"e","value":"$A(n) = Θ(\\log(n))$"},{"label":"h","value":"wszystko nieprawidłowe"}],"description":""},{"id":25,"title":"Złożoność sortowania przez scalenie (merge sort):","answers":[{"label":"a","value":"$A(n) = Θ(n^2)$"},{"label":"b","value":"$A(n) = Θ(n+m)$"},{"label":"c","value":"$A(n) = Θ(n \\log(n))$"},{"label":"d","value":"$A(n) = Θ(n)$"},{"label":"e","value":"$A(n) = Θ(\\log(n))$"},{"label":"h","value":"wszystko nieprawidłowe"}],"description":""},{"id":26,"title":"Złożoność szybkiego sortowania (quick sort):","answers":[{"label":"a","value":"$A(n) = Θ(n^2)$"},{"label":"b","value":"$A(n) = Θ(n+m)$"},{"label":"c","value":"$A(n) = Θ(n \\log(n))$"},{"label":"d","value":"$A(n) = Θ(n)$"},{"label":"e","value":"$A(n) = Θ(\\log(n))$"},{"label":"h","value":"wszystko nieprawidłowe"}],"description":""},{"id":27,"title":"Złożoność sortowania pozyzyjnego (radix sort):","answers":[{"label":"a","value":"$A(n) = Θ(n^2)$"},{"label":"b","value":"$A(n) = Θ(n+m)$"},{"label":"c","value":"$A(n) = Θ(n \\log(n))$"},{"label":"d","value":"$A(n) = Θ(nk)$"},{"label":"e","value":"$A(n) = Θ(\\log(n))$"},{"label":"h","value":"wszystko nieprawidłowe"}],"description":""},{"id":28,"title":"Złożoność sortowania binarnego (binary sort):","answers":[{"label":"a","value":"$A(n) = Θ(n^2)$"},{"label":"b","value":"$A(n) = Θ(n+m)$"},{"label":"c","value":"$A(n) = Θ(n \\log(n))$"},{"label":"d","value":"$A(n) = Θ(nk)$"},{"label":"e","value":"$A(n) = Θ(\\log_{2}(n))$"},{"label":"h","value":"wszystko nieprawidłowe"}],"description":""},{"id":29,"title":"Jake etapu mozliwy w regułe dziel i rządź:","answers":[{"label":"a","value":"podziel problem"},{"label":"b","value":"znajdz optymalne rozwiazanie"},{"label":"c","value":"pokonaj podproblemy,"},{"label":"d","value":"odczuc nieoptymslne rozwiazanie"},{"label":"e","value":"połącz rozwiązania"},{"label":"f","value":"wszystko prawidłowe"},{"label":"g","value":"wszystko nieprawidłowe"}],"description":""}],"testComplexity":[{"id":1,"title":"Mamy funkcja $T(n) = (n+2)^2 - 3n^3 + 2n + 158$. Jaka jest złożoność asymptotyczna ?","answers":[{"label":"a","value":"$Θ(n^3)$"},{"label":"b","value":"$Θ(log(n))$"},{"label":"c","value":"$Θ(n^2)$"},{"label":"d","value":"$Θ(n!)$"},{"label":"e","value":"$Θ(n)$"},{"label":"f","value":"$Θ(1)$"},{"label":"g","value":"$Θ(nlog(n))$"},{"label":"h","value":"$Θ(2^n)$"}],"description":""},{"id":2,"title":"Mamy funkcja $T(n) = \\frac{n-1}{2} + 5n$. Jaka jest złożoność asymptotyczna ?","answers":[{"label":"a","value":"$Θ(n^3)$"},{"label":"b","value":"$Θ(log(n))$"},{"label":"c","value":"$Θ(n^2)$"},{"label":"d","value":"$Θ(n!)$"},{"label":"e","value":"$Θ(n)$"},{"label":"f","value":"$Θ(1)$"},{"label":"g","value":"$Θ(nlog(n))$"},{"label":"h","value":"$Θ(2^n)$"}],"description":""},{"id":3,"title":"Mamy funkcja $T(n) = \\frac{2(n-1)}{2} + 5n$. Jaka jest złożoność asymptotyczna ?","answers":[{"label":"a","value":"$Θ(n^3)$"},{"label":"b","value":"$Θ(log(n))$"},{"label":"c","value":"$Θ(n^2)$"},{"label":"d","value":"$Θ(n!)$"},{"label":"e","value":"$Θ(n)$"},{"label":"f","value":"$Θ(1)$"},{"label":"g","value":"$Θ(nlog(n))$"},{"label":"h","value":"$Θ(2^n)$"}],"description":""},{"id":4,"title":"Mamy funkcja $T(n) = \\frac{2(n-1)^2}{4} - \\frac{n^2}{2}$. Jaka jest złożoność asymptotyczna ?","answers":[{"label":"a","value":"$Θ(n^3)$"},{"label":"b","value":"$Θ(log(n))$"},{"label":"c","value":"$Θ(n^2)$"},{"label":"d","value":"$Θ(n!)$"},{"label":"e","value":"$Θ(n)$"},{"label":"f","value":"$Θ(1)$"},{"label":"g","value":"$Θ(nlog(n))$"},{"label":"h","value":"$Θ(2^n)$"}],"description":""},{"id":5,"title":"Mamy funkcja $T(n) = \\frac{log_2(3)}{n}$. Jaka jest złożoność asymptotyczna ?","answers":[{"label":"a","value":"$Θ(n^3)$"},{"label":"b","value":"$Θ(log(n))$"},{"label":"c","value":"$Θ(n^2)$"},{"label":"d","value":"$Θ(n!)$"},{"label":"e","value":"$Θ(n)$"},{"label":"f","value":"$Θ(1)$"},{"label":"g","value":"$Θ(nlog(n))$"},{"label":"h","value":"$Θ(2^n)$"}],"description":""}],"testCorrectness":[{"id":1,"title":"Czy wskazany algorytm jest całkowicie poprawny?","answers":[{"label":"a","value":"Tak"},{"label":"b","value":"Nie"}],"description":"","pseudocode":"find(array, len, key) {\n    i = 0\n    \n    while (i < len && array[i] != key) {\n      i = i + 1;\n    }\n    \n    if (i + 1 >= len) {\n      return -1;\n    } else {\n      return i;    \n    }\n}"},{"id":2,"title":"Czy wskazany algorytm jest całkowicie poprawny?","answers":[{"label":"a","value":"Tak"},{"label":"b","value":"Nie"}],"description":"","pseudocode":"sum(array, len) {\n    i = 0, sum = 0\n    \n    while (i < len) {\n      sum = sum + array[i];\n      i = i + 1;\n    }\n}"},{"id":3,"title":"Czy wskazany algorytm jest całkowicie poprawny?","answers":[{"label":"a","value":"Tak"},{"label":"b","value":"Nie"}],"description":"","pseudocode":"sum(array, len) {\n    i = 0, sum = 0\n    \n    while (i < len) {\n      sum = sum + array[i];\n      i = i + 1;\n    }\n    \n    return sum;\n}"},{"id":4,"title":"Czy wskazany algorytm jest całkowicie poprawny?","answers":[{"label":"a","value":"Tak"},{"label":"b","value":"Nie"}],"description":"","pseudocode":"findMax(array, len) {\n    i = 0, max = array[0];\n    \n    while (i < len) {\n      if (max < array[i]) {\n        max = array[i];\n      }\n      i = i + 1;\n    }\n    \n    return max;\n}"}],"testRecursion":[{"id":1,"title":"Obliczyć następne rekurencja, w której $T(1) = 1$ i $ T(n) = 3T(n/3) + n $ dla $n >= 2$ jest rowny","answers":[{"label":"a","value":"$Θ(n^2)$"},{"label":"b","value":"$Θ(n^3)$"},{"label":"c","value":"$Θ(n \\log(n))$"},{"label":"d","value":"$Θ(n)$"}]},{"id":2,"title":"Obliczyć następne rekurencja, w której $T(1) = 1$ i $ T(n) = 3T(n/3) + n^2 $ dla $n >= 2$ jest rowny","answers":[{"label":"a","value":"$Θ(n^2)$"},{"label":"b","value":"$Θ(n^3)$"},{"label":"c","value":"$Θ(n \\log(n))$"},{"label":"d","value":"$Θ(n)$"}]},{"id":2,"title":"Obliczyć następne rekurencja, w której $T(1) = 1$ i $ T(n) = 3T(n/3) + n^(1/2) $ dla $n >= 2$ jest rowny","answers":[{"label":"a","value":"$Θ(n^2)$"},{"label":"b","value":"$Θ(n^3)$"},{"label":"c","value":"$Θ(n \\log(n))$"},{"label":"d","value":"$Θ(n)$"}]}]};

document.body.onload = loadDocument();

document.getElementById(startButtonID).onclick = async function() {
  const button = document.getElementById(startButtonID);
  button.style.display = 'none';

  now = null;
  countDownTime = null;

  clearInterval(timer);
  await startEgzamin();
};

document.getElementById(resetButtonID).onclick = async function() {
  const button = document.getElementById(resetButtonID);
  button.style.display = 'none';

  now = null;
  countDownTime = null;

  clearStore();
  clearTextArea();
  clearInterval(timer);
  await startEgzamin();
};

document.getElementById(stopButtonID).onclick = function() {
  const button = document.getElementById(stopButtonID);
  const startButton = document.getElementById(startButtonID);
  const resetButton = document.getElementById(resetButtonID);

  button.style.display = 'none';
  resetButton.style.display = 'none';
  startButton.style.display = 'block';

  stopEgzamin();
};

async function startEgzamin() {
  let timeValue = { minutes: egzaminTime, seconds: 0 };
  const timerBlock = document.getElementById(timerBlockID);
  const resetButton = document.getElementById(resetButtonID);
  const stopButton = document.getElementById(stopButtonID);
  const timeInfoBlock = document.getElementById(timeInfoBlockID);
  const answersBlock = document.getElementById(AnswersID);

  const questionBlock = document.getElementById(questionsID);
  const questionsComplexityBlock = document.getElementById(questionsComplexityID);
  const questionsCorrectnessBlock = document.getElementById(questionsCorrectnessID);
  const questionsUniversalRecursionBlock = document.getElementById(questionsUniversalRecursionID);
  const randomQuestion = shuffle([...testQuestions]).slice(0, 10);
  const randomComplexity = shuffle([...testComplexity]).slice(0, 1);
  const randomCorrectness = shuffle([...testCorrectness]).slice(0, 1);
  const randomRecursion = shuffle([...testRecursion]).slice(0, 1);

  if (timerBlock && questionBlock && questionsComplexityBlock && questionsCorrectnessBlock && questionsUniversalRecursionBlock) {
    timerBlock.style.display = 'block';
    resetButton.style.display = 'block';
    stopButton.style.display = 'block';
    questionBlock.style.display = 'block';
    questionsComplexityBlock.style.display = 'block';
    questionsCorrectnessBlock.style.display = 'block';
    questionsUniversalRecursionBlock.style.display = 'block';
    timeInfoBlock.style.display = 'block';
    answersBlock.style.display = 'block';

    timerBlock.innerText = `${timeValue.minutes}:0${timeValue.seconds}`;
    now = DateTime.now();
    await appendQuestions(randomQuestion);
    await appendComplexity(randomComplexity);
    await appendCorrectness(randomCorrectness);
    await appendRecursion(randomRecursion);

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
          timerBlock.innerHTML = '<span class="notification">Czas na praca jest wyczerpany. Proszę skopiować odpowiedzi i zapisać w Github w pliku `Egzamin/Egzamin1.md`. </span>';
        }
      }
    }, 1000);

  }
}

function stopEgzamin() {
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
  // load questions
  const egzaminTimeBlock = document.getElementById('egzaminTime');

  if (egzaminTimeBlock) {
    egzaminTimeBlock.innerText = `${egzaminTime}`;
  }
  clearStore();
  clearTextArea();
}

async function appendQuestions(questions) {
  const questionBlock = document.getElementById(questionsID);
  questionBlock.innerHTML = '';

  for await (const question of questions) {
    const { cardDiv, questionContentId } = createCardDiv(question, 'Test');

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
    formField.setAttribute('class', 'field m-1 p-1');

    const labelId = 'label' + type + elemId + id + '' + answer.label;
    const optionLabel = document.createElement('label');
    optionLabel.setAttribute('class', 'checkbox');
    optionLabel.setAttribute('id', labelId);

    const optionInput = document.createElement('input');
    optionInput.setAttribute('type', 'checkbox');
    optionInput.setAttribute('id', 'checkbox' + type + elemId + id + '' + answer.label);
    optionInput.setAttribute('value', answer.label);
    optionInput.setAttribute('class', 'ml-3');

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
    if (contentId.includes('Complexity')) {
      type = 'Complexity';
    }
    if (contentId.includes('Correctness')) {
      type = 'Correctness';
    }
    if (contentId.includes('Recursion')) {
      type = 'Recursion';
    }

    const questionId = +contentId.replace(/Content/gi, '').replace(/question/gi, '').replace(/Test/gi, '').replace(/Complexity/gi, '').replace(/Correctness/gi, '').replace(/Recursion/gi, '')
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
    } else if (type === 'Complexity') {
      answerObject.complexity = answerObject.complexity.filter(({id}) => id !== questionId);
      answerObject.complexity.push(question);
      answerObject.complexity = answerObject.complexity.sort((a, b) => b.id - a.id);
    } else if (type === 'Correctness') {
      answerObject.correctness = answerObject.correctness.filter(({id}) => id !== questionId);
      answerObject.correctness.push(question);
      answerObject.correctness = answerObject.correctness.sort((a, b) => b.id - a.id);
    } else if (type === 'Recursion') {
      answerObject.recursion = answerObject.recursion.filter(({id}) => id !== questionId);
      answerObject.recursion.push(question);
      answerObject.recursion = answerObject.recursion.sort((a, b) => b.id - a.id);
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
Pytanie testowe / ${(questionTitle) ? `${question.id}) '${questionTitle.innerText}'` : question.id}: 
Odpowiedzi: 
        ${question.answers.map((answerId) => {
          const answerTitle = document.getElementById('labelTestquestionTest' + question.id + 'Content' +question.id + answerId);
          return `${answerTitle.innerText}
`;
        }).join('')}
`;
    }
    for (const question of answerObject.complexity) {
      const questionTitle = document.getElementById('questionComplexity' + question.id + 'Title');
      // let answers = '';

      innerText = `${innerText}
Pytanie zlozonosc / ${(questionTitle) ? `${question.id}) '${questionTitle.innerText}'` : question.id}: 
Odpowiedz: 
        ${question.answers.map((answerId) => {
        const answerTitle = document.getElementById('labelComplexityquestionComplexity' + question.id + 'Content' + question.id + answerId);
        return `${answerTitle.innerText}
`;
      }).join('')}
`;
    }
    for (const question of answerObject.correctness) {
      const questionTitle = document.getElementById('questionCorrectness' + question.id + 'Title');
      // let answers = '';

      innerText = `${innerText}
Pytanie poprawnosc / ${(questionTitle) ? `${question.id}) '${questionTitle.innerText}'` : question.id}: 
Pseudokod: 
\`\`\`c
${document.getElementById('pseudocodeCorrectness' + question.id).innerText}
\`\`\`
Odpowiedz: 
        ${question.answers.map((answerId) => {
        const answerTitle = document.getElementById('labelCorrectnessquestionCorrectness' + question.id + 'Content' + question.id + answerId);
        return `${answerTitle.innerText}
`;
      }).join('')}
`;
    }
    for (const question of answerObject.recursion) {
      const questionTitle = document.getElementById('questionRecursion' + question.id + 'Title');

      innerText = `${innerText}
Pytanie rekursja / ${(questionTitle) ? `${question.id}) '${questionTitle.innerText}'` : question.id}: 
Odpowiedzi: 
        ${question.answers.map((answerId) => {
        const answerTitle = document.getElementById('labelRecursionquestionRecursion' + question.id + 'Content' +question.id + answerId);
        return `${answerTitle.innerText}
`;
      }).join('')}
`;
    }
  }

  answersTextAreaBlock.value = innerText;
}

async function appendComplexity(questions) {
  const questionComplexityBlock = document.getElementById(questionsComplexityID);
  questionComplexityBlock.innerHTML = '';

  for await (const question of questions) {
    const { cardDiv, questionContentId } = createCardDiv(question, 'Complexity');

    questionComplexityBlock.appendChild(cardDiv);
    await addOptions(questionContentId, question.id, question.answers, 'Complexity');
    const br = document.createElement('br');
    questionComplexityBlock.appendChild(br);

    if (question.title.includes('$')) {
      await typeset(() => {
        const math = document.getElementById('questionComplexity' + question.id + 'Title');
        math.innerHTML = question.title;
        return [math];
      });
    }
  }
}

async function appendCorrectness(questions) {
  const questionCorrectnessBlock = document.getElementById(questionsCorrectnessID);
  questionCorrectnessBlock.innerHTML = '';

  for await (const question of questions) {
    const { cardDiv, questionContentId } = createCardDiv(question, 'Correctness');

    questionCorrectnessBlock.appendChild(cardDiv);
    await addOptions(questionContentId, question.id, question.answers, 'Correctness');
    if (question.pseudocode) {
      addPseudocode(questionContentId, question.id, question.pseudocode, 'Correctness');
    }
    const br = document.createElement('br');
    questionCorrectnessBlock.appendChild(br);
  }
}

async function appendRecursion(questions) {
  const questionsUniversalRecursionBlock = document.getElementById(questionsUniversalRecursionID);
  questionsUniversalRecursionBlock.innerHTML = '';

  for await (const question of questions) {
    const { cardDiv, questionContentId } = createCardDiv(question, 'Recursion');

    questionsUniversalRecursionBlock.appendChild(cardDiv);
    await addOptions(questionContentId, question.id, question.answers, 'Recursion');
    if (question.pseudocode) {
      addPseudocode(questionContentId, question.id, question.pseudocode, 'Recursion');
    }
    const br = document.createElement('br');
    questionsUniversalRecursionBlock.appendChild(br);

    if (question.title.includes('$')) {
      await typeset(() => {
        const math = document.getElementById('questionRecursion' + question.id + 'Title');
        math.innerHTML = question.title;
        return [math];
      });
    }
  }
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

function addPseudocode(elemId, id, pseudocode, type = '') {
  const elem = document.getElementById(elemId);

  const sourceCode = document.createElement('pre');
  sourceCode.setAttribute('class', 'has-background-black has-text-white-ter');
  sourceCode.setAttribute('id', 'pseudocode' + type + id);
  sourceCode.innerHTML = `${pseudocode}`;

  elem.prepend(sourceCode);
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
  answerObject.recursion = [];
}

function convertToMinutesAndSeconds(diff, timeValue) {
  const minutes = timeValue.minutes - diff.minutes;
  const seconds = Math.floor(diff.seconds) > 0 ? 60 - Math.floor(diff.seconds) : 0;
  return `${(minutes - 1) <= 0 ? 0 : minutes - 1}:${seconds < 10 ? `0${seconds}` : seconds}`;
}

function typeset(code) {
  promise = promise.then(() => MathJax.typesetPromise(code()))
    .catch((err) => console.log('Typeset failed: ' + err.message));
  return promise;
}
