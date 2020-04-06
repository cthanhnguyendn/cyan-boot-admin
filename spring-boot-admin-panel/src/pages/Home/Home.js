import React from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";


export default () => {
    const meta = useSelector(state => state.meta)
    return (
        <div>
            <h1>Home</h1>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Path</th>
                </tr>
                </thead>
                <tbody>
                {meta.restEndPoints && meta.restEndPoints.map(ep => (<tr>
                    <td><Link to={`/${ep.entityName}`}>{ ep.entityName }</Link></td>
                    <td>{ ep.path }</td>
                </tr>))}
                </tbody>
            </table>

        </div>)
}