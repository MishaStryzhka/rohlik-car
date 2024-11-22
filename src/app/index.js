const { addCarComment } = require('./addCarComment/addCarComment');
const { addFaqQuestion } = require('./addFaqQuestion/addFaqQuestion');
const { addsNewCar } = require('./addsNewCar/addsNewCar');
const { getCarById } = require('./getCarById/getCarById');
const { removeCarComment } = require('./removeComment/removeComment');
const { updateCarComment } = require('./updateCarComment/updateCarComment');
const { uploadPhotos } = require('./uploadPhotos/uploadPhotos');

module.exports = {
  addFaqQuestion,
  addsNewCar,
  getCarById,
  addCarComment,
  updateCarComment,
  removeCarComment,
  uploadPhotos,
};
