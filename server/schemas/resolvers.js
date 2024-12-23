const { User, Trip, Category } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");
const stripe = require('stripe')('pk_test_TYooMQauvdEDq54NiTphI7jx');

const resolvers = {
  Query: {
    allUsers: async () => {
      return await User.find();
    },
    currentUser: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id);
        return user;
      }
    },
    categories: async (parent, args) => {
      return Category.find();
    },
    allTrips: async (parent, args) => {
      return Trip.find();
    },
    oneTrip: async (parent, { _id }) => {
      return Trip.findById(_id);
    },
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      const line_items = [];

      for (const productId of args.products) {
        const product = await Trip.findById(productId);

        line_items.push({
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.title,
              images: [`${url}/images/${product.img}`]
            },
            unit_amount: product.price * 100,
          },
          quantity: 1
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`
      });

      return { session: session.id };
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      try {
        const user = await User.create({ ...args });
        const token = signToken(user);
        return { user, token };
      } catch (error) {
        console.log(error);
      }
    },
    login: async (parent, { email, password }) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          throw AuthenticationError;
        }
        const correctPassword = await user.isCorrectPassword(password);

        if (!correctPassword) {
          throw AuthenticationError;
        }

        const token = signToken(user);

        return { user, token };
      } catch (error) {
        console.log(error);
      }
    },
    boughtTrip: async (parent, { _id }, context) => {
      try {
        // Find the user by ID and push the trip _id to the purchased array
        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          { $push: { purchased: _id } },
          { new: true } // Return the updated user document
        );

        // Return the updated user or a success message
        return updatedUser;
      } catch (error) {
        console.log(error);
      }
    },
    addToList: async (parent, { _id }, context) => {
      try {
        // Find the user by ID and push the trip _id to the purchased array
        const addWish = await User.findByIdAndUpdate(
          context.user._id,
          { $addToSet: { wishList: _id } },
          { new: true } // Return the updated user document
        );

        // Return the updated user or a success message
        return addWish;
      } catch (error) {
        console.log(error);
      }
    },
    deleteFromList: async (parent, { _id }, context) => {
      try {
        // Find the user by ID and push the trip _id to the purchased array
        const deleteWish = await User.findByIdAndUpdate(
          context.user._id,
          { $pull: { wishList: _id } },
          { new: true } // Return the updated user document
        );

        // Return the updated user or a success message
        return deleteWish;
      } catch (error) {
        console.log(error);
      }
    },
  },
  User: {
    purchased: async (root) => {
      if (!root.purchased) return [];
      // Fetch all trips at once and populate the category field
      const trips = await Trip.find({ _id: { $in: root.purchased } }).populate(
        "category"
      );
      return trips;
    },

    // Resolver for wishList trips
    wishList: async (root) => {
      if (!root.wishList) return [];
      // Fetch all trips at once and populate the category field
      const trips = await Trip.find({ _id: { $in: root.wishList } }).populate(
        "category"
      );
      return trips;
    },
  },
  Trip: {
    category: async (root) => {
      return await Category.findById(root.category);
    },
  },
};

module.exports = resolvers;
