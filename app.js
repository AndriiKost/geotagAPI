import express from 'express';
import objects from './db/db';
import bodyParser from 'body-parser';

const app = express();

// Parse incoming request data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Get all objects
app.get('/api/v1/objects', (req, res) => {
    res.status(200).send({
        success: 'true',
        message: 'Objects retrieved successfully',
        objects: objects
    })
});

// Get single object
app.get('/api/v1/objects/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);

    objects.map((ob) => {
        if (ob.id === id) {
            return res.status(200).send({
                success: 'true',
                message: 'object retrieved successfully',
                ob
            });
        }
    });
    return res.status(400).send({
        success: 'false',
        message: 'object does not exist',
    });
});

// Add new object to the db
app.post('/api/v1/objects', (req, res) => {
    if(!req.body.name) {
        return res.status(400).send({
            success: 'false',
            message: 'name is required'
        });
    } else if(!req.body.coordinates) {
        return res.status(400).send({
            success: 'false',
            message: 'coordinates is required'
          });
    } else if(!req.body.address) {
        return res.status(400).send({
            success: 'false',
            message: 'address is required'
          });
    }

    const newObject = {
        id: objects.length + 1,
        name: req.body.name,
        coordinates: req.body.coordinates,
        address: req.body.address
    }

    objects.push(newObject);
    return res.status(201).send({
        success: 'true',
        message: 'object added successfully',
        newObject
    })   
});

// Delete object from db
app.delete('/api/v1/objects/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);

    objects.map((ob, index) => {
        if (ob.id === id) {
            objects.splice(index, 1);
            return res.status(200).send({
                success: 'true',
                message: 'Object deleted successfuly',
            });
        }
    })
    return res.status(404).send({
        success: 'false',
        message: 'object not found',
    });
});

// Update object
app.put('/api/v1/objects/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    let objectFound;
    let itemIndex;
    objects.map((ob, index) => {
        if (ob.id === id) {
            objectFound = ob;
            itemIndex = index;
        }
    });

    if (!objectFound) {
        return res.status(404).send({
          success: 'false',
          message: 'object not found',
        });
      }

      if(!req.body.name) {
        return res.status(400).send({
            success: 'false',
            message: 'name is required'
        });
    } else if(!req.body.coordinates) {
        return res.status(400).send({
            success: 'false',
            message: 'coordinates is required'
          });
    } else if(!req.body.address) {
        return res.status(400).send({
            success: 'false',
            message: 'address is required'
          });
    }

    const updateObject = {
        id: objectFound.id,
        name: req.body.name || objectFound.name,
        coordinates: req.body.coordinates || objectFound.coordinates,
        address: req.body.address || objectFound.address,
    }

    objects.splice(itemIndex, 1, updateObject);

    return res.status(201).send({
        success: 'true',
        message: 'object added successfully',
        updateObject,
      });
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});