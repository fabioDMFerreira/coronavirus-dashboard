import React, { useState } from 'react';
import PivotTableUI from 'react-pivottable/PivotTableUI';
import { derivers } from 'react-pivottable/Utilities';

interface PivotTableProps {
  data: any;
  filter: any;
  onChangeFilter?: any;
  vals?: string[];
}

function getWeekNumber(d: any) {
  return `week ${Math.floor(new Date(d).getDate() / 7) + 1}`;
}

export default ({
  data, filter, onChangeFilter, vals,
}: PivotTableProps) => {
  const [pivotOptions, setPivotOptions] = useState<any>({});

  return (
    <PivotTableUI
      data={data}
      hiddenAttributes={['Date', 'Total Cases', 'Total Deaths']}
      rows={['Location']}
      cols={['Week']}
      vals={vals}
      rendererName="Table Row Heatmap"
      derivedAttributes={{
        Week: (record: any) => `${derivers.dateFormat('Date', '%n')(record)} ${getWeekNumber(record.Date)}`,
      }}
      sorters={{
        Week: (a: any, b: any) => b - a,
      }}
      aggregatorName="Integer Sum"
      valueFilter={{
        Location: filter,
      }}
      onChange={(s: any) => {
        console.log({ s });
        if (onChangeFilter) {
          onChangeFilter(s.valueFilter.Location);
        }
        setPivotOptions(s);
      }}
      {...pivotOptions}
    />
  );
};
