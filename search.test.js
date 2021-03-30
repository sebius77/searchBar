/**
 * @jest-environment jsdom
 */
test('search-bar', () => {
    expect(this.getAttribute('value')).toBe('test');
})