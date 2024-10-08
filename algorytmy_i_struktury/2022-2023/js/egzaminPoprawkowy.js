'use strict';

let promise = Promise.resolve();  // Used to hold chain of typesetting calls
const DateTime = luxon.DateTime;

const upIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" width="12" height="12"><path d="M6 4c-.2 0-.4.1-.5.2L2.2 7.5c-.3.3-.3.8 0 1.1.3.3.8.3 1.1 0L6 5.9l2.7 2.7c.3.3.8.3 1.1 0 .3-.3.3-.8 0-1.1L6.6 4.3C6.4 4.1 6.2 4 6 4Z"></path></svg>';
const downIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" width="12" height="12"><path d="M6 8.825c-.2 0-.4-.1-.5-.2l-3.3-3.3c-.3-.3-.3-.8 0-1.1.3-.3.8-.3 1.1 0l2.7 2.7 2.7-2.7c.3-.3.8-.3 1.1 0 .3.3.3.8 0 1.1l-3.2 3.2c-.2.2-.4.3-.6.3Z"></path></svg>';

const students = [
  { id: 85120, fullName: 'Kovalevskij Deivid' },
  { id: 85286, fullName: 'Kudžma Valdemar' },
  { id: 85079, fullName: 'Markevič Beata' },
  { id: 85109, fullName: 'Miloš Rafal' },
  { id: 85117, fullName: 'Straževičiūtė Edita' },
  { id: 85115, fullName: 'Šturo Edmond' }
];

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
    hints: 'Uważaj na przepełnienie liczb całkowitych! Użyj 64-bitowej liczby całkowitej.',
    code: `#include <assert.h>
#include <ctype.h>
#include <limits.h>
#include <math.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char* readline(void);
char* ltrim(char*);
char* rtrim(char*);
char** split_string(char*);

int parse_int(char*);
void miniMaxSum(int arr_count, int* arr) ;

/*
 * Complete the 'miniMaxSum' function below.
 *
 * The function accepts INTEGER_ARRAY arr as parameter.
 */

void miniMaxSum(int arr_count, int* arr) {
    // Kod algorytmu
}

int main(void)
{

    char** arr_temp = split_string(rtrim(readline()));

    int* arr = malloc(5 * sizeof(int));

    for (int i = 0; i < 5; i++) {
        int arr_item = parse_int(*(arr_temp + i));

        *(arr + i) = arr_item;
    }

    miniMaxSum(5, arr);

    return 0;
}

char* readline(void) {
    size_t alloc_length = 1024;
    size_t data_length = 0;

    char* data = malloc(alloc_length);

    while (true) {
        char* cursor = data + data_length;
        char* line = fgets(cursor, alloc_length - data_length, stdin);

        if (!line) {
            break;
        }

        data_length += strlen(cursor);

        if (data_length < alloc_length - 1 || data[data_length - 1] == '\\n') {
            break;
        }

        alloc_length <<= 1;

        data = realloc(data, alloc_length);

        if (!data) {
            data = '\\0';

            break;
        }
    }

    if (data[data_length - 1] == '\\n') {
        data[data_length - 1] = '\\0';

        data = realloc(data, data_length);

        if (!data) {
            data = '\\0';
        }
    } else {
        data = realloc(data, data_length + 1);

        if (!data) {
            data = '\\0';
        } else {
            data[data_length] = '\\0';
        }
    }

    return data;
}

char* ltrim(char* str) {
    if (!str) {
        return '\\0';
    }

    if (!*str) {
        return str;
    }

    while (*str != '\\0' && isspace(*str)) {
        str++;
    }

    return str;
}

char* rtrim(char* str) {
    if (!str) {
        return '\\0';
    }

    if (!*str) {
        return str;
    }

    char* end = str + strlen(str) - 1;

    while (end >= str && isspace(*end)) {
        end--;
    }

    *(end + 1) = '\\0';

    return str;
}

char** split_string(char* str) {
    char** splits = NULL;
    char* token = strtok(str, " ");

    int spaces = 0;

    while (token) {
        splits = realloc(splits, sizeof(char*) * ++spaces);

        if (!splits) {
            return splits;
        }

        splits[spaces - 1] = token;

        token = strtok(NULL, " ");
    }

    return splits;
}

int parse_int(char* str) {
    char* endptr;
    int value = (int)strtol(str, &endptr, 10);

    if (endptr == str || *endptr != '\\0') {
        exit(EXIT_FAILURE);
    }

    return value;
}`
  },
  {
    id: 2,
    title: 'Urodzinowe Świeczki Tortowe',
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
    explanation: 'Wysokości świec są $[3, 2, 1, 3]$. Najwyższe świece to $ 3 $ i jest ich $ 2 $.',
    code: `#include <assert.h>
#include <ctype.h>
#include <limits.h>
#include <math.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char* readline(void);
char* ltrim(char*);
char* rtrim(char*);
char** split_string(char*);

int parse_int(char*);

int birthdayCakeCandles(int candles_count, int* candles);

/*
 * Complete the 'birthdayCakeCandles' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER_ARRAY candles as parameter.
 */

int birthdayCakeCandles(int candles_count, int* candles) {
    // Kod algorytmu
}

int main(void)
{
    int candles_count = parse_int(ltrim(rtrim(readline())));

    char** candles_temp = split_string(rtrim(readline()));

    int* candles = malloc(candles_count * sizeof(int));

    for (int i = 0; i < candles_count; i++) {
        int candles_item = parse_int(*(candles_temp + i));

        *(candles + i) = candles_item;
    }

    int result = birthdayCakeCandles(candles_count, candles);

    printf("%d\\n", result);

    return 0;
}

char* readline(void) {
    size_t alloc_length = 1024;
    size_t data_length = 0;

    char* data = malloc(alloc_length);

    while (true) {
        char* cursor = data + data_length;
        char* line = fgets(cursor, alloc_length - data_length, stdin);

        if (!line) {
            break;
        }

        data_length += strlen(cursor);

        if (data_length < alloc_length - 1 || data[data_length - 1] == '\\n') {
            break;
        }

        alloc_length <<= 1;

        data = realloc(data, alloc_length);

        if (!data) {
            data = '\\0';

            break;
        }
    }

    if (data[data_length - 1] == '\\n') {
        data[data_length - 1] = '\\0';

        data = realloc(data, data_length);

        if (!data) {
            data = '\\0';
        }
    } else {
        data = realloc(data, data_length + 1);

        if (!data) {
            data = '\\0';
        } else {
            data[data_length] = '\\0';
        }
    }

    return data;
}

char* ltrim(char* str) {
    if (!str) {
        return '\\0';
    }

    if (!*str) {
        return str;
    }

    while (*str != '\\0' && isspace(*str)) {
        str++;
    }

    return str;
}

char* rtrim(char* str) {
    if (!str) {
        return '\\0';
    }

    if (!*str) {
        return str;
    }

    char* end = str + strlen(str) - 1;

    while (end >= str && isspace(*end)) {
        end--;
    }

    *(end + 1) = '\\0';

    return str;
}

char** split_string(char* str) {
    char** splits = NULL;
    char* token = strtok(str, " ");

    int spaces = 0;

    while (token) {
        splits = realloc(splits, sizeof(char*) * ++spaces);

        if (!splits) {
            return splits;
        }

        splits[spaces - 1] = token;

        token = strtok(NULL, " ");
    }

    return splits;
}

int parse_int(char* str) {
    char* endptr;
    int value = (int)strtol(str, &endptr, 10);

    if (endptr == str || *endptr != '\\0') {
        exit(EXIT_FAILURE);
    }

    return value;
}`
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
    explanation: '',
    code: `#include <assert.h>
#include <ctype.h>
#include <limits.h>
#include <math.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char* readline();

/*
 * Complete the 'timeConversion' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING s as parameter.
 */

/*
 * To return the string from the function, you should either do static allocation or dynamic allocation
 *
 * For example,
 * char* return_string_using_static_allocation() {
 *     static char s[] = "static allocation of string";
 *
 *     return s;
 * }
 *
 * char* return_string_using_dynamic_allocation() {
 *     char* s = malloc(100 * sizeof(char));
 *
 *     s = "dynamic allocation of string";
 *
 *     return s;
 * }
 *
 */
char* timeConversion(char* s) {
    // Kod algorytmu
}

int main()
{
    FILE* fptr = fopen(getenv("OUTPUT_PATH"), "w");

    char* s = readline();

    char* result = timeConversion(s);

    fprintf(fptr, "%s\\n", result);

    fclose(fptr);

    return 0;
}

char* readline() {
    size_t alloc_length = 1024;
    size_t data_length = 0;

    char* data = malloc(alloc_length);

    while (true) {
        char* cursor = data + data_length;
        char* line = fgets(cursor, alloc_length - data_length, stdin);

        if (!line) {
            break;
        }

        data_length += strlen(cursor);

        if (data_length < alloc_length - 1 || data[data_length - 1] == '\\n') {
            break;
        }

        alloc_length <<= 1;

        data = realloc(data, alloc_length);

        if (!data) {
            data = '\\0';

            break;
        }
    }

    if (data[data_length - 1] == '\\n') {
        data[data_length - 1] = '\\0';

        data = realloc(data, data_length);

        if (!data) {
            data = '\\0';
        }
    } else {
        data = realloc(data, data_length + 1);

        if (!data) {
            data = '\\0';
        } else {
            data[data_length] = '\\0';
        }
    }

    return data;
}`
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
Uwaga: |x| jest <a href="https://www.mathsisfun.com/numbers/absolute-value.html" target="_blank">wartością bezwzględną</a> x`,
    code: `#include <assert.h>
#include <ctype.h>
#include <limits.h>
#include <math.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char* readline(void);
char* ltrim(char*);
char* rtrim(char*);
char** split_string(char*);

int parse_int(char*);

int diagonalDifference(int arr_rows, int arr_columns, int** arr);

/*
 * Complete the 'diagonalDifference' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts 2D_INTEGER_ARRAY arr as parameter.
 */

int diagonalDifference(int arr_rows, int arr_columns, int** arr) {
    // Kod algorytmu
}

int main(void)
{
    int n = parse_int(ltrim(rtrim(readline())));

    int** arr = malloc(n * sizeof(int*));

    for (int i = 0; i < n; i++) {
        *(arr + i) = malloc(n * (sizeof(int)));

        char** arr_item_temp = split_string(rtrim(readline()));

        for (int j = 0; j < n; j++) {
            int arr_item = parse_int(*(arr_item_temp + j));

            *(*(arr + i) + j) = arr_item;
        }
    }

    int result = diagonalDifference(n, n, arr);

    printf("%d\\n", result);

    return 0;
}

char* readline(void) {
    size_t alloc_length = 1024;
    size_t data_length = 0;

    char* data = malloc(alloc_length);

    while (true) {
        char* cursor = data + data_length;
        char* line = fgets(cursor, alloc_length - data_length, stdin);

        if (!line) {
            break;
        }

        data_length += strlen(cursor);

        if (data_length < alloc_length - 1 || data[data_length - 1] == '\\n') {
            break;
        }

        alloc_length <<= 1;

        data = realloc(data, alloc_length);

        if (!data) {
            data = '\\0';

            break;
        }
    }

    if (data[data_length - 1] == '\\n') {
        data[data_length - 1] = '\\0';

        data = realloc(data, data_length);

        if (!data) {
            data = '\\0';
        }
    } else {
        data = realloc(data, data_length + 1);

        if (!data) {
            data = '\\0';
        } else {
            data[data_length] = '\\0';
        }
    }

    return data;
}

char* ltrim(char* str) {
    if (!str) {
        return '\\0';
    }

    if (!*str) {
        return str;
    }

    while (*str != '\\0' && isspace(*str)) {
        str++;
    }

    return str;
}

char* rtrim(char* str) {
    if (!str) {
        return '\\0';
    }

    if (!*str) {
        return str;
    }

    char* end = str + strlen(str) - 1;

    while (end >= str && isspace(*end)) {
        end--;
    }

    *(end + 1) = '\\0';

    return str;
}

char** split_string(char* str) {
    char** splits = NULL;
    char* token = strtok(str, " ");

    int spaces = 0;

    while (token) {
        splits = realloc(splits, sizeof(char*) * ++spaces);

        if (!splits) {
            return splits;
        }

        splits[spaces - 1] = token;

        token = strtok(NULL, " ");
    }

    return splits;
}

int parse_int(char* str) {
    char* endptr;
    int value = (int)strtol(str, &endptr, 10);

    if (endptr == str || *endptr != '\\0') {
        exit(EXIT_FAILURE);
    }

    return value;
}`
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
Proporcje występowania są dodatnie: $\\frac{3}{6} = 0.500000$, ujemne: $\\frac{2}{6} = 0.333333$ i zerowe: $\\frac{1}{6} = 0.166667$.`,
    code: `#include <assert.h>
#include <ctype.h>
#include <limits.h>
#include <math.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char* readline(void);
char* ltrim(char*);
char* rtrim(char*);
char** split_string(char*);

int parse_int(char*);

void plusMinus(int arr_count, int* arr);

/*
 * Complete the 'plusMinus' function below.
 *
 * The function accepts INTEGER_ARRAY arr as parameter.
 */

void plusMinus(int arr_count, int* arr) {
    // Kod algorytmu
}

int main(void)
{
    int n = parse_int(ltrim(rtrim(readline())));

    char** arr_temp = split_string(rtrim(readline()));

    int* arr = malloc(n * sizeof(int));

    for (int i = 0; i < n; i++) {
        int arr_item = parse_int(*(arr_temp + i));

        *(arr + i) = arr_item;
    }

    plusMinus(n, arr);

    return 0;
}

char* readline(void) {
    size_t alloc_length = 1024;
    size_t data_length = 0;

    char* data = malloc(alloc_length);

    while (true) {
        char* cursor = data + data_length;
        char* line = fgets(cursor, alloc_length - data_length, stdin);

        if (!line) {
            break;
        }

        data_length += strlen(cursor);

        if (data_length < alloc_length - 1 || data[data_length - 1] == '\\n') {
            break;
        }

        alloc_length <<= 1;

        data = realloc(data, alloc_length);

        if (!data) {
            data = '\\0';

            break;
        }
    }

    if (data[data_length - 1] == '\\n') {
        data[data_length - 1] = '\\0';

        data = realloc(data, data_length);

        if (!data) {
            data = '\\0';
        }
    } else {
        data = realloc(data, data_length + 1);

        if (!data) {
            data = '\\0';
        } else {
            data[data_length] = '\\0';
        }
    }

    return data;
}

char* ltrim(char* str) {
    if (!str) {
        return '\\0';
    }

    if (!*str) {
        return str;
    }

    while (*str != '\\0' && isspace(*str)) {
        str++;
    }

    return str;
}

char* rtrim(char* str) {
    if (!str) {
        return '\\0';
    }

    if (!*str) {
        return str;
    }

    char* end = str + strlen(str) - 1;

    while (end >= str && isspace(*end)) {
        end--;
    }

    *(end + 1) = '\\0';

    return str;
}

char** split_string(char* str) {
    char** splits = NULL;
    char* token = strtok(str, " ");

    int spaces = 0;

    while (token) {
        splits = realloc(splits, sizeof(char*) * ++spaces);

        if (!splits) {
            return splits;
        }

        splits[spaces - 1] = token;

        token = strtok(NULL, " ");
    }

    return splits;
}

int parse_int(char* str) {
    char* endptr;
    int value = (int)strtol(str, &endptr, 10);

    if (endptr == str || *endptr != '\\0') {
        exit(EXIT_FAILURE);
    }

    return value;
}`
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
    explanation: 'Kup klawiaturę $2^{nd}$ i dysk USB $3^{rd}$ za łączny koszt $ 8 + 1 = 9$.',
    code: `#include <assert.h>
#include <limits.h>
#include <math.h>
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char* readline(void);
char** split_string(char*);
int getMoneySpent(int keyboards_count, int* keyboards, int drives_count, int* drives, int b);

/*
 * Complete the getMoneySpent function below.
 */
int getMoneySpent(int keyboards_count, int* keyboards, int drives_count, int* drives, int b) {
    // Kod algorytmu
}

int main(void)
{
    char** bnm = split_string(readline());

    char* b_endptr;
    char* b_str = bnm[0];
    int b = (int)strtol(b_str, &b_endptr, 10);

    if (b_endptr == b_str || *b_endptr != '\\0') { exit(EXIT_FAILURE); }

    char* n_endptr;
    char* n_str = bnm[1];
    int n = (int)strtol(n_str, &n_endptr, 10);

    if (n_endptr == n_str || *n_endptr != '\\0') { exit(EXIT_FAILURE); }

    char* m_endptr;
    char* m_str = bnm[2];
    int m = (int)strtol(m_str, &m_endptr, 10);

    if (m_endptr == m_str || *m_endptr != '\\0') { exit(EXIT_FAILURE); }

    char** keyboards_temp = split_string(readline());

    int* keyboards = malloc(n * sizeof(int));

    for (int keyboards_itr = 0; keyboards_itr < n; keyboards_itr++) {
        char* keyboards_item_endptr;
        char* keyboards_item_str = *(keyboards_temp + keyboards_itr);
        int keyboards_item = (int)strtol(keyboards_item_str, &keyboards_item_endptr, 10);

        if (keyboards_item_endptr == keyboards_item_str || *keyboards_item_endptr != '\\0') { exit(EXIT_FAILURE); }

        *(keyboards + keyboards_itr) = keyboards_item;
    }

    int keyboards_count = n;

    char** drives_temp = split_string(readline());

    int* drives = malloc(m * sizeof(int));

    for (int drives_itr = 0; drives_itr < m; drives_itr++) {
        char* drives_item_endptr;
        char* drives_item_str = *(drives_temp + drives_itr);
        int drives_item = (int)strtol(drives_item_str, &drives_item_endptr, 10);

        if (drives_item_endptr == drives_item_str || *drives_item_endptr != '\\0') { exit(EXIT_FAILURE); }

        *(drives + drives_itr) = drives_item;
    }

    int drives_count = m;

    /*
     * The maximum amount of money she can spend on a keyboard and USB drive, or -1 if she can't purchase both items
     */

    int moneySpent = getMoneySpent(keyboards_count, keyboards, drives_count, drives, b);

    printf("%d\\n", moneySpent);

    return 0;
}

char* readline(void) {
    size_t alloc_length = 1024;
    size_t data_length = 0;
    char* data = malloc(alloc_length);

    while (true) {
        char* cursor = data + data_length;
        char* line = fgets(cursor, alloc_length - data_length, stdin);

        if (!line) { break; }

        data_length += strlen(cursor);

        if (data_length < alloc_length - 1 || data[data_length - 1] == '\\n') { break; }

        size_t new_length = alloc_length << 1;
        data = realloc(data, new_length);

        if (!data) { break; }

        alloc_length = new_length;
    }

    if (data[data_length - 1] == '\\n') {
        data[data_length - 1] = '\\0';
    }

    data = realloc(data, data_length);

    return data;
}

char** split_string(char* str) {
    char** splits = NULL;
    char* token = strtok(str, " ");

    int spaces = 0;

    while (token) {
        splits = realloc(splits, sizeof(char*) * ++spaces);
        if (!splits) {
            return splits;
        }

        splits[spaces - 1] = token;

        token = strtok(NULL, " ");
    }

    return splits;
}`
  },
  {
    id: 7,
    title: 'Binary Numbers',
    description: 'Biorąc pod uwagę liczbę całkowitą bazową $10$, $n$, zamień ją na binarną (podstawa-$2$). Następnie znajdź i wypisz liczbę całkowitą bazową-$10$ oznaczającą maksymalną liczbę kolejnych cyfr $1$ w $n$ reprezentacji binarnej . Podczas pracy z różnymi podstawami często pokazuje się podstawę jako indeks dolny.',
    example: `$$ n = 125 $$ 
    Binarna reprezentacja $125_{10}$ to $1111101_2$. W bazie $10$ są $5$ $1$ kolejne z dwóch grup. Wydrukuj maksimum, $5$.`,
    functionDescription: '',
    print: '',
    inputFormat: 'Pojedyncza liczba całkowita, $n$.',
    constraints: '$$ 1 <= n <= 10^6 $$',
    outputFormat: 'Wydrukuj pojedynczą liczbę całkowitą bazową-$10$, która oznacza maksymalną liczbę kolejnych liczb $1$ w binarnej reprezentacji $n$.',
    sampleInput: '5',
    sampleOutput: '1',
    sampleInputB: '13',
    sampleOutputB: '2',
    explanation: `Przykładowy przypadek 1:<br>
Binarna reprezentacja $5_{10}$ jest $101_2$, więc maksymalna liczba kolejnych $1$ to $1$.<br>
<br>
Przykładowy przypadek 2:<br>
Binarna reprezentacja $13_{10}$ jest $1101_2$ , więc maksymalna liczba kolejnych to $1$ to $2$.<br>`,
    code: `#include <assert.h>
#include <ctype.h>
#include <limits.h>
#include <math.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char* readline(void);
char* ltrim(char*);
char* rtrim(char*);
int parse_int(char*);
int maxOnesInBinary(int n);

/*
 * Complete the 'maxOnesInBinary' function below.
 *
 * The function accepts INTEGER n as parameter.
 */

int maxOnesInBinary(int n) {
    // Kod algorytmu
}


int main(void)
{
    int n = parse_int(ltrim(rtrim(readline())));
    
    int max = 0;
    max = maxOnesInBinary(n);
    
    printf("%d\\n", max);
    return 0;
}

char* readline(void) {
    size_t alloc_length = 1024;
    size_t data_length = 0;

    char* data = malloc(alloc_length);

    while (true) {
        char* cursor = data + data_length;
        char* line = fgets(cursor, alloc_length - data_length, stdin);

        if (!line) {
            break;
        }

        data_length += strlen(cursor);

        if (data_length < alloc_length - 1 || data[data_length - 1] == '\\n') {
            break;
        }

        alloc_length <<= 1;

        data = realloc(data, alloc_length);

        if (!data) {
            data = '\\0';

            break;
        }
    }

    if (data[data_length - 1] == '\\n') {
        data[data_length - 1] = '\\0';

        data = realloc(data, data_length);

        if (!data) {
            data = '\\0';
        }
    } else {
        data = realloc(data, data_length + 1);

        if (!data) {
            data = '\\0';
        } else {
            data[data_length] = '\\0';
        }
    }

    return data;
}

char* ltrim(char* str) {
    if (!str) {
        return '\\0';
    }

    if (!*str) {
        return str;
    }

    while (*str != '\\0' && isspace(*str)) {
        str++;
    }

    return str;
}

char* rtrim(char* str) {
    if (!str) {
        return '\\0';
    }

    if (!*str) {
        return str;
    }

    char* end = str + strlen(str) - 1;

    while (end >= str && isspace(*end)) {
        end--;
    }

    *(end + 1) = '\\0';

    return str;
}

int parse_int(char* str) {
    char* endptr;
    int value = strtol(str, &endptr, 10);

    if (endptr == str || *endptr != '\\0') {
        exit(EXIT_FAILURE);
    }

    return value;
}`
  },
  {
    id: 8,
    title: 'Staircase (Schody)',
    description: `
    To są schody o wymiarach $n = 4$:<br>
<pre>
    #
   ##
  ###
 ####
</pre><br>
Jego podstawa i wysokość są równe $n$. Jest rysowany za pomocą $\\#$ symboli i spacji. Ostatni wiersz nie jest poprzedzony spacją.

Napisz program, który wypisze klatkę schodową o rozmiarze $n$.`,
    example: '',
    functionDescription: `Uzupełnij funkcję <i>staircase</i> .
klatka schodowa ma następujące parametry:<br>
<b>int n: liczba całkowita</b>`,
    print: 'Wydrukuj staircase w sposób opisany powyżej.',
    inputFormat: 'Pojedyncza liczba całkowita $n$, oznaczająca rozmiar schody.',
    constraints: '$$ 0 < n <= 100 $$',
    outputFormat: 'Wydrukuj schody o rozmiarze $n$, używając symboli # i spacji.',
    sampleInput: '6',
    sampleOutput: `     #
    ##
   ###
  ####
 #####
######`,
    explanation: 'Schody jest wyrównana do prawej, składa się z $\\#$ symboli i spacji oraz ma wysokość i szerokość $n = 6$.',
    code: `#include <assert.h>
#include <ctype.h>
#include <limits.h>
#include <math.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char* readline(void);
char* ltrim(char*);
char* rtrim(char*);
int parse_int(char*);
void staircase(int n);

/*
 * Complete the 'staircase' function below.
 *
 * The function accepts INTEGER n as parameter.
 */

void staircase(int n) {
    // Kod algorytmu
}

int main(void)
{
    int n = parse_int(ltrim(rtrim(readline())));

    staircase(n);

    return 0;
}

char* readline(void) {
    size_t alloc_length = 1024;
    size_t data_length = 0;

    char* data = malloc(alloc_length);

    while (true) {
        char* cursor = data + data_length;
        char* line = fgets(cursor, alloc_length - data_length, stdin);

        if (!line) {
            break;
        }

        data_length += strlen(cursor);

        if (data_length < alloc_length - 1 || data[data_length - 1] == '\\n') {
            break;
        }

        alloc_length <<= 1;

        data = realloc(data, alloc_length);

        if (!data) {
            data = '\\0';

            break;
        }
    }

    if (data[data_length - 1] == '\\n') {
        data[data_length - 1] = '\\0';

        data = realloc(data, data_length);

        if (!data) {
            data = '\\0';
        }
    } else {
        data = realloc(data, data_length + 1);

        if (!data) {
            data = '\\0';
        } else {
            data[data_length] = '\\0';
        }
    }

    return data;
}

char* ltrim(char* str) {
    if (!str) {
        return '\\0';
    }

    if (!*str) {
        return str;
    }

    while (*str != '\\0' && isspace(*str)) {
        str++;
    }

    return str;
}

char* rtrim(char* str) {
    if (!str) {
        return '\\0';
    }

    if (!*str) {
        return str;
    }

    char* end = str + strlen(str) - 1;

    while (end >= str && isspace(*end)) {
        end--;
    }

    *(end + 1) = '\\0';

    return str;
}

int parse_int(char* str) {
    char* endptr;
    int value = (int)strtol(str, &endptr, 10);

    if (endptr == str || *endptr != '\\0') {
        exit(EXIT_FAILURE);
    }

    return value;
}`
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
  sampleInputB: 'Przykładowe wejście 2',
  sampleOutputB: 'Przykładowe dane wyjściowe 2',
  explanation: 'Wyjaśnienie',
  code: 'Kod programu'
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
  const cardHeaderTitle = document.createElement('p');
  cardHeaderTitle.setAttribute('class', 'card-header-title is-size-4');
  const entityTitleId = entity + type + id + 'Title';
  cardHeaderTitle.setAttribute('id', entityTitleId);

  const newTitleContent = document.createTextNode(`${id}) ${title}`);
  cardHeaderTitle.appendChild(newTitleContent);

  const cardHeaderButton = document.createElement('button');
  cardHeaderButton.setAttribute('class', 'card-header-icon');
  cardHeaderButton.setAttribute('aria-label', 'more options');
  cardHeaderButton.onclick = function() {
    const content = document.getElementById(entity + type + id + 'Content');
    const footer = document.getElementById(entity + type + id + 'Footer');
    const icon = document.getElementById(entity + type + id + 'Icon');

    if (content) {

      if (content.style.display === 'none') {
        content.style.display = 'block';
        footer.style.display = 'block';
        icon.innerHTML = upIcon;
      } else {
        content.style.display = 'none';
        footer.style.display = 'none';
        icon.innerHTML = downIcon;
      }
    }
  };

  const cardHeaderButtonIcon = document.createElement('span');
  cardHeaderButtonIcon.setAttribute('class', 'icon');

  const cardHeaderButtonIconElem = document.createElement('i');
  cardHeaderButtonIconElem.setAttribute('aria-hidden', 'true');
  cardHeaderButtonIconElem.setAttribute('id', entity + type + id + 'Icon');
  cardHeaderButtonIconElem.innerHTML = downIcon;

  cardHeaderButtonIcon.appendChild(cardHeaderButtonIconElem);

  cardHeaderButton.appendChild(cardHeaderButtonIcon);

  cardHeaderDiv.appendChild(cardHeaderTitle);
  cardHeaderDiv.appendChild(cardHeaderButton);
  cardDiv.appendChild(cardHeaderDiv);

  const cardContentDiv = document.createElement('div');
  cardContentDiv.setAttribute('class', 'card-content');

  const contentDiv = document.createElement('div');
  contentDiv.setAttribute('class', 'content');
  const entityContentId = entity + type + id + 'Content';
  contentDiv.setAttribute('id', entityContentId);
  contentDiv.style.display = 'none';

  cardContentDiv.appendChild(contentDiv);
  cardDiv.appendChild(cardContentDiv);

  const cardFooterDiv = document.createElement('div');
  cardFooterDiv.setAttribute('class', 'card-footer');
  cardFooterDiv.setAttribute('id', entity + type + id + 'Footer');
  cardFooterDiv.style.display = 'none';

  const footerItem = document.createElement('p');
  footerItem.setAttribute('class', 'card-footer-item');

  const footerItemContent = document.createElement('span');

  const footerItemContentTag = document.createElement('a');
  footerItemContentTag.setAttribute('href', '#top');
  footerItemContentTag.innerText = 'top';

  footerItemContent.appendChild(footerItemContentTag);
  footerItem.appendChild(footerItemContent);
  cardFooterDiv.appendChild(footerItem);
  cardDiv.appendChild(cardFooterDiv);

  return { cardDiv, entityContentId, entityTitleId, textValue: title };
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
}

