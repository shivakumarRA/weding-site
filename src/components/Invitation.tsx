"use client";

import { useState } from "react";
import { Closing } from "./Closing";
import { Countdown } from "./Countdown";
import { Couple } from "./Couple";
import { Family } from "./Family";
import { FloatingActions } from "./FloatingActions";
import { Hero } from "./Hero";
import { LanguageProvider } from "./i18n";
import { MusicProvider } from "./MusicProvider";
import { Muhurtham } from "./Muhurtham";
import { Nav } from "./Nav";
import { Opening } from "./Opening";
import { Venue } from "./Venue";

export function Invitation() {
  const [opened, setOpened] = useState(false);

  return (
    <LanguageProvider>
      <MusicProvider>
        <Opening onOpen={() => setOpened(true)} />
        <Nav />
        <main>
          <Hero opened={opened} />
          <Couple />
          <Muhurtham />
          <Countdown />
          <Venue />
          <Family />
        </main>
        <Closing />
        <FloatingActions />
      </MusicProvider>
    </LanguageProvider>
  );
}
