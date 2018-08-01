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

// category page: /pptselect

// cardHTML:
// 0: 템플릿 갯수
// 1: 문장 갯수
// 2: 단어 수
// 3: 카테고리 이름
const cardHTML = `
<div class='card-wrapper'>
  <div class='card-info'>
    <div class="tmp-stats">템플릿 {0}</div>
    <div class="tmp-stats">문장 {1}</div>
    <div class="tmp-stats">단어 수 {2} &#9662;</div>
  </div>
  <div class="card">
    <div class="card-img img-{3}"></div>
    <div class="container-head">
      <a href="/template"><br><h3><b>{4}</b></h3><br></a></div>
  </div>
</div>
`;

// cardWrapHTML:
// 0: cardHTML
const cardWrapHTML = `
<div class="ppt-select-box">
  {0}
</div>
`;

const getCategories = async () => {
  const response = await axios.get(pptCategoriesURL);
  const categoriesArray = response.data['카테고리'];
  console.log(categoriesArray);

  let contentBody = '';
  let contentBodyHTML = '';
  let cardNums = 0;
  let cardRow = '';
  const totalCardNums = categoriesArray.length;
  for (const category of categoriesArray) {
    const imageNum = String(cardNums + 1); // CSS에서 img-1, 2, 3... 이런식으로
    // 이미지를 지정해준다. 초기에 카테고리카드 HTML을 만들기 때문에 cardNums에서 1을 더한다
    const replacements = ['0', '0', '0', imageNum, category];
    const categoryCard = formatString(cardHTML, replacements);
    if ((cardNums !== 0) && (cardNums % 3 === 0)) {
      // 3개의 카테고리를 받아서 HTML 엘레먼트로 만들었다면 이 단계로 온다.
      // 4단계라고 보면 된다

      // 한 줄을 3개의 카드로 채웠다면, cardWrapHTML로 감싸준다
      contentBody = formatString(cardWrapHTML, [cardRow]);
      contentBodyHTML += contentBody;

      // 루프를 시작하면서 받아온 데이터를 카드줄에 붙여준다
      cardRow = categoryCard;
      cardNums += 1;
    }
    // 루프의 시작이나 새로운 카드줄을 만들지 않으면...
    if (totalCardNums === cardNums) {
      console.log('DONE!!!')
      // 더 이상의 카드가 없다면 마무리한다
      contentBody = formatString(cardWrapHTML, [cardRow]);
      contentBodyHTML += contentBody;

      cardRow += categoryCard;
      cardNums += 1;
    } else {
      // 1단계!!! 루프 시작은 여기로 온다.
      // 2단계, 3단계 모두 여기로 온다.
      cardRow += categoryCard;
      cardNums += 1;
    }
  }
  // 카테고리가 3개 미만인 경우, 새로운 row가 생성되지 않는다
  // 그럴 경우 ''의 값을 가진 contentBodyHTML에 cardRow값을 부여한다
  if (contentBodyHTML === '') {
    contentBody = formatString(cardWrapHTML, [cardRow]);
    contentBodyHTML += contentBody;
  }

  return contentBodyHTML;
};

// /// document related event listeners here /// //
document.addEventListener('DOMContentLoaded', async () => {
  const titleContainer = document.getElementsByClassName('title-container')[0];
  const contentBodyHTML = await getCategories();
  titleContainer.innerHTML = contentBodyHTML;
});
