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
