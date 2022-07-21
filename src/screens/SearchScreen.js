import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { Table } from "react-bootstrap";


const SearchScreen = () => {
  const queryString = useLocation().search;
  const queryParams = new URLSearchParams(queryString);
  const query = queryParams.get("q");

  const url = "http://localhost:5000/members?q=" + query;
  const { error, isPending, data } = useFetch(url);


  return (
    <div >
      <Link to='/' style={{
        "color": "#333",
        "display": "block",
        "width": "80%",
        "textAlign": "left",
        "margin": "1rem auto"
      }} ><i class="fa fa-arrow-left" aria-hidden="true"></i> Go Back</Link>
      <h3 className="page-title">Search "{query}"</h3>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      <Table striped bordered hover responsive>
                <thead className='table-header'>
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody className='table-body'>
                {data && data.map((member) => {
                    return (
                        <tr key={member.id}>
                            <td></td>
                            <td>{member.name}</td>
                            <td>{member.email}</td>
                            <td>{member.role}</td>
                            <td><i className="fa fa-pencil-square-o" style={{
                                "color": "#333",
                                "marginRight": "1rem"
                            }} aria-hidden="true"></i><i class="fa fa-trash" style={{
                                "color": "red",
                            }} aria-hidden="true"></i></td>
                        </tr>
                    )
                })}
                </tbody>
            </Table>
    </div>
  );
};

export default SearchScreen;