import { basePath, apiVersion } from './config';

export function getMenuApi() {
    const url = `${basePath}/${apiVersion}/get-menus`;
    
    return fetch(url).then(resp => {
        return resp.json();
    }).then(result => {
        return result;
    }).catch(err => {
        return err.message;
    });
}

export function updateMenuApi(token, menuId, data) {
    const url = `${basePath}/${apiVersion}/update-menu/${menuId}`;

    const params = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },
        body: JSON.stringify(data)
    }

    return fetch(url, params).then(resp => {
        return resp.json();
    }).then(result => {
        return result.message;
    }).catch(err => {
        return err.message;
    })
}