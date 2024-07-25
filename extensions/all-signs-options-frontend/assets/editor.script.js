var fixingUrl = "/apps/aso-proxy/assets/images/fixing-methodes";
var borderUrl = "/apps/aso-proxy/assets/images/borders";

// if (aso_data.page == "configurator" || aso_data.page == "admin") {
//   fixingUrl = aso_configurator_data.fixing_methods_url;
//   borderUrl = aso_configurator_data.borders_url;
// }
var canvas = null;
var canvasBackground = "";
var backCanvas = null;
var activeCanvas = canvas;
var doubleFace = false;
function handleGetCanvas(canvas1, canvas2, statut) {
  // console.log('canvas getted', statut)
  canvas = canvas1;
  backCanvas = canvas2;
  if (statut === "double") {
    doubleFace = true;
  } else {
    doubleFace = false;
  }
  activeCanvas = canvas;
}
var activeSignFace = "front";
function handleCheckActiveSignFace(face) {
  activeSignFace = face;
  // console.log(activeSignFace)
  if (face == "front") {
    activeCanvas = canvas;
  } else {
    activeCanvas = backCanvas;
  }
}

var isTemplate = false
function handleCheckTemplate(statut){
  isTemplate = statut
}

// function handleCloneCanvas(canvas1, canvas2){
//     console.log("handledqsdqsd")
//     setTimeout(function() {
//         var objects = canvas1.getObjects();
//         var serializedObjects = objects.map(obj => obj.toObject(['id', 'name', 'selectable', 'evented']));
//         var jsonData = canvas1.toJSON();

//         var canvas1State = {
//             jsonData: jsonData,
//             objects: serializedObjects
//         };

//         canvas2.discardActiveObject();
//         var currentObjects = canvas2.getObjects();
//         // currentObjects.forEach(obj => {
//         //     if (!canvas1State.objects.some(prevObj => prevObj.id === obj.id)) {
//         //       // console.log(obj.id, 'undo - borderA');
//         //       canvas2.remove(obj);
//         //     }
//         // });

//         var verifiedId = [0, 1, 2, 3, 4, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37]

//         canvas1State.objects.forEach(prevObj => {
//             const currentObj = currentObjects.find(obj => obj.id === prevObj.id);

//             fabric.util.enlivenObjects([prevObj], objects => {
//                 const newObj = objects[0];
//                 if (verifiedId.includes(newObj.id)){
//                     canvas2.insertAt(newObj, currentObjects.indexOf(currentObj));
//                     canvas2.remove(currentObj);
//                 }
//             });
//         });

//         canvas2.renderAll();

//     },100)
//     // console.log(backCanvas)
// }
function handleCloneCanvas() {
  var jsonData = canvas.toJSON([
    "fill",
    "name",
    "id",
    "selectable",
    "canvasName",
    "priceId",
    "uniScaleTransform",
    "centeredScaling",
    "lockScalingFlip",
    "lockMoving",
    "lockScale",
    "lockRotate",
    "lockEdition",
    "fixingRatio",
    "ratioScale",
    "objectType",
    "imageUrl"
  ]);
  var canvasAsJson = JSON.stringify(jsonData);

  // function recreateState(canva, stateJson){
  // }
  const currentState = JSON.parse(canvasAsJson);
  backCanvas.clear();
  currentState.objects.forEach(function (obj) {
    fabric.util.enlivenObjects([obj], function (prevObject) {
      backCanvas.add(...prevObject);
      backCanvas.renderAll();
    });
  });
}

var currentUnit = "";
var defaultFontSize = 0;
function handleGetCurrentUnit(
  unit,
  fontSize,
  minFontSize,
  maxFontSize,
  textFontFam
) {
  currentUnit = unit;
  defaultFontSize = fontSize;

  minTextSize = minFontSize;
  maxTextSize = maxFontSize;

  currenTextFontFam = textFontFam;
}

var visualizerText = {};
function handleGetDefaultText(object) {
  visualizerText = object;
}

var defaultShadow = new fabric.Shadow({
  color: "black",
  offsetX: 3,
  offsetY: 3,
  blur: 30,
  isActive: true,
});

function handleCheckObjects() {
  var objects = canvas.getObjects();

  return objects;
}

//Fonction de sauvegarde de l'état du canvas et des actions undo et redo
let myjson;
var state = [];
var mods = 0;

let currentStateIndex = 0;
//fonction de sauvegarde de l'état
// function updateModifications(savehistory, position) {
//     // console.log(position)
//     if (savehistory === true) {
//         if(state.length <= 6){
//             let objects = handleCheckObjects()
//             // console.log(objects, "object saved")

//             // Sérialiser chaque objet en détail
//             let serializedObjects = objects.map(obj => obj.toObject(['id', 'name', 'selectable', 'evented']));

//             // Récupérer l'état JSON du canvas
//             let jsonData = canvas.toJSON();

//             // Combiner le JSON avec les objets sérialisés
//             let canvasState = {
//                 jsonData: jsonData,
//                 objects: serializedObjects,
//                 options: {
//                     size: 0,
//                     sizeName: currentSizeName,
//                     shape: selectedShape,
//                     border: activeBorder,
//                     signColor: currentSignColor,
//                     fixing: activeFixingMethode
//                 },
//             };

//             state.push(canvasState);
//             currentStateIndex = state.length - 1;
//         }
//     }
//     // console.log(state, "state")
// }

// function handleUndo() {
//   if (mods < state.length && currentStateIndex > 0) {
//     const canvasState = state[state.length - 1 - mods - 1];
//     const currentObjects = canvas.getObjects();
//     const activeOptions = canvasState.options

//     canvas.discardActiveObject();
//     // Supprimer les objets qui n'existent pas dans l'état précédent
//     currentObjects.forEach(obj => {
//       if (!canvasState.objects.some(prevObj => prevObj.id === obj.id)) {
//         // console.log(obj.id, 'undo - borderA');
//         canvas.remove(obj);
//       }
//     });

//     // Remplacer les objets existants par leur version précédente
//     if (canvasState.objects.length > 0) {
//       canvasState.objects.forEach(prevObj => {
//         const currentObj = currentObjects.find(obj => obj.id === prevObj.id);
//         if (currentObj) {
//         //   console.log(currentObj.id, 'undo - borderZ');

//           fabric.util.enlivenObjects([prevObj], objects => {
//             const newObj = objects[0];
//             if(newObj.type === 'i-text' && (newObj.id != 2 || newObj.id != 4)){
//                 newObj.on('editing:entered', () => {
//                     handleGetAddedTextValues(newObj);
//                 });
//                 newObj.on('editing:exited', () => {
//                     handleGetAddedTextValues(newObj);
//                 });
//                 newObj.on('selected', () => {
//                     handleGetAddedTextValues(newObj);
//                     console.log("newTextdqdqdqsdqd");

//                 });
//                 newObj.on('mousedown', function() {
//                     handleGetAddedTextValues(newObj);
//                     updateModifications(true, 'deposer le text')
//                 });
//                 newObj.on('mouseup', function() {
//                     handleGetAddedTextValues(newObj);
//                     updateModifications(true, 'deposer le text')
//                 });
//             }
//             if(newObj.type === 'image' && newObj.id != 6 ){
//                 newObj.on('mousedown', function() {
//                     handleGetAddedImageValues(newObj);
//                     updateModifications(true, "deposer l'image ")
//                 });
//                 newObj.on('mouseup', function() {
//                     handleGetAddedImageValues(newObj);
//                     updateModifications(true, "deposer l'image ")
//                 });
//                 newObj.on('selected', function() {
//                     handleGetAddedImageValues(newObj);
//                     updateModifications(true, "deposer l'image ")
//                 });
//             }
//             canvas.insertAt(newObj, currentObjects.indexOf(currentObj));
//             canvas.remove(currentObj);
//           });

//           currentSizeName = activeOptions.sizeName;
//           selectedShape = activeOptions.shape
//           activeBorder = activeOptions.border
//           currentSignColor = activeOptions.signColor
//           activeFixingMethode = activeOptions.fixing

//         }
//       });
//     }

//     canvas.renderAll();
//     mods += 1;

//     currentStateIndex -= 1;

//     console.log('cuurent state', currentStateIndex)
//     return {
//         sizeName: currentSizeName,
//         shape: selectedShape,
//         signBorder: activeBorder,
//         signColor: currentSignColor,
//         fixing: activeFixingMethode,
//     }
//   }
// }
// function handleRedo() {
//     if (mods > 0) {
//         const canvasState = state[state.length - mods];
//         const currentObjects = canvas.getObjects();
//         const activeOptions = canvasState.options

//         canvas.discardActiveObject();
//         // Supprimer les objets qui n'existent pas dans l'état suivant
//         currentObjects.forEach(obj => {
//             if (!canvasState.objects.some(nextObj => nextObj.id == obj.id)) {
//                 // console.log(obj.id, 'redo - borderA');
//                 canvas.remove(obj);
//             }
//         });

//       // Ajouter les objets qui n'existent pas dans l'état actuel
//         // canvasState.objects.forEach(nextObj => {
//         //     if (!currentObjects.some(obj => obj.id == nextObj.id)) {
//         //     console.log(nextObj.id, 'redo - borderB');

//         //     fabric.util.enlivenObjects([nextObj], objects => {
//         //         const newObj = objects[0];
//         //         canvas.add(newObj);
//         //     });
//         //     }
//         // });

//         canvasState.objects.forEach(nextObj => {
//             const currentObj = currentObjects.find(obj => obj.id === nextObj.id);
//             if (currentObj) {
//             //   console.log(currentObj.id, 'redo - borderZ');

//               fabric.util.enlivenObjects([nextObj], objects => {
//                 const newObj = objects[0];
//                 if(newObj.type === 'i-text' && (newObj.id != 2 || newObj.id != 4)){
//                     newObj.on('editing:entered', () => {
//                         handleGetAddedTextValues(newObj);
//                     });
//                     newObj.on('editing:exited', () => {
//                         handleGetAddedTextValues(newObj);
//                     });
//                     newObj.on('selected', () => {
//                         handleGetAddedTextValues(newObj);
//                         console.log("newTextdqdqdqsdqd");

//                     });
//                     newObj.on('mousedown', function() {
//                         handleGetAddedTextValues(newObj);
//                         updateModifications(true, 'deposer le text')
//                     });
//                     newObj.on('mouseup', function() {
//                         handleGetAddedTextValues(newObj);
//                         updateModifications(true, 'deposer le text')
//                     });
//                 }
//                 if(newObj.type === 'image' && newObj.id != 6 ){
//                     newObj.on('mousedown', function() {
//                         handleGetAddedImageValues(newObj);
//                         updateModifications(true, "deposer l'image ")
//                     });
//                     newObj.on('mouseup', function() {
//                         handleGetAddedImageValues(newObj);
//                         updateModifications(true, "deposer l'image ")
//                     });
//                     newObj.on('selected', function() {
//                         handleGetAddedImageValues(newObj);
//                         updateModifications(true, "deposer l'image ")
//                     });
//                 }
//                 // canvas.insertAt(newObj, currentObjects.indexOf(currentObj));
//                 canvas.remove(currentObj);
//                 canvas.add(newObj);

//               });
//             }
//             if (!currentObjects.some(obj => obj.id == nextObj.id)) {
//                 console.log(nextObj.id, 'redo - borderB');

//                 fabric.util.enlivenObjects([nextObj], objects => {
//                     const newObj = objects[0];
//                     if(newObj.type === 'i-text' && (newObj.id != 2 || newObj.id != 4)){
//                         newObj.on('editing:entered', () => {
//                             handleGetAddedTextValues(newObj);
//                         });
//                         newObj.on('editing:exited', () => {
//                             handleGetAddedTextValues(newObj);
//                         });
//                         newObj.on('selected', () => {
//                             handleGetAddedTextValues(newObj);

//                         });
//                         newObj.on('mousedown', function() {
//                             handleGetAddedTextValues(newObj);
//                             updateModifications(true, 'deposer le text')
//                         });
//                         newObj.on('mouseup', function() {
//                             handleGetAddedTextValues(newObj);
//                             updateModifications(true, 'deposer le text')
//                         });
//                     }
//                     if(newObj.type === 'image' && newObj.id != 6 ){
//                         newObj.on('mousedown', function() {
//                             handleGetAddedImageValues(newObj);
//                             updateModifications(true, "deposer l'image ")
//                         });
//                         newObj.on('mouseup', function() {
//                             handleGetAddedImageValues(newObj);
//                             updateModifications(true, "deposer l'image ")
//                         });
//                         newObj.on('selected', function() {
//                             handleGetAddedImageValues(newObj);
//                             updateModifications(true, "deposer l'image ")
//                         });
//                     }
//                     canvas.add(newObj);
//                 });
//             }
//             currentSizeName = activeOptions.sizeName;
//             selectedShape = activeOptions.shape
//             activeBorder = activeOptions.border
//             currentSignColor = activeOptions.signColor
//             activeFixingMethode = activeOptions.fixing
//           });

//       canvas.renderAll();
//       mods -= 1;
//       currentStateIndex += 1;

//     console.log('cuurent state', currentStateIndex)
//     }
//     return {
//         sizeName: currentSizeName,
//         shape: selectedShape,
//         signBorder: activeBorder,
//         signColor: currentSignColor,
//         fixing: activeFixingMethode,
//     }
// }
// function handleClearAll() {

//     const canvasState = state[0];
//     const currentObjects = canvas.getObjects();

//     canvas.discardActiveObject();
//     // Supprimer les objets qui n'existent pas dans l'état précédent
//     currentObjects.forEach(obj => {
//         if (!canvasState.objects.some(prevObj => prevObj.id === obj.id)) {
//         // console.log(obj.id, 'undo - borderA');
//         canvas.remove(obj);
//         }
//     });

//     // Remplacer les objets existants par leur version précédente
//     if (canvasState.objects.length > 0) {
//         canvasState.objects.forEach(prevObj => {
//         const currentObj = currentObjects.find(obj => obj.id === prevObj.id);
//         if (currentObj) {
//         //   console.log(currentObj.id, 'undo - borderZ');

//             fabric.util.enlivenObjects([prevObj], objects => {
//             const newObj = objects[0];
//             canvas.insertAt(newObj, currentObjects.indexOf(currentObj));
//             canvas.remove(currentObj);
//             });
//         }
//         });
//     }

//     canvas.renderAll();
//     mods = 0;

//     currentStateIndex = 0;
//     state = [state[0]]
// }

var currentConfig = {
  canvasState: [],
  canvasObjects: [],
  currentStateIndex: -1,
  undoStatus: false,
  redoStatus: false,
  undoFinishedStatus: 1,
  redoFinishedStatus: 1,
};
function updateModifications(good, position) {
  // console.log(position)
  if (currentConfig.undoStatus == false && currentConfig.redoStatus == false) {
    var objects = {
      texts: [...addedTexts],
      images: [...addedImages],
      maxChars: maxTextCharForSize,
      fixScale: fixScale,
      sizeRatio: sizeRatio,
      border: {
        face1: {
          type: activeBorder,
          color: activeBorderColor,
        },
        face2: {
          type: activeBorder2,
          color: activeBorderColor2,
        },
      },
    };
    var frontJsonData = canvas.toJSON([
      "fill",
      "name",
      "id",
      "selectable",
      "canvasName",
      "priceId",
      "price",
      "uniScaleTransform",
      "centeredScaling",
      "lockScalingFlip",
      "lockMoving",
      "lockScale",
      "lockRotate",
      "lockEdition",
      "fixingRatio",
      "ratioScale",
      "objectType",
      "imageUrl",
    ]);
    var backJsonData = backCanvas.toJSON([
      "fill",
      "name",
      "id",
      "selectable",
      "canvasName",
      "priceId",
      "price",
      "uniScaleTransform",
      "centeredScaling",
      "lockScalingFlip",
      "lockMoving",
      "lockScale",
      "lockRotate",
      "lockEdition",
      "fixingRatio",
      "ratioScale",
      "objectType",
      "imageUrl"
    ]);

    // var jsonData = handleGetObjectByName('safeObject', canvas).toObject(['name', 'id', 'selectable']);z
    // console.log(frontJsonData.objects, "qsdqsd");
    // console.log(backJsonData.objects, "qsdqsd");

    var canvasAsJson = JSON.stringify(frontJsonData);
    var backCanvasAsJson = JSON.stringify(backJsonData);

    if (
      currentConfig.currentStateIndex <
      currentConfig.canvasState.length - 1
    ) {
      var indexToBeInserted = currentConfig.currentStateIndex + 1;
      currentConfig.canvasState[indexToBeInserted] = {
        front: canvasAsJson,
        back: backCanvasAsJson,
      };
      currentConfig.canvasObjects[indexToBeInserted] = objects;
      var numberOfElementsToRetain = indexToBeInserted + 1;
      currentConfig.canvasState = currentConfig.canvasState.splice(
        0,
        numberOfElementsToRetain
      );
    } else {
      currentConfig.canvasState.push({
        front: canvasAsJson,
        back: backCanvasAsJson,
      });
      currentConfig.canvasObjects.push(objects);
    }
    currentConfig.currentStateIndex = currentConfig.canvasState.length - 1;
    if (
      currentConfig.currentStateIndex == currentConfig.canvasState.length - 1 &&
      currentConfig.currentStateIndex != -1
    ) {
      // currentConfig.redoButton.disabled= "disabled";
    }
  }
  console.log(currentConfig.canvasState.length, "canvasState JS");
  console.log(currentConfig.canvasObjects, "canvasObjects JS");
}

function handleUndo() {
  readyToSave = false;

  if (currentConfig.undoFinishedStatus) {
    if (currentConfig.currentStateIndex == -1) {
      currentConfig.undoStatus = false;
    } else {
      if (currentConfig.canvasState.length >= 1) {
        currentConfig.undoFinishedStatus = 0;
        if (currentConfig.currentStateIndex != 0) {
          // currentConfig.undoStatus = true;
          // canvas.loadFromJSON(currentConfig.canvasState[currentConfig.currentStateIndex-1],function(){
          //     var jsonData = JSON.parse(currentConfig.canvasState[currentConfig.currentStateIndex-1]);
          //     canvas.renderAll();
          //     currentConfig.undoStatus = false;
          //     currentConfig.currentStateIndex -= 1;
          //     // currentConfig.undoButton.removeAttribute("disabled");
          //     if(currentConfig.currentStateIndex !== currentConfig.canvasState.length-1){
          //         // currentConfig.redoButton.removeAttribute('disabled');
          //     }
          //     currentConfig.undoFinishedStatus = 1;
          // });
          function recreateState(canva, stateJson) {
            const currentState = JSON.parse(stateJson);
            canva.clear();
            currentState.objects.forEach(function (obj) {
              fabric.util.enlivenObjects([obj], function (prevObject) {
                if (prevObject[0].name === "safeObject"){
                  if(typeof  prevObject[0].fill !== 'string'){
                    prevObject[0].fill = 'transparent'
                  }
                }
                if (prevObject[0].name === "aso-SignText") {
                  prevObject[0].on("editing:entered", () => {
                    handleGetAddedTextValues(prevObject[0]);
                  });
                  prevObject[0].on("editing:exited", () => {
                    handleGetAddedTextValues(prevObject[0]);
                    resizeText(prevObject[0]);
                  });
                  prevObject[0].on("selected", () => {
                    handleGetAddedTextValues(prevObject[0]);
                  });
                  prevObject[0].on("mousedown", function () {
                    handleGetAddedTextValues(prevObject[0]);
                    reScaleText(prevObject[0]);
                  });
                  prevObject[0].on("mouseup", function () {
                    handleGetAddedTextValues(prevObject[0]);
                    reScaleText(prevObject[0]);
                  });
                }
                if (prevObject[0].name === "aso-SignImage") {
                  prevObject[0].on("mousedown", function () {
                    handleGetAddedImageValues(prevObject[0]);
                  });
                  prevObject[0].on("mouseup", function () {
                    handleGetAddedImageValues(prevObject[0]);
                  });
                }
                canva.add(...prevObject);
                canva.renderAll();
              });
            });
          }

          recreateState(
            canvas,
            currentConfig.canvasState[currentConfig.currentStateIndex - 1].front
          );
          recreateState(
            backCanvas,
            currentConfig.canvasState[currentConfig.currentStateIndex - 1].back
          );

          if (activeSignFace === "front") {
            handleSelectBorder(
              currentConfig.canvasObjects[currentConfig.currentStateIndex - 1]
                .border.face1.type
            );
            handlechangeBorderColor(
              currentConfig.canvasObjects[currentConfig.currentStateIndex - 1]
                .border.face1.color
            );
          } else {
            handleSelectBorder(
              currentConfig.canvasObjects[currentConfig.currentStateIndex - 1]
                .border.face2.type
            );
            handlechangeBorderColor(
              currentConfig.canvasObjects[currentConfig.currentStateIndex - 1]
                .border.face2.color
            );
          }

          addedTexts = [];
          canvas.getObjects().forEach(function (obj) {
            if (obj.name === "aso-SignText") {
              console.log(obj);
              addedTexts.push(obj);
            }
          });
          backCanvas.getObjects().forEach(function (obj) {
            if (obj.name === "aso-SignText") {
              console.log(obj);
              addedTexts.push(obj);
            }
          });

          // addedTexts = [...currentConfig.canvasObjects[currentConfig.currentStateIndex-1].texts]
          maxTextCharForSize =
            currentConfig.canvasObjects[currentConfig.currentStateIndex - 1]
              .maxChars;
          addedImages =
            currentConfig.canvasObjects[currentConfig.currentStateIndex - 1]
              .images;

          fixScale =
            currentConfig.canvasObjects[currentConfig.currentStateIndex - 1]
              .fixScale;
          sizeRatio =
            currentConfig.canvasObjects[currentConfig.currentStateIndex - 1]
              .sizeRatio;

          currentConfig.undoStatus = false;
          currentConfig.currentStateIndex -= 1;
          // currentConfig.undoButton.removeAttribute("disabled");
          if (
            currentConfig.currentStateIndex !==
            currentConfig.canvasState.length - 1
          ) {
            // currentConfig.redoButton.removeAttribute('disabled');
          }
          currentConfig.undoFinishedStatus = 1;
        } else if (currentConfig.currentStateIndex == 0) {
          canvas.clear();
          backCanvas.clear();

          // if(activeSignFace === 'front'){
          //     handleSelectBorder(currentConfig.canvasObjects[0].border.face1.type)
          //     handlechangeBorderColor(currentConfig.canvasObjects[0].border.face1.color)
          // }else{
          //     handleSelectBorder(currentConfig.canvasObjects[0].border.face2.type)
          //     handlechangeBorderColor(currentConfig.canvasObjects[0].border.face2.color)
          // }

          addedTexts = [...currentConfig.canvasObjects[0].texts];
          maxTextCharForSize = currentConfig.canvasObjects[0].maxChar;
          addedImages = currentConfig.canvasObjects[0].images;

          fixScale = currentConfig.canvasObjects[0].fixScale;
          sizeRatio = currentConfig.canvasObjects[0].sizeRatio;

          currentConfig.undoFinishedStatus = 1;
          // currentConfig.undoButton.disabled= "disabled";
          // currentConfig.redoButton.removeAttribute('disabled');
          currentConfig.currentStateIndex -= 1;
        }
      }
    }
  }
  FtextObjects = handleGetTextObjects1("aso-SignText");
  BtextObjects = handleGetTextObjects2("aso-SignText");
  frontTextCharLength = sumOptionsPrice(FtextObjects, "text").length;
  backTextCharLength = sumOptionsPrice(BtextObjects, "text").length;

  console.log(currentConfig.canvasObjects, "UNdo");
  centerSign(canvas);
  centerSign(backCanvas);

  readyToSave = true;
  return {
    texts: addedTexts,
    images: addedImages,
  };
}

function handleRedo() {
  readyToSave = false;

  if (currentConfig.redoFinishedStatus) {
    if (
      currentConfig.currentStateIndex == currentConfig.canvasState.length - 1 &&
      currentConfig.currentStateIndex != -1
    ) {
      // currentConfig.redoButton.disabled= "disabled";
    } else {
      if (
        currentConfig.canvasState.length > currentConfig.currentStateIndex &&
        currentConfig.canvasState.length != 0
      ) {
        currentConfig.redoFinishedStatus = 0;
        currentConfig.redoStatus = true;
        // canvas.loadFromJSON(currentConfig.canvasState[currentConfig.currentStateIndex+1].front,function(){
        //     var jsonData = JSON.parse(currentConfig.canvasState[currentConfig.currentStateIndex+1].front);
        //     console.log(jsonData);
        //     canvas.renderAll();
        //     }
        // );

        function recreateState(canva, stateJson) {
          const currentState = JSON.parse(stateJson);
          canva.clear();
          currentState.objects.forEach(function (obj) {
            fabric.util.enlivenObjects([obj], function (prevObject) {
              if (prevObject[0].name === "safeObject"){
                if(typeof  prevObject[0].fill !== 'string'){
                  prevObject[0].fill = 'transparent'
                }
              }
              if (prevObject[0].name === "aso-SignText") {
                prevObject[0].on("editing:entered", () => {
                  handleGetAddedTextValues(prevObject[0]);
                });
                prevObject[0].on("editing:exited", () => {
                  handleGetAddedTextValues(prevObject[0]);
                  resizeText(prevObject[0]);
                });
                prevObject[0].on("selected", () => {
                  handleGetAddedTextValues(prevObject[0]);
                });
                prevObject[0].on("mousedown", function () {
                  handleGetAddedTextValues(prevObject[0]);
                  reScaleText(prevObject[0]);
                });
                prevObject[0].on("mouseup", function () {
                  handleGetAddedTextValues(prevObject[0]);
                  reScaleText(prevObject[0]);
                });

                console.log(prevObject[0]);
              }
              if (prevObject[0].name === "aso-SignImage") {
                prevObject[0].on("mousedown", function () {
                  handleGetAddedImageValues(prevObject[0]);
                });
                prevObject[0].on("mouseup", function () {
                  handleGetAddedImageValues(prevObject[0]);
                });
              }
              canva.add(...prevObject);
              canva.renderAll();
            });
          });
        }

        recreateState(
          canvas,
          currentConfig.canvasState[currentConfig.currentStateIndex + 1].front
        );
        recreateState(
          backCanvas,
          currentConfig.canvasState[currentConfig.currentStateIndex + 1].back
        );

        if (activeSignFace === "front") {
          handleSelectBorder(
            currentConfig.canvasObjects[currentConfig.currentStateIndex + 1]
              .border.face1.type
          );
          handlechangeBorderColor(
            currentConfig.canvasObjects[currentConfig.currentStateIndex + 1]
              .border.face1.color
          );
        } else {
          handleSelectBorder(
            currentConfig.canvasObjects[currentConfig.currentStateIndex + 1]
              .border.face2.type
          );
          handlechangeBorderColor(
            currentConfig.canvasObjects[currentConfig.currentStateIndex + 1]
              .border.face2.color
          );
        }

        addedTexts = [];
        canvas.getObjects().forEach(function (obj) {
          if (obj.name === "aso-SignText") {
            console.log(obj);
            addedTexts.push(obj);
          }
        });
        backCanvas.getObjects().forEach(function (obj) {
          if (obj.name === "aso-SignText") {
            console.log(obj);
            addedTexts.push(obj);
          }
        });

        // addedTexts = currentConfig.canvasObjects[currentConfig.currentStateIndex+1].texts
        maxTextCharForSize =
          currentConfig.canvasObjects[currentConfig.currentStateIndex + 1]
            .maxChars;
        addedImages =
          currentConfig.canvasObjects[currentConfig.currentStateIndex + 1]
            .images;

        fixScale =
          currentConfig.canvasObjects[currentConfig.currentStateIndex + 1]
            .fixScale;
        sizeRatio =
          currentConfig.canvasObjects[currentConfig.currentStateIndex + 1]
            .sizeRatio;

        currentConfig.redoStatus = false;
        currentConfig.currentStateIndex += 1;
        if (currentConfig.currentStateIndex != -1) {
          // currentConfig.undoButton.removeAttribute('disabled');
        }
        currentConfig.redoFinishedStatus = 1;
        if (
          currentConfig.currentStateIndex ==
            currentConfig.canvasState.length - 1 &&
          currentConfig.currentStateIndex != -1
        ) {
          //   currentConfig.redoButton.disabled= "disabled";
        }
      }
    }
  }
  FtextObjects = handleGetTextObjects1("aso-SignText");
  BtextObjects = handleGetTextObjects2("aso-SignText");
  frontTextCharLength = sumOptionsPrice(FtextObjects, "text").length;
  backTextCharLength = sumOptionsPrice(BtextObjects, "text").length;

  console.log(currentConfig.canvasObjects, "Redo");
  centerSign(canvas)
  centerSign(backCanvas)

  readyToSave = true;

  return {
    texts: addedTexts,
    images: addedImages,
  };
}

