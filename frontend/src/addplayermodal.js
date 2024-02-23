import * as React from "react";
import Modal from "@cloudscape-design/components/modal";
import Box from "@cloudscape-design/components/box";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
//import Input from "@cloudscape-design/components";
import { useState } from "react";
import { Input } from "@cloudscape-design/components";
import ApiFetch from "./APIFetch";
import FormField from "@cloudscape-design/components/form-field";

export default ({closeModal, modalVis}) => {

const [visible,setVisible]= useState(false);
const [name, setInputName]= useState("");
const [points, setInputPoints] = useState(0);
const [wins, setInputWins] = useState(0);
const [losses, setInputLosses] = useState(0);

const handleAddPlayerClick = () => {
  setVisible(true);
};

const addPlayer = async () => {
  try {
    const response = await ApiFetch("http://localhost:5000/post", "POST", {
      name: name,
      points: points,
      wins: wins,
      loses: losses,
    });

    if (response.ok) {
      const newPlayer = await response.json();
      console.log('Player added:', newPlayer);
      addPlayer(prevPlayers => [...prevPlayers, newPlayer]);
    } else {
      console.error('Failed to add player:', response.statusText);
    }
  } catch (error) {
    console.error('Error adding player:', error);
  }
  closeModal()
};

// const handleInputChange= (event)=>{
//  // Update input value as user types
// setInputValue(event.target.value)
// };

// const handleOkClick=() =>{
//     //Handle Ok buttons clicks here
//     console.log("Input value:", inputValue);

//     //Close the modal after handling input
//     setVisible(false);
// };


  return (
    <div>

<Modal
      onDismiss={() => closeModal()}
      visible={modalVis}
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="link" onClick={() => closeModal()}>Cancel</Button>
            <Button onClick={addPlayer}>Ok</Button>
          </SpaceBetween>
        </Box>
      }
      header="Add a new player"
    >
          <FormField
      label="name"
    >
      <Input
        value={name}
        onChange={event =>
          setInputName(event.detail.value)
        }
      />
    </FormField>
          <FormField
      label=" points"
    >
      <Input
        value={points}
        onChange={event =>
          setInputPoints(event.detail.value)
        }
      />
    </FormField>
 
 <FormField
      label="wins"
    >
      <Input
        value={wins}
        onChange={event =>
          setInputWins(event.detail.value)
        }
      />
    </FormField>
          <FormField
      label="losses"
    >
      <Input
        value={losses}
        onChange={event =>
          setInputLosses(event.detail.value)
        }
      />
    </FormField>
</Modal>
    </div>
   
 
  );
}