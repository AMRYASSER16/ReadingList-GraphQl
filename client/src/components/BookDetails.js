import React from 'react';
import query from '../queries/fetchBook';
import { useQuery } from '@apollo/client';

const BookDetails = ({ bookId }) => {
	const { loading, data } = useQuery(query, {
		variables: { id: bookId }
	});

	return (
		<div id="book-details">
			<h2>Book Details</h2>

			{data ? <div>
				<ul>
					<li>Book name: {data.book.name}</li>
					<li>genre: {data.book.genre}</li>
					<li>author: {data.book.author.name}</li>
					<li>Books: {data.book.author.books.map((b) => <span key={b.id}>{b.name}</span>)}</li>
				</ul>
			</div> : ''}

			{loading ? <div>Loading......!</div> : ''}
		</div>
	);
};

export default BookDetails;
