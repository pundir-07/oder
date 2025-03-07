

import CartProvider from "./context/cartContext";
import HomeContent from "./HomeContent";
import getItems from "./server/items";

export default async function Home() {
  const items = await getItems()
  return (
    <>
      <CartProvider>
        <HomeContent items={items} />
        <div className="hidden sm:grid w-full h-screen items-center">
          <h1 className="text-2xl text-center">
            This website works only on mobile devices kindly scan the below qr code on you mobile device to access the website.
          </h1>
        </div>
      </CartProvider>
    </>
  );
}
















