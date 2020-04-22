import { basePath, apiVersion } from './config';

export function signUpApi(data) {
    const url = `${basePath}/${apiVersion}/sign-up`;

    const params = {
        method: "POST",
        body: JSON.stringify(data),
        header: {
            "Content-Type": "application/json"
        }
    };

    console.log(params.body);

    return fetch(url, params)
        .then(resp => {
            return resp.json();
        }).then(result => {
            if (result.user) {
                return result;
            }
            return result.message;
        }).catch(err => {
            return err.message;
        });
}