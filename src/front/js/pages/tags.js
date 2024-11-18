import React, { useEffect, useState } from 'react';

export const Tags = () => {
    const [tags,setTags]=useState([])
    const [cardByTag,setCardByTag]=useState({})

    const allTags=()=>{
        fetch(localStorage.getItem('backendUrl')+'api/tags',{
            method:'GET',
            headers: {'Content-Type': 'application/json'}
        }).then((response)=>{
            return response.json();
        }).then((respJson)=>{
            // console.log(respJson.tags)
            setTags(respJson.tags)
        })
    }

    const tagCards=async(tag)=>{
        fetch(localStorage.getItem('backendUrl')+'api/cardbytag',{
            method:'POST',
            body:JSON.stringify({
                'tag':tag
            }),
            headers: {'Content-Type': 'application/json'}
        }).then((response)=>{
            return response.json();
        }).then((respJson)=>{
            const temp={}
            temp[tag]=respJson
            setCardByTag((prevState) => ({
                ...prevState,
                [tag]: respJson,
            }));
            // console.log(cardByTag)
        })
    }

    useEffect(()=>{
        allTags();
    },[])

    useEffect(()=>{
        async function fetchtags(){
            // console.log(tags)
            for(let tag of tags){
                // console.log(tag)
                await tagCards(tag.tagDescription)
            }
        };
        fetchtags();
    },[tags])

    useEffect(()=>{
        console.log(cardByTag)
    },[cardByTag])

    return(
    <div>
        <h1 className="text-center">Tags</h1>
        <div>
            <div>
                {cardByTag!=undefined? Object.entries(cardByTag).map(([prop,cardList])=>{
                    return(
                        <>
                            <h3>{prop}</h3>
                            <div>
                            {cardList.map((card)=>{
                                return(
                                    <>
                                        <img width={200} height={282} src={card.url}></img>
                                    </>
                                )
                                })
                            }
                            </div>
                        </>
                    )
                }):null}
            </div>
        </div>
    </div>
)};
