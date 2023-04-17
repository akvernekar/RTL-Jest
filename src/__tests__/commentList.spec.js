import {render, screen, logRoles, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CommentList from '../components/CommentList';


test('no comments', ()=>{
    render(<CommentList comments={[]} />);
    const noCommentText = screen.getByText('no comments' , { exact: false});
    expect(noCommentText).toBeInTheDocument();
})


test('if comments in list', ()=>{
    const allComments = [{id:1, text:'first'}, {id:2, text:'second'}];
    render(<CommentList comments={allComments} />);
    // logRoles(screen.getByTestId('commentList'));
    // const noCommentText = screen.getByText('no comments' , { exact: false});
    // screen.debug();
    const list = screen.getAllByTestId('commentText');
    expect(list.length).toBe(allComments.length);
})