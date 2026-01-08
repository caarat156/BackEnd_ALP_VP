// seed/seed_pensi.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const rawData = [
  {
    "placeId": 1,
    "title": "Surabaya Stand Up Comedy Night",
    "description": "Malam penuh tawa bersama komika-komika lokal Surabaya yang siap mengocok perut.",
    "venueAddress": "Gedung Cak Durasim, Surabaya",
    "imageUrl": "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=600",
    "schedules": "[{\"date\":\"2025-09-12\",\"startTime\":\"19:00:00\",\"endTime\":\"22:00:00\",\"price\":75000}]"
  },
  {
    "placeId": 1,
    "title": "Konser Amal: Hati untuk Semeru",
    "description": "Konser musik amal yang menampilkan band-band indie lokal untuk donasi bencana.",
    "venueAddress": "Gedung Cak Durasim, Surabaya",
    "imageUrl": "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=600",
    "schedules": "[{\"date\":\"2025-09-20\",\"startTime\":\"18:00:00\",\"endTime\":\"23:00:00\",\"price\":50000}]"
  },
  {
    "placeId": 1,
    "title": "Festival Tari Remo Se-Jatim",
    "description": "Kompetisi tari Remo tingkat provinsi yang diikuti oleh ratusan sanggar tari.",
    "venueAddress": "Gedung Cak Durasim, Surabaya",
    "imageUrl": "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600",
    "schedules": "[{\"date\":\"2025-10-05\",\"startTime\":\"09:00:00\",\"endTime\":\"17:00:00\",\"price\":20000}]"
  },
  {
    "placeId": 1,
    "title": "Pameran Lukisan: Warna Pahlawan",
    "description": "Pameran seni rupa yang menampilkan karya pelukis muda bertema kepahlawanan.",
    "venueAddress": "Galeri Cak Durasim, Surabaya",
    "imageUrl": "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=600",
    "schedules": "[{\"date\":\"2025-11-10\",\"startTime\":\"10:00:00\",\"endTime\":\"20:00:00\",\"price\":15000}]"
  },
  {
    "placeId": 1,
    "title": "Teater Kampus: Bunga Penutup Abad",
    "description": "Pentas teater adaptasi novel klasik yang dibawakan oleh UKM Teater Universitas Airlangga.",
    "venueAddress": "Gedung Cak Durasim, Surabaya",
    "imageUrl": "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=600",
    "schedules": "[{\"date\":\"2025-12-15\",\"startTime\":\"19:00:00\",\"endTime\":\"21:00:00\",\"price\":30000}]"
  },
  {
    "placeId": 2,
    "title": "Jogja Hip Hop Foundation Concert",
    "description": "Konser musik hip hop dengan sentuhan gamelan dan lirik bahasa Jawa.",
    "venueAddress": "Taman Budaya Yogyakarta",
    "imageUrl": "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=600",
    "schedules": "[{\"date\":\"2025-08-15\",\"startTime\":\"19:00:00\",\"endTime\":\"22:00:00\",\"price\":50000}]"
  },
  {
    "placeId": 2,
    "title": "Pameran Seni Rupa: Art Jogja",
    "description": "Pameran seni kontemporer tahunan yang menampilkan karya seniman lokal dan internasional.",
    "venueAddress": "Taman Budaya Yogyakarta",
    "imageUrl": "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=600",
    "schedules": "[{\"date\":\"2025-09-01\",\"startTime\":\"10:00:00\",\"endTime\":\"21:00:00\",\"price\":35000}]"
  },
  {
    "placeId": 3,
    "title": "Jakarta Philharmonic Orchestra",
    "description": "Konser orkestra klasik membawakan lagu-lagu nasional aransemen megah.",
    "venueAddress": "Teater Jakarta, TIM",
    "imageUrl": "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=600",
    "schedules": "[{\"date\":\"2025-11-10\",\"startTime\":\"19:00:00\",\"endTime\":\"21:00:00\",\"price\":250000}]"
  },
  {
    "placeId": 3,
    "title": "Stand Up Comedy Special: Ibukota",
    "description": "Pertunjukan tunggal komika papan atas membahas keluh kesah hidup di Jakarta.",
    "venueAddress": "Graha Bhakti Budaya, TIM",
    "imageUrl": "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=600",
    "schedules": "[{\"date\":\"2025-12-05\",\"startTime\":\"20:00:00\",\"endTime\":\"22:00:00\",\"price\":100000}]"
  },
  {
    "placeId": 4,
    "title": "Solo Keroncong Festival",
    "description": "Festival musik keroncong yang menghadirkan maestro dan musisi muda.",
    "venueAddress": "Taman Balekambang, Surakarta",
    "imageUrl": "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=600",
    "schedules": "[{\"date\":\"2025-07-20\",\"startTime\":\"19:00:00\",\"endTime\":\"23:00:00\",\"price\":0}]"
  },
  {
    "placeId": 4,
    "title": "Ketoprak Humor Balekambang",
    "description": "Drama tradisional ketoprak dengan lakon humor yang segar.",
    "venueAddress": "Gedung Kesenian Balekambang",
    "imageUrl": "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=600",
    "schedules": "[{\"date\":\"2025-08-10\",\"startTime\":\"20:00:00\",\"endTime\":\"22:00:00\",\"price\":20000}]"
  },
  {
    "placeId": 5,
    "title": "Jazz Bukit Dago",
    "description": "Menikmati musik jazz di tengah udara sejuk Dago Atas.",
    "venueAddress": "Selasar Sunaryo Art Space",
    "imageUrl": "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=600",
    "schedules": "[{\"date\":\"2025-10-15\",\"startTime\":\"16:00:00\",\"endTime\":\"21:00:00\",\"price\":80000}]"
  },
  {
    "placeId": 5,
    "title": "Workshop Keramik Kreatif",
    "description": "Kelas membuat keramik untuk pemula bersama seniman Bandung.",
    "venueAddress": "Studio Selasar Sunaryo",
    "imageUrl": "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=600",
    "schedules": "[{\"date\":\"2025-09-05\",\"startTime\":\"09:00:00\",\"endTime\":\"12:00:00\",\"price\":150000}]"
  },
  {
    "placeId": 6,
    "title": "Tari Serampang Dua Belas",
    "description": "Pertunjukan tari pergaulan muda-mudi Melayu yang dinamis.",
    "venueAddress": "Halaman Istana Maimun",
    "imageUrl": "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600",
    "schedules": "[{\"date\":\"2025-06-12\",\"startTime\":\"16:00:00\",\"endTime\":\"17:30:00\",\"price\":25000}]"
  },
  {
    "placeId": 6,
    "title": "Festival Kuliner Melayu Deli",
    "description": "Bazaar makanan khas Medan dengan iringan musik orkes Melayu.",
    "venueAddress": "Istana Maimun",
    "imageUrl": "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600",
    "schedules": "[{\"date\":\"2025-07-01\",\"startTime\":\"10:00:00\",\"endTime\":\"20:00:00\",\"price\":0}]"
  },
  {
    "placeId": 7,
    "title": "Makassar International Writers Festival",
    "description": "Diskusi sastra dan pembacaan puisi di benteng bersejarah.",
    "venueAddress": "Fort Rotterdam",
    "imageUrl": "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=600",
    "schedules": "[{\"date\":\"2025-06-20\",\"startTime\":\"15:00:00\",\"endTime\":\"21:00:00\",\"price\":0}]"
  },
  {
    "placeId": 7,
    "title": "Sunset Jazz @Rotterdam",
    "description": "Konser jazz santai sambil menikmati matahari terbenam di pantai Losari.",
    "venueAddress": "Fort Rotterdam",
    "imageUrl": "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=600",
    "schedules": "[{\"date\":\"2025-08-25\",\"startTime\":\"17:00:00\",\"endTime\":\"22:00:00\",\"price\":75000}]"
  },
  {
    "placeId": 8,
    "title": "Ubud Writers & Readers Festival",
    "description": "Festival sastra terbesar di Asia Tenggara.",
    "venueAddress": "Taman Baca, Ubud",
    "imageUrl": "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=600",
    "schedules": "[{\"date\":\"2025-10-25\",\"startTime\":\"09:00:00\",\"endTime\":\"17:00:00\",\"price\":200000}]"
  },
  {
    "placeId": 8,
    "title": "Legong Dance Performance",
    "description": "Tari klasik Bali yang anggun dan rumit diiringi gamelan Semar Pagulingan.",
    "venueAddress": "Puri Ubud",
    "imageUrl": "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600",
    "schedules": "[{\"date\":\"2025-09-10\",\"startTime\":\"19:30:00\",\"endTime\":\"21:00:00\",\"price\":100000}]"
  },
  {
    "placeId": 9,
    "title": "Malang Rock Festival",
    "description": "Konser musik rock menampilkan band-band legendaris Jawa Timur.",
    "venueAddress": "Taman Krida Budaya",
    "imageUrl": "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=600",
    "schedules": "[{\"date\":\"2025-11-20\",\"startTime\":\"18:00:00\",\"endTime\":\"23:00:00\",\"price\":60000}]"
  },
  {
    "placeId": 9,
    "title": "Festival Topeng Malangan",
    "description": "Pagelaran tari topeng khas Malang yang penuh mistis dan sejarah.",
    "venueAddress": "Taman Krida Budaya",
    "imageUrl": "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600",
    "schedules": "[{\"date\":\"2025-10-02\",\"startTime\":\"19:00:00\",\"endTime\":\"21:00:00\",\"price\":30000}]"
  },
  {
    "placeId": 10,
    "title": "Semarang Night Carnival",
    "description": "Parade kostum gemerlap di jalanan sekitar Lawang Sewu.",
    "venueAddress": "Jl. Pemuda (Depan Lawang Sewu)",
    "imageUrl": "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600",
    "schedules": "[{\"date\":\"2025-05-05\",\"startTime\":\"19:00:00\",\"endTime\":\"22:00:00\",\"price\":0}]"
  },
  {
    "placeId": 10,
    "title": "Pameran Foto Sejarah Kereta Api",
    "description": "Melihat jejak perkeretaapian Indonesia di gedung bersejarah.",
    "venueAddress": "Gedung A Lawang Sewu",
    "imageUrl": "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=600",
    "schedules": "[{\"date\":\"2025-08-17\",\"startTime\":\"08:00:00\",\"endTime\":\"16:00:00\",\"price\":10000}]"
  },
  {
    "placeId": 11,
    "title": "Festival Randai Sumatera Barat",
    "description": "Seni teater rakyat yang menggabungkan lagu, musik, dan silat.",
    "venueAddress": "Museum Adityawarman",
    "imageUrl": "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=600",
    "schedules": "[{\"date\":\"2025-09-20\",\"startTime\":\"19:30:00\",\"endTime\":\"22:00:00\",\"price\":15000}]"
  },
  {
    "placeId": 12,
    "title": "Manado Christmas Celebration",
    "description": "Perayaan Natal bersama dengan konser musik rohani.",
    "venueAddress": "Monumen Yesus Memberkati",
    "imageUrl": "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=600",
    "schedules": "[{\"date\":\"2025-12-25\",\"startTime\":\"18:00:00\",\"endTime\":\"21:00:00\",\"price\":0}]"
  },
  {
    "placeId": 13,
    "title": "Batam International Culture Carnival",
    "description": "Karnaval budaya internasional yang diikuti peserta mancanegara.",
    "venueAddress": "Dataran Engku Putri (Dekat Barelang)",
    "imageUrl": "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600",
    "schedules": "[{\"date\":\"2025-12-10\",\"startTime\":\"13:00:00\",\"endTime\":\"17:00:00\",\"price\":0}]"
  },
  {
    "placeId": 14,
    "title": "Toraja International Festival",
    "description": "Kolaborasi musik etnik Toraja dengan musisi dunia.",
    "venueAddress": "Kete Kesu",
    "imageUrl": "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=600",
    "schedules": "[{\"date\":\"2025-08-25\",\"startTime\":\"19:00:00\",\"endTime\":\"23:00:00\",\"price\":50000}]"
  },
  {
    "placeId": 15,
    "title": "Aceh Percussion Festival",
    "description": "Festival tabuh rapai dan perkusi tradisional Aceh.",
    "venueAddress": "Taman Sari (Dekat Museum Tsunami)",
    "imageUrl": "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=600",
    "schedules": "[{\"date\":\"2025-11-05\",\"startTime\":\"20:00:00\",\"endTime\":\"22:30:00\",\"price\":0}]"
  },
  {
    "placeId": 16,
    "title": "Palembang Jazz Festival",
    "description": "Musik jazz tepi sungai Musi dengan latar Jembatan Ampera.",
    "venueAddress": "Benteng Kuto Besak",
    "imageUrl": "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=600",
    "schedules": "[{\"date\":\"2025-10-28\",\"startTime\":\"16:00:00\",\"endTime\":\"22:00:00\",\"price\":50000}]"
  },
  {
    "placeId": 17,
    "title": "Pontianak Creative Fest",
    "description": "Bazaar industri kreatif dan panggung musik lokal.",
    "venueAddress": "Rumah Radakng",
    "imageUrl": "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=600",
    "schedules": "[{\"date\":\"2025-09-15\",\"startTime\":\"10:00:00\",\"endTime\":\"22:00:00\",\"price\":10000}]"
  },
  {
    "placeId": 18,
    "title": "Pesta Rakyat Ambon",
    "description": "Panggung hiburan rakyat merayakan hari jadi kota Ambon.",
    "venueAddress": "Lapangan Merdeka",
    "imageUrl": "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=600",
    "schedules": "[{\"date\":\"2025-09-07\",\"startTime\":\"19:00:00\",\"endTime\":\"23:00:00\",\"price\":0}]"
  },
  {
    "placeId": 19,
    "title": "Riau Fashion Week",
    "description": "Peragaan busana tenun dan songket Riau modern.",
    "venueAddress": "Anjung Seni Idrus Tintin",
    "imageUrl": "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=600",
    "schedules": "[{\"date\":\"2025-11-20\",\"startTime\":\"19:00:00\",\"endTime\":\"21:00:00\",\"price\":50000}]"
  },
  {
    "placeId": 20,
    "title": "Mataram Cultural Parade",
    "description": "Parade budaya Sasak, Samawa, dan Mbojo.",
    "venueAddress": "Jalan Pejanggik (Start Taman Mayura)",
    "imageUrl": "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600",
    "schedules": "[{\"date\":\"2025-08-31\",\"startTime\":\"14:00:00\",\"endTime\":\"17:00:00\",\"price\":0}]"
  },
  {
    "placeId": 21,
    "title": "Kupang Exotic Run",
    "description": "Lari santai sore hari menyusuri garis pantai Lasiana.",
    "venueAddress": "Pantai Lasiana",
    "imageUrl": "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600",
    "schedules": "[{\"date\":\"2025-10-10\",\"startTime\":\"15:30:00\",\"endTime\":\"18:00:00\",\"price\":100000}]"
  },
  {
    "placeId": 22,
    "title": "Festival Danau Sentani (Roadshow)",
    "description": "Pertunjukan tarian perang dan budaya Papua.",
    "venueAddress": "Bukit Jokowi",
    "imageUrl": "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600",
    "schedules": "[{\"date\":\"2025-06-19\",\"startTime\":\"10:00:00\",\"endTime\":\"15:00:00\",\"price\":0}]"
  },
  {
    "placeId": 23,
    "title": "Borobudur Symphony",
    "description": "Konser musik internasional dengan latar kemegahan Candi Borobudur.",
    "venueAddress": "Taman Aksobya, Borobudur",
    "imageUrl": "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=600",
    "schedules": "[{\"date\":\"2025-08-25\",\"startTime\":\"19:00:00\",\"endTime\":\"22:00:00\",\"price\":500000}]"
  },
  {
    "placeId": 23,
    "title": "Borobudur Marathon Cultural Night",
    "description": "Malam keakraban pelari maraton dengan sajian budaya Jawa.",
    "venueAddress": "Taman Lumbini, Borobudur",
    "imageUrl": "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600",
    "schedules": "[{\"date\":\"2025-11-18\",\"startTime\":\"18:00:00\",\"endTime\":\"21:00:00\",\"price\":0}]"
  },
  {
    "placeId": 24,
    "title": "Tegal Pesisir Carnival",
    "description": "Karnaval busana kreatif bertema bahari.",
    "venueAddress": "Alun-Alun Tegal",
    "imageUrl": "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600",
    "schedules": "[{\"date\":\"2025-04-12\",\"startTime\":\"13:00:00\",\"endTime\":\"16:00:00\",\"price\":0}]"
  },
  {
    "placeId": 25,
    "title": "Lampung Jazz Festival",
    "description": "Festival jazz tahunan yang menghadirkan musisi jazz ibukota.",
    "venueAddress": "Lapangan Saburai (Pindah Venue)",
    "imageUrl": "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=600",
    "schedules": "[{\"date\":\"2025-11-11\",\"startTime\":\"19:00:00\",\"endTime\":\"23:00:00\",\"price\":50000}]"
  }
];

