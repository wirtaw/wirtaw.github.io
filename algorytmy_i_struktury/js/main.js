document.body.onload = loadDocument();

function convertPointsToGrade(points) {
  const mapping = {
    '2': {
      from: 0,
      to: 70
    },
    '2.5': {
      from: 70,
      to: 87
    },
    '3': {
      from: 87,
      to: 104
    },
    '3.5': { // 0.61
      from: 104,
      to: 121
    },
    '4': { // 0.71
      from: 121,
      to: 138
    },
    '4.5': { // 0.81
      from: 138,
      to: 155
    },
    '5': { // 0.91
      from: 155,
      to: 171
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

function evalToMark(points) {
  if (points <= 2) {
    return 2;
  }

  if (2 < points && points < 3) {
    return 2.5;
  } else if (3 <= points && points < 3.5) {
    return 3;
  } else if (3.5 <= points && points < 4) {
    return 3.5;
  } else if (4 <= points && points < 4.5) {
    return 4;
  } else if (4.5 <= points && points < 5) {
    return 4.5;
  } else if (points >= 5) {
    return 5;
  }
}

function loadDocument () {
  const pointsTable = document.getElementById('pointsTable');

  if (pointsTable) {
    const [,,tbody] = pointsTable.children;
    if (tbody?.children) {
      for (const tr of tbody.children) {
        const [tdImieNazw, , tdWyklady, tdLabs, tdProject, tdKolokwium, tdEgzamin, tdTotal] = tr.children;
        const ImieNazw = tdImieNazw.innerText.trim();
        const pointsWyklady = countingPoints(tdWyklady);
        const pointsLabs = countingPoints(tdLabs);
        const pointsProject = projectPointCount(tdProject);
        const pointsKolokwium = projectPointCount(tdKolokwium);
        const pointsEgzamin = projectPointCount(tdEgzamin);
        const total = pointsWyklady + pointsLabs + pointsProject + pointsKolokwium + pointsEgzamin;
        let ocenaLaboratorium = (pointsLabs) ? evalToMark((pointsLabs + pointsWyklady + pointsKolokwium + pointsEgzamin) / 110 * 5) : 2;
        let ocenaProject = (pointsProject) ? evalToMark(pointsProject / 60 * 5) : 2;

        if (total && tdTotal) {
          const { grade, diff } = convertPointsToGrade(total);
          const spanTotal = document.createElement('span');
          const brTotal = document.createElement('br');
          const spanGrade = document.createElement('span');
          spanTotal.setAttribute('class', 'is-underlined');
          spanGrade.setAttribute('class', 'has-text-weight-semibold is-italic is-size-5 has-tooltip-left has-tooltip-info has-tooltip-multiline');
          spanGrade.setAttribute('data-tooltip', `${ImieNazw}  
          Laboratorium - ${ocenaLaboratorium.toFixed(2)}/
          Projekt - ${ocenaProject.toFixed(2)} /               
          Do nastepnej oceny brakuje ${diff.toFixed(2)} punktow`);
          spanTotal.innerHTML = `${(pointsLabs + pointsWyklady + pointsKolokwium + pointsEgzamin)} + ${pointsProject} = ${total}`;
          spanGrade.innerHTML = `${evalToMark((ocenaLaboratorium + ocenaProject) / 2)} / ${grade}`;
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
