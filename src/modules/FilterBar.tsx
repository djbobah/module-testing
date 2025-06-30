import { FilterButton } from "src/components/FilterButton";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { addFilter, getFilter } from "src/store/taskSlice";

export const FilterBar = () => {
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const handleFilter = () => {
    dispatch(addFilter());
  };

  return (
    <div className="filter-bar">
      {filter ? <span>Не выполненные задачи</span> : <span>Все задачи</span>}
      <div style={{ display: "flex" }}>
        <FilterButton onClick={handleFilter} />
      </div>
    </div>
  );
};
