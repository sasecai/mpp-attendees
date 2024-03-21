import { fireEvent, queryByText, render, screen } from '@testing-library/react';
import App from './App';

test('testing add', () => {
  render(<App />);
  const addButton = screen.getByText(/Add an attendee manually/i);
  expect(addButton).toBeInTheDocument();

  fireEvent.click(addButton);
  const nameInput = screen.getByPlaceholderText('Name');
  fireEvent.change(nameInput, {target: {value: 'Cristi'}});

  const emailInput = screen.getByPlaceholderText('Email');
  fireEvent.change(emailInput, {target: {value: 'cristi2003@yahoo.com'}});

  const phoneInput = screen.getByPlaceholderText('Phone');
  fireEvent.change(phoneInput, {target: {value: '0723674927'}});

  const addButtonModal = screen.getByText('Add attendee');
  fireEvent.click(addButtonModal);

  expect(screen.getByText('Cristi')).toBeInTheDocument;
  expect(screen.getByText('cristi2003@yahoo.com')).toBeInTheDocument;
  expect(screen.getByText('0723674927')).toBeInTheDocument;
});

test('testing delete', () => {
  render(<App/>)
  expect(screen.queryByText('No attendees have registered yet')).not.toBeInTheDocument();
  var deleteButtonTestId = screen.getByTestId('delete-button-1');
  expect(deleteButtonTestId).toBeInTheDocument();
  fireEvent.click(deleteButtonTestId);

  expect(screen.queryByText('Vlad')).not.toBeInTheDocument();

  deleteButtonTestId = screen.getByTestId('delete-button-0');
  fireEvent.click(deleteButtonTestId);
  deleteButtonTestId = screen.getByTestId('delete-button-0');
  fireEvent.click(deleteButtonTestId);
  expect(screen.queryByText('No attendees have registered yet')).toBeInTheDocument();
});

test('testing update', () => {
  render(<App/>);

  expect(screen.queryByText('Update attendee')).not.toBeInTheDocument();

  const updateButtonTestId = screen.getByTestId('update-button-0');
  expect(updateButtonTestId).toBeInTheDocument();
  fireEvent.click(updateButtonTestId);

  expect(screen.queryByText('Update attendee')).toBeInTheDocument();

  const nameInput = screen.getByPlaceholderText('Name');
  expect(nameInput.value).toEqual('Razvan');
  fireEvent.change(nameInput, {target:{value:'Paula'}});
  expect(nameInput.value).toEqual('Paula');
  
  const emailInput = screen.getByPlaceholderText('Email');
  expect(emailInput.value).toEqual('uzumrazvanviorel@gmail.com');
  fireEvent.change(emailInput, {target:{value:'paulapop@gmail.com'}});

  const phoneInput = screen.getByPlaceholderText('Phone');
  expect(phoneInput.value).toEqual('+40734393899');
  fireEvent.change(phoneInput, {target:{value:'0738476273'}});

  const updateButtonModal = screen.getByText('Update attendee');
  fireEvent.click(updateButtonModal);
  
  expect(screen.getByText('Paula')).toBeInTheDocument();
  expect(screen.getByText('paulapop@gmail.com')).toBeInTheDocument();
  expect(screen.getByText('0738476273')).toBeInTheDocument();
});

test('test search', () => {
  render(<App></App>);
  expect(screen.queryByText('Vlad')).toBeInTheDocument();
  const searchInput = screen.getByPlaceholderText('Search here for a specific person');
  expect(searchInput).toBeInTheDocument();

  fireEvent.change(searchInput, {target:{value: 'Razvan'}});
  expect(screen.queryByText('Vlad')).not.toBeInTheDocument();
});

test('test pagination', () => {
  render(<App></App>);
    var addButton, nameInput, emailInput, phoneInput, addButtonModal
    
    expect(screen.queryByText('Vlad')).toBeInTheDocument();

    for(let i = 1; i <= 8; i ++) {
     addButton = screen.getByText(/Add an attendee manually/i);
    fireEvent.click(addButton);
     nameInput = screen.getByPlaceholderText('Name');
    fireEvent.change(nameInput, {target: {value: 'Cristi'}});
     emailInput = screen.getByPlaceholderText('Email');
    fireEvent.change(emailInput, {target: {value: 'cristi2003@yahoo.com'}});
     phoneInput = screen.getByPlaceholderText('Phone');
    fireEvent.change(phoneInput, {target: {value: '0723674927'}});
     addButtonModal = screen.getByText('Add attendee');
    fireEvent.click(addButtonModal);
    }
    
    const pageThreeButton = screen.getByTestId('page-button-3');
    expect(pageThreeButton).toBeInTheDocument();
    fireEvent.click(pageThreeButton);
    expect(screen.queryByText('Vlad')).not.toBeInTheDocument();
    expect(screen.queryByText('Cristi')).toBeInTheDocument();
})