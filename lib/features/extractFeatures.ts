export function extractFeatures(data: any) {
  const fileFrequency: Record<string, number> = {};

  console.log("Extracting features from data:", data.commits.forEach((commit: any) => {
    console.log("Processing commit:", commit);
  }));

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
