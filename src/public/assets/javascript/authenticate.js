import { DeleteStorage, GetStorage } from "./manege-storage-session.js";


export function isAuthenticate() {
    const userId = GetStorage('user_id')

    if (userId) {
        return true
    } else {
        return false
    }
}


export function auth() {
    const userId = GetStorage('user_id')
    const avatarUrl = GetStorage('avatar_url')
    const email = GetStorage('email')
    const username = GetStorage('username')

    return {
        userId,
        email,
        username,
        avatarUrl,
    }
}


export function singOut() {
    DeleteStorage('user_id')
    DeleteStorage('avatar_url')
    DeleteStorage('email')
    DeleteStorage('username')
}