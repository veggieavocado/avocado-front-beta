const axios = require('axios');

const tagName = '인사하기';
const sentenceURL = `http://45.77.179.168:8000/api/v1/services/sentence/?role=${tagName}`;

const showSentences = async () => {
  let assistListHTML = '';
  const response = await axios.get(sentenceURL);
  for (sentenceJSON of response.data.results) {
    console.log(sentenceJSON.sentence);
    const sentenceTxt = sentenceJSON.sentence;
    const listItem = `<li>${sentenceTxt}</li>`;
    console.log(listItem);
    assistListHTML += listItem;
    console.log(assistListHTML);
  }
  return assistListHTML;
};

// /// document related event listeners here /////
document.addEventListener('DOMContentLoaded', async () => {
  const assistNameElmt = document.getElementsByClassName('assist-name')[0];
  assistNameElmt.innerHTML = `<h1>${tagName}</h1>`;

  const assistListElmt = document.getElementsByClassName('assist-list')[0];

  const newHTML = await showSentences();
  assistListElmt.innerHTML = newHTML;
});
