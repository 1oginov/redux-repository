import { createInitialState } from './repository';

describe('repository', () => {
  describe('createInitialState', () => {
    it('returns initial state', () => {
      expect(createInitialState()).toEqual({
        allIds: [],
        byId: {},
      });
    });
  });
});
