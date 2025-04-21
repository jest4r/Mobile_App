import { View, Text, Button, TextInput } from 'react-native'
import React, {useState} from 'react'
import { Modal } from 'react-native'
const Header = (props) => {
  //  props = {gender: 'male', age: 20}
   const onPressSendData = () => {
      props.getText(text)
   }

   const [text, onChangeText] = useState("Text")
   const onChangeTextFn = (value) => onChangeText(value)
  return (
    <View style={{borderWidth: 5}}>
      <Text style={{fontSize: 30}}>Header {props.gender} {props.age} {props.sum}</Text>
      <Button title="Click me" onPress={onPressSendData}/>
      <TextInput
        onChangeText={onChangeTextFn}
        value={text}
      />
    </View>
  )
}

const ModalTester = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(isModalVisible);
  };

  return (
    <View style={{flex: 1}}>
      <Button title="Show modal" onPress={toggleModal} />
      <Modal isVisible={!isModalVisible}>
        <View style={{flex: 1}}>
          <Text>Hello!</Text>
          <Button title="Hide modal" onPress={toggleModal} />
        </View>
      </Modal>
    </View>
  );
}

export default function Demo() {
   const [gender, setGender] = useState('nam')
   const [age, setAge]  = useState(20)
   const [sum, setSum] = useState(0)
   const [color, setColor] = useState('')
   const [textInput, setTextInput] = useState('')
   const [multiText, setMultiText] = useState([])
   const handleSum = () => {
     setSum(sum + 1)
   }
   const getColorValue = (value) => {
    setColor(value)
   }
   const getTextInput = (value) => {
    setMultiText([value, ...multiText])
   }
  return (
    <View>
      <ModalTester  />
    </View>
  )
}