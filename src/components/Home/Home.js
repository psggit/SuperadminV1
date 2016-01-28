import React from 'react';

const Home = () => {
  return (
    <div className="container-fluid">
      <h3>HasuraDB console</h3>
      <hr/>
      <h4>Welcome to the HasuraDB console!</h4>
      Create, manage and view everything about your tables (data, schema, relationships, permissions) using the left
      navigation pane.
      <br/><br/>
      Read the <a href="http://hasura.io/services/hasuradb/docs/">docs</a> to get familar with the powerful
      query syntax.
    </div>
  );
};

export default Home;
