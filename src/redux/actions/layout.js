let removeToastTimeout
export const toastOptionsAction = (toast) => {
    return (dispatch, getState) => {
        if (removeToastTimeout) {
            clearTimeout(removeToastTimeout)
        }
        const toastState = getState().layout_reducer.toast
        if (toastState.show) {
            dispatch({
                type: 'layout_reducer-toast',
                data: { ...toastState, show: false },
            })
        }

        dispatch({
            type: 'layout_reducer-toast',
            data: { ...toastState, ...toast },
        })
        if (toast.isAutoRemove) {
            removeToastTimeout = setTimeout(() => {
                dispatch({
                    type: 'layout_reducer-toast',
                    data: { ...toastState, ...toast, show: false },
                })
            }, 6000)
        }
    }
}
