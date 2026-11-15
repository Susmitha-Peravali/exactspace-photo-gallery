// Rich collection of curated photography for realistic, infinite scrolling
// Each item matches the exact Picsum schema: { id, author, width, height, url, download_url }

const MASTER_PHOTO_CATALOG = [
  {
    author: "Paul Jarvis",
    category: "Landscape",
    width: 3840,
    height: 2160,
    url: "https://unsplash.com/photos/6J--NXulQCs",
    download_url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85",
  },
  {
    author: "Alejandro Escamilla",
    category: "Architecture",
    width: 4434,
    height: 2956,
    url: "https://unsplash.com/photos/8lMYSaoUOiY",
    download_url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85",
  },
  {
    author: "Vadim Sherbakov",
    category: "Aerial",
    width: 4209,
    height: 2769,
    url: "https://unsplash.com/photos/pVpOvCs7mzA",
    download_url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1600&q=85",
  },
  {
    author: "Dan Freeman",
    category: "Urban",
    width: 3872,
    height: 2592,
    url: "https://unsplash.com/photos/DwTZwZYi9Ww",
    download_url: "https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=1600&q=85",
  },
  {
    author: "Christopher Campbell",
    category: "Portrait",
    width: 4272,
    height: 2848,
    url: "https://unsplash.com/photos/2fl-ocJ5MOA",
    download_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1600&q=85",
  },
  {
    author: "Aleks Dorohovich",
    category: "Nature",
    width: 3670,
    height: 2462,
    url: "https://unsplash.com/photos/YnfGtnh2Kd0",
    download_url: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=1600&q=85",
  },
  {
    author: "Lukas Budimaier",
    category: "Mountains",
    width: 5000,
    height: 3333,
    url: "https://unsplash.com/photos/9SauQfOGzWs",
    download_url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=85",
  },
  {
    author: "Patrick Fore",
    category: "Coffee & Still",
    width: 3264,
    height: 2448,
    url: "https://unsplash.com/photos/t20UMIIdvR8",
    download_url: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1600&q=85",
  },
  {
    author: "Zugzwang Blog",
    category: "Lakeside",
    width: 4200,
    height: 2800,
    url: "https://unsplash.com/photos/YvYBOSiBJE8",
    download_url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=85",
  },
  {
    author: "Kenneth Thewissen",
    category: "Architecture",
    width: 5000,
    height: 3333,
    url: "https://unsplash.com/photos/AmAFHGuVJW8",
    download_url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85",
  },
  {
    author: "Göran Hägg",
    category: "Automotive",
    width: 4400,
    height: 2656,
    url: "https://unsplash.com/photos/e493PtjOTG4",
    download_url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=85",
  },
  {
    author: "Jerry Adney",
    category: "Misty Forest",
    width: 4928,
    height: 3264,
    url: "https://unsplash.com/photos/kmRZFcZEMY8",
    download_url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=85",
  },
  {
    author: "Jator Cruz",
    category: "Night Lights",
    width: 4168,
    height: 2464,
    url: "https://unsplash.com/photos/UrNoCe97p10",
    download_url: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1600&q=85",
  },
  {
    author: "Brian Gonzalez",
    category: "Autumn Woods",
    width: 3264,
    height: 2448,
    url: "https://unsplash.com/photos/llQMvl45e88",
    download_url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1600&q=85",
  },
  {
    author: "Anton Repponen",
    category: "Desert Dunes",
    width: 3504,
    height: 2336,
    url: "https://unsplash.com/photos/AikojhFamhg",
    download_url: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?auto=format&fit=crop&w=1600&q=85",
  },
  {
    author: "Daniel Ebersole",
    category: "Coastline",
    width: 1544,
    height: 1024,
    url: "https://unsplash.com/photos/VP3v0PAHC7I",
    download_url: "https://images.unsplash.com/photo-1510784722466-f2aa9c52fff6?auto=format&fit=crop&w=1600&q=85",
  },
  {
    author: "Rick Calzi",
    category: "Serenity",
    width: 1500,
    height: 1000,
    url: "https://unsplash.com/photos/Q14J2k8VE3U",
    download_url: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1600&q=85",
  },
  {
    author: "Nadir Balcikli",
    category: "Workspace",
    width: 3264,
    height: 2176,
    url: "https://unsplash.com/photos/dVh-_okLStE",
    download_url: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1600&q=85",
  },
  {
    author: "Guillaume",
    category: "Mountains",
    width: 4928,
    height: 3264,
    url: "https://unsplash.com/photos/wE9nUW7tM3U",
    download_url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=85",
  },
  {
    author: "Radio Pink",
    category: "Reflections",
    width: 1600,
    height: 1067,
    url: "https://unsplash.com/photos/_DA3D5P71qs",
    download_url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1600&q=85",
  },
  {
    author: "Tina Rataj",
    category: "Sunrise",
    width: 2500,
    height: 1656,
    url: "https://unsplash.com/photos/p-bkgaOeqyo",
    download_url: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1600&q=85",
  },
  {
    author: "Mark Dähne",
    category: "Winter Peaks",
    width: 4928,
    height: 3264,
    url: "https://unsplash.com/photos/xS_RfdK0rSg",
    download_url: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1600&q=85",
  },
  {
    author: "Ryan Searle",
    category: "Wild Feline",
    width: 4106,
    height: 2806,
    url: "https://unsplash.com/photos/GuzkWaoY0Yk",
    download_url: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1600&q=85",
  },
  {
    author: "Oleg Chursin",
    category: "Botanical",
    width: 1280,
    height: 853,
    url: "https://unsplash.com/photos/FyyXqW9a4eo",
    download_url: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1600&q=85",
  },
  {
    author: "Austin Neill",
    category: "Golden Hour",
    width: 2000,
    height: 1333,
    url: "https://unsplash.com/photos/3Hrh0cvR5kM",
    download_url: "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?auto=format&fit=crop&w=1600&q=85",
  },
  {
    author: "Shutterbug",
    category: "Architecture",
    width: 3264,
    height: 2448,
    url: "https://unsplash.com/photos/asrWXjwb4jY",
    download_url: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=1600&q=85",
  },
  {
    author: "Luke Chesser",
    category: "Hills & Horizon",
    width: 3456,
    height: 2304,
    url: "https://unsplash.com/photos/hllz08",
    download_url: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=1600&q=85",
  },
  {
    author: "Jonas Weckschmied",
    category: "Atmosphere",
    width: 3456,
    height: 5184,
    url: "https://unsplash.com/photos/atmo",
    download_url: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1600&q=85",
  }
];

const ITEMS_PER_PAGE = 6;
const MAX_PAGES = 50; // Supports up to 300+ continuous photographs for endless infinite scrolling

/**
 * Generates an endless stream of paginated photos matching the exact Picsum schema
 */
export function getPaginatedPhotos(page) {
  if (page > MAX_PAGES) {
    return []; // End of collection reached after 50 continuous pages
  }

  const result = [];
  const totalMaster = MASTER_PHOTO_CATALOG.length;

  for (let i = 0; i < ITEMS_PER_PAGE; i++) {
    const masterIndex = ((page - 1) * ITEMS_PER_PAGE + i) % totalMaster;
    const basePhoto = MASTER_PHOTO_CATALOG[masterIndex];
    const uniqueId = String((page - 1) * ITEMS_PER_PAGE + i + 100);

    result.push({
      ...basePhoto,
      id: uniqueId,
      page: page,
    });
  }

  return result;
}
