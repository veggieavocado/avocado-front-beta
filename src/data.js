const axios = require('axios');

const {
  createSparkline,
  createDonutChart,
  createBarChart,
  createVerticalBarChart
} = require('./charts.js');

const formatString = (stringValue, replacementsArray) => {
  let formatted = stringValue;
  for (let i = 0; i < replacementsArray.length; i += 1) {
    const regexp = new RegExp(`\\{${i}\\}`, 'gi');
    formatted = formatted.replace(regexp, replacementsArray[i]);
  }
  return formatted;
};


//////////////////****************
///// STEP 1 /////****************
//////////////////////////////////
///// CONTENT HEADER SECTION /////
//////////////////////////////////
// --> <div class="content-header"></div>
const contentHeaderHTML = `
<div class="top">
  [8월 원티드 통계] 스타트업 기술 트렌드
</div>
<div class="divider"></div>
<div class="bottom">
  <div class="data-count">
    <b>분석 데이터 수:</b> <span class="count">{0}</span>개
  </div>
  <div class="data-origin">
    <b>데이터 출처:</b> 원티드 (
      <a href="https://www.wanted.co.kr/">wanted.co.kr</a>
    )
  </div>
</div>
`;

const createContentHeader = async () => {
  const CONTENTS_URL = 'http://45.76.213.33:3000/gobble/api/v1/contents/wanted_job_contents/';

  // content-header 부분 생성
  const res = await axios.get(CONTENTS_URL);
  const count = res.data.count;
  const headerHTML = formatString(contentHeaderHTML, [count]);

  const contentHeaderSection = document.getElementsByClassName('content-header')[0];
  contentHeaderSection.innerHTML = headerHTML;
};
////////////////////////////////////////////
///// CONTENT HEADER SECTION ENDS HERE /////
////////////////////////////////////////////


//////////////////************
///// STEP 2 /////************
//////////////////////////////
///// RANK CHART SECTION /////
//////////////////////////////
// --> <div class="rank-chart"></div>
const rankChartHTML = `
<div class="table-header">
  <div class="first row row-10"></div>
  <div class="row row-20 narrow">기술</div>
  <div class="row row-10 narrow">점유율</div>
  <div class="row row-10 narrow">공고수</div>
  <div class="row row-20 trend">트렌드</div>
  <div class="additional row row-30">
    <span>관련스타트업</span>
    <span class="more-btn">더보기 ></span>
  </div>
</div>
{0}
`; // --> table-body가 이후에 여러개 들어갈 수 있다

const tableBodyHTML = `
<div class="table-body">
  <div class="data-row">
    <div class="first row row-10">{0}</div>
    <div class="row row-20 narrow">{1}</div>
    <div class="row row-10 narrow">{2}</div>
    <div class="row row-10 narrow">{3}</div>
    <div class="chart row row-20">
      <span class="dynamicsparkline{4}"></span>
    </div>
    <div class="row row-30">
      {5}
    </div>
  </div>
</div>
`;

const startupTagHTML = `
<span class="startup-span">{0}</span>
`;

const fillRankChartWithSparklines = () => {
  const chartIDList = ['.dynamicsparkline1', '.dynamicsparkline2', '.dynamicsparkline3', '.dynamicsparkline4', '.dynamicsparkline5']
  const chartValuesList = [
    [10, 8, 5, 7, 4, 4, 1, 2, 4, 3, 4, 6, 7, 4, 12, 23],
    [34, 24, 26, 27, 25, 34, 35, 36, 19, 18, 17, 24, 25],
    [45, 45, 45, 42, 40, 47, 49, 50, 37, 36, 35, 34, 33],
    [34, 24, 26, 27, 25, 34, 35, 50, 37, 36, 35, 34, 33],
    [34, 24, 26, 27, 4, 4, 1, 2, 4, 3, 4, 6, 18, 17, 24, 25]
  ]

  // Sparkline 그리기:
  for (let i = 0; i < chartIDList.length; i += 1) {
    createSparkline(chartIDList[i], '200px', '40px', chartValuesList[i]);
  }
};

