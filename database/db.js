const { Pool } = require("pg");
require("dotenv").config();

const connectionString = `postgress://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_DATABASEPORT}/${process.env.DB_DATABASE}`;
const connection = {
    connectionString: process.env.DATABASE_URL ? process.env.DATABASE_URL : connectionString,
    ssl: { rejectUnauthorized: false },
};

const pool = new Pool(connection);

let db = {
    query: (queryString, params) => {
        console.log(queryString);
        return pool.query(queryString, params);
    },
    select: (table, cols, conditional, params) => {
        const colString = `(${cols.join(", ")})`;
        params = params.length > 0 ? params : [];

        const commandString = `SELECT ${colString} FROM ${table} WHERE ${conditional}`;
        console.log(commandString);
        return pool.query(commandString, params);
    },
    insert: (table, cols, values, returning) => {
        const colString = `(${cols.join(", ")})`;
        const valueString = [...Array(values.length).keys()].map((n) => "$" + (n + 1)).join(", ");
        const returningString = returning ? `RETURNING ${returning}` : "";

        const commandString = `INSERT INTO ${table} ${colString} VALUES (${valueString}) ${returningString};`;
        console.log(commandString);
        return pool.query(commandString, values);
    },
    update: (table, cols, condition, params, conditionParamCount) => {
        const pairs = cols.map((d, i) => `${cols[i]} = $${i + 1 + conditionParamCount}`).join(", ");

        params = params.length > 0 ? params : [];

        const commandString = `UPDATE ${table} SET ${pairs} WHERE ${condition}`;
        console.log(commandString);
        return pool.query(commandString, params);
    },
    delete: (table, condition, params) => {
        const commandString = `DELETE FROM ${table} WHERE ${condition}`;
        console.log(commandString);
        return pool.query(commandString, params);
    },
};

module.exports = db;
