import type { Metadata, ResolvingMetadata } from "next";
import React from "react";
import { pageMetadata } from "@/lib/site";
// import shiki from "shiki";

export async function generateMetadata(
  _props: unknown,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  return pageMetadata(parent, {
    title: "About me",
    description:
      "Who Edison Cristovão is: a full-stack developer sharing his profile, bio, terminal and dev setup in a code-editor-like site.",
    path: "/editor",
  });
}

export default async function page() {
  return (
    <div className="flex justify-center items-center flex-col h-full">
      <div className="px-5 md:px-0 mt-5 md:mt-0 md:w-1/2">
        <h2 className="mb-4">Explore My Profile!</h2>
        <p className="mb-4">
          I am thrilled to invite you to explore my profile and discover the
          world of my personal configurations. 🚀✨
        </p>
        <p className="mb-4">
          On my website, you will have the opportunity to delve into the essence
          of who I am and the unique settings I have crafted.
        </p>
        <p className="mb-4">
          Feel free to navigate through the pages, explore the content, and
          experience the essence of my personal configurations.
        </p>
        <p>Your feedback and thoughts are always appreciated and welcomed.</p>
        <p className="mb-4">
          Thank you for joining me on this exciting journey! 🌟
        </p>
        <p>Warm regards,</p>
        <p>Edison Cristovao</p>
      </div>
    </div>
  );
}
