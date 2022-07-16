import React, { useState, useEffect } from 'react';
import query from '../queries/fetchAuthors';
import { useQuery } from '@apollo/client';

const AddBook = () => {
	const [ authorsList, setAuthorsList ] = useState([ { title: 'Loading...', id: '000000' } ]);
    const { loading, error, data } = useQuery(query);
    
    useEffect(() => {
        if(loading === false) { 
            setAuthorsList(data.authors);
        }
    }, [data])

	return <form id="add-book">
        <div className='field'>
            <label>Book name:</label>
            <input type='text' />
        </div>
        <div className='field'>
            <label>Genre:</label>
            <input type='text' />
        </div>
        <div className='field'>
            <label>Author:</label>
            <select>
                <option>Select author</option>
                {authorsList.map(({ id, name, age }) => (
                    <option key={id}>{name} {age}</option>
                ))}
            </select>
        </div>
    </form>;
};

export default AddBook;