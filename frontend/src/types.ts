import { Dispatch } from 'react';
import { Action } from 'redux';


export type ReduxThunk<T = any> = (data: T) => (dispatch: Dispatch<Action>) => Promise<any>;
export type ReduxAction<PAYLOAD = any> = (data: PAYLOAD) => ({ type: string, payload?: PAYLOAD });
