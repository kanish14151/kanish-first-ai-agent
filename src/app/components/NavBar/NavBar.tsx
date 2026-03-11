"use client";

import Image from "next/image";
import Link from "next/link";

import { useSharedUIState } from "@/app/context/UIStateContext";
import { useIsMobile } from "@/app/hooks/useIsMobile";

export const NavBar = () => {
  const isMobile = useIsMobile();
  const { actions } = useSharedUIState();

  return (
    <div className="fixed top-0 left-0 w-full z-10 bg-container">
      <div className="flex items-center justify-between px-6 pt-3">
        <div className="flex items-center gap-m">
          <Link
            onClick={() => actions.resetState()}
            href="/"
            className="flex items-center gap-2"
          >
            <Image
              src="/chat-logo.png"
              alt="Chat with C1"
              width={36}
              height={36}
              className="rounded-lg"
            />
            <div className="flex items-center gap-1">
              <h1 className="text-primary">Search</h1>
              <p className="text-secondary">by AJ STUDIOZ</p>
            </div>
          </Link>
        </div>
        {/* Buttons have been removed from here */}
        <div className="flex items-center gap-2">
        </div>
      </div>
    </div>
  );
};
