/* @flow */

/**
 * Namespace.
 * @type {string}
 * @private
 */
const NAMESPACE: string = '@@repository';

/**
 * Fetch resource already received action type.
 * @type {string}
 */
export const FETCH_RESOURCE_ALREADY_RECEIVED: string =
    `${NAMESPACE}/FETCH_RESOURCE_ALREADY_RECEIVED`;

/**
 * Fetch resource already requested action type.
 * @type {string}
 */
export const FETCH_RESOURCE_ALREADY_REQUESTED: string =
    `${NAMESPACE}/FETCH_RESOURCE_ALREADY_REQUESTED`;

/**
 * Fetch resource failed action type.
 * @type {string}
 */
export const FETCH_RESOURCE_FAILED: string =
    `${NAMESPACE}/FETCH_RESOURCE_FAILED`;

/**
 * Fetch resource received action type.
 * @type {string}
 */
export const FETCH_RESOURCE_RECEIVED: string =
    `${NAMESPACE}/FETCH_RESOURCE_RECEIVED`;

/**
 * Fetch resource requested action type.
 * @type {string}
 */
export const FETCH_RESOURCE_REQUESTED: string =
    `${NAMESPACE}/FETCH_RESOURCE_REQUESTED`;

/**
 * Array of action types.
 * @type {Array<string>}
 */
export const ARRAY: Array<string> = [
  FETCH_RESOURCE_ALREADY_RECEIVED,
  FETCH_RESOURCE_ALREADY_REQUESTED,
  FETCH_RESOURCE_FAILED,
  FETCH_RESOURCE_RECEIVED,
  FETCH_RESOURCE_REQUESTED,
];
