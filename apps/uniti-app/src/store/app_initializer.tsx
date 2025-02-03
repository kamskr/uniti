import React, { createContext, useContext, useEffect, useState } from "react";

import { ApiClient } from "@uniti/api-client";
import { LivekitRepository } from "@uniti/livekit-repository";

interface Repositories {
  apiClient: ApiClient;
  livekitRepository: LivekitRepository;
}

export const useAppInitializer = () => {
  const [repositories, setRepositories] = useState<Repositories | null>(null);
  const [initializationError, setInitializationError] = useState<Error | null>(
    null,
  );

  useEffect(() => {
    const prepare = () => {
      try {
        const apiClient = new ApiClient();
        const livekitRepository = new LivekitRepository("test", apiClient);

        const repositories: Repositories = {
          apiClient,
          livekitRepository,
        };

        setRepositories(repositories);
      } catch (e) {
        setInitializationError(Error("Failed to initialize app."));
      }
    };

    void prepare();
  }, []);

  return { repositories, initializationError };
};

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
