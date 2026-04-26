import { useCallback, useRef } from "react";

/**
 * @param {boolean} isLoading - Current loading status (initial or fetching more)
 * @param {boolean} hasMore - Whether more data exists
 * @param {Function} fetchNextPage - The dispatch function to trigger
 */
export const useInfiniteScroll = (isLoading, hasMore, fetchNextPage) => {
   const observer = useRef();

   const lastElementRef = useCallback(
      (node) => {
         if (isLoading) return;

         if (observer.current) observer.current.disconnect();

         observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore) {
               fetchNextPage();
            }
         });

         if (node) observer.current.observe(node);
      },
      [isLoading, hasMore, fetchNextPage]
   );

   return lastElementRef;
};