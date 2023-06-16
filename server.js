const express = require('express');
const bodyParser = require('body-parser');
const programmer = require('./database/tables/programmer');

const app = express();
const port = 5000;

app.use(bodyParser.json());

app.get('/syncDatase', async(req, res) => {
    const database = require('./database/db');

    try {
        await database.sync();

        res.send('Database successfully sync');
    } catch (error) {
        res.send(error);
    }
});

app.post('/createProgrammer', async(req,res)=>{
    try {
        const params = req.body;

        const properties = ['name', 'javascript', 'java', 'python'];

        const check = properties.every((property)=>{
            return property in params;
        });

        if(!check){
            const propStr = properties.join(', ');
            res.send(`All parameters needed to create a programmer must be sent ${propStr}`);
        };

        const newProgrammer = await programmer.create({
            name: params.name,
            javascript: params.javascript,
            java: params.java,
            python: params.python
        });

        res.send(newProgrammer);

    } catch (error) {
        res.send(error);
    }
});

app.get('/retrieveProgrammer', async(req,res)=>{
    try {
        const params = req.body;

        if('id' in params){
            const record = await programmer.findByPk(params.id);

            if(record) {
                res.send(record);
            } else {
                res.send('No programmer found using received ID');
            }
        };
    } catch (error) {
        res.send(error);
    }
});

app.delete('/deleteProgrammer', async(req,res) => {
    try {
        const params = req.body;

        if(!('id' in params)){
            res.send('Missing "id" in request body');
            return;
        }

        const record = await programmer.findByPk(params.id);

        if(!record){
            res.send('Programmer ID not found');
            return;
        }

        await record.destroy();

        res.send(`${record.id} ${record.name} - Deleted successfully`);
    } catch (error) {
        res.send(error);
    }
})

app.put('/updateProgrammers', async (req,res) => {
    try {
        const params = req.body;

        if(!('id' in params)){
            res.send('Missing `id` in request body');
            return;
        }

        const record = await programmer.findByPk(param.id);

        if(!record){
            res.send('Programmer ID not found.');
            return;
        }

        const properties = ['name','python','java','javascript'];

        const check = properties.some((properties) => {
            return property != params;
        });

        if(!check){
            const propStr = properties.join(', ');
            res.send(`Request body doesn't have any of the following properties: ${propStr}`);
            return;
        }

        record.name = param.name || record.name;
        record.python = param.python || record.python;
        record.java = param.java || record.java;
        record.javascript = param.javascript || record.javascript;

        await record.save();

        res.send(`${record.id} ${record.name} - Update successfully`);
    } catch (error) {
        res.send(error);
    }
});

const validateID = async (params) => {
    try {
        if(!('id') in params){
            throw `Missing 'id' in request body`;
        }

        const record = await programmer.findByPk(params.id);

        if(!record){
            throw `Programmer ID not found.`;
        }

        return record;
    } catch (error) {
        throw error;
    }
}

app.listen(port,() =>{
    console.log(`Now listening on port ${port}`);
});