"use client";

import { useEffect, useRef } from 'react';
import { Terminal as XTerm } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { WebLinksAddon } from 'xterm-addon-web-links';
import { Card } from './ui/card';
import 'xterm/css/xterm.css';

export default function Terminal() {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<XTerm | null>(null);

  useEffect(() => {
    if (!terminalRef.current) return;

    const term = new XTerm({
      theme: {
        background: '#1a1b26',
        foreground: '#a9b1d6',
        cursor: '#c0caf5',
        selectionBackground: '#515c7e',
      },
      fontFamily: 'JetBrains Mono, monospace',
      fontSize: 14,
      cursorBlink: true,
    });

    const fitAddon = new FitAddon();
    const webLinksAddon = new WebLinksAddon();

    term.loadAddon(fitAddon);
    term.loadAddon(webLinksAddon);

    term.open(terminalRef.current);
    fitAddon.fit();

    term.write('Welcome to the collaborative terminal!\r\n$ ');

    term.onKey(({ key, domEvent }) => {
      const char = domEvent.key;
      if (char === 'Enter') {
        term.write('\r\n$ ');
      } else if (char === 'Backspace') {
        term.write('\b \b');
      } else {
        term.write(key);
      }
    });

    xtermRef.current = term;

    const handleResize = () => {
      fitAddon.fit();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      term.dispose();
    };
  }, []);

  return (
    <Card className="h-full rounded-none border-0 bg-[#1a1b26] p-2">
      <div ref={terminalRef} className="h-full" />
    </Card>
  );
}