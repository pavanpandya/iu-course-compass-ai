
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  NavigationMenu, 
  NavigationMenuContent, 
  NavigationMenuItem, 
  NavigationMenuLink, 
  NavigationMenuList, 
  NavigationMenuTrigger 
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex items-center">
          <Link to="/" className="flex items-center">
            <div className="h-10 w-10 rounded-md bg-iu-crimson flex items-center justify-center mr-2">
              <span className="text-white font-bold text-lg">IU</span>
            </div>
            <span className="text-xl font-bold">CourseCompass</span>
          </Link>
        </div>

        <div className="flex-1">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Courses</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href="/search"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium">
                            Course Search
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Find and explore available courses
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href="/recommendations" title="Course Recommendations">
                      Get personalized course recommendations based on your interests and academic goals
                    </ListItem>
                    <ListItem href="/enrolled" title="My Enrolled Courses">
                      View and manage your currently enrolled courses by term
                    </ListItem>
                    <ListItem href="/chatbot" title="AI Assistant">
                      Chat with our AI course assistant for help and guidance
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/search">
                  <Button variant="ghost">Search</Button>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/recommendations">
                  <Button variant="ghost">Recommendations</Button>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/enrolled">
                  <Button variant="ghost">My Courses</Button>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/chatbot">
                  <Button variant="ghost">Assistant</Button>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center space-x-2">
          <Button onClick={() => navigate("/search")}>Find Courses</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
