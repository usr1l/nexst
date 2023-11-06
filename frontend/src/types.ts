import { Dispatch } from 'react';
import { Action } from 'redux';

export type ReduxThunk<T = any> = (data: T) => (dispatch: Dispatch<Action>) => Promise<React.Dispatch<Action<any>> | void>;
export type ReduxAction<PAYLOAD = any> = (data: PAYLOAD) => ({ type: string, payload?: PAYLOAD });
// export type ErrorMsg = { "errMsg": any };
