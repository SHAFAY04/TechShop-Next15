"use client"
import React from "react";
import { useSelector } from 'react-redux';
import { rootState } from './store';
import Chat from './chat';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const chatOpened = useSelector<rootState>((state) => state.state.chatOpened);

  return (
    <div className="flex overflow-x-hidden p-5 space-x-4">
      <div 
        className="relative min-h-screen transition-all duration-1000 ease-out flex-shrink-0"
        style={{
          width: chatOpened ? '1450px' : '100%',
        }}
      >
        <div>
          <div className="absolute top-24 md:top-20 lg:top-20 left-0 right-0 border-t"></div>
          <div className="absolute bottom-10 md:bottom-14 lg:bottom-20 left-0 right-0 border-t"></div>
          <div className="absolute top-0 bottom-0 left-10 md:left-14 lg:left-20 w-[1px] border-l"></div>
          <div className="absolute top-0 bottom-0 right-10 md:right-14 lg:right-20 w-[1px] border-l"></div>

          {/* Main content and header */}
          <div className="relative z-10 flex mx-12 md:mx-20 lg:mx-24 flex-col items-center">
            {children}
          </div>
        </div>
      </div>
      <Chat/>
    </div>
  );
}
