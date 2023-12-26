import { Suspense } from "react";
import { useLoaderData, useOutlet, Await } from "react-router-dom";
import { AuthProvider } from "../Hook/useAuth";

export const AuthLayout = () => {
  const outlet = useOutlet();

  const { userPromise } = useLoaderData();

  return (
    <Suspense>
      <Await
        resolve={userPromise}
        errorElement={<h1>Something went wrong!</h1>}
        children={(accessToken) => (
          <AuthProvider initialAccessToken={accessToken}>{outlet}</AuthProvider>
        )}
      />
    </Suspense>
  );
};
