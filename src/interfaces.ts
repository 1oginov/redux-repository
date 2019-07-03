import * as S from './statuses';

export interface RequestedResource {
  id: string;
  status: typeof S.REQUESTED;
}

export interface ReceivedResource<TData> {
  id: string;
  status: typeof S.RECEIVED;
  data: TData;
  timestamp: number;
}

export interface FailedResource<TError> {
  id: string;
  status: typeof S.FAILED;
  error: TError;
  timestamp: number;
}

export type Resource<TData, TError> =
  | RequestedResource
  | ReceivedResource<TData>
  | FailedResource<TError>;

export interface Repository<TData, TError> {
  allIds: string[];
  byId: { [id: string]: Resource<TData, TError> };
}
