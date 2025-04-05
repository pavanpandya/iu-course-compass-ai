
import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import CartDrawer from "@/components/CartDrawer";
import { Course } from "@/data/mockData";
import { toast } from "sonner";

const ChatbotPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<Course[]>([]);
  
  const removeFromCart = (course: Course) => {
    setCartItems(cartItems.filter(item => item.id !== course.id));
    toast.info("Removed from cart", {
      description: `${course.code} has been removed from your cart.`,
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="fixed top-4 right-4 z-50">
        <CartDrawer 
          cartItems={cartItems}
          removeFromCart={removeFromCart}
          clearCart={clearCart}
        />
      </div>
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Course Assistant AI</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">How to use the assistant</h2>
              <p className="text-gray-600 mb-6">
                Ask questions in natural language to get help with course selection, professor information, and academic planning.
              </p>
              
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Example questions:</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="bg-gray-100 p-2 rounded">
                      "What courses are best for becoming a Data Scientist?"
                    </li>
                    <li className="bg-gray-100 p-2 rounded">
                      "Which professors have high ratings for AI courses?"
                    </li>
                    <li className="bg-gray-100 p-2 rounded">
                      "Can I take STAT-S520 without prerequisites?"
                    </li>
                    <li className="bg-gray-100 p-2 rounded">
                      "Suggest electives for Spring that align with AI"
                    </li>
                  </ul>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <h3 className="font-medium mb-2 text-yellow-800">Note:</h3>
                  <p className="text-sm text-yellow-800">
                    This is a demo version with limited data. In a production version, this AI would have access to real-time course data, student records, and enrollment information.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2 h-[calc(100vh-280px)] min-h-[500px]">
            <Chatbot />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ChatbotPage;
