import './File.css';
const File = ({name,size,birthtime}) =>{
    return(
        <div className='file-container'>
            <div className='file-title'>
                {name}
            </div>
            <div className='file-data'>
                {size} B,Creation date: {birthtime}
            </div>
        </div>
    );
}
export default File;