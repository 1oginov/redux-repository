/* @flow */

/**
 * Merge resources IDs.
 * @return {Array<number|string>}
 * @private
 */
const mergeResourcesIds = (...ids) => [...new Set([].concat(...ids))];

/**
 * Get initial repository state.
 * @return {{
 *   allIds: Array<number|string>,
 *   byId: Object
 * }}
 */
export const getInitialState = () => ({
  allIds: [],
  byId: {},
});

/**
 * Get resource from repository by ID.
 * @param {Object} repository
 * @param {number|string} id
 * @return {Object|null}
 */
export const getResourceById = (repository, id) =>
    (repository.byId[id] || null);

/**
 * Get resources array by IDs.
 * @param {Object} repository
 * @param {Array<number|string>} ids
 * @return {Array<Object>}
 */
export const getResourcesArrayByIds = (repository, ids) => ids
    .map((id) => getResourceById(repository, id))
    .filter((resource) => !!resource);

/**
 * Push resource to repository.
 * @param {Object} repository
 * @param {Object} resource
 * @return {Object}
 */
export const pushResource = (repository, resource) => ({
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
export const pushResourcesArray = (repository, resources) => {
  const byId = {};

  const resourcesIds = resources.map((resource) => {
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