const createRankChart = async (data) => {

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

    const rankNum = i + 1;
    const skillName = tableRowData[0];
    const percentage = ((parseInt(tableRowData[1]) / totalSkillCount) * 100).toFixed(2) + '%';
    const hireCount = String(tableRowData[1]) + '개';
    const companiesList = tableRowData[2].slice(0, 4); // 회사는 4개만 가져온다

    let tagsHTML = ''; // 태그는 4개씩 추가돼야 한다
    // 루프를 돌리기 전에 tagsHTML을 빈 스트링값으로 설정해준다

    // 회사 리스트로 태그를 만든다
    for (let j = 0; j < companiesList.length; j += 1) {
      const comp = companiesList[j].split('(')[0] // (Wantedlab)과 같은 형식으로 영문 이름이 괄호 안에 있다
      const compTag = formatString(startupTagHTML, [comp]);
      if (j === companiesList.length - 1) {
        // 태그 마지막에는 콤마랑 빈 공간이 필요없다
        tagsHTML = tagsHTML + compTag;
      } else {
        // 다음 태그가 존재한다면, 태그 바로 뒤에 콤마를 붙이고 빈 공간을 하나 만들어준다
        tagsHTML = tagsHTML + compTag + ',&nbsp;';
      }
    }

    // 위에서 만든 태그로 테이블을 만든다
    const html = formatString(tableBodyHTML, [
      rankNum,
      skillName,
      percentage,
      hireCount,
      rankNum,
      tagsHTML
    ]);
    // console.log(html); // 디버깅: 랭크 테이블에 추가하는 HTML 확인하기
    tableHTML = tableHTML + html;
  }

  const finalRankChartHTML = formatString(rankChartHTML, [tableHTML]);

  const rankChartSection = document.getElementsByClassName('rank-chart')[0];
  rankChartSection.innerHTML = finalRankChartHTML;

  // 랭크 테이블에 스파크라인 그리기
  fillRankChartWithSparklines();

  // 랭크 테이블 주위에 보더 주기
  document.getElementsByClassName("rank-chart")[0].style.border = 'solid 2px #F0F0F0';
};
////////////////////////////////////////
///// RANK CHART SECTION ENDS HERE /////
////////////////////////////////////////


//////////////////*******************
///// STEP 3 /////*******************
/////////////////////////////////////
///// CHARTS COLLECTION SECTION /////
/////////////////////////////////////
// --> <div class="charts-collection"></div>
const chartSecHTML = `
<div class="chart-sec">
  <div class="chart-header">
    <div class="left">{0}</div>
  </div>
  <div class="chart-wrapper">
    <div class="chart" id="{1}"></div>
  </div>
</div>
` // 예: 기술 점유율, (donut-chart, bar-chart, ver-bar-chart, word-cloud, spiderweb, scatterplot)

const filterChartSecHTML = `
<div class="chart-sec">
  <div class="chart-header">
    <div class="left">
      {0}
      <div class="chart-filter">
        {1}
      </div>
    </div>
  </div>
  <div class="chart-wrapper">
    <div class="chart" id="{2}"></div>
  </div>
</div>
` // 필터가 적용된 차트 부분 HTML이다

const chartFilterHTML = `
<div id="{0}" class="filter">{1}</div>
` // 차트 필터 부분에 들어가게 될 필터들이다

