import { Repository } from './interfaces';
import { createInitialState, getResourceById, mergeRepositories } from './repository';
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
        data: 'first data',
        id: 'first',
        status: S.RECEIVED,
        timestamp: 1,
      },
    },
  };

  it('returns resource by ID', () => {
    expect(getResourceById(repository, 'first')).toStrictEqual({
      data: 'first data',
      id: 'first',
      status: S.RECEIVED,
      timestamp: 1,
    });
  });

  it('returns null if resource is not found', () => {
    expect(getResourceById(repository, 'second')).toBe(null);
  });
});

describe('mergeRepositories', () => {
  const first: Repository<string, string> = {
    allIds: [
      'firstFailed',
      'firstReceived',
      'firstRequested',
    ],
    byId: {
      firstFailed: {
        error: 'Error',
        id: 'firstFailed',
        status: S.FAILED,
        timestamp: 1,
      },
      firstReceived: {
        data: 'firstReceived data',
        id: 'firstReceived',
        status: S.RECEIVED,
        timestamp: 2,
      },
      firstRequested: {
        id: 'firstRequested',
        status: S.REQUESTED,
      },
    },
  };

  const second: Repository<string, string> = {
    allIds: [
      'firstReceived',
      'secondFailed',
      'secondReceived',
      'secondRequested',
    ],
    byId: {
      // The following resource should not replace the same resource in the first repository.
      firstReceived: {
        id: 'firstReceived',
        status: S.REQUESTED,
      },
      secondFailed: {
        error: 'Error',
        id: 'secondFailed',
        status: S.FAILED,
        timestamp: 3,
      },
      secondReceived: {
        data: 'secondReceived data',
        id: 'secondReceived',
        status: S.RECEIVED,
        timestamp: 4,
      },
      secondRequested: {
        id: 'secondRequested',
        status: S.REQUESTED,
      },
    },
  };

  it('returns repository containing resources from the first repository and only received from the second', () => {
    expect(mergeRepositories(first, second)).toStrictEqual({
      allIds: [
        'firstFailed',
        'firstReceived',
        'firstRequested',
        'secondReceived',
      ],
      byId: {
        firstFailed: {
          error: 'Error',
          id: 'firstFailed',
          status: S.FAILED,
          timestamp: 1,
        },
        firstReceived: {
          data: 'firstReceived data',
          id: 'firstReceived',
          status: S.RECEIVED,
          timestamp: 2,
        },
        firstRequested: {
          id: 'firstRequested',
          status: S.REQUESTED,
        },
        secondReceived: {
          data: 'secondReceived data',
          id: 'secondReceived',
          status: S.RECEIVED,
          timestamp: 4,
        },
      },
    });
  });
});
