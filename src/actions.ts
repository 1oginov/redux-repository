import { ThunkAction } from 'redux-thunk';

import {
  fetchResourceAlreadyReceived,
  fetchResourceAlreadyRequested,
  fetchResourceFailed,
  fetchResourceReceived,
  fetchResourceRequested,
} from './creators';
import { Repository } from './interfaces';
import { getResourceById } from './repository';
import { isExpired, isReceived, isRequested } from './resource';
import { Action } from './types';

export interface FetchResourceOptions {
  ttl?: number;
}

/**
 * Create action creator function to fetch resource.
 *
 * @param {string} resourceName Resource name, used to distinguish different resources.
 * @param {string} id Resource ID.
 * @param {Function} repositoryExtractor Callback consuming state as a parameter and returning the repository object.
 * @param {Function} fetchFunction Callback implementing fetch algorithm and calling the first parameter passed with the
 *                                 result or the second with an error.
 * @param {object} [options={}] Options.
 * @returns {Function} Function to be used as an action creator.
 */
export const createFetchResource = <TState, TData, TError>(
  resourceName: string,
  id: string,
  repositoryExtractor: (state: TState) => Repository<TData, TError>,
  fetchFunction: (dispatchReceived: (data: TData) => void, dispatchFailed: (error: TError) => void) => void,
  options: FetchResourceOptions = {},
): ThunkAction<void, TState, null, Action<TData, TError>> => (dispatch, getState) => {
    const repository = repositoryExtractor(getState());
    const resourceInRepository = getResourceById(repository, id);

    if (resourceInRepository) {
      if (isReceived(resourceInRepository) && options.ttl && !isExpired(resourceInRepository, options.ttl)) {
        dispatch(fetchResourceAlreadyReceived<TData, TError>(resourceName, id));
        return;
      }

      if (isRequested(resourceInRepository)) {
        dispatch(fetchResourceAlreadyRequested<TData, TError>(resourceName, id));
        return;
      }
    }

    dispatch(fetchResourceRequested<TData, TError>(resourceName, id));

    const dispatchReceived = (data: TData): void => {
      dispatch(fetchResourceReceived<TData, TError>(resourceName, id, data));
    };

    const dispatchFailed = (error: TError): void => {
      dispatch(fetchResourceFailed<TData, TError>(resourceName, id, error));
    };

    fetchFunction(dispatchReceived, dispatchFailed);
  };
