import { Repository, Resource } from './interfaces';

/**
 * Merge resources IDs.
 *
 * @param {Array<string>} ids
 * @returns {Array<string>}
 * @private
 */
const mergeResourcesIds = (...ids: string[][]): string[] => Array.from(new Set(([] as string[]).concat(...ids)));

/**
 * Create initial repository state.
 *
 * @returns {{
 *   allIds: Array<string>,
 *   byId: object
 * }}
 */
export const createInitialState = <TData, TError>(): Repository<TData, TError> => ({
  allIds: [],
  byId: {},
});

/**
 * Get resource from the repository by ID.
 *
 * @param {object} repository
 * @param {string} id
 * @returns {object|null} Resource object.
 */
export const getResourceById = <TData, TError>(
  repository: Repository<TData, TError>, id: string,
): Resource<TData, TError> | null => (repository.byId[id] || null);

/**
 * Get array of resources from the repository by array of IDs.
 *
 * @param {object} repository
 * @param {Array<string>} ids
 * @returns {Array<object>} Resources array.
 */
export const getResourcesArrayByIds = <TData, TError>(
  repository: Repository<TData, TError>,
  ids: string[],
): Resource<TData, TError>[] => (
  ids
    .map(id => getResourceById(repository, id))
    .filter(resource => !!resource) as Resource<TData, TError>[]
);

/**
 * Push resource to the repository.
 *
 * @param {object} repository
 * @param {object} resource
 * @returns {object} Updated repository.
 */
export const pushResource = <TData, TError>(
  repository: Repository<TData, TError>, resource: Resource<TData, TError>,
): Repository<TData, TError> => ({
  allIds: mergeResourcesIds(repository.allIds, [resource.id]),
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
export const pushResourcesArray = <TData, TError>(
  repository: Repository<TData, TError>,
  resources: Resource<TData, TError>[],
): Repository<TData, TError> => {
  const byId: { [id: string]: Resource<TData, TError> } = {};

  const resourcesIds = resources.map(resource => {
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
