import Repository from "./repository.js";

class CartsRepository extends Repository{};

const cartsRepo=new CartsRepository("carts.json");

export default cartsRepo;