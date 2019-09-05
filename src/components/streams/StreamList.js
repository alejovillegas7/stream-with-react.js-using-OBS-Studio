import React from 'react';
import {connect} from 'react-redux';
import {fetchStreams} from '../../actions';
import {Link} from 'react-router-dom';

class StreamList extends React.Component{
    componentDidMount(){
        this.props.fetchStreams();
    };

    renderAdmin(stream){//se encarga de mostrar los botones de eliminar y editar en caso de que elusuario haya creado un stream propio de el
        if(stream.userId===this.props.currentUserId){
            return (
                <div className="right floated content">
                    <Link to = {`/streams/edit/${stream.id}`} className="ui button primary">
                        EDIT
                    </Link>
                    <Link to={`/streams/delete/${stream.id}`} className="ui button negative">
                        DELETE
                    </Link>
                </div>
            );
        };
    };

    renderList(){
        return this.props.streams.map(stream=>{
            return(
                <div className="item" key={stream.id}>
                    {this.renderAdmin(stream)}
                    <i className="large middle aligned icon camera"/>
                    <div className="content">
                        <Link to={`/streams/${stream.id}`} className="header">
                            {stream.title}
                        </Link>
                        <div className="description">{stream.description}</div>
                    </div>
                </div>
            );
        });
    };

    renderCreate(stream){
        if(this.props.isSignedIn){
            return(//el style en el div es para que el boton aparezca al lado derecho de la pantalla
                <div style={{textAlign:'right'}}>
                    <Link to="/streams/new" className="ui button primary">CREATE STREAM</Link>
                </div>
            );
        }
    };

    render(){
        return(
            <div>
                <h2>Streams</h2>
                <div className="ui celled list">
                    {this.renderList()}
                    {this.renderCreate()}
                </div>
            </div>
        );
    };
};

const mapStateToProps=(state)=>{ //para hacer la lista de streams disponibles
    return {
        streams: Object.values(state.streams),
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    }; // Object.values es un metodo que toma un objeto en 
        //su argumento y todos los elementos los metera a un 
        //arreglo
};

export default connect(mapStateToProps, {fetchStreams})(StreamList);