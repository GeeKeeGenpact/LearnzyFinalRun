const mongoose = require("mongoose");
const Prospect = require("../models/prospectModel");

//get all prospects
const getProspects = async (req, res) => {
  const prospects = await Prospect.find().sort({ createdAt: -1 });
  res.status(200).json(prospects);
};

//get single prospect
const getProspect = async (req, res) => {
  // const user_id=req.user._id
  // console.log(user_id)
  const _id = req.params.id;
  console.log(_id)
  const prospect = await Prospect.find({ _id }).sort({ createdAt: -1 });
  res.status(200).json(prospect);
};

//create a prospect
const createProspect = async (req, res) => {
  const { name, dob, gender, email, subject, experience, location } = req.body;
  const approve = "null";
  try {
    const prospect = await Prospect.create({
      name,
      dob,
      gender,
      email,
      subject,
      experience,
      location,
      approve,
    });
    res.status(200).json(prospect);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//update a prospect
const updateProspect = async(req, res) =>{
  console.log(req.params, req.body, req.method)
  const _id = req.params.id;
  const updates = req.body
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).json({ error: "No such prospect" });
  }
  
  const prospect = await Prospect.findOneAndUpdate(
    {_id:_id},
    {$set:updates},
    {new: true}
  )

  if(!prospect){
    return res.status(400).json({error: "No such prospect"})
  }
  
  res.status(200).json(prospect)
}

module.exports = {
  getProspects,
  createProspect,
  getProspect,
  updateProspect
};
