const { addCarComment } = require('./addCarComment/addCarComment');
const { addsNewCar } = require('./addsNewCar/addsNewCar');
const { getCarById } = require('./getCarById/getCarById');
const { removeCarComment } = require('./removeComment/removeComment');
const { updateCarComment } = require('./updateCarComment/updateCarComment');

module.exports = {
  addsNewCar,
  getCarById,
  addCarComment,
  updateCarComment,
  removeCarComment,
};
