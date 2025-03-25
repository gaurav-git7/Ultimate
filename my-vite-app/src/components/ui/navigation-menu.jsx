import * as React from "react";

const NavigationMenu = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <nav ref={ref} className={className} {...props}>
      {children}
    </nav>
  );
});
NavigationMenu.displayName = "NavigationMenu";

const NavigationMenuList = React.forwardRef(({ className, ...props }, ref) => {
  return <ul ref={ref} className={className} {...props} />;
});
NavigationMenuList.displayName = "NavigationMenuList";

const NavigationMenuItem = React.forwardRef(({ className, ...props }, ref) => {
  return <li ref={ref} className={className} {...props} />;
});
NavigationMenuItem.displayName = "NavigationMenuItem";

const NavigationMenuLink = React.forwardRef(({ className, ...props }, ref) => {
  return <a ref={ref} className={className} {...props} />;
});
NavigationMenuLink.displayName = "NavigationMenuLink";

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
}; 