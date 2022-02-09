// ./src/sagas/index.js

import { all, call, put, takeEvery } from 'redux-saga/effects';
import { LOAD_TODO_LIST, RENDER_TODO_LIST } from '../actions';

export function* fetchToDoList() {
  const endpoint =
    // 'https://gist.githubusercontent.com/brunokrebs/f1cacbacd53be83940e1e85860b6c65b/raw/to-do-items.json';
    'https://tnl21xz29a.execute-api.us-west-2.amazonaws.com/p1-backend';
  const args = [
    endpoint,
  ]
  // FETCH API https://developer.mozilla.org/zh-TW/docs/Web/API/Fetch_API/Using_Fetch
  const response = yield call(fetch, args);
  // const response = yield call(fetch, endpoint);
  console.log(response);
  const data = yield response.json();
  yield put({ type: RENDER_TODO_LIST, toDoList: data });
}

export function* loadToDoList() {
  yield takeEvery(LOAD_TODO_LIST, fetchToDoList);
}

export default function* rootSaga() {
  yield all([loadToDoList()]);
}
