

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


        </OrderProvider>
      </CartProvider>

    </>
  );
}
















