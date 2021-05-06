import * as React from 'react';
import { useState, Component } from 'react';
import { View, Text, Image, Button, TextInput, StyleSheet, ScrollView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import database, { firebase } from '@react-native-firebase/database';
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
import { Dimensions } from 'react-native'
const screenWidth = Dimensions.get('window').width

const reference = database().ref('/users/123');

const autoUpdate = false;

const glideorange = '#e68b30';
const glidegreen = '#2c400c';

HashCount = database()
.ref('/Final_Post_Scrpaed_Count')
.once('value')
.then(snapshot => {
  
  snapshot.forEach(documentSnapshot => {
    i = documentSnapshot.val();
    count = i.Count;
    console.log(i.Count);
    if (autoUpdate) {
      setCount1(count)
    }
  })
});


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
      if (autoUpdate) {
        setCount1(count)
      }
    })
  });
  return (
    <View style={styles.screens}>
      <Image style={styles.logo} source={require('./src/glide.png')}/>
      <Text style={styles.title}>Glide Hash Tags</Text>
      <TouchableOpacity onPress={() => setCount1(count)}>
        <Text style={styles.subtext}>Current Scraped Post: {count1}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Two#')}>
        <Text style={styles.homeButton}> >Two Hashtag Combination</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Three#')}>
        <Text style={styles.homeButton}> >Three Hashtag Combination</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Search')}>
        <Text style={styles.homeButton}> >Combination Search</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Top')}>
        <Text style={styles.homeButton}> >Top Hashtags</Text>
      </TouchableOpacity>
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
  .ref('/Final_Two_Count')
  .orderByChild('Count')
  .limitToLast(tagnumber)
  .once('value')
  .then(snapshot => {
    console.log('All data: ', snapshot.val());
    snapshot.forEach(documentSnapshot => {
      i = documentSnapshot.val();
      console.log(i.Hashtag1);
      console.log(i.Hashtag2);
      hashList.push(i.Hashtag1 + '+' + i.Hashtag2);
      console.log(i.Count);
      countList.push(i.Count);
    })
    if (autoUpdate) {
      setData1({
        labels: hashList,
        datasets: [
          {
            data: countList
          }
        ]
      })
    }
  });

  const chartConfig = {
    backgroundColor: glidegreen,
    backgroundGradientFrom: glidegreen,
    backgroundGradientTo: glidegreen,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    propsForVerticalLabels: {
      margin: "20",
      fontSize: 10
    },
  }

  return (
    <View style={styles.screens}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title2}>Two Hashtag Combination</Text>
        <Text>{hashList}</Text>
        <TouchableOpacity onPress={() => {
          if (text1.length == 0) {
            alert('Please enter valid number')
          } else if (text1.match(/^[0-9]+$/) != null) {
            setTagnumber(Number(text1))
          } else {
            alert('Please enter numeric values')
          }
          setData1({
            labels: hashList,
            datasets: [
              {
                data: countList
              }
            ]
          })
        }}>
        <BarChart
          data={data1}
          width={screenWidth}
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
        onChangeText= {text1 => {
          setText1(text1); 
          if (text1.length == 0){if (text1.match(/^[0-9]+$/) != null){setTagnumber(Number(text1))}}
        }}
        value={text1}
        />
        <TouchableOpacity onPress={() => {
            if (text1.length == 0) {
              alert('Please enter valid number')
            } else if (text1.match(/^[0-9]+$/) != null) {
              setTagnumber(Number(text1));
              setData1({
                labels: hashList,
                datasets: [
                  {
                    data: countList
                  }
                ]
              })
            } else {
              alert('Please enter numeric values')
            }
          }}>
          <Text style={styles.button}>Enter</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

//---------------------------------------------------------------------------Three Combine Hashtags
function CombineHashtags3({ navigation }) {
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
  .ref('/Final_Three_Count')
  .orderByChild('Count')
  .limitToLast(tagnumber)
  .once('value')
  .then(snapshot => {
    console.log('All data: ', snapshot.val());
    snapshot.forEach(documentSnapshot => {
      i = documentSnapshot.val();
      console.log(i.Hashtag1);
      console.log(i.Hashtag2);
      console.log(i.Hashtag3);
      hashList.push(i.Hashtag1 + ' + ' + i.Hashtag2 + ' + ' + i.Hashtag3);
      console.log(i.Count);
      countList.push(i.Count);
    })
    if (autoUpdate)
    {
      setData1({
        labels: hashList,
        datasets: [
          {
            data: countList
          }
        ]
      })
    }
  });

  const chartConfig = {
    backgroundColor: glidegreen,
    backgroundGradientFrom: glidegreen,
    backgroundGradientTo: glidegreen,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    propsForVerticalLabels: {
      margin: "20",
      fontSize: 10
    },
  }

  return (
    <View style={styles.screens}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title2}>Three Hashtag Combination</Text>
        <Text>{hashList}</Text>
        <TouchableOpacity onPress={() => {
          if (text1.length == 0) {
            alert('Please enter valid number')
          } else if (text1.match(/^[0-9]+$/) != null) {
            setTagnumber(Number(text1))
          } else {
            alert('Please enter numeric values')
          }
          setData1({
          labels: hashList,
          datasets: [
            {
              data: countList
            }
          ]
        })}
        }>
        <BarChart
          data={data1}
          width={screenWidth}
          height={950}
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
        onChangeText= {text1 => {
          setText1(text1); 
          if (text1.length == 0){if (text1.match(/^[0-9]+$/) != null){setTagnumber(Number(text1))}}
        }}
        value={text1}
        />
        <TouchableOpacity onPress={() => {
          if (text1.length == 0) {
            alert('Please enter valid number')
          } else if (text1.match(/^[0-9]+$/) != null) {
            setTagnumber(Number(text1));
            setData1({
              labels: hashList,
              datasets: [
                {
                  data: countList
                }
              ]
            })
          } else {
            alert('Please enter numeric values')
          }
          }}>
          <Text style={styles.button}>Enter</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

//---------------------------------------------------------------------------Combine Hashtags Search
function CombineHashtagsSearch({ navigation }) {
  const [database23, setDatabase23] = useState('/Final_Two_Count');
  const [selected2, setSelected2] = useState(true);
  const [tagnumber, setTagnumber] = useState(5);
  const [searchText, setSearchText] = useState('');
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
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
  .ref(database23)
  .orderByChild('Count')
  .limitToLast(tagnumber)
  .once('value')
  .then(snapshot => {
    console.log('All data: ', snapshot.val());
    snapshot.forEach(documentSnapshot => {
      i = documentSnapshot.val();
      if (selected2 == true) {
        if (i.Hashtag1 == searchText || i.Hashtag2 == searchText) {
          console.log(i.Hashtag1);
          console.log(i.Hashtag2);
          hashList.push(i.Hashtag1 + ' + ' + i.Hashtag2);
          console.log(i.Count);
          countList.push(i.Count);
        }
      } else if (selected2 == false) {
        if (i.Hashtag1 == searchText || i.Hashtag2 == searchText || i.Hashtag3 == searchText) {
          console.log(i.Hashtag1);
          console.log(i.Hashtag2);
          console.log(i.Hashtag3);
          hashList.push(i.Hashtag1 + ' + ' + i.Hashtag2 + ' + ' + i.Hashtag3);
          console.log(i.Count);
          countList.push(i.Count);
        }
      }
    })
    if (autoUpdate)
    {
      setData1({
        labels: hashList,
        datasets: [
          {
            data: countList
          }
        ]
      })
    }
  });

  const chartConfig = {
    backgroundColor: glidegreen,
    backgroundGradientFrom: glidegreen,
    backgroundGradientTo: glidegreen,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    propsForVerticalLabels: {
      margin: "20",
      fontSize: 10
    },
  }

  return (
    <View style={styles.screens}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title2}>Combination Search</Text>
        <View style={styles.switch}>
          <TouchableOpacity onPress={() => {
            setSelected2(true);
            setDatabase23('/Final_Two_Count');
            console.log(database23);
          }}>
            <Text style={!selected2 ? styles.notSelectedButton : styles.button}>Two Combination</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            setSelected2(false);
            setDatabase23('/Final_Three_Count');
            console.log(database23);
          }}>
            <Text style={selected2 ? styles.notSelectedButton : styles.button}>Three Combination</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => {
          if (text2.length == 0) {
            alert('Please enter valid number')
          } else if (text2.match(/^[0-9]+$/) != null) {
            setTagnumber(Number(text2))
          } else {
            alert('Please enter numeric values')
          }
          if (text1.length == 0) {
            alert('Please enter valid hashtag')
          } else {
            if (text1.length == 0) {
              if (text1.charAt(0) == '#'){
                setSearchText(text1.toLowerCase())
              } else {
                setSearchText('#' + text1.toLowerCase())
              }
            }
          }
          setData1({
            labels: hashList,
            datasets: [
              {
                data: countList
              }
            ]
          });
          if (hashList.length == 0) {
            alert('No result found in top ' + tagnumber + ' results');
          }
        }}>
        <BarChart
          data={data1}
          width={screenWidth}
          height={selected2 ? 650 : 950}
          chartConfig={chartConfig}
          fromZero={true}
          verticalLabelRotation={90}
          showValuesOnTopOfBars={true}
        />
        </TouchableOpacity>
        <View style={{flexDirection:'row'}}>
          <TextInput
          style={styles.input}
          keyboardType='default'
          placeholder='Enter Hashtag'
          autoCapitalize='none'
          onChangeText= {text1 => {
            setText1(text1);
              if (text1.length == 0) {
              if (text1.charAt(0) == '#'){
                setSearchText(text1.toLowerCase())
              } else {
                setSearchText('#' + text1.toLowerCase())
              }
            }
          }}
          value={text1}
          />
          <TextInput
          style={styles.input}
          keyboardType='number-pad'
          placeholder='Enter Search Range'
          onChangeText= {text2 => {
            setText2(text2); 
            if (text2.length == 0){if (text2.match(/^[0-9]+$/) != null){setTagnumber(Number(text2))}}
          }}
          value={text2}
          />
        </View>
        <TouchableOpacity onPress={() => {
          if (text2.length == 0) {
            alert('Please enter valid number')
          } else if (text2.match(/^[0-9]+$/) != null) {
            setTagnumber(Number(text2));
            setData1({
              labels: hashList,
              datasets: [
                {
                  data: countList
                }
              ]
            })
          } else {
            alert('Please enter numeric values')
          }
          if (text1.length == 0) {
            alert('Please enter valid hashtag')
          } else if (text1.charAt(0) == '#'){
            setSearchText(text1.toLowerCase())
          } else {
            setSearchText('#' + text1.toLowerCase())
          }
        }}>
          <Text style={styles.button}>Update</Text>
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
  .ref('/Final_One_Count')
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
    if (autoUpdate)
    {
      setData1({
        labels: hashList,
        datasets: [
          {
            data: countList
          }
        ]
      })
    }
  });


  const chartConfig = {
    backgroundColor: glidegreen,
    backgroundGradientFrom: glidegreen,
    backgroundGradientTo: glidegreen,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`
  }

  return (
    <View style={styles.screens}>
      <Text style={styles.title2}>Top Hashtags</Text>
      <Text>{hashList}</Text>
      <TouchableOpacity onPress={() => {
        if (text1.length == 0) {
          alert('Please enter valid number')
        } else if (text1.match(/^[0-9]+$/) != null) {
          setTagnumber(Number(text1))
        } else {
          alert('Please enter numeric values')
        }
        setData1({
          labels: hashList,
          datasets: [
            {
              data: countList
            }
          ]
        })
      }}>
      <BarChart
        data={data1}
        width={screenWidth}
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
          onChangeText= {text1 => {
            setText1(text1); 
            if (text1.length == 0){if (text1.match(/^[0-9]+$/) != null){setTagnumber(Number(text1))}}
          }}
          value={text1}
        />
        <TouchableOpacity onPress={() => {
          if (text1.length == 0) {
            alert('Please enter valid number')
          } else if (text1.match(/^[0-9]+$/) != null) {
            setTagnumber(Number(text1));
            setData1({
              labels: hashList,
              datasets: [
                {
                  data: countList
                }
              ]
            })
          } else {
            alert('Please enter numeric values')
          }
        }}>
          <Text style={styles.button}>Enter</Text>
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
        labelStyle: {fontSize: 15, marginBottom: 10,},
        style: {textAlign: 'center', alignItems: 'center'},
        activeTintColor: glideorange,
        inactiveTintColor: glidegreen,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Two#" component={CombineHashtags} />
      <Tab.Screen name="Three#" component={CombineHashtags3} />
      <Tab.Screen name="Search" component={CombineHashtagsSearch} />
      <Tab.Screen name="Top" component={TopHashtags} />
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
    color: glideorange,
  },
  title2: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: glideorange,
    textDecorationLine: 'underline',
    textDecorationColor: glideorange,
  },
  subtext: {
    fontSize: 15,
    marginBottom: 20,
    color: glideorange,
  },
  input: {
    color: glidegreen,
    backgroundColor: 'orange',
    textAlign: 'center',
    height: 40,
    width: 150,
    fontSize: 15,
    margin: 12,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 10
  },
  screens: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: glidegreen,
  },
  scroll: {
    paddingTop: 50,
    alignItems: 'center'
  },
  homeButton: {
    fontSize: 18,
    color: glideorange,
    padding: 10,
    textAlign: 'center',
    marginBottom: 10,
    borderColor: glideorange,
    borderWidth: 1,
    borderRadius: 10,
  },
  button: {
    fontSize: 15,
    color: glidegreen,
    backgroundColor: glideorange,
    padding: 10,
    textAlign: 'center',
  },
  switch: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  notSelectedButton: {
    fontSize: 15,
    color: glidegreen,
    backgroundColor: '#ffdfbf',
    padding: 10,
    textAlign: 'center',
  },
})

export default App;