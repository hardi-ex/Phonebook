import css from "./SearchBox.module.css";
import { useDispatch, useSelector } from "react-redux";
import { changeFilter } from "../../redux/filters/slice";
import { useId } from "react";
import { selectFilter } from "../../redux/filters/selectors";

export const SearchBox = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  const idSearch = useId();
  return (
    <div className={css.div}>
      <label htmlFor={idSearch}>Find contacts by name or number</label>
      <input
        type="text"
        value={filter}
        id={idSearch}
        onChange={(evt) => dispatch(changeFilter(evt.target.value))}
      />
    </div>
  );
};

export default SearchBox;
