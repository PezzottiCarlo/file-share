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
    function formatSize(size){
        let check = true;
        let c = 0; 
        let newSize = size;
        let dim = 'B';
        while(check){
            if(getlength(newSize)>3){
                c++;
                newSize = Math.trunc(newSize/1024);
                console.log(newSize);
            }else{
                check=false;
            }
        }
        if(c == 1){
            dim = 'KB';
        }else if(c==2){
            dim = 'MB';
        }
        return newSize + ' ' + dim;
    }
    function getlength(number) {
        return number.toString().length;
    }

    return(
        <div className='File'>
            <div className='file-title'>
                {name}
            </div>
            <div className='file-size'>
                {formatSize(size)}
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