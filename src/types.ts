/**
 * Resource fetching canceled, because it has already been received.
 *
 * @type {string}
 */
export const FETCH_RESOURCE_ALREADY_RECEIVED = '@@repository/FETCH_RESOURCE_ALREADY_RECEIVED';

export interface FetchResourceAlreadyReceived {
  type: typeof FETCH_RESOURCE_ALREADY_RECEIVED;
  payload: {
    id: string;
    resourceName: string;
  };
}

/**
 * Resource fetching canceled, because it has already been requested.
 *
 * @type {string}
 */
export const FETCH_RESOURCE_ALREADY_REQUESTED = '@@repository/FETCH_RESOURCE_ALREADY_REQUESTED';

export interface FetchResourceAlreadyRequested {
  type: typeof FETCH_RESOURCE_ALREADY_REQUESTED;
  payload: {
    id: string;
    resourceName: string;
  };
}

/**
 * Resource fetching failed.
 *
 * @type {string}
 */
export const FETCH_RESOURCE_FAILED = '@@repository/FETCH_RESOURCE_FAILED';

export interface FetchResourceFailed<TError> {
  type: typeof FETCH_RESOURCE_FAILED;
  payload: {
    id: string;
    resourceName: string;
    error: TError;
  };
}

/**
 * Resource fetching completed.
 *
 * @type {string}
 */
export const FETCH_RESOURCE_RECEIVED = '@@repository/FETCH_RESOURCE_RECEIVED';

export interface FetchResourceReceived<TData> {
  type: typeof FETCH_RESOURCE_RECEIVED;
  payload: {
    id: string;
    resourceName: string;
    data: TData;
  };
}

/**
 * Resource fetching started.
 *
 * @type {string}
 */
export const FETCH_RESOURCE_REQUESTED = '@@repository/FETCH_RESOURCE_REQUESTED';

export interface FetchResourceRequested {
  type: typeof FETCH_RESOURCE_REQUESTED;
  payload: {
    id: string;
    resourceName: string;
  };
}

/**
 * Resources reset.
 *
 * @type {string}
 */
export const RESOURCES_RESET = '@@repository/RESOURCES_RESET';

export interface ResourcesReset {
  type: typeof RESOURCES_RESET;
  payload: {
    resourceName: string;
  };
}

/**
 * Array of all of the action types.
 *
 * @type {Array<string>}
 */
export const ALL_TYPES: string[] = [
  FETCH_RESOURCE_ALREADY_RECEIVED,
  FETCH_RESOURCE_ALREADY_REQUESTED,
  FETCH_RESOURCE_FAILED,
  FETCH_RESOURCE_RECEIVED,
  FETCH_RESOURCE_REQUESTED,
  RESOURCES_RESET,
];

export type Action<TData, TError> =
  | FetchResourceAlreadyReceived
  | FetchResourceAlreadyRequested
  | FetchResourceFailed<TError>
  | FetchResourceReceived<TData>
  | FetchResourceRequested
  | ResourcesReset;
