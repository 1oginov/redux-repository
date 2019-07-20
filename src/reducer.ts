import { Repository } from './interfaces';
import { pushResource } from './repository';
import { createFailed, createReceived, createRequested } from './resource';
import * as T from './types';

/**
 * Check if the action type relates to the named resource and should be handled by the reducer of
 * this package.
 *
 * @param {string} resourceName
 * @param {object} action
 * @returns {boolean}
 */
export const isResourceAction = <TData, TError>(
  resourceName: string, action: T.Action<TData, TError>,
): boolean => Boolean(
  action.payload
  && action.payload.resourceName
  && action.payload.resourceName === resourceName
  && T.ALL_TYPES.indexOf(action.type) >= 0,
);

/**
 * Function consuming repository and action objects and returning updated repository object. If the
 * action passes `isResourceAction()` test, your own reducer should delegate the action handling to
 * this function.
 *
 * @param {object} repository
 * @param {object} action
 * @returns {object} Updated repository.
 */
export const repositoryReducer = <TData, TError>(
  repository: Repository<TData, TError>,
  action: T.Action<TData, TError>,
): Repository<TData, TError> => {
  switch (action.type) {
    case T.FETCH_RESOURCE_FAILED:
      return pushResource(repository, createFailed(action.payload.id, action.payload.error));

    case T.FETCH_RESOURCE_RECEIVED:
      return pushResource(repository, createReceived(action.payload.id, action.payload.data));

    case T.FETCH_RESOURCE_REQUESTED:
      return pushResource(repository, createRequested(action.payload.id));

    default:
      return repository;
  }
};
