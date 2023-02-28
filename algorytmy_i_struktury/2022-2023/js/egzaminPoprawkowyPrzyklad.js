'use strict';

let promise = Promise.resolve();  // Used to hold chain of typesetting calls
const DateTime = luxon.DateTime;

const problemsList = [
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

char* readline(void);
char* ltrim(char*);
char* rtrim(char*);
char* timeConversion(char* s);

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

int main(void)
{
    char* s = ltrim(rtrim(readline()));

    char* result = timeConversion(s);

    printf( "%s\\n", result);

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
}`
  },
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
  elem.innerHTML = ( key=== 'code' ) ? value.replaceAll('<', '&lt;').replaceAll('>', '&gt;') : value;
  if (key === 'code') {
    elem.setAttribute('class', 'has-background-black has-text-white-ter');
  }

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
