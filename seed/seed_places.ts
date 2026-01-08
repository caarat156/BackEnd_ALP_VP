// seed/seed_places.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const placesData = [
  {
    "placeName": "Balai Pemuda",
    "placeDescription": "Pusat kesenian dan kebudayaan ikonik di jantung kota Surabaya.",
    "address": "Jl. Gubernur Suryo No.15, Embong Kaliasin, Kec. Genteng, Surabaya",
    "placeCategoryId": 2,
    "locationId": 1,
    "gmapsLink": "https://www.google.com/maps/search/?api=1&query=Balai+Pemuda+Surabaya",
    "imageUrl": "https://placehold.co/600x400?text=Balai+Pemuda+Surabaya"
  },
  {
    "placeName": "Taman Budaya Yogyakarta",
    "placeDescription": "Venue legendaris untuk pameran seni, teater, dan konser musik.",
    "address": "Jl. Sriwedani No.1, Ngupasan, Kec. Gondomanan, Yogyakarta",
    "placeCategoryId": 2,
    "locationId": 2,
    "gmapsLink": "https://www.google.com/maps/search/?api=1&query=Taman+Budaya+Yogyakarta",
    "imageUrl": "https://placehold.co/600x400?text=TBY+Jogja"
  },
  {
    "placeName": "Taman Ismail Marzuki",
    "placeDescription": "Pusat kesenian dan kebudayaan Jakarta yang memiliki teater modern.",
    "address": "Jl. Cikini Raya No.73, Menteng, Jakarta Pusat",
    "placeCategoryId": 2,
    "locationId": 3,
    "gmapsLink": "https://www.google.com/maps/search/?api=1&query=Taman+Ismail+Marzuki",
    "imageUrl": "https://placehold.co/600x400?text=TIM+Jakarta"
  },
  {
    "placeName": "Taman Balekambang",
    "placeDescription": "Taman kota bersejarah peninggalan Mangkunegaran yang asri.",
    "address": "Jl. Balekambang, Manahan, Kec. Banjarsari, Surakarta",
    "placeCategoryId": 2,
    "locationId": 4,
    "gmapsLink": "https://www.google.com/maps/search/?api=1&query=Taman+Balekambang+Solo",
    "imageUrl": "https://placehold.co/600x400?text=Balekambang+Solo"
  },
  {
    "placeName": "Selasar Sunaryo Art Space",
    "placeDescription": "Ruang seni kontemporer dengan galeri terbuka dan pemandangan bukit.",
    "address": "Jl. Bukit Pakar Timur No.100, Ciburial, Bandung",
    "placeCategoryId": 2,
    "locationId": 5,
    "gmapsLink": "https://www.google.com/maps/search/?api=1&query=Selasar+Sunaryo+Bandung",
    "imageUrl": "https://placehold.co/600x400?text=Selasar+Sunaryo"
  },
  {
    "placeName": "Istana Maimun",
    "placeDescription": "Istana Kesultanan Deli yang megah dengan arsitektur Melayu.",
    "address": "Jl. Brigjend Katamso No.66, A U R, Kec. Medan Maimun, Medan",
    "placeCategoryId": 2,
    "locationId": 6,
    "gmapsLink": "https://www.google.com/maps/search/?api=1&query=Istana+Maimun+Medan",
    "imageUrl": "https://placehold.co/600x400?text=Istana+Maimun"
  },
  {
    "placeName": "Fort Rotterdam",
    "placeDescription": "Benteng peninggalan Belanda yang kini menjadi museum budaya.",
    "address": "Jl. Ujung Pandang, Bulo Gading, Kec. Ujung Pandang, Makassar",
    "placeCategoryId": 2,
    "locationId": 7,
    "gmapsLink": "https://www.google.com/maps/search/?api=1&query=Fort+Rotterdam+Makassar",
    "imageUrl": "https://placehold.co/600x400?text=Fort+Rotterdam"
  },
  {
    "placeName": "Ubud Monkey Forest",
    "placeDescription": "Cagar alam dan kompleks pura yang menjadi habitat kera ekor panjang.",
    "address": "Jl. Monkey Forest, Ubud, Gianyar, Bali",
    "placeCategoryId": 2,
    "locationId": 8,
    "gmapsLink": "https://www.google.com/maps/search/?api=1&query=Ubud+Monkey+Forest",
    "imageUrl": "https://placehold.co/600x400?text=Ubud+Bali"
  },
  {
    "placeName": "Taman Krida Budaya",
    "placeDescription": "Pusat kegiatan budaya dan pertunjukan seni khas Jawa Timur.",
    "address": "Jl. Soekarno Hatta No.7, Jatimulyo, Kec. Lowokwaru, Malang",
    "placeCategoryId": 2,
    "locationId": 9,
    "gmapsLink": "https://www.google.com/maps/search/?api=1&query=Taman+Krida+Budaya+Malang",
    "imageUrl": "https://placehold.co/600x400?text=Krida+Budaya+Malang"
  },
  {
    "placeName": "Lawang Sewu",
    "placeDescription": "Gedung bersejarah bekas kantor kereta api dengan arsitektur memukau.",
    "address": "Jl. Pemuda, Sekayu, Kec. Semarang Tengah, Semarang",
    "placeCategoryId": 2,
    "locationId": 10,
    "gmapsLink": "https://www.google.com/maps/search/?api=1&query=Lawang+Sewu+Semarang",
    "imageUrl": "https://placehold.co/600x400?text=Lawang+Sewu"
  },
  {
    "placeName": "Museum Adityawarman",
    "placeDescription": "Museum budaya Sumatera Barat dengan arsitektur Rumah Gadang.",
    "address": "Jl. Diponegoro No.10, Belakang Tangsi, Padang",
    "placeCategoryId": 2,
    "locationId": 11,
    "gmapsLink": "https://www.google.com/maps/search/?api=1&query=Museum+Adityawarman+Padang",
    "imageUrl": "https://placehold.co/600x400?text=Museum+Adityawarman"
  },
  {
    "placeName": "Monumen Yesus Memberkati",
    "placeDescription": "Patung Yesus setinggi 50 meter yang menjadi ikon kota Manado.",
    "address": "Winangun Satu, Kec. Malalayang, Kota Manado",
    "placeCategoryId": 2,
    "locationId": 12,
    "gmapsLink": "https://www.google.com/maps/search/?api=1&query=Monumen+Yesus+Memberkati",
    "imageUrl": "https://placehold.co/600x400?text=Manado+Icon"
  },
  {
    "placeName": "Jembatan Barelang",
    "placeDescription": "Ikon kota Batam yang terdiri dari enam jembatan penghubung pulau.",
    "address": "Jl. Trans Barelang, Galang, Batam",
    "placeCategoryId": 2,
    "locationId": 13,
    "gmapsLink": "https://www.google.com/maps/search/?api=1&query=Jembatan+Barelang+Batam",
    "imageUrl": "https://placehold.co/600x400?text=Jembatan+Barelang"
  },
  {
    "placeName": "Desa Adat Kete Kesu",
    "placeDescription": "Desa tradisional dengan rumah Tongkonan dan situs pemakaman kuno.",
    "address": "Kete Kesu, Rantepao, Tana Toraja",
    "placeCategoryId": 2,
    "locationId": 14,
    "gmapsLink": "https://www.google.com/maps/search/?api=1&query=Kete+Kesu+Toraja",
    "imageUrl": "https://placehold.co/600x400?text=Kete+Kesu"
  },
  {
    "placeName": "Museum Tsunami Aceh",
    "placeDescription": "Museum simbolis untuk mengenang bencana tsunami 2004.",
    "address": "Jl. Sultan Iskandar Muda, Sukaramai, Banda Aceh",
    "placeCategoryId": 2,
    "locationId": 15,
    "gmapsLink": "https://www.google.com/maps/search/?api=1&query=Museum+Tsunami+Aceh",
    "imageUrl": "https://placehold.co/600x400?text=Museum+Tsunami"
  },
  {
    "placeName": "Benteng Kuto Besak",
    "placeDescription": "Benteng keraton bersejarah di tepi Sungai Musi.",
    "address": "Jl. Sultan Mahmud Badarudin, 19 Ilir, Palembang",
    "placeCategoryId": 2,
    "locationId": 16,
    "gmapsLink": "https://www.google.com/maps/search/?api=1&query=Benteng+Kuto+Besak",
    "imageUrl": "https://placehold.co/600x400?text=Kuto+Besak"
  },
  {
    "placeName": "Rumah Radakng",
    "placeDescription": "Replika rumah panjang adat Dayak terbesar di Indonesia.",
    "address": "Jl. Sutan Syahrir, Sungai Bangkong, Pontianak",
    "placeCategoryId": 2,
    "locationId": 17,
    "gmapsLink": "https://www.google.com/maps/search/?api=1&query=Rumah+Radakng+Pontianak",
    "imageUrl": "https://placehold.co/600x400?text=Rumah+Radakng"
  },
  {
    "placeName": "Gong Perdamaian Dunia",
    "placeDescription": "Monumen simbol perdamaian di pusat kota Ambon.",
    "address": "Jl. Slamet Riyadi, Uritetu, Sirimau, Ambon",
    "placeCategoryId": 2,
    "locationId": 18,
    "gmapsLink": "https://www.google.com/maps/search/?api=1&query=Gong+Perdamaian+Dunia+Ambon",
    "imageUrl": "https://placehold.co/600x400?text=Gong+Perdamaian"
  },
  {
    "placeName": "Anjung Seni Idrus Tintin",
    "placeDescription": "Gedung pertunjukan seni termegah di Riau dengan arsitektur Melayu.",
    "address": "Jl. Jenderal Sudirman, Simpang Tiga, Pekanbaru",
    "placeCategoryId": 2,
    "locationId": 19,
    "gmapsLink": "https://www.google.com/maps/search/?api=1&query=Anjung+Seni+Idrus+Tintin",
    "imageUrl": "https://placehold.co/600x400?text=Anjung+Seni"
  },
  {
    "placeName": "Taman Mayura",
    "placeDescription": "Taman air bersejarah peninggalan Kerajaan Karangasem.",
    "address": "Jl. Purbasari, Mayura, Kec. Cakranegara, Mataram",
    "placeCategoryId": 2,
    "locationId": 20,
    "gmapsLink": "https://www.google.com/maps/search/?api=1&query=Taman+Mayura+Lombok",
    "imageUrl": "https://placehold.co/600x400?text=Taman+Mayura"
  },
  {
    "placeName": "Pantai Lasiana",
    "placeDescription": "Pantai populer dengan pohon lontar dan ombak yang tenang.",
    "address": "Kelurahan Lasiana, Kec. Kelapa Lima, Kupang",
    "placeCategoryId": 2,
    "locationId": 21,
    "gmapsLink": "https://www.google.com/maps/search/?api=1&query=Pantai+Lasiana+Kupang",
    "imageUrl": "https://placehold.co/600x400?text=Pantai+Lasiana"
  },
  {
    "placeName": "Bukit Jokowi",
    "placeDescription": "Spot wisata untuk melihat pemandangan Teluk Youtefa dari ketinggian.",
    "address": "Skyland, Jayapura, Papua",
    "placeCategoryId": 2,
    "locationId": 22,
    "gmapsLink": "https://www.google.com/maps/search/?api=1&query=Bukit+Jokowi+Jayapura",
    "imageUrl": "https://placehold.co/600x400?text=Bukit+Jokowi"
  },
  {
    "placeName": "Candi Borobudur",
    "placeDescription": "Candi Buddha terbesar di dunia, warisan budaya UNESCO.",
    "address": "Jl. Badrawati, Kec. Borobudur, Magelang",
    "placeCategoryId": 2,
    "locationId": 23,
    "gmapsLink": "https://www.google.com/maps/search/?api=1&query=Candi+Borobudur",
    "imageUrl": "https://placehold.co/600x400?text=Borobudur"
  },
  {
    "placeName": "Alun-Alun Tegal",
    "placeDescription": "Ruang publik pusat kota yang asri dengan air mancur menari.",
    "address": "Jl. Pancasila, Mangkukusuman, Tegal",
    "placeCategoryId": 2,
    "locationId": 24,
    "gmapsLink": "https://www.google.com/maps/search/?api=1&query=Alun+Alun+Tegal",
    "imageUrl": "https://placehold.co/600x400?text=Alun+Alun+Tegal"
  },
  {
    "placeName": "Menara Siger",
    "placeDescription": "Ikon Lampung berupa menara mahkota di titik nol Sumatera.",
    "address": "Jl. Lintas Sumatera, Bakauheni, Lampung",
    "placeCategoryId": 2,
    "locationId": 25,
    "gmapsLink": "https://www.google.com/maps/search/?api=1&query=Menara+Siger+Lampung",
    "imageUrl": "https://placehold.co/600x400?text=Menara+Siger"
  }
];

async function main() {
  console.log('🚀 Start seeding Places...');

  // Using a loop with index to assign IDs manually (1 to 25)
  // This matches the order of your "seed_pensi.ts" logic.
  let index = 1;
  for (const place of placesData) {
    
    // We use "upsert" (Update or Insert)
    // If ID exists (from the previous pensi script), we UPDATE it with this good data.
    // If ID doesn't exist, we CREATE it.
    await prisma.place.upsert({
      where: { place_id: index },
      update: {
        place_name: place.placeName,
        place_description: place.placeDescription,
        address: place.address,
        gmaps_link: place.gmapsLink,
        image_url: place.imageUrl,
        location_id: place.locationId,
        place_category_id: place.placeCategoryId
      },
      create: {
        place_id: index, // Force specific ID
        place_name: place.placeName,
        place_description: place.placeDescription,
        address: place.address,
        gmaps_link: place.gmapsLink,
        image_url: place.imageUrl,
        location_id: place.locationId,
        place_category_id: place.placeCategoryId
      }
    });

    console.log(`   ✅ Processed [ID:${index}]: ${place.placeName}`);
    index++;
  }

  console.log('✨ Places updated successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });