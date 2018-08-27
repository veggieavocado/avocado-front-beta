const axios = require('axios');

const formatString = (stringValue, replacementsArray) => {
  let formatted = stringValue;
  for (let i = 0; i < replacementsArray.length; i += 1) {
    const regexp = new RegExp(`\\{${i}\\}`, 'gi');
    formatted = formatted.replace(regexp, replacementsArray[i]);
  }
  return formatted;
};

const tableBodyRowHTML = `
<div class="data-row">
  <div class="right"><span>{0}</span></div>
  <div class="left">{1}</div>
</div>
`; // 보통 테이블에 행 5개씩 들어간다

const makeContentsTableBody = (data) => {
  const tableData = JSON.parse(data['WANTED_SKILL_RANK_TABLE_DATA']);

  let totalSkillCount = 0;
  for (const dataList of tableData) {
    const count = dataList[1];
    totalSkillCount = totalSkillCount + count;
  }

  // 테이블 HTML을 만들 준비한다
  let tableHTML = '';

  // 루프를 돌려서 상위 5개만 가져온다
  for (let i = 0; i < 5; i += 1) {
    const tableRowData = tableData[i];

    const skillName = tableRowData[0];
    const percentage = ((parseInt(tableRowData[1]) / totalSkillCount) * 100).toFixed(2) + '%';

    const rowHTML = formatString(tableBodyRowHTML, [skillName, percentage]);
    tableHTML = tableHTML + rowHTML;
  }

  const wantedContentTableSection = document.getElementById('wanted-content-table');
  wantedContentTableSection.innerHTML = tableHTML;
};

// document related event listeners here //
document.addEventListener('DOMContentLoaded', async () => {
  const CACHE_DATA_URL = 'http://45.76.213.33:3000/gobble/api/v1/wanted_page_data';

  const res = await axios.get(CACHE_DATA_URL);
  const data = res.data;

  makeContentsTableBody(data);
});
