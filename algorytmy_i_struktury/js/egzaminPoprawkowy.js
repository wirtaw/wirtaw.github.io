'use strict';

let promise = Promise.resolve();  // Used to hold chain of typesetting calls
const DateTime = luxon.DateTime;

const problemsList = [
  {
    id: 1,
    title: 'Suma min-max w tablicy',
    description: 'Biorąc pod uwagę pięć dodatnich liczb całkowitych, znajdź minimalną i maksymalną wartość, którą można obliczyć, sumując dokładnie cztery z pięciu liczb całkowitych. Następnie wypisz odpowiednie wartości minimalne i maksymalne jako pojedynczy wiersz dwóch długich liczb całkowitych oddzielonych spacjami',
    example: '$$ arr = [1,3,5,7,9] $$ Minimalna suma to $ 1 + 3 + 5 + 7 = 16 $, a maksymalna to $ 3 + 5 + 7 + 9 = 24 $. Funkcja drukuje ',
    examplePrint: '16 24',
    functionDescription: `Uzupełnij funkcję miniMaxSum `,
    print: 'Wypisz w jednym wierszu dwie liczby całkowite oddzielone spacjami: sumę minimalną i maksymalną sumę $4$ z $5$ elementów.',
    inputFormat: 'Pojedynczy wiersz pięciu liczb całkowitych oddzielonych spacjami.',
    constraints: '$ 1 <= arr[i] <= 10^9 $',
    outputFormat: 'Wypisz dwie długie liczby całkowite oddzielone spacjami, oznaczające odpowiednie wartości minimalne i maksymalne, które można obliczyć, sumując dokładnie cztery z pięciu liczb całkowitych. (Wyjście może być większe niż 32-bitowa liczba całkowita).',
    sampleInput: '1 2 3 4 5',
    sampleOutput: '10 14',
    explanation: `Liczby to $1$, $2$, $3$, $4$, i $5$. Oblicz następujące sumy, używając czterech z pięciu liczb całkowitych:<br>
    1. Suma wszystkiego oprócz $1$, suma wynosi $ 2 + 3 + 4 + 5 = 14 $<br>
    2. Suma wszystkiego oprócz $2$, suma wynosi $ 1 + 3 + 4 + 5 = 13 $<br>
    3. Suma wszystkiego oprócz $3$, suma wynosi $ 1 + 2 + 4 + 5 = 12 $<br>
    4. Suma wszystkiego oprócz $4$, suma wynosi $ 1 + 2 + 3 + 5 = 11 $<br>
    5. Suma wszystkiego oprócz $5$, suma wynosi $ 1 + 2 + 3 + 4 = 10 $<br>`,
    hints: 'Uważaj na przepełnienie liczb całkowitych! Użyj 64-bitowej liczby całkowitej.'
  },
  {
    id: 2,
    title: 'Birthday Cake Candles',
    description: 'Jesteś odpowiedzialny za tort na urodziny dziecka. Zdecydowałeś, że na torcie będzie znajdować się jedna świeczka na każdy rok ich całkowitego wieku. Będą mogli zdmuchnąć tylko najwyższą ze świec. Policz, ile świec jest najwyższych.',
    example: '$$ candles = [4, 4, 1, 3] $$ Maksymalna wysokość świec to $4$ jednostki wysokości. Jest ich $2$, więc wróć $2$.',
    functionDescription: 'Uzupełnij funkcję birthdayCakeCandles. Ma następujące parametry: <br> $int \\enspace candles[n]$: wysokości świec',
    print: '',
    returns: 'int: liczba najwyższych świec',
    inputFormat: 'Pierwszy wiersz zawiera pojedynczą liczbę całkowitą $n$ o rozmiarze $candles[]$.<br>Drugi wiersz zawiera liczby $n$ całkowite oddzielone spacjami, gdzie każda liczba $ i $ całkowita opisuje wysokość $ candles[i]$.',
    constraints: '$$ 1 <= n <= 10^5 $$ $$ 1 <= candles[i] <= 10^7 $$',
    outputFormat: '',
    sampleInput: `4 
3 2 1 3`,
    sampleOutput: '2',
    explanation: 'Wysokości świec są $[3, 2, 1, 3]$. Najwyższe świece to $ 3 $ i jest ich $ 2 $.'
  },
  {
    id: 3,
    title: 'Time Conversion',
    description: 'Biorąc pod uwagę czas w formacie <a href="https://en.wikipedia.org/wiki/12-hour_clock" target="_blank">godzinowym AM/PM</a>, przekonwertuj go na czas wojskowy (24-godzinny).<br> Uwaga: - 00:00:00 w systemie 12-godzinnym to 00:00:00 w systemie 24-godzinnym. <br>- 12:00:00 w systemie 12-godzinnym to 12:00:00 w systemie 24-godzinnym.',
    example: '$$ s = \'12:01:00PM\' $$ Wraca \'12:01:00\'. $$ s = \'12:01:00AM\' $$ Wraca \'00:01:00\'.',
    functionDescription: 'Uzupełnij funkcję timeConversion. Powinien zwrócić nowy ciąg reprezentujący czas wejścia w formacie 24-godzinnym. <br> timeConversion ma następujące parametry: <br> string s: godzina w formacie $12$ godzinowym',
    print: '',
    returns: 'string: godzina w formacie $24$ godzinowym',
    inputFormat: 'Pojedynczy ciąg reprezentujący czas w formacie zegara $12$-godzinnego (tj.: <i>hh:mm:ssAM</i> lub <i>hh:mm:ssPM</i>',
    constraints: '-',
    outputFormat: '',
    sampleInput: '07:05:45PM',
    sampleOutput: '19:05:45',
    explanation: ''
  },
  {
    id: 4,
    title: 'Diagonal difference',
    description: `Mając macierz kwadratową, oblicz bezwzględną różnicę między sumami jej przekątnych.

Na przykład macierz kwadratowa $arr$ jest pokazana poniżej:
<pre>
1 2 3
4 5 6
9 8 9  
</pre>
Przekątna od lewej do prawej = $1 + 5 + 9 = 15$. Przekątna od prawej do lewej = $ 3 + 5 + 9 = 17$. Ich absolutna różnica to $ abs(15-17) = 2$.
`,
    example: '',
    functionDescription: 'Uzupełnij funkcję <i>diagonalDifference</i>. diagonalDifference przyjmuje następujący parametr: <br> $int \\space arr[n][m]$: tablica liczb całkowitych',
    print: '',
    returns: 'int: bezwzględna różnica przekątnej',
    inputFormat: 'Pierwszy wiersz zawiera pojedynczą liczbę całkowitą, $n$, liczbę wierszy i kolumn w macierzy kwadratowej $arr$.<br>Każdy z kolejnych $n$ wierszy opisuje wiersz, $arr[i]$, i składa się z liczb $n$ całkowitych oddzielonych spacjami $arr[i][j]$',
    constraints: '$-100 <= arr[i][j] <= 100$',
    outputFormat: 'Zwróć bezwzględną różnicę między sumami dwóch przekątnych macierzy jako pojedynczą liczbę całkowitą.',
    sampleInput: `3 
 11 2 4
 4 5 6
 10 8 -12`,
    sampleOutput: '15',
    explanation: `The primary diagonal is:
<pre>
11
   5
     -12
</pre>
Suma na głównej przekątnej: $11 + 5 - 12 = 4$

Drugorzędna przekątna to:
<pre>
     4
   5
10
</pre>
Suma na drugorzędnej przekątnej: $4 + 5 + 10 = 19$
Różnica: $|4 - 19| = 15$
Uwaga: |x| jest <a href="https://www.mathsisfun.com/numbers/absolute-value.html" target="_blank">wartością bezwzględną</a> x`
  },
  {
    id: 5,
    title: 'Plus Minus',
    description: 'Biorąc pod uwagę tablicę liczb całkowitych, oblicz stosunki jej elementów, które są dodatnie, ujemne i zerowe. Wypisz wartość dziesiętną każdego ułamka w nowym wierszu z $6$ miejscami po przecinku. <b>Uwaga</b>: To wyzwanie wprowadza problemy z precyzją. Przypadki testowe są skalowane do sześciu miejsc po przecinku, chociaż dopuszczalne są odpowiedzi z błędem bezwzględnym do $10^{-4}$.',
    example: `$$ arr = [1, 1, 0, -1, -1] $$
   Są $n = 5$ elementy , dwa dodatnie, dwa ujemne i jeden zerowy. Ich proporcje są 
   $ \\frac{2}{5} = 0.400000$,  $ \\frac{2}{5} = 0.400000$ i $ \\frac{1}{5} = 0.200000$ Resultat bedzie:
   <pre>
0.400000
0.400000
0.200000
</pre>
`,
    functionDescription: 'Uzupełnij funkcję <i>plusMinus</i>. plusMinus przyjmuje następujący parametr: <br> $int \\space arr[n]$: tablica liczb całkowitych',
    print: 'Wydrukuj proporcje wartości dodatnich, ujemnych i zerowych w tablicy. Każda wartość powinna być wydrukowana w osobnym wierszu z $6$ cyframi po przecinku. Funkcja nie powinna zwracać wartości.',
    inputFormat: 'Pierwszy wiersz zawiera liczbę całkowitą, $n$ , rozmiar tablicy. <br>Drugi wiersz zawiera liczby całkowite $n$ oddzielone spacjami, które opisują $arr[n]$.',
    constraints: '$$ 0 < n < 100 $$ $$ -100 <= arr[i] <= 100 $$',
    outputFormat: `Wydrukuj następujące wiersze, każdy z dokładnością do miejsc dziesiętnych:
<ul>
<li>proporcja wartości dodatnich</li>
<li>proporcja wartości ujemnych</li>
<li>proporcja zer</li>
</ul>`,
    sampleInput: `STDIN           Function
-----           --------
6               arr[] size n = 6
-4 3 -9 0 4 1   arr = [-4, 3, -9, 0, 4, 1]`,
    sampleOutput: `0.500000
0.333333
0.166667`,
    explanation: `W tablicy są liczby $3$ dodatnie, $2$ liczby ujemne i $1$ zero.
Proporcje występowania są dodatnie: $\\frac{3}{6} = 0.500000$, ujemne: $\\frac{2}{6} = 0.333333$ i zerowe: $\\frac{1}{6} = 0.166667$.`
  },
  {
    id: 6,
    title: 'Electronics Shop',
    description: 'Osoba chce określić najdroższą klawiaturę komputerową i dysk USB, które można kupić przy danym budżecie. Biorąc pod uwagę cenniki klawiatur i dysków USB oraz budżet, znajdź koszt ich zakupu. Jeśli nie ma możliwości zakupu obu rzeczy, zwróć $-1$',
    example: `$ b = 60$ 
$ keyboards = [40,50,60] $ 
 $drives = [5,8,12]$ 
 Osoba może kupić $ 40 keyboard + 12 USB drive = 52 $, lub $ 50 keyboard + 8 USB drive = 52 $. Wybierz tę drugą opcję jako droższą i zwróć $58$.
`,
    functionDescription: `Uzupełnij funkcję <i>getMoneySpent</i>. getMoneySpent przyjmuje następujący parametry:
int keyboards[n]: ceny klawiatury
int drives[m]: ceny dysków
int b: budżet`,
    print: '',
    returns: 'int: maksimum, które można wydać, lub $-1$ jeśli nie można kupić obu przedmiotów',
    inputFormat: `Pierwszy wiersz zawiera trzy oddzielone spacjami liczby całkowite $b$, $n$, i $m$, budżet, liczbę modeli klawiatur i liczbę modeli napędów USB.
Drugi wiersz zawiera $n$ oddzielone spacjami liczby całkowite $keyboards[i]$, czyli ceny poszczególnych modeli klawiatury.
Trzeci wiersz zawiera $m$ oddzielone spacjami liczby całkowite $drives[i]$, czyli ceny dysków USB.`,
    constraints: `$$ 1 <= n,m <= 1000 $$ $$ 1 <= b <= 10^6 $$ <br> Cena każdej pozycji jest w zakresie włącznie  $[1, 10^6]$`,
    outputFormat: '',
    sampleInput: `10 2 3
3 1
5 2 8`,
    sampleOutput: '9',
    explanation: 'Kup klawiaturę $2^{nd}$ i dysk USB $3^{rd}$ za łączny koszt $ 8 + 1 = 9$.'
  },
  {
    id: 7,
    title: 'Library Fine',
    description: '',
    example: '',
    functionDescription: '',
    print: '',
    inputFormat: '',
    constraints: '',
    outputFormat: '',
    sampleInput: '',
    sampleOutput: '',
    explanation: ''
  }
];

