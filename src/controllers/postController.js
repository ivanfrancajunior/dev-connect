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
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    if (post.user.toString() !== req.user.id)
      return res.status(401).json({ msg: 'User not authorized' });

    if (!post) return res.status(404).json({ msg: 'Post not found' });

    await Post.findByIdAndDelete(req.params.post_id);

    return res.status(200).json({ msg: 'Post deleted' });
  } catch (error) {
    console.log(error);

    if (error.kind == 'ObjectId')
      return res.status(404).json({ msg: 'Post not found' });

    return res.status(500).json({ msg: 'Server error' });
  }
};
export const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) return res.status(404).json({ msg: 'Post not found' });

    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    )
      return res.status(400).json({ msg: 'Post already liked' });

    post.likes.unshift({ user: req.user.id });

    await post.save();

    return res.status(200).json(post.likes);
  } catch (error) {
    if (error.kind == 'ObjectId')
      return res.status(404).json({ msg: 'Post not found' });

    return res.status(500).json({ msg: 'Server error' });
  }
};
export const unlikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    if (!post) return res.status(404).json({ msg: 'Post not found' });

    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length <
      1
    )
      return res.status(400).json({ msg: 'This post has not yet been liked' });

    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);

    post.likes.splice(removeIndex, 1);

    await post.save();

    return res.status(200).json(post.likes);
  } catch (error) {
    if (error.kind == 'ObjectId')
      return res.status(404).json({ msg: 'Post not found' });

    return res.status(500).json({ msg: 'Server error' });
  }
};

export const commentPost = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    const post = await Post.findById(req.params.post_id);

    if (!post) return res.status(404).json({ msg: 'Post not found' });
    const newComment = {
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id,
    };

    post.comments.unshift(newComment);

    await post.save();

    return res.status(200).json(post.comments);
  } catch (error) {
    if (error.kind == 'ObjectId')
      return res.status(404).json({ msg: 'Post not found' });

    return res.status(500).json({ msg: 'Server error' });
  }
};
export const deleteComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
    if (!comment) return res.status(404).json({ msg: 'Comment not found' });

    if (comment.user.toString() !== req.user.id)
      return res.status(401).json({ msg: 'User not authorized' });

    const removeIndex = post.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);

    post.comments.splice(removeIndex, 1);

    await post.save();
    return res.status(200).json(post.comments);
  } catch (error) {
    if (error.kind == 'ObjectId')
      return res.status(404).json({ msg: 'Comment not found' });

    return res.status(500).json({ msg: 'Server error' });
  }
};
