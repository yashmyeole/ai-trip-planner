"use client";
import { Button } from '@/components/ui/button';
import { Timeline } from '@/components/ui/timeline';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import HotelCardItem from './HotelCardItem';
import PlaceCardItem from './PlaceCardItem';
import { useTripDetail } from '@/app/provider';

// const TRIP_DATA = {
//   budget: "Medium",
//   destination: "Goa",
//   duration: "6 Days",
//   group_size: "Family: 3 to 5 People",
//   hotels: [
//     {
//       description:
//         "A tranquil beachfront resort in South Goa with amenities suitable for families, including pools and kids club. Close to shops and nightlife spots.",
//       geo_coordinates: {
//         latitude: 15.2036,
//         longitude: 73.9597,
//       },
//       hotel_address:
//         "Arossim Beach, Cansaulim, South Goa, Goa 403712",
//       hotel_image_url:
//         "https://www.resortrio.com/wp-content/uploads/2020/02/hero-9.jpg",
//       hotel_name: "Resort Rio",
//       price_per_night: "₹4500",
//       rating: 4.3,
//     },
//     {
//       description:
//         "Located close to Baga Beach, this hotel is perfect for families eager to party at nearby bars and clubs, offering a scenic pool and comfortable rooms.",
//       geo_coordinates: {
//         latitude: 15.5904,
//         longitude: 73.7562,
//       },
//       hotel_address: "Baga Beach Rd, Baga, Goa 403516",
//       hotel_image_url:
//         "https://beachcombergoa.com/wp-content/uploads/2019/08/hero-1.jpg",
//       hotel_name: "Beachcomber Goa",
//       price_per_night: "₹4000",
//       rating: 4.1,
//     },
//     {
//       description:
//         "A boutique resort in Calangute known for its blend of traditional Goan architecture and modern comforts. Excellent spot for exploring local nightlife.",
//       geo_coordinates: {
//         latitude: 15.5912,
//         longitude: 73.7559,
//       },
//       hotel_address: "Azad Road, Calangute, Goa 403516",
//       hotel_image_url:
//         "https://www.casadegoa.com/wp-content/uploads/2018/12/hotel-casa-de-goa-3-1200x675.jpg",
//       hotel_name: "Casa De Goa Boutique Resort",
//       price_per_night: "₹4800",
//       rating: 4.5,
//     },
//   ],
//   itinerary: [
//     {
//       activities: [
//         {
//           best_time_to_visit:
//             "Evening (5 PM - 11 PM) for nightlife",
//           geo_coordinates: {
//             latitude: 15.5904,
//             longitude: 73.7562,
//           },
//           place_address: "Baga Beach, Bardez, Goa",
//           place_details:
//             "Popular beach known for its lively nightlife with numerous bars, clubs, and restaurants lining the shore. Ideal for families to enjoy sunset and festive evenings.",
//           place_image_url:
//             "https://upload.wikimedia.org/wikipedia/commons/4/40/Baga_Beach_Goa_2016.jpg",
//           place_name: "Baga Beach",
//           ticket_pricing: "Free",
//           time_travel_each_location:
//             "From Airport or Hotel - 30 mins",
//         },
//       ],
//       best_time_to_visit_day: "Evening (5 PM - 11 PM)",
//       day: 1,
//       day_plan:
//         "Arrival and Evening Leisure at Baga Beach - Explore Nightlife",
//     },
//     {
//       activities: [
//         {
//           best_time_to_visit: "Morning (8 AM - 12 PM)",
//           geo_coordinates: {
//             latitude: 15.4909,
//             longitude: 73.7804,
//           },
//           place_address: "Sinquerim, Bardez, Goa 403515",
//           place_details:
//             "A 17th-century Portuguese fort overlooking the Arabian Sea, offering panoramic views and a historical perspective.",
//           place_image_url:
//             "https://upload.wikimedia.org/wikipedia/commons/1/17/Fort_Aguada.jpg",
//           place_name: "Fort Aguada",
//           ticket_pricing: "₹25 per person",
//           time_travel_each_location:
//             "45 mins from Baga Beach",
//         },
//         {
//           best_time_to_visit: "Evening (7 PM - 11 PM)",
//           geo_coordinates: {
//             latitude: 15.5908,
//             longitude: 73.7545,
//           },
//           place_address: "Baga Beach Road, Baga, Goa",
//           place_details:
//             "One of the most popular clubs in Goa famous for its lively atmosphere, great music, and family-friendly inside spaces earlier in the evening.",
//           place_image_url:
//             "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/9c/ae/a3/titos-club.jpg",
//           place_name: "Tito's Club",
//           ticket_pricing: "Entry ₹500 approx",
//           time_travel_each_location:
//             "5 mins from Baga Beach",
//         },
//       ],
//       best_time_to_visit_day: "Morning and Evening",
//       day: 2,
//       day_plan: "Sightseeing Day with Evening Club Visit",
//     },
//     {
//       activities: [
//         {
//           best_time_to_visit: "Morning (9 AM - 12 PM)",
//           geo_coordinates: {
//             latitude: 15.4972,
//             longitude: 73.8278,
//           },
//           place_address: "Old Goa, Goa 403402",
//           place_details:
//             "UNESCO World Heritage site known for its beautiful baroque architecture and the tomb of St. Francis Xavier.",
//           place_image_url:
//             "https://upload.wikimedia.org/wikipedia/commons/f/fd/Basilica_of_Bom_Jesus_-_Panaji%2C_Goa.jpg",
//           place_name: "Basilica of Bom Jesus",
//           ticket_pricing: "Free",
//           time_travel_each_location: "30 mins from Panaji",
//         },
//         {
//           best_time_to_visit: "Night (7 PM - 12 AM)",
//           geo_coordinates: {
//             latitude: 15.591,
//             longitude: 73.7587,
//           },
//           place_address: "Calangute Beach, Bardez, Goa",
//           place_details:
//             "Known for vibrant night parties, beach shacks play live music, DJ nights and light shows, great for family friendly evening entertainment.",
//           place_image_url:
//             "https://media-cdn.tripadvisor.com/media/photo-s/16/35/90/b6/calangute-beach.jpg",
//           place_name: "Calangute Beach Night Party",
//           ticket_pricing:
//             "Free entry, pay for food and drinks",
//           time_travel_each_location:
//             "10 mins from Baga Beach",
//         },
//       ],
//       best_time_to_visit_day: "Morning and Night",
//       day: 3,
//       day_plan:
//         "Cultural Sightseeing & Evening Beach Party",
//     },
//     {
//       activities: [
//         {
//           best_time_to_visit: "Morning (9 AM - 1 PM)",
//           geo_coordinates: {
//             latitude: 15.6072,
//             longitude: 73.749,
//           },
//           place_address: "Anjuna Beach, Bardez, Goa",
//           place_details:
//             "A vibrant market with numerous stalls selling handicrafts, clothes, souvenirs, and fresh food. Great daytime family outing.",
//           place_image_url:
//             "https://upload.wikimedia.org/wikipedia/commons/d/dd/Anjuna_Flea_Market.JPG",
//           place_name: "Anjuna Beach Flea Market",
//           ticket_pricing: "Free",
//           time_travel_each_location:
//             "15 mins from Baga Beach",
//         },
//         {
//           best_time_to_visit: "Evening (5 PM - 10 PM)",
//           geo_coordinates: {
//             latitude: 15.6073,
//             longitude: 73.7493,
//           },
//           place_address: "Anjuna Beach, Bardez, Goa",
//           place_details:
//             "Popular beach shack known for its chill vibe at Anjuna beach with music events and casual dine-in experience, family friendly till evening.",
//           place_image_url:
//             "https://cdn.shopify.com/s/files/1/0277/2396/2543/articles/curlies_1024x.jpg",
//           place_name: "Curlies Beach Shack",
//           ticket_pricing:
//             "Free entry, pay for food and drinks",
//           time_travel_each_location:
//             "Right at Anjuna Beach Market",
//         },
//       ],
//       best_time_to_visit_day: "Daytime & Evening",
//       day: 4,
//       day_plan: "Relaxation & Exploration with Beach Clubs",
//     },
//     {
//       activities: [
//         {
//           best_time_to_visit: "Afternoon (3 PM - 5 PM)",
//           geo_coordinates: {
//             latitude: 15.4522,
//             longitude: 73.8319,
//           },
//           place_address: "Dona Paula, Goa",
//           place_details:
//             "Scenic viewpoint overlooking the Arabian Sea, perfect for family photos and exploring the serene environment during the day.",
//           place_image_url:
//             "https://upload.wikimedia.org/wikipedia/commons/5/5a/Dona_Paula_Goa_2017.jpg",
//           place_name: "Dona Paula Viewpoint",
//           ticket_pricing: "Free",
//           time_travel_each_location:
//             "40 mins from Baga Beach",
//         },
//         {
//           best_time_to_visit: "Evening (6 PM - 10 PM)",
//           geo_coordinates: {
//             latitude: 15.4899,
//             longitude: 73.8255,
//           },
//           place_address: "Panaji - Mapusa Rd, Panaji, Goa",
//           place_details:
//             "Cozy lounge bar in Panaji offering a great variety of drinks and live music perfect for a relaxed family evening.",
//           place_image_url:
//             "https://media-cdn.tripadvisor.com/media/photo-s/11/87/19/0f/restaurant-joseph.jpg",
//           place_name: "Joseph Bar and Restaurant",
//           ticket_pricing:
//             "Entry Free, pay for food and drinks",
//           time_travel_each_location: "5 mins in Panaji",
//         },
//       ],
//       best_time_to_visit_day: "Day and Evening",
//       day: 5,
//       day_plan:
//         "Panaji City Exploration & Evening Lounge Bars",
//     },
//     {
//       activities: [
//         {
//           best_time_to_visit: "Morning (7 AM - 11 AM)",
//           geo_coordinates: {
//             latitude: 15.2045,
//             longitude: 73.9612,
//           },
//           place_address: "Arossim Beach, Cansaulim, Goa",
//           place_details:
//             "A quieter beach in South Goa ideal for morning relaxation and family strolls before departure.",
//           place_image_url:
//             "https://media-cdn.tripadvisor.com/media/photo-s/12/da/7a/22/arossim-beach.jpg",
//           place_name: "Arossim Beach",
//           ticket_pricing: "Free",
//           time_travel_each_location:
//             "Depends on hotel location",
//         },
//       ],
//       best_time_to_visit_day: "Morning to Afternoon",
//       day: 6,
//       day_plan:
//         "Leisure Day & Departure Preparation - Relax at Hotel or Nearby Beach",
//     },
//   ],
//   origin: "Mumbai",
// }

const Itinenary = () => {
  const {tripDetailInfo: TRIP_DATA} =  useTripDetail();
  // console.log("TRIP DATA IN ITINENARY:", TRIP_DATA);
  const hotels = TRIP_DATA?.hotels ?? [];
  const itinerary = TRIP_DATA?.itinerary ?? [];

  const data = [
    {
      title: "Recommended Hotels",
      content: (
        <div>
            {hotels.map((hotel: any, index: number) => (
                <HotelCardItem key={index} hotel={hotel}/>
            ))}
        </div>
      ),
    },
    ...itinerary.map((day:any, index:any) => ({
      title: `Day ${day.day}: ${day.day_plan}`,
      content: (
        <PlaceCardItem day={day} key={index}/>
      ),
    })),
  ];
  return (
    <div className={`relative w-full h-[87vh] overflow-y-scroll ${TRIP_DATA && "px-4 py-6"} border border-gray-300 rounded-lg`}>
      {TRIP_DATA && <Timeline data={data} tripData={TRIP_DATA}/>}
      {!TRIP_DATA && <div className="flex flex-col items-center justify-center h-full">
        <Image src="/Travel.png" className='w-full h-full' alt="No Data" width={150} height={150} />
      </div>}
    </div>
  );
}

export default Itinenary