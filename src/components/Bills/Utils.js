const findArrayRelInQuery = (query, tableSchema) => {
  let childTableRel = null;
  const childQuery = query.columns.find((x) => {
    if (typeof(x) === 'object') {
      const rel = tableSchema.relationships.find((r) => {
        return ((r.type === 'arr_rel') && (r.name === x.name));
      });
      if (rel) {
        childTableRel = rel;
        return true;
      }
    }
    return false;
  });

  return [childQuery, childTableRel];
};

export {findArrayRelInQuery};
