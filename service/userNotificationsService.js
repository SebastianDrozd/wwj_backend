const { getUserNotifications } = require("../repo/userNotificationsRepo");

const handleGetUserNotifications = async (req, res) => {
    const userId = req.params.userId;
    try {
        const response = await getUserNotifications(userId);
        console.log(response)
        res.status(200).json(response);
        
    } catch (err) {
       console.log(err)
        res.status(500).json(err);
    }
};
module.exports = { handleGetUserNotifications };