import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { User } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// zod is used for validation errors and messages 

const formSchema = z.object({
  email: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  addressLine1: z.string().min(1, "Address line 1 is required"),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
});

export type UserFormData = z.infer<typeof formSchema>; // using zod framework to automatically determine the type based on the form Schema

type Props = {
  onSave: (userProfileData: UserFormData) => void;
  isLoading: boolean;
  currentUser: User;
  title?: string;
  buttonText?: string
};

const UserProfileForm = ({ onSave, isLoading, currentUser, title = "User Profile", buttonText = "Submit" }: Props) => {
  const form = useForm<UserFormData>({
    // react hook form library(useForm) with schema(type)
    resolver: zodResolver(formSchema), // options(validations and messages) passing with form schema
    defaultValues: currentUser, // add default values of the user if it is added already // if the component loads add the default values that is from current user
    // form is manages by react form library (react-form-hook syntax)
  }); // connecting zodResolver with react hook form library

  useEffect(()=>{
    form.reset(currentUser) // if the component re-renders and if the current user changes then it's going to call the reset function on the form which causes the form to re-render based on the new data that we pass to the reset function (which is current user)
  },[currentUser, form]) // if the page or component updates then we need to make sure that we receive a new current user data

  return (
    <Form {...form}>
      {/* linking shad cn form and destructuring all the properties */}
      <form
        onSubmit={form.handleSubmit(onSave)} // this handleSubmit is from react hook form
        className="space-y-4 bg-gray-50 rounded-lg md:p-10"
        noValidate
      >
        <div>
          <h2 className="text-2xl font-bold">{title}</h2>
          <FormDescription>
            View and change the profile information here
          </FormDescription>
        </div>

        <FormField
          control={form.control} // now controlled by the react-form library
          name="email"
          render={({ field }) => ( // this field object contains a bunch of information and properties about the state of this input
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} disabled className="bg-white" /> 
              </FormControl>
            </FormItem>
          )}
        ></FormField>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>

        <div className="flex flex-col md:flex-row gap-4">
          <FormField
            control={form.control}
            name="addressLine1"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Address Line 1</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
        </div>
        {isLoading ? (
          <LoadingButton />
        ) : (
          <Button type="submit" className="bg-orange-500">
        {buttonText}
          </Button>
        )}
      </form>
    </Form>
  );
};

export default UserProfileForm;
