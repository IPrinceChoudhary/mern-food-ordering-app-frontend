export type User = {
  _id: string, // whenever the front end fetch the data from backend data through mongo db, we don't need to change the special Object id which is in mongodb
  email: string,
  name: string,
  addressLine1: string,
  city: string,
  country: string
}