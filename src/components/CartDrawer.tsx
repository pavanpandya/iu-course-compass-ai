
import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Course } from "@/data/mockData";
import { ShoppingCart, X, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface CartDrawerProps {
  cartItems: Course[];
  removeFromCart: (course: Course) => void;
  clearCart: () => void;
  onEnroll?: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ 
  cartItems, 
  removeFromCart, 
  clearCart,
  onEnroll 
}) => {
  const totalCredits = cartItems.reduce((total, course) => total + course.credits, 0);
  
  const handleEnroll = () => {
    if (onEnroll) {
      onEnroll();
    }
  };
  
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-4 w-4" />
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-iu-crimson text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {cartItems.length}
            </span>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-lg">
          <DrawerHeader>
            <DrawerTitle>Course Cart</DrawerTitle>
            <DrawerDescription>
              {cartItems.length > 0
                ? `You have ${cartItems.length} courses (${totalCredits} credits) in your cart.`
                : "Your cart is empty."}
            </DrawerDescription>
          </DrawerHeader>
          
          {cartItems.length > 0 ? (
            <>
              <ScrollArea className="h-[50vh] px-4">
                <div className="space-y-4">
                  {cartItems.map((course) => (
                    <div
                      key={course.id}
                      className="flex justify-between items-center border rounded-lg p-3"
                    >
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">{course.code}</p>
                          <Badge 
                            variant={course.mode === "Online" ? "outline" : "default"}
                            className="ml-2"
                          >
                            {course.mode}
                          </Badge>
                        </div>
                        <h4 className="font-medium">{course.name}</h4>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                          <span>{course.professor.name}</span>
                          <span>•</span>
                          <span>{course.credits} credits</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                          <Calendar className="h-3 w-3" />
                          <span>
                            {course.schedule.days.join(", ")} {course.schedule.startTime}-{course.schedule.endTime}
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(course)}
                        className="ml-2"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              
              <div className="px-4 py-2">
                <Separator className="my-2" />
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Total Credits:</span>
                  <span>{totalCredits}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Total Courses:</span>
                  <span>{cartItems.length}</span>
                </div>
              </div>
              
              <DrawerFooter>
                <Button onClick={handleEnroll}>Enroll in Courses</Button>
                <Button variant="outline" onClick={clearCart}>
                  Clear Cart
                </Button>
                <DrawerClose asChild>
                  <Button variant="ghost">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center p-8">
              <ShoppingCart className="h-16 w-16 text-gray-300 mb-4" />
              <p className="text-gray-500">Your cart is empty.</p>
              <p className="text-gray-500 text-sm mt-1">
                Add courses to your cart to get started.
              </p>
              <DrawerClose asChild>
                <Button variant="outline" className="mt-4">
                  Browse Courses
                </Button>
              </DrawerClose>
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;
