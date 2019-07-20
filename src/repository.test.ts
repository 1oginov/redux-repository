import { Repository } from './interfaces';
import { createInitialState, getResourceById } from './repository';
import * as S from './statuses';

describe('createInitialState', () => {
  it('returns initial state', () => {
    expect(createInitialState()).toStrictEqual({
      allIds: [],
      byId: {},
    });
  });
});

describe('getResourceById', () => {
  const repository: Repository<string, string> = {
    allIds: [
      'first',
    ],
    byId: {
      first: {
        data: 'data',
        id: 'first',
        status: S.RECEIVED,
        timestamp: 1,
      },
    },
  };

  it('returns resource by ID', () => {
    expect(getResourceById(repository, 'first')).toStrictEqual({
      data: 'data',
      id: 'first',
      status: S.RECEIVED,
      timestamp: 1,
    });
  });

  it('returns null if resource is not found', () => {
    expect(getResourceById(repository, 'second')).toBe(null);
  });
});
