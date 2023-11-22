const { Router } = require("express");
const UserControllers = require("../controllers/UserController");
const UserController = new UserControllers();

const router = Router();
router.get("/acesso", (req, res) => {
    UserController.getAll(req,res); 
});
router.post("/cadastro", (req, res) => {
    UserController.postUser(req,res);
});

router.get("/acesso/:isbn", (req, res) => {
    UserController.getUser(req,res);
 });









 router.put("/atualiza/:isbn", (req, res) => {
    UserController.updateUser(req,res);
 });
  
 router.delete("/deleta/:isbn", (req, res) => {
    UserController.deleteUser(req,res);
 });
module.exports = router;