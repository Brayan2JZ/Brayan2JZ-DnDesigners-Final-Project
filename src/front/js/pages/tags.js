import React, { useEffect, useState, useContext } from 'react';
import { CardView } from '../component/cardView';
import { Context } from '../store/appContext';
import { Link } from 'react-router-dom';

export const Tags = () => {
    const {store,actions}=useContext(Context)
    const [tags,setTags]=useState([])

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

    useEffect(()=>{
        allTags();
    },[])

    // useEffect(()=>{
    //     console.log(cardByTag)
    // },[cardByTag])

    return(
    <div>
        <h1 className="text-center">Tags</h1>
        <div>
            <div className='row'>
                {tags.length>0? tags.map((tag)=>{
                    return(
                        tag.tagDescription.length<3?null:
                        <div key={tag.id} className='col'>
                            <Link to={`/displaytags/${tag.tagDescription}`}>
                                <button>{tag.tagDescription}</button>
                            </Link>
                        </div>
                    )
                }):null}
            </div>
        </div>
    </div>
)};
