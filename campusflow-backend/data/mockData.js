const mockData = {
  routine: [
    {
      subject: "Advanced DBMS",
      time: "09:00 - 10:00",
      location: "Room 301, Block A"
    },
    {
      subject: "Machine Learning",
      time: "10:00 - 11:00",
      location: "Room 205, Block A"
    },
    {
      subject: "Computer Networks",
      time: "11:30 - 12:30",
      location: "Lab 102, CSE Block"
    },
    {
      subject: "Compiler Design",
      time: "13:30 - 14:30",
      location: "Room 408, Block B"
    },
    {
      subject: "Software Engineering",
      time: "14:30 - 15:30",
      location: "Room 312, Block A"
    },
    {
      subject: "Cloud Computing",
      time: "15:30 - 16:30",
      location: "Lab 204, CSE Block"
    }
  ],

  attendance: [
    { subject: "Advanced DBMS", percentage: 82 },
    { subject: "Machine Learning", percentage: 91 },
    { subject: "Computer Networks", percentage: 72 },
    { subject: "Compiler Design", percentage: 68 },
    { subject: "Software Engineering", percentage: 88 },
    { subject: "Cloud Computing", percentage: 75 }
  ],

  mess: {
    breakfast: ["Poha", "Boiled Eggs", "Bread & Butter", "Tea", "Banana"],
    lunch: ["Rice", "Dal Tadka", "Paneer Butter Masala", "Roti", "Salad", "Pickle"],
    snacks: ["Samosa", "Vada Pav", "Coffee"],
    dinner: ["Chapati", "Chole", "Jeera Rice", "Gulab Jamun", "Buttermilk"]
  },

  shuttles: [
    {
      route: "Campus → Railway Station",
      nextDeparture: "14:30",
      frequency: "Every 2 hours"
    },
    {
      route: "Campus → City Bus Stand",
      nextDeparture: "15:00",
      frequency: "Every 1.5 hours"
    },
    {
      route: "Campus → Boriyakhurd Market",
      nextDeparture: "16:00",
      frequency: "Every 3 hours"
    }
  ]
};

module.exports = mockData;
