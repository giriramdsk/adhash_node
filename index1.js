const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://www.wholesalehyundaiparts.com';

axios.get(url)
  .then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);
    const partNumber = $('#product_part_number').text().trim();
    console.log(`The part number is ${partNumber}.`);
  })
  .catch((error) => {
    console.log(`There was an error: ${error}`);
  });
