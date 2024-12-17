import React, {useState, useEffect} from "react";


export const GalleryCard=(props)=>{
    const [tempComments, setTempComments] = useState([]);
    const [comment, setComment] = useState('');

    const userId=localStorage.getItem('userId')
    const imageId=props.selectedImage.id
    const type=props.selectedImage.type
    const getCommentsUrl=localStorage.getItem('backendUrl')+`api/comments/${type}/${imageId}`

    const getComments=async ()=>{
        fetch(getCommentsUrl,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+localStorage.getItem('token')
            }
        }).then((response)=>{
            return response.json();
        }).then((respJson)=>{
            const commentsList=respJson.comments;        //the returned list of comment for the passes in card/art ID. Need to place somewhere.
            console.log(commentsList)
            console.log("comments list: ",commentsList)
            setTempComments(commentsList)
        }).catch((e)=>{
            console.log(e)
        })
        return
    }

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleAddComment = async () => {
        async function sendComment() {
            const date=new Date()
            const response= await fetch(localStorage.getItem('backendUrl')+'api/comment',{
                method:'POST',
                body:JSON.stringify({
                    'userId':userId,
                    'imageId':type=='card'?imageId:null,                 //replace with real imageId
                    'artId':type=='art'?imageId:null,                     //replace with real artId
                    'threeId':type=='3d'?imageId:null,
                    'comment':comment,                //Replace with the comment you want to add
                    'uploadDate':date
                }),
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':'Bearer '+localStorage.getItem('token')
                }
            });
            return response;
        };
        // if (comment.trim() === '') {
        //     alert('Please enter a comment!');
        //     return;
        // }

        // setCommentsByImage((prev) => {
        //     const updatedComments = {
        //         ...prev,
        //         [selectedImage.id]: [...(prev[selectedImage.id] || []), comment],
        //     };
        //     return updatedComments;
        // });

        // setComment('');
        await sendComment()
        setComment('')
        await getComments()
        return
    };
    
    const handleCloseModal = () => {
        props.setShowModal(false);
        props.setSelectedImage(null);
    };

    return(
        <div className="modal-content" style={{ minHeight: '70vh' }} onLoad={getComments}>
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                        {props.selectedImage.filename}
                    </h5>
                    <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                </div>
                <div className="modal-body d-flex" style={{ overflowY: 'auto', height: '60vh' }}>

{/* Image Section */}
                    <div className="d-flex justify-content-center align-items-center" style={{ flex: '0 0 60%', paddingRight: '15px' }}>
                        <img
                            src={props.selectedImage.url}
                            alt={props.selectedImage.filename}
                            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                        />
                    </div>

{/* Flex Container for Image and Comment Section */}
                    <div className="d-flex flex-column" style={{ flex: '1', paddingLeft: '15px' }}>
{/* Display caption for art */}
                        {props.selectedImage.caption && <p><strong>Caption:</strong> {props.selectedImage.caption}</p>}

{/* Comments Section */}
                        <div
                            style={{
                                marginTop: '20px',
                                height: '200px',
                                overflowY: 'auto',
                            }}
                        >
                            <h6>Comments:</h6>
                            <div>
                                {tempComments && tempComments.map((comment)=>(
                                    <div key={comment.id}>
                                        <div className="row bg-light my-1 px-1">
                                            <p className="m-0" style={{fontSize:'12px'}}>{comment.username}:</p>
                                            <p className="m-0">{comment.comment}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {/* {commentsByImage[selectedImage.id]?.length > 0 ? (
                                <ul style={{ padding: 0, listStyleType: 'none' }}>
                                    {commentsByImage[selectedImage.id].map((comment, index) => (
                                        <li
                                            key={index}
                                            style={{
                                                wordBreak: 'break-word',
                                                whiteSpace: 'normal',
                                                marginBottom: '10px',
                                                maxWidth: '100%',
                                            }}
                                        >
                                            {comment}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No comments yet.</p>
                            )} */}
                        </div>

{/* Comment Input */}
                        <div className="mb-3" style={{ marginTop: '20px' }}>
                            <textarea
                                onKeyUp={(e)=>{e.key=='Enter'?handleAddComment():null}}
                                className="form-control"
                                value={comment}
                                onChange={handleCommentChange}
                                placeholder="Add a comment"
                                rows="3"
                            />
                        </div>
                        <button className="btn btn-primary" onClick={handleAddComment}>
                            Add Comment
                        </button>
                    </div>
                </div>
            </div>
    )
}