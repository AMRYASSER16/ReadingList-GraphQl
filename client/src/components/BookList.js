import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import query from '../queries/fetchBooks';
import BookDetails from './BookDetails'

const BookList = () => {
	const [ booksList, setBooksList ] = useState([ { title: 'Loading...', id: '000000' } ]);
	const { loading, data } = useQuery(query);
	const [bookId, setBookId] = useState(null)

	useEffect(
		() => {
			if (loading === false) {
				setBooksList(data.books);
			}
		},
		[data, loading]
	);

	return (
		<div>
			<ul id="book-list">{booksList.map(({ id, name }) => <li onClick={() => setBookId(id)} key={id}>{name}</li>)}</ul>
			{bookId ? <BookDetails bookId={bookId} /> : <div>No book selected...</div>}
		</div>
	);
};

export default BookList;
