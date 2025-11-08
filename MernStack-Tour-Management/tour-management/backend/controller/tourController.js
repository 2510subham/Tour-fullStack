import Tour from "../models/Tour.js";

//create new tour
export const createtour = async (req, res) => {
  const createtour = new Tour(req.body);
  try {
    const savedtour = await createtour.save();
    res
      .status(200)
      .json({
        success: true,
        message: "successfully created tour",
        data: savedtour,
      });
  } catch (err) {
    res
      .status(404)
      .json({ success: false, message: "failed to create tour", error: err });
  }
};

//update tour
export const updatetour = async (req, res) => {
  let id = req.params.id;
  try {
    const updated = await Tour.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res
      .status(200)
      .json({
        success: true,
        message: "successfully updated tour",
        data: updated,
      });
  } catch (error) {
    res
      .status(404)
      .send({ success: false, message: "failed to update tour", error: error });
  }
};

//delete tour
export const deletetour = async (req, res) => {
  let id = req.params.id;

  try {
    const deleted = await Tour.findByIdAndDelete(id);
    res
      .status(200)
      .json({
        success: true,
        message: "successfully deleted tour",
        data: deleted,
      });
  } catch (error) {
    res
      .status(404)
      .send({ success: false, message: "failed to delete tour", error: error });
  }
};

//getsingle tour
export const getsingletour = async (req, res) => {
  let ids = req.params.id;
  console.log(ids);
  try {
    const getone = await Tour.findById(ids).populate("reviews");
    console.log(getone);
    res
      .status(200)
      .send({
        success: true,
        message: "successfully get single tour",
        data: getone,
      });
  } catch (error) {
    res
      .status(404)
      .send({
        success: false,
        message: "failed to get single tour",
        error: error,
      });
  }
};

//getall tour
export const getalltour = async (req, res) => {
  const page = req.query.page;
  console.log(page);
  try {
    const getalltour = await Tour.find({})
      .populate("reviews")
      .skip(page * 8)
      .limit(8);
    res
      .status(200)
      .send({
        success: true,
        count: getalltour.length,
        message: "successfully get all tour",
        data: getalltour,
      });
  } catch (error) {
    res
      .status(404)
      .send({
        success: false,
        message: "failed to get all tour",
        error: error,
      });
  }
};

//get tour be search

export const gettourbysearch = async (req, res) => {
  //here i means case sensitive
  const city = new RegExp(req.query.city, "i");
  const distance = parseInt(req.query.distance);
  const maxGroupSize = parseInt(req.query.maxGroupSize);
  try {
    const gettour = await Tour.find({
      city: city,
      distance: { $gte: distance }, //$gte means greater then equal to
      maxGroupSize: { $gte: maxGroupSize },
    }).populate("reviews");
    res.status(200).send({ success: true, message: "success", data: gettour });
  } catch (error) {
    res
      .status(404)
      .send({ success: false, message: "failed to get tour", error: error });
  }
};

//get featured tour
export const getFeaturedTour = async (req, res) => {
  try {
    const getalltour = await Tour.find({ featured: true })
      .populate("reviews")
      .limit(8); //give data that contain featured=true
    console.log("featured tours", getalltour);
    res
      .status(200)
      .send({
        success: true,
        message: "successfully get all tour",
        data: getalltour,
      });
  } catch (error) {
    res
      .status(404)
      .send({
        success: false,
        message: "failed to get all tour",
        error: error,
      });
  }
};

//get route count
export const gettourcount = async (req, res) => {
  try {
    const totalcount = await Tour.estimatedDocumentCount();
    res.status(200).send({ success: true, data: totalcount });
  } catch (err) {
    res.status(404).send({ success: false, error: err });
  }
};
