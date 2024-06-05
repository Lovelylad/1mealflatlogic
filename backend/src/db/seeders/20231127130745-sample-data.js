const db = require('../models');
const Users = db.users;

const Appointments = db.appointments;

const Clients = db.clients;

const Courses = db.courses;

const Ebooks = db.ebooks;

const MealPlans = db.meal_plans;

const Nutritionists = db.nutritionists;

const PatientRecords = db.patient_records;

const Programs = db.programs;

const Recipes = db.recipes;

const DietRestrictions = db.diet_restrictions;

const Companies = db.companies;

const AppointmentsData = [
  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    appointment_date: new Date('2023-01-10T10:00:00Z'),

    notes: 'Initial consultation',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    appointment_date: new Date('2023-02-15T14:00:00Z'),

    notes: 'Follow-up on meal plan',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    appointment_date: new Date('2023-03-20T09:00:00Z'),

    notes: 'Discuss blood work results',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    appointment_date: new Date('2023-04-25T11:00:00Z'),

    notes: 'Review supplements',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    appointment_date: new Date('2023-05-30T16:00:00Z'),

    notes: 'Check-in on progress',

    // type code here for "relation_one" field
  },
];

const ClientsData = [
  {
    first_name: 'Anna',

    last_name: 'Smith',

    email: 'anna.smith@example.com',

    phone: '123-456-7890',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    first_name: 'Bob',

    last_name: 'Johnson',

    email: 'bob.johnson@example.com',

    phone: '234-567-8901',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    first_name: 'Charlie',

    last_name: 'Brown',

    email: 'charlie.brown@example.com',

    phone: '345-678-9012',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    first_name: 'Diana',

    last_name: 'Prince',

    email: 'diana.prince@example.com',

    phone: '456-789-0123',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    first_name: 'Eve',

    last_name: 'Adams',

    email: 'eve.adams@example.com',

    phone: '567-890-1234',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },
];

const CoursesData = [
  {
    title: 'Healthy Eating 101',

    description: 'Learn the basics of healthy eating',

    price: 49.99,

    // type code here for "relation_one" field
  },

  {
    title: 'Advanced Nutrition',

    description: 'Deep dive into advanced nutrition topics',

    price: 99.99,

    // type code here for "relation_one" field
  },

  {
    title: 'Meal Planning Mastery',

    description: 'Master the art of meal planning',

    price: 79.99,

    // type code here for "relation_one" field
  },

  {
    title: 'Supplements and You',

    description: 'Learn about different supplements and their benefits',

    price: 59.99,

    // type code here for "relation_one" field
  },

  {
    title: 'Fitness and Nutrition',

    description: 'Combine fitness and nutrition for optimal health',

    price: 89.99,

    // type code here for "relation_one" field
  },
];

const EbooksData = [
  {
    title: 'The Ultimate Guide to Nutrition',

    description: 'Everything you need to know about nutrition',

    price: 19.99,

    // type code here for "relation_one" field
  },

  {
    title: 'Healthy Recipes for Busy People',

    description: 'Quick and healthy recipes for busy lifestyles',

    price: 14.99,

    // type code here for "relation_one" field
  },

  {
    title: 'Meal Planning Made Easy',

    description: 'Simple steps to plan your meals effectively',

    price: 12.99,

    // type code here for "relation_one" field
  },

  {
    title: 'Supplements: A Comprehensive Guide',

    description: 'All you need to know about supplements',

    price: 16.99,

    // type code here for "relation_one" field
  },

  {
    title: 'Fitness and Nutrition Handbook',

    description: 'A guide to combining fitness and nutrition',

    price: 18.99,

    // type code here for "relation_one" field
  },
];

const MealPlansData = [
  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    title: 'Weight Loss Plan',

    description: 'A plan to help lose weight',

    start_date: new Date('2023-01-01T00:00:00Z'),

    end_date: new Date('2023-01-31T23:59:59Z'),

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    title: 'Heart Health Plan',

    description: 'A plan to improve heart health',

    start_date: new Date('2023-02-01T00:00:00Z'),

    end_date: new Date('2023-02-28T23:59:59Z'),

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    title: 'Iron Boost Plan',

    description: 'A plan to increase iron levels',

    start_date: new Date('2023-03-01T00:00:00Z'),

    end_date: new Date('2023-03-31T23:59:59Z'),

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    title: 'General Wellness Plan',

    description: 'A plan for overall wellness',

    start_date: new Date('2023-04-01T00:00:00Z'),

    end_date: new Date('2023-04-30T23:59:59Z'),

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    title: 'Blood Pressure Control Plan',

    description: 'A plan to control blood pressure',

    start_date: new Date('2023-05-01T00:00:00Z'),

    end_date: new Date('2023-05-31T23:59:59Z'),

    // type code here for "relation_one" field
  },
];

