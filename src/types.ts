export type User = {
  _id: string; // whenever the front end fetch the data from backend data through mongo db, we don't need to change the special Object id which is in mongodb
  email: string;
  name: string;
  addressLine1: string;
  city: string;
  country: string;
};

export type MenuItem = {
  _id: string;
  name: string;
  price: number;
};

export type Restaurant = {
  _id: string;
  user: string;
  restaurantName: string;
  city: string;
  country: string;
  deliveryPrice: number;
  estimatedDeliveryTime: number;
  cuisines: string[];
  menuItems: MenuItem[];
  imageUrl: string;
  lastUpdated: string; // it will comeback as response as a string
};

export type RestaurantSearchResponse = {
  data: Restaurant[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  }
}