const headerMapping = {
  description: 'Opis',
  example: 'Przykład',
  examplePrint: 'Przykład wydrukowania',
  functionDescription: 'Opis funkcji',
  print: 'Wydrukować',
  returns: 'Zwroty',
  inputFormat: 'Format wejściowy',
  constraints: 'Ograniczenia',
  outputFormat: 'Format wyjściowy',
  sampleInput: 'Przykładowe wejście',
  sampleOutput: 'Przykładowe dane wyjściowe',
  explanation: 'Wyjaśnienie'
};

document.body.onload = loadDocument();

function headerMapper(key) {
  return headerMapping[key] || '';
}

function createCardDiv({id, title}, type = '', entity = '') {
  const cardDiv = document.createElement('div');
  cardDiv.setAttribute('class', 'card');
  const cardHeaderDiv = document.createElement('div');
  cardHeaderDiv.setAttribute('class', 'card-header');
  const cardHeaderTitleDiv = document.createElement('div');
  cardHeaderTitleDiv.setAttribute('class', 'card-header-title is-size-2');
  cardHeaderTitleDiv.setAttribute('id', entity + type + id + 'Title');

  const newTitleContent = document.createTextNode(title);
  cardHeaderTitleDiv.appendChild(newTitleContent);

  cardHeaderDiv.appendChild(cardHeaderTitleDiv);
  cardDiv.appendChild(cardHeaderDiv);

  const cardContentDiv = document.createElement('div');
  cardContentDiv.setAttribute('class', 'card-content');

  const contentDiv = document.createElement('div');
  contentDiv.setAttribute('class', 'content');
  const entityContentId = entity + type + id + 'Content';
  contentDiv.setAttribute('id', entityContentId);

  cardContentDiv.appendChild(contentDiv);
  cardDiv.appendChild(cardContentDiv);

  return { cardDiv, entityContentId };
}

