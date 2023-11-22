const User = require("../services/UserRepository");
const UserRepository = new User();
const UserController ={
    getAll: async (req, res) => {
        const users = await UserRepository.getAllUsers();
    
        return res.status(200).json({
          msg: "Usuários:",
          users,
        });
    },
      
    postUser: async(req, res) => {

      //Retorna as variavéis os valores dos campos do corpo de envio
      const { login, password } = req.body;

      //Retorna o processo do postUser do UserRepository
      const newUser = await UserRepository.postUser(login,password);
      return res.status(200).json({
        msg: newUser,
      });
        
    },

    getUser:async(req, res) =>{

      const idUser = req.params;
  
      const infoUser = await UserRepository.getUser(idUser);
  
      return res.status(200).json({
          msg: infoUser,
         });
    },

    updateUser: async(req, res) =>{

      const idUser = req.params;
	  
	    const { login, password } = req.body;

      const updUser = await UserRepository.updateUser(idUser,login,password );

      return res.status(200).json({
        msg: updUser,
       });
      
    },

    deleteUser:async(req, res) =>{
      const idUser = req.params;

      const delUser = await UserRepository.deleteUser(idUser);

      return res.status(200).json({
        msg: delUser,
       });
    },
};
module.exports = UserController;