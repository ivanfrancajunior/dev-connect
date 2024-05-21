import User from '../models/User.js';
import Post from '../models/Post.js';

export const createPost = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    const newPost = {
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id,
    };
    await Post.create(newPost);

    return res.status(201).json({ msg: 'Post created' });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ msg: 'Server error' });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    return res.status(200).json(posts);
  } catch (error) {
    console.log(error);

    return res.status(500).json({ msg: 'Server error' });
  }
};
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    if (!post) return res.status(404).json({ msg: 'Post not found' });

    return res.status(200).json(post);
  } catch (error) {
    console.log(error);

    if (error.kind == 'ObjectId')
      return res.status(404).json({ msg: 'Post not found' });

    return res.status(500).json({ msg: 'Server error' });
  }
};
