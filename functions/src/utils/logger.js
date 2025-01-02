module.exports = {
  log: (message, data = null) => {
    console.log(`[LOG]: ${message}`);
    if (data) console.log(data);
  },
  error: (message, error) => {
    console.error(`[ERROR]: ${message}`);
    if (error) console.error(error);
  },
};
