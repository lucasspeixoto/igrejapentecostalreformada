import {
  getDayDescriptionFomDate,
  getStartAndEndOfMonth,
  getStartAndEndOfWeek,
  longDateConvert,
  shortDateConvert,
} from './date';

describe('Transform Date tests', () => {
  describe('longDateConvert', () => {
    it('should return "--/--/--" when given an empty string', () => {
      const result = longDateConvert('');

      expect(result).toBe('--/--/--');
    });

    it('should return "--/--/--" when given a null value', () => {
      const result = longDateConvert(null);

      expect(result).toBe('--/--/--');
    });

    it('should return the expected value when given a valid date string', () => {
      const date = '2022-02-22';
      const result = longDateConvert(date);

      expect(result).toBe('22/02/2022');
    });
  });

  describe('shortDateConvert', () => {
    it('should return "--/--" when given an empty string', () => {
      const result = shortDateConvert('');

      expect(result).toBe('--/--');
    });

    it('should return "--/--" when given a null value', () => {
      const result = shortDateConvert(null);

      expect(result).toBe('--/--');
    });

    it('should return the expected value when given a valid date string', () => {
      const date = '2022-02-22';
      const result = shortDateConvert(date);

      expect(result).toBe('02/2022');
    });
  });

  describe('getStartAndEndOfWeek', () => {
    it('should return an object with start and end properties that are both instances of Date', () => {
      const result = getStartAndEndOfWeek();

      expect(result.start).toBeInstanceOf(Date);
      expect(result.end).toBeInstanceOf(Date);
    });
  });

  describe('getStartAndEndOfMonth', () => {
    it('should return the correct start and end dates for the current month', () => {
      const currentDate = new Date();

      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();

      const expectedStartDate = new Date(year, month, 1);
      const expectedEndDate = new Date(year, month + 1, 0);

      const { start, end } = getStartAndEndOfMonth();

      expect(start).toEqual(expectedStartDate);
      expect(end).toEqual(expectedEndDate);
    });
  });

  describe('getDayDescriptionFomDate', () => {
    it('should return the day description from the date', () => {
      const date1 = new Date(2024, 4, 1); // 01/05/2024;
      const date2 = new Date(2024, 4, 11);

      expect(getDayDescriptionFomDate(date1)).toEqual('01');
      expect(getDayDescriptionFomDate(date2)).toEqual('11');
    });
  });
});
