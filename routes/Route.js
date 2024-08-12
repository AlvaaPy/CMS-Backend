import express from "express";
import {getUser, Register, Login} from "../controllers/C_User.js";
import { getAdmin, adminLogin } from "../controllers/C_Admin.js";

import { getAllDivisi, createDivisi, getDivisiById } from "../controllers/C_Divisi.js";

import { createTopikMarketing, getAllTopikMarketing, getTopikMarketingById, updateTopikMarketing, deleteTopikMarketing } from "../controllers/C_TopikMarketing.js";

import { createMarketingMateri } from "../controllers/C_MarketingMateri.js";

import { createTopikIt, deleteTopikIT, getAllIt, getItId, updateTopikIT } from "../controllers/C_ItTopik.js";

import { createTopikHuman, deleteTopikHuman, getAllHuman, getHumanId, updateTopikHuman } from "../controllers/C_HumanCapital.js";

import { createTopikProduct, deleteTopikProduct, getAllProduct, getProductId, updateTopikProduct } from "../controllers/C_Product.js";
import { createTopikRedaksi, deleteTopikRedaksi, getAllRedaksi, getRedaksiId, updateTopikRedaksi } from "../controllers/C_Redaksi.js";

const router = express.Router();

router.get('/users', getUser);
router.post('/users', Register);
router.post('/login', Login);


// Admin
router.get('/admin', getAdmin);
router.post('/admin', adminLogin);


// Divisi
router.get('/divisi', getAllDivisi);
router.get('/divisi/:id', getDivisiById);
router.post('/divisi', createDivisi);

// Topik Marketing
router.post('/marketing', createTopikMarketing)
router.get('/marketing', getAllTopikMarketing)
router.get('/marketing/:id', getTopikMarketingById)
router.put('/marketing/:id', updateTopikMarketing)
router.delete('/marketing/:id', deleteTopikMarketing)

// Topik IT
router.post('/it', createTopikIt )
router.get('/it', getAllIt )
router.get('/it/:id', getItId )
router.put('/it/:id', updateTopikIT )
router.delete('/it/:id', deleteTopikIT )


// Topik Human
router.post('/humanCapital', createTopikHuman)
router.get('/humanCapital', getAllHuman)
router.get('/humanCapital/:id', getHumanId)
router.put('/humanCapital/:id', updateTopikHuman)
router.delete('/humanCapital/:id', deleteTopikHuman)


// Topik Product
router.post('/product', createTopikProduct)
router.get('/product', getAllProduct)
router.get('/product/:id', getProductId)
router.put('/product/:id', updateTopikProduct)
router.delete('/product/:id', deleteTopikProduct)


// TOpik Redaksi
router.post('/redaksi', createTopikRedaksi)
router.get('/redaksi', getAllRedaksi)
router.get('/redaksi/:id', getRedaksiId)
router.put('/redaksi/:id', updateTopikRedaksi)
router.delete('/redaksi/:id', deleteTopikRedaksi)


// Materi Marketing
router.post('/topikmarketing', createMarketingMateri)


export default router;