const sendResponse = (res, statusCode, returnedData) => {
    res.statusCode = statusCode;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(returnedData));
  };
  
  module.exports = {sendResponse};