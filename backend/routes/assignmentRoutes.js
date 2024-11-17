import { Router } from 'express';
const router = Router();
import { auth, isAdmin } from '../middleware/auth.js';
import { uploadAssignment, getAssignments, updateAssignmentStatus,getAdmins, userProfile } from '../controllers/assignmentController.js';

router.post('/upload', auth, uploadAssignment);
router.get('/assignments', auth, isAdmin, getAssignments);
router.post('/assignments/:id/:status', auth, isAdmin, updateAssignmentStatus);

router.get('/profile', auth, userProfile);

router.get('/users/admins', getAdmins);

export default router;
