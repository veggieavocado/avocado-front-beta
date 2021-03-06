const axios = require('axios');
const Highcharts = require('highcharts');
const { getCookie } = require('./cookie.js');

// Load module after Highcharts is loaded
require('highcharts/modules/exporting')(Highcharts);

const formatString = (stringValue, replacementsArray) => {
  let formatted = stringValue;
  for (let i = 0; i < replacementsArray.length; i += 1) {
    const regexp = new RegExp(`\\{${i}\\}`, 'gi');
    formatted = formatted.replace(regexp, replacementsArray[i]);
  }
  return formatted;
};

const textAPI = 'http://45.77.179.168:3000/api/v1/services/text/';
const textFreqAPI = 'http://45.77.179.168:3000/api/v1/services/text_analysis/freq/';

const token = getCookie('VA-TOKEN');
const username = getCookie('VA-USER');

const userAccoutSectionHTML = `
<div class="account-btn">
  ${username}
  <ul class="account-dropdown">
    <li class="list-first">내 문서관리</li>
    <li>최근작성문서 3</li>
    <li>최근작성문서 2</li>
    <li class="list-last">최근작성문서 1</li>
    <li>로그아웃</li>
  </ul>
</div>
`;

const drawTextFreqDonutChart = async (freqData) => {
  // 차트 부분 보이도록 하기
  const container = document.getElementById('container');
  container.style.display = 'block';

  const chart = new Highcharts.Chart({
    chart: {
      renderTo: 'container',
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
    },
    title: {
      text: '분석 텍스트 사용 단어 빈도수',
      style: {
        color: '#3F3F3F',
        fontSize: '18px',
        fontWeight: 'bold',
      },
    },
    subtitle: {
      text: '',
      style: {
        display: 'none',
      },
    },
    exporting: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
    tooltip: {
      // pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
      pointFormat: '{series.name}: <b>{point.y}</b>',
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        innerSize: '60%',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          style: {
            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
          },
        },
      },
    },
    series: [{
      name: '단어 빈도수',
      colorByPoint: true,
      data: freqData,
      // data: [{
      //   name: 'Chrome',
      //   y: 61.41,
      //   sliced: true,
      //   selected: true,
      // }, {
      //   name: 'Internet Explorer',
      //   y: 11.84,
      // }, {
      //   name: 'Firefox',
      //   y: 10.85,
      // }, {
      //   name: 'Edge',
      //   y: 4.67,
      // }, {
      //   name: 'Safari',
      //   y: 4.18,
      // }, {
      //   name: 'Sogou Explorer',
      //   y: 1.64,
      // }, {
      //   name: 'Opera',
      //   y: 1.6,
      // }, {
      //   name: 'QQ',
      //   y: 1.2,
      // }, {
      //   name: 'Other',
      //   y: 2.61,
      // }],
    }],
    // using
    function() { // on complete
      const xpos = '50%';
      const ypos = '53%';
      const circleradius = 102;
      // Render the circle
      chart.renderer.circle(xpos, ypos, circleradius).attr({
        fill: '#27314f',
      }).add();
    },
  });
};

if (token) {
  const navbarLoginSection = document.getElementsByClassName('navbar-login')[0];
  navbarLoginSection.innerHTML = userAccoutSectionHTML;
}

document.addEventListener('click', async (e) => {
  if (e.target.id === 'text-analysis-btn') {
    // STEP 1: 텍스트 분석에 필요한 데이터를 가져온다
    const text = document.getElementById('text-analysis-sec').value;
    // STEP 1.5: 아무 텍스트도 입력하지 않았으면, 아무 일 없도록 처리...
    if (text === '') {
      const textAnalysisAlert = document.getElementsByClassName('text-analysis-alert')[0];
      textAnalysisAlert.innerHTML = '<p>텍스트를 먼저 입력하여 주세요.</p>';
    } else {
      // STEP 2: 베지아보카도 텍스트 분석 전용 템플릿을 텍스트 API로 저장한다
      const textPostData = {
        owner: 'VA',
        username: '',
        type: 'PPT',
        source: 'veggieavocado.com',
        category: 'VA Text Analysis Service',
        title: 'VA Text Analysis Service',
        template: text,
        translated: '',
      };
      const res = await axios.post(textAPI, textPostData);
      // STEP 3: 텍스트가 만들어졌다면 데이터 분석 요청을 한다
      const textID = res.data.id;
      const textAnalysisPostData = {
        text_id: textID,
      };
      if (res.status === 201) {
        const freqData = await axios.post(textFreqAPI, textAnalysisPostData);
        await drawTextFreqDonutChart(freqData.data);
      }
    }
  }
});
