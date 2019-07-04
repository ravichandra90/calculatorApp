import React,{Component} from 'react';
import { StyleSheet, Text, View ,TextInput } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { pressNum, enter, operation } from '../Redux/Reducers/reducer';
import Button from './CustomButton';

const baseNumber = {
  backgroundColor: '#333',
  textAlign: 'right',
  padding: 10,
  fontSize: 40,
  borderBottomWidth: 1,
  borderColor: '#fff',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    paddingTop: 20,
  },
  bottom: {
    flex: 1,
  },
  display: {
    color: '#fff',
    ...baseNumber,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#fff',
  },
});

 class App extends Component
  {

    state = {
      input: "",
      previousInputNum: "",
      operator: ""
    };

  pressNumToInput = value => {
    this.setState((prevState, props) => {
      return { input: prevState.input + value };
    });
  };

  addDecimal = value => {
    // only add decimal if there is no current decimal point present in the input area
    if (this.state.input.indexOf(".") === -1) {
      this.setState({ input: this.state.input + value });
    }
  };

  addZeroToInput = value => {
    // if this.state.input is not empty then add zero
    if (this.state.input !== "") {
      this.setState({ input: this.state.input + value });
    }
  };

  clearInput = () => {
    this.setState({
      input: "",
      previousInputNum: ""
    });
  };

  // addition
  addition = value => {
    if (this.state.previousInputNum > "") {
      this.setState((prevState, props) => {
        console.log(prevState);
        return {
          input:
            parseFloat(prevState.input) +
            parseFloat(prevState.previousInputNum),
          operator: "plus"
        };
      });
    }
    this.setState((prevState, props) => {
      console.log(prevState);
      return {
        previousInputNum: prevState.input,
        input: "",
        operator: "plus"
      };
    });
  };

  // subtraction
  subtraction = value => {
    if (this.state.previousInputNum > "") {
      this.setState((prevState, props) => {
        console.log(prevState);
        return {
          input: -(
            parseFloat(prevState.input) - parseFloat(prevState.previousInputNum)
          ),
          operator: "sub"
        };
      });
    }
    this.setState((prevState, props) => {
      console.log(prevState);
      return {
        previousInputNum: prevState.input,
        input: "",
        operator: "sub"
      };
    });
  };

  //multiplication
  multiply = value => {
    if (this.state.previousInputNum > "") {
      this.setState((prevState, props) => {
        console.log(prevState);
        return {
          input:
            parseFloat(prevState.input) *
            parseFloat(prevState.previousInputNum),
          operator: "multiply"
        };
      });
    }
    this.setState((prevState, props) => {
      console.log(prevState);
      return {
        previousInputNum: prevState.input,
        input: "",
        operator: "multiply"
      };
    });
  };

  // evaluation || = button
  evaluate = () => {
    console.log("called");
    switch (this.state.operator) {
      case "plus":
        this.setState((prevState, props) => {
          return {
            input:
              parseFloat(prevState.previousInputNum) +
              parseFloat(prevState.input),
            previousInputNum: 0
          };
        });
        break;
      case "sub":
        this.setState((prevState, props) => {
          return {
            input:
              parseFloat(prevState.previousInputNum) -
              parseFloat(prevState.input),
            previousInputNum: 0
          };
        });
        break;
      case "multiply":
        this.setState((prevState, props) => {
          return {
            input:
              parseFloat(prevState.previousInputNum) *
              parseFloat(prevState.input),
            previousInputNum: 0
          };
        });
        break;

      default:
    }
  };

render(){
  const {value, addElem,operationAction, clear, equal} = this.props;
return (
  
  <View style={styles.container}>
    <View style={styles.top}>
      <Text style={styles.display}>{this.state.input}</Text>
    </View>
    <View style={styles.bottom}>
      <View style={styles.row}>
        <Button text="7" onPress={this.pressNumToInput} />
        <Button text="8" onPress={this.pressNumToInput} />
        <Button text="9" onPress={this.pressNumToInput} />
        <Button text="X" onPress={this.multiply} />
      </View>
      <View style={styles.row}>
        <Button text="4" onPress={this.pressNumToInput} />
        <Button text="5" onPress={this.pressNumToInput} />
        <Button text="6" onPress={this.pressNumToInput} />
        <Button text="-" onPress={this.subtraction} />
      </View>
      <View style={styles.row}>
        <Button text="1" onPress={this.pressNumToInput} />
        <Button text="2" onPress={this.pressNumToInput} />
        <Button text="3" onPress={this.pressNumToInput} />
        <Button text="+" onPress={this.addition} />
      </View>
      <View style={styles.row}>
        <Button text="." onPress={this.addDecimal} />
        <Button text="0" onPress={this.pressNumToInput} />
        <Button text="Clear" onPress={this.clearInput} />
        <Button text="=" onPress={this.evaluate} special />
      </View>
    </View>
  </View>
);
 }
}

const mapStateToProps = (state) => {
      return{
        value:state.value
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    addElem: (text) => {
      console.log('action called',text)
      dispatch({
        type: 'ADD_ELEM',
        payload:text
      })
    },
    operationAction : op => ({
      type: OPERATION,
      payload: op,
    }),
    clear: () => {
      dispatch({
        type: 'CLEAR'
      })
    },
    equal: () => {
      dispatch({
        type: 'EQUAL',
      })
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);





