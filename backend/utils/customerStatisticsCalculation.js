import Customer from "../models/customerSchema.js";

export const calculateCustomerStatistics = async (createdByEmail) => {
  const matchStage = { $match: { createdBy: createdByEmail } };

  const totalCustomers = await Customer.countDocuments({
    createdBy: createdByEmail,
  });

  const customersByAgeGroup = await Customer.aggregate([
    matchStage,
    {
      $bucket: {
        groupBy: { $toInt: "$age" },
        boundaries: [0, 18, 35, 50, 100] /* Breakpoints for customers ages*/,
        default: "Other",
        output: { count: { $sum: 1 } },
      },
    },
  ]);

  const customersByGender = await Customer.aggregate([
    matchStage,
    { $group: { _id: "$gender", count: { $sum: 1 } } },
  ]);

  const averageAge = await Customer.aggregate([
    matchStage,
    { $group: { _id: null, avgAge: { $avg: { $toInt: "$age" } } } },
  ]);

  const customersByHeightRange = await Customer.aggregate([
    matchStage,
    {
      $bucket: {
        groupBy: { $toInt: "$height" },
        boundaries: [0, 150, 170, 190, 250],
        default: "Other",
        output: { count: { $sum: 1 } },
      },
    },
  ]);

  const customersByWeightRange = await Customer.aggregate([
    matchStage,
    {
      $bucket: {
        groupBy: { $toInt: "$weight" },
        boundaries: [0, 50, 70, 90, 150],
        default: "Other",
        output: { count: { $sum: 1 } },
      },
    },
  ]);

  const customersByLocation = await Customer.aggregate([
    matchStage,
    { $group: { _id: "$address", count: { $sum: 1 } } },
  ]);

  const newCustomersOverTime = await Customer.aggregate([
    matchStage,
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
          day: { $dayOfMonth: "$createdAt" },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1, "_id.day": -1 } },
  ]);

  return {
    totalCustomers,
    customersByAgeGroup,
    customersByGender,
    averageAge: averageAge[0]?.avgAge || 0,
    customersByHeightRange,
    customersByWeightRange,
    customersByLocation,
    newCustomersOverTime,
  };
};
