const { User, Product, Cart, Profileimage } = require('../models');
const sequelize = require('../config/connection');
const { QueryTypes } = require('sequelize');

async function pollDummyDatabase(query){

    if(query.category === 'all'){
        if(query.term === 'all'){
            const data = await Product.findAll();
            const serialData = data.map((products)=>{
                return products.get({plain:true})
             });
            return serialData;
        } else if(query.term !== 'all'){
            const data = await sequelize.query(`SELECT * FROM product WHERE MATCH(product_name,description,category) 
                AGAINST ('${query.term}' WITH QUERY EXPANSION);`, { type: QueryTypes.SELECT });
            return data;
        }
    } else if (query.category !== 'all'){
        const data = await Product.findAll({
            where:{
                category: query.category
            }
        });
        const serialData = data.map((products)=>{
            return products.get({plain:true})
         });
        return serialData;
    } else {
        return {};
    }
};

module.exports = pollDummyDatabase;