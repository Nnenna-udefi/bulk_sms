import Image from "next/image";
import Home from "./src/home";
import Nav from "./src/nav";

export default function HomePage() {
  return (
    <div>
      <Nav />
      <Home />
    </div>
  );
}
