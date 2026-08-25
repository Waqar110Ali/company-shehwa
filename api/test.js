module.exports = (req, res) => {
  res.status(200).json({
    ok: true,
    message: "Vercel API function is working"
  });
};