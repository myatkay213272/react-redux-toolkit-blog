import { useAddReactionMutation } from "./postSlice";

const reactionEmoji = {
  thumbsUp: '👍',
  wow: '😲',
  heart: '❤️',
  rocket: '🚀',
  coffee: '☕',
};

const ReactionButton = ({ post }) => {
  const [addReaction] = useAddReactionMutation()

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
      
    return (
      <button
        key={name}
        type="button"
        className="btn btn-outline-primary btn-sm me-2"
        onClick={() => {
          const newValue = (post.reactions?.[name] || 0) + 1;
          addReaction({postId:post.id,reactions : {...post.reactions,[name]:newValue}})
        }}
      >
        {emoji} {post.reactions?.[name] || 0}
      </button>
    );
  });

  return <div>{reactionButtons}</div>;
};

export default ReactionButton;
