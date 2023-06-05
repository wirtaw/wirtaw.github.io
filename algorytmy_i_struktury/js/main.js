document.body.onload = loadDocument();

function convertPointsToGrade(points) {
  const mapping = {
    '-': {
      from: 0,
      to: 15
    },
    '2': {
      from: 15,
      to: 33
    },
    '2.5': {
      from: 33,
      to: 66
    },
    '3': {
      from: 66,
      to: 100
    },
    '3.5': {
      from: 100,
      to: 115
    },
    '4': {
      from: 115,
      to: 125
    },
    '4.5': {
      from: 125,
      to: 135
    },
    '5': {
      from: 135,
      to: 200
    }
  };
  let grade = '';
  let diff = 0;

  for (const key of Object.keys(mapping)) {
    if (grade) {
      diff = mapping[key].from - points;
      break;
    }

    if (mapping[key].from <= points && points < mapping[key].to && !grade) {
      grade = key;
    }
  }

  return { grade, diff };
}

function countingPoints(elem) {
  let points = 0;
  const [tbody] = elem.children;

  if (tbody?.children) {
    const inner = tbody.innerText;
    if (inner && inner.includes("\t") && !inner.includes("\n")) {
      points = inner.split("\t")
        .map((item) => {
          if (!item.includes('/')) {
            return item.replaceAll('-', 0);
          }
          return item.split('/')
            .map((it) => it.replaceAll('-', '')
              .replaceAll('', ''))
            .filter((it) => it)
            .reduce((acc, prev) => acc + parseFloat(prev), 0);
        })
        .filter((it) => it)
        .reduce((acc, prev) => (!isNaN(parseFloat(prev))) ? acc + parseFloat(prev) : acc, 0);
    }
  }

  return points;
}

function projectPointCount(tdProject) {
  return tdProject.innerText.split("\n")
    .map((it) =>
      (it.trim().indexOf("\t") > -1) ?
        it.trim().split("\t") :
        it.trim())
    .flat()
    .filter((it) => !['-'].includes(it) && !isNaN(parseFloat(it)))
    .map((it) => parseFloat(it))
    .reduce((acc, curr) => acc + curr, 0);
}

function loadDocument () {
  const pointsTable = document.getElementById('pointsTable');

  if (pointsTable) {
    const [,,tbody] = pointsTable.children;
    if (tbody?.children) {
      for (const tr of tbody.children) {
        const [, , tdWyklady, tdLabs, tdProject, tdKolokwium, tdEgzamin, tdTotal] = tr.children;
        const pointsWyklady = countingPoints(tdWyklady);
        const pointsLabs = countingPoints(tdLabs);
        const pointsProject = projectPointCount(tdProject);
        const pointsKolokwium = projectPointCount(tdKolokwium);
        const pointsEgzamin = projectPointCount(tdEgzamin);
        const total = pointsWyklady + pointsLabs + pointsProject + pointsKolokwium + pointsEgzamin;

        if (total && tdTotal) {
          const { grade, diff } = convertPointsToGrade(total);
          const spanTotal = document.createElement('span');
          const brTotal = document.createElement('br');
          const spanGrade = document.createElement('span');
          spanTotal.setAttribute('class', 'is-underlined');
          spanGrade.setAttribute('class', 'has-text-weight-semibold is-italic has-tooltip-multiline');
          spanGrade.setAttribute('data-tooltip', `Do nastepnej oceny brakuje ${diff} punktow`);
          spanTotal.innerHTML = `${total}`;
          spanGrade.innerHTML = `${grade}`;
          tdTotal.appendChild(spanTotal);
          tdTotal.appendChild(brTotal);
          tdTotal.appendChild(spanGrade);
        }
      }
    }
  }

  const copyrightDate = document.getElementById('copyrightDate');
  const dt = new Date();
  if (copyrightDate) {
    copyrightDate.innerText = `. ${dt.getFullYear()}`;
  }
}

function shuffle(array, factor = 0.5) {
  const indexes = array.map(({id}) => +id).sort(() => Math.random() - factor);

  return indexes.map((i) => array[i-1]);
}
