import User from '../models/User.js';
import Profile from '../models/Profile.js';

export const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      ['name', 'avatar']
    );

    if (!profile)
      return res.status(400).json({ msg: 'There is no profile for this user' });

    return res.status(200).json(profile);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: 'Server error' });
  }
};

export const createProfile = async (req, res) => {
  const {
    user,
    company,
    website,
    location,
    status,
    skills,
    bio,
    githubusername,
    twitter,
    facebook,
    linkedin,
    instagram,
    youtube,
  } = req.body;

  const profileFields = {};

  profileFields.user = req.user.id;

  if (company) profileFields.company = company;
  if (website) profileFields.website = website;
  if (location) profileFields.location = location;
  if (status) profileFields.status = status;
  if (skills) {
    profileFields.skills = skills.split(',').map((skill) => skill.trim());
  }
  if (bio) profileFields.bio = bio;
  if (githubusername) profileFields.githubusername = githubusername;
  profileFields.social = {};
  if (twitter) profileFields.social.twitter = twitter;
  if (facebook) profileFields.social.facebook = facebook;
  if (linkedin) profileFields.social.linkedin = linkedin;
  if (youtube) profileFields.social.youtube = youtube;
  if (instagram) profileFields.social.instagram = instagram;

  //doc ref: https://www.mongodb.com/docs/manual/reference/operator/update/set/
  try {
    let profile = await Profile.findOne({ user: req.user.id });

    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      return res.status(200).json(profile);
    }

    profile = await Profile.create(profileFields);

    return res.status(200).json(profile);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server error' });
  }
};

export const getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find({}).populate('user', [
      'name',
      'avatar',
    ]);

    return res.status(200).json(profiles);
  } catch (error) {
    console.log(error);

    return res.status(500).json({ msg: 'Server error' });
  }
};
export const getProfilebyUserId = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'avatar']);

    if (!profile) return res.status(400).json({ msg: 'Profile not found' });

    return res.status(200).json(profile);
  } catch (error) {
    console.log(error);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }

    return res.status(500).json({ msg: 'Server error' });
  }
};

export const deleteProfile = async (req, res) => {
  try {
    await Profile.findOneAndDelete({ user: req.user.id });
    await User.findOneAndDelete({ _id: req.user.id });

    return res.status(200).json({ msg: 'User deleted' });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ msg: 'Server error' });
  }
};
export const updateExperience = async (req, res) => {
  try {
    const { title, company, location, from, to, current, description } =
      req.body;

    const newExperience = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };

    const profile = await Profile.findOne({ user: req.user.id });

    const checkifduplicate = profile.experience.filter(
      (exp) => exp.company === newExperience.company
    );

    if (checkifduplicate.length > 0) {
      return res.status(400).json({ msg: 'Duplicate experience' });
    }

    profile.experience.unshift(newExperience);

    await profile.save();
    return res.status(200).json(profile);
  } catch (error) {
    console.log(error);

    return res.status(500).json({ msg: 'Server error' });
  }
};

export const deleteExperience = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    const expIndex = profile.experience
      .map((exp) => exp.id)
      .indexOf(req.params.id);
    profile.experience.splice(expIndex, 1);
    await profile.save();
    return res.status(200).json(profile);
  } catch (error) {
    console.log(error);

    return res.status(500).json({ msg: 'Server error' });
  }
};

export const updateEducation = async (req, res) => {
  try {
    const { school, degree, fieldofstudy, from, to, current, description } =
      req.body;

    const newEducation = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };

    const profile = await Profile.findOne({ user: req.user.id });

    const checkifduplicate = profile.fieldofstudy.filter(
      (field) => field.fieldofstudy === newEducation.fieldofstudy
    );

    if (checkifduplicate.length > 0) {
      return res.status(400).json({ msg: 'Duplicate education' });
    }

    profile.experience.unshift(newEducation);

    await profile.save();
    return res.status(200).json(profile);
  } catch (error) {
    console.log(error);

    return res.status(500).json({ msg: 'Server error' });
  }
};

export const deleteEducation = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    const eduIndex = profile.experience
      .map((edu) => edu.id)
      .indexOf(req.params.id);
    profile.experience.splice(eduIndex, 1);
    await profile.save();
    return res.status(200).json(profile);
  } catch (error) {
    console.log(error);

    return res.status(500).json({ msg: 'Server error' });
  }
};
