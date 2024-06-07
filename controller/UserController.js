const User = require("../model/userModel");
const {uploadOnCloudinary}=require('../util/cloudinary');
// console.log("Debug - 2.2 -> User Controller Called");

exports.signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const userExists=await User.findOne({ email: email})
    if(userExists) {
      res.status(400).json({message: "User with this email already exists"})
    }

    const newUser = await User.create({
      username,
      email,
      password,
      role: "user",
    });
    const createdUser = await User.findById(newUser._id).select("-password");

    if (!createdUser) {
      return res.status(500).json({ message: "Failed to create user" });
    }
    res.status(200).json({ user: createdUser, message: "Signup successful" });
  } catch (error) {
    next(error);
  }
};

exports.signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password || email === "" || password === "") {
      return res.status(400).json({ message: "All fields are required" });
    }

    const validUser = await User.findOne({ email });
    if (!validUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const validPassword = await validUser.isPasswordCorrect(password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = validUser.generateAccessToken();
    const { password: pass, ...rest } = validUser._doc;

    const cookieOptions = {
      httpOnly: true,
      sameSite: "Strict", // Helps prevent CSRF attacks
    };
    if (process.env.NODE_ENV === "production") {
      cookieOptions.secure = true;
    }

    res
      .status(200)
      .cookie("accessToken", token, cookieOptions)
      .json({ user: rest, message: "Sign In Successfully" });
  } catch (error) {
    next(error);
  }
};

exports.signout = (req, res, next) => {
  try {
    res
      .clearCookie("accessToken")
      .status(200)
      .json({ message: "User has been signed out" });
  } catch (error) {
    next(error);
  }
};

exports.google = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;
  try {
    let user = await User.findOne({ email }).select("-password");
    if (user) {
      const token = user.generateAccessToken();
      return res
        .status(200)
        .cookie("accessToken", token, {
          httpOnly: true,
        })
        .json({ user, message: "User sign-in successful" });
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      const newUser = new User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: generatedPassword,
        profilePicture: googlePhotoUrl,
        role: "user",
      });

      await newUser.save();
      user = await User.findById(newUser._id).select("-password");

      const token = user.generateAccessToken();

      return res
        .status(200)
        .cookie("accessToken", token, {
          httpOnly: true,
        })
        .json({ user, message: "User sign-up successful" });
    }
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    console.log("under the updateUser controller");
    const { username, email, password } = req.body;

    let profilePictureUrl;
    console.log("req.file",req.file);
    if (req.file) {
      const profilePictureLocalPath = req.file.path;
      profilePictureUrl = await uploadOnCloudinary(profilePictureLocalPath);
      if (!profilePictureUrl) {
        res.status(400).json({message: "Error uploading profile picture"})
      }
    }

    const updateData = {};
    if (username) updateData.username = username.toLowerCase();
    if (email) updateData.email = email;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }
    if (profilePictureUrl) updateData.profilePicture = profilePictureUrl.url;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      { $set: updateData },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      res.status(500).json({message:"Failed to update user"})
    }

    return res
      .status(200)
      .json({ user: updatedUser,message: "User updated successfully" });
  } catch (error) {
    next(error);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    // Check if the requesting user is an admin
    if (req.user.role!=="admin") {
      res.status(403).json({message:"You are not allowed to see all users"});
    }

    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 5;
    const sortDirection = req.query.sort === "asc" ? 1 : -1;

    const users = await User.find()
      .select("-password")
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalUsers = await User.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res
      .status(200)
      .json({ users, totalUsers, lastMonthUsers,message:"User data retrieved successfully" });
   
  } catch (error) {
    next(error);
  }
};

 exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId).select("-password");
    if (!user) {
      throw new ApiError(404, "user not found");
    }
    res
      .status(200)
      .json(new ApiResponse(200, { user }, "user get successfully"));
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      res.status(404).json({message:"user not found"});
    }

    // Check if the requester is an admin
    if (!req.user.role==="admin") {
      throw new ApiError(403, "You are not allowed to delete this user");
    }

    const deletedUser=await User.findByIdAndDelete(req.params.userId);

    res.status(200).json({user:deletedUser,message: "User deleted successfully"});
  } catch (error) {
    next(error);
  }
};