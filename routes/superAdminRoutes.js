import express from 'express';
import {
    addAsset,
    addRole,
    assignUserToMinistry,
    createDonation,
    createEvent,
    createMinistry,
    deleteAsset,
    deleteDonation,
    deleteEvent,
    deleteMinistry,
    getAllRoles,
    getAssets,
    getDonations,
    getEvents,
    getMinistries,
    removeRole,
    removeUserFromMinistry,
    updateAsset,
    updateEvent,
    updateMinistry
} from '../controllers/superAdminController.js';
import {isAdminOrSuperAdmin, isSuperAdmin, protect} from '../middlewares/authMiddleware.js';

const router = express.Router();

// Role routes (super admin only)
router.get('/roles',protect, isSuperAdmin, getAllRoles); // Fetch all roles
router.post('/roles',protect, isSuperAdmin, addRole); // Add a new role
router.delete('/roles/:roleId', protect,isSuperAdmin, removeRole); // Remove a role

// Ministry routes
router.post('/ministries', protect,isAdminOrSuperAdmin, createMinistry); // Create a ministry
router.put('/ministries/:id', protect,isAdminOrSuperAdmin, updateMinistry); // Update a ministry
router.delete('/ministries/:id', protect,isSuperAdmin, deleteMinistry); // Delete a ministry
router.get('/ministries',protect, isAdminOrSuperAdmin, getMinistries); // Fetch all ministries
router.post('/ministries/assign',protect, isSuperAdmin, assignUserToMinistry); // Assign user to ministry
router.post('/ministries/remove', protect,isSuperAdmin, removeUserFromMinistry); // Remove user from ministry

// Event routes
router.post('/events',protect, isAdminOrSuperAdmin, createEvent); // Create an event
router.put('/events/:id',protect, isAdminOrSuperAdmin, updateEvent); // Update an event
router.delete('/events/:id',protect, isSuperAdmin, deleteEvent); // Delete an event
router.get('/events',protect, isAdminOrSuperAdmin, getEvents); // Fetch all events

// Donation routes
router.post('/donations',protect, isAdminOrSuperAdmin, createDonation); // Create a donation
router.get('/donations',protect, isAdminOrSuperAdmin, getDonations); // Fetch all donations
router.delete('/donations/:id',protect, isSuperAdmin, deleteDonation); // Delete a donation

// Asset routes
router.post('/assets', protect,isSuperAdmin, addAsset); // Add an asset
router.put('/assets/:id', protect,isSuperAdmin, updateAsset); // Update an asset
router.delete('/assets/:id',protect, isSuperAdmin, deleteAsset); // Delete an asset
router.get('/assets',protect, isAdminOrSuperAdmin, getAssets); // Fetch all assets

export default router;
