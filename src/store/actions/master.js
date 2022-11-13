export const SET_MASTER = 'SET_MASTER';
export const CLEAR_MASTER = 'CLEAR_MASTER';

export const setMaster = (master) => {
    return async (dispatch) => {
        await dispatch({
            type: SET_MASTER,
            master: master
        })
    }
}

export const clearMaster = () => {
    return async (dispatch) => {
        await dispatch({
            type: CLEAR_MASTER
        })
    }
}