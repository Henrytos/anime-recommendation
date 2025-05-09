
export function SetStorage(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value))
}

export function GetStorage(key) {
    console.log(key)
    const valueInStorage = sessionStorage.getItem(key)
    if (!valueInStorage) {
        return null
    }

    const value = JSON.parse(valueInStorage)
    return value
}

export function DeleteStorage(key) {
    sessionStorage.removeItem(key)
}