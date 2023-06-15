import React from "react";
import shiki from "shiki";
import CodePreview from "@/components/CodePreview";

const content = `
 /**
   * 👋 Hi, I am Edison Cristovao 🧑‍💻
   *
   * Fullstack Dev based in Brazil(🇧🇷), with
   * experience in web and mobile app development.
   * Frontend is my new passion, I have been working
   * with some decentralized projects like NFT marketplaces
   * and DAPP projects in general.
   *
   * For your projects I bring more than 5 years of experience
   * with multiple technologies such as:
   * ReactJS, React Native, next js, node js,
   * and database in general.
   * I also bring great communication, teamwork and speed
   * without wasting time and money
   */
`.trim();

export default async function page() {
  const highlighter = await shiki.getHighlighter({
    theme: "dracula",
  });
  const code = highlighter.codeToHtml(content, { lang: "js" });

  return <CodePreview code={code} />;
}
