const { addComment } = require('./addComment/addComment');
const { addFaqQuestion } = require('./addFaqQuestion/addFaqQuestion');
const { addsNewCar } = require('./cars/addsNewCar/addsNewCar');
const { getCarById } = require('./cars/getCarById/getCarById');
const { default: getCarByName } = require('./cars/getCarByName/getCarByName');
const { setReadsStatusById } = require('./notifications/setReadsStatusById');
const { removeComment } = require('./removeComment/removeComment');
const {
  addReturnablePackaging,
} = require('./returnablePackaging/addReturnablePackaging/addReturnablePackaging');
const {
  updateReturnablePackaging,
} = require('./returnablePackaging/updateReturnablePackaging/updateReturnablePackaging');
const {
  subscribeToFaqQuestions,
} = require('./subscribeToFaqQuestions/subscribeToFaqQuestions');
const { updateComment } = require('./updateComment/updateComment');
const { updateFaqQuestion } = require('./updateFaqQuestion/updateFaqQuestion');
const { uploadPhotos } = require('./uploadPhotos/uploadPhotos');

module.exports = {
  addsNewCar,
  getCarById,
  getCarByName,
  addComment,
  updateComment,
  removeComment,
  uploadPhotos,
  subscribeToFaqQuestions,
  addFaqQuestion,
  updateFaqQuestion,

  addReturnablePackaging,
  updateReturnablePackaging,

  setReadsStatusById,
};
