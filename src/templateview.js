const axios = require('axios');

// URL 정의 장소
const pptCategoriesURL = 'http://45.77.179.168:3000/api/v1/services/ppt_categories/';

const formatString = (stringValue, replacementsArray) => {
  let formatted = stringValue;
  for (let i = 0; i < replacementsArray.length; i += 1) {
    const regexp = new RegExp(`\\{${i}\\}`, 'gi');
    formatted = formatted.replace(regexp, replacementsArray[i]);
  }
  return formatted;
};

// 스트링 포맷방법:
// 0: 영어 문장
// 1: 문장 한글 뜻
// 2: 문장 HTML (대체 가능 부분 포함)
// 3: 
const sentCollapsibleHTML = `
<li class="sent collapsible"><p>{0}<br>
  <small>{1}</small></p>
  <i class="fas fa-plus"></i>
</li>
<div class="word-example one noselect">
  <div class="abc-sentence">{2}</div>
  <div class="word-options">
    {3}
  </div>
  <div class="word-select-btn">문장대체</div>
</div>
`

// template page: /template

const tagName = '인사하기';
const sentenceURL = `http://45.77.179.168:8000/api/v1/services/sentence/?role=${tagName}`;

const showSentences = async () => {
  let assistListHTML = '';
  const response = await axios.get(sentenceURL);
  for (const sentenceJSON of response.data.results) {
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