const NutritionistsData = [
  {
    first_name: 'Jane',

    last_name: 'Doe',

    email: 'jane.doe@example.com',

    phone: '678-901-2345',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    first_name: 'John',

    last_name: 'Doe',

    email: 'john.doe@example.com',

    phone: '789-012-3456',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    first_name: 'Alice',

    last_name: 'Wonderland',

    email: 'alice.wonderland@example.com',

    phone: '890-123-4567',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    first_name: 'Bruce',

    last_name: 'Wayne',

    email: 'bruce.wayne@example.com',

    phone: '901-234-5678',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    first_name: 'Clark',

    last_name: 'Kent',

    email: 'clark.kent@example.com',

    phone: '012-345-6789',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },
];

const PatientRecordsData = [
  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    blood_work: 'Normal',

    supplements: 'Vitamin D',

    weight: 70.5,

    additional_info: 'No allergies',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    blood_work: 'High cholesterol',

    supplements: 'Omega-3',

    weight: 85,

    additional_info: 'Lactose intolerant',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    blood_work: 'Low iron',

    supplements: 'Iron',

    weight: 60,

    additional_info: 'Vegetarian',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    blood_work: 'Normal',

    supplements: 'Multivitamin',

    weight: 75,

    additional_info: 'No known conditions',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    blood_work: 'High blood pressure',

    supplements: 'Magnesium',

    weight: 90,

    additional_info: 'Gluten-free diet',

    // type code here for "relation_one" field
  },
];

const ProgramsData = [
  {
    title: 'Weight Loss Program',

    description: 'A comprehensive program to help you lose weight',

    price: 199.99,

    // type code here for "relation_one" field
  },

  {
    title: 'Heart Health Program',

    description: 'A program to improve your heart health',

    price: 149.99,

    // type code here for "relation_one" field
  },

  {
    title: 'Iron Boost Program',

    description: 'A program to increase your iron levels',

    price: 99.99,

    // type code here for "relation_one" field
  },

  {
    title: 'General Wellness Program',

    description: 'A program for overall wellness',

    price: 129.99,

    // type code here for "relation_one" field
  },

  {
    title: 'Blood Pressure Control Program',

    description: 'A program to control your blood pressure',

    price: 179.99,

    // type code here for "relation_one" field
  },
];

const RecipesData = [
  {
    title: 'Grilled Chicken Salad',

    ingredients: 'Chicken, Lettuce, Tomato, Cucumber, Olive Oil',

    instructions: 'Grill the chicken. Mix with vegetables. Add olive oil.',

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },

  {
    title: 'Oatmeal with Berries',

    ingredients: 'Oats, Milk, Berries, Honey',

    instructions: 'Cook oats with milk. Add berries and honey.',

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },

  {
    title: 'Quinoa Salad',

    ingredients: 'Quinoa, Bell Peppers, Corn, Black Beans, Lime Juice',

    instructions: 'Cook quinoa. Mix with vegetables and lime juice.',

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },

  {
    title: 'Smoothie Bowl',

    ingredients: 'Banana, Berries, Yogurt, Granola',

    instructions: 'Blend banana and berries with yogurt. Top with granola.',

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },

  {
    title: 'Baked Salmon',

    ingredients: 'Salmon, Lemon, Garlic, Olive Oil',

    instructions: 'Bake salmon with lemon, garlic, and olive oil.',

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },
];

const DietRestrictionsData = [
  {
    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field
  },
];

const CompaniesData = [
  {
    name: 'Healthy Life Co.',
  },

  {
    name: 'Fit and Fab Inc.',
  },

  {
    name: 'Wellness World',
  },

  {
    name: 'NutriCare',
  },

  {
    name: 'Health Hub',
  },
];

// Similar logic for "relation_many"

async function associateUserWithCompanie() {
  const relatedCompanie0 = await Companies.findOne({
    offset: Math.floor(Math.random() * (await Companies.count())),
  });
  const User0 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (User0?.setCompanie) {
    await User0.setCompanie(relatedCompanie0);
  }

  const relatedCompanie1 = await Companies.findOne({
    offset: Math.floor(Math.random() * (await Companies.count())),
  });
  const User1 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (User1?.setCompanie) {
    await User1.setCompanie(relatedCompanie1);
  }

  const relatedCompanie2 = await Companies.findOne({
    offset: Math.floor(Math.random() * (await Companies.count())),
  });
  const User2 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (User2?.setCompanie) {
    await User2.setCompanie(relatedCompanie2);
  }

  const relatedCompanie3 = await Companies.findOne({
    offset: Math.floor(Math.random() * (await Companies.count())),
  });
  const User3 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (User3?.setCompanie) {
    await User3.setCompanie(relatedCompanie3);
  }

  const relatedCompanie4 = await Companies.findOne({
    offset: Math.floor(Math.random() * (await Companies.count())),
  });
  const User4 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (User4?.setCompanie) {
    await User4.setCompanie(relatedCompanie4);
  }
}

