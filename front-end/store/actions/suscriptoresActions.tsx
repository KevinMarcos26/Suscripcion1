import { IpaginatedSuscriptores, ISuscriptoresItem } from '../models'

export enum SuscriptoresActionTypes {
  SEARCH_SUSCRIPTORES = 'suscriptores/search',
  SEARCHING_SUSCRIPTORES = 'suscriptores/searching',
  FOUND_SUSCRIPTORES = 'suscriptores/found',
  SEARCHING_SUSCRIPTORES_FAILED = 'suscriptores/searching_failed',

  LOAD_SUSCRIPTORES = 'suscriptores/load',
  LOADING_SUSCRIPTORES = 'suscriptores/loading',
  LOADED_SUSCRIPTORES = 'suscriptores/loaded',
  LOADING_SUSCRIPTORES_FAILED = 'suscriptores/loading_failed',

  ADD_SUSCRIPTORES = 'suscriptores/add',
  ADDING_SUSCRIPTORES = 'suscriptores/adding',
  ADDED_SUSCRIPTORES = 'suscriptores/added',
  ADDING_SUSCRIPTORES_FAILED = 'suscriptores/adding_failed',

  REMOVE_SUSCRIPTOR = 'suscriptores/remove',
  REMOVING_SUSCRIPTOR = 'suscriptores/removing',
  REMOVED_SUSCRIPTOR = 'suscriptores/removed',
  REMOVING_SUSCRIPTOR_FAILED = 'suscriptores/removing_failed',

  EDIT_SUSCRIPTORES = 'suscriptores/edit',
  EDITING_SUSCRIPTORES = 'suscriptores/editing',
  EDITED_SUSCRIPTORES = 'suscriptores/edited',
  EDITING_SUSCRIPTORES_FAILED = 'suscriptores/editing_failed',
}

export function searchSuscriptores(searchOptions: TSearchOptions | string, keep?: boolean): ISearchSuscriptoresAction {
  return {
    type: SuscriptoresActionTypes.SEARCH_SUSCRIPTORES,
    searchOptions: typeof searchOptions === 'string' ? { searchString: searchOptions } : searchOptions,
    keep: keep,
  }
}

export function searchingSuscriptores(): ISearchingSuscriptoresAction {
  return {
    type: SuscriptoresActionTypes.SEARCHING_SUSCRIPTORES,
  }
}

export function foundSuscriptores(suscriptores: IpaginatedSuscriptores, keep?: boolean): IFoundSuscriptoresAction {
  return {
    type: SuscriptoresActionTypes.FOUND_SUSCRIPTORES,
    keep: keep,
    payload: {
      suscriptores,
    },
  }
}

export function searchingSuscriptoresFailed(): ISearchingSuscriptoresFailedAction {
  return {
    type: SuscriptoresActionTypes.SEARCHING_SUSCRIPTORES_FAILED,
  }
}

export function loadSuscriptores(loadOptions: TSearchOptions): ILoadSuscriptoresAction {
  return {
    type: SuscriptoresActionTypes.LOAD_SUSCRIPTORES,
    loadOptions: loadOptions,
  }
}

export function loadingSuscriptores(): ILoadingSuscriptoresAction {
  return {
    type: SuscriptoresActionTypes.LOADING_SUSCRIPTORES,
  }
}

export function loadedSuscriptores(suscriptores: IpaginatedSuscriptores): ILoadedSuscriptoresAction {
  return {
    type: SuscriptoresActionTypes.LOADED_SUSCRIPTORES,
    payload: {
      suscriptores,
    },
  }
}

export function loadingSuscriptoresFailed(): ILoadingSuscriptoresFailedAction {
  return {
    type: SuscriptoresActionTypes.LOADING_SUSCRIPTORES_FAILED,
  }
}

export function addSuscriptores(suscriptor: ISuscriptoresItem): IAddSuscriptoresAction {
  return {
    type: SuscriptoresActionTypes.ADD_SUSCRIPTORES,
    payload: suscriptor,
  }
}

export function addingSuscriptores(): IAddingSuscriptoresAction {
  return {
    type: SuscriptoresActionTypes.ADDING_SUSCRIPTORES,
  }
}

export function addedSuscriptores(suscriptores: IpaginatedSuscriptores): IAddedSuscriptoresAction {
  return {
    type: SuscriptoresActionTypes.ADDED_SUSCRIPTORES,
    payload: {
      suscriptores,
    },
  }
}

export function addingSuscriptoresFailed(errData: { data: { message: string; field?: string }; status: number }): IAddingSuscriptoresFailedAction {
  return {
    type: SuscriptoresActionTypes.ADDING_SUSCRIPTORES_FAILED,
    message: errData.data.message,
    status: errData.status,
    field: errData.data.field,
  }
}

export function removeSuscriptor(suscriptor: ISuscriptoresItem): IRemoveSuscriptorAction {
  return {
    type: SuscriptoresActionTypes.REMOVE_SUSCRIPTOR,
    payload: suscriptor,
  }
}

export function removingSuscriptor(): IRemovingSuscriptorAction {
  return {
    type: SuscriptoresActionTypes.REMOVING_SUSCRIPTOR,
  }
}

export function removedSuscriptor(): IRemovedSuscriptorAction {
  return {
    type: SuscriptoresActionTypes.REMOVED_SUSCRIPTOR,
  }
}

