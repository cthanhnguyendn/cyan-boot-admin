import axios from 'axios'

const instance = axios.create({
    baseURL: process.env.REACT_APP_ROOT_API_DOMAIN
})

const client = {
    get: instance.get,
    post: instance.post,
    put: instance.put
}
export default client