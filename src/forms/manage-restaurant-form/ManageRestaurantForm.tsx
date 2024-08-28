import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DetailsSection from "./DetailsSection";
import { Separator } from "@/components/ui/separator";
import CuisinesSection from "./CuisinesSection";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { Restaurant } from "@/types";
import { useEffect } from "react";

const formSchema = z.object({
  restaurantName: z.string({
    required_error: "restaurant name is required",
  }),
  city: z.string({
    required_error: "city name is required",
  }),
  country: z.string({
    required_error: "country name is required",
  }),
  deliveryPrice: z.coerce.number({
    required_error: "delivery price is required",
    invalid_type_error: "must be a valid number",
  }), // we r getting the string from html code. so now we r converting into number
  estimatedDeliveryTime: z.coerce.number({
    required_error: "estimated delivery time is required",
    invalid_type_error: "must be a valid number",
  }),
  cuisines: z.array(z.string()).nonempty({
    message: "please select at least one item",
  }),
  menuItems: z.array(
    z.object({
      name: z.string().min(1, "name is required"),
      price: z.coerce.number().min(1, "price is required"),
    })
  ),
  imageUrl: z.string().optional(),
  imageFile: z.instanceof(File, { message: "image is required" }).optional(),
}).refine((data)=> data.imageUrl || data.imageFile, {
  message: "Either image URL or image file must be provided",
  path: ["imageFile"]
})

type RestaurantFormData = z.infer<typeof formSchema>;

type Props = {
  restaurant?: Restaurant // restaurant is undefined first so this question mark indicates it is optional thing
  onSave: (restaurantFormData: FormData) => void;
  isLoading: boolean;
};

const ManageRestaurantForm = ({ onSave, isLoading, restaurant }: Props) => {
  const form = useForm<RestaurantFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cuisines: [],
      menuItems: [{ name: "", price: 0 }],
    },
  });

  // pre populate data 
  useEffect(()=>{
    if(!restaurant){
      return;
    }

    // converting the price from backend user readable form 
    const deliveryPriceFormatted = parseInt(
      (restaurant.deliveryPrice / 100).toFixed(2)
    )
    
    const menuItemsFormatted = restaurant.menuItems.map((item)=>({
      ...item,
      price: parseInt((item.price / 100).toFixed(2)),
    }));

    const updatedRestaurant = {
      ...restaurant,
      deliveryPrice: deliveryPriceFormatted,
      menuItems: menuItemsFormatted
    }

    form.reset(updatedRestaurant)
  }, [form, restaurant])


  const onSubmit = (formDataJson: RestaurantFormData) => {
    // on submitting we have to convert form data json(plain JSON) to a new form Data object so that our api can accept that data 
    const formData = new FormData(); // hover over to know about this

    formData.append("restaurantName", formDataJson.restaurantName);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);
    formData.append("deliveryPrice", (formDataJson.deliveryPrice * 100).toString()); // sending the price to the lowest denomination so it will be helpful (like in stripe payment and for other developers)
    formData.append("estimatedDeliveryTime", formDataJson.estimatedDeliveryTime.toString()) // http requests will only deal with strings
    formDataJson.cuisines.forEach((cuisine,index)=>{
      formData.append(`cuisines[${index}]`, cuisine)
    })
    formDataJson.menuItems.forEach((menuItem, index)=>{
      formData.append(`menuItems[${index}][name]`, menuItem.name);
      formData.append(`menuItems[${index}][price]`, (menuItem.price * 100).toString());
    })

    if(formDataJson.imageFile){
      formData.append(`imageFile`, formDataJson.imageFile)
    }
    onSave(formData)
  } // we get all the  data after submit in plain old js object and then we're going to convert in into multipart form data object
  return (
    // we are wrapping the react hook form on the top of shad cn form, this will add the link bw these 2 // after that we are spreading all the form functions and methods and objects we get from the use form hook onto the shad cn form so that we link both these together
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-gray-50 p-10 rounded-lg"
      >
        <DetailsSection/>
        <Separator/>
        <CuisinesSection/>
        <Separator/>
        <MenuSection/>
        <Separator/>
        <ImageSection/>
        {isLoading ? <LoadingButton/> : <Button type="submit">Submit</Button>}
      </form>
      {/* handleSubmit function which is from react hook form will run the zod validations first and if the validation passes then it will call the onsubmit function and then onSubmit function will run with the data of form inside restaurantFormData */}
    </Form>
  );
};
export default ManageRestaurantForm;
