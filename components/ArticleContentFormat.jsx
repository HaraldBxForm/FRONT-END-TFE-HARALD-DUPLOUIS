'use client'

import React from "react";

export default function ArticleContent({ text }) {
  if (!text) return null;

  const blocks = text.split(/\n{2,}/g);

  const html = blocks
    .map(block => {
      const lines = block.split('\n').map(l => l.trim()).filter(Boolean);
      if (!lines.length) return '';
      return `<p class="mb-4 leading-relaxed text-justify">${lines.map(escapeHtml).join('<br/>')}</p>`;
    })
    .join('');

  return (
    <div
      className="prose prose-invert max-w-none text-white/90"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;')
    .replace(/'/g,'&#039;');
}
