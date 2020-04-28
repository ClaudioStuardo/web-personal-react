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