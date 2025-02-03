import { useEffect, useState } from "react";
import { Repositories } from "@/store/repository_provider";

import { ApiClient } from "@uniti/api-client";
import { LivekitRepository } from "@uniti/livekit-repository";

export const useAppInitializer = () => {
  const [repositories, setRepositories] = useState<[] | null>(null);
  const [initializationError, setInitializationError] = useState<Error | null>(
    null,
  );

  useEffect(() => {
    const prepare = () => {
      try {
        // const apiClient = new ApiClient();
        // const livekitRepository = new LivekitRepository("test", apiClient);

        // const repositories: Repositories = {
        //   apiClient,
        //   livekitRepository,
        // };

        setRepositories(repositories);
      } catch (e) {
        setInitializationError(Error("Failed to initialize app."));
      }
    };

    void prepare();
  }, []);

  return { repositories, initializationError };
};
