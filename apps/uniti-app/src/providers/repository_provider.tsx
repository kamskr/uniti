import React, { createContext, useContext } from "react";

import type { ApiClient } from "@uniti/api-client";
import type { LivekitRepository } from "@uniti/livekit-repository";

export interface Repositories {
  apiClient: ApiClient;
  livekitRepository: LivekitRepository;
}

const RepositoryContext = createContext<Repositories | null>(null);

interface RepositoryProviderProps {
  children: React.ReactNode;
  repositories: Repositories;
}

export function RepositoryProvider({
  children,
  repositories,
}: RepositoryProviderProps) {
  return (
    <RepositoryContext.Provider value={repositories}>
      {children}
    </RepositoryContext.Provider>
  );
}

export function useRepository() {
  const context = useContext(RepositoryContext);
  if (!context) {
    throw new Error("useRepository must be used within a RepositoryProvider");
  }
  return context;
}

export function useApiClient() {
  const { apiClient } = useRepository();
  return apiClient;
}

export function useLivekitRepository() {
  const { livekitRepository } = useRepository();
  return livekitRepository;
}
