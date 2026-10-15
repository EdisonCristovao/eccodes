import type { Metadata, ResolvingMetadata } from "next";
import CodeFilePage from "@/components/CodeFilePage";
import { FILES } from "@/lib/files";
import { pageMetadata } from "@/lib/site";

export async function generateMetadata(
  _props: unknown,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  return pageMetadata(parent, FILES.bio);
}

export default function Page() {
  return <CodeFilePage slug="bio" />;
}
