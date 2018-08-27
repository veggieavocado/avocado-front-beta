const axios = require('axios');
var Highcharts = require('highcharts/highstock');
require('highcharts/modules/exporting')(Highcharts);

const formatString = (stringValue, replacementsArray) => {
  let formatted = stringValue;
  for (let i = 0; i < replacementsArray.length; i += 1) {
    const regexp = new RegExp(`\\{${i}\\}`, 'gi');
    formatted = formatted.replace(regexp, replacementsArray[i]);
  }
  return formatted;
};

const createChart = (id, data, colorSet) => {
    Highcharts.StockChart(id, {
        chart: {
            backgroundColor: '#FFFFFF',
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: {
          lineColor: 'transparent',
          labels: {
            style: {
              color: '#FFFFFF'
            }
            // enabled: false,
          },
          minorTickLength: 0,
          tickLength: 0,
          lineWidth: 0,
          minorGridLineWidth: 0
        },
        yAxis: {
          // gridLineColor: '#545b64',
          gridLineColor: '#FFFFFF',
          labels: {
            style: {
              color: 'pink'
            }
            // formatter: function () {
            //     return (this.value > 0 ? ' + ' : '') + this.value;
            // }
          },
          plotLines: [{
            value: 0,
            width: 2,
            // color: 'red'
          }]
        },
        // colors: colorSet,
        color: ['#00b9f1', '#f9c00c', '#f9320c'],
        legend: {
          enabled: false
        },
        credits: {
          enabled: false
        },
        exporting: {
          enabled: false,
        },
        rangeSelector: {
          enabled: false
        },
        navigator: {
          enabled: false
        },
        scrollbar: {
          enabled: false
        },
        // plotOptions: {
        //     series: {
        //         compare: 'percent',
        //         showInNavigator: true
        //     }
        // },
        tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>', // ({point.change}%)
            valueDecimals: 2,
            split: true
        },
        series: [{
          name: '검색량',
          color: 'silver',
          data: data,
          // tooltip: {
          //     valueDecimals: 2
          // }
        }]
    });
};

// GLOBAL 변수 설정
const PAGE_SKILL_NAME = document.getElementsByClassName('skillname')[0].innerText;

const fillContentHeader = (data) => {
  const PAGE_SKILL_COUNT = data[1];
  const PAGE_SKILL_COMPANIES = data[2];
  const PAGE_SKILL_COMPANIES_COUNT = PAGE_SKILL_COMPANIES.length;

  const contentHeaderTop = `${PAGE_SKILL_NAME}`;
  const dataCountText = `<b>사용 회사수:</b> <span class="count">${PAGE_SKILL_COMPANIES_COUNT}</span>개`;

  const contentHeaderTopSelector = document.getElementById('content-header-title');
  contentHeaderTopSelector.innerText = contentHeaderTop;

  const dataCountSelector = document.getElementById('content-header-data-count');
  dataCountSelector.innerHTML = dataCountText;
};

// data-table 렌더링 부분
const dataRowHTML = `
<div class="data-row">
  <div class="row-description">
    어떤 회사가 {0}를 사용하고 있나요?
    <div class="small-desc">회사 태그를 눌러 채용 공고를 확인하세요.</div>
  </div>
  <div class="companies">
    {1}
  </div>
</div>
<div class="data-row-divider"></div>
`;

const companyTagHTML = `
<div class="comp">{0}</div>
`;

const appendCompanyTagsData = (data) => {
  const PAGE_SKILL_COMPANIES = data[2];

  let allCompanyTagsHTML = '';
  for (let i = 0; i < PAGE_SKILL_COMPANIES.length; i += 1) {
    const comp = PAGE_SKILL_COMPANIES[i];
    const companyTag = formatString(companyTagHTML, [comp]);
    allCompanyTagsHTML += companyTag;
  }
  const dataRow = formatString(dataRowHTML, [PAGE_SKILL_NAME, allCompanyTagsHTML]);
  return dataRow;
};

const fillDataTable = (dataRowHTML) => {
  const dataSelectorSelector = document.getElementsByClassName('data-table')[0];
  dataSelectorSelector.innerHTML = dataRowHTML;
};

// document related event listeners here //
document.addEventListener('DOMContentLoaded', async () => {

  const CACHE_DATA_URL = 'http://45.76.213.33:3000/gobble/api/v1/wanted_page_data';
  const GOOGLE_TRENDS_URL = `http://45.76.213.33:3000/gobble/api/v1/contents/google_trends_contents/?geo=US&&keyword=${PAGE_SKILL_NAME}`;

  const res = await axios.get(CACHE_DATA_URL);
  const data = JSON.parse(res.data['WANTED_SKILL_RANK_TABLE_DATA']);

  let PAGE_DATA;

  // 페이지 렌더링에 필요한 데이터를 뽑아온다
  for (const arr of data) {
    if (arr[0] == PAGE_SKILL_NAME) {
      PAGE_DATA = arr;
    }
  }

  fillContentHeader(PAGE_DATA);

  // google trends 데이터 라인 차트 그리기
  const googleTrends = await axios.get(GOOGLE_TRENDS_URL);
  const googleTrendsData = JSON.parse(JSON.parse(googleTrends.data.results[0].data));
  // console.log(googleTrendsData.default.timelineData);
  const trendsData = googleTrendsData.default.timelineData;
  let highchartsData = [];
  for (const arr of trendsData) {
    const dataPoint = [];
    dataPoint.push(arr['formattedAxisTime']);
    dataPoint.push(arr['value'][0]);
    highchartsData.push(dataPoint);
  }

  createChart('trend-chart', highchartsData, '');

  const dataRowHTML = appendCompanyTagsData(PAGE_DATA);
  fillDataTable(dataRowHTML);

});
