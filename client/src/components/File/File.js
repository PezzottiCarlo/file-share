import './File.css';
import { HiDownload } from "react-icons/hi";
import { HiTrash } from "react-icons/hi";

const File = ({name,size,birthtime}) =>{
    function formatDate(date){
        const d = new Date(date);
        let day = d.getDate();
        let month = d.getMonth()+1;
        let year = d.getFullYear();
        if(day <10){
            day="0"+day;
        }
        if(month <10){
            month="0"+month;
        }
        return `${day}/${month}/${year}`;
    }

    return(
        <div className='File'>
            <div className='file-title'>
                {name}
            </div>
            <div className='file-size'>
                {size} B
            </div>
            <div className='file-date'>
                Creation date: {formatDate(birthtime)}
            </div>
            <div className='file-option'>
                <div className='file-download'>
                    <HiDownload/>
                </div>
                <div className='file-trash'>
                    <HiTrash/>
                </div>
            </div>
        </div>
    );
}
export default File;