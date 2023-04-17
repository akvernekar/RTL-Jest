import { useState } from "react";

function CommentForm(props){
    const {setComments} = props;
    const [text, setText] = useState('');

    const handleClick = () =>{
        setComments(p=>[...p, {id:Date.now(), text}]);
        setText('')
    }

    return (
        <div data-testid='commentForm'>
            <textarea value={text} onChange={(e)=>setText(e.target.value)} />
            <button disabled={!text} onClick={handleClick}>Submit</button>
        </div>
    )
}

export default CommentForm;