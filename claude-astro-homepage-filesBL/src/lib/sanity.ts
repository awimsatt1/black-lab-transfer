import { createClient } from "@sanity/client";

export const sanity = createClient({
  projectId: "tc4dza0v",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});
