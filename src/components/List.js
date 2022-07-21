import React, { useEffect, useState } from 'react';
import { useFetch } from "../hooks/useFetch";
import { Table } from "react-bootstrap";
import Pagination from './Pagination';

const List = () => {
    const {data,perPageData, isPending, error} = useFetch('http://localhost:5000/members')

    const [selectedIDs, setSelectedIDs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [membersPerPage, setMembersPerPage] = useState(10);

    // Get current member
    const indexOfLastMember = currentPage * membersPerPage
    const indexOfFirstMember = indexOfLastMember - membersPerPage
    // Change page
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleDelete = (id) => {
        fetch('http://localhost:5000/members/' + id, {
            method: 'DELETE'
        }).then(() => {
            window.location.reload()
        })
    }


    const handleChange = (e) => {
        const checked = e.target.checked
        const id = e.target.value
        if (checked) {
          setSelectedIDs([...selectedIDs, id])
        } else {
          setSelectedIDs(selectedIDs.filter((id) => id !== id))
        }
    }

    const handleSelectDelete = (ids) => {
        ids.map((id) => handleDelete(id))
    }


    return(
        <div className="list">
            {error && <p className="error">{error}</p>}
            {isPending && <p className="loading">Loading...</p>}
            <div style={{
                "display": "flex",
                "justifyContent": "space-between",
                "width": "80%",
                "margin": "1rem auto"
            }}>
                <span>{selectedIDs.length} members are selected</span>
                <button style={{
                    "background": "rgb(246, 74, 74)",
                    "color": "white",
                    "padding": "0.7rem 1rem",
                    "border": "none",
                    "fontSize": "1rem",
                    "borderRadius": "7px"
                }} onClick={() => handleSelectDelete(selectedIDs)}>Delete selected</button>
            </div>
            <Table striped bordered hover responsive>
                <thead className='table-header'>
                <tr>
                    <th>
                        <input
                            type='checkbox'
                        /></th>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody className='table-body'>
                {data && data.slice(indexOfFirstMember, indexOfLastMember).map((member) => {
                    return (
                        <tr key={member.id}>
                            <td><input
                            type='checkbox'
                            value={member.id}
                            onChange={handleChange}
                            checked={selectedIDs.includes(member.id.toString())}
                        /></td>
                            <td>{member.id}</td>
                            <td>{member.name}</td>
                            <td>{member.email}</td>
                            <td>{member.role}</td>
                            <td><i className="fa fa-pencil-square-o" style={{
                                "color": "#333",
                                "marginRight": "1rem",
                                "fontSize": "1.3rem"
                            }} aria-hidden="true"></i>
                            <i onClick={() => handleDelete(member.id)} class="fa fa-trash" style={{
                                "color": "red",
                                "cursor": "pointer",
                                "fontSize": "1.3rem"
                            }} aria-hidden="true"></i></td>
                        </tr>
                    )
                })}
                </tbody>
            </Table>
            <Pagination membersPerPage={10} totalMembers={data && data.length} paginate={paginate} />
        </div>
    )
}

export default List;