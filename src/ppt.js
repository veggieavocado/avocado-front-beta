const axios = require('axios');

// URL 정의 장소
const pptCategoriesURL = 'http://45.77.179.168:3000/api/v1/services/ppt_categories/';

String.prototype.format = () => {
  let formatted = this;
  for (let i = 0; i < arguments.length; i++) {
      var regexp = new RegExp('\\{'+i+'\\}', 'gi');
      formatted = formatted.replace(regexp, arguments[i]);
  }
  return formatted;
}

// category page: /pptselect

// cardHTML:
// 0: 템플릿 갯수
// 1: 문장 갯수
// 2: 단어 수
// 3: 카테고리 이름
let cardHTML= `
<div class='card-wrapper'>
  <div class='card-info'>
    <div class="tmp-stats">템플릿 {0}</div>
    <div class="tmp-stats">문장 {1}</div>
    <div class="tmp-stats">단어 수 {2} &#9662;</div>
  </div>
  <div class="card">
    <div class="card-img two"></div>
    <div class="container-head">
      <a href="/template"><br><h3><b>{3}</b></h3><br></a></div>
  </div>
</div>
`;

// cardWrapHTML:
// 0: cardHTML
let cardWrapHTML = `
<div class="ppt-select-box">{0}</div>';
`;

const getCategories = async () => {
  const response = await axios.get(pptCategoriesURL);
  console.log(response);
};

// /// document related event listeners here /////
document.addEventListener('DOMContentLoaded', async () => {
  const assistNameElmt = document.getElementsByClassName('assist-name')[0];
  assistNameElmt.innerHTML = `<h1>${tagName}</h1>`;

  const assistListElmt = document.getElementsByClassName('assist-list')[0];

  const newHTML = await showSentences();
  assistListElmt.innerHTML = newHTML;
});

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
