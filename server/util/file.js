const fs = require("fs");
const nanoid = require("nanoid");

module.exports = class File {
  constructor(file_path) {
    this.file_path = file_path;
    if (!this.#path_exist(file_path)) {
      this.#create_path(file_path);
    }
    if (this.#path_is_file(file_path)) {
      throw new Error("File path is a file");
    }
    this.#init();
  }

  #init() {
    this.#create_associatation_file("associations.json");
    let files = this.list();
    for (let file of files) {
      this.#create_associatation(file.name);
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

  #get_random_name() {
    return nanoid.nanoid(5);
  }

  #create_associatation_file(file_name) {
    fs.writeFileSync(file_name, JSON.stringify({}));
  }

  #get_associations() {
    let associations = JSON.parse(fs.readFileSync("associations.json", "utf8"));
    return associations;
  }

  #get_file_name(file_id) {
    let associations = this.#get_associations();
    if (!associations[file_id]) {
      return false;
    }
    return associations[file_id];
  }

  #get_file_id(file_name) {
    let associations = this.#get_associations();
    for (let key in associations) {
      if (associations[key] === file_name) {
        return key;
      }
    }
    return false;
  }

  #create_associatation(file_name) {
    let associations = this.#get_associations();
    let index = this.#get_random_name();
    associations[index] = file_name;
    fs.writeFileSync("associations.json", JSON.stringify(associations));
    return index;
  }

  security_check(file_name) {
    return !(
      file_name.includes("..") ||
      file_name.includes("/") ||
      file_name.includes("\\") ||
      file_name.includes("%")
    );
  }

  create(file_name, buffer) {
    if (!this.#primary_check()) {
      return false;
    }
    fs.writeFileSync(this.file_path + "/" + file_name, buffer);
    let file_id = this.#get_file_id(file_name);
    if(!file_id)
      return this.#create_associatation(file_name);
    return file_id;
  }

  getFilePath(file_id) {
    let file_name = this.#get_file_name(file_id);
    if (!file_name) {
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
        id: this.#get_file_id(file)
      });
    }
    return result;
  }

  delete(file_id) {
    let file_name = this.#get_file_name(file_id);
    if (!this.#file_exist(file_name)) {
      return false;
    }
    fs.unlinkSync(this.file_path + "/" + file_name);
    return true;
  }
};
