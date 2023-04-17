

function CommentList(props){
    const {comments} = props;

    return (
        <div data-testid='commentList'>
        {comments?.length ? <div>{comments.map(i=>{
            return(
                <p data-testid='commentText' key={i.id}>{i.text}</p>
            )
        })}</div> : 'No comments'}
        </div>
    )
}

export default CommentList;