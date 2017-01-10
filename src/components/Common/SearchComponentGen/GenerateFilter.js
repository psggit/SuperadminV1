const recurseObjectForm = ( fields, index, finalVal, finalObj = {} ) => {
  if ( index === fields.length ) {
    return finalVal;
  }
  finalObj[[fields[index]]] = recurseObjectForm(fields, index + 1, finalVal);
  return finalObj;
};

const getValidKey = ( field, value ) => {
  if ( field.indexOf('.') !== -1 ) {
    const fields = field.split('.');
    return recurseObjectForm(fields, 0, value );
  }
  return { [field]: value };
};

const beginFilter = ( getState ) => {
  const filterData = getState().gen_filter_data;

  const filterObjs = [];
  Object.keys(filterData.filters).forEach( ( key ) => {
    if ( filterData.filters[key].isValid ) {
      const finalVal = {
        [ filterData.filters[key].operator ]: ( ['$like', '$ilike'].indexOf(filterData.filters[key].operator) !== -1 ) ? ( '%' + filterData.filters[key].value + '%' ) : filterData.filters[key].value
      };
      const fObj = getValidKey(filterData.filters[key].field, finalVal );
      filterObjs.push(fObj);
    }
  });

  const filterObj = {
    '$and': [ ...filterObjs ]
  };

  return filterObj;
};

export default beginFilter;
