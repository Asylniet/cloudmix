import Link from "next/link";
import React from "react";
import { FC } from "react";

type MarkdownLiteProps = {
  text: string;
};

const MarkdownLite: FC<MarkdownLiteProps> = ({ text }) => {
  const linkRegex = /\[(.+?)\]\((.+?)\)/g;
  const parts = [];

  let lastIndex = 0;
  let match;

  while ((match = linkRegex.exec(text)) !== null) {
    const [fullMatch, linkText, linkUrl] = match;
    const matchStart = match.index;
    const matchEnd = matchStart + fullMatch.length;

    if (matchStart > lastIndex) {
      parts.push(text.slice(lastIndex, matchStart));
    }

    parts.push(
      <Link
        key={linkUrl}
        href={linkUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue underline underline-offset-2 break-words"
      >
        {linkText}
      </Link>
    );

    lastIndex = matchEnd;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return (
    <>
      {parts.map((part, i) => (
        <React.Fragment key={i}>{part}</React.Fragment>
      ))}
    </>
  );
};

export default MarkdownLite;
