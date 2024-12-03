import React, { useEffect, useState } from "react";


export const FavoritesPage=()=>{
    const [favorites,setFavorites]=useState()

    useEffect(()=>{
        fetch(localStorage.getItem('backendUrl')+`api/favorites/${localStorage.getItem('userId')}`,{
            method:'GET',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+localStorage.getItem('token')
            }
        }).then((resp)=>{
            return resp.json();
        }).then((respJson)=>{
            console.log(respJson)
            setFavorites(respJson)
        })
    },[])

    return(
        <div>
            {favorites && favorites.map((fav)=>(
                <img key={fav.id} src={fav.url}></img>
            ))}
        </div>
    )
}