export function removingSuscriptorFailed(): IRemovingSuscriptorFailedAction {
  return {
    type: SuscriptoresActionTypes.REMOVING_SUSCRIPTOR_FAILED,
  }
}

export function editSuscriptores(suscriptor: ISuscriptoresItem): IEditSuscriptoresAction {
  return {
    type: SuscriptoresActionTypes.EDIT_SUSCRIPTORES,
    payload: suscriptor,
  }
}

export function editingSuscriptores(): IEditingSuscriptoresAction {
  return {
    type: SuscriptoresActionTypes.EDITING_SUSCRIPTORES,
  }
}

export function editedSuscriptores(suscriptores: ISuscriptoresItem): IEditedSuscriptoresAction {
  return {
    type: SuscriptoresActionTypes.EDITED_SUSCRIPTORES,
    payload: suscriptores,
  }
}

export function editingSuscriptoresFailed(): IEditingSuscriptoresFailedAction {
  return {
    type: SuscriptoresActionTypes.EDITING_SUSCRIPTORES_FAILED,
  }
}

type TSearchOptions = {
  searchString?: string
  searchField?: string
  page?: number
  limit?: number
  populate?: boolean
  sort?: {
    field: string
    method?: 'asc' | 'desc'
  }
  filters?: { field: string; value: string }[]
}

export interface ISearchSuscriptoresAction {
  type: SuscriptoresActionTypes.SEARCH_SUSCRIPTORES
  searchOptions: TSearchOptions
  keep?: boolean
}

export interface ISearchingSuscriptoresAction {
  type: SuscriptoresActionTypes.SEARCHING_SUSCRIPTORES
}

export interface IFoundSuscriptoresAction {
  type: SuscriptoresActionTypes.FOUND_SUSCRIPTORES
  keep?: boolean
  payload: {
    suscriptores: IpaginatedSuscriptores
  }
}

export interface ISearchingSuscriptoresFailedAction {
  type: SuscriptoresActionTypes.SEARCHING_SUSCRIPTORES_FAILED
}

export interface ILoadSuscriptoresAction {
  type: SuscriptoresActionTypes.LOAD_SUSCRIPTORES
  loadOptions: TSearchOptions
}

export interface ILoadingSuscriptoresAction {
  type: SuscriptoresActionTypes.LOADING_SUSCRIPTORES
}

export interface ILoadedSuscriptoresAction {
  type: SuscriptoresActionTypes.LOADED_SUSCRIPTORES
  payload: {
    suscriptores: IpaginatedSuscriptores
  }
}

export interface ILoadingSuscriptoresFailedAction {
  type: SuscriptoresActionTypes.LOADING_SUSCRIPTORES_FAILED
}

export interface IAddSuscriptoresAction {
  type: SuscriptoresActionTypes.ADD_SUSCRIPTORES
  payload: ISuscriptoresItem
}

export interface IAddingSuscriptoresAction {
  type: SuscriptoresActionTypes.ADDING_SUSCRIPTORES
}

export interface IAddedSuscriptoresAction {
  type: SuscriptoresActionTypes.ADDED_SUSCRIPTORES
  payload: {
    suscriptores: IpaginatedSuscriptores
  }
}

export interface IAddingSuscriptoresFailedAction {
  type: SuscriptoresActionTypes.ADDING_SUSCRIPTORES_FAILED
  message: string
  status: number
  field?: string
}

export interface IRemoveSuscriptorAction {
  type: SuscriptoresActionTypes.REMOVE_SUSCRIPTOR
  payload: ISuscriptoresItem
}

export interface IRemovingSuscriptorAction {
  type: SuscriptoresActionTypes.REMOVING_SUSCRIPTOR
}

export interface IRemovedSuscriptorAction {
  type: SuscriptoresActionTypes.REMOVED_SUSCRIPTOR
}

export interface IRemovingSuscriptorFailedAction {
  type: SuscriptoresActionTypes.REMOVING_SUSCRIPTOR_FAILED
}

export interface IEditSuscriptoresAction {
  type: SuscriptoresActionTypes.EDIT_SUSCRIPTORES
  payload: ISuscriptoresItem
}

export interface IEditingSuscriptoresAction {
  type: SuscriptoresActionTypes.EDITING_SUSCRIPTORES
}

export interface IEditedSuscriptoresAction {
  type: SuscriptoresActionTypes.EDITED_SUSCRIPTORES
  payload: ISuscriptoresItem
}

export interface IEditingSuscriptoresFailedAction {
  type: SuscriptoresActionTypes.EDITING_SUSCRIPTORES_FAILED
}

export type SuscriptoresAction =
  | ISearchSuscriptoresAction
  | ISearchingSuscriptoresAction
  | IFoundSuscriptoresAction
  | ISearchingSuscriptoresFailedAction
  | ILoadSuscriptoresAction
  | ILoadingSuscriptoresAction
  | ILoadedSuscriptoresAction
  | ILoadingSuscriptoresFailedAction
  | IAddSuscriptoresAction
  | IAddingSuscriptoresAction
  | IAddedSuscriptoresAction
  | IAddingSuscriptoresFailedAction
  | IRemoveSuscriptorAction
  | IRemovingSuscriptorAction
  | IRemovedSuscriptorAction
  | IRemovingSuscriptorFailedAction
  | IEditSuscriptoresAction
  | IEditingSuscriptoresAction
  | IEditedSuscriptoresAction
  | IEditingSuscriptoresFailedAction
