import { base_url } from '../../config'
import { toastOptionsAction } from './layout'
const sendSubmitForm = ({ doToken, lang, lat, notes, senderName }) => {
    return new Promise(async (resolve, reject) => {
        var myHeaders = new Headers()
        var urlencoded = new URLSearchParams()
        try {
            urlencoded.append('DOToken', doToken)
            urlencoded.append('Lang', lang)
            urlencoded.append('Lat', lat)
            urlencoded.append('IsAccepted', 'True')
            urlencoded.append('SenderNoteToReciver', notes)
            urlencoded.append('SenderName', senderName)
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: urlencoded,
                redirect: 'follow',
            }
            var response = await fetch(
                `${base_url}/D/ClientResponse`,
                requestOptions
            )
            const responseText = await response.text()
            const body = responseText ? JSON.parse(responseText) : ''
            if (response.status >= 200 && response.status < 300) {
                resolve()
            } else {
                reject(body)
            }
        } catch (error) {
            reject(error)
        }
    })
}

export const submitForm = ({ doToken }) => {
    return (dispatch, getState) => {
        return new Promise(async (resolve, reject) => {
            try {
                const { Lat, Lang } =
                    getState().home_page_reducer.selectedLocation
                const { senderName, notes } = getState().userForm_page_reducer
                dispatch(isLoading(true))
                await sendSubmitForm({
                    doToken,
                    lat: Lat,
                    lang: Lang,
                    senderName,
                    notes,
                })
                dispatch(isLoading(false))
                resolve()
            } catch (error) {
                dispatch(
                    toastOptionsAction({
                        ...getState().layout_reducer.toast,
                        msg:
                            error === 'you are so far from the shop'
                                ? 'أنت بعيد عن المتجر, قم بإختيار مكان أقرب.'
                                : error.toString(),
                        show: true,
                        header: `فشلت العملية`,
                        isWarning: true,
                        isAutoRemove: true,
                    })
                )
                dispatch(isLoading(false))
                reject(error)
            }
        })
    }
}

export const isLoading = (isLoading) => {
    return (dispatch) => {
        dispatch({ type: 'userForm_page-isLoading', data: isLoading })
    }
}

export const setSubmitError = (error) => {
    return (dispatch) => {
        dispatch({ type: 'userForm_page-submitError', data: error })
    }
}
