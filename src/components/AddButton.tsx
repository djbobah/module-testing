import AddIcon from "../icons/add.png";

type Props = {
  onClick: () => void;
  disabled: boolean;
};
export const AddButton = ({ onClick, disabled }: Props) => {
  return (
    <button
      data-testid="add-button"
      className="button button-with-icon"
      onClick={onClick}
      disabled={disabled}
      aria-label="Add button"
      data-alt="добавить задачу"
    >
      <img src={AddIcon} alt="Добавить" />
    </button>
  );
};
