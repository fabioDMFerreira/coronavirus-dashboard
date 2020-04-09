import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React from 'react';

interface ChartProps {
  series: any;
  title: string;
}

export default ({ series, title }: ChartProps) => (
  <HighchartsReact
    highcharts={Highcharts}
    options={
      {
        title: {
          text: '',
        },
        chart: {
          backgroundColor: null,
          zoomType: 'x',
          type: 'column',
        },
        series,
        tooltip: {
          shared: true,
        },
        plotOptions: {
          column: {
            stacking: 'normal',
          },
        },
        xAxis: {
          type: 'datetime',
          plotLines: [],
        },
        yAxis: [{ // Primary yAxis
          labels: {
            // formatter: function () {
            //   return this.value
            // }
          },
          title: {
            text: title,
          },
        }, { // Secondary yAxis
          title: {
            text: '',
          },
          visible: false,
          labels: {
            format: '{value} %',
          },
          opposite: true,
        }],
      }
    }
    allowChartUpdate
    immutable={false}
    updateArgs={[true, true, true]}
  />
);
