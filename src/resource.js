import * as S from './statuses';

/**
 * Build failed resource.
 * @param {number|string} id
 * @param {*} error
 * @return {Object}
 */
export const buildFailed = (id, error) => ({
  error,
  id,
  status: S.FAILED,
  timestamp: Date.now(),
});

/**
 * Build received resource.
 * @param {number|string} id
 * @param {*} data
 * @return {Object}
 */
export const buildReceived = (id, data) => ({
  data,
  id,
  status: S.RECEIVED,
  timestamp: Date.now(),
});

/**
 * Build requested resource.
 * @param {number|string} id
 * @return {Object}
 */
export const buildRequested = (id) => ({
  id,
  status: S.REQUESTED,
});

/**
 * Extract resource data.
 * @param {Object} resource
 * @return {*}
 */
export const extractData = (resource) =>
    (resource && resource.data ? resource.data : null);

/**
 * Is resource expired.
 * @param {Object} resource
 * @param {number} ttl
 * @return {boolean}
 */
export const isExpired = (resource, ttl) =>
    !!(resource && Date.now() > resource.timestamp + ttl);

/**
 * Is resource failed.
 * @param {Object} resource
 * @return {boolean}
 */
export const isFailed = (resource) =>
    !!(resource && resource.status === S.FAILED);

/**
 * Is resource received.
 * @param {Object} resource
 * @return {boolean}
 */
export const isReceived = (resource) =>
    !!(resource && resource.status === S.RECEIVED);

/**
 * Is resource requested.
 * @param {Object} resource
 * @return {boolean}
 */
export const isRequested = (resource) =>
    !!(resource && resource.status === S.REQUESTED);
