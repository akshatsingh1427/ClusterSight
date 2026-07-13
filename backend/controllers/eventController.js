const {
  getAllEvents,
} = require("../services/eventService");

const getEvents = async (req, res) => {
  try {
    const events =
      await getAllEvents();

    res.json(events);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to fetch events",
    });
  }
};

module.exports = {
  getEvents,
};