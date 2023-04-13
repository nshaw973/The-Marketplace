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
            const queryTerm = 'all categories.';
            for (let i = 0; i < serialData.length; i++){
                serialData[i].numOfResults = serialData.length;
                serialData[i].searchQuery = queryTerm;
            };
            return serialData;
        } else if(query.term !== 'all'){
            const data = await sequelize.query(`SELECT * FROM product WHERE MATCH(product_name,description,category) 
                AGAINST ('${query.term}' WITH QUERY EXPANSION);`, { type: QueryTypes.SELECT });
            const queryTerm = `"${query.term}" in all categories.`;
            for (let i = 0; i < data.length; i++){
                data[i].discountPercentage = data[i].discount_percentage;
                data[i].numOfResults = data.length;
                data[i].searchQuery = queryTerm;
            };
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
         const queryTerm = 'all categories.';
         for (let i = 0; i < serialData.length; i++){
             serialData[i].numOfResults = serialData.length;
             serialData[i].searchQuery = queryTerm;
         }
        return serialData;
    } else {
        return {};
    }
};

module.exports = pollDummyDatabase;