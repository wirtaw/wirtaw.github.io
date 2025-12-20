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
      { data: { id: 'e', value: 5 } },
      { data: { id: 'f', value: 6 } },
      { data: { id: 'g', value: 7 } },
      { data: { id: 'h', value: 8 } }
    ],

    edges: [
      { data: { id: 'ae', weight: 1, source: 'a', target: 'e' } },
      { data: { id: 'ca', weight: 1, source: 'c', target: 'a' } },
      { data: { id: 'ba', weight: 1, source: 'b', target: 'a' } },
      { data: { id: 'bd', weight: 1, source: 'b', target: 'd' } },
      { data: { id: 'cb', weight: 1, source: 'c', target: 'b' } },
      { data: { id: 'bg', weight: 1, source: 'b', target: 'g' } },
      { data: { id: 'bh', weight: 1, source: 'b', target: 'h' } },
      { data: { id: 'dc', weight: 1, source: 'd', target: 'c' } },
      { data: { id: 'df', weight: 1, source: 'd', target: 'f' } },
      { data: { id: 'ed', weight: 1, source: 'e', target: 'd' } },
      { data: { id: 'ef', weight: 1, source: 'e', target: 'f' } },
      { data: { id: 'eh', weight: 1, source: 'e', target: 'h' } },
      { data: { id: 'hg', weight: 1, source: 'h', target: 'g' } },
    ]
  },

  layout: {
    name: 'breadthfirst',
    directed: true,
    roots: '#a',
    padding: 10
  }
});

// var bfs = cy.elements().bfs('#a', function() { }, true);
var edges = cy.collection();
var dfs = cy.elements().dfs({
  roots: `#a`,
  visit: function(v, e, u, i, depth) {
    console.info(`visit  ${v.id()}`);
    if (e) edges = edges.add(e);
  },
  directed: false
});
var i = 0;
var highlightNextEle = function() {
  if (i < dfs.path.length) {
    dfs.path[i].addClass('highlighted');

    i++;
    setTimeout(highlightNextEle, 1000);
  }
};

// kick off first highlight
highlightNextEle();