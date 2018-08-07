const { companyTags } = require('./wantedData.js');

const formatString = (stringValue, replacementsArray) => {
  let formatted = stringValue;
  for (let i = 0; i < replacementsArray.length; i += 1) {
    const regexp = new RegExp(`\\{${i}\\}`, 'gi');
    formatted = formatted.replace(regexp, replacementsArray[i]);
  }
  return formatted;
};

const dataRowHTML = `
<div class="data-row">
  <div class="skill">
    <div class="rank">{0}</div>
    <div class="skill-name">{1}</div>
    <div class="skill-count">{2}</div>
  </div>
  <div class="companies">
    {3}
  </div>
</div>
<div class="data-row-divider"></div>
`;

const companyTagHTML = `
<div class="comp">{0}</div>
`;

const appendRankData = (rank, skill, count, companies) => {
  let allCompanyTagsHTML = '';
  for (let i = 0; i < companies.length; i += 1) {
    const comp = companies[i];
    const companyTag = formatString(companyTagHTML, [comp]);
    allCompanyTagsHTML += companyTag;
  }
  const dataArray = [rank, skill, count, allCompanyTagsHTML];
  const dataRow = formatString(dataRowHTML, dataArray);
  return dataRow;
}

const loadRankData = (initialRank) => {
  let loopNum = 1;
  for (const key in companyTags) {
    if (loopNum < initialRank) {
      loopNum += 1;
      continue;
    }
    if (loopNum > initialRank + 9) {
      break;
    }
    const rankData = rank;
    const skillNameData = key;
    const skillCountData = companyTags[key][0];
    const companiesData = companyTags[key][1]; // 어레이

    const dataRow = appendRankData(rankData, skillNameData, skillCountData, companiesData);

    const dataTable = document.getElementById('data-table');
    dataTable.insertAdjacentHTML('beforeend', dataRow);

    rank += 1;
    loopNum += 1;
  }
}

var rank = 1;

document.addEventListener('DOMContentLoaded', () => {
  loadRankData(rank);
});

document.addEventListener('click', (e) => {
  if (e.target.id === 'load-more-btn') {
    loadRankData(rank);
  }
});
