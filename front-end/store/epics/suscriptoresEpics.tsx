import axios from 'axios'
import { combineEpics, Epic } from 'redux-observable'
import { from, of } from 'rxjs'
import { catchError, filter, map, mergeMap, startWith, switchMap } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import {
  addedSuscriptores,
  addingSuscriptores,
  addingSuscriptoresFailed,
  editedSuscriptores,
  editingSuscriptores,
  editingSuscriptoresFailed,
  foundSuscriptores,
  loadedSuscriptores,
  loadingSuscriptores,
  loadingSuscriptoresFailed,
  removedSuscriptor,
  removingSuscriptor,
  removingSuscriptorFailed,
  searchingSuscriptores,
  searchingSuscriptoresFailed,
  SuscriptoresAction,
  SuscriptoresActionTypes,
} from '../actions/suscriptoresActions'
import { IState } from '../reducers'
import { buildFormData } from './index'

const searchSuscriptoresEpic: Epic<SuscriptoresAction, SuscriptoresAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(SuscriptoresActionTypes.SEARCH_SUSCRIPTORES)),
    mergeMap((action) => {
      if (typeof action.searchOptions === 'string') {
        action.searchOptions = {
          searchString: action.searchOptions,
          page: 1,
          searchField: '_id',
        }
      }
      let url = `http://127.0.0.1:4567/api/suscriptores/search/`
      return from(axios.get(url, { params: action.searchOptions })).pipe(
        map((response) => foundSuscriptores(response.data, action.keep)),
        startWith(searchingSuscriptores()),
        catchError(() => of(searchingSuscriptoresFailed()))
      )
    })
  )

const loadSuscriptoresEpic: Epic<SuscriptoresAction, SuscriptoresAction, IState> = (action$, state$) => {
  let responses = []
  return action$.pipe(
    filter(isOfType(SuscriptoresActionTypes.LOAD_SUSCRIPTORES)),
    switchMap((action) => {
      let url = `http://127.0.0.1:4567/api/suscriptores/`
      return from(axios.get(url, { params: action.loadOptions })).pipe(
        map((response) => loadedSuscriptores(response.data)),
        startWith(loadingSuscriptores()),
        catchError(() => of(loadingSuscriptoresFailed()))
      )
    })
  )
}

const addSuscriptoresEpic: Epic<SuscriptoresAction, SuscriptoresAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(SuscriptoresActionTypes.ADD_SUSCRIPTORES)),

    mergeMap((action) => {
      const data = new FormData()
      buildFormData(data, action.payload)
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }

      return from(axios.post(`http://127.0.0.1:4567/api/suscriptores/`, data, config)).pipe(
        map((response) => addedSuscriptores(response.data)),
        startWith(addingSuscriptores()),
        catchError((err) => of(addingSuscriptoresFailed(err.response)))
      )
    })
  )

const removeSuscriptoresEpic: Epic<SuscriptoresAction, SuscriptoresAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(SuscriptoresActionTypes.REMOVE_SUSCRIPTOR)),
    mergeMap((action) =>
      from(axios.delete(`http://127.0.0.1:4567/api/suscriptores/${action.payload._id}`)).pipe(
        map((response) => removedSuscriptor()),
        startWith(removingSuscriptor()),
        catchError(() => of(removingSuscriptorFailed()))
      )
    )
  )

const editSuscriptoresEpic: Epic<SuscriptoresAction, SuscriptoresAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(SuscriptoresActionTypes.EDIT_SUSCRIPTORES)),
    mergeMap((action) => {
      const data = new FormData()
      buildFormData(data, action.payload)
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }

      return from(axios.put(`http://127.0.0.1:4567/api/suscriptores/${action.payload._id}`, data, config)).pipe(
        map((response) => editedSuscriptores(response.data)),
        startWith(editingSuscriptores()),
        catchError(() => of(editingSuscriptoresFailed()))
      )
    })
  )

export default combineEpics(searchSuscriptoresEpic, loadSuscriptoresEpic, addSuscriptoresEpic, removeSuscriptoresEpic, editSuscriptoresEpic)
