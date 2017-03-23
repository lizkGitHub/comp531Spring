export const url = 'https://webdev-dummy.herokuapp.com'

import fetch from 'isomorphic-fetch'
export const resource = (method, endpoint, payload, nonJson) => {
    const options =  {
        method,
        credentials: 'include',
    }
    if (!nonJson) {
        options.headers = {
            'Content-Type': 'application/json'
        }
    }
    if (payload && !nonJson) options.body = JSON.stringify(payload)
    // for form data
    if (payload && nonJson) options.body = payload
    return fetch(`${url}/${endpoint}`, options)
        .then(r => {
            if (r.status === 200) {
                return (r.headers.get('Content-Type').indexOf('json') > 0) ? r.json() : r.text()
            } else {
                throw new Error(r.statusText)
            }
        })
}

export const navigate = (text) => {
    return {
        type: text
    }
}

export default resource