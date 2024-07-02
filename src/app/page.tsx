import Image from "next/image";
import CameraComponent from "../components/CameraComponent";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <CameraComponent />
    </main>
  );
}
