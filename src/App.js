import './App.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import LoginScreen from './components/Login';
import MainScreen from './components/MainScreen';
import Register from './components/Register';
function App() {
  const data=localStorage.getItem('expenseUser')
  const currentUser=JSON.parse(data)
  return (
    <div>
    <Router>
      <Switch>
        <Route path='/' exact><MainScreen currentUser={currentUser}></MainScreen></Route>
        <Route path='/login' component={(props)=>{return <LoginScreen {...props} currentUser={currentUser} ></LoginScreen>}}></Route>
        <Route path='/register'  ><Register currentUser={currentUser}></Register></Route>
      </Switch>
    </Router>
    </div>
  );
}

export default App;
