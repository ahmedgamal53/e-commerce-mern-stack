import aionyHaust from "./aiony-haust-K0DxxljcRv0-unsplash.jpg";
import alexiRomano from "./alexi-romano-CCx6Fz_CmOI-unsplash.jpg";
import amandaVick from "./amanda-vick-zw_oaDbfzyE-unsplash.jpg";
import andreyZvyagintsev from "./andrey-zvyagintsev-HiDFZMT8Z5s-unsplash.jpg";
import dmitryGanin from "./dmitry-ganin-EhWzbMPQcqQ-unsplash.jpg";
import harperSunday from "./harper-sunday-kfSjyxAWhEc-unsplash.jpg";
// import heatherFord from "./heather-ford-5gkYsrH_ebY-unsplash.jpg";
import hero from "./hero.png";
import mikeVon from "./mike-von-YsiSAp3ccvk-unsplash.jpg";
import miladaVigerova from "./milada-vigerova-p8Drpg_duLw-unsplash.jpg";
import parkerBurchfield from "./parker-burchfield-tvG4WvjgsEY-unsplash.jpg";
import princeAkachi from "./prince-akachi-iuqcmC4NVNo-unsplash.jpg";
import sirio from "./sirio-7_ZNLVlJchs-unsplash.jpg";
// import tobiasTullius from "./tobias-tullius-Fg15LdqpWrs-unsplash.jpg";
import valnaStudio from "./valna-studio-mU88MlEFcoU-unsplash.jpg";

export const assets = {
  aionyHaust,
  alexiRomano,
  amandaVick,
  andreyZvyagintsev,
  dmitryGanin,
  harperSunday,
  // heatherFord,
  hero,
  mikeVon,
  miladaVigerova,
  parkerBurchfield,
  princeAkachi,
  sirio,
  // tobiasTullius,
  valnaStudio,
};

