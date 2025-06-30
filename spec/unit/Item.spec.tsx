import { render, screen } from "@testing-library/react";
import { Item } from "src/components/Item";

describe("Элемент списка задач", () => {
  const onDelete = jest.fn();
  const onToggle = jest.fn();
  it("название не должно быть больше 32 символов", () => {
    const { container } = render(
      <Item
        onDelete={onDelete}
        onToggle={onToggle}
        id="1"
        header="Строка не превышающая 32 символа"
        done={false}
      />
    );
    const labelEl = container.querySelector("label");
    expect(labelEl?.textContent?.length).toBeLessThan(33);
  });
  it("название не должно быть пустым", () => {
    const { container } = render(
      <Item
        onDelete={onDelete}
        onToggle={onToggle}
        id="1"
        header="Задача"
        done={false}
      />
    );
    const labelEl = container.querySelector("label");
    expect(labelEl?.textContent).not.toBe("");
  });
  it("нельзя удалять невыполненные задачи", () => {
    render(
      <Item
        onDelete={onDelete}
        onToggle={onToggle}
        id="1"
        header="Задача"
        done={false}
      />
    );
    const delBtn = screen.getByRole("button");
    expect(delBtn).toBeDisabled();
  });
  it("кнопка удаления должна быть активна для выполненной задачи", () => {
    render(
      <Item
        onDelete={onDelete}
        onToggle={onToggle}
        id="1"
        header="Задача"
        done={true}
      />
    );
    const delBtn = screen.getByRole("button");
    expect(delBtn).not.toBeDisabled();
  });
  it("должен вызывать onDelete при клике на кнопку удаления (если задача выполнена)", () => {
    render(
      <Item
        onDelete={onDelete}
        onToggle={onToggle}
        id="1"
        header="Задача"
        done={true}
      />
    );

    const delBtn = screen.getByRole("button");
    delBtn.click();

    expect(onDelete).toHaveBeenCalledWith("1");
  });
});
