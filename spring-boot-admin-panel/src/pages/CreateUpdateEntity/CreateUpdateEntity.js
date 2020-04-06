import React, {useEffect} from 'react'
import {useHistory, useParams} from "react-router";
import {useForm} from 'react-hook-form'
import {useEntity} from "../../hooks/MetaData";

export default () => {
    const params = useParams()
    const history = useHistory()
    const {entityInfo, createEntity, updateEntity, loadData, detail} = useEntity(params.entity)
    const {register, handleSubmit, watch, errors, setValue} = useForm({defaultValues: detail})
    const onSubmit = data => {
        if (params.id) {
            updateEntity(data).then(() => {
                history.push(`/${params.entity}`)
            })
        } else {
            createEntity(data).then(() => {
                history.push(`/${params.entity}`)
            })
        }

    }
    useEffect(() => {
        detail && entityInfo && entityInfo.listFields.forEach(f => {
            setValue(f.name, detail[f.name])
        })
    }, [entityInfo, detail])
    if (params.id) {
        useEffect(() => {
            entityInfo && loadData(params.id)
        }, [entityInfo])
    }
    return (
        <div>
            <h1>Create</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                {params.id && entityInfo && <div className="d-flex">{entityInfo.idFieldName}: {params.id}</div>}
                {entityInfo && <div>{entityInfo.listFields.map(f => (<div className="d-flex">
                    <label>{f.name}</label>
                    <QInput field={f} register={register({required: true})} error={errors && errors[f.name]}/>
                </div>))}</div>}
                <button>submit</button>
            </form>
        </div>
    )
}
const inputDict = {
    'java.lang.String': ({register, name}) => <input name={name} ref={register}/>
}
const QInput = ({field, register, error, ...rest}) => {
    const FieldInput = inputDict[field.type]
    console.log(error)
    return (
        <div>
            {FieldInput ? <FieldInput name={field.name} register={register}/> :
                <div>un supported input type {field.type}</div>}
            {error && <span>error</span>}
        </div>

    )
}