export const products = [
  {
    _id: "prod-001",
    name: "Classic White T-Shirt",
    description: "A comfortable classic white t-shirt for everyday wear.",
    price: 450,
    image:
      "https://res.cloudinary.com/ddaac7nf9/image/upload/v1788482193/aiony-haust-K0DxxljcRv0-unsplash.jpg",
    category: "Men",
    subCategory: "T-Shirts",
    sizes: ["S", "M", "L", "XL"],
    date: 1725000000000,
    bestseller: true,
  },
  {
    _id: "prod-002",
    name: "Casual Black Shirt",
    description: "A simple black shirt with a modern casual fit.",
    price: 650,
    image:
      "https://res.cloudinary.com/ddaac7nf9/image/upload/v1788482196/alexi-romano-CCx6Fz_CmOI-unsplash.jpg",
    category: "Men",
    subCategory: "Shirts",
    sizes: ["M", "L", "XL"],
    date: 1725100000000,
    bestseller: true,
  },
  {
    _id: "prod-003",
    name: "Women's Casual Top",
    description: "A lightweight top suitable for casual everyday outfits.",
    price: 500,
    image:
      "https://res.cloudinary.com/ddaac7nf9/image/upload/v1788482194/amanda-vick-zw_oaDbfzyE-unsplash.jpg",
    category: "Women",
    subCategory: "Tops",
    sizes: ["S", "M", "L"],
    date: 1725200000000,
    bestseller: true,
  },
  {
    _id: "prod-004",
    name: "Oversized Beige T-Shirt",
    description: "A relaxed oversized t-shirt with a clean modern look.",
    price: 550,
    image:
      "https://res.cloudinary.com/ddaac7nf9/image/upload/v1788482196/andrey-zvyagintsev-HiDFZMT8Z5s-unsplash.jpg",
    category: "Men",
    subCategory: "T-Shirts",
    sizes: ["S", "M", "L", "XL"],
    date: 1725300000000,
    bestseller: false,
  },
  {
    _id: "prod-005",
    name: "Modern Casual Outfit",
    description: "A modern outfit designed for a comfortable everyday style.",
    price: 850,
    image:
      "https://res.cloudinary.com/ddaac7nf9/image/upload/v1788482198/dmitry-ganin-EhWzbMPQcqQ-unsplash.jpg",
    category: "Men",
    subCategory: "Casual",
    sizes: ["M", "L", "XL"],
    date: 1725400000000,
    bestseller: true,
  },
  {
    _id: "prod-006",
    name: "Women's Summer Outfit",
    description: "A light and comfortable outfit perfect for summer days.",
    price: 750,
    image:
      "https://res.cloudinary.com/ddaac7nf9/image/upload/v1788482204/harper-sunday-kfSjyxAWhEc-unsplash.jpg",
    category: "Women",
    subCategory: "Dresses",
    sizes: ["S", "M", "L"],
    date: 1725500000000,
    bestseller: true,
  },
  // {
  //   _id: "prod-007",
  //   name: "Minimal White Shirt",
  //   description:
  //     "A minimal white shirt that works for casual and formal looks.",
  //   price: 700,
  //   image: [heatherFord],
  //   category: "Women",
  //   subCategory: "Shirts",
  //   sizes: ["S", "M", "L", "XL"],
  //   date: 1725600000000,
  //   bestseller: false,
  // },
  {
    _id: "prod-008",
    name: "Premium Casual Jacket",
    description: "A stylish jacket with a premium look and comfortable fit.",
    price: 1200,
    image:
      "https://res.cloudinary.com/ddaac7nf9/image/upload/v1788482196/mike-von-YsiSAp3ccvk-unsplash.jpg",
    category: "Men",
    subCategory: "Jackets",
    sizes: ["M", "L", "XL"],
    date: 1725700000000,
    bestseller: true,
  },
  {
    _id: "prod-009",
    name: "Women's Blue Outfit",
    description: "A stylish blue outfit designed for a modern feminine look.",
    price: 900,
    image:
      "https://res.cloudinary.com/ddaac7nf9/image/upload/v1788482196/milada-vigerova-p8Drpg_duLw-unsplash.jpg",
    category: "Women",
    subCategory: "Dresses",
    sizes: ["S", "M", "L"],
    date: 1725800000000,
    bestseller: false,
  },
  {
    _id: "prod-010",
    name: "Relaxed Fit Shirt",
    description: "A relaxed fit shirt made for everyday comfort.",
    price: 600,
    image: [
      "https://res.cloudinary.com/ddaac7nf9/image/upload/v1788482189/parker-burchfield-tvG4WvjgsEY-unsplash.jpg",

      "https://res.cloudinary.com/ddaac7nf9/image/upload/q_auto,f_auto/v1788482204/prince-akachi-iuqcmC4NVNo-unsplash.jpg",
    ],
    category: "Men",
    subCategory: "Shirts",
    sizes: ["S", "M", "L", "XL"],
    date: 1725900000000,
    bestseller: true,
  },

  {
    _id: "prod-012",
    name: "Elegant Women's Look",
    description: "An elegant outfit with a simple and sophisticated design.",
    price: 1100,
    image:
      "https://res.cloudinary.com/ddaac7nf9/image/upload/q_auto,f_auto/v1788482204/prince-akachi-iuqcmC4NVNo-unsplash.jpg",
    category: "Women",
    subCategory: "Dresses",
    sizes: ["S", "M", "L"],
    date: 1726100000000,
    bestseller: false,
  },
  {
    _id: "prod-013",
    name: "Everyday Basic T-Shirt",
    description: "A comfortable basic t-shirt that fits any casual wardrobe.",
    price: 400,
    image:
      "https://res.cloudinary.com/ddaac7nf9/image/upload/v1788482203/sirio-7_ZNLVlJchs-unsplash.jpg",
    category: "Men",
    subCategory: "T-Shirts",
    sizes: ["S", "M", "L", "XL"],
    date: 1726200000000,
    bestseller: false,
  },
  // {
  //   _id: "prod-014",
  //   name: "Smart Casual Outfit",
  //   description: "A smart casual piece designed for a clean modern appearance.",
  //   price: 800,
  //   image: [tobiasTullius],
  //   category: "Men",
  //   subCategory: "Casual",
  //   sizes: ["M", "L", "XL"],
  //   date: 1726300000000,
  //   bestseller: true,
  // },
  {
    _id: "prod-015",
    name: "Women's Light Blue Top",
    description: "A soft light blue top with a simple and elegant design.",
    price: 550,
    image:
      "https://res.cloudinary.com/ddaac7nf9/image/upload/v1788482202/valna-studio-mU88MlEFcoU-unsplash.jpg",
    category: "Women",
    subCategory: "Tops",
    sizes: ["S", "M", "L"],
    date: 1726400000000,
    bestseller: true,
  },
];
