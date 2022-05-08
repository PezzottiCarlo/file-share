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

    #path_exist(file_path){
        if(!fs.existsSync(file_path)){
            return false;
        }
        return true;
    }

    #path_access(file_path){
        if(!fs.accessSync(file_path, fs.constants.R_OK)){
            return false;
        }
        return true;
    }

    #path_is_file(file_path){
        if(!fs.lstatSync(file_path).isFile()){
            return false;
        }
        return true;
    }

    #create_path(file_path){
        if(!this.#path_exist(file_path)){
            fs.mkdirSync(file_path);
            return true;
        }
        return false;
    }
}