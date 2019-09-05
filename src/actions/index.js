import streams from '../apis/streams';
import history from '../history';
import {
    SIGN_IN,
    SIGN_OUT, 
    CREATE_STREAM, 
    FETCH_STREAM, 
    FETCH_STREAMS,
    EDIT_STREAM,
    DELETE_STREAM
} from './types';

export const signIn=(userId)=>{
    return{
        type:SIGN_IN,
        payload:userId
    };
};

export const signOut=()=>{
    return{
        type: SIGN_OUT
    };
};

export const createStream=(formValues)=>async (dispatch, getState)=>{
    const {userId}=getState().auth;
    const response=await streams.post('/streams', {...formValues, userId}); //primer argumento es para saber a donde hacer la solicitud
    dispatch({type: CREATE_STREAM, payload: response.data});//.data devuelve solo la informacion que necesitamos de la solicitud
    //aqui se debe de hacer un codigo para llevar alusuaio de vuelta a la pagina principal
    //despues de que el API haya mandado una respuesta
    history.push('/');//codigo para llevar al usuario a la pagia principal(es este)

};

export const fetchStreams=()=>async dispatch=>{
    const response = await streams.get('/streams');
    dispatch({type: FETCH_STREAMS, payload:response.data});
};

export const fetchStream = (id)=>async dispatch=>{
    const response = await streams.get(`/streams/${id}`);
    dispatch({type: FETCH_STREAM, payload: response.data});
};

export const editStream =(id, formValues)=>async dispatch=>{
    const response = await streams.patch(`/streams/${id}`, formValues);//patch no reemplaza toda la informacion
                                                                      //solo la informacion editada
    dispatch({type:EDIT_STREAM, payload:response.data});
    history.push('/');
};

export const deleteStream=(id)=>async dispatch=>{
    await streams.delete(`/streams/${id}`);
    dispatch({type:DELETE_STREAM, payload:id});
    history.push('/');
};