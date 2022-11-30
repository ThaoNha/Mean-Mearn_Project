const StatusModel = require('./status.model');

exports.getStatus = async () => {
  try {
    const status = await StatusModel.find();
    return status;
  } catch (error) {
    return null;
  }
};

exports.getStatus = async (name) => {
  try {
    return await StatusModel.findOne({ name });
  } catch (error) {
    return null;
  }
};

exports.create = async (status) => {
  try {
    const newStatus = new StatusModel({
      name: status.name
    });
    const statusResponse = await newStatus.save();
    return statusResponse;
  } catch (error) {
    return false;
  }
};


exports.delete = async (name) => {
  try {
    await StatusModel.findOneAndDelete({ name });
    return true;
  } catch (error) {
    return false;
  }
};
