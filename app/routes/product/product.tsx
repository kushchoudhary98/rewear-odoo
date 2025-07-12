import type { Route } from "./+types/product";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Product() {
  return <p>Product details</p>;
}
