import React, { useEffect, useState } from "react";


export const FavoritesPage = () => {
    const [favorites, setFavorites] = useState()

    useEffect(() => {
        fetch(localStorage.getItem('backendUrl') + `api/favorites/${localStorage.getItem('userId')}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then((resp) => {
            return resp.json();
        }).then((respJson) => {
            console.log(respJson)
            setFavorites(respJson)
        })
    }, [])

    return (
        <div className="row mx-5">
            {favorites && favorites.map((fav) => (
                <div className="col">
                    <img key={fav.id} src={fav.url}></img>
                </div>
            ))}
        </div>
    )
}