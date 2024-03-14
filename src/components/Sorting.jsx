

const Sorting = () =>{
  const handleSort = (event) =>{

  }

  return (
    <div className="sort-by-container">
      <label htmlFor="sort-select">Sort By:</label>
      <select className="sort-select-list" onChange={handleSortChange}>
        <option value="date">Date</option>
        <option value="comment_count">Comment Count</option>
        <option value="votes">Votes</option>
      </select>
      <button onClick={toggleSortOrder}>Asc/Desc</button>
    </div>
  );
}

export default Sort