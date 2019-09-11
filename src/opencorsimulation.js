const dat = require('dat.gui');

require("./styles/opencor-simulation.css");

const htmlToElement = require('./common').htmlToElement;
const study_id = '194bb264-a717-11e9-9dff-02420aff2767';

function OpenCORSimulationUI() {
  let _ui = undefined;

  let simGuiData = {
    'Stimulation level': 50,
    'Stellate stimulation': true,
    'Vagal stimulation': false,
    'Show in oSPARC': () => simShowInOSparc(),
    'Run Simulation': () => simRun()
  };

  const formBaseURI = () => {
    let stimulation_mode = 1;
    if (simGuiData['Stellate stimulation']) {
      stimulation_mode = 1
    } else if (simGuiData['Vagal stimulation']) {
      stimulation_mode = 2
    }
    let stimulation_level = simGuiData['Stimulation level'] / 100.0;

    return 'https://osparc.io/study/' + study_id + '?stimulation_mode=' + stimulation_mode + '&stimulation_level=' + stimulation_level;
  };

  let simShowInOSparc = () => {
    let uri = formBaseURI();
    window.open(uri);
  };

  let simRun = () => {
    let uri = formBaseURI();
    // Append callback parameter
    console.log('Calling oSparc and waiting for response.', uri);
    let loaderElement = htmlToElement(require("./snippets/loader-with-caption.html"));
    _ui.querySelector('.container-plot').appendChild(loaderElement);
  };

  let setChecked = (prop) => {
    for (let param of ['Stellate stimulation', 'Vagal stimulation']) {
      if (param !== prop) {
        simGuiData[param] = false;
      }
    }
    simGuiData[prop] = true;
  };

  this.create = () => {
    _ui = htmlToElement(require("./snippets/opencor-simulation.html"));
    let datGui = new dat.GUI({autoPlace: false, width: 300});
    datGui.add(simGuiData, 'Stimulation level', 0, 100);
    datGui.add(simGuiData, 'Stellate stimulation').listen().onChange(() => {
      setChecked('Stellate stimulation')
    });
    datGui.add(simGuiData, 'Vagal stimulation').listen().onChange(() => {
      setChecked('Vagal stimulation')
    });
    datGui.add(simGuiData, 'Show in oSPARC');
    datGui.add(simGuiData, 'Run Simulation');

    _ui.querySelector('.dat-gui-container').appendChild(datGui.domElement);
    return _ui
  }
}

exports.OpenCORSimulationUI = OpenCORSimulationUI;
