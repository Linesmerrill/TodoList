import { useState } from "react";
import { StyleSheet, View, FlatList, Button } from "react-native";
import { StatusBar } from "expo-status-bar";

import TodoItem from "./components/TodoItem";
import TodoInput from "./components/TodoInput";

export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [courseTodos, setCourseTodos] = useState([]);

  function startAddTodoHandler() {
    setModalIsVisible(true);
  }

  function endAddTodoHandler() {
    setModalIsVisible(false);
  }

  function addTodoHandler(enteredTodoText) {
    setCourseTodos((currentCourseTodos) => [
      ...currentCourseTodos,
      { text: enteredTodoText, id: Math.random().toString() },
    ]);
    endAddTodoHandler();
  }

  function deleteTodoHandler(id) {
    setCourseTodos((currentCourseTodos) => {
      return currentCourseTodos.filter((Todo) => Todo.id !== id);
    });
  }

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.appContainer}>
        <Button
          title="Add New Todo"
          color="#a065ec"
          onPress={startAddTodoHandler}
        />
        {/* Input Area */}
        <TodoInput
          onAddTodo={addTodoHandler}
          visible={modalIsVisible}
          onCancel={endAddTodoHandler}
        />
        {/* List of Todos */}
        <View style={styles.TodosContainer}>
          <FlatList
            data={courseTodos}
            renderItem={(itemData) => {
              return (
                <TodoItem
                  text={itemData.item.text}
                  id={itemData.item.id}
                  onDeleteItem={deleteTodoHandler}
                />
              );
            }}
            keyExtractor={(item, index) => {
              return item.id;
            }}
            alwaysBounceVertical={false}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },

  TodosContainer: {
    flex: 5,
  },
});
