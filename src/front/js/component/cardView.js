import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";


export const CardView=(props)=>{
    const card=props.card;
    const [favorite,setFavorite]=useState(false);
    const { store, actions } = useContext(Context);

    useEffect(()=>{
        const isFavorite=()=>{
            fetch(localStorage.getItem('backendUrl')+`api/favorite/${localStorage.getItem('userId')}/${card.id}`,{
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':'Bearer '+localStorage.getItem('token')
                }
            }).then((response)=>{
                console.log(response)
                return response.json();
            }).then((respJson)=>{
                console.log(`in front fetch get ${respJson}`)
                if(respJson.status=='Found'){
                    setFavorite(true);
                }
                else{
                    setFavorite(false);
                }
            })
            return
        }
        isFavorite();
    },[store.favUpdate])

    const toggleFavorite=()=>{
        let method='';
        if(favorite){
            method='DELETE';
            setFavorite(false);
        }
        else{
            method='POST';
            setFavorite(true);
        }
        fetch(localStorage.getItem('backendUrl')+'api/favorite',{
            method:method,
            body:JSON.stringify({
                'userId':localStorage.getItem('userId'),
                'imageId':card.id
            }),
            headers:{
                'Content-Type':'application/json',
                'Authorization': 'Bearer '+localStorage.getItem('token')
            }}).then((response)=>{
                return response.json();
            }).then((respJson)=>{
                console.log(respJson.id)
            })
            actions.setFavUpdate()
        }

    return(
        <div key={card.filename} id={card.id} className='col mx-2'>
            <a href='/#'>
                <img width={200} height={282} src={card.url}></img>
            </a>
            <button onClick={toggleFavorite} style={{color:favorite?'red':'black'}} className="row ms-1">heart</button>
        </div>
    )
}