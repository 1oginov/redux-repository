export type ActionType = {
  type: string,
  payload: any,
};

export type FetchResourceOptionsType = {
  ttl?: number,
};

export type ResourceIdType = string | number;

export type ResourceBuildRequestedType = {
  id: ResourceIdType,
  status: string,
};

export type ResourseBuildFailedType<ErrorType> = ResourceBuildRequestedType & {
  error: ErrorType,
  timestamp: number,
};

export type ResourseBuildReceivedType<DataType> = ResourceBuildRequestedType & {
  data: DataType,
  timestamp: number,
};

export type ResourceType = {
  id: ResourceIdType,
  data?: any,
  error?: any,
  status: string,
  timestamp?: number,
};

export type RepositoryType = {
  allIds: Array<ResourceIdType>,
  byId: { [ResourceIdType]: ResourceType },
};
