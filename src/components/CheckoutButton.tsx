import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import LoadingButton from "./LoadingButton";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import UserProfileForm, { UserFormData } from "@/forms/user-profile-form/UserProfileForm";
import { useGetMyUser } from "@/api/MyUserApi";

type Props = {
  onCheckout: (userFormData: UserFormData)=> void
  disabled: boolean;
  isLoading: boolean;
}

const CheckoutButton = ({onCheckout, disabled, isLoading}: Props) => {
  const {
    isAuthenticated,
    isLoading: isAuthLoading,
    loginWithRedirect,
  } = useAuth0();

  const { pathname } = useLocation(); // save the current path of the restaurant /details/82372949238...

  const {currentUser, isLoading: isGetUserLoading} = useGetMyUser()

  const onLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: pathname,
      },
    });
  }; // if user click on login in the restaurant page then this will send back the user to this pathname again where the user was previously

  if (!isAuthenticated) {
    return (
      <Button onClick={onLogin} className="bg-orange-500 flex-1">
        Login to check out
      </Button>
    );
  }

  if (isAuthLoading || !currentUser || isLoading) {
    return <LoadingButton />;
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={disabled} className="bg-orange-500 flex-1">Go to checkout</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px] md:min-w-[700px] bg-gray-50">
        <UserProfileForm currentUser={currentUser} onSave={onCheckout} isLoading={isGetUserLoading} title="Confirm Delivery Details" buttonText="Continue to payment"/>
      </DialogContent>
    </Dialog>
  );
};
export default CheckoutButton;
