"use client";

import { useEffect, useRef } from "react";

interface AdsterraBannerProps {
  adKey: string;
  format?: "iframe" | "banner";
  width?: number;
  height?: number;
  scriptSrc: string;
}

export default function AdsterraBanner({
  adKey,
  format = "iframe",
  width = 728,
  height = 90,
  scriptSrc,
}: AdsterraBannerProps) {
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bannerRef.current || bannerRef.current.childElementCount > 0) return;

    const conf = document.createElement("script");
    conf.innerHTML = `atOptions = {
      'key' : '${adKey}',
      'format' : '${format}',
      'height' : ${height},
      'width' : ${width},
      'params' : {}
    };`;

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = scriptSrc;
    script.async = true;

    bannerRef.current.appendChild(conf);
    bannerRef.current.appendChild(script);
  }, [adKey, format, height, width, scriptSrc]);

  return (
    <div
      ref={bannerRef}
      className="flex items-center justify-center overflow-hidden"
      style={{ minHeight: height, minWidth: width, maxWidth: "100%" }}
    />
  );
}
