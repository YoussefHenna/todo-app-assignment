import React, { useEffect, useState } from "react";
import { Modal, Pressable, StyleSheet, View } from "react-native";
import CustomButton from "../../../components/CustomButton";
import CustomTextInput from "../../../components/CustomTextInput";
import FontText from "../../../components/FontText";

interface AddItemDialogProps {
  visible: boolean;
  onRequestClose: () => void;
  onItemAdded: (item: TodoItem) => void;
}

const AddItemDialog: React.FC<AddItemDialogProps> = (props) => {
  const [currentItem, setCurrentItem] = useState("");
  const [currentGroup, setCurrentGroup] = useState("");

  useEffect(() => {
    setCurrentItem("");
    setCurrentGroup("");
  }, [props.visible]);

  return (
    <Modal
      transparent={true}
      visible={props.visible}
      onRequestClose={props.onRequestClose}
    >
      <Pressable style={styles.modalView} onPress={props.onRequestClose}>
        <Pressable onPress={() => {}} style={styles.mainContainer}>
          <FontText style={styles.title} type="bold">
            Add todo item
          </FontText>
          <CustomTextInput
            style={styles.input}
            label="Item"
            value={currentItem}
            onValueChanged={(value) => setCurrentItem(value)}
          />
          <CustomTextInput
            style={styles.input}
            label="Group (optional)"
            value={currentGroup}
            onValueChanged={(value) => setCurrentGroup(value)}
          />
          <CustomButton
            style={styles.button}
            onPress={() => {
              props.onItemAdded({
                item: currentItem,
                groupLabel:
                  currentGroup.trim() === "" ? "No group" : currentGroup,
                completed: false,
              });
              props.onRequestClose();
            }}
            text="Add"
            enabled={currentItem.trim() !== ""}
          />
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    alignItems: "center",
    justifyContent: "center",
  },
  mainContainer: {
    backgroundColor: "white",
    borderRadius: 12,
    width: "90%",
    padding: 20,
  },
  title: {
    fontSize: 20,
    color: "black",
  },
  input: {
    marginTop: 16,
  },
  button: {
    width: 90,
    alignSelf: "flex-end",
    marginTop: 20,
  },
});

export default AddItemDialog;
