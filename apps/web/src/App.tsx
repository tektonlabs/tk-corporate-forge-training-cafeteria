import { useEffect, useState } from "react";
import { fetchMenu, isSignedIn, signOut, type Menu } from "./api";
import { Cart, type CartLines } from "./components/Cart";
import { LoginForm } from "./components/LoginForm";
import { MenuList } from "./components/MenuList";
import { MyOrders } from "./components/MyOrders";

type Tab = "menu" | "orders";

export function App() {
  const [signedIn, setSignedIn] = useState(isSignedIn());
  const [name, setName] = useState(sessionStorage.getItem("name") ?? "");
  const [menu, setMenu] = useState<Menu | null>(null);
  const [cart, setCart] = useState<CartLines>({});
  const [tab, setTab] = useState<Tab>("menu");

  useEffect(() => {
    fetchMenu().then(setMenu);
  }, []);

  if (!signedIn) {
    return (
      <LoginForm
        onSignedIn={(n) => {
          setName(n);
          setSignedIn(true);
        }}
      />
    );
  }

  const add = (itemId: string) => setCart((c) => ({ ...c, [itemId]: (c[itemId] ?? 0) + 1 }));
  const remove = (itemId: string) =>
    setCart((c) => {
      const next = { ...c, [itemId]: (c[itemId] ?? 0) - 1 };
      if (next[itemId] <= 0) delete next[itemId];
      return next;
    });

  return (
    <div className="page">
      <header className="header">
        <h1>Cafetería</h1>
        <nav className="tabs">
          <button className={tab === "menu" ? "tab active" : "tab"} onClick={() => setTab("menu")}>
            Menú del día
          </button>
          <button className={tab === "orders" ? "tab active" : "tab"} onClick={() => setTab("orders")}>
            Mis pedidos
          </button>
        </nav>
        <div className="who">
          Hola, {name.split(" ")[0]}
          <button
            className="link"
            onClick={async () => {
              await signOut();
              setSignedIn(false);
            }}
          >
            Salir
          </button>
        </div>
      </header>

      {tab === "menu" && menu && (
        <main className="layout">
          <MenuList items={menu.items} onAdd={add} />
          <Cart menu={menu} lines={cart} onAdd={add} onRemove={remove} onPlaced={() => { setCart({}); setTab("orders"); }} />
        </main>
      )}
      {tab === "orders" && menu && <MyOrders menu={menu} />}

      <footer className="footer">Cafetería interna · Pedidos de lunes a viernes</footer>
    </div>
  );
}
