import { render, screen } from "@testing-library/react";
import { Notifier } from "src/components/Notifier";

describe("Оповещение при вополнении задачи", () => {
  const mockTask = "Купить молоко";
  const mockOnClose = jest.fn();

  it("появляется и содержит заголовок задачи", () => {
    render(<Notifier task={mockTask} open={true} onClose={mockOnClose} />);

    const notifier = screen.getByText(mockTask);
    expect(notifier).toBeInTheDocument();
  });

  it("одновременно может отображаться только одно", () => {
    const { rerender } = render(
      <Notifier task="Первое оповещение" open={true} onClose={mockOnClose} />
    );

    expect(screen.getByText("Первое оповещение")).toBeInTheDocument();

    // Пытаемся показать второе оповещение
    rerender(
      <Notifier task="Второе оповещение" open={true} onClose={mockOnClose} />
    );

    const notifier = screen.getByTestId("notifier-text-text-id");
    // Первое должно исчезнуть, появиться второе
    expect(notifier).not.toHaveTextContent("Первое оповещение");
    expect(notifier).toHaveTextContent("Второе оповещение");
  });
});
