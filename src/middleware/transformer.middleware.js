const { sendResponse } = require("../services/http-response-management.service");

const parseJson = (req, res, next) => {
    if(req.headers['content-type'] === 'application/json') {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk.toString();
      });
      req.on('end', () => {
        try {
          req.body = JSON.parse(body);
          next;
        } catch (err) {
            sendResponse(res, 400, {code: 400,  error: 'Invalid JSON payload' });
        }
      });
    } else {
      next;
    }
    };

module.exports = {parseJson}