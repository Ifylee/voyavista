const db = require("../config/connection");
const { User, Trip, Category } = require("../models");

db.once("open", async () => {
  await Trip.deleteMany({});
  await User.deleteMany({});
  await Category.deleteMany({});

  const categories = await Category.insertMany([
    { name: "Africa" },
    { name: "Asia" },
    { name: "Europe" },
    { name: "Oceania" },
    { name: "North and South America" },
  ]);

  console.log("categories seeded");

  const trips = await Trip.insertMany([
    {
      title: "Lagos, Nigeria",
      summary:
        "Experience the vibrant culture of Lagos, Nigeria with a 7-day trip including city tours, local cuisine, and stunning beaches.",
      description:
        "Lagos, the cultural hub of Nigeria, offers an eclectic mix of vibrant city life and natural beauty. Visitors can explore the bustling markets of Lekki and Balogun for traditional crafts and textiles, or visit the historical National Museum to learn about Nigeria’s rich heritage. For relaxation, head to Tarkwa Bay Beach or the serene Lekki Conservation Centre, where you can walk above the treetops on one of Africa’s longest canopy walkways. Food lovers will enjoy dishes like jollof rice, pounded yam with egusi soup, and suya, a spiced grilled meat delicacy.",
      img: "lagos.jpg",
      additionalImages: ["lagos2.jpg"],
      category: categories[0]._id,
      groupSize: "4-7",
      price: 2000.00,
    },
    {
      title: "Zanzibar Tanzania",
      summary: "This is a test",
      description:
        "Zanzibar is a paradise island known for its pristine beaches and rich history. Stroll through the narrow streets of Stone Town, a UNESCO World Heritage Site, and discover its blend of Arab, Persian, Indian, and European influences. Snorkeling and diving in the crystal-clear waters of the Indian Ocean are a must, particularly around Mnemba Atoll, which is teeming with marine life. Savor Swahili cuisine, with dishes like seafood biryani, coconut curries, and the island’s famous spiced coffee.",
      img: "zanzibar.jpg",
      additionalImages: ["zanzibar2.jpg"],
      category: categories[0]._id,
      groupSize: "2-4",
      price: 3500.99,
    },
    {
      title: "Japan Excursion",
      summary: "This is a test",
      category: categories[1]._id,
      description:
        "Japan offers a unique blend of tradition and modernity. Explore Tokyo’s iconic districts like Shibuya and Akihabara, filled with neon lights, shopping, and gaming arcades. Visit Kyoto for its serene temples, including the famous Kinkaku-ji (Golden Pavilion) and Fushimi Inari Shrine. During the spring, take part in hanami (cherry blossom viewing) at Ueno Park. Food enthusiasts can enjoy sushi, ramen, tempura, and the freshest sashimi, while experiencing Japanese tea ceremonies in traditional teahouses.",
      img: "japan.jpg",
      additionalImages: ["japan2.jpg"],
      groupSize: "2-4",
      price: 4500.99,
    },
    {
      title: "Seoul South Korea",
      summary: "This is a test",
      category: categories[1]._id,
      description:
        "Seoul is a dynamic city where ancient palaces meet cutting-edge technology. Visit Gyeongbokgung Palace to witness Korea’s royal history, or hike up Namsan Mountain for panoramic views of the city from the N Seoul Tower. Shopping in Myeongdong and experiencing the nightlife in Hongdae and Gangnam are must-dos. Indulge in authentic Korean BBQ, spicy tteokbokki (rice cakes), and bibimbap, a flavorful mixed rice dish, while soaking in the vibrant street food culture.",
      img: "seoul.jpg",
      additionalImages: ["seoul2.jpg"],
      groupSize: "3-6",
      price: 3002.99,
    },
    {
      title: "Singapore",
      category: categories[1]._id,
      summary: "This is a test",
      description:
        "A futuristic city-state, Singapore offers a multitude of experiences. Marvel at the iconic Marina Bay Sands, explore the Cloud Forest in Gardens by the Bay, or take a stroll along the scenic Sentosa Island beaches. For a deep dive into the city’s culture, visit Chinatown, Little India, and Kampong Glam. Singapore is renowned for its food, offering dishes like Hainanese chicken rice, laksa, and chili crab at world-famous hawker centers.",
      img: "singapore.jpg",
      additionalImages: ["singapore2.jpg"],
      groupSize: "4-7",
      price: 3400.99,
    },
    {
      title: "Explore Vienna",
      summary: "This is a test",
      category: categories[2]._id,
      description:
        "Vienna, the heart of classical music and imperial history, is home to grand palaces and charming streets. Start your visit at Schönbrunn Palace, the summer residence of the Habsburgs, then enjoy the vibrant café culture with a slice of Sachertorte. Walk along the Ringstrasse to see the State Opera House and the impressive St. Stephen’s Cathedral. Vienna’s cuisine is a treat, featuring Wiener schnitzel, apple strudel, and plenty of local wines from the nearby Wachau Valley.",
      img: "vienna.jpg",
      additionalImages: ["vienna2.jpg"],
      groupSize: "3-5",
      price: 3999.99,
    },
    {
      title: "Amsterdam Holiday",
      summary: "This is a test",
      category: categories[2]._id,
      description:
        "Amsterdam is a city of canals, bicycles, and rich history. Take a boat tour through the historic canal ring, a UNESCO World Heritage Site, and explore the famous Van Gogh Museum or Anne Frank House. For a touch of nature, visit Vondelpark or the famous Keukenhof Gardens during tulip season. Indulge in Dutch delicacies like stroopwafels, herring, and hearty bitterballen (Dutch meatballs) at cozy cafes.",
      img: "amsterdam.jpg",
      additionalImages: "amsterdam2.jpg",
      groupSize: "2-4",
      price: 2999.99,
    },
    {
      title: "Visit the Shire",
      summary: "This is a test",
      category: categories[3]._id,
      description:
        "Enter the magical world of Middle-earth in Matamata, New Zealand, where you can visit the Hobbiton movie set from The Lord of the Rings. Wander through the charming hobbit holes, lush green fields, and have a drink at the Green Dragon Inn. Beyond Hobbiton, explore New Zealand’s breathtaking landscapes, including Rotorua’s geothermal parks and the Waitomo glowworm caves. Savor New Zealand’s culinary delights, such as lamb, green-lipped mussels, and pavlova, a famous meringue-based dessert.",
      img: "shire.jpg",
      additionalImages: ["shire2.jpg"],
      groupSize: "4-6",
      price: 3500.99,
    },
    {
      title: "Mexico City Ahi Nos Vidrios",
      summary: "This is a test",
      category: categories[4]._id,
      description:
        "Mexico City is a vibrant metropolis where ancient history meets modern art and cuisine. Visit the ancient Aztec ruins at Templo Mayor or take a day trip to Teotihuacán to climb the Pyramids of the Sun and Moon. Explore the bustling neighborhoods of Roma and Condesa for art galleries, street food, and trendy cafes. Don’t miss out on authentic Mexican cuisine, from tacos al pastor and tamales to traditional mole sauces and fresh churros.",
      img: "mexico-city.jpg",
      additionalImages: ["mexico-city2.jpg"],
      groupSize: "3-5",
      price: 2000.99,
    },
    {
      title: "Ancient City of Machu Pichu",
      summary: "This is a test",
      category: categories[4]._id,
      description:
        "Machu Picchu, the legendary lost city of the Incas, is a once-in-a-lifetime destination. Hike the Inca Trail or take the train to the sacred citadel, nestled high in the Andes Mountains. Explore the Temple of the Sun, the Sacred Plaza, and the Intihuatana Stone. Beyond Machu Picchu, discover Cusco’s colonial charm and the vibrant Sacred Valley. Peruvian cuisine is world-renowned, with dishes like ceviche, lomo saltado, and aji de gallina on the menu.",
      img: "machu-pichu.jpg",
      additionalImages: ["machu-pichu2.jpg"],
      groupSize: "1-3",
      price: 5500.99,
    },
    {
      title: "Vancouver Getaway",
      summary: "This is a test",
      category: categories[4]._id,
      description:
        "Vancouver is a stunning coastal city surrounded by mountains, forests, and the Pacific Ocean. Stroll through Stanley Park, visit Granville Island’s public market, and take in the city’s rich cultural diversity. Outdoor enthusiasts will love skiing in Whistler, hiking Grouse Mountain, or kayaking around False Creek. Vancouver’s food scene is equally diverse, offering everything from fresh seafood to Asian fusion, with sushi, dim sum, and poutine being local favorites.",
      img: "vancouver.jpg",
      additionalImages: ["vancouver2.jpg"],
      groupSize: "4-7",
      price: 1500.99,
    },
    {
      title: "Rio de Janeiro Brazil",
      summary: "This is a test",
      category: categories[4]._id,
      description:
        "Rio de Janeiro is a city of golden beaches, samba, and dramatic landscapes. Visit the iconic Christ the Redeemer statue atop Corcovado Mountain for stunning views, then relax on Copacabana or Ipanema beaches. During Carnival, the city comes alive with vibrant parades and street parties. Explore the historic Santa Teresa neighborhood and take a cable car up Sugarloaf Mountain. Brazilian cuisine is a treat, featuring feijoada, pão de queijo (cheese bread), and refreshing caipirinhas.",
      img: "brazil.jpg",
      additionalImages: ["brazil2.jpg"],
      groupSize: "3-6",
      price: 4000.99,
    },
  ]);

  console.log("products seeded");

  await User.create({
    firstName: "Pamela",
    lastName: "Washington",
    email: "pamela@testmail.com",
    password: "password12345",
    purchased: [trips[0]._id, trips[11]._id, trips[8]._id],
    wishList: [trips[3]._id, trips[9]._id],
  });

  await User.create({
    firstName: "Elijah",
    lastName: "Holt",
    email: "eholt@testmail.com",
    password: "password12345",
    purchased: [trips[0]._id, trips[11]._id, trips[8]._id],
    wishList: [trips[3]._id, trips[9]._id],
  });

  console.log("users seeded");

  process.exit();
});
