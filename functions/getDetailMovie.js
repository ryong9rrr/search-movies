const axios = require('axios');
require('dotenv').config();
const { API_END_POINT } = process.env;

exports.handler = async function (e) {
  const options = JSON.parse(e.body);
  const { id = '', full = false, method, body } = options;

  const { data } = await axios({
    url: `${API_END_POINT}&i=${id}&plot=${full ? 'full' : 'short'}`,
    method,
    data: body,
  });
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