async function appendSimple(block, value, key = '', entityContentId) {
  let header;

  if (key) {
    header = document.createElement('h3');
    header.innerHTML = headerMapper(key);
  }

  const elem = document.createElement('p');
  elem.setAttribute('id', `${entityContentId}${key}`);
  elem.innerHTML = value;

  if(header) {
    block.appendChild(header);
  }
  block.appendChild(elem);

  /*if (value.includes('$')) {
    await typeset(() => {
      const math = document.getElementById(`${entityContentId}${key}`);
      math.innerHTML = value;
      return [math];
    });
  }*/
}

async function appendPre(block, value, key = '') {
  let header;

  if (key) {
    header = document.createElement('h3');
    header.innerHTML = headerMapper(key);
  }

  const elem = document.createElement('pre');
  elem.innerHTML = value;

  if(header) {
    block.appendChild(header);
  }
  block.appendChild(elem);
}

async function appendProblem(block, problem) {
  const { cardDiv, entityContentId } = createCardDiv(problem, 'Problem', 'problem');

  block.appendChild(cardDiv);

  const problemsContentBlock = document.getElementById(entityContentId);

  const {
    description,
    example,
    examplePrint,
    functionDescription,
    print,
    returns,
    inputFormat,
    constraints,
    outputFormat,
    sampleInput,
    sampleOutput,
    explanation
  } = problem;

  if (description) {
    await appendSimple(problemsContentBlock, description, '', entityContentId);
  }

  if (example) {
    await appendSimple(problemsContentBlock, example, 'example', entityContentId);
  }

  if (examplePrint) {
    await appendPre(problemsContentBlock, examplePrint, '');
  }

  if (functionDescription) {
    await appendSimple(problemsContentBlock, functionDescription, 'functionDescription', entityContentId);
  }

  if (print) {
    await appendSimple(problemsContentBlock, print, 'print', entityContentId);
  }

  if (returns) {
    await appendSimple(problemsContentBlock, returns, 'returns', entityContentId);
  }

  if (inputFormat) {
    await appendSimple(problemsContentBlock, inputFormat, 'inputFormat', entityContentId);
  }

  if (constraints) {
    await appendSimple(problemsContentBlock, constraints, 'constraints', entityContentId);
  }

  if (outputFormat) {
    await appendSimple(problemsContentBlock, outputFormat, 'outputFormat', entityContentId);
  }

  if (sampleInput) {
    await appendPre(problemsContentBlock, sampleInput, 'sampleInput');
  }

  if (sampleOutput) {
    await appendPre(problemsContentBlock, sampleOutput, 'sampleOutput');
  }

  if (explanation) {
    await appendSimple(problemsContentBlock, explanation, 'explanation', entityContentId);
  }
}

async function loadProblems() {
  if (problemsList && Array.isArray(problemsList) && problemsList.length) {
    const problemsBlock = document.getElementById('problemsBlock');
    problemsBlock.innerHTML = '';

    await Promise.all(problemsList.map((item) => appendProblem(problemsBlock, item)));
  }
}

function loadDocument () {
  loadProblems();
}
/*
function typeset(code) {
  promise = promise.then(() => MathJax.typesetPromise(code()))
    .catch((err) => console.log('Typeset failed: ' + err.message));
  return promise;
}*/