function handleClearAll() {
  currentConfig.undoStatus = true;

  function recreateState(canva, stateJson) {
    const currentState = JSON.parse(stateJson);
    canva.clear();
    currentState.objects.forEach(function (obj) {
      fabric.util.enlivenObjects([obj], function (prevObject) {
        // if(prevObject[0].name === 'aso-SignText'){
        //     prevObject[0].on('editing:entered', () => {
        //         handleGetAddedTextValues(prevObject[0]);
        //     });
        //     prevObject[0].on('editing:exited', () => {
        //         handleGetAddedTextValues(prevObject[0]);
        //         resizeText(prevObject[0]);
        //     });
        //     prevObject[0].on('selected', () => {
        //         handleGetAddedTextValues(prevObject[0]);
        //     });
        //     prevObject[0].on('mousedown', function() {
        //         handleGetAddedTextValues(prevObject[0]);
        //     });
        //     prevObject[0].on('mouseup', function() {
        //         handleGetAddedTextValues(prevObject[0]);
        //     });
        // }
        // if(prevObject[0].name === 'aso-SignImage'){
        //     prevObject[0].on('mousedown', function() {
        //         handleGetAddedImageValues(prevObject[0]);
        //     });
        //     prevObject[0].on('mouseup', function() {
        //         handleGetAddedImageValues(prevObject[0]);
        //     });
        // }
        canva.add(...prevObject);
        canva.renderAll();
      });
    });
  }
  recreateState(canvas, currentConfig.canvasState[0].front);
  recreateState(backCanvas, currentConfig.canvasState[0].back);

  currentConfig.undoStatus = false;
  // currentConfig.undoButton.removeAttribute("disabled");
  if (
    currentConfig.currentStateIndex !==
    currentConfig.canvasState.length - 1
  ) {
    // currentConfig.redoButton.removeAttribute('disabled');
  }
  currentConfig.undoFinishedStatus = 1;

  currentConfig.canvasState = [];
  currentConfig.canvasObjects = [];
  currentConfig.currentStateIndex -= 1;
  currentConfig.undoFinishedStatus = 1;

  addedImages = [];
  addedTexts = [];
}

var readyToSave = false;
var firstSave = false;
function handleReadyToSaveState(statut, start) {
  if (statut === true) {
    if (start) {
      updateModifications(true, "readyToSave");
      // firstSave = true;
    }
    readyToSave = true;
  } else {
    readyToSave = false;
  }
}

function centerSign(canva){
  var sign = handleGetObjectByName('safeObject', canva)
  var canvasCenter = getCanvasCenter()
  const allObjects = canva.getObjects();

  if (allObjects.length > 0) {
      const group = new fabric.Group(allObjects);
      canva.discardActiveObject();

      // Centrer le groupe
      group.set('left', canvasCenter.x - sign.width/2)
      group.set('top', canvasCenter.y - sign.height/2)

      group.setCoords();

      // currentSizeValues.value.left = canvasCenter.x - sign.width/2
      // currentSizeValues.value.top = canvasCenter.y - sign.height/2
      handleGetNewPosition(canvasCenter.x - sign.width/2, canvasCenter.y - sign.height/2)


      // Dégrouper les objets
      group._restoreObjectsState();
      canva.remove(group);
      canva.getObjects().forEach((obj) => {
          if(obj.name === 'aso-signText'){
              if(obj.isEditing){
                  obj.exitEditing();
              }
              obj.clipPath = handleClipAddedObject(canva);

          }
          if (obj.name === 'aso-SignImage') {
              obj.clipPath = handleClipAddedObject(canva);
          }
          obj.setCoords()
      })
  }
  canva.renderAll()
}

function convertToPx(dimension, unit) {
  var dimensions = dimension;
  var unit = unit;
  if (typeof unit != "undefined" && typeof dimensions != "undefined") {
    switch (unit) {
      case "cm":
        dimensions = dimensions * 120;
        break;
      case "mm":
        dimensions = dimensions * 12;
        break;
      case "in":
        dimensions = dimensions * 300;
        break;
      case "pt":
        dimensions = dimensions / 0.75;
        break;
      case "Px":
        dimensions = dimensions;
      default:
        break;
    }
    return dimensions;
  }
}
function convertFromPx(dimension, unit) {
  var dimensions = dimension;
  var unit = unit;
  if (typeof unit != "undefined" && typeof dimensions != "undefined") {
    switch (unit) {
      case "cm":
        dimensions = dimensions / 120;
        break;
      case "mm":
        dimensions = dimensions / 12;
        break;
      case "in":
        dimensions = dimensions / 300;
        break;
      case "pt":
        dimensions = dimensions * 0.75;
        break;
      case "Px":
        dimensions = dimensions;
      default:
        break;
    }
    return dimensions;
  }
}

var fixScale = 0;
var signRatio = 0;
var ratioScale = 0;
var sizeRatio = "";

function handleMiseAEchelle(rW, rH) {
  const maxWidth = 1000;
  const maxHeight = 370;

  var finalWidth = 0;
  var finalHeight = 0;

  var signWPx = convertToPx(rW, currentUnit);
  var signHPx = convertToPx(rH, currentUnit);

  if ((signWPx || signHPx) > 10000) {
    fixScale = 0.25;
    canvas.fixingRatio = sizeRatio
    backCanvas.fixingRatio = sizeRatio
  } else {
    fixScale = 0.35;
    canvas.fixingRatio = sizeRatio
    backCanvas.fixingRatio = sizeRatio
  }
  if(signHPx >= (signWPx/2)){
    sizeRatio = "big";
  }else{
    sizeRatio = "small";
  }

  if (signWPx > signHPx) {
    finalWidth = maxWidth;
    var ratio = maxWidth / signWPx;
    signRatio = ratio;
    finalHeight = signHPx * ratio;
    ratioScale = 1;
  } else if (signHPx > signWPx) {
    finalHeight = maxHeight;
    var ratio = maxHeight / signHPx;
    signRatio = ratio;
    finalWidth = signWPx * ratio;
    ratioScale = 1;
  } else if ((signHPx = signWPx)) {
    finalWidth = maxHeight;
    finalHeight = maxHeight;
    ratioScale = 1;
  }

  var lastWidth = 0;
  var lastHeight = 0;

  if (finalWidth > maxWidth) {
    lastWidth = maxWidth;
    var newRatio = maxWidth / finalWidth;
    signRatio = newRatio;
    lastHeight = finalHeight * newRatio;
    ratioScale = 2;
  } else if (finalHeight > maxHeight) {
    lastHeight = maxHeight;
    var newRatio = maxHeight / finalHeight;
    signRatio = newRatio;
    lastWidth = finalWidth * newRatio;
    ratioScale = 2;
  }

  canvas.ratioScale = ratioScale
  backCanvas.ratioScale = ratioScale

  if (finalWidth > maxWidth || finalHeight > maxHeight) {
    return {
      preWidth: parseFloat(signWPx),
      preHeight: parseFloat(signHPx),
      firstWidth: finalWidth,
      firstHeight: finalHeight,
      width: lastWidth,
      height: lastHeight,
      fixScale,
      sizeRatio,
      ratioScale,
      signRatio,
    };
  } else {
    return {
      preWidth: parseFloat(signWPx),
      preHeight: parseFloat(signHPx),
      width: finalWidth,
      height: finalHeight,
      fixScale,
      sizeRatio,
      ratioScale,
      signRatio,
    };
  }
}

function handleGetObjectByName(name, canva) {
  var objects;
  if (canva) {
    objects = canva.getObjects();
  } else {
    objects = activeCanvas.getObjects();
  }
  for (var i = 0; i < objects.length; i++) {
    if (objects[i].name === name) {
      return objects[i];
    }
  }
  return null;
}

var FtextObjects = [{ text: "" }];
var BtextObjects = [{ text: "" }];
function handleGetTextObjects1(name) {
  var array = [];
  FtextObjects = [];
  var objects;
  objects = canvas.getObjects();
  for (var i = 0; i < objects.length; i++) {
    if (objects[i].name === name) {
      function addUniqueObject(arr, obj, key) {
        const exists = arr.some((item) => item[key] === obj[key]);
        if (!exists) {
          obj.set("canvas", canvas);
          arr.push(obj);
        }
      }
      addUniqueObject(FtextObjects, objects[i], "id");
    }
  }
  return FtextObjects;
}
function handleGetTextObjects2(name) {
  var array = [];
  BtextObjects = [];
  var objects;
  // if(canva){
  // }
  objects = backCanvas.getObjects();
  for (var i = 0; i < objects.length; i++) {
    if (objects[i].name === name) {
      function addUniqueObject(arr, obj, key) {
        const exists = arr.some((item) => item[key] === obj[key]);
        if (!exists) {
          arr.push(obj);
        }
      }
      addUniqueObject(BtextObjects, objects[i], "id");
    }
  }
  return BtextObjects;
}

var currentWidth = 0;
var currentHeight = 0;
var currentTop = 0;
var currentLeft = 0;
var currentSizeName = "";
var currentSize = {};

var preWidth = 0;
var preHeight = 0;
var firstWidth = 0;
var firstHeight = 0;

var maxTextCharForSize = 0;

var firstLoad = false;
// function checkCharsLenght(){
//     FtextObjects = handleGetTextObjects1('aso-SignText')
//     BtextObjects = handleGetTextObjects2('aso-SignText')

//     frontTextCharLength = sumOptionsPrice(FtextObjects, 'text').length
//     backTextCharLength = sumOptionsPrice(BtextObjects, 'text').length

//     console.log(frontTextCharLength, backTextCharLength, "aso-SignText")

// }
function getCanvasCenter() {
  const canvasWidth = canvas.getWidth();
  const canvasHeight = canvas.getHeight();
  const viewportTransform = canvas.viewportTransform;

  // Coordonnées du centre du canvas avant la transformation de viewport
  const untransformedCenter = {
    x: canvasWidth / 2,
    y: canvasHeight / 2,
  };

  // Appliquer la transformation de viewport inverse aux coordonnées du centre
  const invertedTransform = fabric.util.invertTransform(viewportTransform);
  const transformedCenter = fabric.util.transformPoint(
    untransformedCenter,
    invertedTransform
  );

  return transformedCenter;
}
var signLeft = 0;
var signTop = 0;
function handleGetNewPosition(left, top) {
  // console.log(left + " cwxcwxcwxc " + top )
  signLeft = left;
  signTop = top;
}
function handleChangeSize(width, height, name, maxChar) {
  // console.log(maxChar, "aso-SignText")

  maxTextCharForSize = maxChar;

  currentSizeName = name;
  currentSize = { width: width, height: height };

  // console.log('mise à echelle',handleMiseAEchelle(width, height))
  if (handleMiseAEchelle(width, height).preWidth) {
    preWidth = handleMiseAEchelle(width, height).preWidth;
    preHeight = handleMiseAEchelle(width, height).preHeight;
  }
  if (handleMiseAEchelle(width, height).firstHeight) {
    firstWidth = handleMiseAEchelle(width, height).firstWidth;
    firstHeight = handleMiseAEchelle(width, height).firstHeight;
  }

  sizeRatio = handleMiseAEchelle(width, height).sizeRatio;
  fixScale = handleMiseAEchelle(width, height).fixScale;
  signRatio = handleMiseAEchelle(width, height).signRatio;
  ratioScale = handleMiseAEchelle(width, height).ratioScale;

  currentWidth = handleMiseAEchelle(width, height).width;
  currentHeight = handleMiseAEchelle(width, height).height;

  // var currentBackground = canvas.backgroundImage
  // var currentShape = canvas.clipPath

  var newSignWidth = handleMiseAEchelle(width, height).width;
  var newSignHeight = handleMiseAEchelle(width, height).height;

  var canvasCenter = getCanvasCenter();
  // var newRectLeft = signLeft
  // var newRectTop = signTop;
  // var newRectLeft = (canvas.width /2) -(newSignWidth/2)
  // var newRectTop = (canvas.height/2) - (newSignHeight/2);
  var newRectLeft = canvasCenter.x - newSignWidth / 2;
  var newRectTop = canvasCenter.y - newSignHeight / 2;

  currentTop = newRectTop;
  currentLeft = newRectLeft;

  var newClipWidth = newSignWidth + newSignWidth * 0.5;
  var newClipHeight = newSignHeight + newSignHeight * 0.5;

  var newClipLeft = canvas.width / 2 - newClipWidth / 2;
  var newClipTop = canvas.height / 2 - newClipHeight / 2;

  //resize des des barres et valeurs de mesure
  function setMeasurmentValue(canvas) {
    var Objects = canvas.getObjects();
    Objects.forEach((object) => {
      if (object.name == "heightLine") {
        object.set({
          x1: newRectLeft + newSignWidth + 30,
          y1: newRectTop,
          x2: newRectLeft + newSignWidth + 30,
          y2: newRectTop + newSignHeight,
        });
      }
      if (object.name == "widthLine") {
        object.set({
          x1: newRectLeft,
          y1: newRectTop + newSignHeight + 28.5,
          x2: newRectLeft + newSignWidth + 10,
          y2: newRectTop + newSignHeight + 28.5,
        });
      }
      if (object.name == "height-value") {
        object.text = String(height + " " + currentUnit);
        object.top = newRectTop + newSignHeight / 2;
        object.left = newRectLeft + newSignWidth + 55;
      }
      if (object.name == "width-value") {
        object.text = String(width + " " + currentUnit);
        object.left = newRectLeft + newSignWidth / 2 - object.width / 2;
        object.top = newRectTop + (newSignHeight + 35);
      }
      if (object.name == "thickness-value") {
        object.left = newRectLeft + newSignWidth / 2 - object.width / 2;
        object.top = newRectTop + (newSignHeight + 65);
        object.text = String(
          "Thickness" + ": " + currentThickness + " " + currentUnit
        );
      }
      if (selectedShape == "square") {
        if (object.name == "old-world-border") {
          var scaleX = newSignWidth / object.width;
          var scaleY = newSignHeight / object.height;
          object.left = newRectLeft;
          object.top = newRectTop;
          object.scaleX = scaleX;
          object.scaleY = scaleY;
        }
      }
    });
    canvas.renderAll();
  }

  var stop = false;
  setMeasurmentValue(canvas);
  setMeasurmentValue(backCanvas);
  if (firstLoad) {
    if (maxChar != -1) {
      FtextObjects = handleGetTextObjects1("aso-SignText");
      BtextObjects = handleGetTextObjects2("aso-SignText");

      function adjustTextCharacters(textObjects, maxCharacters, canva) {
        let totalCharacters = 0;

        // Calculer le nombre total de caractères dans les objets "text"
        textObjects.forEach((obj) => {
          totalCharacters += obj.text.length;
        });

        // Si le total est inférieur ou égal au maximum, on ne fait rien
        if (totalCharacters <= maxCharacters) {
          return;
        }

        // Sinon, on commence par supprimer des caractères du dernier objet
        let charsToRemove = totalCharacters - maxCharacters;
        for (let i = textObjects.length - 1; i >= 0; i--) {
          const obj = textObjects[i];
          // obj.set('canvas', activeCanvas);
          if (obj.text.length > charsToRemove) {
            canva.discardActiveObject();
            canva.remove(obj);
            // Supprimer les caractères en trop de cet objet
            obj.text = obj.text.slice(0, obj.text.length - charsToRemove);
            obj.set("text", obj.text);

            canva.add(obj);
            obj.set("scaleX", obj.scaleX + 0.001);
            obj.set("scaleY", obj.scaleY + 0.001);

            charsToRemove = 0;
            break;
          } else {
            // Supprimer complètement cet objet
            charsToRemove -= obj.text.length;
            textObjects.splice(i, 1);

            canva.getObjects().forEach(function (obj) {
              if (obj.name === "aso-SignText") {
                function syncTextObjectsByFace(
                  bigArray,
                  textObjects,
                  targetFace
                ) {
                  // Parcourir les objets du grand tableau qui ont la face cible
                  bigArray.forEach((bigObj, index) => {
                    // console.log(bigObj.canvasName,"can")
                    if (bigObj.canvasName === targetFace) {
                      // Trouver l'objet correspondant dans le petit tableau
                      const smallObj = textObjects.find(
                        (obj) => obj.id === bigObj.id
                      );

                      if (smallObj) {
                        console.log(bigObj.canvasName, "array", index);
                        // L'objet existe dans le petit tableau, on le remplace
                        bigArray[index] = smallObj;
                      } else {
                        // L'objet n'existe pas dans le petit tableau, on le supprime
                        bigArray.splice(index, 1);
                        index--;
                      }
                    }
                  });

                  return bigArray;
                }
                addedTexts = syncTextObjectsByFace(
                  addedTexts,
                  textObjects,
                  canva.name
                );
                // console.log(addedTexts, "1969089151")
              }
            });

            canva.remove(obj);
          }

          // Si on a supprimé tous les caractères en trop, on peut arrêter
          if (charsToRemove <= 0) {
            break;
          }
        }

        canva.renderAll();
      }
      adjustTextCharacters(FtextObjects, maxChar, canvas);
      adjustTextCharacters(BtextObjects, maxChar, backCanvas);
    }
    FtextObjects = handleGetTextObjects1("aso-SignText");
    BtextObjects = handleGetTextObjects2("aso-SignText");
  }

  handleSelectShape(
    selectedShape,
    newSignWidth,
    newSignHeight,
    newRectTop,
    newRectLeft
  );

  handleCalcTextPrice();
  // if(activeSignFace === 'front' && frontTextCharLength > 0){
  // }
  // if(activeSignFace === 'back' && backTextCharLength > 0){
  //     handleCalcTextPrice(BtextObjects[BtextObjects.length - 1])
  // }

  // if(!firstLoad){
  //     updateModifications(true, "selection de la size");
  // }

  firstLoad = true;
  return {
    width: currentWidth,
    height: currentHeight,
    top: currentTop,
    left: currentLeft,
    texts: addedTexts,
    maxChars: maxChar,
  };
}

function handleGetSignPosition() {
  var sign = handleGetObjectByName("safeObject")

  return {
    width: sign.width,
    height: sign.height,
    top: sign.top,
    left: sign.left,
    maxChar: maxTextCharForSize,
    sizeName: currentSizeName,

    texts: addedTexts,
  };
}

var currentThickness = 0;
function handleChangeThickness(active, thick) {
  currentThickness = thick;

  function showThicknessObject(canva, active) {
    canva.getObjects().forEach(function (obj) {
      if (obj.name === "thickness-value") {
        obj.set("visible", active === true ? true : false);
        obj.text = String(
          "Thickness" + ": " + currentThickness + " " + currentUnit
        );
      }
    });

    canva.renderAll();
  }

  showThicknessObject(canvas, active);
  showThicknessObject(backCanvas, active);
}

// function lockToCanvas(activeObj){
//     var Objects = canvas.getObjects();
//     Objects.forEach(function(object){
//         if(object.type != 'line'){
//             if(object.name == 'safeObject'){

//                 activeObj.on('moving', function() {
//                     if (!object.containsPoint(activeObj.getCenterPoint())) {
//                         // Si le centre du rectangle est en dehors de la zone clipée, annuler le déplacement
//                         activeObj.set({
//                             left: activeObj._originalLeft,
//                             top: activeObj._originalTop
//                         });
//                     } else {
//                         // Si le déplacement est autorisé, enregistrer la nouvelle position comme originale
//                         activeObj._originalLeft = activeObj.left;
//                         activeObj._originalTop = activeObj.top;
//                     }
//                 });
//             }
//         }
//     })
// }
function lockToCanvas(activeObj) {
  var objects = activeCanvas.getObjects();
  objects.forEach(function (object) {
    if (object.type != "line") {
      if (object.name == "safeObject") {
        activeObj.on("moving", function () {
          if (!object.containsPoint(activeObj.getCenterPoint())) {
            activeObj.set({
              left: activeObj._originalLeft,
              top: activeObj._originalTop,
            });
          } else {
            activeObj._originalLeft = activeObj.left;
            activeObj._originalTop = activeObj.top;
          }
        });
      }
    }
  });
}
function removeTextById(id, table, canvas) {
  // console.log(id, table, canvas);
  const index = table.findIndex((item) => item.id === id);
  if (index !== -1) {
    table.splice(index, 1);
  }
}
function handleDeleteObject(object) {
  var target = object;
  var canvas = target.canvas;
  canvas.discardActiveObject();
  canvas.remove(target);
  canvas.requestRenderAll();

  if (target.type == "i-text") {
    removeTextById(target.id, addedTexts);
    removeTextById(
      object.id,
      handleGetTextObjects1("aso-SignText"),
      canvas.name
    );
    removeTextById(
      object.id,
      handleGetTextObjects2("aso-SignText"),
      canvas.name
    );

    // calcul des prix en fonctions des caractères restants
    FtextObjects = handleGetTextObjects1("aso-SignText");
    BtextObjects = handleGetTextObjects2("aso-SignText");
    frontTextCharLength = sumOptionsPrice(FtextObjects, "text").length;
    backTextCharLength = sumOptionsPrice(BtextObjects, "text").length;

    handleCalcTextPrice("delete text");

    if (readyToSave) {
      updateModifications(true, "selection de fixing");
    }

    return addedTexts;
  }
  if (target.name == "aso-SignImage") {
    removeTextById(target.id, addedImages);

    console.log(addedImages, "added images")

    if (readyToSave) {
      updateModifications(true, "selection de fixing");
    }

    return addedImages;
  }
}
function handleCloneObject(object, imageId) {
  var target = object;
  var canvas = target.canvas;
  target.clone(function (cloned) {
    cloned.left += 10;
    cloned.top += 10;
    if (cloned.type == "i-text") {
      cloned.set("canvas", activeCanvas);
      // console.log(cloned.canvas, "cloned canvas");
      handleAddTextToSign(cloned);
    }
    if (cloned.type == "image" || cloned.type == "path" || cloned.type == "group") {
      cloned.uniScaleTransform = true;
      cloned.centeredScaling = true;
      cloned.lockScalingFlip = true;
      cloned.originX = "center";
      cloned.originY = "center";
      cloned.canvasName = object.canvasName;
      cloned.price = object.price
      cloned.lockMoving = {
        x: object.lockMoving.x,
        y: object.lockMoving.y,
      }
      cloned.lockScale = object.lockScale
      cloned.id = newId += 1
      cloned.objectType = (object.objectType === "svg" ? 'svg' : 'no-svg');
      cloned.imageUrl = (object.objectType === "svg" ? object.imageUrl : cloned.getSrc());
      cloned.set('name', 'aso-SignImage')
      cloned.on('mousedown', function() {
          handleGetAddedImageValues(cloned);
      });
      cloned.on('mouseup', function() {
          handleGetAddedImageValues(cloned);
      });

      addedImages.push({ id: cloned.id, url: (object.objectType === "svg" ? object.imageUrl : cloned.getSrc()), object: cloned });
      canvas.add(cloned);
    }
  });
  if (object.name === "aso-SignImage") {
    return addedImages;
  }
}
function handleCenterVertically(object) {
  var target = object;
  target.setCoords();
  var canvas = target.canvas;
  var newCoord = target.getCoords();
  var Objects = canvas.getObjects();
  Objects.forEach(function (object) {
    if (object.name == "safeObject") {
      var containerCoords = object.getCenterPoint();
      var targetHeight = newCoord[3].y - newCoord[0].y;
      // var targetHeight = target.height
      // var newTop = object.top + (object.height /2) - (targetHeight /2)
      var newTop = containerCoords.y;
      target.top = newTop;
    }
  });
  canvas.renderAll();
}
function handleCenterHorizontally(object) {
  var target = object;
  target.setCoords();
  var canvas = target.canvas;
  var newCoord = target.getCoords();
  var Objects = canvas.getObjects();
  Objects.forEach(function (object) {
    if (object.name == "safeObject") {
      var containerCoords = object.getCenterPoint();

      // var targetWidth = (newCoord[1].x - newCoord[0].x)
      var targetWidth = target.width;
      // var newLeft = object.left + (object.width /2) - (targetWidth /2)
      var newLeft = containerCoords.x;
      target.left = newLeft;
    }
  });
  canvas.renderAll();
}

function handleLockMoving(object, axe){
  if(axe == 'x'){
    if(object.lockMoving.x === true){
      object.lockMoving.x = false
    }else{
      object.lockMoving.x = true
    }
  }
  if(axe == 'y'){
    if(object.lockMoving.y === true){
      object.lockMoving.y = false
    }else{
      object.lockMoving.y = true
    }
  }
  
  console.log(object.lockMoving)
  return object.lockMoving
}
function handleLockScaling(object, axe){
  if(object.lockScale === true){
    object.lockScale = false
  }else{
    object.lockScale = true
  }

  return object.lockScale
}
function handleLockRotating(object, axe){
  if(object.lockRotate === true){
    object.lockRotate = false
  }else{
    object.lockRotate = true
  }

  return object.lockRotate
}
function handleLockEdition(object, axe){
  if(object.lockEdition === true){
    object.lockEdition = false
  }else{
    object.lockEdition = true
  }

  return object.lockEdition
}

//function pour afficher les borders
var activeBorder = "";
var activeBorderColor = "";
var activeBorder2 = "";
var activeBorderColor2 = "";
var firstBorderCheck = true;
function removeBorder(canva) {
  var Objects = canva.getObjects();
  Objects.forEach(function (object) {
    if (object.type !== "line") {
      if (object.name == "safeObject") {
        object.set("strokeWidth", 0);
        object.set("stroke", "transparent");
      }
      if (object.name == "old-world-border") {
        canva.remove(object);
      }
      if (object.name == "rounded-corners-border") {
        canva.remove(object);
      }
      // var oldWorld = handleGetObjectByName('old-world-border')
      // var roundedCorner = handleGetObjectByName('rounded-corners-border')
      // if(oldWorld != null){
      // }
      // if(roundedCorner != null){
      //     canva.remove(roundedCorner)
      // }
    }
  });
  canva.renderAll();
}
var restartBorderSet = false;
function handleGetBorderRestart(restart) {
  restartBorderSet = restart;
}

function handleGetBorderData(face, data){
  if(face === 'front-face'){
      activeBorder = data.border
      activeBorderColor = data.color
  }else{
      activeBorder2 = data.border
      activeBorderColor2 = data.color
  }
}

