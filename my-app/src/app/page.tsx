"use client";
import React from 'react';
//import './index.css';

import { QueryClientProvider, QueryClient } from 'react-query';
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      
    </QueryClientProvider>
    
  );
}
