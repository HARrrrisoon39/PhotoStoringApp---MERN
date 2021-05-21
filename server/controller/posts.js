import postMessage from "../model/postMessage.js";

export const getPosts = async (req, res) => {
  try {
    const postedMessages = await postMessage.find();
    res.status(200).json(postedMessages);
  } catch (error) {
    res.status(404).json({ message: message.error });
  }
};

export const createPosts = async (req, res) => {
  const post = req.body;
  const newPost = new postMessage({ ...post, creator: req.userId });
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: message.error });
  }
};

export const updatePosts = async (req, res) => {
  try {
    const postBody = req.body;
    const updatePost = await postMessage.findByIdAndUpdate(
      { _id: req.params.id },
      postBody,
      { new: true }
    );
    res.json(updatePost);
  } catch (error) {
    console.log(error);
  }
};

export const deletePosts = async (req, res) => {
  try {
    await postMessage.findByIdAndRemove({
      _id: req.params.id,
    });
    res.json({ message: "deleted" });
  } catch (error) {
    console.log("error");
  }
};

// export const likePost = async (req, res) => {
//   try {
//     const post_id = await postMessage.findById({ _id: req.params.id });
//     const updatedLikePost = await postMessage.findByIdAndUpdate(
//       { _id: req.params.id },
//       { likeCount: post_id.likeCount + 1 },
//       { new: true }
//     );
//     res.json(updatedLikePost);
//   } catch (error) {
//     console.log("error");
//   }
// };

export const likePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await postMessage.findById(id);
    const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
      post.likes.push(req.userId);
    } else {
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const updatedLikePost = await postMessage.findByIdAndUpdate(id, post, {
      new: true,
    });

    res.json(updatedLikePost);
  } catch (error) {
    console.log("erro");
  }
};