function handleSelectBorder(border, color) {
  // console.log("handleSelectBorder", border);
  if (!firstLoad || restartBorderSet) {
    activeBorder = border;
    activeBorder2 = border;
    if (color) {
      activeBorderColor = color;
      activeBorderColor2 = color;
    }
    setBorder(canvas, activeBorder, activeBorderColor);
    setBorder(backCanvas, activeBorder2, activeBorderColor2);
  } else {
    if (activeSignFace === "front") {
      activeBorder = border;
      if (color) {
        activeBorderColor = color;
      }
      setBorder(canvas, activeBorder, activeBorderColor);
      setBorder(backCanvas, activeBorder2, activeBorderColor2);
    }
    if (activeSignFace === "back") {
      activeBorder2 = border;
      if (color) {
        activeBorderColor2 = color;
      }
      setBorder(canvas, activeBorder, activeBorderColor);
      setBorder(backCanvas, activeBorder2, activeBorderColor2);
    }
  }
  function setBorder(canva, currBorder, activeColor) {
    // console.log(currBorder, activeColor, "setBorder")
    var Objects = canva.getObjects();
    Objects.forEach(async function (object, index) {
      if (object.type !== "line") {
        if (object.name === "safeObject") {
          if (currBorder === "none") {
            removeBorder(canva);
          }
          if (currBorder === "normal") {
            removeBorder(canva);
            if (sizeRatio == "small") {
              object.set("strokeWidth", 11);
            }
            if (sizeRatio == "big") {
              object.set("strokeWidth", 16);
            }
            if (activeColor) {
              object.set("stroke", activeColor);
            } else {
              object.set("stroke", activeColor);
            }
          }
          if (currBorder === "old-world") {
            // fabric.util.loadImage('../../old-world-border.png', function(img) {
            //     var scaleX = object.width / img.width;
            //     var scaleY = object.height / img.height;
            //     var pattern = new fabric.Pattern({
            //         source: img,
            //         repeat: 'no-repeat',
            //         patternTransform: [scaleX, 0, 0, scaleY, 0, 0]
            //     });

            //     console.log(pattern)

            //     // object.set('fill', pattern);
            //     canvas.add(pattern);
            //     canvas.renderAll();
            // });

            removeBorder(canva);
            if (
              selectedShape === "square" ||
              selectedShape === "rounded-square"
            ) {
              if (sizeRatio === "small") {
                // fabric.util.loadImage( borderUrl+'/im_old-world.svg', function(img) {
                //     var scaleX = object.width / img.width;
                //     var scaleY = object.height / img.height;
                //     var imageOverlay = new fabric.Image(img, {
                //         left: object.left,
                //         top: object.top,
                //         scaleX: scaleX,
                //         scaleY: scaleY,
                //         name: 'old-world-border',
                //         selectable: false,
                //     });

                //     canva.add(imageOverlay);
                //     imageOverlay.moveTo(canva.getObjects().length); // Déplacer l'image au-dessus du rectangle
                //     canva.renderAll();
                // });
                await fabric.loadSVGFromURL(
                  borderUrl + "/im_old-world.svg",
                  (objects, options) => {
                    var scaleX = object.width / objects[0].width;
                    var scaleY = object.height / objects[0].height;

                    const svgGroup = fabric.util.groupSVGElements(objects);
                    svgGroup.set("fill", activeColor);
                    svgGroup.set("left", object.left);
                    svgGroup.set("top", object.top);
                    svgGroup.scaleX = scaleX;
                    svgGroup.scaleY = scaleY;
                    (svgGroup.name = "old-world-border"),
                      (svgGroup.selectable = false),
                      // console.log("svg", svgGroup);

                      canva.add(svgGroup);
                    canva.moveTo(svgGroup, index + 1);
                    // canva.renderAll();
                  }
                );
                // console.log(canva.getObjects())
              }
              if (sizeRatio === "big") {
                fabric.loadSVGFromURL(
                  borderUrl + "/im_old-world.svg",
                  (objects, options) => {
                    var scaleX = object.width / objects[0].width;
                    var scaleY = object.height / objects[0].height;

                    const svgGroup = fabric.util.groupSVGElements(objects);
                    svgGroup.set("fill", activeColor);
                    svgGroup.set("left", object.left);
                    svgGroup.set("top", object.top);
                    svgGroup.scaleX = scaleX;
                    svgGroup.scaleY = scaleY;
                    (svgGroup.name = "old-world-border"),
                      (svgGroup.selectable = false),
                      // console.log("svg", svgGroup);
                      canva.add(svgGroup);
                    canva.moveTo(svgGroup, index + 1);
                    canva.renderAll();
                  }
                );
              }
            } else {
              object.set("strokeWidth", 0);
              object.set("stroke", "transparent");
            }
          }
          if (currBorder === "rounded-corners") {
            removeBorder(canva);

            if (
              selectedShape === "square" ||
              selectedShape === "rounded-square"
            ) {
              if (sizeRatio === "small") {
                fabric.loadSVGFromURL(
                  borderUrl + "/im_rounded-corner.svg",
                  (objects, options) => {
                    var scaleX = object.width / objects[0].width;
                    var scaleY = object.height / objects[0].height;

                    const svgGroup = fabric.util.groupSVGElements(objects);
                    svgGroup.set("fill", activeColor);
                    svgGroup.set("left", object.left);
                    svgGroup.set("top", object.top);
                    svgGroup.scaleX = scaleX;
                    svgGroup.scaleY = scaleY;
                    (svgGroup.name = "rounded-corners-border"),
                      (svgGroup.selectable = false),
                      // console.log("svg", svgGroup);
                      canva.add(svgGroup);
                    canva.moveTo(svgGroup, index + 1);
                    canva.renderAll();
                  }
                );
              }
              if (sizeRatio === "big") {
                fabric.loadSVGFromURL(
                  borderUrl + "/im_rounded-corner.svg",
                  (objects, options) => {
                    var scaleX = object.width / objects[0].width;
                    var scaleY = object.height / objects[0].height;

                    const svgGroup = fabric.util.groupSVGElements(objects);
                    svgGroup.set("fill", activeColor);
                    svgGroup.set("left", object.left);
                    svgGroup.set("top", object.top);
                    svgGroup.scaleX = scaleX;
                    svgGroup.scaleY = scaleY;
                    (svgGroup.name = "rounded-corners-border"),
                      (svgGroup.selectable = false),
                      // console.log("svg", svgGroup);
                      canva.add(svgGroup);
                    canva.moveTo(svgGroup, index + 1);
                    canva.renderAll();
                  }
                );
              }
            } else {
              object.set("strokeWidth", 0);
              object.set("stroke", "transparent");
            }
          }
        }
      }
    });
    // console.log(canva.getObjects())
    canva.renderAll();
  }
  firstBorderCheck = false;

  // if(readyToSave){
  //     updateModifications(true, 'selection de border')
  // }

  return { type: border, color: color };
}
function handlechangeBorderColor(color, position) {
  // console.log(color, position)
  if (!firstLoad) {
    activeBorderColor = color;
    activeBorderColor2 = color;

    setBorderColor(activeBorder, activeBorderColor, canvas);
    setBorderColor(activeBorder, activeBorderColor, backCanvas);
  } else {
    if (activeSignFace === "front") {
      activeBorderColor = color;
      setBorderColor(activeBorder, activeBorderColor, canvas);
    }
    if (activeSignFace === "back") {
      activeBorderColor2 = color;
      setBorderColor(activeBorder2, activeBorderColor2, backCanvas);
    }
  }

  function setBorderColor(border, color, canva) {
    if (border === "normal") {
      var Objects = canva.getObjects();
      Objects.forEach(function (object) {
        if (object.name === "safeObject") {
          if (sizeRatio == "small") {
            object.set("strokeWidth", 11);
          }
          if (sizeRatio == "big") {
            object.set("strokeWidth", 6);
          }
          object.set("stroke", color);
        }
      });
      canva.renderAll();
    }
    if (border === "old-world") {
      canva.getObjects().forEach((objet) => {
        if (objet.name === "old-world-border") {
          objet.set("fill", color);
        }
      });

      canva.renderAll();
    }
    if (border === "rounded-corners") {
      canva.getObjects().forEach((objet) => {
        if (objet.name === "rounded-corners-border") {
          objet.set("fill", color);
        }
      });

      canva.renderAll();
    }
  }

  if (readyToSave) {
    updateModifications(true, "selection de border color");
  }
}

var currentSignColor = "";
var currentSignTextColor = "";
var firstColorSet = true;
var signBackground1 = "color";
var signBackground2 = "color";
var patternUrl1 = "";
var patternUrl2 = "";
function handleChangeSignColor(
  name,
  pattern,
  textColor,
  defTextColor,
  restart
) {
  console.log();
  currentSignColor = name;
  var stop = true;
  function setSignColor(canva) {
    var Objects = canva.getObjects();
    Objects.forEach(function (object) {
      if (object.type !== "line") {
        if (object.name == "safeObject") {
          if (pattern.active) {
            if(canva.name == 'front-face'){
              signBackground1 = "pattern";
              patternUrl1 = pattern.url;
            }else{
              signBackground2 = "pattern";
              patternUrl2 = pattern.url;
            }
            setPattern(canva, pattern.url);
          } else {
            if(canva.name == 'front-face'){
              signBackground1 = "color";
            }else{
              signBackground2 = "color";
            }
            object.set("fill", pattern.codeHex);
          }
        }
        if (textColor.active) {
          currentSignTextColor = textColor.codeHex;
          if (object.name == "aso-SignText") {
            object.set("fill", textColor.codeHex);
          }
          if (textColor.sameForBorder && stop) {
            // handlechangeBorderColor(textColor.codeHex, "white")
            // console.log("change")
            stop = false;
          }
        } else {
          currentSignTextColor = defTextColor;
          // if (object.name == "aso-SignText") {
          //   if (defTextColor) {
          //     object.set("fill", defTextColor);
          //   }
          // }
        }
      }
    });
    canva.renderAll();
  }

  if (firstColorSet || restart) {
    setSignColor(canvas);
    setSignColor(backCanvas);
  } else {
    setSignColor(activeCanvas);
  }

  if (readyToSave) {
    // updateModifications(true, 'changer sign color')
  }
  firstColorSet = false;

  return name;
}
function setPattern(canva, image) {
  const imgElement = new Image();
  imgElement.crossOrigin = 'anonymous';
  imgElement.src = image;
  // console.log(image, "setPattern")
  // var object = handleGetObjectByName('safeObject', canvas)
  canva.getObjects().forEach((object, index) => {
    if (object.name === "safeObject") {
      fabric.util.loadImage(image, function (img) {
        var scaleX = object.width / img.width;
        var scaleY = object.height / img.height;
        var pattern = new fabric.Pattern({
          source: img,
          repeat: "no-repeat",
          patternTransform: [scaleX, 0, 0, scaleY, 0, 0],
        });

        // console.log(pattern)

        object.set("fill", pattern);
        // canvas.add(pattern);
        canva.renderAll();
      }, { crossOrigin: 'anonymous' });
    }
  });
}
function handleSetImageToSignBackground(image) {
  setPattern(canvas, image);
  setPattern(backCanvas, image);
  // updateModifications(true, 'changer sign color')
}

//fonctions concernant le choix de shapes
var selectedShape = "";
function handleGetShape(shape, fixing) {
  selectedShape = shape;
  if (fixing) {
    activeFixingMethode = fixing;
  }
}
function handleSelectShape(shape, nwidth, nheight, nTop, nLeft) {
  var canvasCenter = getCanvasCenter();

  selectedShape = shape;

  function setShape(canvas) {
    resetFixing(canvas);
    var Objects = canvas.getObjects();
    Objects.forEach(function (object) {
      if (object.type !== "line") {
        var top = nTop;
        var left = nLeft;
        // var top = canvasCenter.y - (nwidth/2);
        // var left = canvasCenter.x - (nheight/2);
        var width = nwidth;
        var height = nheight;
        var objectfill;

        if(typeof  object.fill !== 'string'){
          object.fill = 'transparent'
        }else{
          objectfill = object.fill;
        }
        var objectId = object.id;

        if (object.name == "safeObject") {
          object.setCoords();
          switch (shape) {
            case "square":
              var squareShape = new fabric.Rect({
                height: height,
                width: width,
                left: left,
                top: top,
                fill: objectfill,
                selectable: false,
                name: "safeObject",
                shadow: defaultShadow,
                id: objectId,
              });

              canvas.remove(object);
              canvas.add(squareShape);
              squareShape.sendToBack();
              break;

            case "rounded-square":
              var roundedSquareShape = new fabric.Rect({
                height: height,
                width: width,
                left: left,
                top: top,
                rx: 15,
                ry: 15,
                fill: objectfill,
                selectable: false,
                name: "safeObject",
                shadow: defaultShadow,
                id: objectId,
              });
              canvas.remove(object);
              canvas.add(roundedSquareShape);
              roundedSquareShape.sendToBack();
              break;

            case "oval":
              var ellipseShape = new fabric.Ellipse({
                ry: height / 2,
                rx: width / 2,
                fill: objectfill,
                left: left,
                top: top,
                selectable: false,
                name: "safeObject",
                shadow: defaultShadow,
                id: objectId,
              });
              canvas.remove(object);
              canvas.add(ellipseShape);
              ellipseShape.sendToBack();
              break;

            case "triangle":
              var triangleShape = new fabric.Triangle({
                height: height,
                width: width,
                left: left,
                top: top,
                fill: objectfill,
                selectable: false,
                name: "safeObject",
                shadow: defaultShadow,
                id: objectId,
              });
              canvas.remove(object);
              canvas.add(triangleShape);
              triangleShape.sendToBack();
              break;

            case "rotated-square":
              var rotatedSquareShape = new fabric.Polygon(
                [
                  { x: width / 2, y: 0 },
                  { x: width, y: height / 2 },
                  { x: width / 2, y: height },
                  { x: 0, y: height / 2 },
                ],
                {
                  left: left,
                  top: top,
                  fill: objectfill,
                  selectable: false,
                  name: "safeObject",
                  shadow: defaultShadow,
                  id: objectId,
                }
              );
              canvas.remove(object);
              canvas.add(rotatedSquareShape);
              rotatedSquareShape.sendToBack();
              break;

            case "turn-left":
              var turnLeftShape = new fabric.Polygon(
                [
                  { x: 0, y: height / 2 },
                  { x: width / 2, y: 0 },
                  { x: width, y: 0 },
                  { x: width, y: height },
                  { x: width / 2, y: height },
                ],
                {
                  left: left,
                  top: top,
                  fill: objectfill,
                  selectable: false,
                  name: "safeObject",
                  shadow: defaultShadow,
                  id: objectId,
                }
              );
              canvas.remove(object);
              canvas.add(turnLeftShape);
              turnLeftShape.sendToBack();
              break;

            case "turn-right":
              var turnRightShape = new fabric.Polygon(
                [
                  { x: 0, y: 0 },
                  { x: width / 2, y: 0 },
                  { x: width, y: height / 2 },
                  { x: width / 2, y: height },
                  { x: 0, y: height },
                ],
                {
                  left: left,
                  top: top,
                  fill: objectfill,
                  selectable: false,
                  name: "safeObject",
                  shadow: defaultShadow,
                  id: objectId,
                }
              );
              canvas.remove(object);
              canvas.add(turnRightShape);
              turnRightShape.sendToBack();
              break;

            case "arrow-right":
              var arrowRightShape = new fabric.Polyline(
                [
                  { x: 0, y: (height / 5) * 4 },
                  { x: width / 2, y: (height / 5) * 4 },
                  { x: width / 2, y: height },
                  { x: width, y: height / 2 },
                  { x: width / 2, y: 0 },
                  { x: width / 2, y: height / 5 },
                  { x: 0, y: height / 5 },
                ],
                {
                  left: left,
                  top: top,
                  fill: objectfill,
                  selectable: false,
                  name: "safeObject",
                  shadow: defaultShadow,
                  id: objectId,
                }
              );
              canvas.remove(object);
              canvas.add(arrowRightShape);
              arrowRightShape.sendToBack();
              break;

            case "arrow-left":
              var arrowLeftShape = new fabric.Polygon(
                [
                  { x: 0, y: height / 2 },
                  { x: width / 2, y: 0 },
                  { x: width / 2, y: height / 5 },
                  { x: width, y: height / 5 },
                  { x: width, y: (height / 5) * 4 },
                  { x: width / 2, y: (height / 5) * 4 },
                  { x: width / 2, y: height },
                ],
                {
                  left: left,
                  top: top,
                  fill: objectfill,
                  selectable: false,
                  name: "safeObject",
                  shadow: defaultShadow,
                  id: objectId,
                }
              );
              canvas.remove(object);
              canvas.add(arrowLeftShape);
              arrowLeftShape.sendToBack();
              break;

            case "stop":
              var stopShape = new fabric.Polygon(
                [
                  { x: 0, y: (height / 3) * 2 },
                  { x: width / 3, y: height },
                  { x: (width / 3) * 2, y: height },
                  { x: width, y: (height / 3) * 2 },
                  { x: width, y: height / 3 },
                  { x: (width / 3) * 2, y: 0 },
                  { x: width / 3, y: 0 },
                  { x: 0, y: height / 3 },
                ],
                {
                  left: left,
                  top: top,
                  fill: objectfill,
                  selectable: false,
                  name: "safeObject",
                  shadow: defaultShadow,
                  id: objectId,
                }
              );
              canvas.remove(object);
              canvas.add(stopShape);
              stopShape.sendToBack();
              break;

            case "rounded-top":
              var roundedTopShape = new fabric.Rect({
                height: height,
                width: width,
                left: left,
                top: top,
                rx: width,
                ry: 10,
                fill: objectfill,
                selectable: false,
                name: "safeObject",
                shadow: defaultShadow,
                id: objectId,
              });
              canvas.remove(object);
              canvas.add(roundedTopShape);
              roundedTopShape.sendToBack();
              break;

            case "rounded-sides":
              var roundedSidesShape = new fabric.Rect({
                height: height,
                width: width,
                left: left,
                top: top,
                rx: 10,
                ry: height,
                fill: objectfill,
                selectable: false,
                name: "safeObject",
                shadow: defaultShadow,
                id: objectId,
              });
              canvas.remove(object);
              canvas.add(roundedSidesShape);
              roundedSidesShape.sendToBack();
              break;
          }
        }
      }
    });
    canvas.renderAll();
  }

  setShape(canvas);
  setShape(backCanvas);
  if (signBackground1 === "pattern") {
    setPattern(canvas, patternUrl1);
  }
  if (signBackground2 === "pattern") {
    setPattern(backCanvas, patternUrl2);
  }
  // if(firstLoad){
  //     if(signBackground === 'pattern'){
  //         setPattern(canvas, patternUrl);
  //     }
  // }

  if(!firstLoad && !isTemplate) {
    removeBorder(canvas);
    handleSelectBorder(activeBorder, activeBorderColor);
  }
  if (firstLoad) {
    if (activeSignFace === "front") {
      removeBorder(canvas);
      handleSelectBorder(activeBorder, activeBorderColor);
    }
    if (activeSignFace === "back") {
      removeBorder(backCanvas);
      handleSelectBorder(activeBorder2, activeBorderColor2);
    }
  }
  handleSelectFixingMethode(activeFixingMethode);
}

