const express = require('express');
const app = express();
const port = 3000;
const connectdb = require ("./config/connectdb");
const user = require('./model/user');

require("dotenv").config()
connectdb()
const create = async ()=>{
    try {
        const newuser =  new user({
            name:"mohamed",
            age:30,
            favoriteFood:["pizza"]
        })
        await newuser.save()
    
    } catch (error) {
        
    }
}

//create()
const createMany = async ()=>{
    try {
        const result = await user.insertMany([
            {name: 'John', age: 25, favoriteFood: ['Burger', 'Fries']},
            {name:'yassine', age: 35, favoriteFood:['pasta']},
            {name: 'ahmed', age: 22, favoriteFood: ['hot dog']}
        ])
        
        console.log(result)
    
    } catch (error) {
        
    }
}

//createMany()

const findUser = async ()=>{
    try {
        const result = await user.find()
        
        console.log(result)
    
    } catch (error) {
        
    }
}
//findUser()

const findOneUser = async ()=>{
    try {
        const result = await user.findOne({favoriteFood:"pasta"})
        
        console.log(result)
    
    } catch (error) {
        
    }
}
//findOneUser()
const findById = async ()=>{
    try {
        const result = await user.findById('65d8808e506b114590df0efe')
        
        console.log(result)
    
    } catch (error) {
        
    }
}
//findById()

const findByIdAndUpdate = async () => {
    try {
        const result = await user.findById('65d8808e506b114590df0efe');

        // Ajoutez "hamburger" à la liste des aliments préférés
        result.favoriteFood.push('hamburger');

        await result.save();

        console.log('Personne mise à jour avec succès :', result);
    } catch (error) {
       
    }
};

//findByIdAndUpdate();
const findOneAndUpdate = async () => {
    try {
        
        //  findOneAndUpdate pour trouver et mettre à jour la personne par nom
        const result = await user.findOneAndUpdate(
            { name: 'yassine' },{ age: 48 } , {new:true}
        );
        console.log(result);
       
        
    } catch (error) {
        
    }
};

//findOneAndUpdate();

const findByIdAndDelete = async () => {
    try {
        const personIdToRemove = '65d8808e506b114590df0efe'; //  l'_id réel de la personne à supprimer

        const removedPerson = await user.findByIdAndDelete(personIdToRemove);

      console.log(removedPerson)
    } catch (error) {

    }
};

//findByIdAndDelete();
const DelateManyDocuments = async () => {
    try {
        const result = await user.deleteMany({ name: 'Mary' });

        console.log(result);
        
    } catch (error) {
        
    }
};

//DelateManyDocuments();

const SearchQuery= async ()=>{
    try{
        const result = await user.find({favoriteFood:"borritos"}).sort({name:1}).limit(2).select("-age").exec() 
        console.log(result);   
    }
    catch(error){

    }
}
//SearchQuery()




app.listen(port, (err) => {
  err? console.log(err): console.log("Server is running at localhost 3000");
});