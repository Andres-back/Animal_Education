"use client";

import { useEffect, useRef, useState } from "react";

interface ModelViewerProps {
  src: string;
  alt: string;
  className?: string;
  interactive?: boolean;
  ar?: boolean;
  showArButton?: boolean;
}

export default function ModelViewer({
  src,
  alt,
  className = "",
  interactive = false,
  ar = false,
  showArButton = false,
}: ModelViewerProps) {
  const [ready, setReady] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let mounted = true;

    import("@google/model-viewer/dist/model-viewer-module.min.js")
      .then(() => {
        if (mounted) setReady(true);
      })
      .catch(() => {
        if (mounted) setReady(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!ready || !elementRef.current) return;

    const element = elementRef.current;
    element.setAttribute("src", src);
    element.setAttribute("alt", alt);
    element.setAttribute("auto-rotate", "");
    element.setAttribute("interaction-prompt", "none");
    element.setAttribute("shadow-intensity", "1");
    element.setAttribute("shadow-softness", "0.65");
    element.setAttribute("exposure", "1");
    element.setAttribute("environment-image", "neutral");

    if (interactive) {
      element.setAttribute("camera-controls", "");
    } else {
      element.removeAttribute("camera-controls");
    }

    if (ar) {
      element.setAttribute("ar", "");
      element.setAttribute("ar-modes", "webxr scene-viewer quick-look");
      element.setAttribute("ar-placement", "floor");
      element.setAttribute("ar-scale", "auto");
    } else {
      element.removeAttribute("ar");
      element.removeAttribute("ar-modes");
      element.removeAttribute("ar-placement");
      element.removeAttribute("ar-scale");
    }
  }, [alt, ar, interactive, ready, src]);

  if (!ready) {
    return (
      <div className={`grid place-items-center bg-white/70 text-sm font-bold text-slate-500 ${className}`}>
        Cargando 3D
      </div>
    );
  }

  return (
    <model-viewer
      ref={elementRef}
      className={className}
      style={{
        width: "100%",
        height: "100%",
        pointerEvents: interactive ? "auto" : "none",
        touchAction: interactive ? "pan-y" : "none",
      }}
    >
      {showArButton && (
        <button
          slot="ar-button"
          type="button"
          className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-violet-600 px-5 py-3 text-sm font-black text-white shadow-lg"
        >
          Ver en AR
        </button>
      )}
    </model-viewer>
  );
}
