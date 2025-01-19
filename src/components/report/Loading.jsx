import React from "react";
import { Icon } from "@iconify/react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center space-x-2">
      <Icon icon="eos-icons:loading" className="text-gray-600 dark:text-gray-300 text-xl animate-spin" />
      <span className="text-sm text-gray-600 dark:text-gray-300">
        Processing...
      </span>
    </div>
  );
};

export default Loading;
