import { A11yConverter } from '../src';

jest.useRealTimers();

describe('A11y Converter ', () => {
  it('should be a class', () => {
    expect(new A11yConverter()).toBeInstanceOf(A11yConverter);
  });

  it('should return an object', async () => {
    const converter = new A11yConverter();
    const result = await converter.convert({
      url: 'https://skg-development-dev.s3.ap-southeast-1.amazonaws.com/public/original.html',
      method: 'GET',
    });
    console.log(result);
    expect(result).toBeInstanceOf(Object);
  });
});
