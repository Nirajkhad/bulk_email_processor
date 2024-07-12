const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

function getEmailsFromCSV(fileName) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(__dirname, '../storage', 'uploads', fileName);
    const emails = [];

    if (!fs.existsSync(filePath)) {
      return reject(new Error(`File '${fileName}' does not exist`));
    }

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        const email = row.Email; 
        emails.push(email);
      })
      .on('end', () => {
        resolve(emails);
      })
      .on('error', (err) => {
        reject(err);
      });
  });
}

module.exports = {getEmailsFromCSV};
