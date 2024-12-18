import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { CardView } from "../component/cardView";
import { Context } from "../store/appContext";

export const TagViewer = () => {
    const { store, actions } = useContext(Context)
    const [cardList, setCardList] = useState([])

    const params = useParams()
    const tagDescription = params.tag

    useEffect(() => {
        async function tagCards(tag) {
            fetch(localStorage.getItem('backendUrl') + 'api/cardbytag', {
                method: 'POST',
                body: JSON.stringify({
                    'tag': tag
                }),
                headers: { 'Content-Type': 'application/json' }
            }).then((response) => {
                return response.json();
            }).then((respJson) => {
                setCardList(respJson)
                // console.log(cardByTag)
            })
        }
        async function init() {
            await tagCards(tagDescription);
            setCardList(store.tagsView);
        }
        if (store.tagsView && store.tagsView.length > 0) {
            init();
        }
        tagCards(tagDescription);
    }, [store.tagsView])

    useEffect(() => {
        console.log(store.tagsView)
    }, [store.tagsView])


    return (
        <div>
            <h3>{tagDescription}</h3>
            <div className='row justify-content-start'>
                {cardList.length > 0 && cardList.map((card) => {
                    return (
                        <CardView card={card} />
                    )
                })
                }
            </div>
        </div>
    )
}