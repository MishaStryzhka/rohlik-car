const { addComment } = require('./addComment/addComment');
const { addFaqQuestion } = require('./addFaqQuestion/addFaqQuestion');
const { addsNewCar } = require('./addsNewCar/addsNewCar');
const { getCarById } = require('./getCarById/getCarById');
const { removeComment } = require('./removeComment/removeComment');
const {
  subscribeToFaqQuestions,
} = require('./subscribeToFaqQuestions/subscribeToFaqQuestions');
const { updateComment } = require('./updateComment/updateComment');
const { updateFaqQuestion } = require('./updateFaqQuestion/updateFaqQuestion');
const { uploadPhotos } = require('./uploadPhotos/uploadPhotos');

module.exports = {
  addFaqQuestion,
  addsNewCar,
  getCarById,
  addComment,
  updateComment,
  removeComment,
  uploadPhotos,
  subscribeToFaqQuestions,
  updateFaqQuestion,
};