//fonctions concernant les fixings methode
function resetFixing(canva) {
  function reset(canvas) {
    var Objects = canvas.getObjects();
    Objects.forEach(function (object) {
      if (object.type != "line") {
        if (
          object.name == "screw1" ||
          object.name == "screw2" ||
          object.name == "screw3" ||
          object.name == "screw4" ||
          object.name == "screw-cap1" ||
          object.name == "screw-cap2" ||
          object.name == "screw-cap3" ||
          object.name == "screw-cap4" ||
          object.name == "suction-cup1" ||
          object.name == "suction-cup2" ||
          object.name == "suction-cup3" ||
          object.name == "suction-cup4" ||
          object.name == "standoff1" ||
          object.name == "standoff2" ||
          object.name == "standoff3" ||
          object.name == "standoff4" ||
          object.name == "flag" ||
          object.name == "flag1" ||
          object.name == "flag2" ||
          object.name == "table-stand" ||
          object.name == "ceiling1" ||
          object.name == "ceiling2" ||
          object.name == "hanging-hole" ||
          object.name == "hanging-hole1" ||
          object.name == "hanging-hole2" ||
          object.name == "pole" ||
          object.name == "cable-hole1" ||
          object.name == "cable-hole2" ||
          object.name == "cable-hole3" ||
          object.name == "cable-hole4" ||
          object.name == "eyelet1" ||
          object.name == "eyelet2" ||
          object.name == "eyelet3" ||
          object.name == "eyelet4" ||
          object.name == "table-clamp1" ||
          object.name == "table-clamp2" ||
          object.name == "base-support1" ||
          object.name == "base-support2" ||
          object.name == "keyring-hole" ||
          object.name == "keyring" ||
          object.name == "s-hook-hole" ||
          object.name == "s-hook" ||
          object.name == "roll-up-top" ||
          object.name == "roll-up-bottom" ||
          object.name == "sign-holder-top" ||
          object.name == "sign-holder-bottom"
        ) {
          canvas.remove(object);
          canvas.renderAll();
        }
      }
    });
  }
  reset(canva);
}
function handleGetActiveFixing(type) {
  activeFixingMethode = type;
}
var activeFixingMethode = "";
function handleSelectFixingMethode(methode) {
  // console.logf("qsqs")
  // console.log(methode, "Fixing methode")
  activeFixingMethode = methode;

  function setFixing(canva) {
    resetFixing(canva);

    canva.getObjects().forEach(function (object) {
      if (object.type !== "line") {
        if (methode == "none") {
          resetFixing(canva);
        }

        if (object.name == "safeObject") {
          if (methode == "screw") {
            resetFixing(canva);
            if (
              selectedShape == "square" ||
              selectedShape == "rounded-square" ||
              selectedShape == "rounded-top" ||
              selectedShape == "rounded-sides"
            ) {
              if (sizeRatio == "small") {
                fabric.Image.fromURL(
                  fixingUrl + "/im_screw.png",
                  function (img) {
                    img.scale(fixScale);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top + (object.height / 2 - newHeight / 2);
                    img.left = object.left;
                    img.set("name", "screw1");
                    img.id = 7;

                    img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                    canva.add(img);
                  }
                );

                fabric.Image.fromURL(
                  fixingUrl + "/im_screw.png",
                  function (img) {
                    img.scale(fixScale);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top + (object.height / 2 - newHeight / 2);
                    img.left = object.left + (object.width - newWidth);
                    img.set("name", "screw2");
                    img.id = 8;

                    img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                    canva.add(img);
                  }
                );
              }
              if (sizeRatio == "big") {
                fabric.Image.fromURL(
                  fixingUrl + "/im_screw.png",
                  function (img) {
                    img.scale(fixScale);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top;
                    img.left = object.left;
                    img.set("name", "screw1");
                    img.id = 7;

                    img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                    canva.add(img);
                  }
                );

                fabric.Image.fromURL(
                  fixingUrl + "/im_screw.png",
                  function (img) {
                    img.scale(fixScale);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top;
                    img.left = object.left + (object.width - newWidth);
                    img.set("name", "screw2");
                    img.id = 8;

                    img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                    canva.add(img);
                  }
                );

                fabric.Image.fromURL(
                  fixingUrl + "/im_screw.png",
                  function (img) {
                    img.scale(fixScale);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top + (object.height - newHeight);
                    img.left = object.left;
                    img.set("name", "screw3");
                    img.id = 9;

                    img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                    canva.add(img);
                  }
                );

                fabric.Image.fromURL(
                  fixingUrl + "/im_screw.png",
                  function (img) {
                    img.scale(fixScale);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top + (object.height - newHeight);
                    img.left = object.left + (object.width - newWidth);
                    img.set("name", "screw4");
                    img.id = 10;

                    img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                    canva.add(img);
                  }
                );
              }
            }
            if (selectedShape == "triangle") {
              fabric.Image.fromURL(fixingUrl + "/im_screw.png", function (img) {
                img.scale(fixScale);

                img.setCoords();
                var newWidth = img.width * img.scaleX;
                var newHeight = img.height * img.scaleY;

                img.top = object.top + newHeight / 2;
                img.left = object.left + (object.width / 2 - newWidth / 2);
                img.set("name", "screw1");
                img.id = 7;

                img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                canva.add(img);
              });

              fabric.Image.fromURL(fixingUrl + "/im_screw.png", function (img) {
                img.scale(fixScale);

                img.setCoords();
                var newWidth = img.width * img.scaleX;
                var newHeight = img.height * img.scaleY;

                img.top = object.top + (object.height - newHeight);
                img.left = object.left + newWidth / 2;
                img.set("name", "screw2");
                img.id = 8;

                img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                canva.add(img);
              });

              fabric.Image.fromURL(fixingUrl + "/im_screw.png", function (img) {
                img.scale(fixScale);

                img.setCoords();
                var newWidth = img.width * img.scaleX;
                var newHeight = img.height * img.scaleY;

                img.top = object.top + (object.height - newHeight);
                img.left =
                  object.left + (object.width - newWidth) - newWidth / 2;
                img.set("name", "screw3");
                img.id = 9;

                img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                canva.add(img);
              });
            }
            if (selectedShape == "oval" || selectedShape == "rotated-square") {
              fabric.Image.fromURL(fixingUrl + "/im_screw.png", function (img) {
                // img.scaleToWidth(object.width);
                // img.scaleToHeight(object.height);
                img.scale(fixScale);

                img.setCoords();
                var newWidth = img.width * img.scaleX;
                var newHeight = img.height * img.scaleY;

                img.top = object.top + (object.height / 2 - newHeight / 2);
                img.left = object.left + newWidth / 2;
                img.set("name", "screw1");
                img.id = 7;

                img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                canva.add(img);
              });

              fabric.Image.fromURL(fixingUrl + "/im_screw.png", function (img) {
                img.scale(fixScale);

                img.setCoords();
                var newWidth = img.width * img.scaleX;
                var newHeight = img.height * img.scaleY;

                img.top = object.top + (object.height / 2 - newHeight / 2);
                img.left =
                  object.left + (object.width - newWidth) - newWidth / 2;
                img.set("name", "screw2");
                img.id = 8;

                img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                canva.add(img);
              });
            }
            if (selectedShape == "turn-left" || selectedShape == "arrow-left") {
              fabric.Image.fromURL(fixingUrl + "/im_screw.png", function (img) {
                // img.scaleToWidth(object.width);
                // img.scaleToHeight(object.height);
                img.scale(fixScale);

                img.setCoords();
                var newWidth = img.width * img.scaleX;
                var newHeight = img.height * img.scaleY;

                img.top = object.top + (object.height / 2 - newHeight / 2);
                img.left = object.left + newWidth / 2;
                img.set("name", "screw1");
                img.id = 7;

                img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                canva.add(img);
              });

              fabric.Image.fromURL(fixingUrl + "/im_screw.png", function (img) {
                img.scale(fixScale);

                img.setCoords();
                var newWidth = img.width * img.scaleX;
                var newHeight = img.height * img.scaleY;

                img.top = object.top + (object.height / 2 - newHeight / 2);
                img.left = object.left + (object.width - newWidth);
                img.set("name", "screw2");
                img.id = 8;

                img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                canva.add(img);
              });
            }
            if (
              selectedShape == "turn-right" ||
              selectedShape == "arrow-right"
            ) {
              fabric.Image.fromURL(fixingUrl + "/im_screw.png", function (img) {
                img.scale(fixScale);

                img.setCoords();
                var newWidth = img.width * img.scaleX;
                var newHeight = img.height * img.scaleY;

                img.top = object.top + (object.height / 2 - newHeight / 2);
                img.left = object.left;
                img.set("name", "screw1");
                img.id = 7;

                img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                canva.add(img);
              });

              fabric.Image.fromURL(fixingUrl + "/im_screw.png", function (img) {
                img.scale(fixScale);

                img.setCoords();
                var newWidth = img.width * img.scaleX;
                var newHeight = img.height * img.scaleY;

                img.top = object.top + (object.height / 2 - newHeight / 2);
                img.left =
                  object.left + (object.width - newWidth) - newWidth / 2;
                img.set("name", "screw2");
                img.id = 8;

                img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                canva.add(img);
              });
            }
            if (selectedShape == "stop") {
              fabric.Image.fromURL(fixingUrl + "/im_screw.png", function (img) {
                img.scale(fixScale);

                img.setCoords();
                var newWidth = img.width * img.scaleX;
                var newHeight = img.height * img.scaleY;

                img.top = object.top + (object.height / 2 - newHeight / 2);
                img.left = object.left;
                img.set("name", "screw1");
                img.id = 7;

                img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                canva.add(img);
              });

              fabric.Image.fromURL(fixingUrl + "/im_screw.png", function (img) {
                img.scale(fixScale);

                img.setCoords();
                var newWidth = img.width * img.scaleX;
                var newHeight = img.height * img.scaleY;

                img.top = object.top + (object.height / 2 - newHeight / 2);
                img.left = object.left + (object.width - newWidth);
                img.set("name", "screw2");
                img.id = 8;

                img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                canva.add(img);
              });
            }
          }
          if (methode == "screw-cap") {
            resetFixing(canva);
            if (
              selectedShape == "square" ||
              selectedShape == "rounded-square" ||
              selectedShape == "rounded-top" ||
              selectedShape == "rounded-sides"
            ) {
              if (sizeRatio == "small") {
                fabric.Image.fromURL(
                  fixingUrl + "/im_screw-cap.png",
                  function (img) {
                    // img.scaleToWidth(object.width);
                    // img.scaleToHeight(object.height);
                    img.scale(fixScale);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top + (object.height / 2 - newHeight / 2);
                    img.left = object.left;
                    img.set("name", "screw-cap1");
                    img.id = 11;

                    img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                    canva.add(img);
                  }
                );

                fabric.Image.fromURL(
                  fixingUrl + "/im_screw-cap.png",
                  function (img) {
                    img.scale(fixScale);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top + (object.height / 2 - newHeight / 2);
                    img.left = object.left + (object.width - newWidth);
                    img.set("name", "screw-cap2");
                    img.id = 12;

                    img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                    canva.add(img);
                  }
                );
              }
              if (sizeRatio == "big") {
                fabric.Image.fromURL(
                  fixingUrl + "/im_screw-cap.png",
                  function (img) {
                    img.scale(fixScale);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top;
                    img.left = object.left;
                    img.set("name", "screw-cap1");
                    img.id = 11;

                    img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                    canva.add(img);
                  }
                );

                fabric.Image.fromURL(
                  fixingUrl + "/im_screw-cap.png",
                  function (img) {
                    img.scale(fixScale);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top;
                    img.left = object.left + (object.width - newWidth);
                    img.set("name", "screw-cap2");
                    img.id = 12;

                    img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                    canva.add(img);
                  }
                );

                fabric.Image.fromURL(
                  fixingUrl + "/im_screw-cap.png",
                  function (img) {
                    img.scale(fixScale);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top + (object.height - newHeight);
                    img.left = object.left;
                    img.set("name", "screw-cap3");
                    img.id = 13;

                    img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                    canva.add(img);
                  }
                );

                fabric.Image.fromURL(
                  fixingUrl + "/im_screw-cap.png",
                  function (img) {
                    img.scale(fixScale);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top + (object.height - newHeight);
                    img.left = object.left + (object.width - newWidth);
                    img.set("name", "screw-cap4");
                    img.id = 14;

                    img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                    canva.add(img);
                  }
                );
              }
            }
            if (selectedShape == "triangle") {
              fabric.Image.fromURL(
                fixingUrl + "/im_screw-cap.png",
                function (img) {
                  img.scale(fixScale);

                  img.setCoords();
                  var newWidth = img.width * img.scaleX;
                  var newHeight = img.height * img.scaleY;

                  img.top = object.top + newHeight / 2;
                  img.left = object.left + (object.width / 2 - newWidth / 2);
                  img.set("name", "screw-cap1");
                  img.id = 11;

                  img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                  canva.add(img);
                }
              );

              fabric.Image.fromURL(
                fixingUrl + "/im_screw-cap.png",
                function (img) {
                  img.scale(fixScale);

                  img.setCoords();
                  var newWidth = img.width * img.scaleX;
                  var newHeight = img.height * img.scaleY;

                  img.top = object.top + (object.height - newHeight);
                  img.left = object.left + newWidth / 2;
                  img.set("name", "screw-cap2");
                  img.id = 12;

                  img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                  canva.add(img);
                }
              );

              fabric.Image.fromURL(
                fixingUrl + "/im_screw-cap.png",
                function (img) {
                  img.scale(fixScale);

                  img.setCoords();
                  var newWidth = img.width * img.scaleX;
                  var newHeight = img.height * img.scaleY;

                  img.top = object.top + (object.height - newHeight);
                  img.left =
                    object.left + (object.width - newWidth) - newWidth / 2;
                  img.set("name", "screw-cap3");
                  img.id = 13;

                  img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                  canva.add(img);
                }
              );
            }
            if (selectedShape == "oval" || selectedShape == "rotated-square") {
              fabric.Image.fromURL(
                fixingUrl + "/im_screw-cap.png",
                function (img) {
                  // img.scaleToWidth(object.width);
                  // img.scaleToHeight(object.height);
                  img.scale(fixScale);

                  img.setCoords();
                  var newWidth = img.width * img.scaleX;
                  var newHeight = img.height * img.scaleY;

                  img.top = object.top + (object.height / 2 - newHeight / 2);
                  img.left = object.left + newWidth / 2;
                  img.set("name", "screw-cap1");
                  img.id = 11;

                  img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                  canva.add(img);
                }
              );

              fabric.Image.fromURL(
                fixingUrl + "/im_screw-cap.png",
                function (img) {
                  img.scale(fixScale);

                  img.setCoords();
                  var newWidth = img.width * img.scaleX;
                  var newHeight = img.height * img.scaleY;

                  img.top = object.top + (object.height / 2 - newHeight / 2);
                  img.left =
                    object.left + (object.width - newWidth) - newWidth / 2;
                  img.set("name", "screw-cap2");
                  img.id = 12;

                  img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                  canva.add(img);
                }
              );
            }
            if (selectedShape == "turn-left" || selectedShape == "arrow-left") {
              fabric.Image.fromURL(
                fixingUrl + "/im_screw-cap.png",
                function (img) {
                  // img.scaleToWidth(object.width);
                  // img.scaleToHeight(object.height);
                  img.scale(fixScale);

                  img.setCoords();
                  var newWidth = img.width * img.scaleX;
                  var newHeight = img.height * img.scaleY;

                  img.top = object.top + (object.height / 2 - newHeight / 2);
                  img.left = object.left + newWidth / 2;
                  img.set("name", "screw-cap1");
                  img.id = 11;

                  img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                  canva.add(img);
                }
              );

              fabric.Image.fromURL(
                fixingUrl + "/im_screw-cap.png",
                function (img) {
                  img.scale(fixScale);

                  img.setCoords();
                  var newWidth = img.width * img.scaleX;
                  var newHeight = img.height * img.scaleY;

                  img.top = object.top + (object.height / 2 - newHeight / 2);
                  img.left = object.left + (object.width - newWidth);
                  img.set("name", "screw-cap2");
                  img.id = 12;

                  img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                  canva.add(img);
                }
              );
            }
            if (
              selectedShape == "turn-right" ||
              selectedShape == "arrow-right"
            ) {
              fabric.Image.fromURL(
                fixingUrl + "/im_screw-cap.png",
                function (img) {
                  img.scale(fixScale);

                  img.setCoords();
                  var newWidth = img.width * img.scaleX;
                  var newHeight = img.height * img.scaleY;

                  img.top = object.top + (object.height / 2 - newHeight / 2);
                  img.left = object.left;
                  img.set("name", "screw-cap1");
                  img.id = 11;

                  img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                  canva.add(img);
                }
              );

              fabric.Image.fromURL(
                fixingUrl + "/im_screw-cap.png",
                function (img) {
                  img.scale(fixScale);

                  img.setCoords();
                  var newWidth = img.width * img.scaleX;
                  var newHeight = img.height * img.scaleY;

                  img.top = object.top + (object.height / 2 - newHeight / 2);
                  img.left =
                    object.left + (object.width - newWidth) - newWidth / 2;
                  img.set("name", "screw-cap2");
                  img.id = 12;

                  img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                  canva.add(img);
                }
              );
            }
            if (selectedShape == "stop") {
              fabric.Image.fromURL(
                fixingUrl + "/im_screw-cap.png",
                function (img) {
                  img.scale(fixScale);

                  img.setCoords();
                  var newWidth = img.width * img.scaleX;
                  var newHeight = img.height * img.scaleY;

                  img.top = object.top + (object.height / 2 - newHeight / 2);
                  img.left = object.left;
                  img.set("name", "screw-cap1");
                  img.id = 11;

                  img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                  canva.add(img);
                }
              );

              fabric.Image.fromURL(
                fixingUrl + "/im_screw-cap.png",
                function (img) {
                  img.scale(fixScale);

                  img.setCoords();
                  var newWidth = img.width * img.scaleX;
                  var newHeight = img.height * img.scaleY;

                  img.top = object.top + (object.height / 2 - newHeight / 2);
                  img.left = object.left + (object.width - newWidth);
                  img.set("name", "screw-cap2");
                  img.id = 12;

                  img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                  canva.add(img);
                }
              );
            }
          }
          if (methode == "suction-cup") {
            resetFixing(canva);
            if (
              selectedShape == "square" ||
              selectedShape == "rounded-square" ||
              selectedShape == "rounded-top" ||
              selectedShape == "rounded-sides"
            ) {
              if (sizeRatio == "small") {
                fabric.Image.fromURL(
                  fixingUrl + "/im_suction-cup.png",
                  function (img) {
                    img.scale(fixScale);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top + (object.height / 2 - newHeight / 2);
                    img.left = object.left;
                    img.set("name", "suction-cup1");
                    img.id = 15;

                    img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                    canva.add(img);
                  }
                );

                fabric.Image.fromURL(
                  fixingUrl + "/im_suction-cup.png",
                  function (img) {
                    img.scale(fixScale);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top + (object.height / 2 - newHeight / 2);
                    img.left = object.left + (object.width - newWidth);
                    img.set("name", "suction-cup2");
                    img.id = 16;

                    img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                    canva.add(img);
                  }
                );
              }
              if (sizeRatio == "big") {
                fabric.Image.fromURL(
                  fixingUrl + "/im_suction-cup.png",
                  function (img) {
                    img.scale(fixScale);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top;
                    img.left = object.left;
                    img.set("name", "suction-cup1");
                    img.id = 15;
                    img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                    canva.add(img);
                  }
                );

                fabric.Image.fromURL(
                  fixingUrl + "/im_suction-cup.png",
                  function (img) {
                    img.scale(fixScale);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top;
                    img.left = object.left + (object.width - newWidth);
                    img.set("name", "suction-cup2");
                    img.id = 16;

                    img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                    canva.add(img);
                  }
                );

                fabric.Image.fromURL(
                  fixingUrl + "/im_suction-cup.png",
                  function (img) {
                    img.scale(fixScale);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top + (object.height - newHeight);
                    img.left = object.left;
                    img.set("name", "suction-cup3");
                    img.id = 17;

                    img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                    canva.add(img);
                  }
                );

                fabric.Image.fromURL(
                  fixingUrl + "/im_suction-cup.png",
                  function (img) {
                    img.scale(fixScale);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top + (object.height - newHeight);
                    img.left = object.left + (object.width - newWidth);
                    img.set("name", "suction-cup4");
                    img.id = 18;

                    img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                    canva.add(img);
                  }
                );
              }
            }
            if (selectedShape == "triangle") {
              fabric.Image.fromURL(
                fixingUrl + "/im_suction-cup.png",
                function (img) {
                  img.scale(fixScale);

                  img.setCoords();
                  var newWidth = img.width * img.scaleX;
                  var newHeight = img.height * img.scaleY;

                  img.top = object.top + newHeight / 2;
                  img.left = object.left + (object.width / 2 - newWidth / 2);
                  img.set("name", "suction-cup1");
                  img.id = 15;

                  img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                  canva.add(img);
                }
              );

              fabric.Image.fromURL(
                fixingUrl + "/im_suction-cup.png",
                function (img) {
                  img.scale(fixScale);

                  img.setCoords();
                  var newWidth = img.width * img.scaleX;
                  var newHeight = img.height * img.scaleY;

                  img.top = object.top + (object.height - newHeight);
                  img.left = object.left + newWidth / 2;
                  img.set("name", "suction-cup2");
                  img.id = 16;

                  img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                  canva.add(img);
                }
              );

              fabric.Image.fromURL(
                fixingUrl + "/im_suction-cup.png",
                function (img) {
                  img.scale(fixScale);

                  img.setCoords();
                  var newWidth = img.width * img.scaleX;
                  var newHeight = img.height * img.scaleY;

                  img.top = object.top + (object.height - newHeight);
                  img.left =
                    object.left + (object.width - newWidth) - newWidth / 2;
                  img.set("name", "suction-cup3");
                  img.id = 17;

                  img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                  canva.add(img);
                }
              );
            }
            if (selectedShape == "oval" || selectedShape == "rotated-square") {
              fabric.Image.fromURL(
                fixingUrl + "/im_suction-cup.png",
                function (img) {
                  // img.scaleToWidth(object.width);
                  // img.scaleToHeight(object.height);
                  img.scale(fixScale);

                  img.setCoords();
                  var newWidth = img.width * img.scaleX;
                  var newHeight = img.height * img.scaleY;

                  img.top = object.top + (object.height / 2 - newHeight / 2);
                  img.left = object.left + newWidth / 2;
                  img.set("name", "suction-cup1");
                  img.id = 15;

                  img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                  canva.add(img);
                }
              );

              fabric.Image.fromURL(
                fixingUrl + "/im_suction-cup.png",
                function (img) {
                  img.scale(fixScale);

                  img.setCoords();
                  var newWidth = img.width * img.scaleX;
                  var newHeight = img.height * img.scaleY;

                  img.top = object.top + (object.height / 2 - newHeight / 2);
                  img.left =
                    object.left + (object.width - newWidth) - newWidth / 2;
                  img.set("name", "suction-cup2");
                  img.id = 16;

                  img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                  canva.add(img);
                }
              );
            }
            if (selectedShape == "turn-left" || selectedShape == "arrow-left") {
              fabric.Image.fromURL(
                fixingUrl + "/im_suction-cup.png",
                function (img) {
                  // img.scaleToWidth(object.width);
                  // img.scaleToHeight(object.height);
                  img.scale(fixScale);

                  img.setCoords();
                  var newWidth = img.width * img.scaleX;
                  var newHeight = img.height * img.scaleY;

                  img.top = object.top + (object.height / 2 - newHeight / 2);
                  img.left = object.left + newWidth / 2;
                  img.set("name", "suction-cup1");
                  img.id = 15;

                  img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                  canva.add(img);
                }
              );

              fabric.Image.fromURL(
                fixingUrl + "/im_suction-cup.png",
                function (img) {
                  img.scale(fixScale);

                  img.setCoords();
                  var newWidth = img.width * img.scaleX;
                  var newHeight = img.height * img.scaleY;

                  img.top = object.top + (object.height / 2 - newHeight / 2);
                  img.left = object.left + (object.width - newWidth);
                  img.set("name", "suction-cup2");
                  img.id = 16;

                  img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                  canva.add(img);
                }
              );
            }
            if (
              selectedShape == "turn-right" ||
              selectedShape == "arrow-right"
            ) {
              fabric.Image.fromURL(
                fixingUrl + "/im_suction-cup.png",
                function (img) {
                  img.scale(fixScale);

                  img.setCoords();
                  var newWidth = img.width * img.scaleX;
                  var newHeight = img.height * img.scaleY;

                  img.top = object.top + (object.height / 2 - newHeight / 2);
                  img.left = object.left;
                  img.set("name", "suction-cup1");
                  img.id = 15;

                  img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                  canva.add(img);
                }
              );

              fabric.Image.fromURL(
                fixingUrl + "/im_suction-cup.png",
                function (img) {
                  img.scale(fixScale);

                  img.setCoords();
                  var newWidth = img.width * img.scaleX;
                  var newHeight = img.height * img.scaleY;

                  img.top = object.top + (object.height / 2 - newHeight / 2);
                  img.left =
                    object.left + (object.width - newWidth) - newWidth / 2;
                  img.set("name", "suction-cup2");
                  img.id = 16;

                  img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                  canva.add(img);
                }
              );
            }
            if (selectedShape == "stop") {
              fabric.Image.fromURL(
                fixingUrl + "/im_suction-cup.png",
                function (img) {
                  img.scale(fixScale);

                  img.setCoords();
                  var newWidth = img.width * img.scaleX;
                  var newHeight = img.height * img.scaleY;

                  img.top = object.top + (object.height / 2 - newHeight / 2);
                  img.left = object.left;
                  img.set("name", "suction-cup1");
                  img.id = 15;

                  img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                  canva.add(img);
                }
              );

              fabric.Image.fromURL(
                fixingUrl + "/im_suction-cup.png",
                function (img) {
                  img.scale(fixScale);

                  img.setCoords();
                  var newWidth = img.width * img.scaleX;
                  var newHeight = img.height * img.scaleY;

                  img.top = object.top + (object.height / 2 - newHeight / 2);
                  img.left = object.left + (object.width - newWidth);
                  img.set("name", "suction-cup2");
                  img.id = 16;

                  img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                  canva.add(img);
                }
              );
            }
          }
          if (methode == "standoff") {
            resetFixing(canva);
            if (
              selectedShape == "square" ||
              selectedShape == "rounded-square" ||
              selectedShape == "rounded-top" ||
              selectedShape == "rounded-sides"
            ) {
              if (sizeRatio == "small") {
                fabric.Image.fromURL(
                  fixingUrl + "/im_standoff.png",
                  function (img) {
                    img.scale(fixScale);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top + (object.height / 2 - newHeight / 2);
                    img.left = object.left;
                    img.set("name", "standoff1");
                    img.id = 19;

                    img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                    canva.add(img);
                  }
                );

                fabric.Image.fromURL(
                  fixingUrl + "/im_standoff.png",
                  function (img) {
                    img.scale(fixScale);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top + (object.height / 2 - newHeight / 2);
                    img.left = object.left + (object.width - newWidth);
                    img.set("name", "standoff2");
                    img.id = 20;

                    img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                    canva.add(img);
                  }
                );
              }
              if (sizeRatio == "big") {
                fabric.Image.fromURL(
                  fixingUrl + "/im_standoff.png",
                  function (img) {
                    img.scale(fixScale);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top;
                    img.left = object.left;
                    img.set("name", "standoff1");
                    img.id = 19;
                    img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                    canva.add(img);
                  }
                );

                fabric.Image.fromURL(
                  fixingUrl + "/im_standoff.png",
                  function (img) {
                    img.scale(fixScale);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top;
                    img.left = object.left + (object.width - newWidth);
                    img.set("name", "standoff2");
                    img.id = 20;

                    img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                    canva.add(img);
                  }
                );

                fabric.Image.fromURL(
                  fixingUrl + "/im_standoff.png",
                  function (img) {
                    img.scale(fixScale);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top + (object.height - newHeight);
                    img.left = object.left;
                    img.set("name", "standoff3");
                    img.id = 21;

                    img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                    canva.add(img);
                  }
                );

                fabric.Image.fromURL(
                  fixingUrl + "/im_standoff.png",
                  function (img) {
                    img.scale(fixScale);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top + (object.height - newHeight);
                    img.left = object.left + (object.width - newWidth);
                    img.set("name", "standoff4");
                    img.id = 22;

                    img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                    canva.add(img);
                  }
                );
              }
            }
            if (selectedShape == "triangle") {
              fabric.Image.fromURL(
                fixingUrl + "/im_standoff.png",
                function (img) {
                  img.scale(fixScale);

                  img.setCoords();
                  var newWidth = img.width * img.scaleX;
                  var newHeight = img.height * img.scaleY;

                  img.top = object.top + newHeight / 2;
                  img.left = object.left + (object.width / 2 - newWidth / 2);
                  img.set("name", "standoff1");
                  img.id = 19;

                  img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                  canva.add(img);
                }
              );

              fabric.Image.fromURL(
                fixingUrl + "/im_standoff.png",
                function (img) {
                  img.scale(fixScale);

                  img.setCoords();
                  var newWidth = img.width * img.scaleX;
                  var newHeight = img.height * img.scaleY;

                  img.top = object.top + (object.height - newHeight);
                  img.left = object.left + newWidth / 2;
                  img.set("name", "standoff2");
                  img.id = 20;

                  img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                  canva.add(img);
                }
              );

              fabric.Image.fromURL(
                fixingUrl + "/im_standoff.png",
                function (img) {
                  img.scale(fixScale);

                  img.setCoords();
                  var newWidth = img.width * img.scaleX;
                  var newHeight = img.height * img.scaleY;

                  img.top = object.top + (object.height - newHeight);
                  img.left =
                    object.left + (object.width - newWidth) - newWidth / 2;
                  img.set("name", "standoff3");
                  img.id = 21;

                  img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                  canva.add(img);
                }
              );
            }
            if (selectedShape == "oval" || selectedShape == "rotated-square") {
              fabric.Image.fromURL(
                fixingUrl + "/im_standoff.png",
                function (img) {
                  // img.scaleToWidth(object.width);
                  // img.scaleToHeight(object.height);
                  img.scale(fixScale);

                  img.setCoords();
                  var newWidth = img.width * img.scaleX;
                  var newHeight = img.height * img.scaleY;

                  img.top = object.top + (object.height / 2 - newHeight / 2);
                  img.left = object.left + newWidth / 2;
                  img.set("name", "standoff1");
                  img.id = 19;

                  img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                  canva.add(img);
                }
              );

              fabric.Image.fromURL(
                fixingUrl + "/im_standoff.png",
                function (img) {
                  img.scale(fixScale);

                  img.setCoords();
                  var newWidth = img.width * img.scaleX;
                  var newHeight = img.height * img.scaleY;

                  img.top = object.top + (object.height / 2 - newHeight / 2);
                  img.left =
                    object.left + (object.width - newWidth) - newWidth / 2;
                  img.set("name", "standoff2");
                  img.id = 20;

                  img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                  canva.add(img);
                }
              );
            }
            if (selectedShape == "turn-left" || selectedShape == "arrow-left") {
              fabric.Image.fromURL(
                fixingUrl + "/im_standoff.png",
                function (img) {
                  // img.scaleToWidth(object.width);
                  // img.scaleToHeight(object.height);
                  img.scale(fixScale);

                  img.setCoords();
                  var newWidth = img.width * img.scaleX;
                  var newHeight = img.height * img.scaleY;

                  img.top = object.top + (object.height / 2 - newHeight / 2);
                  img.left = object.left + newWidth / 2;
                  img.set("name", "standoff1");
                  img.id = 19;

                  img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                  canva.add(img);
                }
              );

              fabric.Image.fromURL(
                fixingUrl + "/im_standoff.png",
                function (img) {
                  img.scale(fixScale);

                  img.setCoords();
                  var newWidth = img.width * img.scaleX;
                  var newHeight = img.height * img.scaleY;

                  img.top = object.top + (object.height / 2 - newHeight / 2);
                  img.left = object.left + (object.width - newWidth);
                  img.set("name", "standoff2");
                  img.id = 20;

                  img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                  canva.add(img);
                }
              );
            }
            if (
              selectedShape == "turn-right" ||
              selectedShape == "arrow-right"
            ) {
              fabric.Image.fromURL(
                fixingUrl + "/im_standoff.png",
                function (img) {
                  img.scale(fixScale);

                  img.setCoords();
                  var newWidth = img.width * img.scaleX;
                  var newHeight = img.height * img.scaleY;

                  img.top = object.top + (object.height / 2 - newHeight / 2);
                  img.left = object.left;
                  img.set("name", "standoff1");
                  img.id = 19;

                  img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                  canva.add(img);
                }
              );

              fabric.Image.fromURL(
                fixingUrl + "/im_standoff.png",
                function (img) {
                  img.scale(fixScale);

                  img.setCoords();
                  var newWidth = img.width * img.scaleX;
                  var newHeight = img.height * img.scaleY;

                  img.top = object.top + (object.height / 2 - newHeight / 2);
                  img.left =
                    object.left + (object.width - newWidth) - newWidth / 2;
                  img.set("name", "standoff2");
                  img.id = 20;

                  img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                  canva.add(img);
                }
              );
            }
            if (selectedShape == "stop") {
              fabric.Image.fromURL(
                fixingUrl + "/im_standoff.png",
                function (img) {
                  img.scale(fixScale);

                  img.setCoords();
                  var newWidth = img.width * img.scaleX;
                  var newHeight = img.height * img.scaleY;

                  img.top = object.top + (object.height / 2 - newHeight / 2);
                  img.left = object.left;
                  img.set("name", "standoff1");
                  img.id = 19;

                  img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                  canva.add(img);
                }
              );

              fabric.Image.fromURL(
                fixingUrl + "/im_standoff.png",
                function (img) {
                  img.scale(fixScale);

                  img.setCoords();
                  var newWidth = img.width * img.scaleX;
                  var newHeight = img.height * img.scaleY;

                  img.top = object.top + (object.height / 2 - newHeight / 2);
                  img.left = object.left + (object.width - newWidth);
                  img.set("name", "standoff2");
                  img.id = 20;

                  img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                  canva.add(img);
                }
              );
            }
          }
          if (methode == "flag") {
            resetFixing(canva);
            if (
              selectedShape == "square" ||
              selectedShape == "rounded-square" ||
              selectedShape == "rounded-top" ||
              selectedShape == "rounded-sides" ||
              selectedShape == "turn-right" ||
              selectedShape == "turn-left"
            ) {
              if (sizeRatio == "small") {
                fabric.Image.fromURL(
                  fixingUrl + "/im_flag.png",
                  function (img) {
                    img.scale(fixScale);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top + (object.height / 2 - newHeight / 2);
                    img.left = object.left - newWidth / 2;
                    img.set("name", "flag1");
                    img.id = 23;

                    img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                    canva.add(img);
                    img.bringToFront();
                  }
                );
              }
              if (sizeRatio == "big") {
                fabric.Image.fromURL(
                  fixingUrl + "/im_flag.png",
                  function (img) {
                    img.scale(fixScale);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top + (object.height / 4 - newHeight / 2);
                    img.left = object.left - newWidth / 2;
                    img.set("name", "flag1");
                    img.id = 23;

                    img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                    canva.add(img);
                  }
                );

                fabric.Image.fromURL(
                  fixingUrl + "/im_flag.png",
                  function (img) {
                    img.scale(fixScale);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top =
                      object.top + ((object.height / 4) * 3 - newHeight / 2);
                    img.left = object.left - newWidth / 2;
                    img.set("name", "flag2");
                    img.id = 24;

                    img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                    canva.add(img);
                  }
                );
              }
            }
            if (selectedShape == "oval" || selectedShape == "stop") {
              fabric.Image.fromURL(fixingUrl + "/im_flag.png", function (img) {
                img.scale(fixScale);

                img.setCoords();
                var newWidth = img.width * img.scaleX;
                var newHeight = img.height * img.scaleY;

                img.top = object.top + (object.height / 2 - newHeight / 2);
                img.left = object.left - newWidth / 2;
                img.set("name", "flag1");
                img.id = 23;

                img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                canva.add(img);
                img.bringToFront();
              });
            }
            if (selectedShape == "turn-left") {
              if (sizeRatio == "small") {
                fabric.Image.fromURL(
                  fixingUrl + "/im_flag-left.png",
                  function (img) {
                    img.scale(fixScale);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top + (object.height / 2 - newHeight / 2);
                    img.left = object.left + object.width - newWidth / 2;
                    img.set("name", "flag");
                    img.id = 23;

                    img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                    canva.add(img);
                    img.bringToFront();
                  }
                );
              }
              if (sizeRatio == "big") {
                fabric.Image.fromURL(
                  fixingUrl + "/im_flag-left.png",
                  function (img) {
                    img.scale(fixScale);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top + (object.height / 4 - newHeight / 2);
                    img.left = object.left + object.width - newWidth / 2;
                    img.set("name", "flag1");
                    img.id = 23;

                    img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                    canva.add(img);
                  }
                );

                fabric.Image.fromURL(
                  fixingUrl + "/im_flag-left.png",
                  function (img) {
                    img.scale(fixScale);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top =
                      object.top + ((object.height / 4) * 3 - newHeight / 2);
                    img.left = object.left + object.width - newWidth / 2;
                    img.set("name", "flag2");
                    img.id = 24;

                    img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                    canva.add(img);
                  }
                );
              }
            }
          }
          if (methode == "table-stand") {
            resetFixing(canva);
            if (
              selectedShape == "square" ||
              selectedShape == "rounded-square"
            ) {
              var points = [
                { x: 0, y: 0 },
                { x: -10, y: object.height / 10 },
                { x: object.width + 10, y: object.height / 10 },
                { x: object.width, y: 0 },
              ];
              var tableStand = new fabric.Polygon(points, {
                id: 25,
                left: object.left - 10,
                top: object.top + object.height,
                fill: "grey",
                name: "table-stand",
                selectable: false,
              });
              // tableStand.setGradient('fill', {
              //     x1: 0,
              //     y1: 0,
              //     x2: 0,
              //     y2: 0,
              //     colorStops:{
              //         0: 'red',
              //         0.2: 'green',
              //         0.6: 'purple',
              //         0.8: 'yellow',
              //         1: 'blue'
              //     }
              // });
              canva.add(tableStand);
              tableStand.sendToBack();
            }
          }
          if (methode == "ceiling") {
            resetFixing(canva);
            if (
              selectedShape == "square" ||
              selectedShape == "rounded-square" ||
              selectedShape == "rounded-top" ||
              selectedShape == "rounded-sides"
            ) {
              fabric.Image.fromURL(
                fixingUrl + "/im_ceiling.png",
                function (img) {
                  img.scale(fixScale);

                  img.setCoords();
                  var newWidth = img.width * img.scaleX;
                  var newHeight = img.height * img.scaleY;

                  img.top = object.top - newHeight / 2;
                  img.left = object.left + object.width / 5 - newWidth;
                  img.set("name", "ceiling1");
                  img.id = 26;

                  img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                  canva.add(img);
                }
              );

              fabric.Image.fromURL(
                fixingUrl + "/im_ceiling.png",
                function (img) {
                  img.scale(fixScale);

                  img.setCoords();
                  var newWidth = img.width * img.scaleX;
                  var newHeight = img.height * img.scaleY;

                  img.top = object.top - newHeight / 2;
                  img.left = object.left + (object.width / 5) * 4;
                  img.set("name", "ceiling2");
                  img.id = 27;

                  img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                  canva.add(img);
                }
              );
            }
            if (selectedShape == "oval" || selectedShape == "stop") {
              fabric.Image.fromURL(
                fixingUrl + "/im_ceiling.png",
                function (img) {
                  img.scale(fixScale);

                  img.setCoords();
                  var newWidth = img.width * img.scaleX;
                  var newHeight = img.height * img.scaleY;

                  img.top = object.top - newHeight / 2;
                  img.left = object.left + object.width / 2 - newWidth / 2;
                  img.set("name", "ceiling1");
                  img.id = 26;

                  img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                  canva.add(img);
                }
              );
            }
            if (selectedShape == "turn-left") {
              fabric.Image.fromURL(
                fixingUrl + "/im_ceiling.png",
                function (img) {
                  img.scale(fixScale);

                  img.setCoords();
                  var newWidth = img.width * img.scaleX;
                  var newHeight = img.height * img.scaleY;

                  img.top = object.top - newHeight / 2;
                  img.left = object.left + (object.width / 5) * 3.5 - newWidth;
                  img.set("name", "ceiling1");
                  img.id = 26;

                  img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                  canva.add(img);
                }
              );

              fabric.Image.fromURL(
                fixingUrl + "/im_ceiling.png",
                function (img) {
                  img.scale(fixScale);

                  img.setCoords();
                  var newWidth = img.width * img.scaleX;
                  var newHeight = img.height * img.scaleY;

                  img.top = object.top - newHeight / 2;
                  img.left = object.left + (object.width / 5) * 4;
                  img.set("name", "ceiling2");
                  img.id = 27;

                  img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                  canva.add(img);
                }
              );
            }
            if (selectedShape == "turn-right") {
              fabric.Image.fromURL(
                fixingUrl + "/im_ceiling.png",
                function (img) {
                  img.scale(fixScale);

                  img.setCoords();
                  var newWidth = img.width * img.scaleX;
                  var newHeight = img.height * img.scaleY;

                  img.top = object.top - newHeight / 2;
                  img.left = object.left + object.width / 5 - newWidth;
                  img.set("name", "ceiling1");
                  img.id = 26;

                  img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                  canva.add(img);
                }
              );

              fabric.Image.fromURL(
                fixingUrl + "/im_ceiling.png",
                function (img) {
                  img.scale(fixScale);

                  img.setCoords();
                  var newWidth = img.width * img.scaleX;
                  var newHeight = img.height * img.scaleY;

                  img.top = object.top - newHeight / 2;
                  img.left = object.left + (object.width / 5) * 1.5;
                  img.set("name", "ceiling2");
                  img.id = 27;

                  img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                  canva.add(img);
                }
              );
            }
          }
          if (methode == "hanging") {
            resetFixing(canva);
            if (
              selectedShape == "square" ||
              selectedShape == "rounded-square" ||
              selectedShape == "rounded-top" ||
              selectedShape == "rounded-sides"
            ) {
              if (sizeRatio == "small") {
                var hangingHole = new fabric.Circle({
                  id: 28,
                  radius: object.height * 0.06,
                  fill: "#f5f5f5",
                  left: object.left + object.width / 2 - 15,
                  top: object.top + 15,
                  name: "hanging-hole",
                  strokeWidth: 2,
                  stroke: "grey",
                  selectable: false,
                });
                canva.add(hangingHole);
              }
              if (sizeRatio == "big") {
                var hangingHole1 = new fabric.Circle({
                  id: 28,
                  radius: object.height * 0.03,
                  fill: "#f5f5f5",
                  left: object.left + object.width / 8 - 15,
                  top: object.top + 15,
                  name: "hanging-hole1",
                  strokeWidth: 2,
                  stroke: "grey",
                  selectable: false,
                });
                var hangingHole2 = new fabric.Circle({
                  id: 29,
                  radius: object.height * 0.03,
                  fill: "#f5f5f5",
                  left: object.left + (object.width / 8) * 7 - 15,
                  top: object.top + 15,
                  name: "hanging-hole2",
                  strokeWidth: 2,
                  stroke: "grey",
                  selectable: false,
                });
                canva.add(hangingHole1, hangingHole2);
              }
            }
            if (
              selectedShape == "oval" ||
              selectedShape == "stop" ||
              selectedShape == "triangle" ||
              selectedShape == "rotated-square"
            ) {
              var hangingHole = new fabric.Circle({
                id: 28,
                radius: object.height * 0.04,
                fill: "#f5f5f5",
                left: object.left + object.width / 2 - object.height * 0.04,
                top: object.top + 20,
                name: "hanging-hole",
                strokeWidth: 2,
                stroke: "grey",
                selectable: false,
              });
              canva.add(hangingHole);
            }
          }
          if (methode == "pole-attachment") {
            resetFixing(canva);
            var pole = new fabric.Rect({
              id: 30,
              width: object.width / 4,
              height: object.height * 2,
              top: object.top - object.height / 2,
              left: object.left + object.width / 2 - object.width / 4 / 2,
              fill: "grey",
              strokeWidth: 2,
              stroke: "grey",
              name: "pole",
              selectable: false,
            });
            canva.add(pole);
            pole.sendToBack();
          }
          if (methode == "cable-labeling") {
            resetFixing(canva);
            if (
              selectedShape == "square" ||
              selectedShape == "rounded-square" ||
              selectedShape == "rounded-top" ||
              selectedShape == "rounded-sides"
            ) {
              var cableHole1 = new fabric.Rect({
                id: 31,
                width: object.width * 0.07,
                height: object.height * 0.05,
                top: object.top + object.height / 6 - object.height * 0.05,
                left: object.left + object.width / 7 - object.width * 0.05,
                fill: "#f5f5f5",
                strokeWidth: 2,
                stroke: "grey",
                name: "cable-hole1",

                selectable: false,
              });
              var cableHole2 = new fabric.Rect({
                id: 32,
                width: object.width * 0.07,
                height: object.height * 0.05,
                top: object.top + object.height / 6 - object.height * 0.05,
                left: object.left + (object.width / 7) * 6,
                fill: "#f5f5f5",
                strokeWidth: 2,
                stroke: "grey",
                name: "cable-hole2",
                selectable: false,
              });
              var cableHole3 = new fabric.Rect({
                id: 33,
                width: object.width * 0.07,
                height: object.height * 0.05,
                top:
                  object.top + (object.height / 6) * 5 - object.height * 0.05,
                left: object.left + object.width / 7 - object.width * 0.05,
                fill: "#f5f5f5",
                strokeWidth: 2,
                stroke: "grey",
                name: "cable-hole3",
                selectable: false,
              });
              var cableHole4 = new fabric.Rect({
                id: 34,
                width: object.width * 0.07,
                height: object.height * 0.05,
                top:
                  object.top + (object.height / 6) * 5 - object.height * 0.05,
                left: object.left + (object.width / 7) * 6,
                fill: "#f5f5f5",
                strokeWidth: 2,
                stroke: "grey",
                name: "cable-hole4",
                selectable: false,
              });
              canva.add(cableHole1, cableHole2, cableHole3, cableHole4);
            }
            if (selectedShape == "oval" || selectedShape == "stop") {
              var cableHole1 = new fabric.Rect({
                id: 31,
                width: object.width * 0.07,
                height: object.height * 0.05,
                top: object.top + object.height / 2,
                left: object.left + object.width / 7 - object.width * 0.05,
                fill: "#f5f5f5",
                strokeWidth: 2,
                stroke: "grey",
                name: "cable-hole1",

                selectable: false,
              });
              var cableHole2 = new fabric.Rect({
                id: 32,
                width: object.width * 0.07,
                height: object.height * 0.05,
                top: object.top + object.height / 2,
                left: object.left + (object.width / 7) * 6,
                fill: "#f5f5f5",
                strokeWidth: 2,
                stroke: "grey",
                name: "cable-hole2",
                selectable: false,
              });
              canva.add(cableHole1, cableHole2);
            }
          }
          if (methode == "table-clamp") {
            resetFixing(canva);
            if (
              selectedShape == "square" ||
              selectedShape == "rounded-square" ||
              selectedShape == "rounded-top" ||
              selectedShape == "rounded-sides"
            ) {
              fabric.Image.fromURL(
                fixingUrl + "/im_table-clamp.png",
                function (img) {
                  img.scale(fixScale);

                  img.setCoords();
                  var newWidth = img.width * img.scaleX;
                  var newHeight = img.height * img.scaleY;

                  img.top = object.top + object.height - newHeight / 2;
                  img.left = object.left + object.width / 5 - newWidth;
                  img.set("name", "table-clamp1");
                  img.id = 35;

                  img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                  canva.add(img);
                }
              );

              fabric.Image.fromURL(
                fixingUrl + "/im_table-clamp.png",
                function (img) {
                  img.scale(fixScale);

                  img.setCoords();
                  var newWidth = img.width * img.scaleX;
                  var newHeight = img.height * img.scaleY;

                  img.top = object.top + object.height - newHeight / 2;
                  img.left = object.left + (object.width / 5) * 4;
                  img.set("name", "table-clamp2");
                  img.id = 36;

                  img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                  canva.add(img);
                }
              );
            }
          }
          if (methode == "base-support") {
            resetFixing(canva);
            if (
              selectedShape == "square" ||
              selectedShape == "rounded-square" ||
              selectedShape == "rounded-top" ||
              selectedShape == "rounded-sides"
            ) {
              fabric.Image.fromURL(
                fixingUrl + "/im_base-support-left.png",
                function (img) {
                  img.scale(fixScale);

                  img.setCoords();
                  var newWidth = img.width * img.scaleX;
                  var newHeight = img.height * img.scaleY;

                  img.top = object.top + object.height - newHeight + 5;
                  img.left = object.left + object.width / 5 - newWidth;
                  img.set("name", "base-support1");
                  img.id = 37;

                  img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                  canva.add(img);
                  // img.sendToBack()
                }
              );

              fabric.Image.fromURL(
                fixingUrl + "/im_base-support-right.png",
                function (img) {
                  img.scale(fixScale);

                  img.setCoords();
                  var newWidth = img.width * img.scaleX;
                  var newHeight = img.height * img.scaleY;

                  img.top = object.top + object.height - newHeight + 5;
                  img.left = object.left + (object.width / 5) * 4;
                  img.set("name", "base-support2");
                  img.id = 38;

                  img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                  canva.add(img);
                  // img.sendToBack()
                }
              );
            }
          }
          if (methode == "eyelets") {
            resetFixing(canva);
            if (
              selectedShape == "square" ||
              selectedShape == "rounded-square"
            ) {
              fabric.Image.fromURL(
                fixingUrl + "/im_eyelets.png",
                function (img) {
                  img.scale(0.15);

                  img.setCoords();
                  var newWidth = img.width * img.scaleX;
                  var newHeight = img.height * img.scaleY;

                  img.top = object.top;
                  img.left = object.left;
                  img.flipX = true;
                  img.set("name", "eyelet1");
                  img.id = 39;

                  img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                  canva.add(img);
                }
              );

              fabric.Image.fromURL(
                fixingUrl + "/im_eyelets.png",
                function (img) {
                  img.scale(0.15);

                  img.setCoords();
                  var newWidth = img.width * img.scaleX;
                  var newHeight = img.height * img.scaleY;

                  img.top = object.top;
                  img.left = object.left + object.width - newWidth;
                  img.set("name", "eyelet2");
                  img.id = 40;

                  img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                  canva.add(img);
                }
              );

              fabric.Image.fromURL(
                fixingUrl + "/im_eyelets.png",
                function (img) {
                  img.scale(0.15);

                  img.setCoords();
                  var newWidth = img.width * img.scaleX;
                  var newHeight = img.height * img.scaleY;

                  img.top = object.top + object.height - newHeight;
                  img.left = object.left;
                  img.flipX = true;
                  img.flipY = true;
                  img.set("name", "eyelet3");
                  img.id = 41;

                  img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                  canva.add(img);
                }
              );

              fabric.Image.fromURL(
                fixingUrl + "/im_eyelets.png",
                function (img) {
                  img.scale(0.15);

                  img.setCoords();
                  var newWidth = img.width * img.scaleX;
                  var newHeight = img.height * img.scaleY;

                  img.top = object.top + object.height - newHeight;
                  img.left = object.left + object.width - newWidth;
                  img.flipY = true;
                  img.set("name", "eyelet4");
                  img.id = 42;

                  img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                  canva.add(img);
                }
              );
            }
          }
          if (methode == "keyring") {
            if (
              selectedShape == "square" ||
              selectedShape == "rounded-square" ||
              selectedShape == "rounded-top" ||
              selectedShape == "rounded-sides"
            ) {
              fabric.Image.fromURL(
                fixingUrl + "/im_keyring.png",
                function (img) {
                  img.scale(0.25);

                  img.setCoords();
                  var newWidth = img.width * img.scaleX;
                  var newHeight = img.height * img.scaleY;

                  img.top = object.top - newHeight / 1.4;
                  (img.left = object.left - newWidth / 2.5),
                    // img.flipX = true
                    img.set("name", "keyring");
                  img.id = 44;

                  img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                  canva.add(img);
                }
              );

              var keyringHole = new fabric.Circle({
                id: 43,
                radius: object.height * 0.05,
                fill: "#f5f5f5",
                top: object.top + 13,
                left: object.left + 13,
                name: "keyring-hole",
                strokeWidth: 2,
                stroke: "grey",
                selectable: false,
              });
              canva.add(keyringHole);
            }
            if (selectedShape == "oval" || selectedShape == "stop") {
              fabric.Image.fromURL(
                fixingUrl + "/im_keyring_oval.png",
                function (img) {
                  img.scale(0.25);

                  img.setCoords();
                  var newWidth = img.width * img.scaleX;
                  var newHeight = img.height * img.scaleY;

                  img.top = object.top - newHeight / 1.4;
                  (img.left = object.left + object.width / 2 - newWidth / 2),
                    // img.flipX = true
                    img.set("name", "keyring");
                  img.id = 44;

                  img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                  canva.add(img);
                }
              );

              var newRadius = object.height * 0.05;
              var keyringHole = new fabric.Circle({
                id: 43,
                radius: newRadius,
                fill: "#f5f5f5",
                top: object.top + 15,
                left: object.left + object.width / 2 - newRadius,
                name: "keyring-hole",
                strokeWidth: 2,
                stroke: "grey",
                selectable: false,
              });
              canva.add(keyringHole);
            }
            if (selectedShape == "rotated-square") {
              fabric.Image.fromURL(
                fixingUrl + "/im_keyring_losange.png",
                function (img) {
                  img.scale(0.25);

                  img.setCoords();
                  var newWidth = img.width * img.scaleX;
                  var newHeight = img.height * img.scaleY;

                  img.top = object.top - newHeight / 1.4;
                  (img.left = object.left + object.width / 2 - newWidth / 2),
                    // img.flipX = true
                    img.set("name", "keyring");
                  img.id = 44;

                  img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                  canva.add(img);
                }
              );

              var newRadius = object.height * 0.05;
              var keyringHole = new fabric.Circle({
                id: 43,
                radius: newRadius,
                fill: "#f5f5f5",
                top: object.top + 15,
                left: object.left + object.width / 2 - newRadius,
                name: "keyring-hole",
                strokeWidth: 2,
                stroke: "grey",
                selectable: false,
              });
              canva.add(keyringHole);
            }
            if (selectedShape == "triangle") {
              fabric.Image.fromURL(
                fixingUrl + "/im_keyring_triangle.png",
                function (img) {
                  img.scale(0.25);

                  img.setCoords();
                  var newWidth = img.width * img.scaleX;
                  var newHeight = img.height * img.scaleY;

                  img.top = object.top + object.height / 10 - newHeight / 1.2;
                  (img.left = object.left + object.width / 2 - newWidth / 2),
                    // img.flipX = true
                    img.set("name", "keyring");
                  img.id = 44;

                  img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                  canva.add(img);
                }
              );

              var newRadius = object.height * 0.05;
              var keyringHole = new fabric.Circle({
                id: 43,
                radius: newRadius,
                fill: "#f5f5f5",
                top: object.top + object.height / 10,
                left: object.left + object.width / 2 - newRadius,
                name: "keyring-hole",
                strokeWidth: 2,
                stroke: "grey",
                selectable: false,
              });
              canva.add(keyringHole);
            }
          }
          if (methode == "s-hook") {
            if (
              selectedShape == "square" ||
              selectedShape == "rounded-square" ||
              selectedShape == "rounded-top" ||
              selectedShape == "rounded-sides" ||
              selectedShape == "oval" ||
              selectedShape == "stop"
            ) {
              fabric.Image.fromURL(
                fixingUrl + "/im_s-hook.png",
                function (img) {
                  img.scale(0.6);

                  img.setCoords();
                  var newWidth = img.width * img.scaleX;
                  var newHeight = img.height * img.scaleY;

                  img.top = object.top - newHeight / 1.4;
                  (img.left = object.left + object.width / 2 - newWidth / 2),
                    // img.flipX = true
                    img.set("name", "s-hook");
                  img.id = 45;

                  img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                  canva.add(img);
                }
              );

              var newRadius = object.height * 0.05;
              var keyringHole = new fabric.Circle({
                id: 46,
                radius: newRadius,
                fill: "#f5f5f5",
                top: object.top + object.height / 25,
                left: object.left + object.width / 2 - newRadius,
                name: "s-hook-hole",
                strokeWidth: 2,
                stroke: "grey",
                selectable: false,
              });
              canva.add(keyringHole);
            }
            if (selectedShape == "rotated-square") {
              fabric.Image.fromURL(
                fixingUrl + "/im_s-hook_losange.png",
                function (img) {
                  img.scale(0.6);

                  img.setCoords();
                  var newWidth = img.width * img.scaleX;
                  var newHeight = img.height * img.scaleY;

                  img.top = object.top - newHeight / 1.5;
                  (img.left = object.left + object.width / 2 - newWidth / 1.9),
                    // img.flipX = true
                    img.set("name", "s-hook");
                  img.id = 45;

                  img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                  canva.add(img);
                }
              );

              var newRadius = object.height * 0.05;
              var keyringHole = new fabric.Circle({
                id: 46,
                radius: newRadius,
                fill: "#f5f5f5",
                top: object.top + object.height / 15,
                left: object.left + object.width / 2 - newRadius,
                name: "s-hook-hole",
                strokeWidth: 2,
                stroke: "grey",
                selectable: false,
              });
              canva.add(keyringHole);
            }
            if (selectedShape == "triangle") {
              fabric.Image.fromURL(
                fixingUrl + "/im_s-hook_triangle.png",
                function (img) {
                  img.scale(0.6);

                  img.setCoords();
                  var newWidth = img.width * img.scaleX;
                  var newHeight = img.height * img.scaleY;

                  img.top = object.top - newHeight / 1.6;
                  (img.left = object.left + object.width / 2 - newWidth / 1.9),
                    // img.flipX = true
                    img.set("name", "s-hook");
                  img.id = 45;

                  img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                  canva.add(img);
                }
              );

              var newRadius = object.height * 0.05;
              var keyringHole = new fabric.Circle({
                id: 46,
                radius: newRadius,
                fill: "#f5f5f5",
                top: object.top + object.height / 10,
                left: object.left + object.width / 2 - newRadius,
                name: "s-hook-hole",
                strokeWidth: 2,
                stroke: "grey",
                selectable: false,
              });
              canva.add(keyringHole);
            }
          }
          if (methode == "roll-up") {
            if (selectedShape == "square") {
              fabric.Image.fromURL(
                fixingUrl + "/im_roll-up_top.png",
                function (img) {
                  var scaleX = object.width / img.width;
                  img.scaleX = scaleX;

                  img.setCoords();
                  var newWidth = img.width * img.scaleX;
                  var newHeight = img.height * img.scaleY;

                  img.top = object.top - newHeight;
                  img.left = object.left;
                  img.set("name", "roll-up-top");
                  img.id = 47;

                  img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                  canva.add(img);
                }
              );
              fabric.Image.fromURL(
                fixingUrl + "/im_roll-up_bottom.jpg",
                function (img) {
                  var scaleX = object.width / img.width;
                  img.scaleX = scaleX;

                  img.setCoords();
                  var newWidth = img.width * img.scaleX;
                  var newHeight = img.height * img.scaleY;

                  img.top = object.top + object.height;
                  img.left = object.left;
                  img.set("name", "roll-up-bottom");
                  img.id = 48;

                  img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                  canva.add(img);
                }
              );
            }
          }
          if (methode == "sign-holder") {
            if (selectedShape == "square") {
              fabric.Image.fromURL(
                fixingUrl + "/im_sign-holder.png",
                function (img) {
                  var scaleX = object.width / img.width;
                  img.scaleX = scaleX;

                  img.setCoords();
                  var newWidth = img.width * img.scaleX;
                  var newHeight = img.height * img.scaleY;

                  img.top = object.top - newHeight + newHeight / 2;
                  img.left = object.left;
                  img.set("name", "sign-holder-top");
                  img.id = 47;

                  img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                  canva.add(img);
                }
              );
              fabric.Image.fromURL(
                fixingUrl + "/im_sign-holder.png",
                function (img) {
                  var scaleX = object.width / img.width;
                  img.scaleX = scaleX;

                  img.setCoords();
                  var newWidth = img.width * img.scaleX;
                  var newHeight = img.height * img.scaleY;

                  img.top = object.top + object.height - newHeight / 2;
                  img.left = object.left;
                  img.flipY = true;
                  img.set("name", "sign-holder-bottom");
                  img.id = 48;

                  img.selectable = false;
                    img.objectType = "aso-fixingMethods";
                  canva.add(img);
                }
              );
            }
          }
        }
      }
      if (object.type === "line") {
        object.bringToFront();
      }
    });
    canva.renderAll();
  }

  setFixing(canvas);
  setFixing(backCanvas);
  // if(firstLoad){
  // }

  // setTimeout(function() {
  //     // Comptez le nombre d'objets sur le canvas
  //     var nombreObjets = canvas.getObjects().filter(objet => objet.name === 'standoff1');

  //     // console.log("Nombre d'objets après ajout :", nombreObjets);
  // }, 100);
  if (readyToSave) {
    updateModifications(true, "selection de fixing");
  }
}

