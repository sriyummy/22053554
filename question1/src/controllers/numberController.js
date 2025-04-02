const numberService = require('../services/numberService');

/**
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getAverage = async (req, res) => {
  const { numberId } = req.params;

  // Validate numberId
  const validIds = ['p', 'f', 'e', 'r'];
  if (!validIds.includes(numberId)) {
    return res.status(400).json({ error: 'Invalid numberId. Use p, f, e, or r.' });
  }

  try {
    const result = await numberService.fetchAndCalculateAverage(numberId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getAverage };