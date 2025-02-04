import React from "react";
import { Icon } from "@iconify/react";

const ButtonLoading = () => {
  return (
    <div className="flex items-center justify-center space-x-2">
      <Icon icon="eos-icons:loading" className="text-gray-600 dark:text-gray-300 text-xl animate-spin" />
      <span className="hidden md:block text-sm text-gray-600 dark:text-gray-300">
        Processing...
      </span>
    </div>
  );
};

export default ButtonLoading;
