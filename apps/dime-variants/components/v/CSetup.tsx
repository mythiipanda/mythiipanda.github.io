"use client";

import { CodeBlock } from "@/components/arc/code-block/code-block";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const backend = [
  "git clone https://github.com/mythiipanda/dime && cd dime",
  "./scripts/fetch-data.sh",
  "cd backend",
  "uv venv --python 3.12",
  "uv pip install -r requirements.txt",
  "cp .env.example .env",
  "python scripts/generate_asset_manifest.py \\",
  "  manifest/expected_asset_manifest.json",
  "DIME_EXPECTED_ASSET_MANIFEST=$PWD/manifest/expected_asset_manifest.json \\",
  "  uvicorn app.main:app --port 8010",
].join("\n");

const frontend = ["cd frontend", "npm install", "NEXT_PUBLIC_BACKEND_URL=http://127.0.0.1:8010 npm run dev"].join("\n");

export function CSetup() {
  return (
    <section id="self-host" className="mx-auto grid max-w-[1320px] scroll-mt-24 items-start gap-8 px-5 py-14 md:px-6 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-5">
        <h2 className="text-[30px] leading-[34px] md:text-[40px] md:leading-[44px]">Run it on your machine.</h2>
        <p className="mt-4 max-w-[380px] text-[15px] leading-[23px] text-ink-2">Backend first, then the frontend in a second terminal. Open localhost:3000.</p>
      </div>
      <Tabs defaultValue="backend" className="min-w-0 gap-3 lg:col-span-7">
        <TabsList className="w-fit">
          <TabsTrigger value="backend">Backend</TabsTrigger>
          <TabsTrigger value="frontend">Frontend</TabsTrigger>
        </TabsList>
        <TabsContent value="backend"><CodeBlock filename="backend.sh" language="bash" code={backend} /></TabsContent>
        <TabsContent value="frontend"><CodeBlock filename="frontend.sh" language="bash" code={frontend} /></TabsContent>
      </Tabs>
    </section>
  );
}
