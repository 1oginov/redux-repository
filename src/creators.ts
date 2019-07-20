import * as T from './types';

export const fetchResourceAlreadyReceived = <TData, TError>(
  resourceName: string,
  id: string,
): T.Action<TData, TError> => ({
  payload: { id, resourceName },
  type: T.FETCH_RESOURCE_ALREADY_RECEIVED,
});

export const fetchResourceAlreadyRequested = <TData, TError>(
  resourceName: string,
  id: string,
): T.Action<TData, TError> => ({
  payload: { id, resourceName },
  type: T.FETCH_RESOURCE_ALREADY_REQUESTED,
});

export const fetchResourceFailed = <TData, TError>(
  resourceName: string,
  id: string,
  error: TError,
): T.Action<TData, TError> => ({
  payload: { error, id, resourceName },
  type: T.FETCH_RESOURCE_FAILED,
});

export const fetchResourceReceived = <TData, TError>(
  resourceName: string,
  id: string,
  data: TData,
): T.Action<TData, TError> => ({
  payload: { data, id, resourceName },
  type: T.FETCH_RESOURCE_RECEIVED,
});

export const fetchResourceRequested = <TData, TError>(
  resourceName: string,
  id: string,
): T.Action<TData, TError> => ({
  payload: { id, resourceName },
  type: T.FETCH_RESOURCE_REQUESTED,
});

export const resourcesReset = <TData, TError>(resourceName: string): T.Action<TData, TError> => ({
  payload: { resourceName },
  type: T.RESOURCES_RESET,
});
