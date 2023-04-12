async function pollDummyDatabase(query){
    if (query === 'all'){
        const response = await fetch(`https://dummyjson.com/products?limit=0`);
        const data = await response.json();
        return data;
    } else if(query !== 'all'){
        const response = await fetch(`https://dummyjson.com/products/search?q=${query}`);
        const data = await response.json();
        return data;
    };
};

module.exports = pollDummyDatabase;