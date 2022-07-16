import React, { useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';

const GET_BOOKS = gql`
	{
		books {
			id
			name
		}
	}
`;

const BookList = () => {
	const { loading, error, data } = useQuery(GET_BOOKS);

	useEffect(
		() => {
			if (loading === false) {
				console.log(data);
			}
		},
		[ loading ]
	);

	return (
		<div>
			<ul id="book-list">
				<li>Book name</li>
			</ul>
		</div>
	);
};

export default BookList;