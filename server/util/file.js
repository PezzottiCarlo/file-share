const fs = require("fs");
module.exports = class File {
  constructor(file_path) {
    this.file_path = file_path;
    if (!this.#path_exist(file_path)) {
      this.#create_path(file_path);
    }
    if (this.#path_is_file(file_path)) {
      throw new Error("File path is a file");
    }
  }

  #path_exist() {
    if (!fs.existsSync(this.file_path)) {
      return false;
    }
    return true;
  }

  #file_exist(file_name) {
    if (!fs.existsSync(this.file_path + "/" + file_name)) {
      return false;
    }
    return true;
  }

  #path_is_file() {
    if (!fs.lstatSync(this.file_path).isFile()) {
      return false;
    }
    return true;
  }

  #create_path() {
    if (!this.#path_exist(this.file_path)) {
      fs.mkdirSync(this.file_path);
      return true;
    }
    return false;
  }

  #primary_check() {
    if (!this.#path_exist(this.file_path)) {
      return false;
    }
    if (this.#path_is_file(this.file_path)) {
      return false;
    }
    return true;
  }

  create(file_name, buffer) {
    if (!this.#primary_check()) {
      return false;
    }
    fs.writeFileSync(this.file_path + "/" + file_name, buffer);
    return true;
  }

  pgetFilePath(file_name) {
    if (!this.#file_exist(file_name)) {
      return false;
    }
    return this.file_path + "/" + file_name;
  }

  list() {
    if (!this.#primary_check()) {
      return false;
    }
    let result = [];
    let files = fs.readdirSync(this.file_path);
    for (let file of files) {
      let { size, birthtime } = fs.lstatSync(this.file_path + "/" + file);
      result.push({
        name: file,
        size: size,
        birthtime: birthtime,
      });
    }
    return result;
  }

  delete(file_name) {
    if (!this.#primary_check()) {
      return false;
    }
    if (!this.#file_exist(file_name)) {
      return false;
    }
    fs.unlinkSync(this.file_path + "/" + file_name);
    return true;
  }
};
