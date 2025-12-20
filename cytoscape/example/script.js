var cy = cytoscape({
  container: document.getElementById('cy'),

  boxSelectionEnabled: false,
  autounselectify: true,

  style: cytoscape.stylesheet()
    .selector('node')
    .style({
      'content': 'data(value)'
    })
    .selector('edge')
    .style({
      'curve-style': 'bezier',
      'target-arrow-shape': 'triangle',
      'width': 4,
      'line-color': '#ddd',
      'target-arrow-color': '#ddd'
    })
    .selector('.highlighted')
    .style({
      'background-color': '#61bffc',
      'line-color': '#61bffc',
      'target-arrow-color': '#61bffc',
      'transition-property': 'background-color, line-color, target-arrow-color',
      'transition-duration': '0.5s'
    }),

  elements: {
    nodes: [
      { data: { id: 'a', value: 1 } },
      { data: { id: 'b', value: 2 } },
      { data: { id: 'c', value: 3 } },
      { data: { id: 'd', value: 4 } },
      { data: { id: 'e', value: 5 } }
    ],

    edges: [
      { data: { id: 'ae', weight: 1, source: 'a', target: 'e' } },
      { data: { id: 'de', weight: 2, source: 'e', target: 'd' } },
      { data: { id: 'cd', weight: 3, source: 'd', target: 'c' } },
      { data: { id: 'bc', weight: 4, source: 'c', target: 'b' } },
      { data: { id: 'ce', weight: 5, source: 'c', target: 'e' } },
      { data: { id: 'ac', weight: 6, source: 'c', target: 'a' } },
      { data: { id: 'ab', weight: 7, source: 'a', target: 'b' } },
      { data: { id: 'ad', weight: 8, source: 'a', target: 'd' } },
      { data: { id: 'be', weight: 9, source: 'b', target: 'e' } },
      { data: { id: 'bd', weight: 10, source: 'b', target: 'd' } },
    ]
  },

  layout: {
    name: 'breadthfirst',
    directed: true,
    roots: '#a',
    padding: 10
  }
});

var bfs = cy.elements().bfs('#b', function() { }, true);

var i = 0;
var highlightNextEle = function() {
  if (i < bfs.path.length) {
    bfs.path[i].addClass('highlighted');

    i++;
    setTimeout(highlightNextEle, 1000);
  }
};

// kick off first highlight
highlightNextEle();