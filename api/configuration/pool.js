//schema
const pool = require('./config')
 
const createUserTable = () =>{
const userCreateQuery = `
CREATE EXTENSION IF NOT EXISTS "uuid_ossp";
CREATE TABLE IF NOT EXISTS
users(
id UUID PRIMARY KEY NOT NULL UNIQUE DEFAULT  uuid_generate_v4(),
firstname VARCHAR(255) NOT NULL,
lastname VARCHAR(255) NOT NULL,
username VARCHAR(255) UNIQUE NOT NULL,
email VARCHAR(128) UNIQUE NOT NULL,
password VARCHAR(250) NOT NULL,
createdon TIMESTAMP DEFAULT NOW()
)`;
pool.query(userCreateQuery)
.then((response)=> {
    console.log(response);
    pool.end(); 
})
.catch((error)=>{
    console.log(error);
    pool.end();
})
};

const createDiaryTable =  () => {
const diaryCreateQuery = `
CREATE TABLE IF NOT EXISTS
diary(
    id UUID PRIMARY KEY NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    user_id UUID NOT NULL,
    createdon TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
)`;

pool.query(diaryCreateQuery)
.then((response) =>{
    console.log(response);
    pool.end();
})
.catch((error) =>{
    console.log(error);
    pool.end();
})
};

const dropUserTable = () =>{
    const userDropQuery = 'DROP TABLE IF EXISTS users'
    pool.query(userDropQuery)
    .then((response)=>{
        console.log(response);
        pool.end();
    })
    .catch((error)=>{
        console.log(error)
        pool.end();
    })
}

const dropDiaryTable = () =>{
    const diaryDropQuery = 'DROP TABLE IF EXIST diary'
    pool.query(diaryDropQuery)
    .then((response)=>{
        console.log(response);
        pool.end();
    })
    .catch((error)=>{
        console.log(error)
        pool.end();
    })
}
// CREATE ALL TABLES
const createAllTable = () =>{
    createUserTable,
    createDiaryTable
}
// DROP TABLES
 const dropAllTable = () =>{
     dropUserTable,
     dropDiaryTable
 }

module.exports = {createAllTable, dropAllTable}