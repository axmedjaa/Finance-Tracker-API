import express from 'express'
import { uplodeFile } from '../controllers/upload.js'
import { protect } from '../middleware/auth.js'
import { uplode } from '../middleware/upload.js'
const router=express.Router()
/**
 * @swagger
 * /uplode/profile:
 *   post:
 *     summary: Upload a profile file
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: The file to upload
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *       401:
 *         description: Unauthorized
 */
router.post('/profile',protect,uplode.single('file'),uplodeFile)
export default router