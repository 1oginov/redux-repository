/* @flow */

import type {RepositoryType, ResourceIdType, ResourceType} from './flowTypes';

/**
 * Merge resources IDs.
 * @return {Array<number|string>}
 * @private
 */
const mergeResourcesIds = (...ids): Array<ResourceIdType> => [
  ...new Set([].concat(...ids)),
];

/**
 * Get initial repository state.
 * @return {{
 *   allIds: Array<number|string>,
 *   byId: Object
 * }}
 */
export const getInitialState = (): RepositoryType => ({
  allIds: [],
  byId: {},
});

/**
 * Get resource from repository by ID.
 * @param {Object} repository
 * @param {number|string} id
 * @return {Object|null}
 */
export const getResourceById = (
    repository: RepositoryType,
    id: ResourceIdType,
): (ResourceType | null) =>
    (repository.byId[id] || null);

/**
 * Get resources array by IDs.
 * @param {Object} repository
 * @param {Array<number|string>} ids
 * @return {Array<Object>}
 */
export const getResourcesArrayByIds = (
    repository: RepositoryType,
    ids: Array<ResourceIdType>,
): Array<ResourceType> => ids
    .map((id: ResourceIdType) => getResourceById(repository, id))
    .filter((resource: ResourceType | null) => !!resource);

/**
 * Push resource to repository.
 * @param {Object} repository
 * @param {Object} resource
 * @return {Object}
 */
export const pushResource = (
    repository: RepositoryType,
    resource: ResourceType,
): RepositoryType => ({
  allIds: mergeResourcesIds(repository.allIds, resource.id),
  byId: {
    ...repository.byId,
    [resource.id]: resource,
  },
});

/**
 * Push resources array to repository.
 * @param {Object} repository
 * @param {Array<Object>} resources
 * @return {Object}
 */
export const pushResourcesArray = (
    repository: RepositoryType,
    resources: Array<ResourceType>,
): RepositoryType => {
  const byId = {};

  const resourcesIds = resources.map((resource: ResourceType) => {
    const {id} = resource;
    byId[id] = resource;

    return id;
  });

  return {
    allIds: mergeResourcesIds(repository.allIds, resourcesIds),
    byId: {
      ...repository.byId,
      ...byId,
    },
  };
};
