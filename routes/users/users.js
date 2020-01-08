const users = require('express').Router();
const { Pool } = require('pg');
const dotenv = require('dotenv').config();

const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT
});

// get all users from db
users.get('/', async (req, res) => {
    const client = await pool.connect();
    try {
        const results = await pool.query('SELECT * FROM public."users "');
        return res.status(200).json(results.rows);
    } catch (err) {
        return res.status(500).json('something went wrong');
    } finally {
        client.release();
    }
});

// add new user to the db
users.post('/', async (req, res) => {
    const firstName = req.body['firstName'];

    //parameter validation goes here
    if (firstName === undefined || firstName.toString().trim() === '') {
        return res.status(200).json({
            type: 'validationError',
            data: 'firstname is required'
        });
    }
    const client = await pool.connect();
    try {
        const result = await pool.query(
            'INSERT INTO public."users "("firstName") VALUES($1)',
            [firstName]
        );
        return res
            .status(200)
            .json({ type: 'success', data: 'User added successfully' });
    } catch (err) {
        return res
            .status(500)
            .json({ type: 'error', data: 'something went wrong' });
    } finally {
        client.release();
    }
});

module.exports = users;
