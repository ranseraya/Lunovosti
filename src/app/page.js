import Image from "next/image";
import { redirect } from "next/navigation";

export default function Root() {
  return (
    redirect('/Home')
  );
}