// fonctions concernant l'ajout de text à la sign
function getTextValueToUnit(
  container,
  objWidht,
  objHeight,
  objLeft,
  objTop,
  angle
) {
  var textWidth = document.getElementById("text-width");
  var textHeight = document.getElementById("text-height");
  var textLeft = document.getElementById("text-left");
  var textRight = document.getElementById("text-right");
  var textTop = document.getElementById("text-top");
  var textBottom = document.getElementById("text-bottom");
  var textAngle = document.getElementById("text-angle");

  var imageWidth = document.getElementById("image-width");
  var imageHeight = document.getElementById("image-height");

  var activeObject = canvas.getActiveObject();

  if (ratioScale == 2) {
    if (container.height == 370) {
      // console.log('container here', 'firstHeight',firstHeight,'preWidth', preWidth )
      var radio = firstHeight / 370;
      var radio1 = preWidth / 1000;

      var newWidth = objWidht * radio;
      newWidth = newWidth * radio1;

      var newHeight = objHeight * radio;
      newHeight = newHeight * radio1;

      var left = objLeft * radio;
      left = left * radio1;

      var right =
        currentSize.width -
        (convertFromPx(left, currentUnit) +
          convertFromPx(newWidth, currentUnit));
      // var right = objRight * radio
      // right = right * radio1

      var top = objTop * radio;
      top = top * radio1;

      var bottom =
        currentSize.height -
        (convertFromPx(top, currentUnit) +
          convertFromPx(newHeight, currentUnit));

      textWidth.textContent = parseInt(convertFromPx(newWidth, currentUnit));
      textHeight.textContent = parseInt(convertFromPx(newHeight, currentUnit));
      textLeft.textContent = parseInt(convertFromPx(left, currentUnit));
      textRight.textContent = parseInt(right);
      // textRight.textContent = parseInt(convertFromPx(right, currentUnit))
      textTop.textContent = parseInt(convertFromPx(top, currentUnit));
      textBottom.textContent = parseInt(bottom);
      textAngle.textContent = parseInt(angle);

      if (
        activeCanvas.getActiveObject() &&
        activeCanvas.getActiveObject().type == "image"
      ) {
        imageWidth.textContent = parseInt(convertFromPx(newWidth, currentUnit));
        imageHeight.textContent = parseInt(
          convertFromPx(newHeight, currentUnit)
        );
      }
    }
    if (container.width == 1000) {
      var radio = firstWidth / 1000;
      var radio1 = preHeight / 370;

      var newWidth = objWidht * radio;
      newWidth = newWidth * radio1;

      var newHeight = objHeight * radio;
      newHeight = newHeight * radio1;

      var left = objLeft * radio;
      left = left * radio1;

      var right =
        currentSize.width -
        (convertFromPx(left, currentUnit) +
          convertFromPx(newWidth, currentUnit));

      var top = objTop * radio;
      top = top * radio1;

      var bottom =
        currentSize.height -
        (convertFromPx(top, currentUnit) +
          convertFromPx(newHeight, currentUnit));

      // if(activeObject.type === 'i-text'){
      //     selectedText.width = parseInt(convertFromPx(newWidth, currentUnit))
      //     selectedText.height = parseInt(convertFromPx(newHeight, currentUnit))
      //     selectedText.left = parseInt(convertFromPx(left, currentUnit))
      //     selectedText.right = right
      //     selectedText.top = convertFromPx(top, currentUnit)
      //     selectedText.bottom = bottom
      // }if(activeObject.type == 'image'){
      //     selectedImage.width = parseInt(convertFromPx(newWidth, currentUnit))
      //     selectedImage.height = parseInt(convertFromPx(newHeight, currentUnit))
      //     selectedImage.left = parseInt(convertFromPx(left, currentUnit))
      //     selectedImage.right = right
      //     selectedImage.top = convertFromPx(top, currentUnit)
      //     selectedImage.bottom = bottom

      // }

      textWidth.textContent = parseInt(convertFromPx(newWidth, currentUnit));
      textHeight.textContent = parseInt(convertFromPx(newHeight, currentUnit));
      textLeft.textContent = parseInt(convertFromPx(left, currentUnit));
      textRight.textContent = parseInt(right);
      textTop.textContent = parseInt(convertFromPx(top, currentUnit));
      textBottom.textContent = parseInt(bottom);
      textAngle.textContent = parseInt(angle);

      if (
        activeCanvas.getActiveObject() &&
        activeCanvas.getActiveObject().type == "image"
      ) {
        imageWidth.textContent = parseInt(convertFromPx(newWidth, currentUnit));
        imageHeight.textContent = parseInt(
          convertFromPx(newHeight, currentUnit)
        );
      }
    }
  }

  if (ratioScale == 1) {
    if (container.height == 370) {
      var radio = preHeight / 370;

      var newWidth = objWidht * radio;

      var newHeight = objHeight * radio;

      var left = objLeft * radio;

      var right =
        currentSize.width -
        (convertFromPx(left, currentUnit) +
          convertFromPx(newWidth, currentUnit));

      var top = objTop * radio;

      var bottom =
        currentSize.height -
        (convertFromPx(top, currentUnit) +
          convertFromPx(newHeight, currentUnit));

      textWidth.textContent = parseInt(convertFromPx(newWidth, currentUnit));
      textHeight.textContent = parseInt(convertFromPx(newHeight, currentUnit));
      textLeft.textContent = parseInt(convertFromPx(left, currentUnit));
      textRight.textContent = parseInt(right);
      textTop.textContent = parseInt(convertFromPx(top, currentUnit));
      textBottom.textContent = parseInt(bottom);
      textAngle.textContent = parseInt(angle);

      if (
        activeCanvas.getActiveObject() &&
        activeCanvas.getActiveObject().type == "image"
      ) {
        imageWidth.textContent = parseInt(convertFromPx(newWidth, currentUnit));
        imageHeight.textContent = parseInt(
          convertFromPx(newHeight, currentUnit)
        );
      }
    }
    if (container.width == 1000) {
      var radio = preWidth / 1000;

      var newWidth = objWidht * radio;

      var newHeight = objHeight * radio;

      var left = objLeft * radio;

      var right =
        currentSize.width -
        (convertFromPx(left, currentUnit) +
          convertFromPx(newWidth, currentUnit));

      var top = objTop * radio;

      var bottom =
        currentSize.height -
        (convertFromPx(top, currentUnit) +
          convertFromPx(newHeight, currentUnit));

      textWidth.textContent = parseInt(convertFromPx(newWidth, currentUnit));
      textHeight.textContent = parseInt(convertFromPx(newHeight, currentUnit));
      textLeft.textContent = parseInt(convertFromPx(left, currentUnit));
      textRight.textContent = parseInt(right);
      textTop.textContent = parseInt(convertFromPx(top, currentUnit));
      textBottom.textContent = parseInt(bottom);
      textAngle.textContent = parseInt(angle);

      if (
        activeCanvas.getActiveObject() &&
        activeCanvas.getActiveObject().type == "image"
      ) {
        imageWidth.textContent = parseInt(convertFromPx(newWidth, currentUnit));
        imageHeight.textContent = parseInt(
          convertFromPx(newHeight, currentUnit)
        );
      }
    }
  }

  return {
    width: parseInt(convertFromPx(newWidth, currentUnit)),
    height: parseInt(convertFromPx(newHeight, currentUnit)),
    left: parseInt(convertFromPx(left, currentUnit)),
    right: parseInt(right),
    // right: parseInt(convertFromPx(right, currentUnit)),
    top: parseInt(convertFromPx(top, currentUnit)),
    bottom: parseInt(bottom),
  };
}
//function for get added text value
var selectedText = {
  object: {},
  color: "",
  width: "",
  height: "",
  left: "",
  right: "",
  top: "",
  bottom: "",
  value: "",
  align: "",
  font: "",
  size: "",
  weight: "normal",
  style: "",
  underline: false,
  linethrough: false,
  overline: false,
};

