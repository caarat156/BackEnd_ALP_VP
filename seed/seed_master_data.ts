// seed/seed_master_data.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const categoriesData = [
  {"category_name": "Kuliner"},
  {"category_name": "Pensi"},
  {"category_name": "Tempat Wisata"},
  {"category_name": "UMKM"}
];

const locationsData = [
  {"city_name": "Surabaya"},
  {"city_name": "Yogyakarta"},
  {"city_name": "Jakarta"},
  {"city_name": "Surakarta"},
  {"city_name": "Bandung"},
  {"city_name": "Medan"},
  {"city_name": "Makassar"},
  {"city_name": "Ubud"},
  {"city_name": "Malang"},
  {"city_name": "Semarang"},
  {"city_name": "Padang"},
  {"city_name": "Manado"},
  {"city_name": "Batam"},
  {"city_name": "Tana Toraja"},
  {"city_name": "Aceh"},
  {"city_name": "Palembang"},
  {"city_name": "Pontianak"},
  {"city_name": "Ambon"},
  {"city_name": "Pekanbaru"},
  {"city_name": "Mataram"},
  {"city_name": "Kupang"},
  {"city_name": "Jayapura"},
  {"city_name": "Magelang"},
  {"city_name": "Tegal"},
  {"city_name": "Lampung"}
];

async function main() {
  console.log('🚀 Start seeding Master Data...');

  // --- 1. SEED CATEGORIES ---
  console.log('📂 Seeding Categories...');
  for (const cat of categoriesData) {
    // Check if it exists first to avoid duplicates
    const exists = await prisma.place_category.findFirst({
        where: { category_name: cat.category_name }
    });

    if (!exists) {
        await prisma.place_category.create({
            data: { category_name: cat.category_name }
        });
        console.log(`   + Created Category: ${cat.category_name}`);
    } else {
        console.log(`   = Skipped Category (Already exists): ${cat.category_name}`);
    }
  }

  // --- 2. SEED LOCATIONS ---
  console.log('📍 Seeding Locations...');
  for (const loc of locationsData) {
    // Check if it exists first
    const exists = await prisma.location.findFirst({
        where: { city_name: loc.city_name }
    });

    if (!exists) {
        await prisma.location.create({
            data: { city_name: loc.city_name }
        });
        console.log(`   + Created Location: ${loc.city_name}`);
    } else {
        console.log(`   = Skipped Location (Already exists): ${loc.city_name}`);
    }
  }

  console.log('✨ Master Data Seeding finished!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });