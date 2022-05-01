import { combineReducers } from 'redux'
import suscriptoresReducer, { initialSuscriptoresState, ISuscriptoresState } from './suscriptoresReducer'

export interface IState {
  suscriptores: ISuscriptoresState
}

export const initialState: IState = {
  suscriptores: initialSuscriptoresState,
}

export default combineReducers({
  suscriptores: suscriptoresReducer,
})
