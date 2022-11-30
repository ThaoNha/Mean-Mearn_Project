const TypeModel = require('./type.model');

exports.getTypes = async () => {
  try {
    const types = await TypeModel.find();
    return types;
  } catch (error) {
    return null;
  }
};

exports.getType = async (name) => {
  try {
    return await TypeModel.findOne({ name });
  } catch (error) {
    return null;
  }
};

exports.create = async (type) => {
  try {
    const newType = new TypeModel({
      name: type.name
    });
    const typeResponse = await newType.save();
    return typeResponse;
  } catch (error) {
    return false;
  }
};


exports.delete = async (name) => {
  try {
    await TypeModel.findOneAndDelete({ name });
    return true;
  } catch (error) {
    return false;
  }
};
