import { base_url } from '../../config'

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
                dispatch(setSubmitError(''))
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
                dispatch(isLoading(false))
                dispatch(setSubmitError(error))
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
