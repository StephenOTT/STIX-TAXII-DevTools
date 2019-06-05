var cyObjects = {}

function updateCy(containerId, cyJson){
  var cy = cyObjects[containerId]
  var data = {
    elements: JSON.parse(cyJson)
  }
  cy.json(data)
}

function setupCytoscape(containerId, dataElements) {
    var cy = cytoscape({

    container: document.getElementById(containerId),

    elements: JSON.parse(dataElements),

    style: [
      {
        selector: 'node',
        style: {
          'font-size': 3,
          'background-color': '#666',
          'label': 'data(id)',
          'background-image': function(ele){ return getNodeBackgroundImage(ele.data('type')) },
          "background-fit": 'contain'
        }
      },

      {
        selector: 'edge',
        style: {
          'font-size': 6,
          'label': 'data(label)',
          'curve-style': 'bezier',
          'target-arrow-shape': 'triangle',
          'text-background-opacity': 1,
          'text-background-color': '#FFFFFF',


        }
      }
    ],

    layout: {
      name: 'cose-bilkent',
      nodeDimensionsIncludeLabels: true
    },
    
    wheelSensitivity: 0.5

  });
  cyObjects[containerId] = cy

  cy.on('tap', 'node', function(e){
    var clickedNode = e.target;
    console.log("CY OUTPUT: " + JSON.stringify(clickedNode.json()))

    DotNet.invokeMethod("StixTaxiiDevTools", "SetSelectedData", JSON.stringify(clickedNode.json()))
  });

}

function getNodeBackgroundImage(type){
  
  if (type == 'attack-pattern') {
    return '../css/stix-icons/attack-pattern-round-flat-300-dpi.png'

  } else if (type == 'observed-data') {
    return '../css/stix-icons/observed-data-round-flat-300-dpi.png'

  } else if (type == 'sighting') {
    return '../css/stix-icons/sighting-round-flat-300-dpi.png'

  } else if (type == 'coo-ipv4-addr') {
    return '../css/stix-icons/ipv4-addr-round-flat-300-dpi.png'

  } else if (type == 'coo-domain-name') {
    return '../css/stix-icons/domain-name-round-flat-300-dpi.png'


  } else {
    return '../css/stix-icons/infrastructure-round-flat-300-dpi.png'
  }


ipv4-addr-round-flat-300-dpi

}