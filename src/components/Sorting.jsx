import { useEffect, useState } from "react";
import "./css/sorting.css"

const Sorting = ({ articles, setArticles }) => {
  const [sortCriteria, setSortCriteria] = useState("created_at");
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    const sortArticles = () => {
      const sortedArticles = [...articles].sort((a, b) => {
        let valueA = typeof a[sortCriteria] === 'string' ? a[sortCriteria].toLowerCase() : a[sortCriteria]
        let valueB = typeof b[sortCriteria] === 'string' ? b[sortCriteria].toLowerCase() : b[sortCriteria]

        if (sortCriteria === "created_at") {
          valueA = new Date(valueA)
          valueB = new Date(valueB)
        }
        if (sortCriteria === "comment_count" || sortCriteria === "votes") {
          valueA = parseInt(valueA, 10)
          valueB = parseInt(valueB, 10)
        }

        let comparison = 0
        if (valueA < valueB) {
          comparison = -1
        } else if (valueA > valueB) {
          comparison = 1
        }

        return sortOrder === "asc" ? comparison : -comparison
      })
      setArticles(sortedArticles)
    }
    sortArticles()
  }, [sortOrder, sortCriteria])

  return (
    <div className="sorting-controls">
      <div>
        <label htmlFor="sort-select">Sort by: </label>
        <select id="sort-select" onChange={(event) => setSortCriteria(event.target.value)} value={sortCriteria}>
          <option value="created_at">Date</option>
          <option value="comment_count">Comment Count</option>
          <option value="votes">Votes</option>
        </select>
      </div>
      <div>
        <label htmlFor="order-select">Order: </label>
        <select id="order-select" onChange={(event) => setSortOrder(event.target.value)} value={sortOrder}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </div>
  )
}

export default Sorting
