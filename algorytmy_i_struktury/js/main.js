function countTotal() {

}

document.body.onload = loadDocument();

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

function loadDocument () {
  const pointsTable = document.getElementById('pointsTable');

  if (pointsTable) {
    const [,,tbody] = pointsTable.children;
    if (tbody?.children) {
      for (const tr of tbody.children) {
        const [, , tdWyklady, tdLabs, tdProject, tdKolokwium, tdEgzamin, tdTotal] = tr.children;
        const pointsWyklady = countingPoints(tdWyklady);
        const pointsLabs = countingPoints(tdLabs);
        const pointsProject = countingPoints(tdProject);
        const pointsKolokwium = countingPoints(tdKolokwium);
        const pointsEgzamin = countingPoints(tdEgzamin);
        const total = pointsWyklady + pointsLabs + pointsProject + pointsKolokwium + pointsEgzamin;

        if (total) {
          tdTotal.innerHTML = `${total}`;
        }
      }
    }
  }
}

