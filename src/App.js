import { Component } from 'react';
import React from 'react';
import logo from './logo.svg';
import './App.css';
var uuid = require('uuid');
var firebase = require('firebase')


var firebaseConfig = {
  apiKey: "your api key",
  authDomain: "survey-with-react.firebaseapp.com",
  databaseURL: "https://survey-with-react.firebaseio.com",
  projectId: "survey-with-react",
  storageBucket: "survey-with-react.appspot.com",
  messagingSenderId: "824797606606",
  appId: "1:824797606606:web:ba3d62b9d1e5a4548e969f",
  measurementId: "G-9SSWP24T4T"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: uuid.v1(),
      name: '',
      email: '',
      companyName: '',
      answers: {
        q1: '',
        q2: '',
        q3: '',
        q4: '',
        q5: '',
      },
      submitted: false
    }
    this.handleQuestionChange = this.handleQuestionChange.bind(this);
  }
  //handles form submission
  handleFormSubmittion(event) {
    var name = this.refs.name.value;
    var email = this.refs.email.value;
    var companyname = this.refs.companyname.value;
    this.setState({ name: name, email: email, companyName: companyname });


  }
  //handles quesion submission
  handleQuestionSubmit() {
    console.log("this will be submitted")
    firebase.database().ref('surveys/'+this.state.id).set({
      name: this.state.name,
      email: this.state.email,
      companyName: this.state.companyName,
      answers: this.state.answers
    });
    this.setState({submitted:true});
      


  }
  //handles the answer picked
  handleQuestionChange(event) {
    // console.log(event.target.value)
    var ans = this.state.answers;
    if (event.target.name === 'q1') {
      ans.q1 = event.target.value;
    }
    if (event.target.name === 'q2') {
      ans.q2 = event.target.value;
    }
    if (event.target.name === 'q3') {
      ans.q3 = event.target.value;
    }
    if (event.target.name === 'q4') {
      ans.q4 = event.target.value;
    }
    if (event.target.name === 'q5') {
      ans.q5 = event.target.value;
    }
    this.setState({ answers: ans }, function () {
      console.log(this.state)
    })

  }

  render() {
    var user;
    var questions;
    var thankyou;
    //conditions
    if (this.state.name && this.state.submitted === false) {
      user = <h2>Welcome {this.state.name}</h2>
      questions = <span>
        <div className="form_contain qform">
          <form onSubmit={this.handleQuestionSubmit.bind(this)}>
            <div>
              <label htmlFor="">1. Which of our product(s) services do you engage with</label><br />
              <input type="radio" name="q1" value="barcode" onChange={this.handleQuestionChange} /> Barcode<br />
              <input type="radio" name="q1" value="gln" onChange={this.handleQuestionChange} /> GLN Numbers<br />
              <input type="radio" name="q1" value="product directory" onChange={this.handleQuestionChange} /> Product directory<br />
            </div>
            <div>
              <label htmlFor="">2. Please rate our services in terms of meeting your expectations?</label><br />
              <input type="radio" name="q2" value="Strongly Dissatisfied" onChange={this.handleQuestionChange} />Strongly Dissatisfied<br />
              <input type="radio" name="q2" value="Dissatisfied" onChange={this.handleQuestionChange} /> Dissatisfied <br />
              <input type="radio" name="q2" value="product directory" onChange={this.handleQuestionChange} /> Satisfied<br />
            </div>
            <div>
              <label htmlFor="">3. Which of our departments have you interacted with? (You may tick multiple options)</label><br />
              <input type="radio" name="q3" value="it" onChange={this.handleQuestionChange} /> I.T<br />
              <input type="radio" name="q3" value="membership" onChange={this.handleQuestionChange} /> Membership<br />
              <input type="radio" name="q3" value="Solution Unit" onChange={this.handleQuestionChange} /> Solution unit<br />
            </div>
            <div>
              <label htmlFor="">4. How easy did you find it to have your request (enquiries/complaints) resolved?</label><br />
              <input type="radio" name="q4" value="Very difficult" onChange={this.handleQuestionChange} /> Very difficult<br />
              <input type="radio" name="q4" value="Difficult" onChange={this.handleQuestionChange} /> Difficult<br />
              <input type="radio" name="q4" value="Easy" onChange={this.handleQuestionChange} /> Easy<br />
            </div>
            <div>
              <label htmlFor="">5. Have you benefited from any of our Value-added services from GS1 Nigeria</label><br />
              <input type="radio" name="q5" value="Very much" onChange={this.handleQuestionChange} /> Very much<br />
              <input type="radio" name="q5" value="Little" onChange={this.handleQuestionChange} /> Little<br />
              <input type="radio" name="q5" value="Not at all" onChange={this.handleQuestionChange} /> Not at all<br />
            </div>
            <input type="submit" value="submit" />
          </form>
        </div>

      </span>
    }
    else if (!this.state.name && this.state.submitted === false) {
      user = <span>
        <h2>Please enter your name and email to begin</h2>
        <div className="form_contain">

          <form onSubmit={this.handleFormSubmittion.bind(this)}>
            {/* <label htmlFor="">Name</label><br/> */}
            <input type="text" ref="name" placeholder="Full name" /><br />
            <input type="email" ref="email"  placeholder="Email" /><br />
            <input type="text" ref="companyname"  placeholder="Company Name" /><br />
            <input type="submit" value="submit" className="btn" />
          </form>
        </div>

      </span>
      questions = '';

    } else if (this.state.submitted === true) {
      thankyou=<span>
        <div>
          <p>Thanks for filling out our survey</p>
        </div>
      </span>

    }

    return (
      <div className="App contain">
        <h1 className="survey">GS1 SURVEY</h1>
        <div className="container">
          <div className="flex-a">
            {user}
            {questions}
            {thankyou}
          </div>

        </div>

      </div>
    )
  }
}


export default App;
