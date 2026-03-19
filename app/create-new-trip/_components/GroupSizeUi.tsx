import React from "react";

export const SelectTravelesList = [
  {
    id: 1,
    title: "Just Me",
    desc: "A sole traveler in exploration",
    icon: "👤",
    color: "bg-blue-100",
    people: "1",
  },
  {
    id: 2,
    title: "A Couple",
    desc: "Two travelers in tandem",
    icon: "👩‍❤️‍👨",
    color: "bg-pink-100",
    people: "2 People",
  },
  {
    id: 3,
    title: "Family",
    desc: "A group of fun loving adventurers",
    icon: "🏡",
    color: "bg-yellow-100",
    people: "3 to 5 People",
  },
  {
    id: 4,
    title: "Friends",
    desc: "A bunch of thrill-seekers",
    icon: "🎉",
    color: "bg-purple-100",
    people: "5 to 10 People",
  },
];

const GroupSizeUi = ({ onSelectedOption }: any) => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {SelectTravelesList.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectedOption(item.title + ":" + item.people)}
            className="border border-gray-100 p-5 rounded-[20px] cursor-pointer hover:shadow-md transition-shadow flex items-start gap-4 bg-white"
          >
            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 ${item.color} text-2xl`}
            >
              {item.icon}
            </div>
            <div className="text-left">
              <h3 className="text-[17px] font-bold text-gray-900">
                {item.title}
              </h3>
              <p className="text-gray-500 text-[14px] leading-snug mt-1">
                {item.desc}
              </p>
              <p className="text-blue-500 font-medium text-[13px] mt-1">
                {item.people}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupSizeUi;
