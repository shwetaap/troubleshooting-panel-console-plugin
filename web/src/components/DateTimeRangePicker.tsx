import * as React from 'react';
import {
  Flex,
  FlexItem,
  InputGroup,
  InputGroupItem,
  DatePicker,
  isValidDate,
  TimePicker,
  yyyyMMddFormat,
} from '@patternfly/react-core';

interface DateTimeRangePickerProps {
  from: Date | null;
  to: Date | null;
  onFromDateChange: (newFromDate: Date) => void;
  onFromTimeChange: (hour: number, minute: number) => void;
  onToDateChange: (newToDate: Date) => void;
  onToTimeChange: (hour: number, minute: number) => void;
}

const DateTimeRangePicker: React.FC<DateTimeRangePickerProps> = ({
  from,
  to,
  onFromDateChange,
  onFromTimeChange,
  onToDateChange,
  onToTimeChange,
}) => {
  const toValidator = (date: Date): string => {
    // Date comparison validation
    return isValidDate(from) && yyyyMMddFormat(date) >= yyyyMMddFormat(from)
      ? ''
      : 'The "to" date must be after the "from" date';
  };

  return (
    <Flex direction={{ default: 'column', lg: 'row' }}>
      <FlexItem>
        <InputGroup>
          <InputGroupItem>
            <DatePicker
              value={isValidDate(from) ? yyyyMMddFormat(from) : ''}
              onChange={(_event, inputDate, newFromDate) => {
                if (isValidDate(newFromDate)) {
                  onFromDateChange(newFromDate);
                }
              }}
              aria-label="Start date"
              placeholder="YYYY-MM-DD"
            />
          </InputGroupItem>
          <InputGroupItem>
            <TimePicker
              aria-label="Start time"
              style={{ width: '150px' }}
              onChange={(_event, time, hour, minute) => {
                onFromTimeChange(hour, minute);
              }}
            />
          </InputGroupItem>
        </InputGroup>
      </FlexItem>
      <FlexItem>to</FlexItem>
      <FlexItem>
        <InputGroup>
          <InputGroupItem>
            <DatePicker
              value={isValidDate(to) ? yyyyMMddFormat(to as Date) : ''}
              onChange={(_event, inputDate, newToDate) => {
                if (isValidDate(newToDate)) {
                  onToDateChange(newToDate);
                }
              }}
              isDisabled={!isValidDate(from)}
              rangeStart={from}
              validators={[toValidator]}
              aria-label="End date"
              placeholder="YYYY-MM-DD"
            />
          </InputGroupItem>
          <InputGroupItem>
            <TimePicker
              style={{ width: '150px' }}
              onChange={(_event, time, hour, minute) => {
                onToTimeChange(hour, minute);
              }}
              isDisabled={!isValidDate(from)}
            />
          </InputGroupItem>
        </InputGroup>
      </FlexItem>
    </Flex>
  );
};

export default DateTimeRangePicker;
