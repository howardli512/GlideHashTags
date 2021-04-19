import * as React from 'react';
import { useState, Component } from 'react';
import { View, Text, Image, Button, TextInput, StyleSheet, ScrollView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import database from '@react-native-firebase/database';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import { tsConstructorType } from '@babel/types';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const reference = database().ref('/users/123');


//---------------------------------------------------------------------------Home Screen
function HomeScreen({ navigation }) {
  [count1, setCount1] = useState(0);
  var count = '';
  database()
  .ref('/Final_Post_Scrpaed_Count')
  .once('value')
  .then(snapshot => {
    
    snapshot.forEach(documentSnapshot => {
      i = documentSnapshot.val();
      count = i.Count;
      console.log(i.Count);
    })
  });
  return (
    <View style={styles.screens}>
      <Image style={styles.logo} source={require('./src/glide.png')}/>
      <Text style={styles.title}>Glide Hash Tags</Text>
      <TouchableOpacity onPress={() => setCount1(count)}>
        <Text style={styles.subtext}>Current Scraped Post: {count1}</Text>
      </TouchableOpacity>
      <Button
        title="Combine Hashtags"
        containerStyle={styles.bigbutton}
        onPress={() => navigation.navigate('Combined')}
      />
      <Button
        title="Top Hashtags"
        containerStyle={styles.bigbutton}
        onPress={() => navigation.navigate('Top Hashtags')}
      />
    </View>
  );
}

//---------------------------------------------------------------------------Combine Hashtags
function CombineHashtags({ navigation }) {
  const [tagnumber, setTagnumber] = useState(5);
  const [text1, setText1] = useState('');
  const [data1, setData1] = useState({
    labels: [],
    datasets: [
      {
        data: []
      }
    ]
  });
  var hashList = [];
  var countList = [];
  database()
  .ref('/Final_Combine_Count')
  .orderByChild('Count')
  .limitToLast(tagnumber)
  .once('value')
  .then(snapshot => {
    console.log('All data: ', snapshot.val());
    snapshot.forEach(documentSnapshot => {
      i = documentSnapshot.val();
      console.log(i.Hashtag1);
      console.log(i.Hashtag2);
      hashList.push(i.Hashtag1 + ' + ' + i.Hashtag2);
      console.log(i.Count);
      countList.push(i.Count);
    })
  });

  const chartConfig = {
    backgroundColor: 'orange',
    backgroundGradientFrom: '#fed8b1',
    backgroundGradientTo: '#fed8b1',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    propsForVerticalLabels: {
      margin: "20",
      fontSize: 10
    },
  }

  return (
    <View style={styles.screens}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title2}>Combined Hashtags</Text>
        <Text>{hashList}</Text>
        <TouchableOpacity onPress={() => setData1({
          labels: hashList,
          datasets: [
            {
              data: countList
            }
          ]
        })}>
        <BarChart
          data={data1}
          width={350}
          height={650}
          chartConfig={chartConfig}
          fromZero={true}
          verticalLabelRotation={90}
          showValuesOnTopOfBars={true}
        />
        </TouchableOpacity>
        <TextInput
        style={styles.input}
        keyboardType='number-pad'
        placeholder='Enter Tag Numbers'
        onChangeText= {text1 => setText1(text1)}
        value={text1}
        />
        <TouchableOpacity onPress={() => setTagnumber(Number(text1))}>
          <Text style={{color: 'white', backgroundColor: 'darkorange'}}>Enter</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

//---------------------------------------------------------------------------Top Hashtags
function TopHashtags({ navigation }) {
  const [tagnumber, setTagnumber] = useState(5);
  const [text1, setText1] = useState('');
  const [data1, setData1] = useState({
    labels: [],
    datasets: [
      {
        data: []
      }
    ]
  });
  var hashList = [];
  var countList = [];
  database()
  .ref('/Final_Hashtag_Count')
  .orderByChild('Count')
  .limitToLast(tagnumber)
  .once('value')
  .then(snapshot => {
    console.log('All data: ', snapshot.val());
    snapshot.forEach(documentSnapshot => {
      i = documentSnapshot.val();
      console.log(i.Hashtag);
      hashList.push(i.Hashtag);
      console.log(i.Count);
      countList.push(i.Count);
    })
  });


  const chartConfig = {
    backgroundColor: 'orange',
    backgroundGradientFrom: '#fed8b1',
    backgroundGradientTo: '#fed8b1',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`
  }

  return (
    <View style={styles.screens}>
      <Text style={styles.title2}>Top Hashtags</Text>
      <Text>{hashList}</Text>
      <TouchableOpacity onPress={() => setData1({
          labels: hashList,
          datasets: [
            {
              data: countList
            }
          ]
        })}>
      <BarChart
        data={data1}
        width={400}
        height={320}
        chartConfig={chartConfig}
        fromZero={true}
        showValuesOnTopOfBars={true}
      />
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        keyboardType='number-pad'
        placeholder='Enter Tag Numbers'
        onChangeText= {text1 => setText1(text1)}
        value={text1}
      />
      <TouchableOpacity onPress={() => setTagnumber(Number(text1))}>
        <Text style={{color: 'white', backgroundColor: 'darkorange'}}>Enter</Text>
      </TouchableOpacity>
    </View>
  );
}

//---------------------------------------------------------------------------Tab Navigator
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator

      tabBarOptions={{
        labelStyle: {fontSize: 15},
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Combined" component={CombineHashtags} />
      <Tab.Screen name="Top Hashtags" component={TopHashtags} />
    </Tab.Navigator>
  );
}

function App() {
  
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  logo: {
    height: 80,
    width: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },
  title2: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subtext: {
    fontSize: 15,
    marginBottom: 20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
  screens: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fed8b1',
  },
  scroll: {
    paddingTop: 50,
    alignItems: 'center'
  },
  smallbutton: {
    fontSize: 15,
  },
  bigbutton: {
    fontSize: 25,
  },
  list: {
    padding: 10, 
  },
})

export default App;