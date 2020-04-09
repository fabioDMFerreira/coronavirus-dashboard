import React from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import tooltipFormatter from '../countries-comparison/tooltipFormatter';

interface ChartProps {
  series: any,
  title?: string,
  chartCallback?: any
  onSerieShow?: (country: string) => void
  onSerieHide?: (country: string) => void
  options?: { legend?: boolean }
}

export default ({
  series, chartCallback, onSerieShow, onSerieHide, options,
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
        xAxis: {
          type: 'datetime',
          plotLines: [],
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
