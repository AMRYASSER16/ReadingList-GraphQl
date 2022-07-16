const graphql = require('graphql');
const _ = require('lodash');
const Book = require('../models/book');
const Author = require('../models/author');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = graphql;

const BookType = new GraphQLObjectType({
	name: 'Book',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		genre: { type: GraphQLString },
		author: {
			type: AuthorType,
			resolve(parentValue, args) {
				// return _.find(authors, { authorId: parentValue.id });
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
				// return _.filter(books, { id: parentValue.id });
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
				// return _.find(books, { id: args.id });
			}
		},
		author: {
			type: AuthorType,
			args: {
				id: { type: GraphQLID }
			},
			resolve(parentValue, args) {
				// return _.find(authors, { id: args.id });
			}
		},
		books: {
			type: new GraphQLList(BookType),
			resolve(parentValue, args) {
				// return books;
			}
		},
		authors: {
			type: new GraphQLList(AuthorType),
			resolve(parentValue, args) {
				// return authors;
			}
		}
	}
});

const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addAuthor: {
			type: AuthorType,
			args: {
				name: { type: GraphQLString },
				age: { type: GraphQLInt }
			},
			resolve(parentValue, args) {
				let author = new Author({
					name: args.name,
					age: args.age
				});
				return author.save();
			}
		},
		addBook: {
			type: BookType,
			args: {
				name: { type: GraphQLString },
				genre: { type: GraphQLString },
				authorId: { type: GraphQLID }
			},
			resolve(parentValue, args) {
				let book = new Book({
					name: args.name,
					genre: args.genre,
					authorId: args.authorId
				});
				return book.save();
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation
});