import { A11yConverter } from '../src';

describe('A11y Converter ', () => {
  it('should be a class', () => {
    expect(new A11yConverter()).toBeInstanceOf(A11yConverter);
  });

  it('should have a method', () => {
    expect(new A11yConverter().start).toBeInstanceOf(Function);
  });

  it('should return an object', async () => {
    const result = await new A11yConverter().start({
      url: 'https://www.google.com',
      method: 'GET',
    });
    expect(result).toBeInstanceOf(Object);
  });
});
