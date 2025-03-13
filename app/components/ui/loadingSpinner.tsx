import { Loader2 } from "lucide-react";
import React from "react";

export default function LoadingSpinner() {
  return <div>
    <Loader2 className="w-10 h-10 animate-spin " color="red" />
  </div>;
}
