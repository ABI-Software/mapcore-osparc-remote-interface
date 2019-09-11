require("plotly-wrappers");
require("./styles/default.css");
require("./styles/loader-with-caption.css");

const htmlToElement = require('./common').htmlToElement;

const getStudyId = (pathString) => {
  let studyId = undefined;
  let urlObject = new URL(pathString);
  let splitUrlPath = urlObject.pathname.split('/');
  if (splitUrlPath[1] === "study") {
    studyId = splitUrlPath[2]
  }
  return studyId
};

exports.MAPCoreOSparcRemoteInterfaceModule = function(parentIn, options)  {

  let _parent = parentIn;
  let _studyId = undefined;
  let _interface = undefined;

  const createUi = () => {
    let ui = undefined;
    if (_studyId === "194bb264-a717-11e9-9dff-02420aff2767") {
      const OpenCORSimulationUI = require("./opencorsimulation").OpenCORSimulationUI;
      let simulationInterface = new OpenCORSimulationUI();
      ui = _interface = simulationInterface.create();
    } else {
      ui = htmlToElement(require("./snippets/default.html"));
    }
    _parent.appendChild(ui);
  };

  const initialise = (options) => {
    _studyId = getStudyId(options);
    createUi();
  };

  initialise(options);
};
