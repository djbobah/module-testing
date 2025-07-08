import { render, screen } from "@testing-library/react";
import { App } from "src/App";
import ue from "@testing-library/user-event";
import { JestStoreProvider } from "../utils/JestStoreProvider";
import { resetState } from "../../src/store/taskSlice";
import { store } from "../../src/store/configureStore";
import { act } from "react-dom/test-utils";
const userEvent = ue.setup({
  advanceTimers: jest.advanceTimersByTime,
});

describe("Task List Filtering", () => {
  let input: HTMLElement;
  let addButton: HTMLElement;
  let filterButton: HTMLElement;

  beforeEach(async () => {
    render(<App />, {
      wrapper: JestStoreProvider,
    });
    act(() => {
      store.dispatch(resetState());
    });

    input = screen.getByRole("textbox");
    addButton = screen.getByRole("button", { name: "Add button" });
    filterButton = screen.getByRole("button", { name: "Toggle filter" });

    await userEvent.type(input, "Задача 1");
    await userEvent.click(addButton);
    await userEvent.type(input, "Задача 2");
    await userEvent.click(addButton);

    const checkboxes = screen.getAllByRole("checkbox");
    await userEvent.click(checkboxes[0]);
  });

  it("с включенным фильтром", async () => {
    //включаем фильтр
    await userEvent.click(filterButton);
    expect(screen.queryByText("Задача 1")).not.toBeInTheDocument();
    expect(screen.getByText("Задача 2")).toBeInTheDocument();
  });

  it("с выключенным фильтром", async () => {
    //включаем фильтр
    await userEvent.click(filterButton);
    //выключаем фильтр
    await userEvent.click(filterButton);
    expect(screen.queryByText("Задача 1")).toBeInTheDocument();
    expect(screen.getByText("Задача 2")).toBeInTheDocument();
  });

  it("сохраняет состояние фильтра после добавления задачи", async () => {
    // фильтр выключен
    expect(screen.queryByText("Все задачи")).toBeInTheDocument();

    //включаем фильтр
    await userEvent.click(filterButton);
    expect(screen.queryByText("Не выполненные задачи")).toBeInTheDocument();

    expect(screen.queryByText("Задача 1")).not.toBeInTheDocument();
    expect(screen.getByText("Задача 2")).toBeInTheDocument();

    await userEvent.type(input, "Задача 3");
    await userEvent.click(addButton);

    expect(screen.getByText("Задача 3")).toBeInTheDocument();
    expect(screen.queryByText("Не выполненные задачи")).toBeInTheDocument();
  });
});
