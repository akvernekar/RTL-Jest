/* eslint-disable testing-library/no-unnecessary-act */
import {render, screen, logRoles, fireEvent, act, waitFor, cleanup} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Comment from '../components/Comment';
import mockAxios from 'axios';

beforeEach(()=>{
    mockAxios.get.mockClear();   // before each test mock is cleared
})


it('on submit comments', ()=>{
    render(<Comment />)
    const textBox = screen.getByRole('textbox');
    const submitButton = screen.getByRole('button', {name:'Submit'});

    act(() => { 
    userEvent.type(textBox, 'nice');
    userEvent.click(submitButton);
    });
    const addedComment = screen.getByText('nice');
    expect(addedComment).toBeInTheDocument();
})

test('all comments should be listed', ()=>{
    render(<Comment />);
    const textBox = screen.getByRole('textbox');
    const submitButton = screen.getByRole('button', {name:'Submit'});
    
    act(() => {                             //wrap act if we are updating state value by userEvent to work as await
        userEvent.type(textBox, 'nice'); 
        userEvent.click(submitButton);
    });
    const list = screen.getAllByTestId('commentText');
    expect(list.length).toBe(1);
})

test('when api call is success', async ()=>{
    mockAxios.get.mockResolvedValue({data:[{id:1, text:'first'}, {id:2, text:'second'}]})
    render(<Comment />);
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    
    await waitFor(()=>{
        const list = screen.getAllByTestId('commentText');
        expect(list.length).toBe(2);
        // const list = screen.getByText('first');
        // expect(list).toBeInTheDocument('first');
    }) 
})

test('when api call is failed', async ()=>{
    mockAxios.get.mockReturnValue(Promise.reject({error:'something went wrong'}))
    render(<Comment />);
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    
    await waitFor(()=>{
        const noCommentValue = screen.getByText('no comments' , { exact: false});
        expect(noCommentValue).toBeInTheDocument();
    }) 
})