async function associateAppointmentWithClient() {
  const relatedClient0 = await Clients.findOne({
    offset: Math.floor(Math.random() * (await Clients.count())),
  });
  const Appointment0 = await Appointments.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Appointment0?.setClient) {
    await Appointment0.setClient(relatedClient0);
  }

  const relatedClient1 = await Clients.findOne({
    offset: Math.floor(Math.random() * (await Clients.count())),
  });
  const Appointment1 = await Appointments.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Appointment1?.setClient) {
    await Appointment1.setClient(relatedClient1);
  }

  const relatedClient2 = await Clients.findOne({
    offset: Math.floor(Math.random() * (await Clients.count())),
  });
  const Appointment2 = await Appointments.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Appointment2?.setClient) {
    await Appointment2.setClient(relatedClient2);
  }

  const relatedClient3 = await Clients.findOne({
    offset: Math.floor(Math.random() * (await Clients.count())),
  });
  const Appointment3 = await Appointments.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Appointment3?.setClient) {
    await Appointment3.setClient(relatedClient3);
  }

  const relatedClient4 = await Clients.findOne({
    offset: Math.floor(Math.random() * (await Clients.count())),
  });
  const Appointment4 = await Appointments.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Appointment4?.setClient) {
    await Appointment4.setClient(relatedClient4);
  }
}

async function associateAppointmentWithNutritionist() {
  const relatedNutritionist0 = await Nutritionists.findOne({
    offset: Math.floor(Math.random() * (await Nutritionists.count())),
  });
  const Appointment0 = await Appointments.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Appointment0?.setNutritionist) {
    await Appointment0.setNutritionist(relatedNutritionist0);
  }

  const relatedNutritionist1 = await Nutritionists.findOne({
    offset: Math.floor(Math.random() * (await Nutritionists.count())),
  });
  const Appointment1 = await Appointments.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Appointment1?.setNutritionist) {
    await Appointment1.setNutritionist(relatedNutritionist1);
  }

  const relatedNutritionist2 = await Nutritionists.findOne({
    offset: Math.floor(Math.random() * (await Nutritionists.count())),
  });
  const Appointment2 = await Appointments.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Appointment2?.setNutritionist) {
    await Appointment2.setNutritionist(relatedNutritionist2);
  }

  const relatedNutritionist3 = await Nutritionists.findOne({
    offset: Math.floor(Math.random() * (await Nutritionists.count())),
  });
  const Appointment3 = await Appointments.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Appointment3?.setNutritionist) {
    await Appointment3.setNutritionist(relatedNutritionist3);
  }

  const relatedNutritionist4 = await Nutritionists.findOne({
    offset: Math.floor(Math.random() * (await Nutritionists.count())),
  });
  const Appointment4 = await Appointments.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Appointment4?.setNutritionist) {
    await Appointment4.setNutritionist(relatedNutritionist4);
  }
}

async function associateAppointmentWithCompanie() {
  const relatedCompanie0 = await Companies.findOne({
    offset: Math.floor(Math.random() * (await Companies.count())),
  });
  const Appointment0 = await Appointments.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Appointment0?.setCompanie) {
    await Appointment0.setCompanie(relatedCompanie0);
  }

  const relatedCompanie1 = await Companies.findOne({
    offset: Math.floor(Math.random() * (await Companies.count())),
  });
  const Appointment1 = await Appointments.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Appointment1?.setCompanie) {
    await Appointment1.setCompanie(relatedCompanie1);
  }

  const relatedCompanie2 = await Companies.findOne({
    offset: Math.floor(Math.random() * (await Companies.count())),
  });
  const Appointment2 = await Appointments.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Appointment2?.setCompanie) {
    await Appointment2.setCompanie(relatedCompanie2);
  }

  const relatedCompanie3 = await Companies.findOne({
    offset: Math.floor(Math.random() * (await Companies.count())),
  });
  const Appointment3 = await Appointments.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Appointment3?.setCompanie) {
    await Appointment3.setCompanie(relatedCompanie3);
  }

  const relatedCompanie4 = await Companies.findOne({
    offset: Math.floor(Math.random() * (await Companies.count())),
  });
  const Appointment4 = await Appointments.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Appointment4?.setCompanie) {
    await Appointment4.setCompanie(relatedCompanie4);
  }
}

