/**
 * @status: Tested
 * Returns the current date in the format "MM/YYYY".
 *
 * @returns The current date in the format "MM/YYYY".
 */
export function getActualDate(): string {
  const currentDate = new Date();

  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  const monthString = currentMonth < 10 ? `0${currentMonth}` : `${currentMonth}`;

  return `${monthString}/${currentYear}`;
}

export function getStoragedCurrentMonthAndYear(): string {
  const currentActualDate = localStorage.getItem('IPR-SISTEMA-GESTAO:CURRENT-MONTH');
  return currentActualDate ? currentActualDate : getActualDate();
}

export function getFirstMonthDay(monthYear: string): Date {
  const storagedCurrentMonthAndYear = monthYear ? monthYear : getStoragedCurrentMonthAndYear();

  const [monthStr, yearStr] = storagedCurrentMonthAndYear.split('/');
  const month = parseInt(monthStr) - 1;
  const year = parseInt(yearStr);

  return new Date(year, month, 1);
}

export function getLastMonthDay(monthYear: string): Date {
  const storagedCurrentMonthAndYear = monthYear ? monthYear : getStoragedCurrentMonthAndYear();

  const [monthStr, yearStr] = storagedCurrentMonthAndYear.split('/');
  const month = parseInt(monthStr) - 1;
  const year = parseInt(yearStr);

  return new Date(year, month + 1, 0);
}

/**
 * Calculates the next month's date based on the provided current month in the format "MM/YYYY".
 *
 * @param currentMonth - A string representing the current month in the format "MM/YYYY".
 * @returns A string representing the next month in the format "MM/YYYY".
 *
 */
export function getNextMonthDate(currentMonth: string): string {
  // Subtract 1 from the current month
  let lastMonth = +currentMonth.split('/')[0]; // getMonth is 0-based
  let year = +currentMonth.split('/')[1];

  // Handle year rollover if current month is January
  if (lastMonth === 12) {
    lastMonth = 1;
    year += 1;
  } else {
    lastMonth += 1;
  }

  const monthString = lastMonth < 10 ? `0${lastMonth}` : `${lastMonth}`;

  return `${monthString}/${year}`;
}

export function getFirstAndLastDayOfAMonth(monthYear: string): {
  firstDay: string;
  lastDay: string;
} {
  const [monthStr, yearStr] = monthYear.split('/');
  const month = Number(monthStr);
  const year = Number(yearStr);

  const firstDate = new Date(year, month - 1, 1);
  const lastDate = new Date(year, month, 0);

  const formatDate = (date: Date): string => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  return {
    firstDay: formatDate(firstDate),
    lastDay: formatDate(lastDate),
  };
}

/**
 * Generate an array of dates between two specified dates.
 * @param startYear - the year of the first date in the range
 * @param startMonth - the month of the first date in the range (1-indexed)
 * @returns an array of dates in the specified range
 */
export function generateMonthAndYearList(startYear: number, startMonth: number): string[] {
  const datesArray = [];

  const currentDate = getActualDate();
  const endYear = +currentDate.split('/')[1];
  const endMonth = +currentDate.split('/')[0];

  for (let year = startYear; year <= endYear; year += 1) {
    const startMonthIndex = year === startYear ? startMonth : 1;
    const endMonthIndex = year === endYear ? endMonth : 12;

    for (let month = startMonthIndex; month <= endMonthIndex; month += 1) {
      const monthString = month < 10 ? `0${month}` : `${month}`;
      datesArray.push(`${monthString}/${year}`);
    }
  }

  return datesArray.reverse();
}

export function getPreviousDate(dateStr: string): string {
  const [month, year] = dateStr.split('/').map(Number);

  let prevMonth = month - 1;
  let prevYear = year;

  if (prevMonth === 0) {
    prevMonth = 12;
    prevYear -= 1;
  }

  const monthString = prevMonth < 10 ? `0${prevMonth}` : `${prevMonth}`;
  return `${monthString}/${prevYear}`;
}

/**
 *
 * Returns the date of the last month in the format "MM/YYYY".
 *
 * This function calculates the previous month relative to the current date.
 * If the current month is January, it adjusts the year accordingly.
 *
 * @returns A string representing the last month in the format "MM/YYYY".
 */
export function getLastMonthDate(): string {
  const currentDate = new Date();

  // Subtract 1 from the current month
  let lastMonth = currentDate.getMonth(); // getMonth is 0-based
  let year = currentDate.getFullYear();

  // Handle year rollover if current month is January
  if (lastMonth === 0) {
    lastMonth = 12;
    year -= 1;
  }

  const monthString = lastMonth < 10 ? `0${lastMonth}` : `${lastMonth}`;

  return `${monthString}/${year}`;
}

export function getActualYear(): number {
  const currentDate = new Date();

  return currentDate.getFullYear();
}

/**
 * @status: Tested
 * Convert a long date string to a more human-friendly format.
 * @param date - The long date string to convert, in the format "yyyy-mm-dd".
 * @returns The human-friendly date string, in the format "dd/mm/yyyy".
 */
export const longDateConvert = (date: string | null): string => {
  if (date) {
    const year = date?.split('-')[0];
    const month = date?.split('-')[1];
    const day = date?.split('-')[2];

    return `${day}/${month}/${year}`;
  }

  return '--/--/--';
};

/**
 * @status: Tested
 * Convert a short date string to a more human-friendly format.
 * @param date - The short date string to convert, in the format "yyyy-mm".
 * @returns The human-friendly date string, in the format "mm/yyyy".
 */
export const shortDateConvert = (date: string | null): string => {
  if (date) {
    const year = date?.split('-')[0];
    const month = date?.split('-')[1];

    return `${month}/${year}`;
  }

  return '--/--';
};

/**
 * Returns an object containing the start and end dates of the current week.
 *
 * @returns An object with `start` and `end` properties, each of which is a
 * Date object representing the start and end of the current week, respectively.
 */
export function getStartAndEndOfWeek(): { start: Date; end: Date } {
  const currentDate = new Date();

  const startDate = new Date(currentDate);
  const endDate = new Date(currentDate);

  startDate.setDate(startDate.getDate() - startDate.getDay());
  endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));

  return { start: startDate, end: endDate };
}

/**
 * Returns the start and end dates of the current month.
 *
 * @returns An object with `start` and `end` properties, each of which is a
 * Date object representing the start and end of the current month, respectively.
 */
export function getStartAndEndOfMonth(): { start: Date; end: Date } {
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const startDate = new Date(year, month, 1);
  const endDate = new Date(year, month + 1, 0);

  return { start: startDate, end: endDate };
}

/**
 * Returns the day description from the date.
 *
 * @param date - The date object.
 * @returns The day description.
 */
export function getDayDescriptionFomDate(date: Date): string {
  return date.getDate().toString().padStart(2, '0');
}

/**
 * Transforms a date string in the format 'YYYY-MM-DD' to a Date object.
 *
 * @param dateString - The date string to transform.
 * @returns A Date object representing the given date string.
 */
export const transformStringToDate = (dateString: string): Date => {
  const [year, month, day] = dateString.split('-').map(Number);
  const now = new Date();
  return new Date(year, month - 1, day, now.getHours(), now.getMinutes(), now.getSeconds());
};

/**
 * Transforms a Date object into a string formatted as "DD/MM/YYYY".
 *
 * @param date - The Date object to be transformed.
 * @returns A string representing the date in "DD/MM/YYYY" format.
 */
export function transformDateToString(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}
