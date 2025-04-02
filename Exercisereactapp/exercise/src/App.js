import React, { useState } from "react";
import { View, Text, FlatList } from "react-native";
import { Button } from "react-native-elements";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const exercises = [
  { name: "Push-Ups", type: "repetition", suggested: "Squats" },
  { name: "Squats", type: "repetition", suggested: "Jogging" },
  { name: "Jogging", type: "duration", suggested: "Push-Ups" },
];

function HomeScreen({ navigation }) {
  return (
    <View>
      <Text>Exercise Tracker</Text>
      <FlatList
        data={exercises}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <Button
            title={item.name}
            onPress={() =>
              navigation.navigate(item.type === "repetition" ? "RepetitionExercise" : "DurationExercise", { exercise: item })
            }
          />
        )}
      />
    </View>
  );
}

function RepetitionExercise({ route, navigation }) {
  const { exercise } = route.params;
  const [count, setCount] = useState(0);

  return (
    <View>
      <Text>{exercise.name}</Text>
      <Text>Reps: {count}</Text>
      <Button title="Increase" onPress={() => setCount(count + 1)} />
      <Button title="Reset" onPress={() => setCount(0)} />
      <Button title="Home" onPress={() => navigation.navigate("Home")} />
      <Button
        title={`Suggested: ${exercise.suggested}`}
        onPress={() =>
          navigation.navigate(
            exercises.find((ex) => ex.name === exercise.suggested).type === "repetition" ? "RepetitionExercise" : "DurationExercise",
            { exercise: exercises.find((ex) => ex.name === exercise.suggested) }
          )
        }
      />
    </View>
  );
}

function DurationExercise({ route, navigation }) {
  const { exercise } = route.params;
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  return (
    <View>
      <Text>{exercise.name}</Text>
      <Text>Time: {time} seconds</Text>
      <Button title={running ? "Stop" : "Start"} onPress={() => setRunning(!running)} />
      <Button title="Reset" onPress={() => setTime(0)} />
      <Button title="Home" onPress={() => navigation.navigate("Home")} />
      <Button
        title={`Suggested: ${exercise.suggested}`}
        onPress={() =>
          navigation.navigate(
            exercises.find((ex) => ex.name === exercise.suggested).type === "repetition" ? "RepetitionExercise" : "DurationExercise",
            { exercise: exercises.find((ex) => ex.name === exercise.suggested) }
          )
        }
      />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="RepetitionExercise" component={RepetitionExercise} />
        <Stack.Screen name="DurationExercise" component={DurationExercise} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
