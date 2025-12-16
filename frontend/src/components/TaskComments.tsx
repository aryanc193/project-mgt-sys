import { useQuery, useMutation } from "@apollo/client/react";
import { COMMENTS_QUERY } from "../graphql/comments";
import { ADD_COMMENT_MUTATION } from "../graphql/addComment";
import { useState } from "react";

type Comment = {
  id: string;
  content: string;
  authorEmail: string;
  createdAt: string;
};

type CommentsResult = {
  taskComments: Comment[];
};

type Props = {
  taskId: string;
};

export function TaskComments({ taskId }: Props) {
  const { data, loading } = useQuery<CommentsResult>(COMMENTS_QUERY, {
    variables: { taskId },
    notifyOnNetworkStatusChange: true,
  });

  const [error, setError] = useState<string | null>(null);
  const [addComment] = useMutation(ADD_COMMENT_MUTATION);
  const [content, setContent] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) {
      setError("Comment cannot be empty");
      return;
    }

    setError(null);

    addComment({
      variables: {
        taskId,
        content,
        authorEmail: "demo@example.com",
      },
      refetchQueries: [{ query: COMMENTS_QUERY, variables: { taskId } }],
    });

    setContent("");
  }

  return (
    <div className="space-y-3">
      <div className="text-sm font-medium">Comments</div>

      {loading && !data && (
        <div className="text-sm text-gray-500">Loading...</div>
      )}

      {data && data.taskComments.length === 0 && (
        <div className="text-sm text-gray-500">No comments yet.</div>
      )}

      {data?.taskComments.map((c) => (
        <div key={c.id} className="rounded border bg-white p-3 text-sm">
          <div className="text-gray-800">{c.content}</div>
          <div className="text-xs text-gray-500 mt-1">{c.authorEmail}</div>
        </div>
      ))}

      {error && <div className="text-sm text-red-600">{error}</div>}
      <form onSubmit={submit} className="flex gap-2">
        <input
          className="flex-1 rounded border px-3 py-2 text-sm"
          placeholder="Add a comment"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button className="rounded bg-gray-800 px-3 py-2 text-sm text-white cursor-pointer">
          Send
        </button>
      </form>
    </div>
  );
}