async function appendPre(block, value, key = '') {
  let header;

  if (key) {
    header = document.createElement('h3');
    header.innerHTML = headerMapper(key);
  }

  const elem = document.createElement('pre');
  elem.innerHTML = ( key=== 'code' ) ? value.replaceAll('<', '&lt;').replaceAll('>', '&gt;') : value;
  if (key === 'code') {
    elem.setAttribute('class', 'has-background-black has-text-white-ter');
  }

  if(header) {
    block.appendChild(header);
  }
  block.appendChild(elem);
}

function appendMenuLink(linkId, title, id) {
  const menuBlock = document.getElementById('menuZadania');

  const elem = document.createElement('li');

  const link = document.createElement('a');
  link.setAttribute('href', `#${linkId}`);
  const txt = document.createTextNode(` ${id}) ${title}`);

  const span = document.createElement('span');
  span.setAttribute('class', 'icon is-small');

  const icon = document.createElement('i');
  icon.setAttribute('class', '');
  icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path d="m7.775 3.275 1.25-1.25a3.5 3.5 0 1 1 4.95 4.95l-2.5 2.5a3.5 3.5 0 0 1-4.95 0 .751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018 1.998 1.998 0 0 0 2.83 0l2.5-2.5a2.002 2.002 0 0 0-2.83-2.83l-1.25 1.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042Zm-4.69 9.64a1.998 1.998 0 0 0 2.83 0l1.25-1.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042l-1.25 1.25a3.5 3.5 0 1 1-4.95-4.95l2.5-2.5a3.5 3.5 0 0 1 4.95 0 .751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018 1.998 1.998 0 0 0-2.83 0l-2.5 2.5a1.998 1.998 0 0 0 0 2.83Z"></path></svg>`;

  span.appendChild(icon);
  link.appendChild(span);
  link.appendChild(txt);
  elem.appendChild(link);
  menuBlock.appendChild(elem);
}

async function appendProblem(block, problem) {
  const {
    cardDiv,
    entityContentId,
    entityTitleId,
    textValue
  } = createCardDiv(problem, 'Problem', 'problem');

  block.appendChild(cardDiv);
  appendMenuLink(entityTitleId, textValue, problem.id);

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
    sampleInputB,
    sampleOutputB,
    explanation,
    code
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

  if (sampleInputB) {
    await appendPre(problemsContentBlock, sampleInputB, 'sampleInput');
  }

  if (sampleOutputB) {
    await appendPre(problemsContentBlock, sampleOutputB, 'sampleOutput');
  }

  if (explanation) {
    await appendSimple(problemsContentBlock, explanation, 'explanation', entityContentId);
  }

  if (code) {
    await appendPre(problemsContentBlock, code, 'code', entityContentId);
  }
}

document.getElementById('losowacZadaniaDlaStudentow').onclick = function() {
  const listaZadanIStudentowBlock = document.getElementById('listaZadanIStudentow');

  if (listaZadanIStudentowBlock) {
    const randProblemsList = shuffle(problemsList, 0.5)
      .filter((item) => !!item && item.id !== 3).map(({id, title}) => ({id, title}));
    listaZadanIStudentowBlock.innerHTML = '';

    const table = document.createElement('table');

    const tableHead = document.createElement('thead');
    const tableBody = document.createElement('tbody');
    const tableFoot = document.createElement('tfoot');

    const trHead = document.createElement('tr');
    const trFoot = document.createElement('tr');

    const colNum = document.createElement('th');
    colNum.innerText = '';
    trHead.appendChild(colNum);

    const colStudent = document.createElement('th');
    colStudent.innerText = '';
    trHead.appendChild(colStudent);

    const colTask = document.createElement('th');
    colTask.innerText = '';
    trHead.appendChild(colTask);

    tableHead.appendChild(trHead);
    tableFoot.appendChild(trFoot);

    table.appendChild(tableHead);
    table.appendChild(tableFoot);
    for (let i=0; i < students.length; i++) {
      const { id, fullName } = students[i];
      const { id: taskId, title } = randProblemsList[i];
      const trBody = document.createElement('tr');

      const colNum = document.createElement('td');
      colNum.innerText = id;
      trBody.appendChild(colNum);

      const colStudent = document.createElement('td');
      colStudent.innerText = fullName;
      trBody.appendChild(colStudent);

      const colTask = document.createElement('td');
      colTask.innerText = `${taskId} ${title}`;
      trBody.appendChild(colTask);

      tableBody.appendChild(trBody);
    }
    table.appendChild(tableBody);

    listaZadanIStudentowBlock.appendChild(table);
  }
};

async function loadProblems() {
  if (problemsList && Array.isArray(problemsList) && problemsList.length) {
    const problemsBlock = document.getElementById('problemsBlock');

    if (problemsBlock) {
      problemsBlock.innerHTML = '';

      await Promise.all(problemsList.map((item) => appendProblem(problemsBlock, item)));
    }

    const listaZadanIStudentowBlock = document.getElementById('listaZadanIStudentow');

    if (listaZadanIStudentowBlock) {
      listaZadanIStudentowBlock.innerHTML = '';
    }
  }
}

function loadDocument () {
  loadProblems();
}
