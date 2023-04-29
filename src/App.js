import homesvg from './home.gif'
import './App.css';
import FileUploader from './components/Fileuploader';

function App() {
  return (
    <div className="App">
      <div className='header'>
        <h3 className="animate-charcter"><span className='text_green'>H</span>ealthy <span className='text_green'>H</span>eart</h3>
      </div>
      <div className='container'>
        <div className='left'>
          <img src={homesvg} alt='' />
        </div>
        <div className='right'>
          <FileUploader/>
        </div>
      </div>
    </div>
  );
}

export default App;