async function associateClientWithUser() {
  const relatedUser0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Client0 = await Clients.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Client0?.setUser) {
    await Client0.setUser(relatedUser0);
  }

  const relatedUser1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Client1 = await Clients.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Client1?.setUser) {
    await Client1.setUser(relatedUser1);
  }

  const relatedUser2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Client2 = await Clients.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Client2?.setUser) {
    await Client2.setUser(relatedUser2);
  }

  const relatedUser3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Client3 = await Clients.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Client3?.setUser) {
    await Client3.setUser(relatedUser3);
  }

  const relatedUser4 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Client4 = await Clients.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Client4?.setUser) {
    await Client4.setUser(relatedUser4);
  }
}

async function associateClientWithCompanie() {
  const relatedCompanie0 = await Companies.findOne({
    offset: Math.floor(Math.random() * (await Companies.count())),
  });
  const Client0 = await Clients.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Client0?.setCompanie) {
    await Client0.setCompanie(relatedCompanie0);
  }

  const relatedCompanie1 = await Companies.findOne({
    offset: Math.floor(Math.random() * (await Companies.count())),
  });
  const Client1 = await Clients.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Client1?.setCompanie) {
    await Client1.setCompanie(relatedCompanie1);
  }

  const relatedCompanie2 = await Companies.findOne({
    offset: Math.floor(Math.random() * (await Companies.count())),
  });
  const Client2 = await Clients.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Client2?.setCompanie) {
    await Client2.setCompanie(relatedCompanie2);
  }

  const relatedCompanie3 = await Companies.findOne({
    offset: Math.floor(Math.random() * (await Companies.count())),
  });
  const Client3 = await Clients.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Client3?.setCompanie) {
    await Client3.setCompanie(relatedCompanie3);
  }

  const relatedCompanie4 = await Companies.findOne({
    offset: Math.floor(Math.random() * (await Companies.count())),
  });
  const Client4 = await Clients.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Client4?.setCompanie) {
    await Client4.setCompanie(relatedCompanie4);
  }
}

async function associateCourseWithCompanie() {
  const relatedCompanie0 = await Companies.findOne({
    offset: Math.floor(Math.random() * (await Companies.count())),
  });
  const Course0 = await Courses.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Course0?.setCompanie) {
    await Course0.setCompanie(relatedCompanie0);
  }

  const relatedCompanie1 = await Companies.findOne({
    offset: Math.floor(Math.random() * (await Companies.count())),
  });
  const Course1 = await Courses.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Course1?.setCompanie) {
    await Course1.setCompanie(relatedCompanie1);
  }

  const relatedCompanie2 = await Companies.findOne({
    offset: Math.floor(Math.random() * (await Companies.count())),
  });
  const Course2 = await Courses.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Course2?.setCompanie) {
    await Course2.setCompanie(relatedCompanie2);
  }

  const relatedCompanie3 = await Companies.findOne({
    offset: Math.floor(Math.random() * (await Companies.count())),
  });
  const Course3 = await Courses.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Course3?.setCompanie) {
    await Course3.setCompanie(relatedCompanie3);
  }

  const relatedCompanie4 = await Companies.findOne({
    offset: Math.floor(Math.random() * (await Companies.count())),
  });
  const Course4 = await Courses.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Course4?.setCompanie) {
    await Course4.setCompanie(relatedCompanie4);
  }
}

async function associateEbookWithCompanie() {
  const relatedCompanie0 = await Companies.findOne({
    offset: Math.floor(Math.random() * (await Companies.count())),
  });
  const Ebook0 = await Ebooks.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Ebook0?.setCompanie) {
    await Ebook0.setCompanie(relatedCompanie0);
  }

  const relatedCompanie1 = await Companies.findOne({
    offset: Math.floor(Math.random() * (await Companies.count())),
  });
  const Ebook1 = await Ebooks.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Ebook1?.setCompanie) {
    await Ebook1.setCompanie(relatedCompanie1);
  }

  const relatedCompanie2 = await Companies.findOne({
    offset: Math.floor(Math.random() * (await Companies.count())),
  });
  const Ebook2 = await Ebooks.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Ebook2?.setCompanie) {
    await Ebook2.setCompanie(relatedCompanie2);
  }

  const relatedCompanie3 = await Companies.findOne({
    offset: Math.floor(Math.random() * (await Companies.count())),
  });
  const Ebook3 = await Ebooks.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Ebook3?.setCompanie) {
    await Ebook3.setCompanie(relatedCompanie3);
  }

  const relatedCompanie4 = await Companies.findOne({
    offset: Math.floor(Math.random() * (await Companies.count())),
  });
  const Ebook4 = await Ebooks.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Ebook4?.setCompanie) {
    await Ebook4.setCompanie(relatedCompanie4);
  }
}

