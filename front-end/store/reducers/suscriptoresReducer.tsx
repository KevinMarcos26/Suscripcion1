import produce from 'immer'
import { SuscriptoresAction, SuscriptoresActionTypes } from '../actions/suscriptoresActions'
import { ApiStatus, ISuscriptoresItem } from '../models'

export const initialSuscriptoresState: ISuscriptoresState = {
  loadingStatus: ApiStatus.NOTLOADED,
  addingStatus: ApiStatus.NOTLOADED,
  searchingStatus: ApiStatus.NOTLOADED,
  searchString: '',
  suscriptores: [],
  foundsuscriptores: [],
  totalDocs: 0,
  errMessage: '',
  errStatus: null,
  errField: null,
}

export default function suscriptoresReducer(state: ISuscriptoresState = initialSuscriptoresState, action: SuscriptoresAction) {
  return produce(state, (draft) => {
    switch (action.type) {
      case SuscriptoresActionTypes.SEARCH_SUSCRIPTORES:
        draft.searchString = action.searchOptions.searchString
        break
      case SuscriptoresActionTypes.SEARCHING_SUSCRIPTORES:
        draft.searchingStatus = ApiStatus.LOADING
        draft.loadingStatus = ApiStatus.NOTLOADED
        draft.addingStatus = ApiStatus.NOTLOADED
        break

      case SuscriptoresActionTypes.SEARCHING_SUSCRIPTORES_FAILED:
        draft.searchingStatus = ApiStatus.FAILED
        break

      case SuscriptoresActionTypes.FOUND_SUSCRIPTORES:
        draft.searchingStatus = ApiStatus.LOADED
        action.keep ? draft.foundsuscriptores.push(...action.payload.suscriptores.docs) : (draft.foundsuscriptores = action.payload.suscriptores.docs)
        draft.totalDocs = action.payload.suscriptores.totalDocs
        break

      case SuscriptoresActionTypes.LOAD_SUSCRIPTORES:
      case SuscriptoresActionTypes.LOADING_SUSCRIPTORES:
        draft.loadingStatus = ApiStatus.LOADING
        draft.addingStatus = ApiStatus.NOTLOADED
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.foundsuscriptores = []
        break

      case SuscriptoresActionTypes.LOADING_SUSCRIPTORES_FAILED:
        draft.loadingStatus = ApiStatus.FAILED
        break

      case SuscriptoresActionTypes.LOADED_SUSCRIPTORES:
        draft.loadingStatus = ApiStatus.LOADED
        draft.suscriptores = action.payload.suscriptores.docs
        draft.totalDocs = action.payload.suscriptores.totalDocs
        break

      case SuscriptoresActionTypes.ADD_SUSCRIPTORES:
      case SuscriptoresActionTypes.ADDING_SUSCRIPTORES:
        draft.addingStatus = ApiStatus.LOADING
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.errMessage = ''
        draft.errStatus = null
        draft.errField = null
        break

      case SuscriptoresActionTypes.ADDING_SUSCRIPTORES_FAILED:
        draft.addingStatus = ApiStatus.FAILED
        draft.errMessage = action.message
        draft.errStatus = action.status
        draft.errField = action.field
        break

      case SuscriptoresActionTypes.ADDED_SUSCRIPTORES:
        draft.addingStatus = ApiStatus.LOADED
        draft.errStatus = 200
        draft.suscriptores.push(action.payload.suscriptores.docs[0])
        if (draft.searchString) draft.foundsuscriptores.push(action.payload.suscriptores.docs[0])
        break

      case SuscriptoresActionTypes.REMOVE_SUSCRIPTOR:
        draft.suscriptores.splice(
          draft.suscriptores.findIndex((suscriptor) => suscriptor._id === action.payload._id),
          1
        )
        break

      case SuscriptoresActionTypes.EDIT_SUSCRIPTORES:
        draft.loadingStatus = ApiStatus.NOTLOADED
        draft.addingStatus = ApiStatus.LOADING
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.suscriptores[draft.suscriptores.findIndex((suscriptor) => suscriptor._id === action.payload._id)] = action.payload
        break

      case SuscriptoresActionTypes.EDITED_SUSCRIPTORES:
        draft.addingStatus = ApiStatus.LOADED
        draft.suscriptores[draft.suscriptores.findIndex((suscriptor) => suscriptor._id === action.payload._id)] = action.payload
        draft.foundsuscriptores[draft.foundsuscriptores.findIndex((suscriptor) => suscriptor._id === action.payload._id)] = action.payload
        break
    }
  })
}

export interface ISuscriptoresState {
  loadingStatus: ApiStatus
  addingStatus: ApiStatus
  searchingStatus: ApiStatus
  searchString: string
  suscriptores: ISuscriptoresItem[]
  foundsuscriptores: ISuscriptoresItem[]
  totalDocs: number
  errMessage?: string
  errStatus?: number
  errField?: string
}
