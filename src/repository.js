/* @flow */

import type { RepositoryType, ResourceIdType, ResourceType } from './flowTypes';

/**
 * Merge resources IDs.
 *
 * @param {Array<number|string>} ids
 * @returns {Array<number|string>}
 * @private
 */
const mergeResourcesIds = (...ids): Array<ResourceIdType> => [...new Set([].concat(...ids))];

/**
 * Create initial repository state.
 *
 * @returns {{
 *   allIds: Array<number|string>,
 *   byId: object
 * }}
 */
export const createInitialState = (): RepositoryType => ({
  allIds: [],
  byId: {},
});

/**
 * Get resource from the repository by ID.
 *
 * @param {object} repository
 * @param {number|string} id
 * @returns {object|undefined} Resource object.
 */
export const getResourceById = (repository: RepositoryType, id: ResourceIdType): (
  ResourceType | void) => (repository.byId[id] || undefined);

/**
 * Get array of resources from the repository by array of IDs.
 *
 * @param {object} repository
 * @param {Array<number|string>} ids
 * @returns {Array<object>} Resources array.
 */
export const getResourcesArrayByIds = (
  repository: RepositoryType,
  ids: Array<ResourceIdType>,
): Array<ResourceType> => ((
  ids
    .map((id: ResourceIdType) => getResourceById(repository, id))
    .filter(resource => !!resource): Array<any>
): Array<ResourceType>);

/**
 * Push resource to the repository.
 *
 * @param {object} repository
 * @param {object} resource
 * @returns {object} Updated repository.
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
 * Push array of resources to the repository.
 *
 * @param {object} repository
 * @param {Array<object>} resources
 * @returns {object} Updated repository.
 */
export const pushResourcesArray = (
  repository: RepositoryType,
  resources: Array<ResourceType>,
): RepositoryType => {
  const byId = {};

  const resourcesIds = resources.map((resource: ResourceType) => {
    const { id } = resource;
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
