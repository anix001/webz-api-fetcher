import { WebzQueryBuilder } from "../webzQueryBuilder";


describe('WebzQueryBuilder', () => {
  const baseURL = 'https://exampleAPI.com';

  test('should throw an error if base URL is not provided', () => {
    expect(() => new WebzQueryBuilder('')).toThrow(new Error('Base URL is required'));
  });

  test('should initialize with the given base URL', () => {
    const builder = new WebzQueryBuilder(baseURL);
    expect(builder).toBeDefined();
  });

  test('should throw an error if token is not provided', () => {
    const builder = new WebzQueryBuilder(baseURL);
    expect(() => builder.setToken('')).toThrow(new Error('Token is required'));
  });

  test('should throw an error if search term is not provided', () => {
    const builder = new WebzQueryBuilder(baseURL);
    expect(() => builder.setSearchTerm('')).toThrow(new Error('Search term is required'));
  });

  test('should set "from" and include it in the built URL', () => {
    const builder = new WebzQueryBuilder(baseURL);
    builder.setToken('token').setFrom(5);

    const result = builder.build();
    expect(result).toContain('from=5');
  });

  test('should throw an error if "from" is less than 0', () => {
    const builder = new WebzQueryBuilder(baseURL);
    expect(() => builder.setFrom(-1)).toThrow(new Error('From must start from 0 or higher'));
  });

  test('should set "size" and include it in the built URL', () => {
    const builder = new WebzQueryBuilder(baseURL);
    builder.setToken('token').setSize(20);

    const result = builder.build();
    expect(result).toContain('size=20');
  });

  test('should throw an error if "size" is less than or equal to 0', () => {
    const builder = new WebzQueryBuilder(baseURL);
    expect(() => builder.setSize(0)).toThrow(new Error('Size must be a positive number'));
  });

  test('should build a URL with all query parameters', () => {
    const builder = new WebzQueryBuilder(baseURL);

    const token = 'testToken';
    const searchTerm = 'test search';
    const from = 10;
    const size = 25;

    const result = builder
      .setToken(token)
      .setSearchTerm(searchTerm)
      .setFrom(from)
      .setSize(size)
      .build();

    expect(result).toBe(
      `${baseURL}?token=${token}&q=test%20search&from=${from}&size=${size}`
    );
  });

  test('should throw an error when trying to build a URL without a token', () => {
    const builder = new WebzQueryBuilder(baseURL);
    expect(() => builder.build()).toThrow(new Error('Token is required to build the URL'));
  });

  test('should include default values for "from" and "size" if not explicitly set', () => {
    const builder = new WebzQueryBuilder(baseURL);

    const token = 'testToken';
    const result = builder.setToken(token).build();

    expect(result).toContain('from=0');
    expect(result).toContain('size=10');
  });
});
