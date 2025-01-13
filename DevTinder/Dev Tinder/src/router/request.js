const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const User = require("../model/user");
const ConnectionRequest = require("../model/connectionRequest");


requestRouter.post("/request/send/:status/:userId", userAuth, async (req, res) => {
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.userId;
        const status = req.params.status;

        const Allowed_Status = ["interested", "ignored"];
        if (!Allowed_Status.includes(status)) {
            return res.status(400).send("invalid status code");
        }

        const isconnectionRequestValid = await User.findById({ _id: toUserId });
        if (!isconnectionRequestValid) {
            throw new Error("user is not valid");
        }

        const isConnectionRequestExist = await ConnectionRequest.findOne({
            $or: [
                { fromUserId: fromUserId, toUserId: toUserId },
                { fromUserId: toUserId, toUserId: fromUserId },
            ]
        });
        if (isConnectionRequestExist) {
            return res.status(404).send("Connection already exists");
        }

        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status,
        })



        const data = await connectionRequest.save();
        res.json({
            message: `${req.user.firstName} ${connectionRequest.status}  ${req.params.firstName}`,
            data,
        })




    } catch (error) {
        res.status(400).send("Error: " + error.message);
    }
});

requestRouter.post("/request/review/:status/:requestId", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const { status, requestId } = req.params;

        const Allowed_Status = ["accepted", "rejected"];
        if (!Allowed_Status.includes(status)) {
            throw new Error("status is not valid");
        }

        const isconnectionRequestValid = await ConnectionRequest.findOne({
            _id: requestId,
            toUserId: loggedInUser._id,
            status: "interested",
        });
        if (!isconnectionRequestValid) {
            return res.status(400).json({ message: "Invalid request" });
        }
        isconnectionRequestValid.status = status;

        await isconnectionRequestValid.save();
        res.json({message:"connection request is `${status}`"});

    } catch (error) {
        res.status(404).send("Error:"+error.message);
    }




});

module.exports = requestRouter;