import React from 'react';
import {Statistic} from 'semantic-ui-react';

function DisplayBalance({tittle, value, color="black"}, size="tiny") {
  return <Statistic size={size} color={color}>
            <Statistic.Label style={{textAlign:"left"}}>
                {tittle}
            </Statistic.Label>  
            <Statistic.Value>
                {value}
            </Statistic.Value>
        </Statistic>;
}

export default DisplayBalance;
