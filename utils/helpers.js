const moment = require('moment');

module.exports = {
    formatDate: (date) => {
      const newDate = moment(date, 'x').format('LLLL');
      return newDate;
    }
};
  
