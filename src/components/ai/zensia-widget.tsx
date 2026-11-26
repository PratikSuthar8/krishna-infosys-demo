"use client";

import Script from "next/script";

export function ZensiaWidget() {
  const agentToken = process.env.NEXT_ZENSIA_AGENT_TOKEN;

  if (!agentToken) {
    return null;
  }

  return (
    <Script
      src="https://app.zensia.si/widget.js"
      data-agent-token={agentToken}
      strategy="afterInteractive"
    />
  );
}
