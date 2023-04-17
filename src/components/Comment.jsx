import {useEffect, useState} from 'react'
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import axios from 'axios';

function Comment(){
    const [comments, setComments] = useState([]);

    useEffect(()=>{
        async function getAllComments(){
            try{
                const res = await axios.get('https://jsonplaceholder.typicode.com/comments');
                if(res?.data?.length){
                    const parsedData = res.data.map(i=>({id:i.id, text:(i.body || i.text)}));
                    if(parsedData.length){
                        setComments(parsedData);
                    }
                }
            }catch(error){
                // console.log(error)
            }
        }
       getAllComments()
    }, []);

    return (
        <div>
            <CommentForm setComments={setComments} />
            <CommentList comments={comments}/>
        </div>
    )
}

export default Comment;