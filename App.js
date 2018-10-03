import React, { PureComponent } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  Alert
} from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 30
  },
  titleText: {
    fontSize: 20,
    fontFamily: "Conchin"
  },
  textInput: {
    fontSize: 16,
    marginBottom: 15
  }
});

class App extends PureComponent {
  state = {
    form: {
      user: "",
      password: "",
      email: "",
      mobile: ""
    },
    registers: []
  };

  onChangeText = stateName => value => {
    this.setState({
      form: {
        ...this.state.form,
        [stateName]: value
      }
    });
    //   this.setState(
    //     {
    //       form: Object.assign({}, this.state.form, { [stateName] : value })
    //     },
    //   );
  };

  onSubmit = () => {
    let { registers } = this.state;
    /*
    
    Jika ada id item pada object form dan id item tidak kosong, kondisi tersebut merupakan kondisi ketika sedang melakukan edit, dikarenakan saat melakukan edit kita menyimpan id item ke dalam object form.
    
    */

    if (
      this.state.form.hasOwnProperty("idItem") &&
      this.state.form.idItem >= 0
    ) {
      registers = registers.map((item, index) => {
        if (index === this.state.form.idItem) {
          /*

          ini adalah data this.state.form

          user: item.user,
          email: item.email,
          mobile: item.mobile,
          password: item.password,
          idItem: itemIndex
          
          */
          let { form } = this.state;
          delete form.idItem;
          /*
          
          
          user: item.user,
          email: item.email,
          mobile: item.mobile,
          password: item.password
          
          */
          return {
            ...item,
            ...form,
            isClick: false
          };
        }
        return item;
      });
    } else {
      /*

      ini adalah data addnew

      this.state.form

      user: item.user,
      email: item.email,
      mobile: item.mobile,
      password: item.password,
      
      */
      registers = [
        {
          ...this.state.form,
          createdAt: new Date().getTime().toString(),
          isClick: false
        },
        ...registers
      ];
    }

    // set state
    this.setState({
      form: {
        user: "",
        email: "",
        password: "",
        mobile: ""
      },
      registers: registers
    });
  };

  _keyExtractor = item => {
    return item.createdAt;
  };

  setValueForm = (item, itemIndex) => () => {
    this.setState({
      form: {
        user: item.user,
        email: item.email,
        mobile: item.mobile,
        password: item.password,
        idItem: itemIndex // penanda lagi edit
      },
      registers: this.state.registers.map((item, index) => {
        return {
          ...item,
          isClick: itemIndex === index ? true : false
        };
      })
    });
  };

  // onPressRemove = indexItemWillRemove => () => {
  //   var FiltDataRegister = this.state.registers.filter(
  //     (item, index) => index != indexItemWillRemove
  //   );
  //   this.setState({
  //     registers: FiltDataRegister
  //   });
  // };

  // onPressRemove = indexItemWillRemove => () => {
  //   var FiltDataRegister = this.state.registers.filter(
  //     idItem => idItem != indexItemWillRemove
  //   );
  //   this.setState({
  //     registers: FiltDataRegister
  //   });
  // };

  onPressDelete = () => {
    if (
      this.state.form.hasOwnProperty("idItem") &&
      this.state.form.idItem >= 0
    ) {
      this.setState({
        form: {
          user: "",
          email: "",
          password: "",
          mobile: ""
        },
        registers: this.state.registers.filter(
          (item, index) => index !== this.state.form.idItem
        )
      });
    } else {
      Alert.alert("Failed", "Tidak ada item yang terpilih");
    }

    // var FiltDataRegisteridItem = this.state.form.idItem;
    // FiltDataRegisteridItem.filter(idItem => idItem != indexDelete);
    // this.setState({
    // form: { FiltDataRegisteridItem }
    // });
  };

  _renderItemForm = ({ item, index }) => {
    return (
      <React.Fragment>
        <TouchableOpacity onPress={this.setValueForm(item, index)}>
          <View
            style={{
              backgroundColor: item.isClick === true ? "red" : "transparent"
            }}
          >
            <Text>{item.user}</Text>
            <Text>{item.password}</Text>
            <Text>{item.email}</Text>
            <Text>{item.mobile}</Text>
          </View>
        </TouchableOpacity>
        <View>
          {/* <Button
            onPress={this.onPressRemove(index)}
            title="Hapus"
            color="red"
          /> */}
        </View>
      </React.Fragment>
    );
  };

  _listFooterComponent = () => {
    if (this.state.registers.length > 0) {
      return (
        <Button onPress={this.onPressDelete} title="remove" color="#841584" />
      );
    }
    return null;
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>{"Create Account"}</Text>
        <View
          style={{
            width: "100%",
            padding: 30,
            backgroundColor: "rgb(135, 178, 186)"
          }}
        >
          <TextInput
            style={styles.textInput}
            placeholder={"user"}
            onChangeText={this.onChangeText("user")}
            value={this.state.form.user}
          />
          <TextInput
            style={styles.textInput}
            placeholder={"password"}
            secureTextEntry={true}
            onChangeText={this.onChangeText("password")}
            value={this.state.form.password}
          />
          <TextInput
            style={styles.textInput}
            placeholder={"email"}
            onChangeText={this.onChangeText("email")}
            value={this.state.form.email}
          />

          <TextInput
            style={styles.textInput}
            placeholder={"mobile"}
            onChangeText={this.onChangeText("mobile")}
            value={this.state.form.mobile}
          />

          <Button onPress={this.onSubmit} title="Submit" color="#841584" />
          <FlatList
            data={this.state.registers}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItemForm}
            ListFooterComponent={this._listFooterComponent}
          />
        </View>
      </View>
    );
  }
}

export default App;
