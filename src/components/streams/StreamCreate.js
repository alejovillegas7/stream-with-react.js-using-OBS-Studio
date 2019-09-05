import React from 'react';
import {createStream} from '../../actions';
import { connect } from 'react-redux';
import StreamForm from './StreamForm';

class StreamCreate extends React.Component{
    onSubmit=(formValues)=>{ //formProps SON LA PROPIEDADESDE LOS FIELD
        this.props.createStream(formValues);
    };

    render(){
        return(
            <div>
                <h3>Ceate a Stream</h3>
                <StreamForm onSubmit={this.onSubmit}/>
            </div>
        );
    };
}

export default connect(null, {createStream})(StreamCreate);