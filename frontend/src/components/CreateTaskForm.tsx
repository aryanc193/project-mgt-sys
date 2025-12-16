import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { CREATE_TASK_MUTATION } from "../graphql/createTask";
import { TASKS_QUERY } from "../graphql/tasks";

type Task = {
  __typename?: "TaskType";
  id: string;
  title: string;
  status: string;
  assigneeEmail?: string | null;
};

type CreateTaskResult = {
  createTask: {
    task: Task;
  };
};

type TasksQueryResult = {
  tasks: Task[];
};

type Props = {
  projectId: string;
};

export function CreateTaskForm({ projectId }: Props) {
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const [createTask, { loading }] = useMutation<CreateTaskResult>(
    CREATE_TASK_MUTATION,
    {
      optimisticResponse: {
        createTask: {
          task: {
            id: `temp-${Math.random()}`,
            title,
            status: "TODO",
            assigneeEmail: null,
            __typename: "TaskType",
          },
        },
      },
      update(cache, { data }) {
        const newTask = data?.createTask?.task;
        if (!newTask) return;

        const existing = cache.readQuery<TasksQueryResult>({
          query: TASKS_QUERY,
          variables: { projectId },
        });

        if (!existing) return;

        cache.writeQuery({
          query: TASKS_QUERY,
          variables: { projectId },
          data: {
            tasks: [...existing.tasks, newTask],
          },
        });
      },
    }
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title.trim()) {
      setError("Task name is required");
      return;
    }

    setError(null);

    createTask({
      variables: { projectId, title },
    });

    setTitle("");
  }

  return (
    <div className="space-y-1">
      {error && <div className="text-sm text-red-600">{error}</div>}
      <form onSubmit={handleSubmit} className="flex max-w-md gap-2">
        <input
          className="flex-1 rounded border px-3 py-2"
          placeholder="New task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded bg-black px-4 py-2 text-white disabled:opacity-50 cursor-pointer"
        >
          Add
        </button>
      </form>
    </div>
  );
}
