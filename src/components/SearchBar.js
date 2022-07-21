import { useState } from "react";
import { useHistory } from "react-router-dom";

export default function SearchBar() {
  const [term, setTerm] = useState("");
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/search?q=${term}`);
  };
  return (
    <div className="searchbar">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="search"
          onChange={(e) => setTerm(e.target.value)}
          required
          placeholder="Search by name, email, role"
        />
      </form>
    </div>
  );
};


