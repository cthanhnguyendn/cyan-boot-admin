import React from 'react'
// import {useSelector} from "react-redux";
import {useParams} from "react-router";
import {Link} from "react-router-dom";
import {useListEntity} from "../../hooks/MetaData";

export default () => {
    // const meta = useSelector(state => state.meta)
    const params = useParams()
    const {list, entityInfo} = useListEntity(params.entity)
    const idFieldName = entityInfo && entityInfo.idFieldName
    return (
        <div>
            <h1>{params.entity}</h1>
            <Link to={`/${params.entity}/create`}>
                add new
            </Link>
            <table>
                <thead>
                <tr>
                    {entityInfo && entityInfo.listFields.map(cl => <th>{cl.name}</th>)}
                    <th>Edit</th>
                </tr>
                </thead>
                <tbody>
                {list.map(item => (<tr>
                    {entityInfo.listFields.map(cl => <td>{item[cl.name]}</td>)}
                    <td><Link to={`/${params.entity}/${item[idFieldName]}`}>edit</Link></td>
                </tr>))}
                </tbody>
            </table>
        </div>
    )
}