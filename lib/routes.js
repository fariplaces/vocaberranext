export const routes = {
   public: [
      "/", 
      "/auth/me", 
      "/auth/login", 
      "/auth/register",
      // protectedTemp
      // "/typing/exercises"
   ],
   protected: ["/dashboard", "/profile"],
   admin: ["/admin"]
};