import React, { useState, useEffect } from 'react';
import query from '../queries/fetchAuthors';
import BookQuery from '../queries/fetchBooks';
import mutation from '../queries/addBookMutation';
import { useQuery, useMutation } from '@apollo/client';

const AddBook = () => {
	const newBookInitialState = {
		name: '',
		genre: '',
		authorId: ''
	};
	const [ newBook, setNewBook ] = useState(newBookInitialState);
	const [ authorsList, setAuthorsList ] = useState([ { title: 'Loading...', id: '000000' } ]);
	const { loading, data } = useQuery(query);
	const [ addBook ] = useMutation(mutation);

	useEffect(
		() => {
			if (loading === false) {
				setAuthorsList(data.authors);
			}
		},
		[ data, loading ]
	);

	const addBookHandler = (e) => {
		e.preventDefault();

		addBook({
			variables: {
				name: newBook.name,
				genre: newBook.genre,
				authorId: newBook.authorId
			},
			refetchQueries: [ { query: BookQuery } ]
		});
	};

	return (
		<form id="add-book" onSubmit={addBookHandler}>
			<div className="field">
				<label>Book name:</label>
				<input
					type="text"
					value={newBook.name}
					onChange={(e) => setNewBook({ ...newBook, name: e.target.value })}
				/>
			</div>
			<div className="field">
				<label>Genre:</label>
				<input
					type="text"
					value={newBook.genre}
					onChange={(e) => setNewBook({ ...newBook, genre: e.target.value })}
				/>
			</div>
			<div className="field">
				<label>Author:</label>
				<select value={newBook.author} onChange={(e) => setNewBook({ ...newBook, authorId: e.target.value })}>
					<option>Select author</option>
					{authorsList.map(({ id, name, age }) => (
						<option value={id} key={id}>
							{name} {age}
						</option>
					))}
				</select>
			</div>

			<button>+</button>
		</form>
	);
};

export default AddBook;