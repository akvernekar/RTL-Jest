/* eslint-disable testing-library/no-unnecessary-act */
import {render, screen, act} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CommentForm from "../components/CommentForm";

// getByRole throws error if element not found
// queryByRole will not throws error if element not found
// findByRole throws error if element not found mainly used for async

test('initial', ()=>{
    render(<CommentForm />);
    // logRoles(screen.getByTestId('comments'));
    const inputBlock = screen.getByRole('textbox');
    expect(inputBlock).toBeInTheDocument();
    const submitButton = screen.getByRole('button', {name:'Submit'});
    expect(submitButton).toBeInTheDocument();
})

test('when form is filled', ()=>{
    render(<CommentForm />);
    // logRoles(screen.getByTestId('commentForm'));
    const inputBlock = screen.getByRole('textbox');
    const submitButton = screen.getByRole('button', {name:'Submit'});
    expect(submitButton).toBeDisabled();

    // fireEvent.change(inputBlock, {target:{value:'any text'}});    // can be used fireevent or userevent
    act(()=>{
        userEvent.type(inputBlock, 'text');
    })
    expect(submitButton).toBeEnabled(); 
})