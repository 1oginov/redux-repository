# redux-repository

[![NpmVersion](https://img.shields.io/npm/v/redux-repository.svg)](https://www.npmjs.com/package/redux-repository)
[![Build Status](https://travis-ci.com/loginov-rocks/redux-repository.svg?branch=master)](https://travis-ci.com/loginov-rocks/redux-repository)
[![Coverage Status](https://coveralls.io/repos/github/loginov-rocks/redux-repository/badge.svg?branch=master)](https://coveralls.io/github/loginov-rocks/redux-repository?branch=master)
[![dependencies Status](https://david-dm.org/loginov-rocks/redux-repository/status.svg)](https://david-dm.org/loginov-rocks/redux-repository)
[![devDependencies Status](https://david-dm.org/loginov-rocks/redux-repository/dev-status.svg)](https://david-dm.org/loginov-rocks/redux-repository?type=dev)
[![peerDependencies Status](https://david-dm.org/loginov-rocks/redux-repository/peer-status.svg)](https://david-dm.org/loginov-rocks/redux-repository?type=peer)
[![Greenkeeper badge](https://badges.greenkeeper.io/loginov-rocks/redux-repository.svg)](https://greenkeeper.io/)

## Quick start

### Install

```sh
npm install --save redux-repository
```

### Use

_TODO: Update_

#### Actions

```js
import { createFetchResource } from 'redux-repository/lib/actions';

export const fetchMyResource = (id) => createFetchResource(
  'myResource',
  id,
  (state) => state.myRepository,
  (dispatchReceived, dispatchFailed) => {
    // Your custom logic to fetch the resource.
    fetch(`https://example.com/my-resources/${id}`)
      .then(data => dispatchReceived(data))
      .catch(error => dispatchFailed(error.toString()));
  },
  { ttl: 60 * 60 * 1000 },
);
```

`fetchMyResource` here is a simple action creator that you can use as usual.

#### Reducer

```js
import { isResourceAction, repositoryReducer } from 'redux-repository/lib/reducer';
import { createInitialState } from 'redux-repository/lib/repository';

const initialState = {
  // ...
  myRepository: createInitialState(),
  // ...
};

export default (state = initialState, action) => {
  if (isResourceAction('myResource', action)) {
    return {
      ...state,
      myRepository: repositoryReducer(state.myRepository, action),
    };
  }

  switch (action.type) {
  // ...
    default:
      return state;
  }
};
```

Having different names for resources (`myResource` here) helps to support different resources.

#### Repository

```js
import {
  getResourceById,
  getResourcesArrayByIds,
  pushResource,
  pushResourcesArray,
} from 'redux-repository/lib/repository';
```

#### Resource

```js
import {
  createFailed,
  createReceived,
  createRequested,
  extractData,
  extractError,
  isExpired,
  isFailed,
  isReceived,
  isRequested,
} from 'redux-repository/lib/resource';
```

#### Flow types

```js
import type {
  ActionType,
  FetchResourceOptionsType,
  ResourceIdType,
  ResourseFailedType,
  ResourseReceivedType,
  ResourceRequestedType,
  ResourceType,
  RepositoryType,
} from 'redux-repository/lib/flowTypes';
```

## Contribution

Please use the [dev](https://github.com/loginov-rocks/redux-repository/tree/dev) branch and feel free to contribute!
