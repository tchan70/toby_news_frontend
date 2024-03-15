import { useContext } from 'react';
import { patchArticleVotesById } from '../utils/api';
import VoteContext from './Vote';

const useVoteHandler = (updateFunction, isSingleArticle = false) => {
  const { votes, setVotes } = useContext(VoteContext);

  const handleVote = (articleId, increment) => {
    if (votes[articleId]) return

    const voteChange = { inc_votes: increment };
    patchArticleVotesById(voteChange, articleId)
    .then((updatedArticle) => {
      if (isSingleArticle) {
        updateFunction(updatedArticle);
      } else {
        updateFunction((prevArticles) =>
          prevArticles.map((article) =>
            article.article_id === articleId ? { ...article, votes: updatedArticle.votes } : article
          )
        )
      }
      setVotes({ ...votes, [articleId]: true })
    })
    .catch((err) => {
      console.error(err, "error handling votes")
    })
  }
  return handleVote
}

export default useVoteHandler