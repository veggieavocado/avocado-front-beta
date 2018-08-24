const Highcharts = require('highcharts');
window.$ = window.jQuery = require('jquery');
const sparkline = require('./sparkline.js');

// Load module after Highcharts is loaded
require('highcharts/modules/exporting')(Highcharts);

const createSparkline = (chartID, width, height, data) => {
  $(chartID).sparkline(data, {
    type: 'line',
    // barColor: 'green',
    width: width,
    height: height,
    fillColor: '#fcfcfc',
    lineColor: '#bcbcbc',
    spotColor: '#FF385A', // 차트 맨 마지막에 찍히는 점 색
    spotRadius: '2',
    minSpotColor: '#ff6813',
    maxSpotColor: '#ff6813',
    highlightSpotColor: '#777777', // 라인 차트 위에 있는 데이터점
    highlightLineColor: 'white', // 마우스 호버할 때 생기는 수직선
    // highlightLineColor: '#D1D1D1',
    lineWidth: '1.5',
    disableTooltips: 'true',
  });
};

const createDonutChart = (chartID, chartData) => {
  const donutChart = new Highcharts.Chart(chartID, {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
    },
    title: {
      text: '',
      style: {
        display: 'none',
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
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
    },
    legend: {
      itemStyle: {
        color: '#6d6d6d',
        fontWeight: 'bold',
      },
      itemHoverStyle: {
        color: 'black',
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: false,
        },
        showInLegend: false, // 모든 데이터의 legend가 포함된다
        colors: ['#efefef'],
      },
    },
    series: [{
      name: '기술 언급수',
      colorByPoint: true,
      data: chartData,
    }],
  });
};

