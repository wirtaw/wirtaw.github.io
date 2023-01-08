'use strict';

if (faker) {
  let randomParagraph = faker.lorem.paragraph();
  // Zadanie 1
  const textItem1BlockID = 'textItem1BlockID';
  const textItem1Block = document.getElementById(textItem1BlockID);
  const textItem1ResultBlockID = 'textItem1ResultBlockID';
  const textItem1ResultBlock = document.getElementById(textItem1ResultBlockID);
  const textItem1WordBlockID = 'textItem1WordBlockID';
  const textItem1WordBlock = document.getElementById(textItem1WordBlockID);

  const word = findLongest(randomParagraph);
  textItem1WordBlock.innerText = word;
  textItem1Block.innerText = `${randomParagraph}`;
  textItem1ResultBlock.innerText = `${replaceWord(randomParagraph, ` ${word} `, ' ')}`;

  let wordsCount = random(20, 45);
  randomParagraph = faker.random.words(wordsCount);
  const items = random(10, 15);
  for (let i = 0; i < items; i++) {
    const number = faker.datatype.number({max: 100});
    randomParagraph = insertSymbol(randomParagraph, random(0, randomParagraph.length - 1), number);
  }
  // Zadanie 2
  const textItem2BlockID = 'textItem2BlockID';
  const textItem2Block = document.getElementById(textItem2BlockID);
  const textItem2ResultBlockID = 'textItem2ResultBlockID';
  const textItem2ResultBlock = document.getElementById(textItem2ResultBlockID);

  if (randomParagraph) {
    textItem2Block.innerText = `${randomParagraph}`;
    textItem2ResultBlock.innerText = `${2 * items}`;
  } else {
    console.error(new Error(`randomParagraph is empty ${randomParagraph}`));
  }

  // Zadanie 3
  const textItem3BlockID = 'textItem3BlockID';
  const textItem3Block = document.getElementById(textItem3BlockID);
  const textItem3aBlockID = 'textItem3aBlockID';
  const textItem3aBlock = document.getElementById(textItem3aBlockID);
  const textItem3ResultBlockID = 'textItem3ResultBlockID';
  const textItem3ResultBlock = document.getElementById(textItem3ResultBlockID);

  wordsCount = random(1, 5);
  randomParagraph = faker.random.words(wordsCount);
  textItem3Block.innerText = `${randomParagraph}`;
  const unique1 = getUniqueLetters(randomParagraph);

  wordsCount = random(1, 5);
  randomParagraph = faker.random.words(wordsCount);
  textItem3aBlock.innerText = `${randomParagraph}`;
  const unique2 = getUniqueLetters(randomParagraph);

  textItem3ResultBlock.innerText = `${([...new Set([...unique2, ...unique1])]).toString()}`;

  // Zadanie 4
  const textItem4BlockID = 'textItem4BlockID';
  const textItem4Block = document.getElementById(textItem4BlockID);
  const textItem4ResultBlockID = 'textItem4ResultBlockID';
  const textItem4ResultBlock = document.getElementById(textItem4ResultBlockID);

  randomParagraph = faker.lorem.paragraph();
  textItem4Block.innerText = `${randomParagraph}`;
  textItem4ResultBlock.innerText = `${([...new Set([...randomParagraph.split(' ')])]).join(', ')}`;
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function findLongest(text) {
  const words = (text) ? text.split(' ') : [];
  if (words.length > 0) {
    const countWordsSorted = words.map((word) => ({word, count: word.length}))
      .sort((a, b) => b.count - a.count);
    return countWordsSorted[0].word;
  }
  return '';
}

function replaceWord(text, from, to = ' ') {
  if (text && from) {
    return text.replace(from, to);
  }

  return text;
}

function insertSymbol(text, pos, symbol) {
  if (text.length && pos && symbol) {
    return `${text.substring(0, pos)}${symbol}${text.substring(pos + 1, text.length)}`;
  }
  return text;
}

function getUniqueLetters(text) {
  if (text) {
    return [...new Set(text.replace(/ /gi, '').split(''))];
  }

  return [];
}
