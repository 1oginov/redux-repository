import {getResourceById} from './repository';
import {isExpired, isReceived, isRequested} from './resource';
import * as T from './types';

/**
 * Fetch resource action creator.
 * @param {string} resourceName
 * @param {number|string} id
 * @param {Function} repositoryExtractor
 * @param {Function} fetchFunction
 * @param {Object} [options={}]
 * @return {Function}
 */
// eslint-disable-next-line import/prefer-default-export
export const fetchResource = (resourceName, id, repositoryExtractor,
                              fetchFunction, options = {}) =>
    (dispatch, getState) => {
      const repository = repositoryExtractor(getState());
      const resourceInRepository = getResourceById(repository, id);

      if (resourceInRepository) {
        if (isReceived(resourceInRepository) && options.ttl &&
            !isExpired(resourceInRepository, options.ttl)) {
          dispatch({
            type: T.FETCH_RESOURCE_ALREADY_RECEIVED,
            payload: {id, resourceName},
          });
          return;
        } else if (isRequested(resourceInRepository)) {
          dispatch({
            type: T.FETCH_RESOURCE_ALREADY_REQUESTED,
            payload: {id, resourceName},
          });
          return;
        }
      }

      dispatch({
        type: T.FETCH_RESOURCE_REQUESTED,
        payload: {id, resourceName},
      });

      const dispatchReceived = (data) => {
        dispatch({
          type: T.FETCH_RESOURCE_RECEIVED,
          payload: {data, id, resourceName},
        });
      };

      const dispatchFailed = (error) => {
        dispatch({
          type: T.FETCH_RESOURCE_FAILED,
          payload: {error, id, resourceName},
        });
      };

      fetchFunction(dispatchReceived, dispatchFailed);
    };
