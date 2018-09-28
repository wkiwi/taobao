export function saveToLocal (id, key, value) {
    let djzk = window.localStorage.__djzk__
    if (!djzk) {
        djzk = {}
        djzk[key] = {}
        djzk[key][id] = value
    } else {
        djzk = JSON.parse(djzk)
        if (!djzk[key]) {
            djzk[key] = {}
        }
    }
    djzk[key][id] = value
    window.localStorage.__djzk__ = JSON.stringify(djzk)
}
export function deleteToLocal (id, key, def) {
    let djzk = window.localStorage.__djzk__
    if (!djzk) {
        return def
    }
    djzk = JSON.parse(djzk)
    if (!djzk[key]) {
        return def
    }
    let obj = {}
    for (let k in djzk[key]) {
        if (id !== k) {
            obj[k] = djzk[key][k]
        }
    }
    djzk[key] = obj
    window.localStorage.__djzk__ = JSON.stringify(djzk)
}
export function loadFromLocal (id, key, def) {
    let djzk = window.localStorage.__djzk__
    if (!djzk) {
        return def
    }
    djzk = JSON.parse(djzk)[key]
    if (!djzk) {
        return def
    }
    let ret
    if (id) {
        ret = djzk[id]
    } else {
        ret = djzk
    }
    return ret || def
}

export function saveKeyToLocal (key, value) {
    let djzk = window.localStorage.__djzk__
    if (!djzk) {
        djzk = {}
        djzk[key] = []
        djzk[key] = [value]
    } else {
        djzk = JSON.parse(djzk)
        if (!djzk[key]) {
            djzk[key] = []
        }
        if (djzk[key].indexOf(value) === -1) {
            if (djzk[key].length > 19) {
                djzk[key].pop()
            }
            djzk[key].unshift(value)
        } else {
            return 
        }
    }
    window.localStorage.__djzk__ = JSON.stringify(djzk)
}

export function loadKeyFromLocal (key, def) {
    let djzk = window.localStorage.__djzk__
    if (!djzk) {
        return def
    }
    djzk = JSON.parse(djzk)[key]
    if (!djzk) {
        return def
    }
    let ret = djzk
    return ret || def
}
export function clearKeyToLocal (key, def) {
    let djzk = window.localStorage.__djzk__
    if (!djzk) {
        djzk = {}
        djzk[key] = []
        return def
    }
    djzk = JSON.parse(djzk)
    djzk[key] = []
    window.localStorage.__djzk__ = JSON.stringify(djzk)
}
