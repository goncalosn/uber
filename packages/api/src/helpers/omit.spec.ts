import omit from './omit';

/**
 *
 * @group unit
 */
describe('omit', () => {
  it('should remove one property from the object', () => {
    const object = { one: 1, two: 2, three: 3, four: 4 };

    const result = omit(object, 'one');

    expect(result).toStrictEqual({ two: 2, three: 3, four: 4 });
  });

  it('should remove multiple properties from the object', () => {
    const object = { one: 1, two: 2, three: 3, four: 4 };

    const result = omit(object, ['one', 'two']);

    expect(result).toStrictEqual({ three: 3, four: 4 });
  });
});
