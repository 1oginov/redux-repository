# redux-repository

[![NpmVersion](https://img.shields.io/npm/v/redux-repository.svg)](https://www.npmjs.com/package/redux-repository)
[![dependencies Status](https://david-dm.org/1oginov/redux-repository/status.svg)](https://david-dm.org/1oginov/redux-repository)
[![devDependencies Status](https://david-dm.org/1oginov/redux-repository/dev-status.svg)](https://david-dm.org/1oginov/redux-repository?type=dev)

## Quick start

### Install

```sh
npm install --save redux-repository
```

### Use

#### Actions

```js
import { createFetchResource } from 'redux-repository/actions';

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
import { isResourceAction, repositoryReducer } from 'redux-repository/reducer';
import { createInitialState } from 'redux-repository/repository';

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
} from 'redux-repository/repository';
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
} from 'redux-repository/resource';
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
} from 'redux-repository/flowTypes';
```

## Contribution

Please use the [dev](https://github.com/1oginov/redux-repository/tree/dev) branch and feel free to contribute!
