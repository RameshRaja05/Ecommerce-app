import crypto from "node:crypto";
import {promisify} from "node:util"
import Repository from "./repository.js";

const scrypt=promisify(crypto.scrypt);

class UsersRepository extends Repository {
  async create(attrs) {
    attrs._id = this.randomID();
    const salt=crypto.randomBytes(8).toString("hex");
    const buf=await scrypt(attrs.password,salt,64);
    const record={
      ...attrs,
      password:`${buf.toString("hex")}.${salt}`
    };
    const records = await this.getAll();
    records.push(record);
    await this.writeAll(records);
    return record;
  }

  async comparePasswords(savedPw,suppliedPw){
    const [hashed,salt]=savedPw.split(".");
    const hashedSuppliedPw=await scrypt(suppliedPw,salt,64);
    return hashedSuppliedPw.toString("hex")===hashed;
  }
}

const usersRepo=new UsersRepository("users.json");
export default usersRepo;