const createVerticalBarChart = (chartID, chartData) => {
  // chartData (array) --> [ x_categories (array), y_values (array) ]
  const verticalBarChart = new Highcharts.Chart(chartID, {
    chart: {
      type: 'column'
    },
    title: {
      text: '',
      style: {
        display: 'none',
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
    xAxis: {
      categories: chartData[0],
    },
    yAxis: [{
      className: 'highcharts-color-0',
      title: {
        text: ''
      }
    }],
    plotOptions: {
      column: {
        borderRadius: 0
      }
    },
    series: [{
      type: 'column',
      colorByPoint: true,
      data: chartData[1],
      showInLegend: false
    }]
    // series: [{
    //   data: [
    //     {
    //       y: 1,
    //       color: '#d1d1d1',
    //       // hover: {
    //       //   color: '#d1d1d1'
    //       // },
    //     },
    //     {
    //       y: 2,
    //       color: '#d1d1d1'
    //     },
    //     {
    //       y: 3,
    //       color: '#d1d1d1'
    //     },
    //     {
    //       y: 4,
    //       color: '#0183da'
    //     }
    //   ]
    // }]
  });
};

const createBarChart = (chartID, chartData) => {
  const barChart = new Highcharts.Chart(chartID, {
    chart: {
      type: 'bar',
    },
    title: {
      text: '',
      style: {
        display: 'none',
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
    legend: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
    xAxis: {
      categories: ['Django', 'Node.js', 'PHP', 'Europe', 'Oceania'],
      title: {
        text: null,
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Population (millions)',
        align: 'high',
      },
      labels: {
        overflow: 'justify',
      },
    },
    tooltip: {
      valueSuffix: ' millions',
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
        },
      },
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'top',
      x: -40,
      y: 80,
      floating: true,
      borderWidth: 1,
      backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
      shadow: true,
    },
    series: [{
      name: '백엔드',
      data: [{
        y: 107,
        color: '#d1d1d1'
      },
      {
        y: 31,
        color: '#d1d1d1'
      },
      {
        y: 635,
        color: '#00c73c'
      },
      {
        y: 203,
        color: '#d1d1d1'
      },
      {
        y: 2,
        color: '#d1d1d1'
      }],
    }],
  });
};

// const createWordCreate = (data) => {
//   var text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean bibendum erat ac justo sollicitudin, quis lacinia ligula fringilla. Pellentesque hendrerit, nisi vitae posuere condimentum, lectus urna accumsan libero, rutrum commodo mi lacus pretium erat. Phasellus pretium ultrices mi sed semper. Praesent ut tristique magna. Donec nisl tellus, sagittis ut tempus sit amet, consectetur eget erat. Sed ornare gravida lacinia. Curabitur iaculis metus purus, eget pretium est laoreet ut. Quisque tristique augue ac eros malesuada, vitae facilisis mauris sollicitudin. Mauris ac molestie nulla, vitae facilisis quam. Curabitur placerat ornare sem, in mattis purus posuere eget. Praesent non condimentum odio. Nunc aliquet, odio nec auctor congue, sapien justo dictum massa, nec fermentum massa sapien non tellus. Praesent luctus eros et nunc pretium hendrerit. In consequat et eros nec interdum. Ut neque dui, maximus id elit ac, consequat pretium tellus. Nullam vel accumsan lorem.';
//   var lines = text.split(/[,. ]+/g),
//     data = Highcharts.reduce(lines, function (arr, word) {
//       var obj = Highcharts.find(arr, function (obj) {
//         return obj.name === word;
//       });
//       if (obj) {
//         obj.weight += 1;
//       } else {
//         obj = {
//           name: word,
//           weight: 1
//         };
//         obj.color = '#d1d1d1';
//         arr.push(obj);
//       }
//       // var values = [];
//       // for (var i=0; i < arr.length; i++) {
//       //   values.push(arr[i]['weight']);
//       // }
//       // var maxIndex;
//       // var max = Math.max(values)
//       // for (var i=0; i < arr.length; i++) {
//       //   if (arr[i]['weight'] == max) {
//       //     maxIndex = i;
//       //   }
//       // }
//       // arr[maxIndex]['color'] = '#FF385A';
//       return arr;
//     }, []);
//
//   Highcharts.chart('word-cloud', {
//     series: [{
//       type: 'wordcloud',
//       data: data,
//       name: 'Occurrences'
//     }],
//     title: {
//       text: '',
//       style: {
//         display: 'none',
//       },
//     },
//     subtitle: {
//       text: '',
//       style: {
//         display: 'none',
//       },
//     },
//     exporting: {
//       enabled: false,
//     },
//     credits: {
//       enabled: false,
//     },
//   });
// };
//
// const createSpiderWeb = (data) => {
//   Highcharts.chart('spiderweb', {
//     chart: {
//       polar: true,
//       type: 'line'
//     },
//     title: {
//       text: '',
//       style: {
//         display: 'none',
//       },
//     },
//     subtitle: {
//       text: '',
//       style: {
//         display: 'none',
//       },
//     },
//     exporting: {
//       enabled: false,
//     },
//     credits: {
//       enabled: false,
//     },
//     pane: {
//       size: '80%'
//     },
//     xAxis: {
//       categories: ['Sales', 'Marketing', 'Development', 'Customer Support',
//         'Information Technology', 'Administration'],
//       tickmarkPlacement: 'on',
//       lineWidth: 0
//     },
//     yAxis: {
//       gridLineInterpolation: 'polygon',
//       lineWidth: 0,
//       min: 0
//     },
//     tooltip: {
//       shared: true,
//       pointFormat: '<span style="color:{series.color}">{series.name}: <b>${point.y:,.0f}</b><br/>'
//     },
//     legend: {
//       align: 'right',
//       verticalAlign: 'top',
//       y: 70,
//       layout: 'vertical'
//     },
//     series: [{
//       name: 'Allocated Budget',
//       color: '#00c73c',
//       data: [43000, 19000, 60000, 35000, 17000, 10000],
//       pointPlacement: 'on'
//     }, {
//       name: 'Actual Spending',
//       color: '#FF385A',
//       data: [50000, 39000, 42000, 31000, 26000, 14000],
//       pointPlacement: 'on'
//     }]
//   });
// };
//
// const createScatterPlot = (data) => {
//   Highcharts.chart('scatterplot', {
//     chart: {
//       type: 'scatter',
//       zoomType: 'xy'
//     },
//     title: {
//       text: '',
//       style: {
//         display: 'none',
//       },
//     },
//     subtitle: {
//       text: '',
//       style: {
//         display: 'none',
//       },
//     },
//     exporting: {
//       enabled: false,
//     },
//     credits: {
//       enabled: false,
//     },
//     xAxis: {
//       title: {
//         enabled: true,
//         text: 'Height (cm)'
//       },
//       startOnTick: true,
//       endOnTick: true,
//       showLastLabel: true
//     },
//     yAxis: {
//       title: {
//         text: 'Weight (kg)'
//       }
//     },
//     legend: {
//       layout: 'vertical',
//       align: 'left',
//       verticalAlign: 'top',
//       x: 100,
//       y: 70,
//       floating: true,
//       backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
//       borderWidth: 1
//     },
//     plotOptions: {
//       scatter: {
//         marker: {
//           radius: 5,
//           states: {
//             hover: {
//               enabled: true,
//               lineColor: 'rgb(100,100,100)'
//             }
//           }
//         },
//         states: {
//           hover: {
//             marker: {
//               enabled: false
//             }
//           }
//         },
//         tooltip: {
//           headerFormat: '<b>{series.name}</b><br>',
//           pointFormat: '{point.x} cm, {point.y} kg'
//         }
//       }
//     },
//     series: [{
//       name: 'Female',
//       color: 'rgba(255, 56, 90, .5)',
//       data: [[161.2, 51.6], [167.5, 59.0], [159.5, 49.2], [157.0, 63.0], [155.8, 53.6],
//         [170.0, 59.0], [159.1, 47.6], [166.0, 69.8], [176.2, 66.8], [160.2, 75.2],
//         [172.5, 55.2], [170.9, 54.2], [172.9, 62.5], [153.4, 42.0], [160.0, 50.0],
//         [147.2, 49.8], [168.2, 49.2], [175.0, 73.2], [157.0, 47.8], [167.6, 68.8],
//         [159.5, 50.6], [175.0, 82.5], [166.8, 57.2], [176.5, 87.8], [170.2, 72.8],
//         [174.0, 54.5], [173.0, 59.8], [179.9, 67.3], [170.5, 67.8], [160.0, 47.0],
//         [154.4, 46.2], [162.0, 55.0], [176.5, 83.0], [160.0, 54.4], [152.0, 45.8],
//         [162.1, 53.6], [170.0, 73.2], [160.2, 52.1], [161.3, 67.9], [166.4, 56.6],
//         [168.9, 62.3], [163.8, 58.5], [167.6, 54.5], [160.0, 50.2], [161.3, 60.3],
//         [167.6, 58.3], [165.1, 56.2], [160.0, 50.2], [170.0, 72.9], [157.5, 59.8],
//         [167.6, 61.0], [160.7, 69.1], [163.2, 55.9], [152.4, 46.5], [157.5, 54.3],
//         [168.3, 54.8], [180.3, 60.7], [165.5, 60.0], [165.0, 62.0], [164.5, 60.3],
//         [156.0, 52.7], [160.0, 74.3], [163.0, 62.0], [165.7, 73.1], [161.0, 80.0],
//         [162.0, 54.7], [166.0, 53.2], [174.0, 75.7], [172.7, 61.1], [167.6, 55.7],
//         [151.1, 48.7], [164.5, 52.3], [163.5, 50.0], [152.0, 59.3], [169.0, 62.5],
//         [164.0, 55.7], [161.2, 54.8], [155.0, 45.9], [170.0, 70.6], [176.2, 67.2],
//         [170.0, 69.4], [162.5, 58.2], [170.3, 64.8], [164.1, 71.6], [169.5, 52.8],
//         [163.2, 59.8], [154.5, 49.0], [159.8, 50.0], [173.2, 69.2], [170.0, 55.9],
//         [161.4, 63.4], [169.0, 58.2], [166.2, 58.6], [159.4, 45.7], [162.5, 52.2],
//         [159.0, 48.6], [162.8, 57.8], [159.0, 55.6], [179.8, 66.8], [162.9, 59.4],
//         [161.0, 53.6], [151.1, 73.2], [168.2, 53.4], [168.9, 69.0], [173.2, 58.4],
//         [171.8, 56.2], [178.0, 70.6], [164.3, 59.8], [163.0, 72.0], [168.5, 65.2],
//         [166.8, 56.6], [172.7, 105.2], [163.5, 51.8], [169.4, 63.4], [167.8, 59.0],
//         [159.5, 47.6], [167.6, 63.0], [161.2, 55.2], [160.0, 45.0], [163.2, 54.0],
//         [162.2, 50.2], [161.3, 60.2], [149.5, 44.8], [157.5, 58.8], [163.2, 56.4],
//         [172.7, 62.0], [155.0, 49.2], [156.5, 67.2], [164.0, 53.8], [160.9, 54.4],
//         [162.8, 58.0], [167.0, 59.8], [160.0, 54.8], [160.0, 43.2], [168.9, 60.5],
//         [158.2, 46.4], [156.0, 64.4], [160.0, 48.8], [167.1, 62.2], [158.0, 55.5],
//         [167.6, 57.8], [156.0, 54.6], [162.1, 59.2], [173.4, 52.7], [159.8, 53.2],
//         [170.5, 64.5], [159.2, 51.8], [157.5, 56.0], [161.3, 63.6], [162.6, 63.2],
//         [160.0, 59.5], [168.9, 56.8], [165.1, 64.1], [162.6, 50.0], [165.1, 72.3],
//         [166.4, 55.0], [160.0, 55.9], [152.4, 60.4], [170.2, 69.1], [162.6, 84.5],
//         [170.2, 55.9], [158.8, 55.5], [172.7, 69.5], [167.6, 76.4], [162.6, 61.4],
//         [167.6, 65.9], [156.2, 58.6], [175.2, 66.8], [172.1, 56.6], [162.6, 58.6],
//         [160.0, 55.9], [165.1, 59.1], [182.9, 81.8], [166.4, 70.7], [165.1, 56.8],
//         [177.8, 60.0], [165.1, 58.2], [175.3, 72.7], [154.9, 54.1], [158.8, 49.1],
//         [172.7, 75.9], [168.9, 55.0], [161.3, 57.3], [167.6, 55.0], [165.1, 65.5],
//         [175.3, 65.5], [157.5, 48.6], [163.8, 58.6], [167.6, 63.6], [165.1, 55.2],
//         [165.1, 62.7], [168.9, 56.6], [162.6, 53.9], [164.5, 63.2], [176.5, 73.6],
//         [168.9, 62.0], [175.3, 63.6], [159.4, 53.2], [160.0, 53.4], [170.2, 55.0],
//         [162.6, 70.5], [167.6, 54.5], [162.6, 54.5], [160.7, 55.9], [160.0, 59.0],
//         [157.5, 63.6], [162.6, 54.5], [152.4, 47.3], [170.2, 67.7], [165.1, 80.9],
//         [172.7, 70.5], [165.1, 60.9], [170.2, 63.6], [170.2, 54.5], [170.2, 59.1],
//         [161.3, 70.5], [167.6, 52.7], [167.6, 62.7], [165.1, 86.3], [162.6, 66.4],
//         [152.4, 67.3], [168.9, 63.0], [170.2, 73.6], [175.2, 62.3], [175.2, 57.7],
//         [160.0, 55.4], [165.1, 104.1], [174.0, 55.5], [170.2, 77.3], [160.0, 80.5],
//         [167.6, 64.5], [167.6, 72.3], [167.6, 61.4], [154.9, 58.2], [162.6, 81.8],
//         [175.3, 63.6], [171.4, 53.4], [157.5, 54.5], [165.1, 53.6], [160.0, 60.0],
//         [174.0, 73.6], [162.6, 61.4], [174.0, 55.5], [162.6, 63.6], [161.3, 60.9],
//         [156.2, 60.0], [149.9, 46.8], [169.5, 57.3], [160.0, 64.1], [175.3, 63.6],
//         [169.5, 67.3], [160.0, 75.5], [172.7, 68.2], [162.6, 61.4], [157.5, 76.8],
//         [176.5, 71.8], [164.4, 55.5], [160.7, 48.6], [174.0, 66.4], [163.8, 67.3]]
//
//     }, {
//       name: 'Male',
//       color: 'rgba(1, 131, 218, .5)',
//       data: [[174.0, 65.6], [175.3, 71.8], [193.5, 80.7], [186.5, 72.6], [187.2, 78.8],
//         [181.5, 74.8], [184.0, 86.4], [184.5, 78.4], [175.0, 62.0], [184.0, 81.6],
//         [180.0, 76.6], [177.8, 83.6], [192.0, 90.0], [176.0, 74.6], [174.0, 71.0],
//         [184.0, 79.6], [192.7, 93.8], [171.5, 70.0], [173.0, 72.4], [176.0, 85.9],
//         [176.0, 78.8], [180.5, 77.8], [172.7, 66.2], [176.0, 86.4], [173.5, 81.8],
//         [178.0, 89.6], [180.3, 82.8], [180.3, 76.4], [164.5, 63.2], [173.0, 60.9],
//         [183.5, 74.8], [175.5, 70.0], [188.0, 72.4], [189.2, 84.1], [172.8, 69.1],
//         [170.0, 59.5], [182.0, 67.2], [170.0, 61.3], [177.8, 68.6], [184.2, 80.1],
//         [186.7, 87.8], [171.4, 84.7], [172.7, 73.4], [175.3, 72.1], [180.3, 82.6],
//         [182.9, 88.7], [188.0, 84.1], [177.2, 94.1], [172.1, 74.9], [167.0, 59.1],
//         [169.5, 75.6], [174.0, 86.2], [172.7, 75.3], [182.2, 87.1], [164.1, 55.2],
//         [163.0, 57.0], [171.5, 61.4], [184.2, 76.8], [174.0, 86.8], [174.0, 72.2],
//         [177.0, 71.6], [186.0, 84.8], [167.0, 68.2], [171.8, 66.1], [182.0, 72.0],
//         [167.0, 64.6], [177.8, 74.8], [164.5, 70.0], [192.0, 101.6], [175.5, 63.2],
//         [171.2, 79.1], [181.6, 78.9], [167.4, 67.7], [181.1, 66.0], [177.0, 68.2],
//         [174.5, 63.9], [177.5, 72.0], [170.5, 56.8], [182.4, 74.5], [197.1, 90.9],
//         [180.1, 93.0], [175.5, 80.9], [180.6, 72.7], [184.4, 68.0], [175.5, 70.9],
//         [180.6, 72.5], [177.0, 72.5], [177.1, 83.4], [181.6, 75.5], [176.5, 73.0],
//         [175.0, 70.2], [174.0, 73.4], [165.1, 70.5], [177.0, 68.9], [192.0, 102.3],
//         [176.5, 68.4], [169.4, 65.9], [182.1, 75.7], [179.8, 84.5], [175.3, 87.7],
//         [184.9, 86.4], [177.3, 73.2], [167.4, 53.9], [178.1, 72.0], [168.9, 55.5],
//         [157.2, 58.4], [180.3, 83.2], [170.2, 72.7], [177.8, 64.1], [172.7, 72.3],
//         [165.1, 65.0], [186.7, 86.4], [165.1, 65.0], [174.0, 88.6], [175.3, 84.1],
//         [185.4, 66.8], [177.8, 75.5], [180.3, 93.2], [180.3, 82.7], [177.8, 58.0],
//         [177.8, 79.5], [177.8, 78.6], [177.8, 71.8], [177.8, 116.4], [163.8, 72.2],
//         [188.0, 83.6], [198.1, 85.5], [175.3, 90.9], [166.4, 85.9], [190.5, 89.1],
//         [166.4, 75.0], [177.8, 77.7], [179.7, 86.4], [172.7, 90.9], [190.5, 73.6],
//         [185.4, 76.4], [168.9, 69.1], [167.6, 84.5], [175.3, 64.5], [170.2, 69.1],
//         [190.5, 108.6], [177.8, 86.4], [190.5, 80.9], [177.8, 87.7], [184.2, 94.5],
//         [176.5, 80.2], [177.8, 72.0], [180.3, 71.4], [171.4, 72.7], [172.7, 84.1],
//         [172.7, 76.8], [177.8, 63.6], [177.8, 80.9], [182.9, 80.9], [170.2, 85.5],
//         [167.6, 68.6], [175.3, 67.7], [165.1, 66.4], [185.4, 102.3], [181.6, 70.5],
//         [172.7, 95.9], [190.5, 84.1], [179.1, 87.3], [175.3, 71.8], [170.2, 65.9],
//         [193.0, 95.9], [171.4, 91.4], [177.8, 81.8], [177.8, 96.8], [167.6, 69.1],
//         [167.6, 82.7], [180.3, 75.5], [182.9, 79.5], [176.5, 73.6], [186.7, 91.8],
//         [188.0, 84.1], [188.0, 85.9], [177.8, 81.8], [174.0, 82.5], [177.8, 80.5],
//         [171.4, 70.0], [185.4, 81.8], [185.4, 84.1], [188.0, 90.5], [188.0, 91.4],
//         [182.9, 89.1], [176.5, 85.0], [175.3, 69.1], [175.3, 73.6], [188.0, 80.5],
//         [188.0, 82.7], [175.3, 86.4], [170.5, 67.7], [179.1, 92.7], [177.8, 93.6],
//         [175.3, 70.9], [182.9, 75.0], [170.8, 93.2], [188.0, 93.2], [180.3, 77.7],
//         [177.8, 61.4], [185.4, 94.1], [168.9, 75.0], [185.4, 83.6], [180.3, 85.5],
//         [174.0, 73.9], [167.6, 66.8], [182.9, 87.3], [160.0, 72.3], [180.3, 88.6],
//         [167.6, 75.5], [186.7, 101.4], [175.3, 91.1], [175.3, 67.3], [175.9, 77.7],
//         [175.3, 81.8], [179.1, 75.5], [181.6, 84.5], [177.8, 76.6], [182.9, 85.0],
//         [177.8, 102.5], [184.2, 77.3], [179.1, 71.8], [176.5, 87.9], [188.0, 94.3],
//         [174.0, 70.9], [167.6, 64.5], [170.2, 77.3], [167.6, 72.3], [188.0, 87.3],
//         [174.0, 80.0], [176.5, 82.3], [180.3, 73.6], [167.6, 74.1], [188.0, 85.9],
//         [180.3, 73.2], [167.6, 76.3], [183.0, 65.9], [183.0, 90.9], [179.1, 89.1],
//         [170.2, 62.3], [177.8, 82.7], [179.1, 79.1], [190.5, 98.2], [177.8, 84.1],
//         [180.3, 83.2], [180.3, 83.2]]
//     }]
//   });
// };

module.exports = {
  createSparkline,
  createDonutChart,
  createVerticalBarChart,
  createBarChart,
}
