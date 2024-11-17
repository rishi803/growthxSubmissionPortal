import Assignment from '../models/Assignment.js';
import User from '../models/User.js';

const uploadAssignment = async (req, res) => {
  try {
    const { task, adminId } = req.body;
    
    const assignment = new Assignment({
      userId: req.user._id,
      adminId,
      task
    });
    
    await assignment.save();
    res.status(201).json(assignment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find({ adminId: req.user._id })
      .populate('userId', 'username')
      .sort('-createdAt');
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateAssignmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const assignment = await Assignment.findOne({
      _id: id,
      adminId: req.user._id
    });

    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }

    assignment.status = status;
    await assignment.save();
    
    res.json(assignment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const userProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
}

const getAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: 'admin' }, { username: 1, _id: 1 });
    res.json(admins);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export {
  uploadAssignment,
  getAssignments,
  updateAssignmentStatus,
  userProfile,
  getAdmins
};