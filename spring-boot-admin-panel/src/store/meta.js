const META_DATA_UPDATE = 'META_DATA_UPDATE'
export const loadMetaAdminTag = () => (dispatch, getState, {client}) => {
    return client.get('/quick-admin-meta').then(res => {
        const {data} = res
        const {mapEntities} = parseMetadata(data)
        return dispatch({type: META_DATA_UPDATE, payload: {...data, mapEntities}})
    })
}
const parseMetadata = (data) => {
    const mapEntities = data.restEndPoints.reduce((result, ep) => ({...result, [ep.entityName]: ep}), {})
    return {mapEntities}
}
export const createMetaEntity = (entityInfo,data)=> (dispatch, getState, {client}) => {
    const api = `/${entityInfo.path}`
    return client.post(api,data)
}
export const updateMetaEntity = (entityInfo,data)=> (dispatch, getState, {client}) => {
    const api = `/${entityInfo.path}/${data.id}`
    return client.put(api,data)
}
export const listEntity = (entityInfo) => (dispatch, getState, {client}) => {
    return client.get(`/${entityInfo.path}`).then(res => {
        dispatch ({type:META_DATA_UPDATE, payload: {[entityInfo.entityName]:{list:res.data}}})
    })
}
export const getEntity = (entityInfo, id) => (dispatch, getState, {client}) => {
    return client.get(`/${entityInfo.path}/${id}`).then(res => {
        dispatch ({type:META_DATA_UPDATE, payload: {[entityInfo.entityName]:{detail:res.data}}})
    })
}
export default (state = {mapEntities: {}}, action) => {
    switch (action.type) {
        case META_DATA_UPDATE: {
            return {...state, ...action.payload}
        }
        default: {
            return state
        }
    }
}