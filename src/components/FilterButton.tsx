import FilterIcon from "../icons/filter2.png";
import FilterDeleteIcon from "../icons/filter.png";
import { useSelector } from "react-redux";
import { getFilter } from "src/store/taskSlice";

type Props = {
  onClick: () => void;
};
export const FilterButton = ({ onClick }: Props) => {
  const filter = useSelector(getFilter);
  return (
    <button
      data-testid="filter-button"
      className="button button-with-icon"
      onClick={onClick}
      aria-label="Toggle filter"
      data-alt="Фильтр"
    >
      {filter ? (
        <img src={FilterDeleteIcon} alt="Фильтр" />
      ) : (
        <img src={FilterIcon} alt="Фильтр" />
      )}
    </button>
  );
};
