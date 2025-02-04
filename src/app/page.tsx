import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function Home() {
  const snippets = await prisma.snippet.findMany();

  if (!snippets) {
  }

  return (
    <div>
      <h1 className="font-bold text-6xl">Home</h1>
      <div className="flex items-center justify-between">
        <h1 className="font-bold mt-6 text-2xl">Snippets</h1>
        <Link href={"/snippet/new"}>
          <Button>New</Button>
        </Link>
      </div>

      {snippets.map((snippet) => (
        <div key={snippet.id} className="flex items-center justify-between p-4 mt-2 bg-gray-200 rounded-md">
          <h1 className="font-semibold">{snippet.title}</h1>
          <Link href={`/snippet/${snippet.id}`}>
            <Button variant={"link"}>View</Button>
          </Link>
        </div>
      ))}
    </div>
  );
}
