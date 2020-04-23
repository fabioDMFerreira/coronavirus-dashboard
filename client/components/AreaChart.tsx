import HighchartsReact from 'highcharts-react-official';
import * as Highcharts from 'highcharts/highstock';
import React from 'react';

import tooltipFormatter from './MultipleSeriesDisplay/tooltipFormatter';

interface ChartProps {
  series: any;
  title?: string;
  chartCallback?: any;
  onSerieShow?: (country: string) => void;
  onSerieHide?: (country: string) => void;
  options?: { legend?: boolean };
  onTimespanChange?: any;
}

export default ({
  series,
  chartCallback,
  onSerieShow,
  onSerieHide,
  options,
  onTimespanChange = () => { }
}: ChartProps) => (
  <HighchartsReact
    highcharts={Highcharts}
    callback={chartCallback}
    options={
      {
        legend: {
          enabled: options && 'legend' in options ? options.legend : true,
        },
        title: {
          text: '',
        },
        chart: {
          backgroundColor: null,
          zoomType: 'x',
          type: 'area',
        },
        series,
        plotOptions: {
          series: {
            events: {
              show(e: any) {
                if (onSerieShow) {
                  onSerieShow(e.target.name);
                }
              },
              hide(e: any) {
                if (onSerieHide) {
                  onSerieHide(e.target.name);
                }
              },
            },
          },
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
          events: {
            afterSetExtremes: onTimespanChange
          }
        },
        yAxis: { // Primary yAxis
          title: '',
          labels: {
            // formatter: function () {
            //   return this.value
            // }
          },
        },
        tooltip: {
          enabled: true,
          useHTML: true,
          shared: true,
          split: false,
          formatter: tooltipFormatter,
        },
      }
    }
    allowChartUpdate
    immutable={false}
    updateArgs={[true, true, true]}
  />
);
