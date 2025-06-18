import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
   <div>
    <h1> Myre Umbi </h1>
  <Button variant ="outline"> Working </Button>

<UserButton/>
   </div>

  );
}
