// seed.ts

const { PrismaClient } = require("@prisma/client");
const faker = require('faker');

const prisma = new PrismaClient();

async function seed() {
    // Create users
    const users = [
        {
            id: 2,
            email: 'user1@example.com',
            password: 'password1',
            fname: 'John',
            lname: 'Doe',
            role: 'USER',
            plantLimit: 3,
        },
        {
            id: 1,
            email: 'user2@example.com',
            password: 'password2',
            fname: 'Jane',
            lname: 'Smith',
            role: 'EDITOR',
            plantLimit: 5,
        },
        // Add more users here if needed
    ];
    const plants = [
        {
            id: 2,
            plantType: 'Rose',
            plantName: 'Red Rose',
            waterFrequency: 2,
            userId: 2,
        },
        {
            id: 1,
            plantType: 'Lily',
            plantName: 'White Lily',
            waterFrequency: 3,
            userId: 1,
        },
    ];
    const plantImages = [
        {
            plantImageUrl: 'https://example.com/plant1.jpg',
            plantId: 2,
        },
        {
            plantImageUrl: 'https://example.com/plant2.jpg',
            plantId: 1,
        },
        // Add more plant images here if needed
    ];
    await prisma.User.createMany({ data: users });
    await prisma.plant.createMany({ data: plants });
    await prisma.plantImage.createMany({ data: plantImages });

    console.log('Seeding completed!');
}

seed()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
