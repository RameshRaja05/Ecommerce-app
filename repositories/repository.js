import { accessSync, writeFileSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import crypto from "node:crypto";

class Repository{
    constructor(filename) {
        if (!filename) {
          throw new Error("File requires for creating repository");
        }
        this.filename = filename;
        try {
          accessSync(this.filename);
        } catch (error) {
          writeFileSync(this.filename, "[]");
        }
      }
      async getAll() {
        //open the this filename
        //Read its contents
        //parse the contents
        //return the parsed data
        return JSON.parse(await readFile(this.filename, { encoding: "utf-8" }));
      }

      async create(attrs){
        attrs._id=this.randomID();
        const records=await this.getAll();
        records.push(attrs);
        await this.writeAll(records);
        return attrs;
      }
    
      async writeAll(records) {
        await writeFile(this.filename, JSON.stringify(records, null, 2));
      }
    
      randomID() {
        return crypto.randomUUID();
      }
    
      async getOne(id){
        const records=await this.getAll();
        return records.find(record=>record._id===id);
      }
    
      async delete(id){
        const records=await this.getAll();
        const filteredRecords=records.filter(record=>record._id!==id);
        await this.writeAll(filteredRecords)
      }
    
      async update(id,attrs){
        const records=await this.getAll();
        const record=records.find(record=>record._id===id);
        if(!record){
          throw new Error(`Record with id ${id} not found`);
        }
        Object.assign(record,attrs);
        await this.writeAll(records);
      }
    
      async getOneBy(filters){
        const records=await this.getAll();
        for(let record of records){
          let found=true;
          for(let key in filters){
            if(record[key]!==filters[key]){
              found=false
              break;
            }
            if(found){
              return record;
            }
          }
        }
      }
}

export default Repository;