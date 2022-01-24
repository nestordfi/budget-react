import React from 'react';
import {Header} from 'semantic-ui-react';

function MainHeader( {tittle, type = "h1"} ) {
  return <Header as={type}>{tittle}</Header>
}

export default MainHeader;
