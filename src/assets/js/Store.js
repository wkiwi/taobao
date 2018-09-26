export function saveToLocal (id, key, value) {
    let djzk = window.localStorage.__djzk__
    if (!djzk) {
        djzk = {}
        djzk[id] = {}
        djzk[id][key] = value
    } else {
        djzk = JSON.parse(djzk)
        if (!djzk[id]) {
            djzk[id] = {}
        }
    }
    djzk[id][key] = value
    window.localStorage.__djzk__ = JSON.stringify(djzk)
}
export function loadFromLocal (id, key, def) {
    let djzk = window.localStorage.__djzk__
    if (!djzk) {
        return def
    }
    djzk = JSON.parse(djzk)[id]
    if (!djzk) {
        return def
    }
    let ret = djzk[key]
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
        // console.log(djzk[key])
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
