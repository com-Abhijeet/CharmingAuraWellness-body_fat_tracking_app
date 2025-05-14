import express from "express";
import Customer from "../models/customerSchema.js";
import { calculateCustomerStatistics } from "../utils/customerStatisticsCalculation.js";

const customerRouter = express.Router();

// Create a new customer
customerRouter.post("/create", async (req, res) => {
  const { name, email, contact, age, height, weight, dob, address, gender } =
    req.body;
  const userId = req.user.id; // Assuming the user ID is stored in req.user by the auth middleware

  const customer = new Customer({
    name,
    email,
    contact,
    age,
    gender,
    height,
    weight,
    dob,
    address,
    createdBy: userId,
  });

  try {
    const newCustomer = await customer.save();
    res.status(201).json(newCustomer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all customers for the logged-in user
customerRouter.get("/get", async (req, res) => {
  try {
    const userId = req.user.id; // Assuming the user ID is stored in req.user by the auth middleware
    const customers = await Customer.find({ createdBy: userId });
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get customers by user email that were registered by associate
customerRouter.get("/get/:userEmail", async (req, res) => {
  try {
    console.log("request recieved");
    const userEmail = req.params.userEmail;
    console.log(userEmail);
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 30;
    const skip = (page - 1) * limit;

    if (!userEmail) {
      console.log("email not found", userEmail);
      return res.status(400).json({ message: "User email is required" });
    }

    const customers = await Customer.find({ createdBy: userEmail })
      .skip(skip)
      .limit(limit);
    const totalCustomers = await Customer.countDocuments({
      createdBy: userEmail,
    });

    if (!customers || customers.length === 0) {
      console.log("customers not found");
      return res.status(404).json({ message: "Customers not found" });
    }

    return res.status(200).json({
      message: "Fetched successfully",
      customers,
      totalPages: Math.ceil(totalCustomers / limit),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

//get customer details with email
customerRouter.get("/customerDetails/:customerEmail", async (req, res) => {
  try {
    const customerEmail = req.params.customerEmail;
    if (!customerEmail) {
      return res.status(400).json({ message: "Customer Email is required" });
    }
    const customer = await Customer.findOne({ email: customerEmail });
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    return res.status(200).json(customer);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

//update customer details
customerRouter.put(
  "/update/:customerEmail",

  async (req, res) => {
    try {
      const customerEmail = req.params.customerEmail;
      const customer = await Customer.findOne({ email: customerEmail });
      if (!customer) {
        return res.status(404).json({ message: "Customer not found" });
      }
      // update the customer  details
      const updatedCustomer = await Customer.updateOne(
        { email: customerEmail },
        {
          $set: {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            age: req.body.age,
            height: req.body.height,
            weight: req.body.weight,
            dob: req.body.dob,
            address: req.body.address,
          },
        }
      );

      return res
        .status(200)
        .json({ message: "Details updated successfully", updatedCustomer });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

// delete a customer
customerRouter.delete(
  "/delete/:customerEmail",

  async (req, res) => {
    try {
      const customerEmail = req.params.customerEmail;
      if (!customerEmail) {
        return res.status(400).json({ message: "Customer email is required" });
      }
      const customer = await Customer.findOne({ email: customerEmail });
      if (!customer) {
        return res.status(404).json({ message: "Customer not found" });
      }
      // delete the customer
      await Customer.deleteOne({ email: customerEmail });

      return res
        .status(200)
        .json({ message: "Details Deleted Successfully", customer });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

// Fetch customers by name or phone number using regex
customerRouter.get("/getCustomers/:createdByEmail", async (req, res) => {
  try {
    const { q } = req.query;
    const { createdByEmail } = req.params;
    console.log("request recieved with query ", q);

    if (!q || q.trim() === "") {
      return res.status(400).json({ message: "Search query is required" });
    }

    // Use regex to search for customers by name or phone number
    const regex = new RegExp(q, "i"); // Case-insensitive search
    const customers = await Customer.find({
      $and: [
        { createdBy: createdByEmail },
        { $or: [{ name: regex }, { contact: regex }] },
      ],
    }).limit(10); // Limit results for performance

    if (!customers || customers.length === 0) {
      return res.status(404).json({ message: "No customers found" });
    }

    return res.status(200).json({ customers });
  } catch (error) {
    console.error("Error fetching customers:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Get customer statistics
customerRouter.get("/customer-stats/:createdByEmail", async (req, res) => {
  try {
    const createdByEmail = req.params.createdByEmail;
    const stats = await calculateCustomerStatistics(createdByEmail);
    res.status(200).json(stats);
  } catch (error) {
    console.error("Error fetching customer statistics:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default customerRouter;
