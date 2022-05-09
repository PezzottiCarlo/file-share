import './App.css';
import { useEffect,useState} from 'react';
import File from './components/File/File';

function App() {
  const [files,setFiles] = useState([])
  useEffect(()=>{
    const fetchList = async() =>{
      let res = await fetch('/list');
      let data = await res.json();
      setFiles(data);
    }
    fetchList();
  },[])
  return (
    <div className='App'>
      <div className='file-list'>
        {
          files.map(file => {
            return (
            <div className='file-container'>
              <File name={file.name} size={file.size} birthtime={file.birthtime}/>
            </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default App;
