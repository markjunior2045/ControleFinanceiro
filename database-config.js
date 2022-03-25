const Sequelize = require('sequelize');
const sequelize = new Sequelize('finance','root','root',{
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate().then(()=>{
    console.log('Connected!');
}).catch(function(error){
    console.log('Error: ' + error);
});