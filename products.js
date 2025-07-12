export function getProduct(productId) {
  let matchingProduct;
  products.forEach((product) => {
    if (productId === product.id) {
      matchingProduct = product;
    }
  });
  return matchingProduct;
}

export const products = [
  {
    id: "PID-F7K3Q9",
    image: "images/1.png",
    name: "5 Packs Samyang 2X Spicy Hot Chicken Korean Ramen Fire Noodle Challenge Buldak",
    price: 23500,
  },
  {
    id: "PID-A2J6XP",
    image: "images/2.png",
    name: "Nongshim Shin Ramyun Noodle Soup",
    price: 7500,
  },
  {
    id: "PID-M9T4WN",
    image: "images/3.png",
    name: "Jin Spicy Ramen Pack 120g",
    price: 6800,
  },
  {
    id: "PID-Z1C8VE",
    image: "images/4.png",
    name: "Samyang Korea Halal Original Flavor Ramen",
    price: 7500,
  },
  {
    id: "PID-R0YLK7",
    image: "images/5.jpg",
    name: "NAMKWANG Korean Seasoned Seaweed Snack",
    price: 1600,
  },
  {
    id: "PID-H4P2DM",
    image: "images/4.jpg",
    name: "DONGWON LUNCHEON MEAT 340G",
    price: 15500,
  },
  {
    id: "PID-N5QB3X",
    image: "images/3.jpg",
    name: "YOPOKKI SWEET & SPICY 280G",
    price: 14500,
  },
  {
    id: "PID-W6EZTJ",
    image: "images/2.jpg",
    name: "YOPOKKI CHEESE 240G",
    price: 14500,
  },
  {
    id: "PID-X8AV2R",
    image: "images/1.jpg",
    name: "꽃샘 Honey 500ML",
    price: 100000,
  },
  {
    id: "PID-T3UMNF",
    image: "images/6.jpg",
    name: "BIBIGO SEAWEED FLAKES 50G",
    price: 21000,
  },
  {
    id: "PID-K1CYD9",
    image: "images/7.jpg",
    name: "HP) CRISPY SEAWEED 9PCS",
    price: 18800,
  },
  {
    id: "PID-L9WX3A",
    image: "images/8.jpg",
    name: "NS) BULGOGI HOT POT NOODLES 115G",
    price: 6500,
  },
  {
    id: "PID-G2ZQTB",
    image: "images/9.jpg",
    name: "OTG) KIMCHI RAMEN",
    price: 3800,
  },
  {
    id: "PID-Y0VPK6",
    image: "images/11.jpg",
    name: "NS)JJAPAGETI",
    price: 7500,
  },
  {
    id: "PID-J8N7HR",
    image: "images/12.jpg",
    name: "BANANA MILK 200ML 6PCS",
    price: 29000,
  },
  {
    id: "PID-U3LXZE",
    image: "images/13.jpg",
    name: "CHAMISEUL FRESH 360ML",
    price: 12000,
  },
  {
    id: "PID-B5TC9M",
    image: "images/14.jpg",
    name: "ALOE VERA JUICE 1.5L",
    price: 17500,
  },
  {
    id: "PID-E4W1QK",
    image: "images/15.jpg",
    name: "BS) SWEET KOREAN PANCAKE MIX 400G",
    price: 15500,
  },
];
