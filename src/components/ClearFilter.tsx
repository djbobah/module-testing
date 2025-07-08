import Icon from "../icons/filter.png";

type Props = {
  onClick: () => void;
};
export const ClearFilter = ({ onClick }: Props) => {
  return (
    <button
      className="button button-with-icon"
      onClick={onClick}
      data-alt="Очистить фильтр"
    >
      <img src={Icon} alt="Фильтр" />
    </button>
  );
};
