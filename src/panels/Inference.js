import { Div, Panel, PanelHeader, Paragraph, Group, FormItem, Textarea, Button, List, Cell } from '@vkontakte/vkui';
import { useState } from 'react';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import axios from 'axios';
import PropTypes from 'prop-types';



export const Inference = ({ id }) => {
  const routeNavigator = useRouteNavigator();
  const [inferenceState, setInferenceState] = useState(false);
  const [tagsList, updateTagsList] = useState([]);

  const showTagsList = (data) => {
    setInferenceState(true);
    updateTagsList(data['tags']);
  }
  
  const on_click = () => {
    const res = document.getElementById("InferenceTextArea").value;
    const data = {text: res};
    console.log(res);
    console.log(JSON.stringify(data));
    axios.post("http://localhost:8000/inference/", data)
        .then((response) => response.data )
        .then((data) => showTagsList(data))
        .catch((error) => console.error("Error:", error));
}

return (
    <Panel id={id}>
      <PanelHeader
        mode="plain"
        style={{
          backgroundColor: "#3F72AF",
          fontWeight: "bold",
          fontSize: "18px",
          padding: "12px",
        }}
      >
        Fit Predict Inference
      </PanelHeader>
      <Group>
         <form id="InferenceForm">
          <Div style={{ padding: 12 }}>
            <Paragraph style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "8px" }}>
                Введите текст вашей новости:
            </Paragraph>
          </Div>
          
          <FormItem>
            <Textarea id="InferenceTextArea" placeholder="Сегодня такое произошло..." rows={4} />
         </FormItem>

         <Div>
              <Button
                onClick={on_click}
                size={"l"}
              >
                Predict
              </Button>
         </Div>
         </form>
      { inferenceState ? 
      <List>
        {tagsList.map((item) => (
            <Cell mode="selectable" defaultChecked="true" key={item}>{item}</Cell>
        ))}
      </List> : null }
      </Group>
    </Panel>
  );
};

Inference.propTypes = {
  id: PropTypes.string.isRequired,
};
