import logo from './logo.svg';
import './App.css';
import SignUp from './Screens/SignUp'
import Routes from './routes';
import { BrowserRouter } from 'react-router-dom';

const App = (props) =>{
    
  return(
      <BrowserRouter>
          <Routes {...props}/>
      </BrowserRouter>
  )
}

export default App;
