const { User, Product, Cart, Profileimage } = require('../models');
const sequelize = require('../config/connection');
const { QueryTypes } = require('sequelize');

async function pollDummyDatabase(query){
    if(query === 'all'){
        const data = await Product.findAll();
        const serialData = data.map((products)=>{
            return products.get({plain:true})
         });
        return serialData;
    } else if(query !== 'all'){
        console.log(`querying: ${query}`)
        const data = await sequelize.query(`SELECT * FROM product WHERE MATCH(product_name,description,category) 
            AGAINST ('${query}' WITH QUERY EXPANSION);`, { type: QueryTypes.SELECT });
        return data;
    }
}

module.exports = pollDummyDatabase;