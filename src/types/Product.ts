export type Product = {
    _id : string
    name : string;
    slug : string;
    image : string;
    category : string;
    brand : string;
    description : string;

    price : number;
    countInStock : number;
   
    numReviews : number;
    rating : number;
}