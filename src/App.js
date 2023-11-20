
import Month from'./components/Month';
import {LocalizationProvider} from '@mui/x-date-pickers'
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns'
import './App.scss'


function App() {

  
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="App">
        
        <Month/>
         
      </div>
    </LocalizationProvider>
    
  );
}

export default App;
