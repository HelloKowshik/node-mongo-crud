const { format } = require('date-fns');
const { v4: uuid } = require('uuid');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logEvents = async (msg, logName) => {
  const dateTime = `${format(new Date(), 'dd:MM:yyyy\tHH:mm:ss')}`;
  const logMsg = `${uuid()}\t${dateTime}\t${msg}\n`;
  // console.log(logMsg);
  try {
    if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
      fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
    }
    await fsPromises.appendFile(
      path.join(__dirname, '..', 'logs', logName),
      logMsg
    );
  } catch (e) {
    console.error(e);
  }
};

const logger = (req, res, next) => {
  logEvents(
    `${req.method}\t${req.headers.origin}\t${req.url}`,
    'requestLogs.txt'
  );
  console.log(`${req.method} - ${req.url}`);
  next();
};

module.exports = { logger, logEvents };
