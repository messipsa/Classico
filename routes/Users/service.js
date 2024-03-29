import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../../models/user.js";
import ErrorResponse from "../../Utils/errorResponse.js";
import { roleType } from "../../models/user.js";
import { sendEmail } from "../../Utils/sendEmail.js";
import randomstring from "randomstring";

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const passwordHashed = await bcrypt.hash(password, salt);
  return passwordHashed;
};

export const verifyPassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

export const createToken = (user) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN, {
    expiresIn: 24 * 60 * 60 * 1000,
  });
  return token;
};

export const findUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email: email });
    return user;
  } catch (err) {
    throw new ErrorResponse("Server Error", 500);
  }
};

export const createUser = async (username, email, motDePasse) => {
  try {
    const hashedPwd = await hashPassword(motDePasse);

    const user = await User.create({
      userName: username,
      email: email,
      password: hashedPwd,
      profilePic: "",
      role: roleType.UTILISATEUR,
      verified: false,
      suspended: false,
      confirmationCode: randomstring.generate({
        length: 8,
        charset: "hex",
      }),
    });
    return user;
  } catch (err) {
    throw new ErrorResponse("User creation failed due to server Error", 500);
  }
};

export const uniqueUserName = async (userName) => {
  try {
    const user = await User.findOne({ userName: userName });
    return user;
  } catch (e) {
    throw new ErrorResponse("Server Error", 500);
  }
};

export const findUserById = async (id) => {
  try {
    const user = await User.findOne({ _id: id });

    return user;
  } catch (err) {
    throw new ErrorResponse("Server Error", 500);
  }
};

export const followUser = async (id, idToFollow) => {
  try {
    const user = await findUserById(id);

    if (!user.following.includes(idToFollow)) {
      const utilisateur = await findUserById(idToFollow);
      user.following.push(idToFollow);
      utilisateur.followers.push(id);
      await user.save();
      await utilisateur.save();
    } else {
      throw new ErrorResponse("user already followed", 409);
    }
  } catch (err) {
    if (err.statusCode === 409)
      throw new ErrorResponse("user already followed", 409);
    else throw new ErrorResponse("Follow failed due to Server Error", 500);
  }
};

export const unfollowUser = async (id, idToFollow) => {
  try {
    const user = await findUserById(id);

    if (user.following.includes(idToFollow)) {
      const utilisateur = await findUserById(idToFollow);
      user.following = user.following.filter((item) => {
        return item.toString() !== idToFollow;
      });
      utilisateur.followers = utilisateur.followers.filter((item) => {
        return item.toString() !== id;
      });
      await user.save();
      await utilisateur.save();
    } else {
      throw new ErrorResponse("user already unfollowed", 409);
    }
  } catch (err) {
    if (err.statusCode === 409)
      throw new ErrorResponse("user already unfollowed", 409);
    else throw new ErrorResponse("Unfollow failed due to Server Error", 500);
  }
};

export const verifySameAccount = (id, idTwo) => {
  return id === idTwo;
};

export const sendURL = async (user) => {
  try {
    const baseURL = "http://localhost:5000/api/users/confirmation/";

    const URL =
      baseURL + "verify?code=" + user._id + "&id=" + user.confirmationCode;

    const options = {
      email: user.email,
      message: `To confirm your email please click on this link : <a href=${URL}>${URL}</a> `,
      subject: "Verification of email",
    };

    sendEmail(options);
  } catch (err) {
    throw new ErrorResponse("Verification failed due to server error", 500);
  }
};

export const findAllUsers = async () => {
  try {
    const users = User.find()
      .populate(
        "followers",
        "-__v -createdAt -updatedAt  -password -followers  -following -confirmationCode"
      )
      .populate(
        "following",
        "-__v -createdAt -updatedAt  -password -followers  -following -confirmationCode"
      )
      .select({
        password: 0,
        confirmationCode: 0,
        __v: 0,
        createdAt: 0,
        updatedAt: 0,
      });
    return users;
  } catch (err) {
    throw new ErrorResponse(
      "Finding all users failed due to server error",
      500
    );
  }
};

export const findUserByIdAndPopulate = async (id) => {
  try {
    const user = await User.findOne({ _id: id })
      .populate("following", "-password")
      .populate("followers")
      .select({ followers: 0 }, { following: 0 }, { bio: 0 });
    return user;
  } catch (err) {
    throw new ErrorResponse("Server Error", 500);
  }
};

export const updateBio = async (id, Bio) => {
  try {
    const user = await findUserById(id);
    if (!user) {
      throw new ErrorResponse("User not found", 404);
    }
    user.bio = Bio;
    await user.save();
  } catch (err) {
    if (err.statusCode === 404) {
      throw new ErrorResponse("User not found", 404);
    }
    throw new ErrorResponse("Server Error", 500);
  }
};

export const getUserNecessaryInformations = async (id) => {
  try {
    const user = User.findOne({ _id: id })
      .populate(
        "followers",
        "-__v -createdAt -updatedAt  -password -followers  -following -confirmationCode"
      )
      .populate(
        "following",
        "-__v -createdAt -updatedAt  -password -followers  -following -confirmationCode"
      )
      .select({
        password: 0,
        confirmationCode: 0,
        __v: 0,
        createdAt: 0,
        updatedAt: 0,
      });
    return user;
  } catch (err) {
    throw new ErrorResponse("Server Error", 500);
  }
};

export const getUserFollowers = async (id) => {
  try {
    const user = User.findOne({ _id: id })
      .populate(
        "followers",
        "-__v -createdAt -updatedAt  -password -followers  -following -confirmationCode -verified -suspended -role"
      )
      .select({
        password: 0,
        confirmationCode: 0,
        following: 0,
        role: 0,
        verified: 0,
        suspended: 0,
        __v: 0,
        createdAt: 0,
        updatedAt: 0,
      });

    return user;
  } catch (err) {
    throw new ErrorResponse("Server Error", 500);
  }
};

export const getUserFollowing = async (id) => {
  try {
    const user = User.findOne({ _id: id })
      .populate(
        "following",
        "-__v -createdAt -updatedAt  -password -followers  -following -confirmationCode -verified -suspended -role"
      )
      .select({
        password: 0,
        confirmationCode: 0,
        followers: 0,
        role: 0,
        verified: 0,
        suspended: 0,
        __v: 0,
        createdAt: 0,
        updatedAt: 0,
      });

    return user;
  } catch (err) {
    throw new ErrorResponse("Server Error", 500);
  }
};
