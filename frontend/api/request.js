import superagent from 'superagent';


const EMPTY_OBJ = {};



export function post(url, params, {headers} = EMPTY_OBJ) {
    return new Promise((resolve, reject) => {
        let req = superagent.post(url).send(params);
        if (headers) {
            req = req.set(headers);
        }
        // requestAddDeviceId(req);
        return req.end((err, res) => {
            if (err || !res.ok) {
                reject(err || res);
            } else {
                resolve(res.body || res.text);
            }
        });
    });
}


export function get(url, query, {headers} = EMPTY_OBJ) {
    return new Promise((resolve, reject) => {
        let req = superagent.get(url).query(query);
        if (headers) {
            req = req.set(headers);
        }
        // requestAddDeviceId(req);
        return req.end((err, res) => {
            if (err || !res.ok) {
                reject(err || res);
            } else {
                resolve(res.body || res.text);
            }
        });
    });
}


export function headersAddBearerToken(token, headers) {
    if (!token) {
        return headers;
    }
    return {
        ...(headers || EMPTY_OBJ),
        Authorization: `Bearer ${token}`
    };
}

// FIXME: тут не должно быть прикладной логики.
// Настройки запросов для каждого API должны жить в собственных модулях
function requestAddDeviceId(req) {
    if (!req.url.startsWith("sdf")) {
        return;
    }
    let deviceId = localStorage.getItem('device-id');
    if (!deviceId) {
        deviceId = guid();
        localStorage.setItem('device-id', deviceId);
    }
    req.set('Device-Id', deviceId);
}


function guid() {
    // https://gist.github.com/LeverOne/1308368
    return function(a,b){for(b=a='';a++<36;b+=a*51&52?(a^15?8^Math.random()*(a^20?16:4):4).toString(16):'-');return b}(); // eslint-disable-line
}
