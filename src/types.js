/* @flow */

/**
 * Prefix for the action types of this package.
 * @type {string}
 * @private
 */
const NAMESPACE: string = '@@repository';

/**
 * Resource fetching canceled, because it has already been received.
 * @type {string}
 */
export const FETCH_RESOURCE_ALREADY_RECEIVED: string = `${NAMESPACE}/FETCH_RESOURCE_ALREADY_RECEIVED`;

/**
 * Resource fetching canceled, because it has already been requested.
 * @type {string}
 */
export const FETCH_RESOURCE_ALREADY_REQUESTED: string = `${NAMESPACE}/FETCH_RESOURCE_ALREADY_REQUESTED`;

/**
 * Resource fetching failed.
 * @type {string}
 */
export const FETCH_RESOURCE_FAILED: string = `${NAMESPACE}/FETCH_RESOURCE_FAILED`;

/**
 * Resource fetching completed.
 * @type {string}
 */
export const FETCH_RESOURCE_RECEIVED: string = `${NAMESPACE}/FETCH_RESOURCE_RECEIVED`;

/**
 * Resource fetching started.
 * @type {string}
 */
export const FETCH_RESOURCE_REQUESTED: string = `${NAMESPACE}/FETCH_RESOURCE_REQUESTED`;

/**
 * Array of all of the action types.
 * @type {Array<string>}
 */
export const ARRAY: Array<string> = [
  FETCH_RESOURCE_ALREADY_RECEIVED,
  FETCH_RESOURCE_ALREADY_REQUESTED,
  FETCH_RESOURCE_FAILED,
  FETCH_RESOURCE_RECEIVED,
  FETCH_RESOURCE_REQUESTED,
];
