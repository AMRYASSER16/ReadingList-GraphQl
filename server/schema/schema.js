const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = graphql;

var books = [
	{
		id: '1',
		name: 'book 1',
		genre: 'book number 1',
		authorId: '1'
	},
	{
		id: '2',
		name: 'book 2',
		genre: 'book number 2',
		authorId: '2'
	}
];

var authors = [
	{
		id: '1',
		name: 'author 1',
		age: 24
	},
	{
		id: '2',
		name: 'author 2',
		age: 26
	}
];

const BookType = new GraphQLObjectType({
	name: 'Book',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		genre: { type: GraphQLString },
		author: {
			type: AuthorType,
			resolve(parentValue, args) {
				return _.find(authors, { authorId: parentValue.id });
			}
		}
	})
});

const AuthorType = new GraphQLObjectType({
	name: 'Author',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		age: { type: GraphQLInt },
		books: {
			type: new GraphQLList(BookType),
			resolve(parentValue, args) {
				return _.filter(books, { id: parentValue.id })
			}
		}
	})
});

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		book: {
			type: BookType,
			args: {
				id: { type: GraphQLID }
			},
			resolve(parentValue, args) {
				return _.find(books, { id: args.id });
			}
		},
		author: {
			type: AuthorType,
			args: {
				id: { type: GraphQLID }
			},
			resolve(parentValue, args) {
				return _.find(authors, { id: args.id });
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery
});