function handleGetAddedTextValues(transform) { 
  var container = handleGetObjectByName("safeObject");
  if (transform.type == "i-text") {
    var obj = transform;
    obj.setCoords();
    var objWidht = obj.width * obj.scaleX;
    var objHeight = obj.height * obj.scaleY;

    // Calculer les limites de l'objet
    var objBounds = obj.getBoundingRect();

    // Récupérer les coins de l'objet
    var objLeft = objBounds.left;
    var objTop = objBounds.top;

    // Calculer par rapport aux dimensions du container
    var objLeftInContainer = obj.left - objWidht / 2 - container.left;
    var objRightInContainer = container.width - (objLeftInContainer + objWidht);
    var objTopInContainer = obj.top - objHeight / 2 - container.top;
    var objBottomInContainer =
      container.height - (objTopInContainer + objHeight);

    selectedText.object = obj;
    selectedText.value = obj.text;
    selectedText.align = obj.textAlign;
    selectedText.font = obj.fontFamily;
    selectedText.size = obj.scaleX;
    selectedText.weight = obj.fontWeight;
    selectedText.style = obj.fontStyle;
    selectedText.underline = obj.underline;
    selectedText.linethrough = obj.linethrough;
    selectedText.overline = obj.overline;

    var textEditor = document.getElementById("aso-text-editor");
    textEditor.value = selectedText.value;
    var sizeEditor = document.getElementById("aso-text-size");
    sizeEditor.value = parseInt(selectedText.size * 12);

    // formule pour obtenir le Right in the sign [((container.left + container.width)-((obj.left-(objWidht/2))+objWidht))]
    getTextValueToUnit(
      container,
      objWidht,
      objHeight,
      objLeftInContainer,
      objTopInContainer
    );

    handleCalcTextPrice();
  } else {
    var obj = transform.target;
    var newCoord = obj.getCoords();

    var objWidht = obj.width * obj.scaleX;
    var objHeight = obj.height * obj.scaleY;

    var objBounds = obj.getBoundingRect();

    var objLeft = objBounds.left;
    var objTop = objBounds.top;

    obj.setCoords();
    // obj.set('left', container.left)
    // canvas.renderAll()

    var objLeftInContainer = obj.left - objWidht / 2 - container.left;
    var objRightInContainer = container.width - (objLeftInContainer + objWidht);
    var objTopInContainer = obj.top - objHeight / 2 - container.top;
    var objBottomInContainer =
      container.height - (objTopInContainer + objHeight);

    if (obj.type == "i-text") {
      selectedText.object = obj;
      selectedText.value = obj.text;
      selectedText.align = obj.textAlign;
      selectedText.font = obj.fontFamily;
      selectedText.size = obj.scaleX;
      selectedText.weight = obj.fontWeight;
      selectedText.style = obj.fontStyle;
      selectedText.underline = obj.underline;
      selectedText.linethrough = obj.linethrough;
      selectedText.overline = obj.overline;

      getTextValueToUnit(
        container,
        objWidht,
        objHeight,
        objLeftInContainer,
        objTopInContainer
      );
    }
    handleCalcTextPrice();

    var textEditor = document.getElementById("aso-text-editor");
    textEditor.value = selectedText.value;
    var sizeEditor = document.getElementById("aso-text-size");
    sizeEditor.value = parseInt(selectedText.size + 12);
  }
  // console.log('container-left',parseInt(container.left), 'object-left',parseInt((obj.left-(objWidht/2))), 'object-left in sign', parseInt(((obj.left-(objWidht/2))) - (container.left)), 'object-right in sign', parseInt((container.left + container.width)-((obj.left-(objWidht/2))+objWidht)))
  // console.log('container-width',parseInt(container.width), 'object-widht',parseInt((objWidht)))
  // console.log('container-height',parseInt(container.height), 'object-height',parseInt((objHeight)))
  // console.log(selectedText.value, textEditor.value)
  return getTextValueToUnit(
    container,
    objWidht,
    objHeight,
    objLeftInContainer,
    objTopInContainer
  );
}

let newId = 49;

var addedTexts = [];
var faceTextCharCount = 0;
var backTextCharCount = 0;
function resizeText(textObject) {
  frontTextCharLength = sumOptionsPrice(FtextObjects, "text").length;
  backTextCharLength = sumOptionsPrice(BtextObjects, "text").length;

  var totalCharacters = 0;

  if (
    maxTextCharForSize !== -1 &&
    ((activeSignFace === "back" && backTextCharLength > maxTextCharForSize) ||
      (activeSignFace === "front" && maxTextCharForSize < frontTextCharLength))
  ) {
    if (activeSignFace === "front") {
      totalCharacters = frontTextCharLength;
    }
    if (activeSignFace === "back") {
      totalCharacters = backTextCharLength;
    }

    let charsToRemove = totalCharacters - maxTextCharForSize;

    activeCanvas.discardActiveObject();
    activeCanvas.remove(textObject);

    // Supprimer les caractères en trop de cet objet
    textObject.text = textObject.text.slice(
      0,
      textObject.text.length - charsToRemove
    );
    textObject.set("text", textObject.text);

    activeCanvas.add(textObject);

    charsToRemove = 0;
    activeCanvas.renderAll();
    textObject.set("scaleX", textObject.scaleX + 0.001);
    textObject.set("scaleY", textObject.scaleY + 0.001);
    activeCanvas.renderAll();
    handleGetAddedTextValues(textObject);
    // break;
  }
}
function reScaleText(textObject) {
  if (
    textObject.scaleX * 12 > maxTextSize ||
    textObject.scaleY * 12 > maxTextSize
  ) {
    textObject.scaleX = maxTextSize / 12;
    textObject.scaleY = maxTextSize / 12;
  }
  if (
    textObject.scaleX * 12 < minTextSize ||
    textObject.scaleX * 12 < minTextSize
  ) {
    textObject.scaleX = minTextSize / 12;
    textObject.scaleY = minTextSize / 12;
  }
  activeCanvas.renderAll();
}
function handleAddTextToSign(clone) {
  if (
    maxTextCharForSize === -1 ||
    (activeSignFace === "back" && backTextCharLength < maxTextCharForSize) ||
    (activeSignFace === "front" && maxTextCharForSize > frontTextCharLength)
  ) {
    if (clone) {
      var cloneCanvas = clone.canvas;

      var text1JSON = clone.toJSON();
      // console.log(text1JSON)
      delete text1JSON.evented;

      var text2 = new fabric.IText(text1JSON.text, {
        id: (newId += 1),
        name: "aso-SignText",
        canvasName: activeCanvas.name,
        evented: true,
        editable: true,
        scaleX: text1JSON.scaleX,
        scaleY: text1JSON.scaleY,
        top: text1JSON.top,
        left: text1JSON.left,
        // fontSize: text1JSON.fontSize,
        underline: text1JSON.underline,
        linethrough: text1JSON.linethrough,
        overline: text1JSON.overline,
        fill: text1JSON.fill,
        textAlign: text1JSON.textAlign,
        fontFamily: text1JSON.fontFamily,
        fontWeight: text1JSON.fontWeight,
        fontStyle: text1JSON.fontStyle,
        uniScaleTransform: true,
        centeredScaling: true,
        lockScalingFlip: true,
        originX: "center",
        originY: "center",
        // clipPath: handleClipAddedObject(activeCanvas),
        // mouseUpHandler: handleGetAddedTextValues,
      });
      text2.lockMoving = {
        x: false,
        y: false,
      }
      text2.lockScale = false

      text2.set("canvas", cloneCanvas);

      text2.on("editing:entered", () => {
        handleGetAddedTextValues(text2);
      });
      text2.on("editing:exited", () => {
        handleGetAddedTextValues(text2);
        resizeText(text2);
      });
      text2.on("selected", () => {
        handleGetAddedTextValues(text2);
      });
      text2.on("mousedown", function () {
        handleGetAddedTextValues(text2);
        reScaleText(text2);
      });
      text2.on("mouseup", function () {
        handleGetAddedTextValues(text2);
        reScaleText(text2);
      });

      activeCanvas.add(text2);
      addedTexts.push(text2);
      activeCanvas.setActiveObject(text2);
      // lockToCanvas(text2)
    } else {
      var sign = handleGetObjectByName("safeObject");
      var newText = new fabric.IText("", {
        id: (newId += 1),
        name: "aso-SignText",
        canvasName: activeCanvas.name,
        // editable: true,
        selectOnEdit: false,
        top: sign.top + sign.height / 3,
        left: sign.left + sign.width / 3,
        fill: currentSignTextColor,
        fontFamily: currenTextFontFam,
        // fontSize: defaultFontSize,
        scaleX: defaultFontSize / 12,
        scaleY: defaultFontSize / 12,
        uniScaleTransform: true,
        centeredScaling: true,
        lockScalingFlip: true,
        evented: true,
        showITextBorder: true,
        // clipPath: handleClipAddedObject(activeCanvas),

        originX: "center",
        originY: "center",

        renderControls: false,
        // path: new fabric.Path('M 0 0 C 50 -100 150 -100 200 0', {
        //     strokeWidth: 1,
        //     visible: false
        // }),
        // pathSide: 'left',
        // pathStartOffset: 0
        // minScaleLimit: 0.3
      });
      newText.lockMoving = {
        x: false,
        y: false,
      }
      newText.lockScale = false

      newText.on("editing:entered", () => {
        handleGetAddedTextValues(newText);
      });

      newText.on("editing:exited", () => {
        handleGetAddedTextValues(newText);
        resizeText(newText);
      });
      newText.on("selected", () => {
        handleGetAddedTextValues(newText);
      });
      newText.on("mousedown", function () {
        handleGetAddedTextValues(newText);
        reScaleText(newText);
      });
      newText.on("mouseup", function () {
        handleGetAddedTextValues(newText);
        reScaleText(newText);
      });

      activeCanvas.add(newText);
      newText.enterEditing();

      handleChangeTextFontFam(currenTextFontFam.replaceAll(/\s+/g, '-'))

      handleCenterHorizontally(newText);
      handleCenterVertically(newText);

      addedTexts.push(newText);
      // lockToCanvas(newText)
    }
    activeCanvas.renderAll();
    updateModifications(true, "==ajout de text==");
  }

  FtextObjects = handleGetTextObjects1("aso-SignText");
  BtextObjects = handleGetTextObjects2("aso-SignText");

  frontTextCharLength = sumOptionsPrice(FtextObjects, "text").length;
  backTextCharLength = sumOptionsPrice(BtextObjects, "text").length;
  // if(backTextCharLength === undefined){
  //     backTextCharLength = 0
  // }

  handleCalcTextPrice();

  return addedTexts;
}

var frontTextCharLength = 0;
var backTextCharLength = 0;
function sumOptionsPrice(arr, key) {
  return arr.reduce((sum, obj) => sum + obj[key], "");
}
function handleChangeTextValue(event) {
  var editor = document.getElementById("aso-text-editor");
  console.log(maxTextCharForSize, "current max character", frontTextCharLength);

  var currentText = selectedText.object;
  if (
    maxTextCharForSize === -1 ||
    (activeSignFace === "back" && backTextCharLength < maxTextCharForSize) ||
    (activeSignFace === "front" && maxTextCharForSize > frontTextCharLength)
  ) {
    selectedText.value = event.target.value;
    currentText.set("text", String(selectedText.value));
    activeCanvas.requestRenderAll();
    handleGetAddedTextValues(currentText);

    // currentText.exitEditing();
  } else {
    if (event.inputType === "insertText") {
      event.target.value = selectedText.value;
      event.preventDefault();
    } else if (event.inputType === "deleteContentBackward") {
      // editor.disabled = false;
      selectedText.value = event.target.value;
      currentText.set("text", String(selectedText.value));
      activeCanvas.requestRenderAll();
      handleGetAddedTextValues(currentText);

      // currentText.exitEditing();
    }
  }
  // FtextObjects = handleGetTextObjects1('aso-SignText')
  // BtextObjects = handleGetTextObjects2('aso-SignText')

  frontTextCharLength = sumOptionsPrice(FtextObjects, "text").length;
  backTextCharLength = sumOptionsPrice(BtextObjects, "text").length;
  // if(backTextCharLength === undefined){
  //     backTextCharLength = 0
  // }

  // console.log(frontTextCharLength, "frontTextCharLength")
}
function handleChangeTextAlign(align) {
  var currentText = selectedText.object;
  currentText.set("textAlign", align);
  activeCanvas.requestRenderAll();
  selectedText.align = currentText.textAlign;
  handleGetAddedTextValues(currentText);

  return selectedText.align;
}
function handleChangeTextWeight() {
  var currentText = selectedText.object;
  if (selectedText.weight == "normal") {
    currentText.set("fontWeight", "bold");
  } else if (selectedText.weight == "bold") {
    currentText.set("fontWeight", "normal");
  }
  console.log("current");
  activeCanvas.renderAll();
  handleGetAddedTextValues(currentText);

  return selectedText.weight;
}
function handleChangeTextStyle() {
  var currentText = selectedText.object;
  if (selectedText.style == "normal") {
    currentText.set("fontStyle", "italic");
  } else if (selectedText.style == "italic") {
    currentText.set("fontStyle", "normal");
  }
  activeCanvas.requestRenderAll();
  handleGetAddedTextValues(currentText);

  return selectedText.style;
}
var minTextSize = 0;
var maxTextSize = 0;
function handleChangeTextSize(size, minSize, maxSize) {
  if (size < maxSize || size > minSize) {
    selectedText.size = size;

    var currentText = selectedText.object;
    currentText.set("scaleX", selectedText.size / 12);
    currentText.set("scaleY", selectedText.size / 12);
    activeCanvas.renderAll();
    handleGetAddedTextValues(currentText);
  }
}
var currenTextFontFam = "";
function handleChangeTextFontFam(font) {
  var currentText = selectedText.object;
  currentText.set("fontFamily", font);
  activeCanvas.renderAll();

  handleGetAddedTextValues(currentText);
}
function handleChangeTextColor(color) {
  var currentText = selectedText.object;
  selectedText.color = color;
  currentText.set("fill", color);
  activeCanvas.renderAll();
  handleGetAddedTextValues(currentText);

  return selectedText.color;
}
function handleUnderlineText(color) {
  var currentText = selectedText.object;
  if (selectedText.underline == false) {
    currentText.set("underline", true);
  } else if (selectedText.underline == true) {
    currentText.set("underline", false);
  }
  activeCanvas.requestRenderAll();
  handleGetAddedTextValues(currentText);

  return selectedText.underline;
}
function handleCrossText(color) {
  var currentText = selectedText.object;
  if (selectedText.linethrough == false) {
    currentText.set("linethrough", true);
  } else if (selectedText.linethrough == true) {
    currentText.set("linethrough", false);
  }
  activeCanvas.requestRenderAll();
  handleGetAddedTextValues(currentText);

  return selectedText.linethrough;
}
function handleOverlineText(color) {
  var currentText = selectedText.object;
  if (selectedText.overline == false) {
    currentText.set("overline", true);
  } else if (selectedText.overline == true) {
    currentText.set("overline", false);
  }
  activeCanvas.requestRenderAll();
  handleGetAddedTextValues(currentText);

  return selectedText.overline;
}

// fonctions concernant l'ajout d'image sur le canvas
var selectedImage = {
  object: {},
  width: "",
  height: "",
  left: "",
  right: "",
  top: "",
  bottom: "",
  angle: 0,
  filters: [],
};
var imageSettings = {};
function handleGetImageSettings(settings) {
  imageSettings = settings;
}
function handleGetAddedImageValues(object) {
  var container = handleGetObjectByName("safeObject");
  var newCoord = object.getCoords();
  // var objWidht = (newCoord[1].x - newCoord[0].x)
  // var objHeight = (newCoord[3].y - newCoord[0].y)

  object.setCoords();
  var objWidht = object.width * object.scaleX;
  var objHeight = object.height * object.scaleY;

  var objBounds = object.getBoundingRect();

  // Récupérer les coins de l'objet
  var objLeft = objBounds.left;
  var objTop = objBounds.top;

  // Calculer par rapport aux dimensions du container
  var objLeftInContainer = object.left - objWidht / 2 - container.left;
  var objRightInContainer = container.width - (objLeftInContainer + objWidht);
  var objTopInContainer = object.top - objHeight / 2 - container.top;
  var objBottomInContainer = container.height - (objTopInContainer + objHeight);

  selectedImage.width = parseInt(objWidht);
  selectedImage.height = parseInt(objHeight);
  selectedImage.left = parseInt(objLeftInContainer);
  selectedImage.right = objRightInContainer;
  selectedImage.top = parseInt(objTopInContainer);
  selectedImage.bottom = parseInt(objBottomInContainer);
  selectedImage.angle = parseInt(object.angle);

  getTextValueToUnit(
    container,
    objWidht,
    objHeight,
    objLeftInContainer,
    objTopInContainer,
    object.angle
  );
  // console.log('container-left',parseInt(container.left), 'object-left',parseInt((object.left-(objWidht/2))), 'object-left in sign', parseInt(((object.left-(objWidht/2))) - (container.left)), 'object-right in sign', parseInt((container.left + container.width)-((object.left-(objWidht/2))+objWidht)))
  // console.log('container-width',parseInt(container.width), 'object-widht',parseInt((objWidht)))
  // console.log('container-height',parseInt(container.height), 'object-height',parseInt((objHeight)))

  return getTextValueToUnit(
    container,
    objWidht,
    objHeight,
    objLeftInContainer,
    objTopInContainer,
    object.angle
  );
}
var addedImages = [];
function handleAddImageToSign(image, imageId, price) {
  function isSVGImage(image) {
      var src = image;
      return src.endsWith('.svg') || src.startsWith('data:image/svg+xml');
  }
  function useImage(imgUrl, imgId, price) {
    if(isSVGImage(imgUrl)){
      fabric.loadSVGFromURL(imgUrl, function (image) {
        const img = fabric.util.groupSVGElements(image);

        img.scale(0.4);
  
        img.setCoords();
        var newWidth = img.width * img.scaleX;
        var newHeight = img.height * img.scaleY;
  
        img.top = sign.top + sign.height / 2;
        img.left = sign.left + sign.width / 2;
        // img.flipX = true
        img.uniScaleTransform = true;
        img.centeredScaling = true;
        (img.lockScalingFlip = true), (img.originX = "center");
        img.originY = "center";
  
        img.id = newId += 1;
        img.name = "aso-SignImage";
        img.canvasName = activeCanvas.name;
        img.priceId = imgId ? imgId : 0;
        img.price = price ? price : null;
        img.objectType = 'svg'
        img.imageUrl = imgUrl
        // img.clipPath = handleClipAddedObject(activeCanvas);
  
        img.lockMoving = {
          x: false,
          y: false,
        }
        img.lockScale = false
  
        img.on("mousedown", function () {
          handleGetAddedImageValues(img);
          // updateModifications(true, "deposer l'image ")
        });
        img.on("mouseup", function () {
          handleGetAddedImageValues(img);
          // updateModifications(true, "deposer l'image ")
        });
  
        activeCanvas.add(img);
        img.bringToFront();
        activeCanvas.setActiveObject(img);
        // lockToCanvas(img)
  
        handleCenterHorizontally(img);
        handleCenterVertically(img);
  
        addedImages.push({ id: img.id, url: imgUrl, object: img });
  
        updateModifications(true, "==ajout d'image ==");
        // console.log(img.getSrc(), "image source")
      });
    }else{
      fabric.Image.fromURL(imgUrl, function (img) {
        img.scale(0.4);
  
        img.setCoords();
        var newWidth = img.width * img.scaleX;
        var newHeight = img.height * img.scaleY;
  
        img.top = sign.top + sign.height / 2;
        img.left = sign.left + sign.width / 2;
        // img.flipX = true
        img.uniScaleTransform = true;
        img.centeredScaling = true;
        (img.lockScalingFlip = true), (img.originX = "center");
        img.originY = "center";
  
        img.id = newId += 1;
        img.name = "aso-SignImage";
        img.canvasName = activeCanvas.name;
        img.priceId = imgId ? imgId : 0;
        img.price = price ? price : null;
        img.objectType = "no-svg";
        img.imageUrl = imgUrl
        // img.clipPath = handleClipAddedObject(activeCanvas);
  
        img.lockMoving = {
          x: false,
          y: false,
        }
        img.lockScale = false
  
        img.on("mousedown", function () {
          handleGetAddedImageValues(img);
          // updateModifications(true, "deposer l'image ")
        });
        img.on("mouseup", function () {
          handleGetAddedImageValues(img);
          // updateModifications(true, "deposer l'image ")
        });
  
        activeCanvas.add(img);
        img.bringToFront();
        activeCanvas.setActiveObject(img);
        // lockToCanvas(img)
  
        handleCenterHorizontally(img);
        handleCenterVertically(img);
  
        addedImages.push({ id: img.id, url: imgUrl, object: img });
  
        updateModifications(true, "==ajout d'image ==");
        // console.log(img.getSrc(), "image source")
      }, { crossOrigin: 'anonymous' });
    }
  }

  var sign = handleGetObjectByName("safeObject");
  var itsDone = false;
  var imageError = "";

  var imageInput = document.getElementById("aso-iamge-input");

  function checkImageSize(file, maxWidth, minWidth) {
    return new Promise((resolve, reject) => {
      // Crée une nouvelle image
      const img = new Image();

      // Charge l'image à partir du fichier
      img.src = URL.createObjectURL(file);

      img.onload = () => {
        const width = img.width;
        const height = img.height;

        // Vérifie si l'image respecte les conditions de taille
        if (width > maxWidth || width < minWidth) {
          reject(
            console.log(
              `L'image doit avoir une taille comprise entre ${minWidth} et ${maxWidth}`
            )
          );
        } else {
          resolve(file);
        }
      };

      img.onerror = () => {
        reject(console.log("Impossible de charger l'image"));
      };
    });
  }

  return new Promise((resolve, reject) => {
    if (image) {
      useImage(image, imageId, price);
      resolve({ images: addedImages, error: "" });
    } else {
      imageInput.addEventListener("change", function (e) {
        const imgFile = imageInput.files[0];

        if (imageSettings.fileUploadScript.customWithGraphical) {
          checkImageSize(
            imgFile,
            imageSettings.fileUploadScript.uploadMaxWidth,
            imageSettings.fileUploadScript.uploadMinWidth
          )
            .then((validFile) => {
              const reader = new FileReader();
              reader.onload = () => {
                const imgBase64 = reader.result;
                if (!itsDone) {
                  useImage(imgBase64);
                  itsDone = true;
                  resolve({ images: addedImages, error: "" });
                }
              };
              reader.readAsDataURL(validFile);
            })
            .catch((error) => {
              // console.log(error);
              imageError = `L'image doit avoir une taille comprise entre ${imageSettings.fileUploadScript.uploadMinWidth}px et ${imageSettings.fileUploadScript.uploadMaxWidth}px de largeur`;
              reject({ images: addedImages, error: imageError });
            });
        } else {
          // Création d'un objet FileReader
          const reader = new FileReader();
          // Lecture du fichier image lorsqu'il est chargé
          reader.onload = () => {
            // Stockage de l'image en base64 dans une variable
            const imgBase64 = reader.result;
            // Utilisation de l'image
            if (!itsDone) {
              useImage(imgBase64);
              itsDone = true;
            }
          };
          // Lancement de la lecture comme URL
          reader.readAsDataURL(imgFile);

          resolve({ images: addedImages, error: "" });
        }
      });
    }
  });
}
function handleChangeImageWidth(scale) {
  var currentImage = activeCanvas.getActiveObject();
  if (currentImage.type === "image" || currentImage.type === "path" || currentImage.type === "group") {
    currentImage.scaleX = scale;
    currentImage.scaleY = scale;
    activeCanvas.requestRenderAll();
    handleGetAddedImageValues(currentImage);
  }
}
function handleChangeImageHeight(scaleY) {
  var currentImage = activeCanvas.getActiveObject();
  if (currentImage.type === "image") {
    currentImage.scaleY = scaleY;
    activeCanvas.requestRenderAll();
    handleGetAddedImageValues(currentImage);
  }
}

function handleSetImageBorder(border) {
  var currentImage = activeCanvas.getActiveObject();
  if (currentImage.type === "image") {
    activeCanvas.requestRenderAll();
    handleGetAddedImageValues(currentImage);
  }
}
function handleTurnImageLeft() {
  var currentImage = activeCanvas.getActiveObject();
  if (currentImage.type === "image") {
    if (currentImage.angle == 0) {
      currentImage.set("angle", 360);
    }
    var newAngle = currentImage.angle - 90;
    currentImage.set("angle", newAngle);

    activeCanvas.requestRenderAll();
    handleGetAddedImageValues(currentImage);
  }
}
function handleTurnRightImage() {
  var currentImage = activeCanvas.getActiveObject();
  if (currentImage.type === "image") {
    var newAngle = currentImage.angle + 90;
    currentImage.set("angle", newAngle);
    if (currentImage.angle >= 360) {
      currentImage.set("angle", 0);
    }

    activeCanvas.requestRenderAll();
    handleGetAddedImageValues(currentImage);
  }
}
function handleFlipImage() {
  var currentImage = activeCanvas.getActiveObject();
  if (currentImage.flipX == false) {
    currentImage.set("flipX", true);
  } else if (currentImage.flipX == true) {
    currentImage.set("flipX", false);
  }
  activeCanvas.requestRenderAll();
  handleGetAddedImageValues(currentImage);
}
function handleSelectFilter(filter) {
  var currentImage = activeCanvas.getActiveObject();
  if (currentImage.type === "image") {
    if (!currentImage.filters.length > 0) {
      switch (filter) {
        case "Sepia":
          /* Sepia effect */
          var sp = new fabric.Image.filters.Sepia({
            name: "sepia",
          });
          currentImage.filters.push(sp);
          break;

        case "Emboss":
          /* Emboss */
          var emb = new fabric.Image.filters.Convolute({
            matrix: [1, 1, 1, 1, 0.7, -1, -1, -1, -1],
            name: "embross",
          });
          currentImage.filters.push(emb);
          break;

        case "Greyscale":
          /* Greyscale */
          var gs = new fabric.Image.filters.Grayscale({
            name: "greyscale",
          });
          currentImage.filters.push(gs);
          break;

        case "Sharpen":
          /* Sharpen */
          var sharpen = new fabric.Image.filters.Convolute({
            matrix: [0, -1, 0, -1, 5, -1, 0, -1, 0],
            name: "sharpen",
          });
          currentImage.filters.push(sharpen);
          break;

        case "Blur":
          /* Blur */
          var blr = new fabric.Image.filters.Blur({
            name: "blur",
          });
          currentImage.filters.push(blr);
          break;
      }
    } else {
      var filtersTab = currentImage.filters;
      function addUniqueFilter(array, object, key) {
        const index = array.findIndex((item) => item[key] === object[key]);

        if (index === -1) {
          array.push(object);
        } else {
          array.splice(index, 1);
        }
      }
      switch (filter) {
        case "Sepia":
          var sp = new fabric.Image.filters.Sepia({
            name: "sepia",
          });
          addUniqueFilter(currentImage.filters, sp, "name");
          break;

        case "Emboss":
          var emb = new fabric.Image.filters.Convolute({
            matrix: [1, 1, 1, 1, 0.7, -1, -1, -1, -1],
            name: "embross",
          });
          addUniqueFilter(currentImage.filters, emb, "name");
          break;

        case "Greyscale":
          var gs = new fabric.Image.filters.Grayscale({
            name: "greyscale",
          });
          addUniqueFilter(currentImage.filters, gs, "name");
          break;

        case "Sharpen":
          var sharpen = new fabric.Image.filters.Convolute({
            matrix: [0, -1, 0, -1, 5, -1, 0, -1, 0],
            name: "sharpen",
          });
          addUniqueFilter(currentImage.filters, sharpen, "name");
          break;

        case "Blur":
          var blr = new fabric.Image.filters.Blur({
            name: "blur",
          });
          addUniqueFilter(currentImage.filters, blr, "name");
          break;
      }
    }
    currentImage.applyFilters();
    activeCanvas.renderAll();

    selectedImage.filters = currentImage.filters;

    return selectedImage.filters;
  }
}
function handleChangeAddedSvgColor(color){
  var currentImage = activeCanvas.getActiveObject();
  
  if(currentImage.objectType == 'svg'){
    activeCanvas.getObjects().forEach((objet) => {
      if (objet.name === "aso-SignImage" && objet === currentImage) {
        console.log(objet)
        if(objet._objects && objet._objects.length > 0){
          objet.getObjects().forEach(path => {
            path.set("fill", color);
          });
        }else{
          objet.set("fill", color);
        }
      }
    });

    activeCanvas.renderAll();
  }

  return color;
}


