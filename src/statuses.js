/* @flow */

/*
 * Statuses values duplicated here to be used for other Flow types definitions.
 */
export type FAILED_STATUS = 'failed';
export type RECEIVED_STATUS = 'received';
export type REQUESTED_STATUS = 'requested';

/**
 * Status representing failed resource.
 * @type {string}
 */
export const FAILED: FAILED_STATUS = 'failed';

/**
 * Status representing received resource.
 * @type {string}
 */
export const RECEIVED: RECEIVED_STATUS = 'received';

/**
 * Status representing requested resource.
 * @type {string}
 */
export const REQUESTED: REQUESTED_STATUS = 'requested';
