// Orchestrator for multi-agent collaboration
import {
  TripContext,
  AgentResponse,
  ItineraryAgent,
  BudgetAgent,
  HotelAgent,
  InterestAgent,
  DocumentAgent,
  WeatherAgent,
  FlightAgent,
  ChatAgent,
} from "../agents/interfaces";

export class AgentOrchestrator {
  itineraryAgent: ItineraryAgent;
  budgetAgent: BudgetAgent;
  hotelAgent: HotelAgent;
  interestAgent: InterestAgent;
  documentAgent: DocumentAgent;
  weatherAgent: WeatherAgent;
  flightAgent: FlightAgent;
  chatAgent: ChatAgent;

  constructor(
    itineraryAgent: ItineraryAgent,
    budgetAgent: BudgetAgent,
    hotelAgent: HotelAgent,
    interestAgent: InterestAgent,
    documentAgent: DocumentAgent,
    weatherAgent: WeatherAgent,
    flightAgent: FlightAgent,
    chatAgent: ChatAgent,
  ) {
    this.itineraryAgent = itineraryAgent;
    this.budgetAgent = budgetAgent;
    this.hotelAgent = hotelAgent;
    this.interestAgent = interestAgent;
    this.documentAgent = documentAgent;
    this.weatherAgent = weatherAgent;
    this.flightAgent = flightAgent;
    this.chatAgent = chatAgent;
  }

  async planTrip(context: TripContext): Promise<AgentResponse[]> {
    // Step 1: Find flights
    const flightRes = await this.flightAgent.findFlights(context);
    // Step 2: Find hotels
    const hotelRes = await this.hotelAgent.findHotels(context);
    // Step 3: Plan itinerary
    const itineraryRes = await this.itineraryAgent.planItinerary(context);
    // Step 4: Suggest activities
    const interestRes = await this.interestAgent.suggestActivities(context);
    // Step 5: Optimize budget
    const budgetRes = await this.budgetAgent.optimizeBudget(
      context,
      itineraryRes.result,
    );
    // Step 6: Check weather
    const weatherRes = await this.weatherAgent.checkWeather(
      context,
      itineraryRes.result,
    );
    // Step 7: Handle documents
    const documentRes = await this.documentAgent.handleDocuments(context);

    return [
      flightRes,
      hotelRes,
      itineraryRes,
      interestRes,
      budgetRes,
      weatherRes,
      documentRes,
    ];
  }

  async handleUserQuery(
    query: string,
    context: TripContext,
  ): Promise<AgentResponse> {
    return await this.chatAgent.handleUserQuery(query, context);
  }
}
