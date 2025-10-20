import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "n5elvhr7", // from sanity.json or manage.sanity.io
  dataset: "production",
  apiVersion: "2024-05-11",
  useCdn: false,
});