var totalCharPrice = 0;
var charPrice = 0;
var startPriceAtChar = 0;
function handleGetCharPrice(price, startAt) {
  // console.log(startAt, "charPrice")
  charPrice = price;
  startPriceAtChar = startAt;
}
var textsPrice = 0;
function removeDeletedTextPrice(priceTable, textObjects) {
  // Parcourir les objets du grand tableau qui ont la face cible
  priceTable.forEach((priceObj, index) => {
    // Trouver l'objet correspondant dans le petit tableau
    const smallObj = textObjects.find((obj) => obj.id === priceObj.id);

    if (!smallObj) {
      // L'objet n'existe pas dans le petit tableau, on le supprime
      priceTable.splice(index, 1);
      index--;
    }
    // console.log(textsPrice, "table de prix de text")
  });

  return priceTable;
}
function handleCalcTextPrice(position) {
  var avalaibleFaceChars = 0;
  var avalaibleBackChars = 0;

  if (
    (activeSignFace === "front" && startPriceAtChar < frontTextCharLength) ||
    (activeSignFace === "back" && backTextCharLength > startPriceAtChar)
  ) {
    // var avalaibleChars = object.text.length - startPriceAtChar
    // var charPricing = avalaibleChars * charPrice

    // console.log(avalaibleChars, "available chars for pricing")

    // function addUniqueObject(arr, obj, key) {
    //     const index = arr.findIndex(item => item[key] === obj[key]);
    //     if(index !== -1){
    //         arr[index] = obj;
    //     }
    //     else{
    //         arr.push(obj);
    //     }
    // }
    // addUniqueObject(textsPrice, {id: object.id, price: charPricing}, 'id')

    // removeDeletedTextPrice(textsPrice, addedTexts)
    // console.log(textsPrice, "table de prix de text")
    if (frontTextCharLength > startPriceAtChar) {
      avalaibleFaceChars =
        sumOptionsPrice(FtextObjects, "text").length - startPriceAtChar;
      if (avalaibleFaceChars < 0) {
        avalaibleFaceChars = 0;
      }
    }
    if (backTextCharLength > startPriceAtChar) {
      avalaibleBackChars =
        sumOptionsPrice(BtextObjects, "text").length - startPriceAtChar;
      if (avalaibleBackChars < 0) {
        avalaibleBackChars = 0;
      }
    }
  } else {
    textsPrice = 0;
  }

  textsPrice = (avalaibleFaceChars + avalaibleBackChars) * charPrice;
}
function handleSetPrice() {
  return textsPrice;
}

function handleClipAddedObject(canva) {
  var sign;
  var clipPath;
  canva.getObjects().forEach(function (object) {
    if (object.name === "safeObject") {
      sign = object;
    }
  });

  switch (selectedShape) {
    case "square":
      clipPath = new fabric.Rect({
        height: sign.height,
        width: sign.width,
        top: sign.top,
        left: sign.left,
        absolutePositioned: true,
        selectable: false,
      });
      break;

    case "rounded-square":
      clipPath = new fabric.Rect({
        height: sign.height,
        width: sign.width,
        top: sign.top,
        left: sign.left,
        absolutePositioned: true,
        rx: 15,
        ry: 15,
        selectable: false,
      });
      break;

    case "oval":
      clipPath = new fabric.Ellipse({
        ry: sign.height / 2,
        rx: sign.width / 2,
        top: sign.top,
        left: sign.left,
        absolutePositioned: true,
        selectable: false,
      });
      break;

    case "triangle":
      clipPath = new fabric.Triangle({
        height: sign.height,
        width: sign.width,
        top: sign.top,
        left: sign.left,
        absolutePositioned: true,
        selectable: false,
      });
      break;

    case "rotated-square":
      clipPath = new fabric.Polygon(
        [
          { x: sign.width / 2, y: 0 },
          { x: sign.width, y: sign.height / 2 },
          { x: sign.width / 2, y: sign.height },
          { x: 0, y: sign.height / 2 },
        ],
        {
          top: sign.top,
          left: sign.left,
          absolutePositioned: true,
          selectable: false,
        }
      );
      break;

    case "turn-left":
      clipPath = new fabric.Polygon(
        [
          { x: 0, y: sign.height / 2 },
          { x: sign.width / 2, y: 0 },
          { x: sign.width, y: 0 },
          { x: sign.width, y: sign.height },
          { x: sign.width / 2, y: sign.height },
        ],
        {
          top: sign.top,
          left: sign.left,
          absolutePositioned: true,
          selectable: false,
        }
      );
      break;

    case "turn-right":
      clipPath = new fabric.Polygon(
        [
          { x: 0, y: 0 },
          { x: sign.width / 2, y: 0 },
          { x: sign.width, y: sign.height / 2 },
          { x: sign.width / 2, y: sign.height },
          { x: 0, y: sign.height },
        ],
        {
          top: sign.top,
          left: sign.left,
          absolutePositioned: true,
          selectable: false,
        }
      );
      break;

    case "arrow-right":
      clipPath = new fabric.Polyline(
        [
          { x: 0, y: (sign.height / 5) * 4 },
          { x: sign.width / 2, y: (sign.height / 5) * 4 },
          { x: sign.width / 2, y: sign.height },
          { x: sign.width, y: sign.height / 2 },
          { x: sign.width / 2, y: 0 },
          { x: sign.width / 2, y: sign.height / 5 },
          { x: 0, y: sign.height / 5 },
        ],
        {
          top: sign.top,
          left: sign.left,
          absolutePositioned: true,
          selectable: false,
        }
      );
      break;

    case "arrow-left":
      clipPath = new fabric.Polygon(
        [
          { x: 0, y: sign.height / 2 },
          { x: sign.width / 2, y: 0 },
          { x: sign.width / 2, y: sign.height / 5 },
          { x: sign.width, y: sign.height / 5 },
          { x: sign.width, y: (sign.height / 5) * 4 },
          { x: sign.width / 2, y: (sign.height / 5) * 4 },
          { x: sign.width / 2, y: sign.height },
        ],
        {
          top: sign.top,
          left: sign.left,
          absolutePositioned: true,
          selectable: false,
        }
      );
      break;

    case "stop":
      clipPath = new fabric.Polygon(
        [
          { x: 0, y: (sign.height / 3) * 2 },
          { x: sign.width / 3, y: sign.height },
          { x: (sign.width / 3) * 2, y: sign.height },
          { x: sign.width, y: (sign.height / 3) * 2 },
          { x: sign.width, y: sign.height / 3 },
          { x: (sign.width / 3) * 2, y: 0 },
          { x: sign.width / 3, y: 0 },
          { x: 0, y: sign.height / 3 },
        ],
        {
          top: sign.top,
          left: sign.left,
          absolutePositioned: true,
          selectable: false,
        }
      );
      break;

    case "rounded-top":
      clipPath = new fabric.Rect({
        height: sign.height,
        width: sign.width,
        top: sign.top,
        left: sign.left,
        absolutePositioned: true,
        rx: sign.width,
        ry: 10,
        selectable: false,
      });
      break;

    case "rounded-sides":
      clipPath = new fabric.Rect({
        height: sign.height,
        width: sign.width,
        top: sign.top,
        left: sign.left,
        absolutePositioned: true,
        rx: 10,
        ry: sign.height,
        selectable: false,
      });
      break;
  }

  return clipPath;
}


function handleMoveobject(to){
  var object = activeCanvas.getActiveObject();
  const index = activeCanvas.getObjects().indexOf(object);

  const objects = activeCanvas.getObjects();
  const lastIndex = objects.length - 1;
  if(to === 'up'){
    object.moveTo(index + 1);
  }
  if(to === 'down'){
    object.moveTo(index - 1);
  }

  activeCanvas.renderAll()
  // console.log('Index de l\'image:', index, "last index", lastIndex);
}


