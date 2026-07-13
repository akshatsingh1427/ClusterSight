const {
  getAllServices,
  getServiceDetails,
} = require("../services/serviceService");

const getServices = async (req, res) => {
  try {
    const services =
      await getAllServices();

    res.json(services);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to fetch services",
    });
  }
};

const getService = async (req, res) => {
  try {
    const { namespace, name } = req.params;

    const service =
      await getServiceDetails(
        namespace,
        name
      );

    res.json(service);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message:
        "Failed to fetch service details",
    });
  }
};

module.exports = {
  getServices,
  getService,
};