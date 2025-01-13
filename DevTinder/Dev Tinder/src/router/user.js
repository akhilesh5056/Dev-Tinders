const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../model/connectionRequest");
const userRouter = express.Router();
const User = require("../model/user")


userRouter.get("/user/request/received", userAuth, async (req, res) => {
    try {

        const loggedInUser = req.user;
        const connectionRequest = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested",
        }).populate("fromUserId", "firstName lastName photoUrl age gender about")
        
        res.json({
            // message: "Data fetched successfully",
            data: connectionRequest,
        },

        );

    } catch (error) {
        res.status(404).send("Error:" + error.message);
    }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
    try {
        const USER_SAFE_DATA = ["firstName", "lastName", "about", "age", "skills","photoUrl","gender"];
        const loggedInUser = req.user;

        const connectionRequest = await ConnectionRequest.find({
            $or: [{ fromUserId: loggedInUser._id, status: "accepted" },
            { toUserId: loggedInUser._id, status: "accepted" }
            ]
        })
            .populate("fromUserId", USER_SAFE_DATA)
            .populate("toUserId", USER_SAFE_DATA);

        const data = connectionRequest.map((row => {
            if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
                return row.toUserId;
            }
            return row.fromUserId;
        }))
        res.json({ data });

    } catch (error) {
        res.status(404).send("Error:" + error.message);
    }


});

userRouter.get("/feed", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const USER_SAFE_DATA = ["firstName", "lastName", "about", "age", "skills", "photoUrl"];
        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = limit > 50 ? 50 : limit;
        const skip = (page - 1) * limit;
        const connectionRequest = await ConnectionRequest.find({
            $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }]
        }).select("fromUserId toUserId");
        // console.log(connectionRequest);

        const hideUserFromFeed = new Set();
        connectionRequest.forEach((req) => {
            hideUserFromFeed.add(req.fromUserId.toString());
            hideUserFromFeed.add(req.toUserId.toString());
        });
        // console.log(hideUserFromFeed);
        const user = await User.find({
            $and: [{
                _id: { $nin: Array.from(hideUserFromFeed) }
            }, { _id: { $ne: loggedInUser._id } }]
        })
            .select(USER_SAFE_DATA)
            .skip(skip)
            .limit(limit);
        // console.log(user);
        res.json({ user });

    } catch (error) {
        res.status(400).send("Error:" + error.message);
    }
})
module.exports = userRouter;