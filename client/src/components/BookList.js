import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import query from '../queries/fetchBooks';

const BookList = () => {
	const [ booksList, setBooksList ] = useState([ { title: 'Loading...', id: '000000' } ]);
	const { loading, error, data } = useQuery(query);

	useEffect(
		() => {
			if (loading === false) {
				setBooksList(data.books);
			}
		},
		[data]
	);

	return (
		<div>
			<ul id="book-list">{booksList.map(({ id, name }) => <li key={id}>{name}</li>)}</ul>
		</div>
	);
};

export default BookList;
