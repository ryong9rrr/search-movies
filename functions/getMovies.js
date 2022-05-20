const axios = require('axios');
require('dotenv').config();
const { API_END_POINT } = process.env;

exports.handler = async function (e) {
  const options = JSON.parse(e.body);
  const { keyword = '', page = 1, method, body } = options;

  const { data } = await axios({
    url: `${API_END_POINT}&s=${keyword}&page=${page}`,
    method,
    data: body,
  });
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
