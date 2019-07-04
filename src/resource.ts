import {
  FailedResource, ReceivedResource, RequestedResource, Resource,
} from './interfaces';
import * as S from './statuses';

/**
 * Create an object representing failed resource.
 *
 * @param {string} id
 * @param {*} error
 * @returns {{error: *, id: string, status: string, timestamp: number}}
 */
export const createFailed = <TError>(id: string, error: TError): FailedResource<TError> => ({
  error,
  id,
  status: S.FAILED,
  timestamp: Date.now(),
});

/**
 * Create an object representing received resource.
 *
 * @param {string} id
 * @param {*} data
 * @returns {{data: *, id: string, status: string, timestamp: number}}
 */
export const createReceived = <TData>(id: string, data: TData): ReceivedResource<TData> => ({
  data,
  id,
  status: S.RECEIVED,
  timestamp: Date.now(),
});

/**
 * Create an object representing requested resource.
 *
 * @param {string} id
 * @returns {{id: string, status: string}}
 */
export const createRequested = (id: string): RequestedResource => ({
  id,
  status: S.REQUESTED,
});

/**
 * Extract data from the object representing resource.
 *
 * @param {object} resource
 * @returns {*}
 */
export const extractData = <TData, TError>(resource: Resource<TData, TError>): TData | null => (
  resource && (resource as ReceivedResource<TData>).data ? (resource as ReceivedResource<TData>).data : null
);

/**
 * Extract error from the object representing resource.
 *
 * @param {object} resource
 * @returns {*}
 */
export const extractError = <TData, TError>(resource: Resource<TData, TError>): TError | null => (
  resource && (resource as FailedResource<TError>).error ? (resource as FailedResource<TError>).error : null
);

/**
 * Check if resource is expired.
 *
 * @param {object} resource
 * @param {number} ttl
 * @returns {boolean}
 */
export const isExpired = <TData, TError>(resource: Resource<TData, TError>, ttl: number): boolean => Boolean(
  resource && (resource as ReceivedResource<TData>).timestamp
  && Date.now() > (resource as ReceivedResource<TData>).timestamp + ttl,
);

/**
 * Check if resource is failed.
 *
 * @param {object} resource
 * @returns {boolean}
 */
export const isFailed = <TData, TError>(resource: Resource<TData, TError>): boolean => Boolean(
  resource && resource.status === S.FAILED,
);

/**
 * Check if resource is received.
 *
 * @param {object} resource
 * @returns {boolean}
 */
export const isReceived = <TData, TError>(resource: Resource<TData, TError>): boolean => Boolean(
  resource && resource.status === S.RECEIVED,
);

/**
 * Check if resource is requested.
 *
 * @param {object} resource
 * @returns {boolean}
 */
export const isRequested = <TData, TError>(resource: Resource<TData, TError>): boolean => Boolean(
  resource && resource.status === S.REQUESTED,
);
