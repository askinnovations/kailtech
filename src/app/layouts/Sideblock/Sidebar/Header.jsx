// Import Dependencies
import { Link } from "react-router";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

// Local Imports
import { Button } from "components/ui";
import { useSidebarContext } from "app/contexts/sidebar/context";

// Import image logo
import appLogo from "assets/logo.png"; 

// ----------------------------------------------------------------------

export function Header() {
  const { close } = useSidebarContext();
  return (
    <header className="relative flex h-[61px] shrink-0 items-center justify-between ltr:pl-6 ltr:pr-3 rtl:pl-3 rtl:pr-6">
      <div className="flex items-center justify-start gap-4 pt-3">
      <Link to="/">
          <img
            src={appLogo}
            alt="App Logo"
            className="h-10 w-auto object-contain"
          />
        </Link>
        
        {/* <LogoType className="h-5 w-auto text-gray-800 dark:text-dark-50" /> */}
      </div>
      <div className="pt-5 xl:hidden">
        <Button
          onClick={close}
          variant="flat"
          isIcon
          className="size-6 rounded-full"
        >
          <ChevronLeftIcon className="size-5 rtl:rotate-180" />
        </Button>
      </div>
    </header>
  );
}
