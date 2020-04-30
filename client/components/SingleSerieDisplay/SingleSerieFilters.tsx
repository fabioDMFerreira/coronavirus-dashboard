import { DataType, SelectOption,TimeType } from 'client/types';
import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Select, { ValueType } from 'react-select';

interface SingleSerieFiltersProps {
  selectedSerie: any;
  changeSelectedSerie: (value: ValueType<SelectOption>) => void;
  seriesOptions: string[];

  dataType: DataType;
  changeDataType: (value: DataType) => void;

  timeType: TimeType;
  changeTimeType: (value: TimeType) => void;
}

export default ({
  selectedSerie,
  seriesOptions,
  changeSelectedSerie,
  dataType,
  changeDataType,
  timeType,
  changeTimeType
}: SingleSerieFiltersProps) => {
  return (
    <Row className="pb-3">
      <Col xs={12} md={5} className="mt-3 mt-md-0">
        <Select
          value={selectedSerie}
          options={seriesOptions.map((option) => ({ label: option, value: option }))}
          placeholder="Choose a Country"
          onChange={changeSelectedSerie}
        />
      </Col>
      <Col xs={12} md={5} className="mt-3 mt-md-0">
        <div className="radio">
          <label>
            <input
              type="radio"
              value={DataType.TOTAL_CASES}
              checked={dataType === DataType.TOTAL_CASES}
              onChange={() => changeDataType(DataType.TOTAL_CASES)}
            />
              Total Cases
          </label>
        </div>
        <div className="radio">
          <label>
            <input
              type="radio"
              value={DataType.TOTAL_DEATHS}
              checked={dataType === DataType.TOTAL_DEATHS}
              onChange={() => changeDataType(DataType.TOTAL_DEATHS)}
            />
              Total Deaths
          </label>
        </div>
        <div className="radio">
          <label>
            <input
              type="radio"
              value={DataType.NEW_CASES}
              checked={dataType === DataType.NEW_CASES}
              onChange={() => changeDataType(DataType.NEW_CASES)}
            />
              New Cases
          </label>
        </div>
        <div className="radio">
          <label>
            <input
              type="radio"
              value={DataType.NEW_DEATHS}
              checked={dataType === DataType.NEW_DEATHS}
              onChange={() => changeDataType(DataType.NEW_DEATHS)}
            />
              New Deaths
          </label>
        </div>
      </Col>
      <Col xs={12} md={2} className="mt-3 mt-md-0">
        <div className="radio">
          <label>
            <input
              type="radio"
              value={TimeType.DAILY}
              checked={timeType === TimeType.DAILY}
              onChange={() => changeTimeType(TimeType.DAILY)}
            />
              Daily
          </label>
        </div>
        <div className="radio">
          <label>
            <input
              type="radio"
              value={TimeType.WEEKLY}
              checked={timeType === TimeType.WEEKLY}
              onChange={() => changeTimeType(TimeType.WEEKLY)}
            />
              Weekly
          </label>
        </div>
      </Col>
    </Row>
  );
};
