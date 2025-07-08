import TrashIcon from "../icons/trash.png";

type Props = {
  onClick: () => void;
  disabled: boolean;
};
export const DeleteButton = ({ onClick, disabled }: Props) => {
  return (
    <button
      className="button button-with-icon"
      onClick={onClick}
      disabled={disabled}
      aria-label="Delete button"
      data-alt="Удалить"
    >
      <img src={TrashIcon} alt="Удалить" />
    </button>
  );
};
