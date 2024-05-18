import { call, put, all, takeLatest } from 'redux-saga/effects';
import { addSearchResult, handleMovieSearch } from '../reducers/searchSlice';

// Saga worker function to handle fetching movie data from the API
function* searchMovie(action) {
  const { payload } = action; // redux toolkit does wrap the data passed in dispatched actions in a payload field by default
  const url = `https://www.omdbapi.com/?apikey=3ca5df7&t=${payload}`;

  try {
    const response = yield call(fetch, url);
    const movie = yield response.json();
    yield put(addSearchResult(movie));
  } catch (error) {
    // Handle error
    console.error('Error fetching movie:', error);
  }
}

// Saga watcher function
function* watchMovieSearch() {
  yield takeLatest(handleMovieSearch.type, searchMovie); // using automatically generated action type from the action creator
}

export default function* rootSaga() {
  yield all([
    watchMovieSearch(),
    // Add other watcher functions here if needed
  ]);
}

/*

all() is an effect creator, which tells the saga to run all sagas passed to it concurrently and to wait for them all to complete. 
We pass an array of sagas that encapsulates our domain logic.

put: Dispatches an action to the Redux store.

If there are multiple requests, takeEvery will start multiple instances of the worker saga; in other words, it handles concurrency for you.

takeEvery: Listens for every action of a certain type and triggers a worker saga each time.

takeLatest: Similar to takeEvery, but only runs the latest saga and cancels any previous sagas if multiple actions of the same type 
are dispatched quickly. takeLatest helps the watcher saga to look for action (HANDLE_MOVIE_SEARCH) and when it sees that action dispatched, 
it will run a handler function

call: Calls a function or a promise. It's useful for performing synchronous or asynchronous tasks outside of sagas.

select: Retrieves data from the Redux store state.

all: Runs multiple sagas concurrently.

*/