async function associateMealPlanWithNutritionist() {
  const relatedNutritionist0 = await Nutritionists.findOne({
    offset: Math.floor(Math.random() * (await Nutritionists.count())),
  });
  const MealPlan0 = await MealPlans.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (MealPlan0?.setNutritionist) {
    await MealPlan0.setNutritionist(relatedNutritionist0);
  }

  const relatedNutritionist1 = await Nutritionists.findOne({
    offset: Math.floor(Math.random() * (await Nutritionists.count())),
  });
  const MealPlan1 = await MealPlans.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (MealPlan1?.setNutritionist) {
    await MealPlan1.setNutritionist(relatedNutritionist1);
  }

  const relatedNutritionist2 = await Nutritionists.findOne({
    offset: Math.floor(Math.random() * (await Nutritionists.count())),
  });
  const MealPlan2 = await MealPlans.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (MealPlan2?.setNutritionist) {
    await MealPlan2.setNutritionist(relatedNutritionist2);
  }

  const relatedNutritionist3 = await Nutritionists.findOne({
    offset: Math.floor(Math.random() * (await Nutritionists.count())),
  });
  const MealPlan3 = await MealPlans.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (MealPlan3?.setNutritionist) {
    await MealPlan3.setNutritionist(relatedNutritionist3);
  }

  const relatedNutritionist4 = await Nutritionists.findOne({
    offset: Math.floor(Math.random() * (await Nutritionists.count())),
  });
  const MealPlan4 = await MealPlans.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (MealPlan4?.setNutritionist) {
    await MealPlan4.setNutritionist(relatedNutritionist4);
  }
}

async function associateMealPlanWithClient() {
  const relatedClient0 = await Clients.findOne({
    offset: Math.floor(Math.random() * (await Clients.count())),
  });
  const MealPlan0 = await MealPlans.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (MealPlan0?.setClient) {
    await MealPlan0.setClient(relatedClient0);
  }

  const relatedClient1 = await Clients.findOne({
    offset: Math.floor(Math.random() * (await Clients.count())),
  });
  const MealPlan1 = await MealPlans.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (MealPlan1?.setClient) {
    await MealPlan1.setClient(relatedClient1);
  }

  const relatedClient2 = await Clients.findOne({
    offset: Math.floor(Math.random() * (await Clients.count())),
  });
  const MealPlan2 = await MealPlans.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (MealPlan2?.setClient) {
    await MealPlan2.setClient(relatedClient2);
  }

  const relatedClient3 = await Clients.findOne({
    offset: Math.floor(Math.random() * (await Clients.count())),
  });
  const MealPlan3 = await MealPlans.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (MealPlan3?.setClient) {
    await MealPlan3.setClient(relatedClient3);
  }

  const relatedClient4 = await Clients.findOne({
    offset: Math.floor(Math.random() * (await Clients.count())),
  });
  const MealPlan4 = await MealPlans.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (MealPlan4?.setClient) {
    await MealPlan4.setClient(relatedClient4);
  }
}

async function associateMealPlanWithCompanie() {
  const relatedCompanie0 = await Companies.findOne({
    offset: Math.floor(Math.random() * (await Companies.count())),
  });
  const MealPlan0 = await MealPlans.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (MealPlan0?.setCompanie) {
    await MealPlan0.setCompanie(relatedCompanie0);
  }

  const relatedCompanie1 = await Companies.findOne({
    offset: Math.floor(Math.random() * (await Companies.count())),
  });
  const MealPlan1 = await MealPlans.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (MealPlan1?.setCompanie) {
    await MealPlan1.setCompanie(relatedCompanie1);
  }

  const relatedCompanie2 = await Companies.findOne({
    offset: Math.floor(Math.random() * (await Companies.count())),
  });
  const MealPlan2 = await MealPlans.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (MealPlan2?.setCompanie) {
    await MealPlan2.setCompanie(relatedCompanie2);
  }

  const relatedCompanie3 = await Companies.findOne({
    offset: Math.floor(Math.random() * (await Companies.count())),
  });
  const MealPlan3 = await MealPlans.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (MealPlan3?.setCompanie) {
    await MealPlan3.setCompanie(relatedCompanie3);
  }

  const relatedCompanie4 = await Companies.findOne({
    offset: Math.floor(Math.random() * (await Companies.count())),
  });
  const MealPlan4 = await MealPlans.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (MealPlan4?.setCompanie) {
    await MealPlan4.setCompanie(relatedCompanie4);
  }
}

