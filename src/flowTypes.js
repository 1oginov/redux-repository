/* @flow */

import type { FAILED_STATUS, RECEIVED_STATUS, REQUESTED_STATUS } from './statuses';

export type ActionType = {|
  payload: any,
  type: string,
|};

export type FetchResourceOptionsType = {
  ttl?: number,
};

export type ResourceIdType = string | number;

export type ResourseFailedType = {|
  error: any,
  id: ResourceIdType,
  status: FAILED_STATUS,
  timestamp: number,
|};

export type ResourseReceivedType = {|
  data: any,
  id: ResourceIdType,
  status: RECEIVED_STATUS,
  timestamp: number,
|};

export type ResourceRequestedType = {|
  id: ResourceIdType,
  status: REQUESTED_STATUS,
|};

export type ResourceType =
  | ResourseFailedType
  | ResourseReceivedType
  | ResourceRequestedType;

export type RepositoryType = {|
  allIds: Array<ResourceIdType>,
  byId: { [ResourceIdType]: ResourceType },
|};
