// import './CommentsList.css';

const CommentList = ({ comments } :any) => {
  return (
    <>
        <ul className="comment-list">
          {comments==undefined ? <h1>no comments</h1> : comments.map((comment: string) => (
            <li>
              {comment}
            </li>
          ))}
        </ul>
    </>
  );
};

export default CommentList;
