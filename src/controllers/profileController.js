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
