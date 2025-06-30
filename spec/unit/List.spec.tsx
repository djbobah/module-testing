import { render, screen } from "@testing-library/react";
import { List } from "src/components/List";

it("отображение списка задач", () => {
  const onDelete = jest.fn();
  const onToggle = jest.fn();

  const items: Task[] = [
    {
      id: "1",
      header: "купить хлеб",
      done: false,
    },
    {
      id: "2",
      header: "купить молоко",
      done: false,
    },
    {
      id: "3",
      header: "выгулять собаку",
      done: true,
    },
  ];

  const { rerender, asFragment } = render(
    <List items={items} onDelete={onDelete} onToggle={onToggle} />
  );
  const firstRender = asFragment();

  items.pop();

  rerender(<List items={items} onDelete={onDelete} onToggle={onToggle} />);
  const secondRender = asFragment();

  expect(firstRender).toMatchDiffSnapshot(secondRender);
});

it("Список содержит не больше 10 невыполненных задач", () => {
  const mockTasks: Task[] = [
    ...Array.from({ length: 10 }, (_, i) => ({
      id: `task-${i}`,
      header: `Невыполненная задача ${i + 1}`,
      done: false,
    })),
    ...Array.from({ length: 4 }, (_, i) => ({
      id: `done-task-${i}`,
      header: `Выполненная задача ${i + 1}`,
      done: true,
    })),
  ];

  const mockDelete = jest.fn();
  const mockToggle = jest.fn();

  render(
    <List items={mockTasks} onDelete={mockDelete} onToggle={mockToggle} />
  );

  const incompleteTasks = screen
    .getAllByRole("listitem")
    .filter((item) => !item.textContent?.includes("Выполненная"));

  expect(incompleteTasks.length).toBeLessThanOrEqual(10);
});
