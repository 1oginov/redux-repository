/* @flow */

import {pushResource} from './repository';
import {buildFailed, buildReceived, buildRequested} from './resource';
import * as T from './types';

/**
 * Is resource action.
 * @param {string} resourceName
 * @param {Object} action
 * @return {boolean}
 */
export const isResourceAction = (resourceName, action) =>
    (action.payload && action.payload.resourceName &&
        action.payload.resourceName === resourceName &&
        T.ARRAY.indexOf(action.type) >= 0);

/**
 * Repository reducer.
 * @param {Object} repository
 * @param {Object} action
 * @return {Object}
 */
export const repositoryReducer = (repository, action) => {
  switch (action.type) {
    case T.FETCH_RESOURCE_FAILED:
      return pushResource(repository,
          buildFailed(action.payload.id, action.payload.error));

    case T.FETCH_RESOURCE_RECEIVED:
      return pushResource(repository,
          buildReceived(action.payload.id, action.payload.data));

    case T.FETCH_RESOURCE_REQUESTED:
      return pushResource(repository,
          buildRequested(action.payload.id));

    default:
      return repository;
  }
};
