import type { Repositories } from "@/providers/repository_provider";
import { useEffect, useState } from "react";
import functions from "@react-native-firebase/functions";

import { ApiClient } from "@uniti/api-client";
import { LivekitRepository } from "@uniti/livekit-repository";

export const useAppInitializer = () => {
  const [repositories, setRepositories] = useState<Repositories | null>(null);
  const [initializationError, setInitializationError] = useState<Error | null>(
    null,
  );

  useEffect(() => {
    const prepare = () => {
      try {
        const functionsInstance = functions();

        if (__DEV__) {
          // If you are running on a physical device,
          // replace http://localhost with the local ip of your PC. (http://192.168.x.x)
          functionsInstance.useEmulator("127.0.0.1", 5001);
        }

        const apiClient = new ApiClient(functionsInstance);
        // for android emulator use "ws://10.0.2.2:7880",

        const livekitRepository = new LivekitRepository(apiClient);

        const repositories: Repositories = {
          apiClient,
          livekitRepository,
        };

        setRepositories(repositories);
      } catch (e) {
        console.error("Failed to initialize app:", e);
        setInitializationError(Error("Failed to initialize app."));
      }
    };

    void prepare();
  }, []);

  return { repositories, initializationError };
};