async function associateNutritionistWithUser() {
  const relatedUser0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Nutritionist0 = await Nutritionists.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Nutritionist0?.setUser) {
    await Nutritionist0.setUser(relatedUser0);
  }

  const relatedUser1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Nutritionist1 = await Nutritionists.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Nutritionist1?.setUser) {
    await Nutritionist1.setUser(relatedUser1);
  }

  const relatedUser2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Nutritionist2 = await Nutritionists.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Nutritionist2?.setUser) {
    await Nutritionist2.setUser(relatedUser2);
  }

  const relatedUser3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Nutritionist3 = await Nutritionists.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Nutritionist3?.setUser) {
    await Nutritionist3.setUser(relatedUser3);
  }

  const relatedUser4 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Nutritionist4 = await Nutritionists.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Nutritionist4?.setUser) {
    await Nutritionist4.setUser(relatedUser4);
  }
}

async function associateNutritionistWithCompanie() {
  const relatedCompanie0 = await Companies.findOne({
    offset: Math.floor(Math.random() * (await Companies.count())),
  });
  const Nutritionist0 = await Nutritionists.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Nutritionist0?.setCompanie) {
    await Nutritionist0.setCompanie(relatedCompanie0);
  }

  const relatedCompanie1 = await Companies.findOne({
    offset: Math.floor(Math.random() * (await Companies.count())),
  });
  const Nutritionist1 = await Nutritionists.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Nutritionist1?.setCompanie) {
    await Nutritionist1.setCompanie(relatedCompanie1);
  }

  const relatedCompanie2 = await Companies.findOne({
    offset: Math.floor(Math.random() * (await Companies.count())),
  });
  const Nutritionist2 = await Nutritionists.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Nutritionist2?.setCompanie) {
    await Nutritionist2.setCompanie(relatedCompanie2);
  }

  const relatedCompanie3 = await Companies.findOne({
    offset: Math.floor(Math.random() * (await Companies.count())),
  });
  const Nutritionist3 = await Nutritionists.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Nutritionist3?.setCompanie) {
    await Nutritionist3.setCompanie(relatedCompanie3);
  }

  const relatedCompanie4 = await Companies.findOne({
    offset: Math.floor(Math.random() * (await Companies.count())),
  });
  const Nutritionist4 = await Nutritionists.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Nutritionist4?.setCompanie) {
    await Nutritionist4.setCompanie(relatedCompanie4);
  }
}

async function associatePatientRecordWithClient() {
  const relatedClient0 = await Clients.findOne({
    offset: Math.floor(Math.random() * (await Clients.count())),
  });
  const PatientRecord0 = await PatientRecords.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (PatientRecord0?.setClient) {
    await PatientRecord0.setClient(relatedClient0);
  }

  const relatedClient1 = await Clients.findOne({
    offset: Math.floor(Math.random() * (await Clients.count())),
  });
  const PatientRecord1 = await PatientRecords.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (PatientRecord1?.setClient) {
    await PatientRecord1.setClient(relatedClient1);
  }

  const relatedClient2 = await Clients.findOne({
    offset: Math.floor(Math.random() * (await Clients.count())),
  });
  const PatientRecord2 = await PatientRecords.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (PatientRecord2?.setClient) {
    await PatientRecord2.setClient(relatedClient2);
  }

  const relatedClient3 = await Clients.findOne({
    offset: Math.floor(Math.random() * (await Clients.count())),
  });
  const PatientRecord3 = await PatientRecords.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (PatientRecord3?.setClient) {
    await PatientRecord3.setClient(relatedClient3);
  }

  const relatedClient4 = await Clients.findOne({
    offset: Math.floor(Math.random() * (await Clients.count())),
  });
  const PatientRecord4 = await PatientRecords.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (PatientRecord4?.setClient) {
    await PatientRecord4.setClient(relatedClient4);
  }
}

