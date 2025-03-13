

import CartProvider from "../context/cartContext";
import OrderProvider from "../context/orderContext";
import HomeContent from "../components/HomeContent";
import getItems from "../actions/items";

export default async function Home() {
  console.log("Home PAGE render")
  const items = await getItems()
  return (
    <>

      <CartProvider>
        <OrderProvider>

          <HomeContent items={items} />
          <div className="hidden sm:grid w-full h-screen items-center">
            <h1 className="text-2xl text-center">
              This website works only on mobile devices kindly scan the below qr code on you mobile device to access the website.
            </h1>
          </div>
        </OrderProvider>
      </CartProvider>

    </>
  );
}
















