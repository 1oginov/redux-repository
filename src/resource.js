/* @flow */

import * as S from './statuses';

import type {
  ResourseBuildFailedType,
  ResourseBuildReceivedType,
  ResourceBuildRequestedType,
  ResourceIdType,
  ResourceType,
} from './flowTypes';

/**
 * Build failed resource.
 * @param {number|string} id
 * @param {*} error
 * @return {Object}
 */
export const buildFailed = <ErrorType>(
    id: ResourceIdType,
    error: ErrorType,
): ResourseBuildFailedType<ErrorType> => ({
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
export const buildReceived = <DataType>(
    id: ResourceIdType,
    data: DataType,
): ResourseBuildReceivedType<DataType> => ({
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
export const buildRequested = (
    id: ResourceIdType,
): ResourceBuildRequestedType => ({
  id,
  status: S.REQUESTED,
});

/**
 * Extract resource data.
 * @param {Object} resource
 * @return {*}
 */
export const extractData = (resource: ResourceType): any =>
    (resource && resource.data ? resource.data : null);

/**
 * Is resource expired.
 * @param {Object} resource
 * @param {number} ttl
 * @return {boolean}
 */
export const isExpired = (resource: ResourceType, ttl: number): boolean =>
    !!(resource && Date.now() > resource.timestamp + ttl);

/**
 * Is resource failed.
 * @param {Object} resource
 * @return {boolean}
 */
export const isFailed = (resource: ResourceType): boolean =>
    !!(resource && resource.status === S.FAILED);

/**
 * Is resource received.
 * @param {Object} resource
 * @return {boolean}
 */
export const isReceived = (resource: ResourceType): boolean =>
    !!(resource && resource.status === S.RECEIVED);

/**
 * Is resource requested.
 * @param {Object} resource
 * @return {boolean}
 */
export const isRequested = (resource: ResourceType): boolean =>
    !!(resource && resource.status === S.REQUESTED);