async function associatePatientRecordWithNutritionist() {
  const relatedNutritionist0 = await Nutritionists.findOne({
    offset: Math.floor(Math.random() * (await Nutritionists.count())),
  });
  const PatientRecord0 = await PatientRecords.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (PatientRecord0?.setNutritionist) {
    await PatientRecord0.setNutritionist(relatedNutritionist0);
  }

  const relatedNutritionist1 = await Nutritionists.findOne({
    offset: Math.floor(Math.random() * (await Nutritionists.count())),
  });
  const PatientRecord1 = await PatientRecords.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (PatientRecord1?.setNutritionist) {
    await PatientRecord1.setNutritionist(relatedNutritionist1);
  }

  const relatedNutritionist2 = await Nutritionists.findOne({
    offset: Math.floor(Math.random() * (await Nutritionists.count())),
  });
  const PatientRecord2 = await PatientRecords.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (PatientRecord2?.setNutritionist) {
    await PatientRecord2.setNutritionist(relatedNutritionist2);
  }

  const relatedNutritionist3 = await Nutritionists.findOne({
    offset: Math.floor(Math.random() * (await Nutritionists.count())),
  });
  const PatientRecord3 = await PatientRecords.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (PatientRecord3?.setNutritionist) {
    await PatientRecord3.setNutritionist(relatedNutritionist3);
  }

  const relatedNutritionist4 = await Nutritionists.findOne({
    offset: Math.floor(Math.random() * (await Nutritionists.count())),
  });
  const PatientRecord4 = await PatientRecords.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (PatientRecord4?.setNutritionist) {
    await PatientRecord4.setNutritionist(relatedNutritionist4);
  }
}

async function associatePatientRecordWithCompanie() {
  const relatedCompanie0 = await Companies.findOne({
    offset: Math.floor(Math.random() * (await Companies.count())),
  });
  const PatientRecord0 = await PatientRecords.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (PatientRecord0?.setCompanie) {
    await PatientRecord0.setCompanie(relatedCompanie0);
  }

  const relatedCompanie1 = await Companies.findOne({
    offset: Math.floor(Math.random() * (await Companies.count())),
  });
  const PatientRecord1 = await PatientRecords.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (PatientRecord1?.setCompanie) {
    await PatientRecord1.setCompanie(relatedCompanie1);
  }

  const relatedCompanie2 = await Companies.findOne({
    offset: Math.floor(Math.random() * (await Companies.count())),
  });
  const PatientRecord2 = await PatientRecords.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (PatientRecord2?.setCompanie) {
    await PatientRecord2.setCompanie(relatedCompanie2);
  }

  const relatedCompanie3 = await Companies.findOne({
    offset: Math.floor(Math.random() * (await Companies.count())),
  });
  const PatientRecord3 = await PatientRecords.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (PatientRecord3?.setCompanie) {
    await PatientRecord3.setCompanie(relatedCompanie3);
  }

  const relatedCompanie4 = await Companies.findOne({
    offset: Math.floor(Math.random() * (await Companies.count())),
  });
  const PatientRecord4 = await PatientRecords.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (PatientRecord4?.setCompanie) {
    await PatientRecord4.setCompanie(relatedCompanie4);
  }
}

async function associateProgramWithCompanie() {
  const relatedCompanie0 = await Companies.findOne({
    offset: Math.floor(Math.random() * (await Companies.count())),
  });
  const Program0 = await Programs.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Program0?.setCompanie) {
    await Program0.setCompanie(relatedCompanie0);
  }

  const relatedCompanie1 = await Companies.findOne({
    offset: Math.floor(Math.random() * (await Companies.count())),
  });
  const Program1 = await Programs.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Program1?.setCompanie) {
    await Program1.setCompanie(relatedCompanie1);
  }

  const relatedCompanie2 = await Companies.findOne({
    offset: Math.floor(Math.random() * (await Companies.count())),
  });
  const Program2 = await Programs.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Program2?.setCompanie) {
    await Program2.setCompanie(relatedCompanie2);
  }

  const relatedCompanie3 = await Companies.findOne({
    offset: Math.floor(Math.random() * (await Companies.count())),
  });
  const Program3 = await Programs.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Program3?.setCompanie) {
    await Program3.setCompanie(relatedCompanie3);
  }

  const relatedCompanie4 = await Companies.findOne({
    offset: Math.floor(Math.random() * (await Companies.count())),
  });
  const Program4 = await Programs.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Program4?.setCompanie) {
    await Program4.setCompanie(relatedCompanie4);
  }
}

// Similar logic for "relation_many"

