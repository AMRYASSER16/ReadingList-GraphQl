import React, { useState, useEffect } from 'react';
import query from '../queries/fetchBook';
import { useQuery } from '@apollo/client';

const BookDetails = ({ bookId }) => {
	const [ book, setBook ] = useState([ { title: 'Loading...', id: '000000' } ]);
	const { loading, data } = useQuery(query, {
		variables: { id: bookId }
    });
    
	useEffect(
		() => {
			if (loading === false) {
				setBook(data.book);
			}
		},
		[data, loading]
	);

	return (
		<div>
			<h2>Book Detail</h2>
			<ul>
				<li>{book.name}</li>
				<li>{book.genre}</li>
				<li>{book.author.name}</li>
				{book.author.books.map((b) => <span key={b.id}>{b.name}</span>)}
			</ul>
		</div>
	);
};

export default BookDetails;