import type { Route } from "./+types/addProduct";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function AddProduct() {
  return <p>add product</p>;
}
