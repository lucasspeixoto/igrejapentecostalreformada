import { FirstAndLastnamePipe } from './first-and-lastname.pipe';

describe('FirstAndLastnamePipe', () => {
  let pipe: FirstAndLastnamePipe;

  beforeEach(() => {
    pipe = new FirstAndLastnamePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return an empty string if input is an empty string', () => {
    expect(pipe.transform('')).toBe('');
  });

  it('should return the same name if input contains only one word', () => {
    expect(pipe.transform('John')).toBe('John');
  });

  it('should return the first and last name if input contains multiple words', () => {
    expect(pipe.transform('John Doe Smith')).toBe('John Smith');
  });

  it('should trim extra spaces and return the first and last name', () => {
    expect(pipe.transform('  John   Doe   ')).toBe('John Doe');
  });

  it('should handle names with special characters', () => {
    expect(pipe.transform('Jean-Luc Picard')).toBe('Jean-Luc Picard');
  });

  it('should handle names with mixed casing', () => {
    expect(pipe.transform('jOhN dOe')).toBe('jOhN dOe');
  });
});
