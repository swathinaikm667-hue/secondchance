// In authRoutes.js - PUT /update endpoint
router.put('/update', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { username, email, bio } = req.body;

    // Find user
    const user = await users.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update only provided fields
    if (username !== undefined) user.username = username;
    if (email !== undefined) user.email = email;
    if (bio !== undefined) user.bio = bio;
    else user.bio = user.bio || '';  // keep existing bio if not provided

    await users.updateOne({ _id: userId }, { $set: user });

    res.status(200).json({
      message: 'User updated successfully',
      user: {
        username: user.username,
        email: user.email,
        bio: user.bio
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