const createChartsCollection = (data) => {
  // 하이차트 데이터 여기서 정의
  const donutChartData = JSON.parse(data['WANTED_TOP_SKILL_HIGHCHARTS_DATA']);
  const verticalBarChartData = JSON.parse(data['WANTED_POSITION_COUNT_HIGHCHARTS_DATA']);
  const barChartData = JSON.parse(data['WANTED_SKILL_HIRE_COUNT_HIGHCHARTS_DATA']);

  let highChartsHTML = '';

  ///// 아래부분 차팅 완료하기 /////
  const chartTitles = ['TOP 10 기술 점유율', '직군별 공고수', '직군별 기술 사용량']
  const chartIDNames = ['donut-chart', 'ver-bar-chart', 'bar-chart']

  const filterExists = [false, false, true]
  const chartFilters = [
    [],
    [],
    ['프론트엔드', '백엔드', '서버', '데브옵스', '데이터분석'],
  ]

  for (let i = 0; i < chartIDNames.length; i += 1) {
    const chartTitle = chartTitles[i];
    const chartID = chartIDNames[i];

    // HTML 태그 정의
    let allFiltersHTML = '';
    let chartHTML = '';

    // 필터가 있다면 따로 필터 태그들을 생성한 다음 HTML을 만든다
    if (filterExists[i] === true) {
      for (let j = 0; j < chartFilters[i].length; j += 1) {
        const filter = chartFilters[i][j];
        const filterIDName = chartID + '-filter-' + String(j);
        // 필터 태그들 만들기
        const filterItem = formatString(chartFilterHTML, [filterIDName, filter]);
        allFiltersHTML = allFiltersHTML + filterItem;
      }
      chartHTML = formatString(filterChartSecHTML, [chartTitle, allFiltersHTML, chartID]);
    } else {
      // 필터가 없다면, 일반 차트 섹션을 만든다
      chartHTML = formatString(chartSecHTML, [chartTitle, chartID]);
    }
    highChartsHTML = highChartsHTML + chartHTML;
  }

  const chartsCollectionSection = document.getElementsByClassName('charts-collection')[0];
  chartsCollectionSection.innerHTML = highChartsHTML;

  // 1. donut-chart부분 채우기
  createDonutChart('donut-chart', donutChartData.slice(0, 10)); // 상위 10개만 차트 만들때 사용한다

  // 2. ver-bar-chart부분 채우기
  createVerticalBarChart('ver-bar-chart', verticalBarChartData);

  // 3. bar-chart부분 채우기
  createBarChart('bar-chart', barChartData[0]);

};
///////////////////////////////////////////////
///// CHARTS COLLECTION SECTION ENDS HERE /////
///////////////////////////////////////////////

// function fooOnResize() {
//   var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
//   if (w < 800) {
//     var myvalues1 = [10, 8, 5, 7, 4, 4, 1, 2, 4, 3, 4, 6, 7, 4, 12, 23];
//     $('.dynamicsparkline1').sparkline(myvalues1, {
//       type: 'line',
//       barColor: 'green',
//       width: '100px',
//       height: '20px',
//       fillColor: '#fcfcfc',
//       lineColor: '#bcbcbc',
//       spotColor: '#bcbcbc',
//       minSpotColor: '#ffbb35',
//       maxSpotColor: '#ffbb35',
//       highlightSpotColor: '#777777', // 라인 차트 위에 있는 데이터점
//       highlightLineColor: 'white', // 마우스 호버할 때 생기는 수직선
//       lineWidth: '1.3',
//       disableTooltips: 'true',
//     });
//   }
// }
//
// window.addEventListener("resize", fooOnResize)

// document related event listeners here //
document.addEventListener('DOMContentLoaded', async () => {
  const CACHE_DATA_URL = 'http://45.76.213.33:3000/gobble/api/v1/wanted_page_data';

  const res = await axios.get(CACHE_DATA_URL);
  const data = res.data;

  await createContentHeader();
  await createRankChart(data);
  await createChartsCollection(data);

  const loadSection = document.getElementsByClassName('lds-roller')[0];
  loadSection.style.display = 'none';
});

let barChartFilterNum = 1;

document.addEventListener('click', async (e) => {
  if (e.target.id === 'bar-chart-filter-0') {
    console.log('1');
  } else if (e.target.id === 'bar-chart-filter-1') {
    console.log('2');
  } else if (e.target.id === 'bar-chart-filter-2') {
    console.log('3');
  } else if (e.target.id === 'bar-chart-filter-3') {
    console.log('4');
  } else if (e.target.id === 'bar-chart-filter-4') {
    console.log('5');
  }
});
