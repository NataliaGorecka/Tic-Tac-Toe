import * as React from 'react';
import { View, Text,Button,Image,StyleSheet,TextInput,
 TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const boardClass = require('./boardClass.js').default;





const Stack = createNativeStackNavigator();
const styles = StyleSheet.create({
  insideBoard3: {
    borderColor: '#000000',
    borderWidth: 1,
    width: 120,
    alignItems:'center',
  },
  insideBoard2: {
    borderColor: '#000000',
    borderWidth: 1,
    width: 180,
    alignItems: 'center',
  },
  insideBoard4: {
    borderColor: '#000000',
    borderWidth: 1,
    width: 90,
    alignItems:'center',
  },
  boardStyle: {
    height: 50,
    width: '100%',
    justifyContent:'space-evenly',
    fontWeight: 'bold',
    flexDirection:'row',
  },
  buttonMenu: {
    width:60,
    borderRadius: 10,
    color: '#000000',
    backgroundColor: '#000000',
    fontWeight: 'bold',
  },
  imageStyle: {
    width: '60%',
    height: 200,
    margin: 12,
    alignSelf: 'center',
    borderRadius: 45,
  },
  container: {
    flex: 1,
    borderWidth:1,
    padding: 20,
    backgroundColor: '#c0b7e9',
    justifyContent:'space-between',
  },
   container1: {
     flex: 1,
    padding: 20,
    backgroundColor: '#c0b7e9',
  },
  textStyle: {
    fontSize: 26,
    alignSelf:'center',
  },
  buttonStyle: {
    margin: 12,
    height: 100,
    width: 100,
    borderRadius: 10,
    color: '#000000',
    backgroundColor: '#000000',
    fontWeight:'bold',

  },
  input: {
    alignItems: 'center',
    justifyContent:'center',
    margin: 12,
    padding: 10,
    flexDirection: 'row',
  },
})


  export default function App() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Tic Tac Toe' }} />
          <Stack.Screen name="Choose" component={ChooseScreen} options={{ title: 'Chose your Sign' }} />
          <Stack.Screen name="Game" component={GameScreen} options={{ title: 'Game' }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
var collection_id = [];
let computer_sign = '';
 function GameScreen({ route, navigation }) {
    const { sign } = route.params;
   const { size } = route.params;
   const text= React.createRef;

    if (sign == 'O') {
      computer_sign = 'X';
    } else {
      computer_sign = 'O';
    }
   //id!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  const board = [];
   var keyNumber = 0;
   var id = boardClass.getID;
    for (let i = 0; i < size; i++) {
      keyNumber++;
      
      switch (size) {
        case '2':
            makeCollection(size);
          board.push(
            <View key={keyNumber} style={styles.boardStyle}>
              {createView(sign, size, 50, 180, styles.insideBoard2,id)}
              {createView(sign, size, 50, 180, styles.insideBoard2,id )}
            </View>
          )
       //   id++;
          break;
        case '3':
          board.push(
            <View key={keyNumber} style={styles.boardStyle}>
              {createView(sign, size, 50, 120, styles.insideBoard3)}
              {createView(sign, size, 50, 120, styles.insideBoard3)}
              {createView(sign, size, 50, 120, styles.insideBoard3)}
            </View>
          )
          break;
        case '4':
          board.push(
            <View key={keyNumber} style={styles.boardStyle}>
              {createView(sign, size, 50, 90, styles.insideBoard4)}
              {createView(sign, size, 50, 90, styles.insideBoard3)}
              {createView(sign, size, 50, 90, styles.insideBoard3)}
              {createView(sign, size, 50, 90, styles.insideBoard3)}
            </View>
          )
          break;
      }
    }
   const myBoard = new boardClass(board);
   return (
      <View style={styles.container1} >
        <TouchableOpacity >
        {board}
        </TouchableOpacity>
      </View>
    )
   
  }
function makeCollection(size) {
  let s = size * size;
  for (let i = 0; i < s; i++){
    collection_id.push(i);
  }
  
}
 function ChooseScreen({ route, navigation }) {
  const { size } = route.params;
  return (
  <View style={styles.container1}>
      <Text style={styles.textStyle}>  Board  {JSON.stringify(size)}x{JSON.stringify(size)}</Text>
      <View style={styles.input}>
      <Button
          style={styles.buttonStyle}
          title="X"
          onPress={() => navigation.navigate('Game',{sign:'X',size:size})}
      />
      <Button
        style={styles.buttonStyle}
        title="O"
        onPress={() => navigation.navigate('Game',{sign:'O',size:size})}
        />
      </View>
      </View>
      
  )
}
function HomeScreen({ navigation }) {
  return (
      <View style={styles.container}>
      <Text style={styles.textStyle}>Chose size of the board</Text>
      <Image
        source={require('./assets/titactoe.png')}
        style={styles.imageStyle}
      />
      <Button
        style={styles.buttonStyle}
        title="2x2"
        onPress={() => navigation.navigate('Choose', {size:'2'})}
      />
      <Button
        style={styles.buttonStyle}
        title="3x3"
        onPress={() => navigation.navigate('Choose', {size:'3'})}
      />
      <Button
        style={styles.buttonStyle}
        title="4x4"
        onPress={()=>navigation.navigate('Choose',{size:'4'})}
      />
    </View>
  );
}

 function createView(sign, size, h, w, style,id) {
    const [text, setText] = React.useState('');
   var setSign = () => setText(sign);
   
    try {
      return (
        <View style={style}>
          <Text key={id}>{text} </Text>
          <TouchableOpacity onPressIn={setSign} onPress={(evt) => getXY(evt.nativeEvent.pageX, evt.nativeEvent.pageY, size)}>
            <View style={{ width: w, height: h }}>
            </View>
          </TouchableOpacity >
        </View>
      )
    } catch (e) {
      console.error(e);
    }
   
 }

function computerMove(id) {
  let index = collection_id.indexOf(id);
  collection_id.splice(index);
  console.log('L: '+collection_id.length);
  if (collection_id.length != 0) {
    let place = collection_id[Math.floor(Math.random()*collection_id.length)];
   console.log('i: '+place);
  }
  

   
}
 //onPress={(evt) => getXY(evt.nativeEvent.pageX, evt.nativeEvent.pageY, size)
  
  function getXY(X, Y, size) {
    X = Math.round(X);
    Y = Math.round(Y);
    let id;
    switch (size) {
      case '2':
        console.log(X + " , " + Y)
        if ((X >= 0) && (X <= 180) && (Y <= 140)) {
          id = 1;
          console.log('okno 1');
        } else if ((X >= 200) && (X <= 370) && (Y >= 110) && (Y <= 130)) {
          id = 2;
          console.log('okno 2');
        } else if ((X > 0) && (X < 180) && (Y > 145)) {
          id = 3;
          console.log('okno 3');
        } else {
          id = 4;
          console.log('okno 4');
          
        }
        break;
    }
    computerMove(id);
    boardClass.getID(id);
   
  }
