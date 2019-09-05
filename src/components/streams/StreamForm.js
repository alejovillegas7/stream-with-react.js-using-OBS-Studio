import React from 'react';
import {Field, reduxForm} from 'redux-form';

class StreamForm extends React.Component{
    renderError({error, touched}){
        if(touched && error){
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        };
    };

    renderInput=({input, label, meta})=>{//los argumentos son los props de los field abajo (menos meta)
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off"/>
                {this.renderError(meta)} 
            </div>  
        );
    };

    onSubmit=(formValues)=>{ //formProps SON LA PROPIEDADESDE LOS FIELD
        this.props.onSubmit(formValues);
    };

    render(){
        return(
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                <Field name="title" component={this.renderInput} label="enter title"/> 
                <Field name="description" component={this.renderInput} label="enter description"/>
                <button className="ui button primary">Submit</button> 
            </form>
        );
    };
}

const validate = (formValues) =>{
    const errors={};
    if(!formValues.title){
        errors.title='Se debe ingresar un titulo';
    };

    if(!formValues.description){
        errors.description='Se debe ingresar una descripcion';
    };

    return errors;
    
};
 
export default reduxForm({
    form: 'streamForm',
    validate: validate
})(StreamForm);
