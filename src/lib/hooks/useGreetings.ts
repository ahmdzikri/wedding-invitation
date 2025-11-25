import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface Greeting {
  timestamp: string;
  name: string;
  message: string;
  attendance?: string;
}

interface Pagination {
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
  hasMore: boolean;
}

interface GreetingsResponse {
  greetings: Greeting[];
  pagination: Pagination;
}

interface AddGreetingRequest {
  name: string;
  message?: string;
  attendance: string;
}

interface AddGreetingResponse {
  success: boolean;
  greeting: Greeting;
}

// Fetch greetings from API with pagination
const fetchGreetings = async ({ pageParam = 1 }): Promise<GreetingsResponse> => {
  const response = await fetch(`/api/greetings?page=${pageParam}&limit=5`);
  if (!response.ok) {
    throw new Error('Failed to fetch greetings');
  }
  return response.json();
};

// Add new greeting via API
const addGreeting = async (data: AddGreetingRequest): Promise<AddGreetingResponse> => {
  console.log('Adding greeting:', data);
  
  const response = await fetch('/api/greetings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  console.log('Response status:', response.status);
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
    console.error('API Error:', errorData);
    throw new Error(errorData.details || errorData.error || `HTTP ${response.status}: Failed to add greeting`);
  }
  
  const result = await response.json();
  console.log('Success result:', result);
  return result;
};

// Hook to fetch greetings with infinite scroll
export const useGreetings = () => {
  return useInfiniteQuery({
    queryKey: ['greetings'],
    queryFn: fetchGreetings,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.pagination.hasMore ? lastPage.pagination.page + 1 : undefined;
    },
    staleTime: 30000, // 30 seconds
    refetchInterval: 60000, // Refetch every minute
  });
};

// Hook to add new greeting
export const useAddGreeting = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: addGreeting,
    onSuccess: () => {
      // Invalidate and refetch greetings after successful submission
      queryClient.invalidateQueries({ queryKey: ['greetings'] });
    },
  });
};

// Export types for use in components
export type { Greeting, AddGreetingRequest, Pagination };