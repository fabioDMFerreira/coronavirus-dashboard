import * as Highcharts from 'highcharts';

export default function () {
  let tooltipHTML;
  const date = new Date(this.x);
  let dateHTML='<div style="font-size:10px;"><b>Day:</b> ' + Highcharts.dateFormat('%b %e, %Y',
  date) + '</div>';

  if (this.points) {
    tooltipHTML = this.points.sort((a, b) => b.y - a.y).slice(0, 10).reduce(
      (str, point) => {
        const value = point.y;
        str += `<div style="margin-top:10px;"><font color="${point.color}">&#x25cf;</font> ${point.series.name}: <b>${value}</b></div>`;
        return str;
      }
      , dateHTML);
  } else {
    const value = this.point.y;

    tooltipHTML = dateHTML + `<div>${this.series.name}: <b>${value}</b></div>`
  }

  return tooltipHTML;
}