async function main() {
  console.log('🚀 Start seeding...');

  // --- STEP 1: UPSERT PLACES ---
  // We need to make sure the places (Place ID 1 to 25) exist before creating events for them.
  console.log('🏗️  Ensuring Places exist...');
  
  // Extract unique placeIds from the raw data
  const uniquePlaceIds = [...new Set(rawData.map(item => item.placeId))];

  for (const placeId of uniquePlaceIds) {
    // Find one event that uses this place, so we can borrow its "venueAddress" as the Place Name
    const refEvent = rawData.find(d => d.placeId === placeId);
    
    // We use "upsert". This means: "Create it if it doesn't exist, otherwise do nothing".
    await prisma.place.upsert({
        where: { place_id: placeId },
        update: {}, // If it exists, change nothing
        create: {
            place_id: placeId,
            place_name: refEvent?.venueAddress || `Place ${placeId}`, // Use the address as the name for now
            address: refEvent?.venueAddress,
            place_description: "Auto-generated by seed script",
            // We leave location_id and place_category_id null for now as we don't have that data
        }
    });
  }
  console.log('✅ Places ensured.');

  // --- STEP 2: CREATE EVENTS ---
  console.log('🎫 Creating events...');
  for (const eventData of rawData) {
    // 1. Parsing the stringified JSON schedules
    let schedules: any[] = [];
    try {
        schedules = JSON.parse(eventData.schedules);
    } catch (e) {
        console.error(`Error parsing schedule for event: ${eventData.title}`);
        continue;
    }

    // 2. Create the Event
    const createdEvent = await prisma.performance_event.create({
      data: {
        place_id: eventData.placeId,
        title: eventData.title,
        event_description: eventData.description,
        venue_address: eventData.venueAddress,
        image_url: eventData.imageUrl,
        event_schedule: {
          create: schedules.map((s) => ({
            date: new Date(s.date),
            start_time: new Date(`1970-01-01T${s.startTime}Z`), 
            end_time: new Date(`1970-01-01T${s.endTime}Z`),
            price: s.price
          })),
        },
      },
    });

    console.log(`   -> Created: ${createdEvent.title}`);
  }

  console.log('✨ Seeding finished successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });