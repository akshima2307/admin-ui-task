import React from 'react';

const Pagination = ({membersPerPage,totalMembers,paginate}) => {
    const pageNumbers = [];
    for(let i = 1; i <= Math.ceil(totalMembers/membersPerPage); i++){
        pageNumbers.push(i);
    }
    return(
        <nav>
            <ul className='pagination'>
                {pageNumbers.map((number) => (
                    <li key={number} className="page-item">
                        <a onClick={(e) => {paginate(number);}} className='page-link'>{number}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Pagination