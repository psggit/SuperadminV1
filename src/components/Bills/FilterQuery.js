/*
  Use state exactly the way columns in create table do.
  dispatch actions using a given function,
  but don't listen to state.
  derive everything through viewtable as much as possible.
*/

const FilterQuery = ({headings, schemas, dispatch}) => {
  styles = require('./FilterQuery.scss');
  const ColOpInputs = headings.map((heading) => {
    return (
      <div>
        <div className="col-md-5">heading.name</div>
        <div className="col-md-2"><OperatorSelect /></div>
        <div className="col-md-5">
          <input className="form-control" type="text" />
        </div>
      </div>
    );
  });
  return (
    <div className={styles.queryBox}>
      {ColOpInputs}
    </div>
  );
};

export default FilterQuery;
