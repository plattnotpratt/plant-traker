const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Create a new plant
router.post('/', async (req, res) => {
    const { plantType, plantName, waterFrequency, userId } = req.body;
    try {
        const plant = await prisma.plant.create({
            data: {
                plantType,
                plantName,
                waterFrequency,
                user: { connect: { id: userId } },
            },
        });
        res.json(plant);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

// Get all plants
router.get('/', async (req, res) => {
    try {
        const plants = await prisma.plant.findMany();
        res.json(plants);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

// Get a plant by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const plant = await prisma.plant.findUnique({
            where: { id: parseInt(id) },
        });
        if (!plant) {
            return res.status(404).json({ error: 'Plant not found' });
        }
        res.json(plant);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

// Update a plant by ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { plantType, plantName, waterFrequency } = req.body;
    try {
        const plant = await prisma.plant.update({
            where: { id: parseInt(id) },
            data: {
                plantType,
                plantName,
                waterFrequency,
            },
        });
        res.json(plant);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

// Delete a plant by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.plant.delete({
            where: { id: parseInt(id) },
        });
        res.sendStatus(204);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

module.exports = router;