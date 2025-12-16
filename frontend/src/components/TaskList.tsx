import { useQuery } from "@apollo/client/react";
import type { FC } from "react";
import { TASKS_QUERY } from "../graphql/tasks";

type Task = {
  id: string;
  title: string;
  status: string;
  assigneeEmail?: string | null;
};

type TasksQueryResult = {
  tasks: Task[];
};

type Props = {
  projectId: string;
};

export const TaskList: FC<Props> = ({ projectId }) => {
  const { data, loading, error } = useQuery<TasksQueryResult>(TASKS_QUERY, {
    variables: { projectId },
  });

  if (loading) return <div>Loading tasks...</div>;
  if (error) return <div>Error loading tasks</div>;

  if (data!.tasks.length === 0) {
    return <div className="text-gray-500">No tasks yet.</div>;
  }

  return (
    <div className="space-y-2">
      {data!.tasks.map((task) => (
        <div
          key={task.id}
          className="flex items-center justify-between rounded border bg-white p-3"
        >
          <div>
            <div className="font-medium">{task.title}</div>
            <div className="text-sm text-gray-500">
              Status: {task.status}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
