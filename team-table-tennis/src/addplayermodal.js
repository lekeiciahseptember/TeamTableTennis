import * as React from "react";
import Modal from "@cloudscape-design/components/modal";
import Box from "@cloudscape-design/components/box";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
//import Input from "@cloudscape-design/components";
import { useState } from "react";
import { Input } from "@cloudscape-design/components";

export default ({closeModal, modalVis}) => {

const [visible,setVisible]= React.useState(false);
const [inputValue, setInputValue]= React.useState("");

const handleInputChange= (event)=>{
 // Update input value as user types
setInputValue(event.target.value)
};

const handleOkClick=() =>{
    //Handle Ok buttons clicks here
    console.log("Input value:", inputValue);

    //Close the modal after handling input
    setVisible(false);
};


  return (
   <Modal
      onDismiss={() => closeModal()}
      visible={modalVis}
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="link" onClick={() => closeModal()}>Cancel</Button>
            <Button variant="primary" onClick={() => closeModal()}>Ok</Button>
          </SpaceBetween>
        </Box>
      }
      header="Add a new player"
    >
   <Input
      onChange={({ detail }) => setInputValue(detail.value)}
      value={inputValue}
    />
    
 
    

</Modal>
 
  );
}