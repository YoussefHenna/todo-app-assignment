import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { Shadow } from "react-native-shadow-2";
import FontText from "../../components/FontText";
import { SQLService } from "../../service/SQLService";
import AddItemDialog from "./components/AddItemDialog";
import TodoItemGroup from "./components/TodoItemGroup";

const HomePage: React.FC = () => {
  const [addItemVisible, setAddItemVisible] = useState(false);
  const [itemsGroups, setItemsGrouped] = useState<TodoItem[][]>();
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const sqlService = SQLService.getInstance();

  const divideIntoGroups = (value: TodoItem[]) => {
    const divided = value.reduce((prev: TodoItem[][], current) => {
      let added = false;
      prev.forEach((group) => {
        if (group[0].groupLabel == current.groupLabel) {
          group.push(current);
          added = true;
        }
      });

      if (!added) {
        prev.push([current]);
      }
      return prev;
    }, []);
    setItemsGrouped(divided);
  };

  const addItem = (item: TodoItem) => {
    sqlService.addItem(item);
  };

  const updateItem = (item: TodoItem, completed: boolean) => {
    sqlService.updateItemCompleteStatus(item, completed);
  };

  useEffect(() => {
    sqlService.getAllItems().then((value) => {
      divideIntoGroups(value);
    });
  }, [refreshTrigger]);

  return (
    <View style={styles.mainContainer}>
      <FontText type="extra_bold" style={styles.title}>
        Todo
      </FontText>

      <FlatList
        data={itemsGroups}
        contentContainerStyle={styles.list}
        keyExtractor={(item) => item[0].groupLabel!!}
        ListEmptyComponent={() => {
          return (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FontText>Nothing yet, start adding some tasks.</FontText>
            </View>
          );
        }}
        renderItem={(value) => (
          <TodoItemGroup
            index={value.index}
            items={value.item}
            onItemCheckChange={(item, isChecked) => {
              updateItem(item, isChecked);
            }}
          />
        )}
      />

      <Shadow
        startColor="rgba(0,0,0,0.05)"
        containerViewStyle={styles.addButtonShadow}
      >
        <TouchableOpacity
          onPress={() => setAddItemVisible(true)}
          style={styles.addButton}
        >
          <FontText style={styles.addPlus} type="extra_bold">
            +
          </FontText>
        </TouchableOpacity>
      </Shadow>

      <AddItemDialog
        visible={addItemVisible}
        onRequestClose={() => {
          setAddItemVisible(false);
          setRefreshTrigger(!refreshTrigger);
        }}
        onItemAdded={addItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: 40,
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 27,
    color: "black",
    marginStart: 14,
  },
  addButtonShadow: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  addButton: {
    width: 56,
    height: 56,
    borderRadius: 30,
    backgroundColor: "#ff874b",
    alignItems: "center",
    justifyContent: "center",
  },
  addPlus: {
    fontSize: 40,
    color: "white",
  },
  list: {
    flex: 1,
    paddingBottom: 30,
  },
});

export default HomePage;
