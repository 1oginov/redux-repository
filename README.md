# redux-repository

[![npm](https://img.shields.io/npm/v/redux-repository)](https://www.npmjs.com/package/redux-repository)
[![CI](https://github.com/loginov-rocks/redux-repository/actions/workflows/ci.yml/badge.svg)](https://github.com/loginov-rocks/redux-repository/actions/workflows/ci.yml)
[![CD](https://github.com/loginov-rocks/redux-repository/actions/workflows/cd.yml/badge.svg)](https://github.com/loginov-rocks/redux-repository/actions/workflows/cd.yml)
[![Coverage Status](https://coveralls.io/repos/github/loginov-rocks/redux-repository/badge.svg?branch=main)](https://coveralls.io/github/loginov-rocks/redux-repository?branch=main)

A versatile set of pure functions to simplify the management of remote resources in Redux.

* A single resource consists of:
  * _ID_
  * _status_: requested, received, failed
  * _data_, if the _status_ is received
  * _error_, if the _status_ is failed
  * _timestamp_ of the _data_ or _error_ acquisition
* The same resource can be requested from multiple places at the same time, it will only be fetched once
* Resources are stored in the [normalized state shape](https://redux.js.org/recipes/structuring-reducers/normalizing-state-shape)
* Resources can be cached to skip consequent fetching
* Read-only operations are supported so far: fetch and reset (remove local copy)

## Quick Start

### Install

```sh
npm install redux-repository
```

### Use

Implement action creators first:

```ts
import { createFetchResource, createResetResources } from 'redux-repository/lib/actions';
import { Action } from 'redux-repository/lib/types';
import { ThunkAction } from 'redux-thunk';

import { Product } from './Product';
import { State } from './State';

export interface FetchProductAction {
  (id: string): void;
}

export interface ResetProductsAction {
  (): void;
}

export const fetchProduct = (id: string): ThunkAction<void, State, null, Action<Product, string>> => (
  createFetchResource(
    'product',
    id,
    ({ catalog: { products } }) => products,
    (dispatchReceived, dispatchFailed) => {
      fetch(`https://example.com/api/products/${id}`)
        .then(response => response.json())
        .then(data => dispatchReceived(data))
        .catch(error => dispatchFailed(error.toString()));
    },
    {
      silentAlready: true, // skip "already received" messages, optional
      ttl: 60 * 1000, // cache for 1 minute, optional
    },
  )
);

export const resetProducts = (): ThunkAction<void, State, null, Action<Product, string>> => (
  createResetResources('product')
);
```

Then, inject the repository reducer:

```ts
import { Action } from 'redux';
import { isResourceAction, repositoryReducer } from 'redux-repository/lib/reducer';
import { createInitialState } from 'redux-repository/lib/repository';
import { Action as ReduxRepositoryAction } from 'redux-repository/lib/types';

import { Product } from './Product';
import { State } from './State';

const initialState: State = {
  // ...
  catalog: {
    products: createInitialState(),
  },
};

export default (state: State = initialState, action: Action): State => {
  if (isResourceAction('product', action as ReduxRepositoryAction<Product, string>)) {
    return {
      ...state,
      catalog: {
        products: repositoryReducer(state.catalog.products, action as ReduxRepositoryAction<Product, string>),
      },
    };
  }

  switch (action.type) {
    // ...
    default:
      return state;
  }
};
```

That's it! Now you can trigger `fetchProduct`, `resetProducts` and wire components to the repository via state:

```ts
import { connect } from 'react-redux';
import { Repository } from 'redux-repository/lib/interfaces';

import { fetchProduct, FetchProductAction } from './actions';
import { Product } from './Product';
import { State } from './State';

interface StateProps {
  products: Repository<Product, string>;
}

interface DispatchProps {
  fetchProduct: FetchProductAction;
}

const mapStateToProps = ({ catalog: { products } }: State): StateProps => ({ products });
const mapDispatchToProps: DispatchProps = { fetchProduct };

export const connect = connect(mapStateToProps, mapDispatchToProps);
```

The full list of exported entities that might be useful:

```ts
import {
  createFetchResource,
  createResetResources,
} from 'redux-repository/lib/actions';

import {
  RequestedResource,
  ReceivedResource,
  FailedResource,
  Resource,
  Repository,
} from 'redux-repository/lib/interfaces';

import {
  isResourceAction,
  repositoryReducer,
} from 'redux-repository/lib/reducer';

import {
  createInitialState,
  getResourceById,
  getResourcesArrayByIds,
  pushResource,
  pushResourcesArray,
  mergeRepositories,
} from 'redux-repository/lib/repository';

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

import { Action } from 'redux-repository/lib/types';

const productResource = getResourceById(products, id);
const productData = extractData(productResource);
const productProgress = isRequested(productResource);
```
