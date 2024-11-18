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
            console.log(respJson.tags)
            setTags(respJson.tags)
        })
    }

    const tagCards=(tag)=>{
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
            temp[tag]=respJson.cards
            setCardByTag({...cardByTag,...temp})
        })
    }

    useEffect(()=>{
        allTags();
    },[])

    useEffect(()=>{
        async function fetchtags(){
            console.log(tags)
            for(let tag of tags){
                console.log(tag)
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
            {/* {tags.length!=0 ? tags.forEach((tag)=>{
                return(
                    <>
                        <div className='d-flex mx-auto'>
                            <h4>{tag.tagDescription}</h4>
                            <h6>{tag.tagCount}</h6>
                        </div>
                        <div>
                            {cardByTag!=undefined? cardByTag.card.map((card)=>{
                                return(
                                    <img src={card.url}></img>
                                )
                            }):null}
                        </div>
                    </>
                )
            }):null} */}
        </div>
    </div>
)};
