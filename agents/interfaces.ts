// Agent role definitions and interfaces for multi-agent travel planner

export interface TripContext {
  userId: string;
  preferences: string[];
  startDate: string;
  endDate: string;
  budget: number;
  interests: string[];
  pastTrips?: any[];
  constraints?: any;
}

export interface AgentResponse {
  agent: string;
  reasoning: string;
  result: any;
}

export interface ItineraryAgent {
  planItinerary(context: TripContext): Promise<AgentResponse>;
}

export interface BudgetAgent {
  optimizeBudget(context: TripContext, itinerary: any): Promise<AgentResponse>;
}

export interface HotelAgent {
  findHotels(context: TripContext): Promise<AgentResponse>;
}

export interface InterestAgent {
  suggestActivities(context: TripContext): Promise<AgentResponse>;
}

export interface DocumentAgent {
  handleDocuments(context: TripContext): Promise<AgentResponse>;
}

export interface WeatherAgent {
  checkWeather(context: TripContext, itinerary: any): Promise<AgentResponse>;
}

export interface FlightAgent {
  findFlights(context: TripContext): Promise<AgentResponse>;
}

export interface ChatAgent {
  handleUserQuery(query: string, context: TripContext): Promise<AgentResponse>;
}

// Add more agent interfaces as needed for extensibility