function handleAddTemplateText(canvas1Json, canvas2Json, templateData, statut){
  // console.log(canvasJson)
  var signData = templateData

  function addUniqueObject(arr, obj, key) {
        const index = arr.findIndex(item => item[key] === obj[key]);
        if(index !== -1){
            arr[index] = obj;
        }
        else{
            arr.push(obj);
        }
    }

  function loadFromJSON(canva, canvasJson){
    var rect 
    canva.clear();
    // ratioScale = templateData.size.ratioScale
    canvasJson.objects.forEach(function(obj){
        fabric.util.enlivenObjects([obj], function(templateObject) {
            if(templateObject[0].name === 'safeObject'){
              rect = templateObject[0]
              if(typeof  templateObject[0].fill !== 'string'){
                templateObject[0].fill = 'transparent'
                console.log('WARNING:')
                var image
                if(canva.name === 'front-face'){
                  image = templateData.color.face1.codeHex
                }
                if(canva.name === 'back-face'){
                  image = templateData.color.face2.codeHex
                }
                fabric.util.loadImage(image, function (img) {
                  var scaleX = templateObject[0].width / img.width;
                  var scaleY = templateObject[0].height / img.height;
                  var pattern = new fabric.Pattern({
                    source: img,
                    repeat: "no-repeat",
                    patternTransform: [scaleX, 0, 0, scaleY, 0, 0],
                  });
                  templateObject[0].set("fill", pattern);
                  // canvas.add(pattern);
                  canva.renderAll();
                }, { crossOrigin: 'anonymous' });
              }
            }
            if(templateObject[0].name === 'aso-SignText'){
                // templateObject[0].dirty = true
                // templateObject[0].set('noScaleCache', false);
                if(statut !== 'making'){
                  if(templateObject[0].lockMoving.x === true){
                      templateObject[0].lockMovementX = true
                  }
                  if(templateObject[0].lockMoving.y === true){
                      templateObject[0].lockMovementY = true
                  }
                  if(templateObject[0].lockScale === true){
                      templateObject[0].lockScalingX = true
                      templateObject[0].lockScalingY = true
                  }
                  if(templateObject[0].lockRotate === true){
                      templateObject[0].lockRotation = true
                  }
                  if(templateObject[0].lockEdition === true){
                      templateObject[0].editable = false
                  }
                }

                templateObject[0].clipPath = null
  
                templateObject[0].on('editing:entered', () => {
                    handleGetAddedTextValues(templateObject[0]);  
                });
                templateObject[0].on('editing:exited', () => {
                    handleGetAddedTextValues(templateObject[0]);
                    resizeText(templateObject[0]);
                });
                templateObject[0].on('selected', () => {   
                    handleGetAddedTextValues(templateObject[0]);         
                });
                templateObject[0].on('mousedown', function() {
                    handleGetAddedTextValues(templateObject[0]);
                    reScaleText(templateObject[0]) 
                });
                templateObject[0].on('mouseup', function() {
                    handleGetAddedTextValues(templateObject[0]);
                    reScaleText(templateObject[0]) 
                });
  
                // console.log(templateObject[0])
                addUniqueObject(addedTexts, templateObject[0], 'id');
            }

            // if (templateObject[0].type === 'text' || templateObject[0].type === 'i-text') {
            //   templateObject[0].set('dirty', true);
            //   if (templateObject[0].text) {
            //     // Forcer la mise à jour du texte en le réappliquant
            //     let currentText = templateObject[0].text;
            //     // console.log(currentText)
            //     templateObject[0].set('text', '');
            //     templateObject[0].set('text', currentText);
            //   }
            // }

            if(templateObject[0].name === 'aso-SignImage'){
              if(statut !== 'making'){
                if(templateObject[0].lockMoving.x === true){
                    templateObject[0].lockMovementX = true
                }
                if(templateObject[0].lockMoving.y === true){
                    templateObject[0].lockMovementY = true
                }
                if(templateObject[0].lockScale === true){
                    templateObject[0].lockScalingX = true
                    templateObject[0].lockScalingY = true
                }
                if(templateObject[0].lockRotate === true){
                    templateObject[0].lockRotation = true
                }
              }

              templateObject[0].clipPath = null
              
              templateObject[0].on('mousedown', function() {
                  handleGetAddedImageValues(templateObject[0]); 
              });
              templateObject[0].on('mouseup', function() {
                  handleGetAddedImageValues(templateObject[0]); 
              });

              var objectUrl = (templateObject[0].objectType == 'svg' ? templateObject[0].imageUrl : templateObject[0].getSrc())
              addUniqueObject(addedImages, {id: templateObject[0].id, url: objectUrl, object: templateObject[0]}, 'id');
            }
  
            if(templateData){
              if(signData.fixingMethod.type == 'screw'){
                  if(signData.shape == 'square' || signData.shape == 'rounded-square' || signData.shape == 'rounded-top' || signData.shape == 'rounded-sides'){
                      if(signData.fixingMethod.ratio == 'small'){
                          if(templateObject[0].name === 'screw1'){
                              // console.log(templateObject[0], rect, "screw1")
                              var newHeight = templateObject[0].height * templateObject[0].scaleY 
    
                              templateObject[0].left = rect.left
                              templateObject[0].top = rect.top + (rect.height /2 - (newHeight/2))
    
                          }
                          if(templateObject[0].name === 'screw2'){
                              var newHeight = templateObject[0].height * templateObject[0].scaleY 
                              var newWidth = templateObject[0].width * templateObject[0].scaleX
                              
                              templateObject[0].left = rect.left + rect.width - newWidth
                              templateObject[0].top = rect.top + (rect.height /2 - (newHeight/2))
                          }
                      }
                      if(signData.fixingMethod.ratio == 'big'){
                          if(templateObject[0].name === 'screw1'){
                              console.log(templateObject[0], rect, "screw1")
                              var newHeight = templateObject[0].height * templateObject[0].scaleY 
    
                              templateObject[0].left = rect.left
                              templateObject[0].top = rect.top
    
                          }
                          if(templateObject[0].name === 'screw2'){
                              var newHeight = templateObject[0].height * templateObject[0].scaleY 
                              var newWidth = templateObject[0].width * templateObject[0].scaleX
                              
                              templateObject[0].left = rect.left + rect.width - newWidth
                              templateObject[0].top = rect.top
                          }
                          if(templateObject[0].name === 'screw3'){
                              var newHeight = templateObject[0].height * templateObject[0].scaleY 
    
                              templateObject[0].left = rect.left
                              templateObject[0].top = rect.top + (rect.height - (newHeight))
    
                          }
                          if(templateObject[0].name === 'screw4'){
                              var newHeight = templateObject[0].height * templateObject[0].scaleY 
                              var newWidth = templateObject[0].width * templateObject[0].scaleX
                              
                              templateObject[0].left = rect.left + rect.width - newWidth
                              templateObject[0].top = rect.top + (rect.height - (newHeight))
                          }
                      }
                  }
                  if(signData.shape == 'triangle'){
                      if(templateObject[0].name === 'screw1'){
                          var newHeight = templateObject[0].height * templateObject[0].scaleY 
                          var newWidth = templateObject[0].width * templateObject[0].scaleX
    
                          templateObject[0].left = rect.left + (rect.width/2 - (newWidth/2))
                          templateObject[0].top = rect.top + (newHeight/2)
    
                      }
                      if(templateObject[0].name === 'screw2'){
                          var newHeight = templateObject[0].height * templateObject[0].scaleY 
                          var newWidth = templateObject[0].width * templateObject[0].scaleX
                          
                          templateObject[0].left = rect.left + (newWidth/2)
                          templateObject[0].top = rect.top + (rect.height - newHeight)
                      }
                      if(templateObject[0].name === 'screw3'){
                          var newHeight = templateObject[0].height * templateObject[0].scaleY 
                          var newWidth = templateObject[0].width * templateObject[0].scaleX
    
                          templateObject[0].left = rect.left + (rect.width - newWidth) - (newWidth/2)
                          templateObject[0].top = rect.top + (rect.height - (newHeight))
    
                      }
                  }
                  if(signData.shape == 'oval' || signData.shape == 'rotated-square'){
                      if(templateObject[0].name === 'screw1'){
                          var newHeight = templateObject[0].height * templateObject[0].scaleY 
    
                          templateObject[0].left = rect.left + (newWidth/2)
                          templateObject[0].top = rect.top + ((rect.height/2) - (newHeight/2))
    
                      }
                      if(templateObject[0].name === 'screw2'){
                          var newHeight = templateObject[0].height * templateObject[0].scaleY 
                          var newWidth = templateObject[0].width * templateObject[0].scaleX
                          
                          templateObject[0].left = rect.left + (rect.width - newWidth) - (newWidth/2)
                          templateObject[0].top = rect.top + ((rect.height/2) - (newHeight/2))
                      }
                  }
                  if(signData.shape == 'turn-left' || signData.shape == 'arrow-left'){
                      if(templateObject[0].name === 'screw1'){
                          var newHeight = templateObject[0].height * templateObject[0].scaleY 
    
                          templateObject[0].left = rect.left +(newWidth/2)
                          templateObject[0].top = rect.top + (rect.height /2 - (newHeight/2))
    
                      }
                      if(templateObject[0].name === 'screw2'){
                          var newHeight = templateObject[0].height * templateObject[0].scaleY 
                          var newWidth = templateObject[0].width * templateObject[0].scaleX
                          
                          templateObject[0].left = rect.left + (rect.width - newWidth)
                          templateObject[0].top = rect.top + (rect.height /2 - (newHeight/2))
                      }   
                  }
                  if(signData.shape == 'turn-right' || signData.shape == 'arrow-right'){
                      if(templateObject[0].name === 'screw1'){
                          var newHeight = templateObject[0].height * templateObject[0].scaleY 
    
                          templateObject[0].left = rect.left
                          templateObject[0].top = rect.top + (rect.height /2 - (newHeight/2))
    
                      }
                      if(templateObject[0].name === 'screw2'){
                          var newHeight = templateObject[0].height * templateObject[0].scaleY 
                          var newWidth = templateObject[0].width * templateObject[0].scaleX
                          
                          templateObject[0].left = rect.left + (rect.width - newWidth) - (newWidth/2)
                          templateObject[0].top = rect.top + (rect.height /2 - (newHeight/2))
                      } 
                  }
                  if(signData.shape == 'stop'){
                      if(templateObject[0].name === 'screw1'){
                          var newHeight = templateObject[0].height * templateObject[0].scaleY 
    
                          templateObject[0].left = rect.left
                          templateObject[0].top = rect.top + (rect.height /2 - (newHeight/2))
    
                      }
                      if(templateObject[0].name === 'screw2'){
                          var newHeight = templateObject[0].height * templateObject[0].scaleY 
                          var newWidth = templateObject[0].width * templateObject[0].scaleX
                          
                          templateObject[0].left = rect.left + (rect.width - newWidth)
                          templateObject[0].top = rect.top + (rect.height /2 - (newHeight/2))
                      } 
                  }
              }
              if(signData.fixingMethod.type == 'screw-cap'){
                  if(signData.shape == 'square' || signData.shape == 'rounded-square' || signData.shape == 'rounded-top' || signData.shape == 'rounded-sides'){
                      if(signData.fixingMethod.ratio == 'small'){
                          if(templateObject[0].name === 'screw-cap1'){
                              console.log(templateObject[0], rect, "screw1")
                              var newHeight = templateObject[0].height * templateObject[0].scaleY 
    
                              templateObject[0].left = rect.left
                              templateObject[0].top = rect.top + (rect.height /2 - (newHeight/2))
    
                          }
                          if(templateObject[0].name === 'screw-cap2'){
                              var newHeight = templateObject[0].height * templateObject[0].scaleY 
                              var newWidth = templateObject[0].width * templateObject[0].scaleX
                              
                              templateObject[0].left = rect.left + rect.width - newWidth
                              templateObject[0].top = rect.top + (rect.height /2 - (newHeight/2))
                          }
                      }
                      if(signData.fixingMethod.ratio == 'big'){
                          if(templateObject[0].name === 'screw-cap1'){
                              var newHeight = templateObject[0].height * templateObject[0].scaleY 
    
                              templateObject[0].left = rect.left
                              templateObject[0].top = rect.top
    
                          }
                          if(templateObject[0].name === 'screw-cap2'){
                              var newHeight = templateObject[0].height * templateObject[0].scaleY 
                              var newWidth = templateObject[0].width * templateObject[0].scaleX
                              
                              templateObject[0].left = rect.left + rect.width - newWidth
                              templateObject[0].top = rect.top
                          }
                          if(templateObject[0].name === 'screw-cap3'){
                              var newHeight = templateObject[0].height * templateObject[0].scaleY 
    
                              templateObject[0].left = rect.left
                              templateObject[0].top = rect.top + (rect.height - (newHeight))
    
                          }
                          if(templateObject[0].name === 'screw-cap4'){
                              var newHeight = templateObject[0].height * templateObject[0].scaleY 
                              var newWidth = templateObject[0].width * templateObject[0].scaleX
                              
                              templateObject[0].left = rect.left + rect.width - newWidth
                              templateObject[0].top = rect.top + (rect.height - (newHeight))
                          }
                      }
                  }
                  if(signData.shape == 'triangle'){
                      if(templateObject[0].name === 'screw-cap1'){
                          var newHeight = templateObject[0].height * templateObject[0].scaleY 
                          var newWidth = templateObject[0].width * templateObject[0].scaleX
    
                          templateObject[0].left = rect.left + (rect.width/2 - (newWidth/2))
                          templateObject[0].top = rect.top + (newHeight/2)
    
                      }
                      if(templateObject[0].name === 'screw-cap2'){
                          var newHeight = templateObject[0].height * templateObject[0].scaleY 
                          var newWidth = templateObject[0].width * templateObject[0].scaleX
                          
                          templateObject[0].left = rect.left + (newWidth/2)
                          templateObject[0].top = rect.top + (rect.height - newHeight)
                      }
                      if(templateObject[0].name === 'screw-cap3'){
                          var newHeight = templateObject[0].height * templateObject[0].scaleY 
                          var newWidth = templateObject[0].width * templateObject[0].scaleX
    
                          templateObject[0].left = rect.left + (rect.width - newWidth) - (newWidth/2)
                          templateObject[0].top = rect.top + (rect.height - (newHeight))
    
                      }
                  }
                  if(signData.shape == 'oval' || signData.shape == 'rotated-square'){
                      if(templateObject[0].name === 'screw-cap1'){
                          var newHeight = templateObject[0].height * templateObject[0].scaleY 
    
                          templateObject[0].left = rect.left + (newWidth/2)
                          templateObject[0].top = rect.top + ((rect.height/2) - (newHeight/2))
    
                      }
                      if(templateObject[0].name === 'screw-cap2'){
                          var newHeight = templateObject[0].height * templateObject[0].scaleY 
                          var newWidth = templateObject[0].width * templateObject[0].scaleX
                          
                          templateObject[0].left = rect.left + (rect.width - newWidth) - (newWidth/2)
                          templateObject[0].top = rect.top + ((rect.height/2) - (newHeight/2))
                      }
                  }
                  if(signData.shape == 'turn-left' || signData.shape == 'arrow-left'){
                      if(templateObject[0].name === 'screw-cap1'){
                          var newHeight = templateObject[0].height * templateObject[0].scaleY 
    
                          templateObject[0].left = rect.left +(newWidth/2)
                          templateObject[0].top = rect.top + (rect.height /2 - (newHeight/2))
    
                      }
                      if(templateObject[0].name === 'screw-cap2'){
                          var newHeight = templateObject[0].height * templateObject[0].scaleY 
                          var newWidth = templateObject[0].width * templateObject[0].scaleX
                          
                          templateObject[0].left = rect.left + (rect.width - newWidth)
                          templateObject[0].top = rect.top + (rect.height /2 - (newHeight/2))
                      }   
                  }
                  if(signData.shape == 'turn-right' || signData.shape == 'arrow-right'){
                      if(templateObject[0].name === 'screw-cap1'){
                          var newHeight = templateObject[0].height * templateObject[0].scaleY 
    
                          templateObject[0].left = rect.left
                          templateObject[0].top = rect.top + (rect.height /2 - (newHeight/2))
    
                      }
                      if(templateObject[0].name === 'screw-cap2'){
                          var newHeight = templateObject[0].height * templateObject[0].scaleY 
                          var newWidth = templateObject[0].width * templateObject[0].scaleX
                          
                          templateObject[0].left = rect.left + (rect.width - newWidth) - (newWidth/2)
                          templateObject[0].top = rect.top + (rect.height /2 - (newHeight/2))
                      } 
                  }
                  if(signData.shape == 'stop'){
                      if(templateObject[0].name === 'screw-cap1'){
                          var newHeight = templateObject[0].height * templateObject[0].scaleY 
    
                          templateObject[0].left = rect.left
                          templateObject[0].top = rect.top + (rect.height /2 - (newHeight/2))
    
                      }
                      if(templateObject[0].name === 'screw-cap2'){
                          var newHeight = templateObject[0].height * templateObject[0].scaleY 
                          var newWidth = templateObject[0].width * templateObject[0].scaleX
                          
                          templateObject[0].left = rect.left + (rect.width - newWidth)
                          templateObject[0].top = rect.top + (rect.height /2 - (newHeight/2))
                      } 
                  }
              }
              if(signData.fixingMethod.type == 'suction-cup'){
                  if(signData.shape == 'square' || signData.shape == 'rounded-square' || signData.shape == 'rounded-top' || signData.shape == 'rounded-sides'){
                      if(signData.fixingMethod.ratio == 'small'){
                          if(templateObject[0].name === 'suction-cup1'){
                              var newHeight = templateObject[0].height * templateObject[0].scaleY 
    
                              templateObject[0].left = rect.left
                              templateObject[0].top = rect.top + (rect.height /2 - (newHeight/2))
    
                          }
                          if(templateObject[0].name === 'suction-cup2'){
                              var newHeight = templateObject[0].height * templateObject[0].scaleY 
                              var newWidth = templateObject[0].width * templateObject[0].scaleX
                              
                              templateObject[0].left = rect.left + rect.width - newWidth
                              templateObject[0].top = rect.top + (rect.height /2 - (newHeight/2))
                          }
                      }
                      if(signData.fixingMethod.ratio == 'big'){
                          if(templateObject[0].name === 'suction-cup1'){
                              var newHeight = templateObject[0].height * templateObject[0].scaleY 
    
                              templateObject[0].left = rect.left
                              templateObject[0].top = rect.top
    
                          }
                          if(templateObject[0].name === 'suction-cup2'){
                              var newHeight = templateObject[0].height * templateObject[0].scaleY 
                              var newWidth = templateObject[0].width * templateObject[0].scaleX
                              
                              templateObject[0].left = rect.left + rect.width - newWidth
                              templateObject[0].top = rect.top
                          }
                          if(templateObject[0].name === 'suction-cup3'){
                              var newHeight = templateObject[0].height * templateObject[0].scaleY 
    
                              templateObject[0].left = rect.left
                              templateObject[0].top = rect.top + (rect.height - (newHeight))
    
                          }
                          if(templateObject[0].name === 'suction-cup4'){
                              var newHeight = templateObject[0].height * templateObject[0].scaleY 
                              var newWidth = templateObject[0].width * templateObject[0].scaleX
                              
                              templateObject[0].left = rect.left + rect.width - newWidth
                              templateObject[0].top = rect.top + (rect.height - (newHeight))
                          }
                      }
                  }
                  if(signData.shape == 'triangle'){
                      if(templateObject[0].name === 'suction-cup1'){
                          var newHeight = templateObject[0].height * templateObject[0].scaleY 
                          var newWidth = templateObject[0].width * templateObject[0].scaleX
    
                          templateObject[0].left = rect.left + (rect.width/2 - (newWidth/2))
                          templateObject[0].top = rect.top + (newHeight/2)
    
                      }
                      if(templateObject[0].name === 'suction-cup2'){
                          var newHeight = templateObject[0].height * templateObject[0].scaleY 
                          var newWidth = templateObject[0].width * templateObject[0].scaleX
                          
                          templateObject[0].left = rect.left + (newWidth/2)
                          templateObject[0].top = rect.top + (rect.height - newHeight)
                      }
                      if(templateObject[0].name === 'suction-cup3'){
                          var newHeight = templateObject[0].height * templateObject[0].scaleY 
                          var newWidth = templateObject[0].width * templateObject[0].scaleX
    
                          templateObject[0].left = rect.left + (rect.width - newWidth) - (newWidth/2)
                          templateObject[0].top = rect.top + (rect.height - (newHeight))
    
                      }
                  }
                  if(signData.shape == 'oval' || signData.shape == 'rotated-square'){
                      if(templateObject[0].name === 'suction-cup1'){
                          var newHeight = templateObject[0].height * templateObject[0].scaleY 
    
                          templateObject[0].left = rect.left + (newWidth/2)
                          templateObject[0].top = rect.top + ((rect.height/2) - (newHeight/2))
    
                      }
                      if(templateObject[0].name === 'suction-cup2'){
                          var newHeight = templateObject[0].height * templateObject[0].scaleY 
                          var newWidth = templateObject[0].width * templateObject[0].scaleX
                          
                          templateObject[0].left = rect.left + (rect.width - newWidth) - (newWidth/2)
                          templateObject[0].top = rect.top + ((rect.height/2) - (newHeight/2))
                      }
                  }
                  if(signData.shape == 'turn-left' || signData.shape == 'arrow-left'){
                      if(templateObject[0].name === 'suction-cup1'){
                          var newHeight = templateObject[0].height * templateObject[0].scaleY 
    
                          templateObject[0].left = rect.left +(newWidth/2)
                          templateObject[0].top = rect.top + (rect.height /2 - (newHeight/2))
    
                      }
                      if(templateObject[0].name === 'suction-cup2'){
                          var newHeight = templateObject[0].height * templateObject[0].scaleY 
                          var newWidth = templateObject[0].width * templateObject[0].scaleX
                          
                          templateObject[0].left = rect.left + (rect.width - newWidth)
                          templateObject[0].top = rect.top + (rect.height /2 - (newHeight/2))
                      }   
                  }
                  if(signData.shape == 'turn-right' || signData.shape == 'arrow-right'){
                      if(templateObject[0].name === 'suction-cup1'){
                          var newHeight = templateObject[0].height * templateObject[0].scaleY 
    
                          templateObject[0].left = rect.left
                          templateObject[0].top = rect.top + (rect.height /2 - (newHeight/2))
    
                      }
                      if(templateObject[0].name === 'suction-cup2'){
                          var newHeight = templateObject[0].height * templateObject[0].scaleY 
                          var newWidth = templateObject[0].width * templateObject[0].scaleX
                          
                          templateObject[0].left = rect.left + (rect.width - newWidth) - (newWidth/2)
                          templateObject[0].top = rect.top + (rect.height /2 - (newHeight/2))
                      } 
                  }
                  if(signData.shape == 'stop'){
                      if(templateObject[0].name === 'suction-cup1'){
                          var newHeight = templateObject[0].height * templateObject[0].scaleY 
    
                          templateObject[0].left = rect.left
                          templateObject[0].top = rect.top + (rect.height /2 - (newHeight/2))
    
                      }
                      if(templateObject[0].name === 'suction-cup2'){
                          var newHeight = templateObject[0].height * templateObject[0].scaleY 
                          var newWidth = templateObject[0].width * templateObject[0].scaleX
                          
                          templateObject[0].left = rect.left + (rect.width - newWidth)
                          templateObject[0].top = rect.top + (rect.height /2 - (newHeight/2))
                      } 
                  }
              }
              if(signData.fixingMethod.type == 'standoff'){
                  if(signData.shape == 'square' || signData.shape == 'rounded-square' || signData.shape == 'rounded-top' || signData.shape == 'rounded-sides'){
                      if(signData.fixingMethod.ratio == 'small'){
                          if(templateObject[0].name === 'standoff1'){
                              console.log(templateObject[0], rect, "screw1")
                              var newHeight = templateObject[0].height * templateObject[0].scaleY 
    
                              templateObject[0].left = rect.left
                              templateObject[0].top = rect.top + (rect.height /2 - (newHeight/2))
    
                          }
                          if(templateObject[0].name === 'standoff2'){
                              var newHeight = templateObject[0].height * templateObject[0].scaleY 
                              var newWidth = templateObject[0].width * templateObject[0].scaleX
                              
                              templateObject[0].left = rect.left + rect.width - newWidth
                              templateObject[0].top = rect.top + (rect.height /2 - (newHeight/2))
                          }
                      }
                      if(signData.fixingMethod.ratio == 'big'){
                          if(templateObject[0].name === 'standoff1'){
                              var newHeight = templateObject[0].height * templateObject[0].scaleY 
    
                              templateObject[0].left = rect.left
                              templateObject[0].top = rect.top
    
                          }
                          if(templateObject[0].name === 'standoff2'){
                              var newHeight = templateObject[0].height * templateObject[0].scaleY 
                              var newWidth = templateObject[0].width * templateObject[0].scaleX
                              
                              templateObject[0].left = rect.left + rect.width - newWidth
                              templateObject[0].top = rect.top
                          }
                          if(templateObject[0].name === 'standoff3'){
                              var newHeight = templateObject[0].height * templateObject[0].scaleY 
    
                              templateObject[0].left = rect.left
                              templateObject[0].top = rect.top + (rect.height - (newHeight))
    
                          }
                          if(templateObject[0].name === 'standoff4'){
                              var newHeight = templateObject[0].height * templateObject[0].scaleY 
                              var newWidth = templateObject[0].width * templateObject[0].scaleX
                              
                              templateObject[0].left = rect.left + rect.width - newWidth
                              templateObject[0].top = rect.top + (rect.height - (newHeight))
                          }
                      }
                  }
                  if(signData.shape == 'triangle'){
                      if(templateObject[0].name === 'standoff1'){
                          var newHeight = templateObject[0].height * templateObject[0].scaleY 
                          var newWidth = templateObject[0].width * templateObject[0].scaleX
    
                          templateObject[0].left = rect.left + (rect.width/2 - (newWidth/2))
                          templateObject[0].top = rect.top + (newHeight/2)
    
                      }
                      if(templateObject[0].name === 'standoff2'){
                          var newHeight = templateObject[0].height * templateObject[0].scaleY 
                          var newWidth = templateObject[0].width * templateObject[0].scaleX
                          
                          templateObject[0].left = rect.left + (newWidth/2)
                          templateObject[0].top = rect.top + (rect.height - newHeight)
                      }
                      if(templateObject[0].name === 'standoff3'){
                          var newHeight = templateObject[0].height * templateObject[0].scaleY 
                          var newWidth = templateObject[0].width * templateObject[0].scaleX
    
                          templateObject[0].left = rect.left + (rect.width - newWidth) - (newWidth/2)
                          templateObject[0].top = rect.top + (rect.height - (newHeight))
    
                      }
                  }
                  if(signData.shape == 'oval' || signData.shape == 'rotated-square'){
                      if(templateObject[0].name === 'standoff1'){
                          var newHeight = templateObject[0].height * templateObject[0].scaleY 
    
                          templateObject[0].left = rect.left + (newWidth/2)
                          templateObject[0].top = rect.top + ((rect.height/2) - (newHeight/2))
    
                      }
                      if(templateObject[0].name === 'standoff2'){
                          var newHeight = templateObject[0].height * templateObject[0].scaleY 
                          var newWidth = templateObject[0].width * templateObject[0].scaleX
                          
                          templateObject[0].left = rect.left + (rect.width - newWidth) - (newWidth/2)
                          templateObject[0].top = rect.top + ((rect.height/2) - (newHeight/2))
                      }
                  }
                  if(signData.shape == 'turn-left' || signData.shape == 'arrow-left'){
                      if(templateObject[0].name === 'standoff1'){
                          var newHeight = templateObject[0].height * templateObject[0].scaleY 
    
                          templateObject[0].left = rect.left +(newWidth/2)
                          templateObject[0].top = rect.top + (rect.height /2 - (newHeight/2))
    
                      }
                      if(templateObject[0].name === 'standoff2'){
                          var newHeight = templateObject[0].height * templateObject[0].scaleY 
                          var newWidth = templateObject[0].width * templateObject[0].scaleX
                          
                          templateObject[0].left = rect.left + (rect.width - newWidth)
                          templateObject[0].top = rect.top + (rect.height /2 - (newHeight/2))
                      }   
                  }
                  if(signData.shape == 'turn-right' || signData.shape == 'arrow-right'){
                      if(templateObject[0].name === 'standoff1'){
                          var newHeight = templateObject[0].height * templateObject[0].scaleY 
    
                          templateObject[0].left = rect.left
                          templateObject[0].top = rect.top + (rect.height /2 - (newHeight/2))
    
                      }
                      if(templateObject[0].name === 'standoff2'){
                          var newHeight = templateObject[0].height * templateObject[0].scaleY 
                          var newWidth = templateObject[0].width * templateObject[0].scaleX
                          
                          templateObject[0].left = rect.left + (rect.width - newWidth) - (newWidth/2)
                          templateObject[0].top = rect.top + (rect.height /2 - (newHeight/2))
                      } 
                  }
                  if(signData.shape == 'stop'){
                      if(templateObject[0].name === 'standoff1'){
                          var newHeight = templateObject[0].height * templateObject[0].scaleY 
    
                          templateObject[0].left = rect.left
                          templateObject[0].top = rect.top + (rect.height /2 - (newHeight/2))
    
                      }
                      if(templateObject[0].name === 'standoff2'){
                          var newHeight = templateObject[0].height * templateObject[0].scaleY 
                          var newWidth = templateObject[0].width * templateObject[0].scaleX
                          
                          templateObject[0].left = rect.left + (rect.width - newWidth)
                          templateObject[0].top = rect.top + (rect.height /2 - (newHeight/2))
                      } 
                  }
              }
              if(signData.fixingMethod.type == 'flag'){
                  if(signData.shape == 'square' || signData.shape == 'rounded-square' || signData.shape == 'rounded-top' || signData.shape == 'rounded-sides' || signData.shape == 'turn-right' || signData.shape == 'turn-left'){
                      if(signData.fixingMethod.ratio == 'small'){
                          if(templateObject[0].name === 'flag1'){
                              var newHeight = templateObject[0].height * templateObject[0].scaleY 
                              var newWidth = templateObject[0].width * templateObject[0].scaleX
    
                              templateObject[0].left = rect.left - (newWidth / 2)
                              templateObject[0].top = rect.top + (rect.height /2 - (newHeight/2))
                          }
                      }
                      if(signData.fixingMethod.ratio == 'big'){
                          if(templateObject[0].name === 'flag1'){
                              var newHeight = templateObject[0].height * templateObject[0].scaleY 
                              var newWidth = templateObject[0].width * templateObject[0].scaleX
    
                              templateObject[0].left = rect.left - (newWidth / 2)
                              templateObject[0].top = rect.top + ((rect.height /4) - (newHeight/2))
      
                          }
                          if(templateObject[0].name === 'flag2'){
                              var newHeight = templateObject[0].height * templateObject[0].scaleY 
                              var newWidth = templateObject[0].width * templateObject[0].scaleX
                              
                              templateObject[0].left = rect.left - (newWidth / 2)
                              templateObject[0].top = rect.top + (((rect.height /4)*3) - (newHeight/2))
                          } 
                      }
                  }
                  if(signData.shape == 'turn-left'){
                      if(signData.fixingMethod.ratio == 'small'){
                          if(templateObject[0].name === 'flag1'){
                              var newHeight = templateObject[0].height * templateObject[0].scaleY 
                              var newWidth = templateObject[0].width * templateObject[0].scaleX
    
                              templateObject[0].left = rect.left + rect.width - (newWidth / 2)
                              templateObject[0].top = rect.top + (rect.height /2 - (newHeight/2))
                          }
                      }
                      if(signData.fixingMethod.ratio == 'big'){
                          if(templateObject[0].name === 'flag1'){
                              var newHeight = templateObject[0].height * templateObject[0].scaleY 
                              var newWidth = templateObject[0].width * templateObject[0].scaleX
    
                              templateObject[0].left = rect.left + rect.width - (newWidth / 2)
                              templateObject[0].top = rect.top + ((rect.height /4) - (newHeight/2))
      
                          }
                          if(templateObject[0].name === 'flag2'){
                              var newHeight = templateObject[0].height * templateObject[0].scaleY 
                              var newWidth = templateObject[0].width * templateObject[0].scaleX
                              
                              templateObject[0].left = rect.left + rect.width - (newWidth / 2)
                              templateObject[0].top = rect.top + (((rect.height /4)*3) - (newHeight/2))
                          } 
                      }
                  }
                  if(signData.shape == 'oval' || signData.shape == 'stop'){
                      if(templateObject[0].name === 'flag1'){
                          var newHeight = templateObject[0].height * templateObject[0].scaleY 
                          var newWidth = templateObject[0].width * templateObject[0].scaleX
    
                          templateObject[0].left = rect.left - (newWidth / 2)
                          templateObject[0].top = rect.top + (rect.height /2 - (newHeight/2))
                      }
                  }
              }
              if(signData.fixingMethod.type == 'table-stand'){
                  if(selectedShape == 'square' || selectedShape == 'rounded-square'){
                      if(templateObject[0].name === 'table-stand'){
                          templateObject[0].left = rect.left - 10
                          templateObject[0].top = rect.top + rect.height   
                      } 
                  }
              }
              if(signData.fixingMethod.type == 'ceiling'){
                  if(selectedShape == 'square' || selectedShape == 'rounded-square' || selectedShape == 'rounded-top' || selectedShape == 'rounded-sides'){
                      if(templateObject[0].name === 'ceiling1'){
                          var newHeight = templateObject[0].height * templateObject[0].scaleY 
    
                          templateObject[0].left = rect.left + (rect.width/5) - newWidth
                          templateObject[0].top = rect.top - (newHeight/2)
    
                      }
                      if(templateObject[0].name === 'ceiling2'){
                          var newHeight = templateObject[0].height * templateObject[0].scaleY 
                          var newWidth = templateObject[0].width * templateObject[0].scaleX
                          
                          templateObject[0].left = rect.left + ((rect.width/5)*4) 
                          templateObject[0].top = rect.top - (newHeight/2)
                      }
                  }
                  if(selectedShape == 'turn-left'){
                      if(templateObject[0].name === 'ceiling1'){
                          var newHeight = templateObject[0].height * templateObject[0].scaleY 
    
                          templateObject[0].left = rect.left + ((rect.width/5)*3.5) - newWidth
                          templateObject[0].top = rect.top - (newHeight/2)
    
                      }
                      if(templateObject[0].name === 'ceiling2'){
                          var newHeight = templateObject[0].height * templateObject[0].scaleY 
                          var newWidth = templateObject[0].width * templateObject[0].scaleX
                          
                          templateObject[0].left = rect.left + ((rect.width/5)*4) 
                          templateObject[0].top = rect.top - (newHeight/2)
                      }
                  }
                  if(selectedShape == 'turn-right'){
                      if(templateObject[0].name === 'ceiling1'){
                          var newHeight = templateObject[0].height * templateObject[0].scaleY 
    
                          templateObject[0].left = rect.left + (rect.width/5) - newWidth
                          templateObject[0].top = rect.top - (newHeight/2)
    
                      }
                      if(templateObject[0].name === 'ceiling2'){
                          var newHeight = templateObject[0].height * templateObject[0].scaleY 
                          var newWidth = templateObject[0].width * templateObject[0].scaleX
                          
                          templateObject[0].left = rect.left + ((rect.width/5)*1.5) 
                          templateObject[0].top = rect.top - (newHeight/2)
                      }
                  }
                  if(selectedShape == 'oval' || selectedShape == 'stop'){
                      if(templateObject[0].name === 'ceiling1'){
                          var newHeight = templateObject[0].height * templateObject[0].scaleY 
    
                          templateObject[0].left = rect.left + (rect.width/2) - (newWidth/2)
                          templateObject[0].top = rect.top - (newHeight/2)
    
                      }
                  }
              }
              if(signData.fixingMethod.type == 'hanging'){
                  if(signData.shape == 'square' || signData.shape == 'rounded-square' || signData.shape == 'rounded-top' || signData.shape == 'rounded-sides'){
                      if(signData.fixingMethod.ratio == 'small'){
                          if(templateObject[0].name === 'hanging-hole'){
                              var newHeight = templateObject[0].height * templateObject[0].scaleY 
      
                              templateObject[0].left = rect.left + rect.width/2 - 15,
                              templateObject[0].top = rect.top + 15    
                          }
                      }
                      if(signData.fixingMethod.ratio == 'big'){
                          if(templateObject[0].name === 'hanging-hole1'){
                              var newHeight = templateObject[0].height * templateObject[0].scaleY 
      
                              templateObject[0].left = rect.left + (rect.width/8) - 15,
                              templateObject[0].top = rect.top + 15    
                          }
                          if(templateObject[0].name === 'hanging-hole2'){
                              var newHeight = templateObject[0].height * templateObject[0].scaleY 
      
                              templateObject[0].left = rect.left + ((rect.width/8)*7) - 15,
                              templateObject[0].top = rect.top + 15    
                          }
                      }
                  }
                  if(selectedShape == 'oval' || selectedShape == 'stop' || selectedShape == 'triangle' || selectedShape == 'rotated-square'){
                      if(templateObject[0].name === 'hanging-hole'){
                          var newHeight = templateObject[0].height * templateObject[0].scaleY 
    
                          templateObject[0].left = rect.left + rect.width/2 - (rect.height * 0.04),
                          templateObject[0].top = rect.top + 20  
                      }
                  }
              }
              if(signData.fixingMethod.type == 'pole-attachment'){
                  if(templateObject[0].name === 'pole'){
                      var newHeight = templateObject[0].height * templateObject[0].scaleY 
    
                      templateObject[0].left = rect.left + rect.width/2 -((rect.width/4)/2),
                      templateObject[0].top = rect.top - (rect.height/2)
                  }
              }
              if(signData.fixingMethod.type == 'table-clamp'){
                  if(signData.shape == 'square' || signData.shape == 'rounded-square' || signData.shape == 'rounded-top' || signData.shape == 'rounded-sides'){
                      if(templateObject[0].name === 'table-clamp1'){
                          var newHeight = templateObject[0].height * templateObject[0].scaleY 
      
                          templateObject[0].left = rect.left + (rect.width/5) - newWidth
                          templateObject[0].top = rect.top + rect.height - (newHeight/2)
                      }
                      if(templateObject[0].name === 'table-clamp2'){
                          var newHeight = templateObject[0].height * templateObject[0].scaleY 
      
                          templateObject[0].left = rect.left + ((rect.width/5)*4) 
                          templateObject[0].top = rect.top + rect.height - (newHeight/2)
                      }
                  }
              }
              if(signData.fixingMethod.type == 'base-support'){
                  if(signData.shape == 'square' || signData.shape == 'rounded-square' || signData.shape == 'rounded-top' || signData.shape == 'rounded-sides'){
                      if(templateObject[0].name === 'base-support1'){
                          var newHeight = templateObject[0].height * templateObject[0].scaleY 
      
                          templateObject[0].left = rect.left + (rect.width/5) - newWidth
                          templateObject[0].top = rect.top + rect.height - (newHeight) + 5
                      }
                      if(templateObject[0].name === 'base-support2'){
                          var newHeight = templateObject[0].height * templateObject[0].scaleY 
      
                          templateObject[0].left = rect.left + ((rect.width/5)*4) 
                          templateObject[0].top = rect.top + rect.height - (newHeight) + 5
                      }
                  }
              }
              if(signData.fixingMethod.type == 'sign-holder'){
                  if(signData.shape == 'square'){
                      if(templateObject[0].name === 'sign-holder-top'){
                          var newHeight = templateObject[0].height * templateObject[0].scaleY 
      
                          templateObject[0].left = rect.left
                          templateObject[0].top = rect.top - (newHeight) + (newHeight/2)
                      }
                      if(templateObject[0].name === 'sign-holder-bottom'){
                          var newHeight = templateObject[0].height * templateObject[0].scaleY 
      
                          templateObject[0].left = rect.left
                          templateObject[0].top = rect.top + rect.height - (newHeight/2) 
                      }
                  }
              }
              if(signData.fixingMethod.type == 'roll-up'){
                  if(signData.shape == 'square'){
                      if(templateObject[0].name === 'sign-holder-top'){
                          var newHeight = templateObject[0].height * templateObject[0].scaleY 
      
                          templateObject[0].left = rect.left
                          templateObject[0].top = rect.top - newHeight
                      }
                      if(templateObject[0].name === 'sign-holder-bottom'){
                          var newHeight = templateObject[0].height * templateObject[0].scaleY 
      
                          templateObject[0].left = rect.left
                          templateObject[0].top = rect.top + rect.height
                      }
                  }
              }
              if(signData.fixingMethod.type == 'eyelets'){}
              if(signData.fixingMethod.type == 'keyring'){
                if(signData.shape == 'square' || selectedShape == "rounded-square" || selectedShape == "rounded-top" || selectedShape == "rounded-sides"){
                  if(templateObject[0].name === 'keyring'){
                      var newHeight = templateObject[0].height * templateObject[0].scaleY 
                      var newWidth = templateObject[0].width * templateObject[0].scaleX
  
                      templateObject[0].left = rect.left - newWidth / 2.5
                      templateObject[0].top = rect.top - newHeight / 1.4
                  }
                  if(templateObject[0].name === 'keyring-hole'){
                      var newHeight = templateObject[0].height * templateObject[0].scaleY 
                      var newWidth = templateObject[0].width * templateObject[0].scaleX
  
                      templateObject[0].left = rect.left + 13
                      templateObject[0].top = rect.top + 13
                  }
                }
                if(signData.shape == 'oval' || selectedShape == "stop" ){
                  if(templateObject[0].name === 'keyring'){
                      var newHeight = templateObject[0].height * templateObject[0].scaleY 
                      var newWidth = templateObject[0].width * templateObject[0].scaleX
  
                      templateObject[0].left = rect.left + rect.width / 2 - newWidth / 2
                      templateObject[0].top = rect.top - newHeight / 1.4
                  }
                  if(templateObject[0].name === 'keyring-hole'){
                      var newHeight = templateObject[0].height * templateObject[0].scaleY 
                      var newWidth = templateObject[0].width * templateObject[0].scaleX
                      var newRadius = rect.height * 0.05;
  
                      templateObject[0].left = rect.left + rect.width / 2 - newRadius
                      templateObject[0].top = rect.top + 15
                  }
                }
                if(signData.shape == 'rotated-square'){
                  if(templateObject[0].name === 'keyring'){
                      var newHeight = templateObject[0].height * templateObject[0].scaleY 
                      var newWidth = templateObject[0].width * templateObject[0].scaleX
  
                      templateObject[0].left = rect.left + rect.width / 2 - newWidth / 2
                      templateObject[0].top = rect.top - newHeight / 1.4
                  }
                  if(templateObject[0].name === 'keyring-hole'){
                      var newHeight = templateObject[0].height * templateObject[0].scaleY 
                      var newWidth = templateObject[0].width * templateObject[0].scaleX
                      var newRadius = rect.height * 0.05;
  
                      templateObject[0].left = rect.left + rect.width / 2 - newRadius
                      templateObject[0].top = rect.top + 15
                  }
                }
                if(signData.shape == 'triangle'){
                  if(templateObject[0].name === 'keyring'){
                      var newHeight = templateObject[0].height * templateObject[0].scaleY 
                      var newWidth = templateObject[0].width * templateObject[0].scaleX
  
                      templateObject[0].left = rect.left + rect.width / 2 - newWidth / 2
                      templateObject[0].top = rect.top + rect.height / 10 - newHeight / 1.2
                  }
                  if(templateObject[0].name === 'keyring-hole'){
                      var newHeight = templateObject[0].height * templateObject[0].scaleY 
                      var newWidth = templateObject[0].width * templateObject[0].scaleX
                      var newRadius = rect.height * 0.05;
  
                      templateObject[0].left = rect.left + rect.width / 2 - newRadius
                      templateObject[0].top = rect.top + rect.height / 10
                  }
                }
              }
              if(signData.fixingMethod.type == 's-hook'){}
            }
                        
            // console.log(...templateObject)                            
            
            canva.add(...templateObject);
  
            // canva.renderAll();
            // setTimeout(() => {
            //   canva.renderAll();
            // }, 500); 
        });
    })
  }

  loadFromJSON(canvas, canvas1Json)
  if(templateData.doubleFace){
    loadFromJSON(backCanvas, canvas2Json)
  }


  var currentSizeValues = handleChangeSize(templateData.size.width, templateData.size.height, "Template", -1)
  handleGetShape(templateData.shape)
  // console.log(currentSizeValues)
  resetFixing(canvas)
  handleSelectFixingMethode(templateData.fixingMethod.type)

  var sign = handleGetObjectByName('safeObject')
  function setMeasurmentValue(canvas){
      var Objects = canvas.getObjects();
      Objects.forEach(object => {
          if(object.name == 'heightLine'){
              object.set({
                  x1 : (sign.left + sign.width + 30), 
                  y1: sign.top, 
                  x2: (sign.left + sign.width + 30), 
                  y2: (sign.top + sign.height)
              })
          }
          if(object.name == 'widthLine'){
              object.set({
                  x1: sign.left, 
                  y1: (sign.top + sign.height + 28.5), 
                  x2: (sign.left + sign.width + 10), 
                  y2: (sign.top + sign.height + 28.5)
              })
          }
          if(object.name == 'height-value'){
              object.text = String(signData.size.height + ' ' + currentUnit)
              object.top = sign.top + (sign.height/2)
              object.left = sign.left + sign.width + 55
          }
          if(object.name == 'width-value'){
              object.text = String(signData.size.width + ' ' + currentUnit)
              object.left = sign.left + (sign.width/2) - (object.width/2)
              object.top = sign.top + (sign.height + 35)
          }
          if(object.name == 'thickness-value'){
              object.left = sign.left + (sign.width/2) - (object.width/2)
              object.top = sign.top + (sign.height + 65)
              object.text = String("Thickness" + ': ' + currentThickness + ' ' + currentUnit)
          }
          if(selectedShape == 'square'){
              if(object.name == 'old-world-border'){
                  var scaleX = sign.width / object.width;
                  var scaleY = sign.height / object.height;
                  object.left = sign.left
                  object.top = sign.top
                  object.scaleX = scaleX
                  object.scaleY = scaleY
              }
          }
      })
      canvas.renderAll()
  }
  setMeasurmentValue(canvas)
  setMeasurmentValue(backCanvas)


  return {
      size: currentSizeValues,
      texts: addedTexts,
      images: addedImages,
  }
}


function handleFinishConfiguration(textsTable, imagesTable) {
  var textsValues = [];
  var imagesValues = [];
  function formatValues(value) {
    var object = {
      width: {
        label: visualizerText.width,
        value: value.width,
      },
      height: {
        label: visualizerText.height,
        value: value.height,
      },
      left: {
        label: visualizerText.left,
        value: value.left,
      },
      top: {
        label: visualizerText.top,
        value: value.top,
      },
      right: {
        label: visualizerText.right,
        value: value.right,
      },
      bottom: {
        label: visualizerText.bottom,
        value: value.bottom,
      },
    };

    return object;
  }
  if (textsTable.length > 0) {
    textsTable.forEach((text) => {
      function addTextValues(arr, obj, key) {
        const exists = arr.some((item) => item[key] === obj[key]);
        if (!exists) {
          arr.push(obj);
        }
      }
      addTextValues(
        textsValues,
        {
          id: text.id,
          values: formatValues(handleGetAddedTextValues(text)),
          textContent: text.text,
          bold: text.fontWeight,
          italic: text.fontStyle,
          fontFamily: text.fontFamily,
          color: text.fill,
          underlined: text.underline,
          crossed: text.linethrough,
          overlined: text.overline,
          alignment: text.textAlign,
          object: text,
        },
        "id"
      );
    });
  }
  if (imagesTable.length > 0) {
    imagesTable.forEach((image) => {
      function addTextValues(arr, obj, key) {
        const exists = arr.some((item) => item[key] === obj[key]);
        if (!exists) {
          arr.push(obj);
        }
      }
      addTextValues(
        imagesValues,
        {
          id: image.id,
          url: (image.objectType === 'svg' ? image.imageUrl : image.getSrc()),
          values: formatValues(handleGetAddedImageValues(image)),
        },
        "id"
      );
    });
  }
  return {
    texts: textsValues,
    images: imagesValues,
  };
}

// export {
//   handleCheckTemplate,
//   handleReadyToSaveState,
//   handleGetCanvas,
//   handleGetCurrentUnit,
//   handleGetDefaultText,
//   handleUndo,
//   handleRedo,
//   handleClearAll,
//   handleGetObjectByName,
//   handleGetSignPosition,
//   handleChangeSize,
//   handleChangeThickness,
//   handleDeleteObject,
//   handleCloneObject,
//   handleCenterVertically,
//   handleCenterHorizontally,
//   handlechangeBorderColor,
//   handleGetBorderData,
//   handleSelectBorder,
//   handleGetBorderRestart,
//   handleChangeSignColor,
//   handleGetShape,
//   handleSelectShape,
//   handleGetActiveFixing,
//   handleSelectFixingMethode,
//   handleGetAddedTextValues,
//   handleAddTextToSign,
//   handleChangeTextValue,
//   handleChangeTextAlign,
//   handleChangeTextWeight,
//   handleChangeTextStyle,
//   handleChangeTextSize,
//   handleChangeTextFontFam,
//   handleChangeTextColor,
//   handleUnderlineText,
//   handleCrossText,
//   handleOverlineText,
//   handleGetImageSettings,
//   handleGetAddedImageValues,
//   handleAddImageToSign,
//   handleTurnImageLeft,
//   handleTurnRightImage,
//   handleChangeImageWidth,
//   handleChangeImageHeight,
//   handleFlipImage,
//   handleSelectFilter,
//   handleCheckActiveSignFace,
//   handleCloneCanvas,
//   setPattern,
//   handleSetImageToSignBackground,
//   handleFinishConfiguration,
//   handleGetCharPrice,
//   handleSetPrice,
//   handleClipAddedObject,
//   handleGetNewPosition,
//   handleLockMoving,
//   handleLockScaling,
//   handleLockRotating,
//   handleLockEdition,
//   handleAddTemplateText,
//   handleMoveobject,
//   handleChangeAddedSvgColor,
// };
