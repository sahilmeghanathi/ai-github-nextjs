// lib/features/extractFeatures.ts
export function extractFeatures(data: any) {
  const fileFrequency: Record<string, number> = {};

  data.commits.forEach((commit: any) => {
    const files = commit.files || [];
    files.forEach((file: any) => {
      fileFrequency[file.filename] = (fileFrequency[file.filename] || 0) + 1;
    });
  });

  return {
    fileFrequency,
  };
}
