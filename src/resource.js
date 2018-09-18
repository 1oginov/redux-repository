/* @flow */

import * as S from './statuses';

import type {
  ResourseFailedType,
  ResourseReceivedType,
  ResourceRequestedType,
  ResourceIdType,
  ResourceType,
} from './flowTypes';

/**
 * Create an object representing failed resource.
 *
 * @param {number|string} id
 * @param {*} error
 * @returns {{error: *, id: (number|string), status: string, timestamp: number}}
 */
export const createFailed = (id: ResourceIdType, error: any): ResourseFailedType => ({
  error,
  id,
  status: S.FAILED,
  timestamp: Date.now(),
});

/**
 * Create an object representing received resource.
 *
 * @param {number|string} id
 * @param {*} data
 * @returns {{data: *, id: (number|string), status: string, timestamp: number}}
 */
export const createReceived = (id: ResourceIdType, data: any): ResourseReceivedType => ({
  data,
  id,
  status: S.RECEIVED,
  timestamp: Date.now(),
});

/**
 * Create an object representing requested resource.
 *
 * @param {number|string} id
 * @returns {{id: (number|string), status: string}}
 */
export const createRequested = (id: ResourceIdType): ResourceRequestedType => ({
  id,
  status: S.REQUESTED,
});

/**
 * Extract data from the object representing resource.
 *
 * @param {Object} resource
 * @returns {*}
 */
export const extractData = (resource: ResourceType): any => (
  resource && resource.data ? resource.data : undefined
);

/**
 * Extract error from the object representing resource.
 *
 * @param {Object} resource
 * @returns {*}
 */
export const extractError = (resource: ResourceType): any => (
  resource && resource.error ? resource.error : undefined
);

/**
 * Check if resource is expired.
 *
 * @param {Object} resource
 * @param {number} ttl
 * @returns {boolean}
 */
export const isExpired = (resource: ResourceType, ttl: number): boolean => (
  resource && !!resource.timestamp && Date.now() > resource.timestamp + ttl
);

/**
 * Check if resource is failed.
 *
 * @param {Object} resource
 * @returns {boolean}
 */
export const isFailed = (resource: ResourceType): boolean => (
  resource && resource.status === S.FAILED
);

/**
 * Check if resource is received.
 *
 * @param {Object} resource
 * @returns {boolean}
 */
export const isReceived = (resource: ResourceType): boolean => (
  resource && resource.status === S.RECEIVED
);

/**
 * Check if resource is requested.
 *
 * @param {Object} resource
 * @returns {boolean}
 */
export const isRequested = (resource: ResourceType): boolean => (
  resource && resource.status === S.REQUESTED
);
