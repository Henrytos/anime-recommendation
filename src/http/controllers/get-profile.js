import { getUser } from "../../models/user-model.js"

export async function getProfile(request, response) {
    console.log("get profile")
    await getUser({
        id: 1
    })
    return response.json()
}