async function associateRecipeWithCompanie() {
  const relatedCompanie0 = await Companies.findOne({
    offset: Math.floor(Math.random() * (await Companies.count())),
  });
  const Recipe0 = await Recipes.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Recipe0?.setCompanie) {
    await Recipe0.setCompanie(relatedCompanie0);
  }

  const relatedCompanie1 = await Companies.findOne({
    offset: Math.floor(Math.random() * (await Companies.count())),
  });
  const Recipe1 = await Recipes.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Recipe1?.setCompanie) {
    await Recipe1.setCompanie(relatedCompanie1);
  }

  const relatedCompanie2 = await Companies.findOne({
    offset: Math.floor(Math.random() * (await Companies.count())),
  });
  const Recipe2 = await Recipes.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Recipe2?.setCompanie) {
    await Recipe2.setCompanie(relatedCompanie2);
  }

  const relatedCompanie3 = await Companies.findOne({
    offset: Math.floor(Math.random() * (await Companies.count())),
  });
  const Recipe3 = await Recipes.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Recipe3?.setCompanie) {
    await Recipe3.setCompanie(relatedCompanie3);
  }

  const relatedCompanie4 = await Companies.findOne({
    offset: Math.floor(Math.random() * (await Companies.count())),
  });
  const Recipe4 = await Recipes.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Recipe4?.setCompanie) {
    await Recipe4.setCompanie(relatedCompanie4);
  }
}

async function associateDietRestrictionWithDiet_restriction() {
  const relatedDiet_restriction0 = await Companies.findOne({
    offset: Math.floor(Math.random() * (await Companies.count())),
  });
  const DietRestriction0 = await DietRestrictions.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (DietRestriction0?.setDiet_restriction) {
    await DietRestriction0.setDiet_restriction(relatedDiet_restriction0);
  }

  const relatedDiet_restriction1 = await Companies.findOne({
    offset: Math.floor(Math.random() * (await Companies.count())),
  });
  const DietRestriction1 = await DietRestrictions.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (DietRestriction1?.setDiet_restriction) {
    await DietRestriction1.setDiet_restriction(relatedDiet_restriction1);
  }

  const relatedDiet_restriction2 = await Companies.findOne({
    offset: Math.floor(Math.random() * (await Companies.count())),
  });
  const DietRestriction2 = await DietRestrictions.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (DietRestriction2?.setDiet_restriction) {
    await DietRestriction2.setDiet_restriction(relatedDiet_restriction2);
  }

  const relatedDiet_restriction3 = await Companies.findOne({
    offset: Math.floor(Math.random() * (await Companies.count())),
  });
  const DietRestriction3 = await DietRestrictions.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (DietRestriction3?.setDiet_restriction) {
    await DietRestriction3.setDiet_restriction(relatedDiet_restriction3);
  }

  const relatedDiet_restriction4 = await Companies.findOne({
    offset: Math.floor(Math.random() * (await Companies.count())),
  });
  const DietRestriction4 = await DietRestrictions.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (DietRestriction4?.setDiet_restriction) {
    await DietRestriction4.setDiet_restriction(relatedDiet_restriction4);
  }
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Appointments.bulkCreate(AppointmentsData);

    await Clients.bulkCreate(ClientsData);

    await Courses.bulkCreate(CoursesData);

    await Ebooks.bulkCreate(EbooksData);

    await MealPlans.bulkCreate(MealPlansData);

    await Nutritionists.bulkCreate(NutritionistsData);

    await PatientRecords.bulkCreate(PatientRecordsData);

    await Programs.bulkCreate(ProgramsData);

    await Recipes.bulkCreate(RecipesData);

    await DietRestrictions.bulkCreate(DietRestrictionsData);

    await Companies.bulkCreate(CompaniesData);

    await Promise.all([
      // Similar logic for "relation_many"

      await associateUserWithCompanie(),

      await associateAppointmentWithClient(),

      await associateAppointmentWithNutritionist(),

      await associateAppointmentWithCompanie(),

      await associateClientWithUser(),

      await associateClientWithCompanie(),

      await associateCourseWithCompanie(),

      await associateEbookWithCompanie(),

      await associateMealPlanWithNutritionist(),

      await associateMealPlanWithClient(),

      await associateMealPlanWithCompanie(),

      await associateNutritionistWithUser(),

      await associateNutritionistWithCompanie(),

      await associatePatientRecordWithClient(),

      await associatePatientRecordWithNutritionist(),

      await associatePatientRecordWithCompanie(),

      await associateProgramWithCompanie(),

      // Similar logic for "relation_many"

      await associateRecipeWithCompanie(),

      await associateDietRestrictionWithDiet_restriction(),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('appointments', null, {});

    await queryInterface.bulkDelete('clients', null, {});

    await queryInterface.bulkDelete('courses', null, {});

    await queryInterface.bulkDelete('ebooks', null, {});

    await queryInterface.bulkDelete('meal_plans', null, {});

    await queryInterface.bulkDelete('nutritionists', null, {});

    await queryInterface.bulkDelete('patient_records', null, {});

    await queryInterface.bulkDelete('programs', null, {});

    await queryInterface.bulkDelete('recipes', null, {});

    await queryInterface.bulkDelete('diet_restrictions', null, {});

    await queryInterface.bulkDelete('companies', null, {});
  },
};
