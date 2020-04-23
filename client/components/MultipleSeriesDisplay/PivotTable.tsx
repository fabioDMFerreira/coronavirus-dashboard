import React, { useState } from 'react';
import PivotTableUI from 'react-pivottable/PivotTableUI';

interface PivotTableProps {
  data: any;
  filter: any;
  onChangeFilter?: any;
  vals?: string[];
}


export default ({
  data, filter, onChangeFilter, vals,
}: PivotTableProps) => {
  const [pivotOptions, setPivotOptions] = useState<any>({});

  return (
    <PivotTableUI
      className="table table-responsive"
      data={data}
      hiddenAttributes={['Date', 'Total Cases', 'Total Deaths','Week']}
      rows={['Location']}
      cols={['Week']}
      vals={vals}
      rendererName="Table Row Heatmap"
      sorters={{
        Week: (a: any, b: any) => b - a,
      }}
      aggregatorName="Integer Sum"
      valueFilter={filter}
      onChange={(s: any) => {
        if (onChangeFilter) {
          onChangeFilter(s.valueFilter);
        }
        setPivotOptions(s);
      }}
      {...pivotOptions}
    />
  );
};
