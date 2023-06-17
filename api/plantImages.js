const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


// Create a new plant image
router.post('/', async (req, res) => {
  const { plantImageUrl, plantId } = req.body;

  try {
    const plantImage = await prisma.plantImage.create({
      data: {
        plantImageUrl,
        plant: { connect: { id: plantId } },
      },
    });

    res.json(plantImage);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create plant image' });
  }
});

// Read all plant images
router.get('/', async (req, res) => {
  try {
    const plantImages = await prisma.plantImage.findMany();
    res.json(plantImages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve plant images' });
  }
});

// Read a single plant image by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const plantImage = await prisma.plantImage.findUnique({
      where: { id: parseInt(id) },
    });

    if (!plantImage) {
      return res.status(404).json({ error: 'Plant image not found' });
    }

    res.json(plantImage);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve plant image' });
  }
});

// Update a plant image
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { plantImageUrl, plantId } = req.body;

  try {
    const plantImage = await prisma.plantImage.update({
      where: { id: parseInt(id) },
      data: {
        plantImageUrl,
        plant: { connect: { id: plantId } },
      },
    });

    res.json(plantImage);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update plant image' });
  }
});

// Delete a plant image
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.plantImage.delete({ where: { id: parseInt(id) } });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete plant image' });
  }
});


module.exports = router;