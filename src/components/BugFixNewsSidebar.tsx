'use client';

import React from 'react';

export interface BugFixItem {
  id: string;
  title: string;
  points: string[];
  linkCategory?: string;
}

const NEWS_DATA: BugFixItem[] = [
  {
    id: 'news-1',
    title: 'Walksnails 3.17.1',
    points: ['Fix Bugs', 'Heat Optimization'],
    linkCategory: 'vtx',
  },
  {
    id: 'news-2',
    title: 'DJI FPV SYSTEM UPDATE',
    points: ['Enhanced Range Performance', 'Reduced Latency', 'New Goggle Features'],
    linkCategory: 'vtx',
  },
  {
    id: 'news-3',
    title: 'BETAFLIGHT 4.5.0',
    points: ['New PID Controller', 'Improved GPS Rescue', 'Better Motor Protection'],
    linkCategory: 'betaflight',
  },
  {
    id: 'news-4',
    title: 'TBS CROSSFIRE UPDATE',
    points: ['Extended Range Mode', 'Power Output Optimization', 'Bug Fixes'],
    linkCategory: 'tango',
  },
  {
    id: 'news-5',
    title: 'IFLIGHT NEW FRAME',
    points: ['Ultra Light Design', 'Enhanced Durability', 'Better Cable Management'],
    linkCategory: 'frame',
  },
];

interface BugFixNewsSidebarProps {
  onSelectNews?: (category: string) => void;
}

export function BugFixNewsSidebar({ onSelectNews }: BugFixNewsSidebarProps) {
  return (
    <aside className="w-full lg:w-[260px] xl:w-[290px] shrink-0 border-r-[1.5px] border-dashed border-black pr-4 sm:pr-6 py-6 select-none">
      {/* Titre BugFixe News souligné d'une ligne pleine fine */}
      <div className="border-b border-black pb-2 mb-6">
        <h2 className="text-2xl font-light italic tracking-tight text-black font-sans">
          BugFixe News
        </h2>
      </div>

      {/* Liste des 5 blocs d'actualités avec séparation par lignes pleines */}
      <div className="space-y-6">
        {NEWS_DATA.map((item, index) => (
          <div
            key={item.id}
            onClick={() => item.linkCategory && onSelectNews && onSelectNews(item.linkCategory)}
            className={`cursor-pointer group ${
              index !== NEWS_DATA.length - 1 ? 'border-b border-zinc-200 pb-5' : ''
            }`}
          >
            <h3 className="text-sm font-medium italic uppercase tracking-wider text-black group-hover:underline">
              {item.title}
            </h3>
            <ul className="mt-2 space-y-1">
              {item.points.map((pt, i) => (
                <li
                  key={i}
                  className="text-xs font-light italic text-zinc-700 flex items-start gap-1"
                >
                  <span className="text-zinc-500">-</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Badge statut domaine SEEWORLD */}
      <div className="mt-12 pt-6 border-t-[1.5px] border-dashed border-black/40 text-[11px] text-zinc-500 space-y-1">
        <div className="flex items-center gap-1.5 font-mono text-black font-bold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
          <span>fixmydrone.fr</span>
        </div>
        <p className="italic text-[10px]">Charte SEEWORLD • Minimaliste & Filaire</p>
      </div>
    </aside>
  );
}
