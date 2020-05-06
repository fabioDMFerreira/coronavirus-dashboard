import HighchartsReact from 'highcharts-react-official';
import * as Highcharts from 'highcharts/highstock';
import React, { forwardRef } from 'react';

interface ChartProps {
  series: any;
  title: string;
}

export default forwardRef(({ series, title }: ChartProps, ref: any) => (
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
        rangeSelector: {
          enabled: true,
          inputEnabled: true,
          buttons: [{
            type: 'week',
            count: 1,
            text: '1w'
          },
          {
            type: 'week',
            count: 2,
            text: '2w'
          },
          {
            type: 'week',
            count: 3,
            text: '3w'
          },
          {
            type: 'month',
            count: 1,
            text: '1m'
          },
          {
            type: 'month',
            count: 2,
            text: '2m'
          },
          {
            type: 'all',
            text: 'All'
          }]
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
    ref={ref}
  />
));
