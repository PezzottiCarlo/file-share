const fs = require('fs');
module.exports = class File {
    constructor(file_path) {
        this.file_path = file_path;
        if(!this.#path_exist(file_path)){
            this.#create_path(file_path);
        }
        if(!this.#path_access(file_path)){
            throw new Error('File path is not accessible');
        }
        if(this.#path_is_file(file_path)){
            throw new Error('File path is a file');
        }
    }

    #path_exist(){
        if(!fs.existsSync(this.file_path)){
            return false;
        }
        return true;
    }

    #path_access(){
        if(!fs.accessSync(this.file_path, fs.constants.R_OK)){
            return false;
        }
        return true;
    }

    #path_is_file(){
        if(!fs.lstatSync(this.file_path).isFile()){
            return false;
        }
        return true;
    }

    #create_path(){
        if(!this.#path_exist(this.file_path)){
            fs.mkdirSync(this.file_path);
            return true;
        }
        return false;
    }


    create_file(file_name){
        if(!this.#path_exist(this.file_path)){
            return false;
        }
        if(!this.#path_access(this.file_path)){
            return false;
        }
        if(this.#path_is_file(this.file_path)){
            return false;
        }
        fs.writeFileSync(this.file_path + '/' + file_name, '');
        return true;
    }
}