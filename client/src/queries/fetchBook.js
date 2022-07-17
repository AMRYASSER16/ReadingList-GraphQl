import gql from 'graphql-tag';

export default gql`
	query($id: ID!) {
		book(id: $id) {
			id
			name
			genre
			author {
				id
				name
				age
				books {
					name
					id
				}
			}
		}
	}
`;
