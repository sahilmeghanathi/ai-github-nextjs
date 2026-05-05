// components/shared/RepoInput.tsx
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function RepoInput({ onSubmit }: any) {
  const [repo, setRepo] = useState("");

  return (
    <div className="flex gap-2">
      <Input
        placeholder="owner/repo"
        value={repo}
        onChange={(e) => setRepo(e.target.value)}
      />
      <Button onClick={() => onSubmit(repo)}>Analyze</Button>
    </div>
  );
}
