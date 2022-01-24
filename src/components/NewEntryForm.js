import React from 'react';
import {Form} from 'semantic-ui-react';
import ButtonSaveOrCancel from './ButtonSaveOrCancel'; 

function NewEntryForm() {
  return <Form unstackable>
            <Form.Group>
                <Form.Input  
                icon="tag"
                width={12}
                label="Description"
                placeholder="Wew Shinny thing"></Form.Input>
                <Form.Input  
                icon="dollar"
                iconPosition="left"
                width={4}
                label="Value"
                placeholder="100.00"></Form.Input>
            </Form.Group>
            <ButtonSaveOrCancel></ButtonSaveOrCancel>
        </Form>;
  
}

export default NewEntryForm;
