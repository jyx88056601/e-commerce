import { Product } from "./models/productModel";

 const sampleProducts: Product[] = [
  {
    name: "2023 Honda Civic",
    slug: "2023-honda-civic",
    image: "../images/honda-civic.jpg",
    category: "Sedan",
    brand: "Honda",
    description: "The reliable and stylish 2023 Honda Civic for daily commuting.",
    price: 0.01,
    countInStock: 1,
    numReviews: 7,
    rating: 0.8,
  },
  {
    name: "2023 Audi Q7 SUV",
    slug: "2023-audi-q7-suv",
    image: "../images/audi-q7-suv.jpg", // Update the image path here
    category: "Suv",
    brand: "Audi",
    description: "Experience luxury and performance with the 2023 Audi Q7 SUV.",
    price: 2.00,
    countInStock: 6,
    numReviews: 12,
    rating: 1.1,
  },
  {
    name: "2023 Jeep Wrangler Rubicon",
    slug: "2023-jeep-wrangler-rubicon",
    image: "../images/jeep-wrangler-rubicon.jpg", // Update the image path here
    category: "4X4",
    brand: "Jeep",
    description: "Conquer any terrain with the rugged 2023 Jeep Wrangler Rubicon.",
    price:  3.00,
    countInStock: 9,
    numReviews: 6,
    rating: 1.6,
  },
  {
    name: "2023 Porsche 911 Carrera",
    slug: "2023-porsche-911-carrera",
    image: "../images/porsche-911-carrera.jpg", // Update the image path here
    category: "Sport cars",
    brand: "Porsche",
    description: "The iconic sports car, 2023 Porsche 911 Carrera, for the enthusiasts.",
    price: 4.00,
    countInStock: 3,
    numReviews: 11,
    rating: 2.1,
  },
  {
    name: "2023 Subaru Outback",
    slug: "2023-subaru-outback",
    image: "../images/subaru-outback.jpg", // Update the image path here
    category: "Wagon",
    brand: "Subaru",
    description: "A versatile and rugged choice, the 2023 Subaru Outback.",
    price: 5.00,
    countInStock: 10,
    numReviews: 5,
    rating: 2.7,
  },
  {
    name: "2023 Mercedes-Benz E-Class",
    slug: "2023-mercedes-benz-e-class",
    image: "../images/mercedes-e-class.jpg", // Update the image path here
    category: "Sedan",
    brand: "Mercedes-Benz",
    description: "Experience luxury and sophistication with the 2023 Mercedes-Benz E-Class.",
    price: 6.00,
    countInStock: 4,
    numReviews: 8,
    rating: 3.2,
  },
  {
    name: "2023 Tesla Model S",
    slug: "2023-tesla-model-s",
    image: "../images/tesla-model-s.jpg", // Update the image path here
    category: "Electric cars",
    brand: "Tesla",
    description: "The sleek and powerful 2023 Tesla Model S electric car.",
    price: 7.00,
    countInStock: 5,
    numReviews: 10,
    rating: 3.8,
  },
  {
    name: "2023 Ford Mustang GT",
    slug: "2023-ford-mustang-gt",
    image: "../images/ford-mustang-gt.jpg", // Update the image path here
    category: "Sport cars",
    brand: "Ford",
    description: "Experience the speed and style of the 2023 Ford Mustang GT.",
    price: 8.00,
    countInStock: 8,
    numReviews: 8,
    rating: 4.1,
  },
  {
    name: "2023 Toyota Camry Hybrid",
    slug: "2023-toyota-camry-hybrid",
    image: "../images/toyota-camry-hybrid.jpg", // Update the image path here
    category: "Sedan",
    brand: "Toyota",
    description: "Efficient and eco-friendly, the 2023 Toyota Camry Hybrid.",
    price: 9.00,
    countInStock: 15,
    numReviews: 6,
    rating: 4.6,
  },
  {
    name: "2023 BMW X5 SUV",
    slug: "2023-bmw-x5-suv",
    image: "../images/bmw-x5-suv.jpg", // Update the image path here
    category: "Suv",
    brand: "BMW",
    description: "Luxurious and powerful, the 2023 BMW X5 SUV for your adventures.",
    price: 10.01,
    countInStock: 7,
    numReviews: 9,
    rating: 5,
  },
];
 

export default sampleProducts;