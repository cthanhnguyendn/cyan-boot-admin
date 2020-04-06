import {useSelector, useDispatch} from "react-redux";
import {createMetaEntity, getEntity, listEntity, updateMetaEntity} from "../store/meta";
import {useEffect} from "react";

export const useEntity = (entity) => {
    const meta = useSelector(state => state.meta)
    const dispatch = useDispatch()
    const entityInfo = meta.mapEntities[entity]
    const createEntity = data => dispatch(createMetaEntity(entityInfo, data))
    const loadData = (id) => dispatch(getEntity(entityInfo,id))
    const detail = meta[entity] && meta[entity].detail
    const updateEntity = data => dispatch(updateMetaEntity(entityInfo, {...detail,...data}))
    return {meta, entityInfo, createEntity,loadData,detail,updateEntity}
}
export const useListEntity = (entity) => {
    const meta = useSelector(state => state.meta)
    const dispatch = useDispatch()
    const entityInfo = meta.mapEntities[entity]
    const list = (meta[entity] && meta[entity].list && Object.values(meta[entity].list._embedded)[0]) || []
    useEffect(() => {
        entityInfo && dispatch(listEntity(entityInfo))
    }, [entityInfo && entityInfo.path])
    return {list, entityInfo}
}