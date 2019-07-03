/* @flow */

import { getResourceById } from './repository';
import { isExpired, isReceived, isRequested } from './resource';
import * as T from './types';

import type { FetchResourceOptionsType, ResourceIdType } from './flowTypes';

/**
 * Create action creator function to fetch resource.
 *
 * @param {string} resourceName Resource name, used to distinguish different resources.
 * @param {number|string} id Resource ID.
 * @param {Function} repositoryExtractor Callback consuming state as a parameter and returning the
 *                                       repository object.
 * @param {Function} fetchFunction Callback implementing fetch algorithm and calling the first
 *                                 parameter passed with the result or the second with an error.
 * @param {object} [options={}] Options.
 * @returns {Function} Function to be used as an action creator.
 */
export const createFetchResource = ( // eslint-disable-line import/prefer-default-export
  resourceName: string,
  id: ResourceIdType,
  repositoryExtractor: (Object) => Object,
  fetchFunction: Function,
  options: FetchResourceOptionsType = {},
): Function => (
  dispatch: Function,
  getState: Function,
): void => {
  const repository = repositoryExtractor(getState());
  const resourceInRepository = getResourceById(repository, id);

  if (resourceInRepository) {
    if (isReceived(resourceInRepository)
      && options.ttl
      && !isExpired(resourceInRepository, options.ttl)) {
      dispatch({
        payload: { id, resourceName },
        type: T.FETCH_RESOURCE_ALREADY_RECEIVED,
      });
      return;
    }

    if (isRequested(resourceInRepository)) {
      dispatch({
        payload: { id, resourceName },
        type: T.FETCH_RESOURCE_ALREADY_REQUESTED,
      });
      return;
    }
  }

  dispatch({
    payload: { id, resourceName },
    type: T.FETCH_RESOURCE_REQUESTED,
  });

  const dispatchReceived = (data) => {
    dispatch({
      payload: { data, id, resourceName },
      type: T.FETCH_RESOURCE_RECEIVED,
    });
  };

  const dispatchFailed = (error) => {
    dispatch({
      payload: { error, id, resourceName },
      type: T.FETCH_RESOURCE_FAILED,
    });
  };

  fetchFunction(dispatchReceived, dispatchFailed);
};
