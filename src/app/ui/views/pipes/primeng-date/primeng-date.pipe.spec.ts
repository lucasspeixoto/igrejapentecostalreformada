import { PrimengDatePipe } from './primeng-date.pipe';

describe('PrimengDatePipe', () => {
  let pipe: PrimengDatePipe;

  beforeEach(() => {
    pipe = new PrimengDatePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform a valid date string from "YYYY-MM-DD" to "DD/MM/YYYY"', () => {
    const result = pipe.transform('2023-10-05');
    expect(result).toBe('05/10/2023');
  });

  it('should return the same value if the input is an empty string', () => {
    const result = pipe.transform('');
    expect(result).toBe('');
  });

  it('should handle date strings with extra spaces', () => {
    const result = pipe.transform(' 2023-10-05 ');
    expect(result).toBe('05/10/2023');
  });
});
