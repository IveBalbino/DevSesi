const fs = require("fs").promises;
const path = require("path");

class User{

    constructor(){
        this.filePath = path.join(__dirname,"..","database","Users.json");
    }

    async acessDB() {          
        try {
            const db = await fs.promises.readFile(this.filePath, "utf-8");
            return JSON.parse(db);
        } catch (error) {
            if (error.code === "ENOENT") {
              // Arquivo não encontrado
              await fs.writeFile(this.filePath, JSON.stringify([], null, 2));
              return [];
            } else {
              throw error; 
            }
        }
    }

    async getAllUsers(){
        return await this.acessDB();
    }

    async postUser(strLogin, strPassword){

        //verificação de erro
        try{

            //Acessar a base de dados
            const users = await this.acessDB();

            //Verificar se o strLogin existe na base de dados
            const userExist = users.find((userExist) => userExist.login === strLogin);

            //Verificar se o userExist retorno com null
            if (userExist == null){

                //Criar variável idEnd
                var idEnd = 0;

                //Retorna o valor id que existe no arquivo
                users.forEach((user) => {
                    idEnd = user.id;
                });

                var id = parseInt(idEnd) + 1 + "";
                var data_inscricao = new Date();
                var data_atual = new Date();

                //mostrar a estrutura json a ser escrita
                await users.push({ id: id, data_inscricao: data_inscricao, data_atual:data_atual, login:strLogin, password:strPassword});

                //escrever na base de dados
                await fs.writeFile(this.filePath, JSON.stringify(users));
                
                return  "Dados foram inseridos com sucesso";

            }else{

                return  "Usuário já cadastrado";
            }          

        }catch(error){

            return  "Problema ao inserir os dados. Erro:" + error;

        }
    }

    async getUser(idUser){

        try{
            const users = await this.acessDB();
            var strLogin = null;
            var msgRetorno = null;
            users.forEach((user) => {

            if (user.id === parseInt(idUser)){
                strLogin =  user.login;
                msgRetorno = "O login do usuário é " + strLogin;
                } 

            });

            if (msgRetorno === null) msgRetorno = "O id do usuário não existente na base de dados ";

            return msgRetorno;           
        }catch (error){
            return "Erro ao acessar o usuário solicitado. Erro: " + error;
        }

    }

    async updateUser(idUser, strLogin, strPassword){

        try{

            const users = await this.acessDB();
            var msgRetorno = null;

            users.forEach((user) => {
                if (user.id === parseInt(idUser)){
                    user.login = strLogin;
                    user.password = strPassword;
                    msgRetorno = "Dados alterados com sucesso.";
                }
            });
            
			if (msgRetorno === null) msgRetorno = "O id do usuário não existente na base de dados ";
			
            //escrever na base de dados
            await fs.writeFile(this.filePath, JSON.stringify(users));

            return msgRetorno;

        }catch (error){


            return "Erro ao acesso o usuário solicitado. Erro: " + error;

        }

    }
    async deleteUser(idUser){
        try{

            const users = await this.acessDB();
            var msgRetorno = null;

            const index = await users.findIndex((user) => user.id == parent(idUser));
            
            if (index !== -1) {
                users.splice(index, 1);
                //escrever na base de dados
                await fs.writeFile(this.filePath, JSON.stringify(users));
                msgRetorno = "Dados alterados com sucesso.";
            }

			if (msgRetorno === null) msgRetorno = "O id do usuário não existente na base de dados ";

            return msgRetorno;

        }catch (error){


            return "Erro ao acesso o usuário solicitado. Erro: " + error;

        } 
    }

}

module.exports = User;
