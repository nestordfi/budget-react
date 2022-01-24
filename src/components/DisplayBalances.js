import React from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import DisplayBalance from './DisplayBalance';

function DisplayBalances() {
  return <Segment textAlign ='center'>
        <Grid columns={2} divided>
            <Grid.Row> 
            <Grid.Column>
            <DisplayBalance tittle="Income:" value="100.45" color="green"></DisplayBalance>
            </Grid.Column>             
            <Grid.Column>
            <DisplayBalance tittle="Expenses:" value="623" color="red"></DisplayBalance>   
            </Grid.Column>      
            </Grid.Row>
        </Grid>
        </Segment>;
}

export default DisplayBalances;
