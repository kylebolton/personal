"use client";

import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import FuturisticBackground from "@/components/FuturisticBackground";
import "./monochrome.css";

export default function Home() {
  const [displayText, setDisplayText] = useState("");
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Use useMemo to prevent the phrases array from being recreated on every render
  const phrases = useMemo(
    () => ["UI engineer", "fintech enthusiast", "crypto advocate"],
    []
  );

  useEffect(() => {
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseTime = 1500;

    const currentPhrase = phrases[currentPhraseIndex];

    if (!isDeleting && displayText === currentPhrase) {
      setTimeout(() => setIsDeleting(true), pauseTime);
      return;
    }

    if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setCurrentPhraseIndex(prevIndex => (prevIndex + 1) % phrases.length);
      return;
    }

    const timeout = setTimeout(
      () => {
        setDisplayText(prev => {
          if (isDeleting) {
            return prev.substring(0, prev.length - 1);
          } else {
            return currentPhrase.substring(0, prev.length + 1);
          }
        });
      },
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [displayText, currentPhraseIndex, isDeleting, phrases]);

  return (
    <>
      <FuturisticBackground />

      <div className="fixed inset-0 overflow-auto bg-transparent text-white font-sans">
        <div className="container mx-auto px-6 py-8 h-full flex flex-col relative z-10">
          <main className="flex-grow flex flex-col justify-center py-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-12">
                <div className="mb-6 text-left">
                  <h1 className="monochrome-title text-5xl md:text-6xl lg:text-7xl mb-4">
                    Kyle Bolton
                  </h1>
                </div>
                <div className="bio-section max-w-2xl mb-12">
                  <p className="monochrome-text text-xl md:text-2xl">
                    I&apos;m a{" "}
                    <span className="typing-text">{displayText}</span>
                    <span className="typing-cursor">|</span>,
                    <br />
                    living and working in{" "}
                    <Link
                      href="https://en.wikipedia.org/wiki/London"
                      className="monochrome-link-subtle"
                    >
                      London, UK
                    </Link>
                    . Currently a senior engineer for{" "}
                    <Link
                      href="https://www.handelsbanken.co.uk"
                      className="monochrome-link-subtle"
                    >
                      Handelsbanken
                    </Link>
                    .
                  </p>
                </div>

                <div className="mt-16">
                  <h2 className="monochrome-label mb-8">Links</h2>
                  <ul className="space-y-4">
                    <li>
                      <Link
                        href="https://github.com/kylebolton"
                        className="monochrome-link text-4xl md:text-5xl lg:text-6xl block"
                      >
                        GITHUB
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://www.linkedin.com/in/kyle-bolton-51453920/"
                        className="monochrome-link text-4xl md:text-5xl lg:text-6xl block"
                      >
                        LINKEDIN
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="mailto:hello@kylebolton.me"
                        className="monochrome-link text-4xl md:text-5xl lg:text-6xl block"
                      >
                        EMAIL
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </main>

          <footer className="py-4 border-t border-white/10">
            <div className="flex justify-between items-center">
              <p className="monochrome-text text-sm opacity-50">
                © {new Date().getFullYear()} Kyle Bolton
              </p>
              <p className="monochrome-text text-sm opacity-50">London, UK</p>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
